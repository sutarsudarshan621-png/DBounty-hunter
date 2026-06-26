//backend/src/routes/leaderboard.rs
use axum::{
    routing::get,
    Router,
};

use crate::{
    handlers::leaderboard,
    state::AppState,
};

pub fn routes() -> Router<AppState> {
    Router::new()
        .route("/", get(leaderboard::leaderboard))
}