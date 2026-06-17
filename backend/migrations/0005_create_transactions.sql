
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
