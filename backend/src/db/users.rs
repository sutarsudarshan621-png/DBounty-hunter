//backend/src/db/users.rs
use sqlx::PgPool;
use uuid::Uuid;

use crate::{
    errors::{AppError, AppResult},
    models::User,
};

pub async fn create_user(
    pool: &PgPool,
    wallet_address: &str,
) -> AppResult<User> {
    let user = sqlx::query_as::<_, User>(
        r#"
        INSERT INTO users (
            wallet_address
        )
        VALUES ($1)
        RETURNING *
        "#,
    )
    .bind(wallet_address)
    .fetch_one(pool)
    .await?;

    Ok(user)
}

pub async fn get_user_by_id(
    pool: &PgPool,
    id: Uuid,
) -> AppResult<User> {
    let user = sqlx::query_as::<_, User>(
        r#"
        SELECT *
        FROM users
        WHERE id = $1
        "#,
    )
    .bind(id)
    .fetch_optional(pool)
    .await?
    .ok_or(AppError::NotFound)?;

    Ok(user)
}

pub async fn get_user_by_wallet(
    pool: &PgPool,
    wallet_address: &str,
) -> AppResult<User> {
    let user = sqlx::query_as::<_, User>(
        r#"
        SELECT *
        FROM users
        WHERE wallet_address = $1
        "#,
    )
    .bind(wallet_address)
    .fetch_optional(pool)
    .await?
    .ok_or(AppError::NotFound)?;

    Ok(user)
}

pub async fn update_reputation(
    pool: &PgPool,
    user_id: Uuid,
    reputation_delta: i32,
) -> AppResult<User> {
    let user = sqlx::query_as::<_, User>(
        r#"
        UPDATE users
        SET reputation = reputation + $2
        WHERE id = $1
        RETURNING *
        "#,
    )
    .bind(user_id)
    .bind(reputation_delta)
    .fetch_optional(pool)
    .await?
    .ok_or(AppError::NotFound)?;

    Ok(user)
}

pub async fn increment_completed_tasks(
    pool: &PgPool,
    user_id: Uuid,
) -> AppResult<User> {
    let user = sqlx::query_as::<_, User>(
        r#"
        UPDATE users
        SET completed_tasks = completed_tasks + 1
        WHERE id = $1
        RETURNING *
        "#,
    )
    .bind(user_id)
    .fetch_optional(pool)
    .await?
    .ok_or(AppError::NotFound)?;

    Ok(user)
}

pub async fn leaderboard(
    pool: &PgPool,
    limit: i64,
) -> AppResult<Vec<User>> {
    let users = sqlx::query_as::<_, User>(
        r#"
        SELECT *
        FROM users
        ORDER BY reputation DESC
        LIMIT $1
        "#,
    )
    .bind(limit)
    .fetch_all(pool)
    .await?;

    Ok(users)
}

pub async fn get_current_user(
    pool: &PgPool,
    wallet_address: &str,
) -> AppResult<User> {
    let user = sqlx::query_as::<_, User>(
        r#"
        SELECT *
        FROM users
        WHERE wallet_address = $1
        "#,
    )
    .bind(wallet_address)
    .fetch_one(pool)
    .await?;

    Ok(user)
}

pub async fn update_profile(
    pool: &PgPool,
    user_id: Uuid,
    username: &str,
    bio: Option<&str>,
    avatar_url: Option<&str>,
) -> AppResult<User> {

    let user = sqlx::query_as::<_, User>(
        r#"
        UPDATE users
        SET

            username = $2,
            bio = $3,
            avatar_url = $4

        WHERE id = $1

        RETURNING *
        "#,
    )
    .bind(user_id)
    .bind(username)
    .bind(bio)
    .bind(avatar_url)
    .fetch_one(pool)
    .await?;

    Ok(user)
}