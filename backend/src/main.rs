// backend/src/main.rs
mod config;
mod db;
mod errors;
mod handlers;
mod middleware;
mod models;
mod routes;
mod services;
mod soroban;
mod state;
mod utils;

use std::net::SocketAddr;

use anyhow::Result;
use tracing::info;

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt()
        .with_target(true)
        .with_thread_ids(true)
        .with_level(true)
        .init();

    let config = config::Config::from_env()?;

    info!("connecting services");

    let state = state::AppState::new(&config)
        .await?;

    info!("building router");

    let app = routes::router(state);

    let addr: SocketAddr = format!(
        "0.0.0.0:{}",
        config.port
    )
    .parse()?;

    info!("server listening on {}", addr);

    let listener =
        tokio::net::TcpListener::bind(addr)
            .await?;

    axum::serve(
        listener,
        app,
    )
    .await?;

    Ok(())
}