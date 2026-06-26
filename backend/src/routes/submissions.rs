//backend/src/routes/submissions.rs
use axum::{
    routing::{get, post},
    Router,
};

use crate::{
    handlers::submissions,
    state::AppState,
};

pub fn routes() -> Router<AppState> {
    Router::new()
        .route("/", post(submissions::create_submission))
        .route("/:submission_id", get(submissions::get_submission))
        .route(
            "/bounty/:bounty_id",
            get(submissions::get_bounty_submissions),
        )
        .route(
            "/:submission_id/approve",
            post(submissions::approve_submission),
        )
        .route(
            "/:submission_id/reject",
            post(submissions::reject_submission),
        )
}