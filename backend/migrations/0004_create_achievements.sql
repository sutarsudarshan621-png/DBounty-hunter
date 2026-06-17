
CREATE TABLE achievements (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

```
user_id UUID NOT NULL
    REFERENCES users(id)
    ON DELETE CASCADE,

badge_code TEXT NOT NULL,

awarded_at TIMESTAMPTZ NOT NULL DEFAULT now(),

UNIQUE(user_id, badge_code)
```

);

CREATE INDEX idx_achievements_user
ON achievements(user_id);

CREATE INDEX idx_achievements_badge
ON achievements(badge_code);
