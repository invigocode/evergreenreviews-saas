# Database setup

This project's schema lives in `migrations/0001_init.sql`. To apply it to a
fresh Supabase project:

1. Open your project in the Supabase Dashboard → **SQL Editor**.
2. Paste the contents of `migrations/0001_init.sql` and run it.

(Or, if you have the Supabase CLI linked to this project: `supabase db push`.)

## Environment variables

The app reads these at runtime — set them in your hosting provider (Vercel
→ Project → Settings → Environment Variables) and in this dev environment:

- `NEXT_PUBLIC_SUPABASE_URL` — Project Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Project Settings → API → anon public key
- `SUPABASE_SERVICE_ROLE_KEY` — Project Settings → API → service_role key
  (secret — server-only, used to create a business + owner membership during
  onboarding, which bypasses row-level security by design)

## Google sign-in

Authentication → Providers → Google, using a Google Cloud OAuth 2.0 Web
Client. Supabase shows you the exact callback URL to register with Google
(`https://<project-ref>.supabase.co/auth/v1/callback`).
