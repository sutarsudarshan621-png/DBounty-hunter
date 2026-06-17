CREATE TABLE bounties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID NOT NULL REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    reward_amount NUMERIC NOT NULL,
    reward_asset TEXT NOT NULL CHECK (reward_asset IN ('XLM','USDC')),
    category TEXT,
    status TEXT NOT NULL DEFAULT 'open',
    deadline TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
