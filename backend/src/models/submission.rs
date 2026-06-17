use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Submission {
    pub id: Uuid,
    pub bounty_id: Uuid,
    pub contributor_id: Uuid,
    pub content: String,
    pub status: String,
}
