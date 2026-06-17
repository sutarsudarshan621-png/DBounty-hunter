use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Transaction {
    pub id: Uuid,
    pub tx_hash: String,
    pub user_id: Uuid,
    pub amount: sqlx::types::Decimal,
    pub asset: String,
}
