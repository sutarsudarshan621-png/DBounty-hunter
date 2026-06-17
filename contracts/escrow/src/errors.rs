// contracts/escrow/src/errors.rs

use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum EscrowError {
    NotCreator = 1,
    BountyNotFound = 2,
    AlreadySubmitted = 3,
    DeadlinePassed = 4,
    NotExpiredYet = 5,
    InvalidStatus = 6,

    // Future-proofing
    Unauthorized = 7,
    NotContributor = 8,
    ContributorMissing = 9,
    BountyAlreadyExists = 10,
    InvalidRewardAmount = 11,
    InvalidDeadline = 12,
    TransferFailed = 13,
}