use soroban_sdk::{contracttype, Address, String as SorobanString};

#[contracttype]
#[derive(Clone)]
pub struct BountyData {
    pub creator: Address,
    pub reward_amount: i128,
    pub reward_asset: Address, // token contract address (XLM or USDC SAC)
    pub deadline: u64,
    pub status: BountyStatus,
    pub contributor: Option<Address>,
}

#[contracttype]
#[derive(Clone, PartialEq, Eq)]
pub enum BountyStatus {
    Open,
    Submitted,
    Approved,
    Rejected,
    Completed,
    Expired,
}
