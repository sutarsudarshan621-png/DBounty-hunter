pub struct Config {
    pub database_url: String,
    pub redis_url: String,
    pub jwt_secret: String,
    pub soroban_rpc_url: String,
    pub escrow_contract_id: String,
    pub port: u16,
}

impl Config {
    pub fn from_env() -> anyhow::Result<Self> {
        dotenvy::dotenv().ok();
        Ok(Self {
            database_url: std::env::var("DATABASE_URL")?,
            redis_url: std::env::var("REDIS_URL")?,
            jwt_secret: std::env::var("JWT_SECRET")?,
            soroban_rpc_url: std::env::var("SOROBAN_RPC_URL")?,
            escrow_contract_id: std::env::var("ESCROW_CONTRACT_ID").unwrap_or_default(),
            port: std::env::var("PORT").unwrap_or_else(|_| "8080".into()).parse()?,
        })
    }
}
