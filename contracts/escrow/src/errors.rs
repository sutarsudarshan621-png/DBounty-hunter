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
}
