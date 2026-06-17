//backend/src/services/notification_service.rs  
use tracing::info;
use uuid::Uuid;

use crate::errors::AppResult;

pub async fn notify_bounty_created(
    creator_id: Uuid,
    bounty_id: Uuid,
) -> AppResult<()> {
    info!(
        "creator={} created bounty={}",
        creator_id,
        bounty_id
    );

    Ok(())
}

pub async fn notify_submission_received(
    contributor_id: Uuid,
    bounty_id: Uuid,
) -> AppResult<()> {
    info!(
        "contributor={} submitted work for bounty={}",
        contributor_id,
        bounty_id
    );

    Ok(())
}

pub async fn notify_submission_approved(
    contributor_id: Uuid,
    bounty_id: Uuid,
) -> AppResult<()> {
    info!(
        "submission approved contributor={} bounty={}",
        contributor_id,
        bounty_id
    );

    Ok(())
}

pub async fn notify_submission_rejected(
    contributor_id: Uuid,
    bounty_id: Uuid,
) -> AppResult<()> {
    info!(
        "submission rejected contributor={} bounty={}",
        contributor_id,
        bounty_id
    );

    Ok(())
}