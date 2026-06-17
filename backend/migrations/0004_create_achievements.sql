CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    badge_name TEXT NOT NULL,
    awarded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
