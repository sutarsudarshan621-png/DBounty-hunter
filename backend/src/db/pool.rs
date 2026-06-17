//backend/src/db/pool.rs
use anyhow::Result;
use sqlx::{
    postgres::PgPoolOptions,
    PgPool,
    Postgres,
    Transaction,
};

pub async fn begin_transaction(
    pool: &PgPool,
) -> Result<Transaction<'_, Postgres>, sqlx::Error> {
    pool.begin().await
}

pub async fn create_pool(database_url: &str) -> Result<PgPool> {
    let pool = PgPoolOptions::new()
        .max_connections(20)
        .min_connections(5)
        .acquire_timeout(std::time::Duration::from_secs(10))
        .idle_timeout(std::time::Duration::from_secs(300))
        .connect(database_url)
        .await?;

    Ok(pool)
}

pub async fn health_check(pool: &PgPool) -> Result<()> {
    sqlx::query("SELECT 1")
        .execute(pool)
        .await?;

    Ok(())
}