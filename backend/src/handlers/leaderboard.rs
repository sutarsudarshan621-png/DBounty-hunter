use axum::{
    extract::{Query, State},
    Json,
};
use serde::Deserialize;

use crate::{
    errors::AppError,
    state::AppState,
};

#[derive(Debug, Deserialize)]
pub struct LeaderboardQuery {
    pub limit: Option<i64>,
}

pub async fn get_leaderboard(
    State(state): State<AppState>,
    Query(query): Query<LeaderboardQuery>,
) -> Result<Json<Vec<crate::models::User>>, AppError> {
    let limit = query.limit.unwrap_or(50);

    let users = crate::db::users::leaderboard(
        &state.db,
        limit,
    )
    .await?;

    Ok(Json(users))
}