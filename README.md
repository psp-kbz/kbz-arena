# KBZ Arena

KBZ Arena is a mobile-first tournament hub for esports players. The current app prototype lets users browse tournaments, select a team, submit a registration request, track approval and payment status, and manage their in-game profile details in a compact app-like interface.

## Overview

This project is built with React, TypeScript, and Vite. It uses a mobile shell with a persistent bottom navigation and a dark, neon-accented visual system tailored for gaming and tournament flows.

The experience currently centers around two supported games:

- MLBB
- PUBG

## User Journey

The implemented flow is:

1. Splash screen introduces the KBZ Arena brand.
2. Home screen shows tournaments filtered by game.
3. Team Selection lets the user inspect available squads for a tournament.
4. Registration modal collects role and game-specific player ID details.
5. Request History lists submitted applications.
6. Request Status shows the progress from Request Sent to Approved to Paid.
7. Profile stores player identity and linked game IDs.
8. My Team appears when the user has an approved or paid squad.

## Design Direction

The UI is designed as a lightweight tournament companion rather than a generic dashboard.

- Mobile-first layout with an app-shell feel
- Dark arena-style background with cyan and blue glow accents
- Card-based presentation for tournaments, requests, and team details
- Motion-driven transitions using Framer Motion
- Compact interaction patterns suited for small screens
- Conditional navigation that reflects active tournament participation

Core styling lives in `src/styles/arena.css`, while the layout shell is defined in `src/layouts/mobile-layout.tsx`.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- Axios
- Framer Motion
- Lucide React

## Project Structure

```text
KBZArena/
├── public/
│   └── source/
├── src/
│   ├── assets/
│   │   └── logo/
│   ├── components/
│   │   ├── arena/
│   │   │   └── registration-modal.tsx
│   │   └── ui/
│   ├── config/
│   │   ├── consts.ts
│   │   ├── envs.ts
│   │   └── router.tsx
│   ├── hooks/
│   │   └── use-prevent-zoom.tsx
│   ├── layouts/
│   │   └── mobile-layout.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── libs/
│   │   ├── axios/
│   │   └── dayjs/
│   ├── mock/
│   │   └── arena-data.ts
│   ├── pages/
│   │   ├── auth/
│   │   │   └── splash.tsx
│   │   ├── home/
│   │   │   └── home.tsx
│   │   ├── profile/
│   │   │   └── my-profile.tsx
│   │   ├── requests/
│   │   │   ├── request-history.tsx
│   │   │   └── request-status.tsx
│   │   ├── team/
│   │   │   └── my-team.tsx
│   │   └── tournaments/
│   │       └── team-selection.tsx
│   ├── services/
│   ├── stores/
│   ├── styles/
│   │   └── arena.css
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── environments/
├── package.json
└── vite.config.ts
```

## Routing

Current routes are configured in `src/config/router.tsx` using `MemoryRouter`.

| Route                              | Screen           | Purpose                                       |
| ---------------------------------- | ---------------- | --------------------------------------------- |
| `/`                                | Splash           | Brand entry and quick transition into the app |
| `/home`                            | Home             | Tournament discovery by game                  |
| `/requests`                        | My Requests      | History of submitted team join requests       |
| `/requests/:requestId/status`      | Status & Payment | Progress tracking and payment state           |
| `/tournaments/:tournamentId/teams` | Team Selection   | Team list and registration entry point        |
| `/profile`                         | My Profile       | Personal details and saved game IDs           |
| `/team`                            | My Team          | Active squad view, shown only when applicable |

## Feature Modules

### Splash

- Animated logo and intro copy
- Auto-navigation into the home screen

### Home

- Toggle between MLBB and PUBG
- View tournament cards with prize pool and date
- Jump into team selection for a specific tournament

### Team Selection

- Filter teams by selected tournament
- View current members and remaining slots
- Open the registration modal for a chosen squad

### Registration Modal

- Game-specific fields for MLBB and PUBG
- Role selection driven by mock game metadata
- Submission redirects to request tracking

### Requests

- Summary cards for each join request
- Status chip for Request Sent, Approved, and Paid
- Drill-down into a status detail screen

### Profile

- Read-only personal identity section
- Editable linked game IDs
- Lightweight account status summary

### My Team

- Active squad hero card
- Discord invite copy action
- Member list with role labels and captain state

## Data Model

The current prototype is driven by mock data in `src/mock/arena-data.ts`.

That file currently provides:

- tournament catalog
- team lists per tournament
- join request history
- profile data
- team roster data
- role definitions by game
- accepted squad state used to reveal the My Team tab

This keeps the screens testable before wiring them to real backend services.

## Development

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Run linting

```bash
npm run lint
```

### Preview the production build

```bash
npm run preview
```

## Implementation Notes

- `src/main.tsx` wraps the app with `QueryClientProvider`.
- `src/App.tsx` loads the arena theme and prevents mobile pinch zoom.
- `src/layouts/mobile-layout.tsx` controls the top app bar and bottom tab navigation.
- `src/styles/arena.css` contains the main visual language for the app.
- `src/services/` and `src/stores/` are available for API integration and state expansion.

## Next Steps

Recommended improvements for the next iteration:

1. Replace mock tournament and request data with live API integrations.
2. Persist profile edits and registration submissions.
3. Switch from `MemoryRouter` to browser-based routing when deployment requirements are finalized.
4. Add validation and error states to the registration and profile forms.
5. Introduce unit and UI tests for the tournament and request flows.
