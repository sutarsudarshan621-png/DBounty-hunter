//contracts/escrow/src/storage.rs
use soroban_sdk::{contracttype, Env, Symbol};

use crate::bounty::BountyData;
use crate::errors::EscrowError;

const BUMP_LEDGERS: u32 = 518_400;

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Bounty(Symbol),
}

pub fn bounty_exists(env: &Env, id: &Symbol) -> bool {
    env.storage()
        .persistent()
        .has(&DataKey::Bounty(id.clone()))
}

pub fn get_bounty(
    env: &Env,
    id: &Symbol,
) -> Result<BountyData, EscrowError> {
    let key = DataKey::Bounty(id.clone());

    env.storage()
        .persistent()
        .get::<_, BountyData>(&key)
        .ok_or(EscrowError::BountyNotFound)
}

pub fn set_bounty(
    env: &Env,
    id: &Symbol,
    data: &BountyData,
) {
    let key = DataKey::Bounty(id.clone());

    env.storage()
        .persistent()
        .set(&key, data);

    env.storage()
        .persistent()
        .extend_ttl(
            &key,
            BUMP_LEDGERS,
            BUMP_LEDGERS,
        );
}