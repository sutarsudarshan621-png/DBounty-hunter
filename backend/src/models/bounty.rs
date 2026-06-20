//backend/src/models/bounty.rs
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::types::Decimal;
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Bounty {
    pub id: Uuid,

    pub contract_bounty_id: String,
    pub escrow_contract_address: String,

    pub creator_id: Uuid,

    pub title: String,
    pub description: String,

    pub reward_amount: Decimal,
    pub reward_asset: String,

    pub category: Option<String>,

    pub status: String,

    pub deadline: DateTime<Utc>,

    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateBountyRequest {
    pub title: String,
    pub description: String,

    pub reward_amount: Decimal,
    pub reward_asset: String,

    pub category: Option<String>,

    pub deadline: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateBountyRequest {
    pub title: Option<String>,
    pub description: Option<String>,
    pub category: Option<String>,
    pub deadline: Option<DateTime<Utc>>,
}

#[derive(Debug, Serialize)]
pub struct BountyResponse {
    pub id: Uuid,

    pub contract_bounty_id: String,

    pub creator_id: Uuid,

    pub title: String,
    pub description: String,

    pub reward_amount: Decimal,
    pub reward_asset: String,

    pub category: Option<String>,

    pub status: String,

    pub deadline: DateTime<Utc>,

    pub created_at: DateTime<Utc>,
}

impl From<Bounty> for BountyResponse {
    fn from(bounty: Bounty) -> Self {
        Self {
            id: bounty.id,
            contract_bounty_id: bounty.contract_bounty_id,
            creator_id: bounty.creator_id,

            title: bounty.title,
            description: bounty.description,

            reward_amount: bounty.reward_amount,
            reward_asset: bounty.reward_asset,

            category: bounty.category,

            status: bounty.status,

            deadline: bounty.deadline,

            created_at: bounty.created_at,
        }
    }
}