use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
    pub id: Uuid,
    pub wallet_address: String,
    pub reputation: i32,
    pub completed_tasks: i32,
    pub created_at: DateTime<Utc>,
}
