//backend/src/handlers/bounties.rs
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
use crate::middleware::current_user::CurrentUser;

#[derive(Debug, Deserialize)]
pub struct CreateBountyRequest {
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
    current_user: CurrentUser,
    Json(payload): Json<CreateBountyRequest>,
) -> Result<Json<CreateBountyResponse>, AppError> {

    let user = services::auth_service::get_user(
        &state.db,
        &current_user.wallet_address,
    )
    .await?;

    let bounty = services::bounty_service::create_bounty(
        &state.db,
        user.id,
        Uuid::new_v4().to_string(),
        "pending".to_string(),
        payload.title,
        payload.description,
        payload.reward_amount,
        payload.reward_asset,
        payload.category,
        payload.deadline,
    )
    .await?;

    Ok(Json(CreateBountyResponse { bounty }))
}

#[derive(Debug, Deserialize)]
pub struct UpdateBountyRequest {
    pub title: String,
    pub description: String,
    pub category: Option<String>,
    pub deadline: DateTime<Utc>,
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

pub async fn list_submitted_bounties(
    State(state): State<AppState>,
) -> Result<Json<Vec<crate::models::Bounty>>, AppError> {
    let bounties =
        services::bounty_service::list_submitted_bounties(
            &state.db,
        )
        .await?;

    Ok(Json(bounties))
}

pub async fn my_bounties(
    State(state): State<AppState>,
    current_user: CurrentUser,
) -> Result<Json<Vec<crate::models::Bounty>>, AppError> {
    let user = services::auth_service::get_user(
        &state.db,
        &current_user.wallet_address,
    )
    .await?;

    let bounties = services::bounty_service::get_creator_bounties(
        &state.db,
        user.id,
    )
    .await?;

    Ok(Json(bounties))
}

pub async fn update_bounty(
    State(state): State<AppState>,
    current_user: CurrentUser,
    Path(bounty_id): Path<Uuid>,
    Json(payload): Json<UpdateBountyRequest>,
) -> Result<Json<crate::models::Bounty>, AppError> {

    let user = services::auth_service::get_user(
        &state.db,
        &current_user.wallet_address,
    )
    .await?;

    let existing = services::bounty_service::get_bounty(
        &state.db,
        bounty_id,
    )
    .await?;

    if existing.creator_id != user.id {
        return Err(AppError::Unauthorized);
    }

    let bounty = services::bounty_service::update_bounty(
        &state.db,
        bounty_id,
        payload.title,
        payload.description,
        payload.category,
        payload.deadline,
    )
    .await?;

    Ok(Json(bounty))
}

pub async fn delete_bounty(
    State(state): State<AppState>,
    current_user: CurrentUser,
    Path(bounty_id): Path<Uuid>,
) -> Result<Json<crate::models::Bounty>, AppError> {

    let user = services::auth_service::get_user(
        &state.db,
        &current_user.wallet_address,
    )
    .await?;

    let existing = services::bounty_service::get_bounty(
        &state.db,
        bounty_id,
    )
    .await?;

    if existing.creator_id != user.id {
        return Err(AppError::Unauthorized);
    }

    let bounty = services::bounty_service::delete_bounty(
        &state.db,
        bounty_id,
    )
    .await?;

    Ok(Json(bounty))
}