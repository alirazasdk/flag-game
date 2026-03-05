-- =============================================
-- Flag Quiz — Supabase Migrations
-- Run this in your Supabase SQL Editor
-- =============================================

-- Countries table
create table if not exists countries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  code text not null unique,
  flag_url text not null,
  created_at timestamptz default now()
);

-- Leaderboard table
create table if not exists leaderboard (
  id uuid default gen_random_uuid() primary key,
  browser_id text not null,
  score integer not null check (score >= 0 and score <= 100),
  played_at timestamptz default now()
);

-- Index for fast leaderboard queries
create index if not exists leaderboard_score_idx on leaderboard(score desc);

-- Enable Row Level Security (allow public reads, public inserts)
alter table countries enable row level security;
alter table leaderboard enable row level security;

-- Countries: anyone can read
create policy "Public read countries"
  on countries for select
  using (true);

-- Leaderboard: anyone can read and insert
create policy "Public read leaderboard"
  on leaderboard for select
  using (true);

create policy "Public insert leaderboard"
  on leaderboard for insert
  with check (true);
