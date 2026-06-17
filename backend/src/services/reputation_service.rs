//backend/src/services/reputation_service.rs
use sqlx::PgPool;
use uuid::Uuid;

use crate::{
    db,
    errors::AppResult,
    models::User,
};

const APPROVED_SUBMISSION_REPUTATION: i32 = 25;

pub async fn reward_completed_bounty(
    pool: &PgPool,
    contributor_id: Uuid,
) -> AppResult<User> {
    db::users::update_reputation(
        pool,
        contributor_id,
        APPROVED_SUBMISSION_REPUTATION,
    )
    .await?;

    db::users::increment_completed_tasks(
        pool,
        contributor_id,
    )
    .await
}

pub async fn deduct_reputation(
    pool: &PgPool,
    user_id: Uuid,
    amount: i32,
) -> AppResult<User> {
    db::users::update_reputation(
        pool,
        user_id,
        -amount,
    )
    .await
}

pub async fn add_reputation(
    pool: &PgPool,
    user_id: Uuid,
    amount: i32,
) -> AppResult<User> {
    db::users::update_reputation(
        pool,
        user_id,
        amount,
    )
    .await
}