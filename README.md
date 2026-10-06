# Hush Lush – Restaurant Ordering App

A responsive single-page restaurant ordering application built with React and Vite. Users sign in or browse as a guest, search across the menu, filter by category, add dishes to a cart, review the cart total, and sign out — all protected behind mock-authentication route guards.

## Live Demo

Deployment: **Pending** – configure this line once the app is deployed to Vercel.

## Demo Credentials

| Email | Password |
| --- | --- |
| `test@hushlush.com` | `123456` |

> These are mock credentials used by the front-end-only authentication layer (`src/services/mockAuthService.js`). There is no real backend; the session is stored in `localStorage`. Email matching is case-insensitive and trims surrounding whitespace.

## Features

- Responsive Login screen with client-side validation, loading state, and error handling.
- Guest access that lets visitors browse the menu without an account.
- Protected `/home` route – unauthenticated visitors are redirected to `/login`.
- Public-only `/login` route – signed-in users are redirected to `/home`.
- Search across every menu category, with an empty state for no matches.
- Category filtering (For You, Chicken Chop, Fish, Burger, Pizza).
- Cart with per-item quantity controls, live item count, and a running total.
- Account panel with user info and sign-out.
- Custom 404 page for unknown routes.
- No dead controls – out-of-scope social login and “Use Email-ID Instead” options are visually disabled with explanatory tooltips.

## Tech Stack

- React 19
- React Router v7 with BrowserRouter SPA routing
- Vite 8
- Tailwind CSS v4
- Vitest + React Testing Library + jsdom (unit/A11y tests)
- ESLint 10 + React Hooks / React Refresh plugins

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the project |
| `npm run test` | Run Vitest in watch mode |
| `npm run test:run` | Run the Vitest suite once |

## Testing

The test suite covers:

- Login validation (required fields, malformed email, short password, error clearing).
- Authentication (valid credentials, case/padding-insensitive email, invalid credentials, loading state).
- Guest access.
- Route protection (unauthenticated `/home` redirect, signed-in `/login` redirect).
- Menu (category filtering, cross-category search, empty search state, cart add/count/total, sign-out).
- 404 page.

Run once with:

```bash
npm run test:run
```

## Deployment (Vercel)

```bash
npm run build
```

The repository includes `vercel.json` with an SPA rewrite so `BrowserRouter` deep links (e.g. `/home`) resolve to `index.html`. Deploy directly via the Vercel dashboard or CLI:

```bash
npx vercel --prod
```

## Project Structure

```
src/
  components/   Reusable UI (header, category tabs, food card, sheets, panels, loader, icons)
  context/      Auth context + provider
  data/         Local menu dataset
  pages/        Login, Home, NotFound
  routes/       Protected and public-only route guards
  services/     Mock authentication service
  test/         Vitest setup, helpers, and test suites
```