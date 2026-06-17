//backend/src/routes/bounties.rs
use axum::{
    routing::{get, post},
    Router,
};

use crate::{
    handlers::bounties,
    state::AppState,
};

pub fn routes() -> Router<AppState> {
    Router::new()
        .route(
            "/",
            get(bounties::list_open_bounties)
                .post(bounties::create_bounty),
        )
        .route(
            "/:bounty_id",
            get(bounties::get_bounty),
        )
}