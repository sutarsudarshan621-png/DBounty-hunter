use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Transaction {
    pub id: Uuid,

    pub tx_hash: String,

    pub user_id: Uuid,

    pub amount: Decimal,

    pub asset: String,

    pub r#type: String,

    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateTransactionRequest {
    pub tx_hash: String,

    pub user_id: Uuid,

    pub amount: Decimal,

    pub asset: String,

    pub r#type: String,
}

#[derive(Debug, Serialize)]
pub struct TransactionResponse {
    pub id: Uuid,

    pub tx_hash: String,

    pub user_id: Uuid,

    pub amount: Decimal,

    pub asset: String,

    pub r#type: String,

    pub created_at: DateTime<Utc>,
}

impl From<Transaction> for TransactionResponse {
    fn from(transaction: Transaction) -> Self {
        Self {
            id: transaction.id,
            tx_hash: transaction.tx_hash,
            user_id: transaction.user_id,
            amount: transaction.amount,
            asset: transaction.asset,
            r#type: transaction.r#type,
            created_at: transaction.created_at,
        }
    }
}