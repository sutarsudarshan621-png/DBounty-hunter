use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;

pub type AppResult<T> = Result<T, AppError>;

#[derive(thiserror::Error, Debug)]
pub enum AppError {
    #[error("not found")]
    NotFound,

    #[error("unauthorized")]
    Unauthorized,

    #[error("bad request: {0}")]
    BadRequest(String),

    #[error("database error")]
    Database(#[from] sqlx::Error),

    #[error(transparent)]
    Internal(#[from] anyhow::Error),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, message) = match &self {
            AppError::NotFound => (
                StatusCode::NOT_FOUND,
                "resource not found",
            ),

            AppError::Unauthorized => (
                StatusCode::UNAUTHORIZED,
                "unauthorized",
            ),

            AppError::BadRequest(msg) => (
                StatusCode::BAD_REQUEST,
                msg.as_str(),
            ),

            AppError::Database(_) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                "database error",
            ),

            AppError::Internal(_) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                "internal server error",
            ),
        };

        (
            status,
            Json(json!({
                "success": false,
                "error": message
            })),
        )
            .into_response()
    }
}