use crate::config::Config;
use sqlx::PgPool;

#[derive(Clone)]
pub struct AppState {
    pub db: PgPool,
    pub jwt_secret: String,
    // TODO: redis pool, soroban client
}

impl AppState {
    pub async fn new(cfg: &Config) -> anyhow::Result<Self> {
        let db = PgPool::connect(&cfg.database_url).await?;
        Ok(Self { db, jwt_secret: cfg.jwt_secret.clone() })
    }
}
