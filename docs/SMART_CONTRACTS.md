# Escrow Contract Spec (draft)

Functions: create_bounty, submit_work, approve_submission,
reject_submission, release_reward (internal, called by approve),
refund_creator, get_bounty.

Invariants:
- Funds locked until approval or expiry-refund.
- Only stored `creator` Address may approve/reject.
- Resubmission allowed after rejection, before deadline only.
