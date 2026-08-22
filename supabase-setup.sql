-- ═══════════════════════════════════════════════════════════════
--  HONSPIRIT — MOMENTS 갤러리 설정
--  Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 RUN 하세요.
--  여러 번 실행해도 안전합니다.
-- ═══════════════════════════════════════════════════════════════


-- ── 1. 관계자 이메일 ───────────────────────────────────────────
--    사진을 올릴 수 있는 계정 목록입니다.
--    나중에 관계자를 추가하려면 이 함수만 다시 실행하면 됩니다.
create or replace function public.is_moments_staff()
returns boolean
language sql
stable
as $$
  select (auth.jwt() ->> 'email') in (
    'admin@honspirit.com'
    -- , 'another@honspirit.com'
  );
$$;

grant execute on function public.is_moments_staff() to anon, authenticated;


-- ── 2. 테이블 ─────────────────────────────────────────────────
create table if not exists public.moments (
  id          text primary key,
  path        text not null,
  w           int  not null,
  h           int  not null,
  author      text,
  caption     text,
  caption_en  text,
  caption_zh  text,
  tag         text,
  tone        text,
  status      text not null default 'approved',   -- approved | hidden
  created_at  timestamptz not null default now()
);

create index if not exists moments_created_idx on public.moments (created_at desc);

alter table public.moments enable row level security;


-- ── 3. 테이블 권한 ────────────────────────────────────────────
--    읽기: 누구나, 단 'approved' 만
drop policy if exists "public read approved" on public.moments;
create policy "public read approved"
  on public.moments for select
  to anon, authenticated
  using (status = 'approved');

--    읽기: 로그인한 관계자는 숨김까지 전부 (studio 관리 목록용)
drop policy if exists "staff read all" on public.moments;
create policy "staff read all"
  on public.moments for select
  to authenticated
  using (public.is_moments_staff());

--    쓰기: 관계자만
drop policy if exists "staff insert" on public.moments;
create policy "staff insert"
  on public.moments for insert
  to authenticated
  with check (public.is_moments_staff());

drop policy if exists "staff update" on public.moments;
create policy "staff update"
  on public.moments for update
  to authenticated
  using (public.is_moments_staff())
  with check (public.is_moments_staff());

drop policy if exists "staff delete" on public.moments;
create policy "staff delete"
  on public.moments for delete
  to authenticated
  using (public.is_moments_staff());


-- ── 4. 이미지 버킷 ────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('moments', 'moments', true)
on conflict (id) do update set public = true;


-- ── 5. 버킷 권한 ──────────────────────────────────────────────
drop policy if exists "public read moment files" on storage.objects;
create policy "public read moment files"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'moments');

drop policy if exists "staff write moment files" on storage.objects;
create policy "staff write moment files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'moments' and public.is_moments_staff());

drop policy if exists "staff delete moment files" on storage.objects;
create policy "staff delete moment files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'moments' and public.is_moments_staff());


-- ── 확인 ──────────────────────────────────────────────────────
select
  (select count(*) from pg_policies where tablename = 'moments'
     and schemaname = 'public')                                as table_policies,   -- 5 이어야 정상
  (select count(*) from storage.buckets where id = 'moments')  as bucket,           -- 1
  (select count(*) from pg_policies where tablename = 'objects'
     and policyname like '%moment%')                           as storage_policies; -- 3
