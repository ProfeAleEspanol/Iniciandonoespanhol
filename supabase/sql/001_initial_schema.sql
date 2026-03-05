-- Profe Ale - Initial Supabase schema
-- Run in Supabase SQL Editor

create extension if not exists pgcrypto;

-- Generic updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Auto-create profile when a new auth user is created
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  position integer not null check (position > 0),
  title text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_id, position)
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  position integer not null check (position > 0),
  title text not null,
  objective text,
  content_md text,
  video_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module_id, position)
);

create table if not exists public.progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  percent numeric(5,2) not null default 0 check (percent >= 0 and percent <= 100),
  last_viewed_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create index if not exists idx_modules_course_id on public.modules(course_id);
create index if not exists idx_lessons_module_id on public.lessons(module_id);
create index if not exists idx_progress_user_id on public.progress(user_id);
create index if not exists idx_progress_lesson_id on public.progress(lesson_id);

drop trigger if exists set_updated_at_profiles on public.profiles;
create trigger set_updated_at_profiles
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_courses on public.courses;
create trigger set_updated_at_courses
before update on public.courses
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_modules on public.modules;
create trigger set_updated_at_modules
before update on public.modules
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_lessons on public.lessons;
create trigger set_updated_at_lessons
before update on public.lessons
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_progress on public.progress;
create trigger set_updated_at_progress
before update on public.progress
for each row execute function public.set_updated_at();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.progress enable row level security;

-- profiles: user can manage only own profile
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- courses/modules/lessons: authenticated users can read only published content
drop policy if exists "courses_read_published" on public.courses;
create policy "courses_read_published"
on public.courses
for select
to authenticated
using (is_published = true);

drop policy if exists "modules_read_from_published_courses" on public.modules;
create policy "modules_read_from_published_courses"
on public.modules
for select
to authenticated
using (
  exists (
    select 1
    from public.courses c
    where c.id = modules.course_id
      and c.is_published = true
  )
);

drop policy if exists "lessons_read_from_published_content" on public.lessons;
create policy "lessons_read_from_published_content"
on public.lessons
for select
to authenticated
using (
  is_published = true
  and exists (
    select 1
    from public.modules m
    join public.courses c on c.id = m.course_id
    where m.id = lessons.module_id
      and c.is_published = true
  )
);

-- progress: each user can only see and manage own progress
drop policy if exists "progress_select_own" on public.progress;
create policy "progress_select_own"
on public.progress
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "progress_insert_own" on public.progress;
create policy "progress_insert_own"
on public.progress
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "progress_update_own" on public.progress;
create policy "progress_update_own"
on public.progress
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "progress_delete_own" on public.progress;
create policy "progress_delete_own"
on public.progress
for delete
to authenticated
using (auth.uid() = user_id);
