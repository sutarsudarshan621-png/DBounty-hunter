use axum::{
    extract::{Path, State},
    Json,
};
use uuid::Uuid;

use crate::{
    errors::AppError,
    services,
    state::AppState,
};

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