//backend/src/services/bounty_service.rs
use chrono::Utc;
use rust_decimal::Decimal;
use sqlx::PgPool;
use uuid::Uuid;

use crate::{
    db,
    errors::{AppError, AppResult},
    models::Bounty,
};

pub async fn create_bounty(
    pool: &PgPool,

    creator_id: Uuid,

    contract_bounty_id: String,
    escrow_contract_address: String,

    title: String,
    description: String,

    reward_amount: Decimal,
    reward_asset: String,

    category: Option<String>,

    deadline: chrono::DateTime<Utc>,
) -> AppResult<Bounty> {
    if reward_amount <= Decimal::ZERO {
        return Err(
            AppError::BadRequest(
                "reward amount must be greater than zero"
                    .into(),
            ),
        );
    }

    if deadline <= Utc::now() {
        return Err(
            AppError::BadRequest(
                "deadline must be in the future"
                    .into(),
            ),
        );
    }

    if reward_asset != "XLM"
        && reward_asset != "USDC"
    {
        return Err(
            AppError::BadRequest(
                "invalid reward asset".into(),
            ),
        );
    }

    db::bounties::create_bounty(
        pool,
        &contract_bounty_id,
        &escrow_contract_address,
        creator_id,
        &title,
        &description,
        reward_amount,
        &reward_asset,
        category.as_deref(),
        deadline,
    )
    .await
}

pub async fn get_bounty(
    pool: &PgPool,
    bounty_id: Uuid,
) -> AppResult<Bounty> {
    db::bounties::get_bounty(
        pool,
        bounty_id,
    )
    .await
}

pub async fn list_open_bounties(
    pool: &PgPool,
) -> AppResult<Vec<Bounty>> {
    db::bounties::list_open_bounties(pool)
        .await
}

pub async fn mark_submitted(
    pool: &PgPool,
    bounty_id: Uuid,
) -> AppResult<Bounty> {
    db::bounties::update_status(
        pool,
        bounty_id,
        "submitted",
    )
    .await
}

pub async fn mark_completed(
    pool: &PgPool,
    bounty_id: Uuid,
) -> AppResult<Bounty> {
    db::bounties::update_status(
        pool,
        bounty_id,
        "completed",
    )
    .await
}

pub async fn mark_expired(
    pool: &PgPool,
    bounty_id: Uuid,
) -> AppResult<Bounty> {
    db::bounties::update_status(
        pool,
        bounty_id,
        "expired",
    )
    .await
}