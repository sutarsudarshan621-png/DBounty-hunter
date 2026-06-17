use axum::{
    extract::{Path, State},
    Json,
};
use uuid::Uuid;

use crate::{
    errors::AppError,
    state::AppState,
};

pub async fn get_user_achievements(
    State(state): State<AppState>,
    Path(user_id): Path<Uuid>,
) -> Result<Json<Vec<crate::models::Achievement>>, AppError> {
    let achievements =
        crate::db::achievements::get_user_achievements(
            &state.db,
            user_id,
        )
        .await?;

    Ok(Json(achievements))
}