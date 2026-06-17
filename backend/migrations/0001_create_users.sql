CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

wallet_address TEXT UNIQUE NOT NULL,

reputation INTEGER NOT NULL DEFAULT 0,
completed_tasks INTEGER NOT NULL DEFAULT 0,

created_at TIMESTAMPTZ NOT NULL DEFAULT now()

);

CREATE INDEX idx_users_wallet
ON users(wallet_address);

CREATE INDEX idx_users_reputation
ON users(reputation DESC);