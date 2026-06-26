// backend/src/handlers/submissions.rs
use axum::{
    extract::{Path, State},
    Json,
};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use crate::middleware::current_user::CurrentUser;
use crate::{
    errors::AppError,
    services,
    state::AppState,
};
#[derive(Debug, Deserialize)]
pub struct CreateSubmissionRequest {
    pub bounty_id: Uuid,
    pub proof_hash: Option<String>,
    pub content: String,
}

#[derive(Debug, Serialize)]
pub struct SubmissionResponse {
    pub submission: crate::models::Submission,
}

pub async fn create_submission(
    State(state): State<AppState>,
    current_user: CurrentUser,
    Json(payload): Json<CreateSubmissionRequest>,
) -> Result<Json<SubmissionResponse>, AppError> {

    let user = services::auth_service::get_user(
    &state.db,
    &current_user.wallet_address,
        )
        .await?;

    let submission =
        services::submission_service::create_submission(
            &state.db,
            payload.bounty_id,
            user.id,
            payload.proof_hash,
            payload.content,
        )
        .await?;

    Ok(Json(SubmissionResponse {
        submission,
    }))
}

pub async fn get_submission(
    State(state): State<AppState>,
    Path(submission_id): Path<Uuid>,
) -> Result<Json<crate::models::Submission>, AppError> {
    let submission =
        services::submission_service::get_submission(
            &state.db,
            submission_id,
        )
        .await?;

    Ok(Json(submission))
}

pub async fn get_bounty_submissions(
    State(state): State<AppState>,
    Path(bounty_id): Path<Uuid>,
) -> Result<Json<Vec<crate::models::Submission>>, AppError> {
    let submissions =
        services::submission_service::get_bounty_submissions(
            &state.db,
            bounty_id,
        )
        .await?;

    Ok(Json(submissions))
}

pub async fn approve_submission(
    State(state): State<AppState>,
    Path(submission_id): Path<Uuid>,
) -> Result<Json<crate::models::Submission>, AppError> {
    let submission =
        services::submission_service::approve_submission(
            &state.db,
            submission_id,
        )
        .await?;

    Ok(Json(submission))
}

pub async fn reject_submission(
    State(state): State<AppState>,
    Path(submission_id): Path<Uuid>,
) -> Result<Json<crate::models::Submission>, AppError> {
    let submission =
        services::submission_service::reject_submission(
            &state.db,
            submission_id,
        )
        .await?;

    Ok(Json(submission))
}