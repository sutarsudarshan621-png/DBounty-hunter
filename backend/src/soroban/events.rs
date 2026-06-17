//backend/src/soroban/events.rs
use anyhow::Result;

use super::client::SorobanClient;

#[derive(Clone)]
pub struct EventListener {
    client: SorobanClient,
}

impl EventListener {
    pub fn new(client: SorobanClient) -> Self {
        Self { client }
    }

    pub async fn sync_events(&self) -> Result<()> {
        tracing::info!(
            "Soroban event sync not implemented yet"
        );

        Ok(())
    }

    pub async fn poll_latest_events(
        &self,
    ) -> Result<()> {
        tracing::info!(
            "Polling latest Soroban events"
        );

        let _ = self
            .client
            .get_latest_ledger()
            .await?;

        Ok(())
    }
}