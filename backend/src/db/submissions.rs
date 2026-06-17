use sqlx::PgPool;
use uuid::Uuid;

use crate::{
    errors::{AppError, AppResult},
    models::Submission,
};

pub async fn create_submission(
    pool: &PgPool,
    bounty_id: Uuid,
    contributor_id: Uuid,
    proof_hash: Option<&str>,
    content: &str,
) -> AppResult<Submission> {
    let submission = sqlx::query_as::<_, Submission>(
        r#"
        INSERT INTO submissions (
            bounty_id,
            contributor_id,
            proof_hash,
            content
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
        "#,
    )
    .bind(bounty_id)
    .bind(contributor_id)
    .bind(proof_hash)
    .bind(content)
    .fetch_one(pool)
    .await?;

    Ok(submission)
}

pub async fn get_submission(
    pool: &PgPool,
    submission_id: Uuid,
) -> AppResult<Submission> {
    let submission = sqlx::query_as::<_, Submission>(
        r#"
        SELECT *
        FROM submissions
        WHERE id = $1
        "#,
    )
    .bind(submission_id)
    .fetch_optional(pool)
    .await?
    .ok_or(AppError::NotFound)?;

    Ok(submission)
}

pub async fn get_bounty_submissions(
    pool: &PgPool,
    bounty_id: Uuid,
) -> AppResult<Vec<Submission>> {
    let submissions = sqlx::query_as::<_, Submission>(
        r#"
        SELECT *
        FROM submissions
        WHERE bounty_id = $1
        ORDER BY created_at DESC
        "#,
    )
    .bind(bounty_id)
    .fetch_all(pool)
    .await?;

    Ok(submissions)
}

pub async fn get_contributor_submissions(
    pool: &PgPool,
    contributor_id: Uuid,
) -> AppResult<Vec<Submission>> {
    let submissions = sqlx::query_as::<_, Submission>(
        r#"
        SELECT *
        FROM submissions
        WHERE contributor_id = $1
        ORDER BY created_at DESC
        "#,
    )
    .bind(contributor_id)
    .fetch_all(pool)
    .await?;

    Ok(submissions)
}

pub async fn update_status(
    pool: &PgPool,
    submission_id: Uuid,
    status: &str,
) -> AppResult<Submission> {
    let submission = sqlx::query_as::<_, Submission>(
        r#"
        UPDATE submissions
        SET
            status = $2,
            updated_at = NOW()
        WHERE id = $1
        RETURNING *
        "#,
    )
    .bind(submission_id)
    .bind(status)
    .fetch_optional(pool)
    .await?
    .ok_or(AppError::NotFound)?;

    Ok(submission)
}

pub async fn get_by_bounty_and_contributor(
    pool: &PgPool,
    bounty_id: Uuid,
    contributor_id: Uuid,
) -> AppResult<Submission> {
    let submission = sqlx::query_as::<_, Submission>(
        r#"
        SELECT *
        FROM submissions
        WHERE bounty_id = $1
        AND contributor_id = $2
        "#,
    )
    .bind(bounty_id)
    .bind(contributor_id)
    .fetch_optional(pool)
    .await?
    .ok_or(AppError::NotFound)?;

    Ok(submission)
}