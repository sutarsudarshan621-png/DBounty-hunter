use axum::{
    routing::get,
    Router,
};

use crate::{
    handlers::transactions,
    state::AppState,
};

pub fn routes() -> Router<AppState> {
    Router::new().route(
        "/user/:user_id",
        get(
            transactions::get_user_transactions,
        ),
    )
}