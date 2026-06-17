// contracts/escrow/src/events.rs

use soroban_sdk::{Address, Env, Symbol};

pub fn bounty_created(
    env: &Env,
    bounty_id: &Symbol,
    creator: &Address,
    reward_amount: i128,
) {
    env.events().publish(
        ("bounty_created", bounty_id.clone()),
        (creator.clone(), reward_amount),
    );
}

pub fn work_submitted(
    env: &Env,
    bounty_id: &Symbol,
    contributor: &Address,
) {
    env.events().publish(
        ("work_submitted", bounty_id.clone()),
        contributor.clone(),
    );
}

pub fn submission_approved(
    env: &Env,
    bounty_id: &Symbol,
    contributor: &Address,
) {
    env.events().publish(
        ("submission_approved", bounty_id.clone()),
        contributor.clone(),
    );
}

pub fn submission_rejected(
    env: &Env,
    bounty_id: &Symbol,
) {
    env.events().publish(
        ("submission_rejected", bounty_id.clone()),
        (),
    );
}

pub fn reward_released(
    env: &Env,
    bounty_id: &Symbol,
    recipient: &Address,
    amount: i128,
) {
    env.events().publish(
        ("reward_released", bounty_id.clone()),
        (recipient.clone(), amount),
    );
}

pub fn creator_refunded(
    env: &Env,
    bounty_id: &Symbol,
    creator: &Address,
    amount: i128,
) {
    env.events().publish(
        ("creator_refunded", bounty_id.clone()),
        (creator.clone(), amount),
    );
}