use soroban_sdk::{contract, contractimpl, Address, Env, Symbol};
use crate::bounty::{BountyData, BountyStatus};
use crate::errors::EscrowError;

#[contract]
pub struct EscrowContract;

#[contractimpl]
impl EscrowContract {
    /// Create a bounty and lock the reward into escrow.
    pub fn create_bounty(
        _env: Env,
        _creator: Address,
        _bounty_id: Symbol,
        _reward_amount: i128,
        _reward_asset: Address,
        _deadline: u64,
    ) -> Result<(), EscrowError> {
        // TODO: transfer reward_amount from creator into contract balance,
        // store BountyData keyed by bounty_id
        todo!()
    }

    /// Contributor submits proof of work (off-chain content hash/URI).
    pub fn submit_work(
        _env: Env,
        _bounty_id: Symbol,
        _contributor: Address,
        _proof_hash: Symbol,
    ) -> Result<(), EscrowError> {
        todo!()
    }

    /// Only the bounty creator may approve; triggers automatic payout.
    pub fn approve_submission(
        _env: Env,
        _bounty_id: Symbol,
        _creator: Address,
    ) -> Result<(), EscrowError> {
        // TODO: verify caller == stored creator, verify status == Submitted,
        // transfer locked funds to contributor, set status = Completed
        todo!()
    }

    pub fn reject_submission(
        _env: Env,
        _bounty_id: Symbol,
        _creator: Address,
    ) -> Result<(), EscrowError> {
        // TODO: set status back to Open (allow resubmission before deadline)
        todo!()
    }

    /// Refund creator if the deadline passed with no approved submission.
    pub fn refund_creator(_env: Env, _bounty_id: Symbol) -> Result<(), EscrowError> {
        // TODO: verify ledger timestamp > deadline, status != Completed,
        // transfer funds back to creator, set status = Expired
        todo!()
    }

    pub fn get_bounty(_env: Env, _bounty_id: Symbol) -> Option<BountyData> {
        todo!()
    }
}
