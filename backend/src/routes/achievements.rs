//back=end/src/routes/achievements.rs
use axum::{
    routing::get,
    Router,
};

use crate::{
    handlers::achievements,
    state::AppState,
};

pub fn routes() -> Router<AppState> {
    Router::new()
        .route(
            "/user/:user_id",
            get(
                achievements::get_user_achievements,
            ),
        )
}