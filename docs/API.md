# API Reference (draft)

Base URL: `/api`

- `POST /auth/login` — wallet-signature based auth
- `GET /bounties` — list/filter bounties
- `POST /bounties` — create bounty (locks funds via Soroban)
- `GET /bounties/:id` — bounty detail
- `POST /submissions` — submit work
- `POST /submissions/:id/approve`
- `POST /submissions/:id/reject`
- `GET /leaderboard`
- `GET /analytics`
