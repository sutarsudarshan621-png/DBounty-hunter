use axum::{
    extract::State,
    Json,
};

use crate::{
    errors::AppError,
    state::AppState,
};

pub async fn leaderboard(
    State(state): State<AppState>,
) -> Result<
    Json<Vec<crate::models::User>>,
    AppError,
> {
    let users =
        crate::db::users::leaderboard(
            &state.db,
            80,
        )
        .await?;

    Ok(Json(users))
}