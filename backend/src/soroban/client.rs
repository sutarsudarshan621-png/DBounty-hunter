//backend/src/soroban/client.rs
use anyhow::Result;
use reqwest::Client;
use serde_json::{json, Value};

#[derive(Clone)]
pub struct SorobanClient {
    pub rpc_url: String,
    pub client: Client,
}

impl SorobanClient {
    pub fn new(rpc_url: String) -> Self {
        Self {
            rpc_url,
            client: Client::new(),
        }
    }

    pub async fn call(
        &self,
        method: &str,
        params: Value,
    ) -> Result<Value> {
        let body = json!({
            "jsonrpc": "2.0",
            "id": 1,
            "method": method,
            "params": params
        });

        let response = self
            .client
            .post(&self.rpc_url)
            .json(&body)
            .send()
            .await?;

        let json: Value = response.json().await?;

        Ok(json)
    }

    pub async fn get_latest_ledger(
        &self,
    ) -> Result<Value> {
        self.call(
            "getLatestLedger",
            json!({}),
        )
        .await
    }
}