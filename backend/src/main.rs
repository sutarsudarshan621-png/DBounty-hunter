mod config;
mod state;
mod routes;
mod handlers;
mod models;
mod services;
mod soroban;
mod db;
mod middleware;
mod errors;
mod utils;

use std::net::SocketAddr;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();
    let cfg = config::Config::from_env()?;
    let app_state = state::AppState::new(&cfg).await?;
    let app = routes::router(app_state);

    let addr: SocketAddr = format!("0.0.0.0:{}", cfg.port).parse()?;
    tracing::info!("listening on {addr}");
    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;
    Ok(())
}
