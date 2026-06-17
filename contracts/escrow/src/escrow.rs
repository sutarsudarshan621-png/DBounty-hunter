// contracts/escrow/src/escrow.rs

use soroban_sdk::{
    contract,
    contractimpl,
    token,
    Address,
    BytesN,
    Env,
    Symbol,
};

use crate::{
    bounty::{BountyData, BountyStatus},
    errors::EscrowError,
    storage,
};

#[contract]
pub struct EscrowContract;

#[contractimpl]
impl EscrowContract {
    /// Create bounty and lock reward into escrow
    pub fn create_bounty(
        env: Env,
        creator: Address,
        bounty_id: Symbol,
        reward_amount: i128,
        reward_asset: Address,
        deadline: u64,
    ) -> Result<(), EscrowError> {
        creator.require_auth();

        let token_client = token::Client::new(&env, &reward_asset);

        token_client.transfer(
            &creator,
            &env.current_contract_address(),
            &reward_amount,
        );

        let bounty = BountyData {
            creator,
            reward_amount,
            reward_asset,
            deadline,
            status: BountyStatus::Open,
            contributor: None,
        };

        storage::set_bounty(&env, &bounty_id, &bounty);

        Ok(())
    }

    /// Contributor submits work
    pub fn submit_work(
        env: Env,
        bounty_id: Symbol,
        contributor: Address,
        _proof_hash: BytesN<32>,
    ) -> Result<(), EscrowError> {
        contributor.require_auth();

        let mut bounty = storage::get_bounty(&env, &bounty_id)?;

        if env.ledger().timestamp() > bounty.deadline {
            return Err(EscrowError::DeadlinePassed);
        }

        if bounty.status != BountyStatus::Open {
            return Err(EscrowError::AlreadySubmitted);
        }

        bounty.status = BountyStatus::Submitted;
        bounty.contributor = Some(contributor);

        storage::set_bounty(&env, &bounty_id, &bounty);

        Ok(())
    }

    /// Creator approves submission and payout occurs
    pub fn approve_submission(
        env: Env,
        bounty_id: Symbol,
        creator: Address,
    ) -> Result<(), EscrowError> {
        creator.require_auth();

        let mut bounty = storage::get_bounty(&env, &bounty_id)?;

        if bounty.creator != creator {
            return Err(EscrowError::NotCreator);
        }

        if bounty.status != BountyStatus::Submitted {
            return Err(EscrowError::InvalidStatus);
        }

        let contributor = bounty
            .contributor
            .clone()
            .ok_or(EscrowError::InvalidStatus)?;

        let token_client =
            token::Client::new(&env, &bounty.reward_asset);

        token_client.transfer(
            &env.current_contract_address(),
            &contributor,
            &bounty.reward_amount,
        );

        bounty.status = BountyStatus::Completed;

        storage::set_bounty(&env, &bounty_id, &bounty);

        Ok(())
    }

    /// Creator rejects submission and reopens bounty
    pub fn reject_submission(
        env: Env,
        bounty_id: Symbol,
        creator: Address,
    ) -> Result<(), EscrowError> {
        creator.require_auth();

        let mut bounty = storage::get_bounty(&env, &bounty_id)?;

        if bounty.creator != creator {
            return Err(EscrowError::NotCreator);
        }

        if bounty.status != BountyStatus::Submitted {
            return Err(EscrowError::InvalidStatus);
        }

        bounty.status = BountyStatus::Open;
        bounty.contributor = None;

        storage::set_bounty(&env, &bounty_id, &bounty);

        Ok(())
    }

    /// Refund creator after deadline
    pub fn refund_creator(
        env: Env,
        bounty_id: Symbol,
    ) -> Result<(), EscrowError> {
        let mut bounty = storage::get_bounty(&env, &bounty_id)?;

        if env.ledger().timestamp() <= bounty.deadline {
            return Err(EscrowError::NotExpiredYet);
        }

        if bounty.status == BountyStatus::Completed {
            return Err(EscrowError::InvalidStatus);
        }

        let token_client =
            token::Client::new(&env, &bounty.reward_asset);

        token_client.transfer(
            &env.current_contract_address(),
            &bounty.creator,
            &bounty.reward_amount,
        );

        bounty.status = BountyStatus::Expired;

        storage::set_bounty(&env, &bounty_id, &bounty);

        Ok(())
    }

    pub fn get_bounty(
        env: Env,
        bounty_id: Symbol,
    ) -> Option<BountyData> {
        storage::get_bounty(&env, &bounty_id).ok()
    }
}