use sqlx::PgPool;
use uuid::Uuid;

use crate::{
    db,
    errors::AppResult,
    models::Submission,
    services::{
        blockchain_service,
        notification_service,
        reputation_service,
    },
};

pub async fn create_submission(
    pool: &PgPool,
    bounty_id: Uuid,
    contributor_id: Uuid,
    proof_hash: Option<String>,
    content: String,
) -> AppResult<Submission> {
    let submission = db::submissions::create_submission(
        pool,
        bounty_id,
        contributor_id,
        proof_hash.as_deref(),
        &content,
    )
    .await?;

    db::bounties::update_status(
        pool,
        bounty_id,
        "submitted",
    )
    .await?;

    notification_service::notify_submission_received(
        contributor_id,
        bounty_id,
    )
    .await?;

    Ok(submission)
}

pub async fn get_submission(
    pool: &PgPool,
    submission_id: Uuid,
) -> AppResult<Submission> {
    db::submissions::get_submission(
        pool,
        submission_id,
    )
    .await
}

pub async fn get_bounty_submissions(
    pool: &PgPool,
    bounty_id: Uuid,
) -> AppResult<Vec<Submission>> {
    db::submissions::get_bounty_submissions(
        pool,
        bounty_id,
    )
    .await
}

pub async fn approve_submission(
    pool: &PgPool,
    submission_id: Uuid,
) -> AppResult<Submission> {
    let submission = db::submissions::get_submission(
        pool,
        submission_id,
    )
    .await?;

    let bounty = db::bounties::get_bounty(
        pool,
        submission.bounty_id,
    )
    .await?;

    let receipt =
        blockchain_service::approve_submission(
            &bounty.contract_bounty_id,
        )
        .await?;

    db::submissions::update_status(
        pool,
        submission.id,
        "approved",
    )
    .await?;

    db::bounties::update_status(
        pool,
        bounty.id,
        "completed",
    )
    .await?;

    db::transactions::create_transaction(
        pool,
        &receipt.tx_hash,
        submission.contributor_id,
        bounty.reward_amount,
        &bounty.reward_asset,
        "reward",
    )
    .await?;

    reputation_service::reward_completed_bounty(
        pool,
        submission.contributor_id,
    )
    .await?;

    let _ = db::achievements::award_badge(
        pool,
        submission.contributor_id,
        "FIRST_REWARD",
    )
    .await;

    notification_service::notify_submission_approved(
        submission.contributor_id,
        bounty.id,
    )
    .await?;

    db::submissions::get_submission(
        pool,
        submission.id,
    )
    .await
}

pub async fn reject_submission(
    pool: &PgPool,
    submission_id: Uuid,
) -> AppResult<Submission> {
    let submission = db::submissions::get_submission(
        pool,
        submission_id,
    )
    .await?;

    let bounty = db::bounties::get_bounty(
        pool,
        submission.bounty_id,
    )
    .await?;

    blockchain_service::reject_submission(
        &bounty.contract_bounty_id,
    )
    .await?;

    db::submissions::update_status(
        pool,
        submission.id,
        "rejected",
    )
    .await?;

    db::bounties::update_status(
        pool,
        bounty.id,
        "open",
    )
    .await?;

    notification_service::notify_submission_rejected(
        submission.contributor_id,
        bounty.id,
    )
    .await?;

    db::submissions::get_submission(
        pool,
        submission.id,
    )
    .await
}