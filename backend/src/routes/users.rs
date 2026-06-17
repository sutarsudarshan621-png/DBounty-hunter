//backend/src/routes/users.rs
use axum::{
    routing::get,
    Router,
};

use crate::{
    handlers::users,
    state::AppState,
};

pub fn routes() -> Router<AppState> {
    Router::new()
        .route(
            "/:user_id",
            get(users::get_user),
        )
        .route(
            "/leaderboard",
            get(users::get_leaderboard),
        )
}