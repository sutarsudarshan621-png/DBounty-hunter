//backend/src/config.rs 
use anyhow::{Context, Result};

pub struct Config {
    pub database_url: String,

    pub redis_url: String,

    pub jwt_secret: String,

    pub soroban_rpc_url: String,

    pub escrow_contract_id: String,

    pub port: u16,
}

impl Config {
    pub fn from_env() -> Result<Self> {
        dotenvy::dotenv().ok();

        Ok(Self {
            database_url: std::env::var(
                "DATABASE_URL",
            )
            .context(
                "DATABASE_URL missing",
            )?,

            redis_url: std::env::var(
                "REDIS_URL",
            )
            .context(
                "REDIS_URL missing",
            )?,

            jwt_secret: std::env::var(
                "JWT_SECRET",
            )
            .context(
                "JWT_SECRET missing",
            )?,

            soroban_rpc_url: std::env::var(
                "SOROBAN_RPC_URL",
            )
            .context(
                "SOROBAN_RPC_URL missing",
            )?,

            escrow_contract_id:
                std::env::var(
                    "ESCROW_CONTRACT_ID",
                )
                .context(
                    "ESCROW_CONTRACT_ID missing",
                )?,

            port: std::env::var("PORT")
                .unwrap_or_else(|_| {
                    "8080".to_string()
                })
                .parse()?,
        })
    }
}