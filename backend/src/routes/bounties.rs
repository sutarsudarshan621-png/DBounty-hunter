//backend/src/routes/bounties.rs
use axum::{
    routing::{delete, get, post, put},
    Router,
};

use crate::{
    handlers::bounties,
    state::AppState,
};

pub fn routes() -> Router<AppState> {
    Router::new()
        // Public
        .route("/", get(bounties::list_open_bounties))
        .route("/:bounty_id", get(bounties::get_bounty))

        // Protected
        .route("/", post(bounties::create_bounty))
        .route("/my", get(bounties::my_bounties))
        .route("/:bounty_id", put(bounties::update_bounty))
        .route("/:bounty_id", delete(bounties::delete_bounty))
}