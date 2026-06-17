use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Bounty {
    pub id: Uuid,
    pub creator_id: Uuid,
    pub title: String,
    pub description: String,
    pub reward_amount: sqlx::types::Decimal,
    pub reward_asset: String,
    pub status: String,
    pub deadline: DateTime<Utc>,
}
