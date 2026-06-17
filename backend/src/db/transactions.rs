use rust_decimal::Decimal;
use sqlx::PgPool;
use uuid::Uuid;

use crate::{
    errors::{AppError, AppResult},
    models::Transaction,
};

pub async fn create_transaction(
    pool: &PgPool,
    tx_hash: &str,
    user_id: Uuid,
    amount: Decimal,
    asset: &str,
    transaction_type: &str,
) -> AppResult<Transaction> {
    let transaction = sqlx::query_as::<_, Transaction>(
        r#"
        INSERT INTO transactions (
            tx_hash,
            user_id,
            amount,
            asset,
            type
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        "#,
    )
    .bind(tx_hash)
    .bind(user_id)
    .bind(amount)
    .bind(asset)
    .bind(transaction_type)
    .fetch_one(pool)
    .await?;

    Ok(transaction)
}

pub async fn get_transaction(
    pool: &PgPool,
    transaction_id: Uuid,
) -> AppResult<Transaction> {
    let transaction = sqlx::query_as::<_, Transaction>(
        r#"
        SELECT *
        FROM transactions
        WHERE id = $1
        "#,
    )
    .bind(transaction_id)
    .fetch_optional(pool)
    .await?
    .ok_or(AppError::NotFound)?;

    Ok(transaction)
}

pub async fn get_by_tx_hash(
    pool: &PgPool,
    tx_hash: &str,
) -> AppResult<Transaction> {
    let transaction = sqlx::query_as::<_, Transaction>(
        r#"
        SELECT *
        FROM transactions
        WHERE tx_hash = $1
        "#,
    )
    .bind(tx_hash)
    .fetch_optional(pool)
    .await?
    .ok_or(AppError::NotFound)?;

    Ok(transaction)
}

pub async fn get_user_transactions(
    pool: &PgPool,
    user_id: Uuid,
) -> AppResult<Vec<Transaction>> {
    let transactions = sqlx::query_as::<_, Transaction>(
        r#"
        SELECT *
        FROM transactions
        WHERE user_id = $1
        ORDER BY created_at DESC
        "#,
    )
    .bind(user_id)
    .fetch_all(pool)
    .await?;

    Ok(transactions)
}