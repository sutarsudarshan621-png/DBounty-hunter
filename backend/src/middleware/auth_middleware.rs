//backend/src/middleware/auth_middleware.rs
use axum::{
    extract::{Request, State},
    http::header::AUTHORIZATION,
    middleware::Next,
    response::Response,
};
use jsonwebtoken::{
    decode,
    DecodingKey,
    Validation,
};
use serde::{Deserialize, Serialize};

use crate::{
    errors::AppError,
    state::AppState,
};

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

pub async fn auth_middleware(
    State(state): State<AppState>,
    mut request: Request,
    next: Next,
) -> Result<Response, AppError> {
    let auth_header = request
        .headers()
        .get(AUTHORIZATION)
        .and_then(|v| v.to_str().ok())
        .ok_or(AppError::Unauthorized)?;

    let token = auth_header
        .strip_prefix("Bearer ")
        .ok_or(AppError::Unauthorized)?;

    let token_data = decode::<Claims>(
        token,
        &DecodingKey::from_secret(
            state.jwt_secret.as_bytes(),
        ),
        &Validation::default(),
    )
    .map_err(|_| AppError::Unauthorized)?;

    request.extensions_mut().insert(
        token_data.claims,
    );

    Ok(next.run(request).await)
}