
use axum::{
    extract::{Path, State},
    Json,
};
use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{
    errors::AppError,
    services,
    state::AppState,
};

#[derive(Debug, Deserialize)]
pub struct CreateBountyRequest {
    pub creator_id: Uuid,

    pub contract_bounty_id: String,
    pub escrow_contract_address: String,

    pub title: String,
    pub description: String,

    pub reward_amount: Decimal,
    pub reward_asset: String,

    pub category: Option<String>,

    pub deadline: DateTime<Utc>,
}

#[derive(Debug, Serialize)]
pub struct CreateBountyResponse {
    pub bounty: crate::models::Bounty,
}

pub async fn create_bounty(
    State(state): State<AppState>,
    Json(payload): Json<CreateBountyRequest>,
) -> Result<Json<CreateBountyResponse>, AppError> {
    let bounty = services::bounty_service::create_bounty(
        &state.db,
        payload.creator_id,
        payload.contract_bounty_id,
        payload.escrow_contract_address,
        payload.title,
        payload.description,
        payload.reward_amount,
        payload.reward_asset,
        payload.category,
        payload.deadline,
    )
    .await?;

    Ok(Json(CreateBountyResponse {
        bounty,
    }))
}

pub async fn get_bounty(
    State(state): State<AppState>,
    Path(bounty_id): Path<Uuid>,
) -> Result<Json<crate::models::Bounty>, AppError> {
    let bounty = services::bounty_service::get_bounty(
        &state.db,
        bounty_id,
    )
    .await?;

    Ok(Json(bounty))
}

pub async fn list_open_bounties(
    State(state): State<AppState>,
) -> Result<Json<Vec<crate::models::Bounty>>, AppError> {
    let bounties =
        services::bounty_service::list_open_bounties(
            &state.db,
        )
        .await?;

    Ok(Json(bounties))
}