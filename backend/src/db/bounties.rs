//backend/src/db/bounties.rs
use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use sqlx::PgPool;
use uuid::Uuid;

use crate::{
    errors::{AppError, AppResult},
    models::Bounty,
};

pub async fn create_bounty(
    pool: &PgPool,
    contract_bounty_id: &str,
    escrow_contract_address: &str,
    creator_id: Uuid,
    title: &str,
    description: &str,
    reward_amount: Decimal,
    reward_asset: &str,
    category: Option<&str>,
    deadline: DateTime<Utc>,
) -> AppResult<Bounty> {
    let bounty = sqlx::query_as::<_, Bounty>(
        r#"
        INSERT INTO bounties (
            contract_bounty_id,
            escrow_contract_address,
            creator_id,
            title,
            description,
            reward_amount,
            reward_asset,
            category,
            deadline
        )
        VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9
        )
        RETURNING *
        "#,
    )
    .bind(contract_bounty_id)
    .bind(escrow_contract_address)
    .bind(creator_id)
    .bind(title)
    .bind(description)
    .bind(reward_amount)
    .bind(reward_asset)
    .bind(category)
    .bind(deadline)
    .fetch_one(pool)
    .await?;

    Ok(bounty)
}

pub async fn get_bounty(
    pool: &PgPool,
    bounty_id: Uuid,
) -> AppResult<Bounty> {
    let bounty = sqlx::query_as::<_, Bounty>(
        r#"
        SELECT *
        FROM bounties
        WHERE id = $1
        "#,
    )
    .bind(bounty_id)
    .fetch_optional(pool)
    .await?
    .ok_or(AppError::NotFound)?;

    Ok(bounty)
}

pub async fn get_bounty_by_contract_id(
    pool: &PgPool,
    contract_bounty_id: &str,
) -> AppResult<Bounty> {
    let bounty = sqlx::query_as::<_, Bounty>(
        r#"
        SELECT *
        FROM bounties
        WHERE contract_bounty_id = $1
        "#,
    )
    .bind(contract_bounty_id)
    .fetch_optional(pool)
    .await?
    .ok_or(AppError::NotFound)?;

    Ok(bounty)
}

pub async fn list_open_bounties(
    pool: &PgPool,
) -> AppResult<Vec<Bounty>> {
    let bounties = sqlx::query_as::<_, Bounty>(
        r#"
        SELECT *
        FROM bounties
        WHERE status = 'open'
        ORDER BY created_at DESC
        "#,
    )
    .fetch_all(pool)
    .await?;

    Ok(bounties)
}

pub async fn list_submitted_bounties(
    pool: &PgPool,
) -> AppResult<Vec<Bounty>> {
    let bounties = sqlx::query_as::<_, Bounty>(
        r#"
        SELECT *
        FROM bounties
        WHERE status = 'submitted'
        ORDER BY updated_at DESC
        "#,
    )
    .fetch_all(pool)
    .await?;

    Ok(bounties)
}

pub async fn list_creator_bounties(
    pool: &PgPool,
    creator_id: Uuid,
) -> AppResult<Vec<Bounty>> {
    let bounties = sqlx::query_as::<_, Bounty>(
        r#"
        SELECT *
        FROM bounties
        WHERE creator_id = $1
        ORDER BY created_at DESC
        "#,
    )
    .bind(creator_id)
    .fetch_all(pool)
    .await?;

    Ok(bounties)
}

pub async fn update_status(
    pool: &PgPool,
    bounty_id: Uuid,
    status: &str,
) -> AppResult<Bounty> {
    let bounty = sqlx::query_as::<_, Bounty>(
        r#"
        UPDATE bounties
        SET
            status = $2,
            updated_at = NOW()
        WHERE id = $1
        RETURNING *
        "#,
    )
    .bind(bounty_id)
    .bind(status)
    .fetch_optional(pool)
    .await?
    .ok_or(AppError::NotFound)?;

    Ok(bounty)
}

pub async fn get_creator_bounties(
    pool: &PgPool,
    creator_id: Uuid,
) -> AppResult<Vec<Bounty>> {
    let bounties = sqlx::query_as::<_, Bounty>(
        r#"
        SELECT *
        FROM bounties
        WHERE creator_id = $1
        ORDER BY created_at DESC
        "#,
    )
    .bind(creator_id)
    .fetch_all(pool)
    .await?;

    Ok(bounties)
}

pub async fn update_bounty(
    pool: &PgPool,
    bounty_id: Uuid,
    title: &str,
    description: &str,
    category: Option<&str>,
    deadline: DateTime<Utc>,
) -> AppResult<Bounty> {
    let bounty = sqlx::query_as::<_, Bounty>(
        r#"
        UPDATE bounties
        SET
            title=$2,
            description=$3,
            category=$4,
            deadline=$5,
            updated_at=NOW()
        WHERE id=$1
        RETURNING *
        "#,
    )
    .bind(bounty_id)
    .bind(title)
    .bind(description)
    .bind(category)
    .bind(deadline)
    .fetch_one(pool)
    .await?;

    Ok(bounty)
}
pub async fn delete_bounty(
    pool: &PgPool,
    bounty_id: Uuid,
) -> AppResult<Bounty> {
    let bounty = sqlx::query_as::<_, Bounty>(
        r#"
        UPDATE bounties
        SET
            status='cancelled',
            updated_at=NOW()
        WHERE id=$1
        RETURNING *
        "#,
    )
    .bind(bounty_id)
    .fetch_one(pool)
    .await?;

    Ok(bounty)
}