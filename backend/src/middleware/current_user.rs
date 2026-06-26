use axum::{
    async_trait,
    extract::FromRequestParts,
    http::request::Parts,
};

use jsonwebtoken::{
    decode,
    DecodingKey,
    Validation,
};

use crate::{
    errors::AppError,
    state::AppState,
};

#[derive(Clone)]
pub struct CurrentUser {
    pub wallet_address: String,
}

#[async_trait]
impl FromRequestParts<AppState> for CurrentUser {
    type Rejection = AppError;

    async fn from_request_parts(
        parts: &mut Parts,
        state: &AppState,
    ) -> Result<Self, Self::Rejection> {
        let auth = parts
            .headers
            .get("Authorization")
            .and_then(|h| h.to_str().ok())
            .ok_or(AppError::Unauthorized)?;

        let token = auth
            .strip_prefix("Bearer ")
            .ok_or(AppError::Unauthorized)?;

        let token_data =
            decode::<crate::handlers::auth::Claims>(
                token,
                &DecodingKey::from_secret(
                    state.jwt_secret.as_bytes(),
                ),
                &Validation::default(),
            )
            .map_err(|_| AppError::Unauthorized)?;

        Ok(CurrentUser {
            wallet_address:
                token_data.claims.sub,
        })
    }
}