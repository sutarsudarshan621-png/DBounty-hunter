CREATE TABLE submissions (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

```
bounty_id UUID NOT NULL
    REFERENCES bounties(id)
    ON DELETE CASCADE,

contributor_id UUID NOT NULL
    REFERENCES users(id)
    ON DELETE CASCADE,

proof_hash TEXT,

content TEXT NOT NULL,

status TEXT NOT NULL DEFAULT 'pending'
    CHECK (
        status IN (
            'pending',
            'approved',
            'rejected'
        )
    ),

created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

UNIQUE (bounty_id, contributor_id)
```

);

CREATE INDEX idx_submissions_bounty
ON submissions(bounty_id);

CREATE INDEX idx_submissions_contributor
ON submissions(contributor_id);

CREATE INDEX idx_submissions_status
ON submissions(status);

CREATE INDEX idx_submissions_created_at
ON submissions(created_at DESC);


CREATE TABLE transactions (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

```
tx_hash TEXT UNIQUE NOT NULL,

user_id UUID NOT NULL
    REFERENCES users(id)
    ON DELETE CASCADE,

amount NUMERIC(20,7) NOT NULL,

asset TEXT NOT NULL
    CHECK (
        asset IN ('XLM', 'USDC')
    ),

type TEXT NOT NULL
    CHECK (
        type IN (
            'deposit',
            'reward',
            'refund'
        )
    ),

created_at TIMESTAMPTZ NOT NULL DEFAULT now()
```

);

CREATE INDEX idx_transactions_user
ON transactions(user_id);

CREATE INDEX idx_transactions_hash
ON transactions(tx_hash);

CREATE INDEX idx_transactions_type
ON transactions(type);

CREATE INDEX idx_transactions_created_at
ON transactions(created_at DESC);
