CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tx_hash TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id),
    amount NUMERIC NOT NULL,
    asset TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
