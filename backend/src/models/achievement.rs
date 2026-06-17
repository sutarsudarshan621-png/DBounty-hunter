use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(
    Debug,
    Clone,
    Serialize,
    Deserialize,
    sqlx::FromRow,
)]
pub struct Achievement {
    pub id: Uuid,

    pub user_id: Uuid,

    pub badge_code: String,

    pub awarded_at: DateTime<Utc>,
}