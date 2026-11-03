# Status: Jose Unstoppable (joseunstoppable.com)

Last updated: 3 Nov 2026. Read this first in any new session.

## Where it stands
- **Live production is the OLD site.** Vercel project `joseunstoppable` (team "Nevin Henriquez's projects")
  publishes branch `claude/dreamy-lamport-qhbvyo` (static HTML in `public/`). The new Next.js site on `main`
  only deploys as previews. Going live = switching the Vercel production branch to `main` (needs Nevin's OK).
- **Domain:** joseunstoppable.com is NOT attached in Vercel yet. Only joseunstoppable.vercel.app.
- **Env vars:** only `ADMIN_OPEN=1` is set, so /admin is open to anyone, and there are no Supabase, Resend
  or payment keys. Forms, bookings, leads and emails cannot save or send in production.
- **Legal:** `OWNER.nif` and `OWNER.address` in `lib/site.ts` are empty (Spanish LSSI wants both).
- **Privacy:** branch `claude/dreamy-lamport-qhbvyo` holds client diet plans with real names in `dietas/`.
- **Masterclass:** `seatsTaken` in `app/(site)/masterclass/config.ts` is a fixed 63.
- No Meta Pixel or analytics on the public pages.

## The funnel
links (bio) -> home -> masterclass / guia PDF -> /reserva (free 30-min call) -> proposal + invoice ->
onboarding -> client app. Full overview: https://claude.ai/artifact/QeEHEy9dWFHweEQmcq2XbZ

## Recent changes
- 3 Nov 2026: /admin menu regrouped in funnel order (Captar, Cobrar, Entrenar, Crecer) with set-up-once
  items moved under Ajustes. Same pages, nothing removed.

## Next steps (in order)
1. Nevin's OK to go live with `main`. 2. Attach the domain. 3. Jose adds keys in Vercel. 4. Remove
`ADMIN_OPEN`, set the admin login. 5. NIF + address. 6. Move diet plans out. 7. Pixel + share image.
8. Real masterclass date and seats. 9. Test a booking and a masterclass sign-up end to end.
