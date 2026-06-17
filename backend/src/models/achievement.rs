use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Achievement {
    pub id: Uuid,
    pub user_id: Uuid,
    pub badge_name: String,
}
