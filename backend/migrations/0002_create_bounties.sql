CREATE TABLE bounties (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

contract_bounty_id TEXT UNIQUE NOT NULL,
escrow_contract_address TEXT NOT NULL,

creator_id UUID NOT NULL
    REFERENCES users(id)
    ON DELETE CASCADE,

title TEXT NOT NULL,
description TEXT NOT NULL,

reward_amount NUMERIC(20,7) NOT NULL,

reward_asset TEXT NOT NULL
    CHECK (
        reward_asset IN ('XLM', 'USDC')
    ),

category TEXT,

status TEXT NOT NULL DEFAULT 'open'
    CHECK (
        status IN (
            'open',
            'submitted',
            'completed',
            'expired',
            'cancelled'
        )
    )

deadline TIMESTAMPTZ NOT NULL,

created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT now()

);

CREATE INDEX idx_bounties_creator
ON bounties(creator_id);

CREATE INDEX idx_bounties_status
ON bounties(status);

CREATE INDEX idx_bounties_deadline
ON bounties(deadline);

CREATE INDEX idx_bounties_category
ON bounties(category);

CREATE INDEX idx_bounties_created_at
ON bounties(created_at DESC);

CREATE INDEX idx_bounties_contract_id
ON bounties(contract_bounty_id);