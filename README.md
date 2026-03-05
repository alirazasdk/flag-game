# Flag Quiz

A web-based flag guessing game. 10 flags per game, 3 attempts each, global leaderboard.

## Setup Guide

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New Project** and fill in the details
3. Wait for the project to initialize (~1 minute)

### 2. Run the database migrations

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Copy and paste the contents of `supabase/migrations.sql`
4. Click **Run**

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Find these in Supabase dashboard → **Settings** → **API**.

### 4. Install dependencies

```bash
npm install
```

### 5. Seed the countries database

```bash
npx tsx scripts/seed-countries.ts
```

This seeds all ~195 countries with flag images from [flagcdn.com](https://flagcdn.com).

### 6. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment (Vercel)

1. Push the project to GitHub
2. Connect the repo on [vercel.com](https://vercel.com)
3. Add the two environment variables in Vercel project settings
4. Deploy

---

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Shadcn UI**
- **Supabase** (PostgreSQL + API)
- **flagcdn.com** (flag images, no upload needed)

## Game Rules

- 10 random flags per game
- 4 multiple-choice options per question
- 3 attempts per question
- Correct answer = +10 points (max 100)
- Wrong 3× or Reveal = 0 points, reveals answer
- Scores saved to global leaderboard automatically
- No login required — tracked by browser ID in localStorage
