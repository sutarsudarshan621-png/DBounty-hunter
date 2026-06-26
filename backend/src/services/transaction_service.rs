use sqlx::PgPool;
use uuid::Uuid;

use crate::{
    db,
    errors::AppResult,
    models::Transaction,
};

pub async fn get_user_transactions(
    pool: &PgPool,
    user_id: Uuid,
) -> AppResult<Vec<Transaction>> {
    db::transactions::get_user_transactions(pool, user_id).await
}