use axum::{
    extract::State,
    Json,
};
use serde::Serialize;

use crate::{
    errors::AppError,
    state::AppState,
};

#[derive(Serialize)]
pub struct AnalyticsResponse {
    pub total_users: i64,
    pub total_bounties: i64,
    pub total_submissions: i64,
}

pub async fn get_analytics(
    State(_state): State<AppState>,
) -> Result<Json<AnalyticsResponse>, AppError> {
    Ok(Json(AnalyticsResponse {
        total_users: 0,
        total_bounties: 0,
        total_submissions: 0,
    }))
}