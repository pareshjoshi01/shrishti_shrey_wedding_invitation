# Validation — 1 October 2026

Passed:
- TypeScript no-emit checking.
- Production Vite build with standalone Cloudflare Worker configuration.
- D1 initial schema and login-attempt migration applied to local emulated storage.
- Signed session acceptance, expiration, tampering rejection, password/secret rotation, and incorrect password rejection.
- Local Worker HTTP checks: unauthorized management rejection, password login, family invitation creation, invitation rendering, rejection of an RSVP for an uninvited event, saved RSVP read-back, and cross-origin/missing-origin write rejection.
- Local R2 artwork upload and exact byte read-back.
- Logout clears management access.

The local preview helper uses the same .wrangler/state path as local migrations.
This environment required a temporary network-interface workaround to run local Wrangler; that environment-specific workaround is not part of the package.

Not verified:
- Deployment to a real user-owned Cloudflare account.
- Production free-plan CPU usage and resource limits.
- Visual browser animation QA or WebMCP browser registration.
- GitHub-connected build permissions and first automated deployment.

The ZIP includes no test database, sample guest records, local secrets, dependency installations or build output.
