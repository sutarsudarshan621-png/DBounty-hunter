//backend/src/models/submission.rs
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Submission {
    pub id: Uuid,

    pub bounty_id: Uuid,
    pub contributor_id: Uuid,

    pub proof_hash: Option<String>,

    pub content: String,

    pub status: String,

    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

