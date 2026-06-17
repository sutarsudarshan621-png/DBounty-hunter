use axum::{
    extract::State,
    Json,
};

use crate::{
    errors::AppError,
    state::AppState,
};

pub async fn get_notifications(
    State(_state): State<AppState>,
) -> Result<Json<Vec<String>>, AppError> {
    Ok(Json(vec![
        "Notifications service not implemented".to_string(),
    ]))
}