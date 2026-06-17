use axum::{Router, routing::get};
use crate::state::AppState;

pub fn routes() -> Router<AppState> {
    Router::new()
        .route("/", get(placeholder))
}

async fn placeholder() -> &'static str {
    "users endpoint — TODO"
}
