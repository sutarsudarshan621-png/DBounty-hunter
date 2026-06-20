//backend/src/state.rs
use crate::{
    config::Config,
    soroban::{
        client::SorobanClient,
        escrow::EscrowContract,
    },
};

use sqlx::PgPool;

#[derive(Clone)]
pub struct AppState {
    pub db: PgPool,

    pub jwt_secret: String,

    pub soroban_client: SorobanClient,

    pub escrow_contract: EscrowContract,
}

impl AppState {
    pub async fn new(
        cfg: &Config,
    ) -> anyhow::Result<Self> {
        let db = PgPool::connect(
            &cfg.database_url,
        )
        .await?;

        let soroban_client =
            SorobanClient::new(
                cfg.soroban_rpc_url.clone(),
            );

        let escrow_contract =
            EscrowContract::new(
                cfg.escrow_contract_id.clone(),
                soroban_client.clone(),
            );

        Ok(Self {
            db,
            jwt_secret: cfg.jwt_secret.clone(),
            soroban_client,
            escrow_contract,
        })
    }
}