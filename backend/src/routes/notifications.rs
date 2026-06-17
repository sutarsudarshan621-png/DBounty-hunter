//backend/src/routes/notifications.rs
use axum::{
    routing::get,
    Router,
};

use crate::{
    handlers::notifications,
    state::AppState,
};

pub fn routes() -> Router<AppState> {
    Router::new()
        .route(
            "/",
            get(notifications::get_notifications),
        )
}