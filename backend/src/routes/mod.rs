//backend/src/routes/mod.rs
mod auth;
mod users;
mod bounties;
mod submissions;
mod achievements;
mod leaderboard;
mod notifications;
mod analytics;

use axum::Router;
use crate::state::AppState;

pub fn router(state: AppState) -> Router {
    Router::new()
        .nest("/api/auth", auth::routes())
        .nest("/api/users", users::routes())
        .nest("/api/bounties", bounties::routes())
        .nest("/api/submissions", submissions::routes())
        .nest("/api/achievements", achievements::routes())
        .nest("/api/leaderboard", leaderboard::routes())
        .nest("/api/notifications", notifications::routes())
        .nest("/api/analytics", analytics::routes())
        .with_state(state)
}
