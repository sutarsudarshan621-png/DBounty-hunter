//backend/src/handlers/users.rs
use axum::{
    extract::{Path, State},
    Json,
};
use serde::Deserialize;

use crate::middleware::current_user::CurrentUser;
use uuid::Uuid;

use crate::{
    errors::AppError,
    services,
    state::AppState,
};

#[derive(Debug, Deserialize)]
pub struct UpdateProfileRequest {
    pub username: String,
    pub bio: Option<String>,
    pub avatar_url: Option<String>,
}

pub async fn get_user(
    State(state): State<AppState>,
    Path(user_id): Path<Uuid>,
) -> Result<Json<crate::models::User>, AppError> {
    let user = services::auth_service::get_user_by_id(
        &state.db,
        user_id,
    )
    .await?;

    Ok(Json(user))
}
pub async fn get_me(
    State(state): State<AppState>,
    current_user: CurrentUser,
) -> Result<Json<crate::models::User>, AppError> {
    let user = services::auth_service::get_user(
        &state.db,
        &current_user.wallet_address,
    )
    .await?;

    Ok(Json(user))
}

pub async fn update_me(
    State(state): State<AppState>,
    current_user: CurrentUser,
    Json(payload): Json<UpdateProfileRequest>,
) -> Result<Json<crate::models::User>, AppError> {
    let user = services::auth_service::get_user(
        &state.db,
        &current_user.wallet_address,
    )
    .await?;

    let updated =
        services::auth_service::update_profile(
            &state.db,
            user.id,
            &payload.username,
            payload.bio.as_deref(),
            payload.avatar_url.as_deref(),
        )
        .await?;

    Ok(Json(updated))
}

pub async fn get_leaderboard(
    State(state): State<AppState>,
) -> Result<Json<Vec<crate::models::User>>, AppError> {
    let users = crate::db::users::leaderboard(
        &state.db,
        100,
    )
    .await?;

    Ok(Json(users))
}