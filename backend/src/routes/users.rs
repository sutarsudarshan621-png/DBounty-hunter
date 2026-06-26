//backend/src/routes/users.rs
use axum::{
    routing::{get, put},
    Router,
};

use crate::{
    handlers::users,
    state::AppState,
};

pub fn routes() -> Router<AppState> {
    Router::new()
        .route("/me", get(users::get_me))
        .route("/me", put(users::update_me))
        .route("/leaderboard", get(users::get_leaderboard))
        .route("/:user_id", get(users::get_user))
}