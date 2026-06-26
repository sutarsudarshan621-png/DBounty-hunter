// backend/src/routes/mod.rs

mod auth;
mod users;
mod bounties;
mod submissions;
mod achievements;
pub mod leaderboard;
mod notifications;
mod analytics;

pub mod transactions;

use axum::{
    http::{
        header,
        Method,
    },
    Router,
};

use tower_http::cors::{
    Any,
    CorsLayer,
};

use crate::state::AppState;

pub fn router(state: AppState) -> Router {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods([
            Method::GET,
            Method::POST,
            Method::PUT,
            Method::DELETE,
        ])
        .allow_headers([
            header::CONTENT_TYPE,
            header::AUTHORIZATION,
        ]);

    Router::new()
        .nest("/api/auth", auth::routes())
        .nest("/api/users", users::routes())
        .nest("/api/bounties", bounties::routes())
        .nest("/api/submissions", submissions::routes())
        .nest("/api/achievements", achievements::routes())
        .nest("/api/leaderboard", leaderboard::routes())
        .nest("/api/notifications", notifications::routes())
        .nest("/api/analytics", analytics::routes())
        .layer(cors)
        .with_state(state)
}