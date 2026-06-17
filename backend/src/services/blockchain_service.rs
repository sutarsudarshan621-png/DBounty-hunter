//backend/src/services/blockchain_service.rs
use anyhow::Result;
use tracing::info;

#[derive(Debug, Clone)]
pub struct CreateBountyParams {
    pub contract_bounty_id: String,

    pub creator_wallet: String,

    pub reward_amount: String,

    pub reward_asset: String,

    pub deadline: u64,
}

#[derive(Debug, Clone)]
pub struct BlockchainReceipt {
    pub tx_hash: String,
}

pub async fn create_bounty(
    params: CreateBountyParams,
) -> Result<BlockchainReceipt> {
    info!(
        "create bounty on soroban {:?}",
        params
    );

    Ok(BlockchainReceipt {
        tx_hash: format!(
            "pending_tx_{}",
            params.contract_bounty_id
        ),
    })
}

pub async fn approve_submission(
    contract_bounty_id: &str,
) -> Result<BlockchainReceipt> {
    info!(
        "approve submission {}",
        contract_bounty_id
    );

    Ok(BlockchainReceipt {
        tx_hash: format!(
            "approve_{}",
            contract_bounty_id
        ),
    })
}

pub async fn reject_submission(
    contract_bounty_id: &str,
) -> Result<BlockchainReceipt> {
    info!(
        "reject submission {}",
        contract_bounty_id
    );

    Ok(BlockchainReceipt {
        tx_hash: format!(
            "reject_{}",
            contract_bounty_id
        ),
    })
}

pub async fn refund_creator(
    contract_bounty_id: &str,
) -> Result<BlockchainReceipt> {
    info!(
        "refund creator {}",
        contract_bounty_id
    );

    Ok(BlockchainReceipt {
        tx_hash: format!(
            "refund_{}",
            contract_bounty_id
        ),
    })
}