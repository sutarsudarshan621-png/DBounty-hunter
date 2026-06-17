//backend/src/routes/auth.rs
use axum::{
    routing::post,
    Router,
};

use crate::{
    handlers::auth,
    state::AppState,
};

pub fn routes() -> Router<AppState> {
    Router::new()
        .route(
            "/login",
            post(auth::login),
        )
}