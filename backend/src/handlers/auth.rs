//backend/src/handlers/auth.rs
use axum::{
    extract::State,
    Json,
};
use chrono::{Duration, Utc};
use jsonwebtoken::{
    encode,
    EncodingKey,
    Header,
};
use serde::{
    Deserialize,
    Serialize,
};


use crate::{
    errors::AppError,
    middleware::current_user::CurrentUser,
    services,
    state::AppState,
};

#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    pub wallet_address: String,
}

#[derive(Debug, Serialize)]
pub struct LoginResponse {
    pub token: String,
}

#[derive(
    Debug,
    Clone,
    Serialize,
    Deserialize,
)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

pub async fn login(
    
    State(state): State<AppState>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<LoginResponse>, AppError> {

    if payload.wallet_address.trim().is_empty() {
    return Err(AppError::BadRequest(
        "wallet address required".to_string(),
    ));
}
    let user = services::auth_service::get_or_create_user(
        &state.db,
        &payload.wallet_address,
    )
    .await?;

    let expiration = Utc::now()
        + Duration::days(7);

    let claims = Claims {
        sub: user.wallet_address,
        exp: expiration.timestamp() as usize,
    };

    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(
            state.jwt_secret.as_bytes(),
        ),
    )
    .map_err(|e| {
        AppError::Internal(e.into())
    })?;

    Ok(Json(LoginResponse {
        token,
    }))
}
pub async fn me(
    State(state): State<AppState>,
    current_user: CurrentUser,
) -> Result<Json<crate::models::User>, AppError> {
    let user = services::auth_service::get_user(
        &state.db,
        &current_user.wallet_address,
    )
    .await?;

    Ok(Json(user))
}