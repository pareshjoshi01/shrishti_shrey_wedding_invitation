# Nikki Wedding — Cloudflare-ready invitation

A standalone edition of Srishti & Shrey's wedding invitation. The existing ChatGPT-hosted Site remains running independently. This export has no Sites project identity or ChatGPT authentication dependency.

## Included features
- Animated envelope and individually replaceable event artwork.
- Family-specific links showing only their invited events.
- Saved RSVPs, invited-event validation and CSV export.
- Editable venues, exact map links and calendar files in India time.
- Family management password, signed 12-hour sessions, HTTP-only cookies, same-origin write checks and login attempt limits.
- Cloudflare Workers configuration, D1 migrations, R2 upload support and deployment scripts.

## What you need
A Cloudflare account; Node.js >=22.13.0; pnpm; optionally a GitHub account for automatic deployments. R2 requires subscription/billing setup even when usage stays within its free allowance. This is a Worker application, not a ZIP you can upload to static Pages hosting.

## First deployment from your computer
Open a terminal in the extracted project folder.

1. Install the exact dependencies and sign in:

   ```sh
   pnpm install --frozen-lockfile
   pnpm exec wrangler login
   ```

2. Create the database and image bucket:

   ```sh
   pnpm exec wrangler d1 create nikki-wedding-db
   pnpm exec wrangler r2 bucket create nikki-wedding-artwork
   ```

   Copy the database_id from Cloudflare's output, then replace YOUR_DATABASE_ID below:

   ```sh
   node scripts/configure.mjs YOUR_DATABASE_ID
   ```

   If the R2 bucket name is already in use in your account, choose another name and pass it as the second configure argument.

3. Build and publish:

   ```sh
   pnpm run typecheck
   pnpm run test:session
   pnpm run build
   pnpm run deploy
   ```

   The deploy script applies pending production D1 migrations, then deploys the built Worker. The administrator login fails closed until you configure the secrets below. Cloudflare prints your actual workers.dev URL; use that URL, not the previous ChatGPT Site address.

4. Set two production secrets (each command prompts for its value):

   ```sh
   pnpm exec wrangler secret put ADMIN_PASSWORD --name nikki-wedding-invitation
   pnpm exec wrangler secret put SESSION_SECRET --name nikki-wedding-invitation
   ```

   Choose a random ADMIN_PASSWORD of at least 20 characters and a separate SESSION_SECRET of at least 32 characters. Prefer a password manager. Never put either secret in GitHub, wrangler.jsonc or browser code. Changing either value invalidates existing management sessions. Share the family password privately with your sister; guests never need it.

5. Visit /admin on the new URL and sign in. Update Artwork & events, confirm dates/maps, save, create a test family invitation and submit an RSVP. Check the saved response before sending real invitations.

## Automatic deployments with GitHub
Upload this source to a private GitHub repository, excluding the ignored files. In Cloudflare, connect that repository to the existing nikki-wedding-invitation Worker through Workers Builds.

- Build command: `pnpm run build`
- Deploy command: `pnpm run deploy`
- Root directory: the folder containing package.json
- Use Node >=22.13.0 and the pnpm lockfile.
- Grant the build credential access to the target Worker and D1 migrations.

The database ID and bucket name in wrangler.jsonc are resource identifiers, not passwords. Commit the configured resource identifiers. Keep ADMIN_PASSWORD and SESSION_SECRET as Worker runtime secrets. Verify your first repository deployment; it has not been exercised against a real Cloudflare account here.

## Local preview
Copy .dev.vars.example to .dev.vars and replace both sample values with locally generated secrets. Do not use production secrets for development.

```sh
pnpm run db:migrate:local
pnpm run build
pnpm run preview
```

The preview helper copies the ignored local secrets file into the generated Worker directory for Wrangler; neither copy belongs in Git. The local database and images live in ignored .wrangler state and are separate from production.

## Swapping images
In /admin, choose Artwork & events, upload a JPG/PNG/WebP under 8 MB for the envelope or a card, then select Save artwork & details. The animation stays the same. The envelope works best with landscape artwork and a centered seam; the cards work best with portrait artwork.

Default images are in public/art. Initial data is in lib/invitation.ts. Once you save configuration in D1, that saved data overrides source defaults. Editing printed text inside an image requires replacing that image; the event fields below it remain editable.

## Data and migration
This export starts a new database. It does not contain the current hosted Site's guest records, responses, saved configuration or R2 replacement images. Only the four default images are bundled. Keep the original Site if you already have responses there; arrange a D1/R2 export before migrating that data. A CSV export is a useful attendance backup but is not a complete database migration.

Guests open unguessable /i/... links without signing in. A forwarded link represents the same family, so keep personalized links private. Uploaded invitation artwork is available to anyone who has its URL. Management uses one shared family password in this edition rather than individual manager accounts.

## Draft content
Confirm all event dates, venues and calendar end times. The original artwork shows incorrect weekdays for Sangeet and Wedding. Correct those images before turning off the draft notice. Exact map links are intentionally blank until the family confirms them.

## Free-plan checks
Workers Free has request, script size and per-request CPU limits. This source builds successfully, but production free-plan CPU use must be measured on your account. Watch Worker errors and CPU metrics during your trial; optimize rendering or use a paid plan if needed. D1/R2 also have allowances; R2 can charge for usage beyond its free allowance.

## Validation
The production build, TypeScript checks, generated schema and session cryptography tests passed. Actual Cloudflare account provisioning/deployment and browser animation QA are not included in those checks. See VALIDATION.md for local request-level test results.
