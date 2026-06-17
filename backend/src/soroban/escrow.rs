//backend/src/soroban/escrow.rs
use anyhow::Result;

use super::client::SorobanClient;

#[derive(Clone)]
pub struct EscrowContract {
    pub contract_id: String,
    pub client: SorobanClient,
}

impl EscrowContract {
    pub fn new(
        contract_id: String,
        client: SorobanClient,
    ) -> Self {
        Self {
            contract_id,
            client,
        }
    }

    pub async fn create_bounty(
        &self,
        bounty_id: &str,
        creator: &str,
        reward_amount: &str,
        reward_asset: &str,
        deadline: u64,
    ) -> Result<String> {
        tracing::info!(
            "create_bounty contract={} bounty={}",
            self.contract_id,
            bounty_id
        );

        tracing::debug!(
            "creator={} reward={} asset={} deadline={}",
            creator,
            reward_amount,
            reward_asset,
            deadline
        );

        Ok(format!(
            "create_bounty_tx_{}",
            bounty_id
        ))
    }

    pub async fn submit_work(
        &self,
        bounty_id: &str,
        contributor: &str,
        proof_hash: &str,
    ) -> Result<String> {
        tracing::info!(
            "submit_work {} {}",
            bounty_id,
            contributor
        );

        tracing::debug!(
            "proof_hash={}",
            proof_hash
        );

        Ok(format!(
            "submit_tx_{}",
            bounty_id
        ))
    }

    pub async fn approve_submission(
        &self,
        bounty_id: &str,
    ) -> Result<String> {
        tracing::info!(
            "approve_submission {}",
            bounty_id
        );

        Ok(format!(
            "approve_tx_{}",
            bounty_id
        ))
    }

    pub async fn reject_submission(
        &self,
        bounty_id: &str,
    ) -> Result<String> {
        tracing::info!(
            "reject_submission {}",
            bounty_id
        );

        Ok(format!(
            "reject_tx_{}",
            bounty_id
        ))
    }

    pub async fn refund_creator(
        &self,
        bounty_id: &str,
    ) -> Result<String> {
        tracing::info!(
            "refund_creator {}",
            bounty_id
        );

        Ok(format!(
            "refund_tx_{}",
            bounty_id
        ))
    }
}