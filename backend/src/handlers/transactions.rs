// backend/src/handlers/transactions.rs
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

pub async fn get_user_transactions(
    State(state): State<AppState>,
    Path(user_id): Path<Uuid>,
) -> Result<
    Json<Vec<crate::models::Transaction>>,
    AppError,
> {
    let transactions =
        services::transaction_service::get_user_transactions(
            &state.db,
            user_id,
        )
        .await?;

    Ok(Json(transactions))
}