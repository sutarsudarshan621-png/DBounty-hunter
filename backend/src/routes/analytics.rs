//backend/src/routes/analytics.rs
use axum::{
    routing::get,
    Router,
};

use crate::{
    handlers::analytics,
    state::AppState,
};

pub fn routes() -> Router<AppState> {
    Router::new()
        .route(
            "/",
            get(analytics::get_analytics),
        )
}