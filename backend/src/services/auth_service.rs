//backend/src/services/auth_service.rs
use sqlx::PgPool;

use crate::{
    db,
    errors::AppResult,
    models::User,
};

pub async fn get_or_create_user(
    pool: &PgPool,
    wallet_address: &str,
) -> AppResult<User> {
    match db::users::get_user_by_wallet(
        pool,
        wallet_address,
    )
    .await
    {
        Ok(user) => Ok(user),

        Err(_) => {
            db::users::create_user(
                pool,
                wallet_address,
            )
            .await
        }
    }
}

pub async fn get_user(
    pool: &PgPool,
    wallet_address: &str,
) -> AppResult<User> {
    db::users::get_user_by_wallet(
        pool,
        wallet_address,
    )
    .await
}

pub async fn get_user_by_id(
    pool: &sqlx::PgPool,
    user_id: uuid::Uuid,
) -> crate::errors::AppResult<crate::models::User> {
    crate::db::users::get_user_by_id(
        pool,
        user_id,
    )
    .await
}