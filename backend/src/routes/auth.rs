//backend/src/routes/auth.rs
use axum::{
    routing::{get, post},
    Router,
};

use crate::{
    handlers::auth,
    state::AppState,
};

pub fn routes() -> Router<AppState> {
    Router::new()
        .route("/login", post(auth::login))
        .route("/me", get(auth::me))
}