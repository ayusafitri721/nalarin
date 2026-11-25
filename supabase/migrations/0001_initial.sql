-- Nalarin backend schema (PostgreSQL / Supabase)
-- Jalankan file ini di Supabase SQL Editor atau via `supabase db push`.

-- ---------------------------------------------------------------------------
-- profiles: satu baris per auth user, menyimpan identitas + progres level/XP.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text not null default 'Learner',
  email text,
  avatar text not null default '#7563E8',
  bio text,
  companion text not null default 'nori',
  level integer not null default 1 check (level >= 1),
  xp integer not null default 0 check (xp >= 0),
  streak integer not null default 0 check (streak >= 0),
  longest_streak integer not null default 0 check (longest_streak >= 0),
  total_active_days integer not null default 0 check (total_active_days >= 0),
  onboarding jsonb,
  theme jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- user_progress: koleksi, catatan, dan klaim reward per user.
-- ---------------------------------------------------------------------------
create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  completed_lessons text[] not null default '{}',
  bookmarks text[] not null default '{}',
  notes jsonb not null default '{}'::jsonb,
  claimed_rewards text[] not null default '{}',
  notifications_read text[] not null default '{}',
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- quiz_results: hasil terbaik per kuis (unique user_id + quiz_id).
-- ---------------------------------------------------------------------------
create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_id text not null,
  score integer not null check (score >= 0),
  total integer not null check (total > 0),
  answers jsonb not null default '{}'::jsonb,
  completed_at timestamptz not null default now(),
  unique (user_id, quiz_id)
);

create index if not exists quiz_results_user_id_idx on public.quiz_results(user_id);

-- ---------------------------------------------------------------------------
-- updated_at otomatis
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
before update on public.profiles
for each row execute function public.touch_updated_at();

drop trigger if exists user_progress_touch_updated_at on public.user_progress;
create trigger user_progress_touch_updated_at
before update on public.user_progress
for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Hak akses tabel. RLS tetap membatasi baris; GRANT ini hanya membuka
-- privilege dasar untuk role anon/authenticated yang dipakai PostgREST.
-- ---------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.user_progress to authenticated;
grant select, insert, update, delete on public.quiz_results to authenticated;
grant select on public.profiles to anon;

-- ---------------------------------------------------------------------------
-- Row Level Security: user hanya bisa mengakses data miliknya sendiri.
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.quiz_results enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select to authenticated using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "user_progress_select_own" on public.user_progress;
create policy "user_progress_select_own" on public.user_progress
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "user_progress_insert_own" on public.user_progress;
create policy "user_progress_insert_own" on public.user_progress
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "user_progress_update_own" on public.user_progress;
create policy "user_progress_update_own" on public.user_progress
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "quiz_results_select_own" on public.quiz_results;
create policy "quiz_results_select_own" on public.quiz_results
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "quiz_results_insert_own" on public.quiz_results;
create policy "quiz_results_insert_own" on public.quiz_results
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "quiz_results_update_own" on public.quiz_results;
create policy "quiz_results_update_own" on public.quiz_results
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Auto-create profile + progress saat user baru mendaftar.
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, avatar)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1), 'Learner'),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'avatar', '#7563E8')
  )
  on conflict (id) do nothing;

  insert into public.user_progress (user_id) values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
