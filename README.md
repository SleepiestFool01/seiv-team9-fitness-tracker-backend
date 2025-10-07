# Fitness Tracker Backend — Quick workflow

This document explains, in simple steps, how the backend is structured and how a request flows through it.

## High-level overview
- server starts and initializes Express + Sequelize (database).
- Routes are mounted under `/tutorial` and delegate to controllers.
- Authorization middleware checks sessions for protected routes.
- Controllers use Sequelize models (User, Session, Tutorial, Lesson) to read/write the DB and return JSON.

## Startup
1. `server.js` creates the Express app and configures middleware (CORS, JSON/urlencoded parsers).
2. Sequelize is initialized and `db.sequelize.sync()` ensures models/tables exist.
3. The route tree from `app/routes/index.js` is mounted (the project mounts under `/tutorial`).

## Route & middleware flow (simple)
1. Client sends an HTTP request (for example: POST `/tutorial/login`).
2. Express parses the body and runs any global middleware (CORS, body parsers).
3. Request is routed to the appropriate router (auth, users, tutorials, lessons).
4. If the route requires authentication, the `authenticate` middleware in `app/authorization/authorization.js`:
   - reads the Bearer token from the Authorization header,
   - checks the `Session` model for a matching, non-expired token,
   - calls `next()` when valid, otherwise returns 401.
5. The controller for the route handles the request, uses Sequelize models to read/write data, and sends JSON back.

## Auth flows (what happens on login / authorize / logout)
- Login (`app/controllers/auth.controller.js` - `exports.login`):
  1. Receives a Google credential (id token) from the client.
  2. Verifies the id token with Google and extracts `email`, `given_name`, `family_name`.
  3. Finds or creates a `User` with that email.
  4. Checks `Session` for an existing token for that email:
     - If there is a valid session, returns the existing token and user info.
     - If no valid session (expired or missing), creates a new JWT, stores it in `Session`, and returns it.

- Authorize (`exports.authorize`): exchanges an authorization `code` for Google tokens, updates the `User` with a `refresh_token` and `expiration_date`.

- Logout (`exports.logout`): finds the session by token and clears/invalidates it in the `Session` table.

## Main models
- User — stores user profile + optional Google refresh token info (`app/models/user.model.js`).
- Session — stores JWT tokens, associated email/user, and expiration (`app/models/session.model.js`).
- Tutorial — tutorial records (`app/models/tutorial.model.js`).
- Lesson — lesson records associated to tutorials (`app/models/lesson.model.js`).

Associations are defined in `app/models/index.js` (User hasMany Sessions, User hasMany Tutorials, Tutorial hasMany Lessons).

## Environment variables
- NODE_ENV (optional)
- CLIENT_ID and CLIENT_SECRET — for Google OAuth flows.
- DB connection variables are read by `app/config/db.config.js`.
- JWT secret is in `app/config/auth.config.js` (or a secret env referenced there).

## Quick example: POST /tutorial/login (end-to-end, simple steps)
1. Client sends id token in `req.body.credential` to POST `/tutorial/login`.
2. Backend verifies id token with Google.
3. Backend finds/creates the `User` and checks `Session`.
4. If needed, backend creates a signed JWT and saves a `Session` record.
5. Backend responds with JSON: `{ email, fName, lName, userId, token }`.

## How to run (development)
1. Install dependencies:

```bash
npm install
```

2. Set required environment variables (example for macOS/zsh):

```bash
export CLIENT_ID=your_google_client_id
export CLIENT_SECRET=your_google_client_secret
# plus any DB_* vars used by app/config/db.config.js
```

3. Start the server:

```bash
npm start
```

4. Run tests (project includes tests in `__tests__`):

```bash
npm test
```

## Files to inspect for details
- `server.js` — entry point and middleware setup.
- `app/routes/*.js` — route definitions and mounts.
- `app/authorization/authorization.js` — token/session middleware.
- `app/controllers/auth.controller.js` — login/authorize/logout logic.
- `app/controllers/*.js` — other CRUD handlers.
- `app/models/*.js` — Sequelize models and associations.

If you'd like, I can: add a simple sequence diagram for one endpoint, expand the environment and setup steps for a specific DB (SQLite/Postgres), or create a short sample client request (curl or Postman) for login. Which would help most?
