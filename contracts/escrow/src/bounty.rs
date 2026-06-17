// contracts/escrow/src/bounty.rs

use soroban_sdk::{contracttype, Address};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct BountyData {
    /// Wallet that created the bounty
    pub creator: Address,

    /// Amount locked in escrow
    pub reward_amount: i128,

    /// Stellar Asset Contract (SAC) address
    pub reward_asset: Address,

    /// Unix timestamp when bounty expires
    pub deadline: u64,

    /// Current bounty state
    pub status: BountyStatus,

    /// Contributor who submitted work
    pub contributor: Option<Address>,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum BountyStatus {
    /// Bounty is available for submissions
    Open,

    /// Work has been submitted and awaits review
    Submitted,

    /// Creator approved submission
    Approved,

    /// Creator rejected submission
    Rejected,

    /// Reward paid out successfully
    Completed,

    /// Deadline passed and creator refunded
    Expired,
}