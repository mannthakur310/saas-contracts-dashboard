```md
# SaaS Contracts Dashboard


React + Tailwind SPA for a simulated contracts dashboard.


## Features
- Login (mock): accepts any username and password `test123`.
- Contracts dashboard with search, filters, pagination.
- Contract detail page with clauses, AI insights, evidence drawer.
- Upload modal (mocked uploads with simulated timeout).
- State management via React Context API.


## Setup
1. `npm install`
2. `npm run dev`
3. Open http://localhost:5173


## Notes / Decisions
- Mock API uses `public/contracts.json`. The app fetches `/contracts.json` for list and derives details in code.
- No backend required — this matches the assignment requirement of mocked uploads and mock auth.
- State: Context API chosen for simplicity and to avoid extra dependencies.


## Deployment
- Deploy to Vercel or Netlify by connecting the GitHub repo. Build command: `npm run build`. Publish `dist`.


## Assumptions
- Single user; multi-user and real auth are out of scope for this assignment.
- Contract detail content (clauses, evidence) is generated client-side for demo purposes.

