-- Apply once in the owner's Supabase project before enabling online submissions.
create table public.project_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service text not null check (service in ('website','app','software','ai','research')),
  contact_name text not null check (char_length(contact_name) between 2 and 120),
  contact_email text not null check (char_length(contact_email) between 3 and 254),
  company text not null default '' check (char_length(company)<=160),
  title text not null check (char_length(title) between 3 and 160),
  description text not null check (char_length(description) between 30 and 6000),
  budget_usd integer not null check (budget_usd between 10000 and 10000000 and (service not in ('ai','research') or budget_usd>=20000)),
  timeline text not null check (timeline in ('Exploring options','Within 1–3 months','Within 3–6 months','More than 6 months')),
  status text not null default 'submitted' check (status in ('submitted','in_review','proposal_sent','closed')),
  created_at timestamptz not null default now()
);
create index project_requests_owner_date on public.project_requests(user_id,created_at desc);
alter table public.project_requests enable row level security;
revoke all on public.project_requests from anon,authenticated;
grant select on public.project_requests to authenticated;
grant insert (user_id,service,contact_name,contact_email,company,title,description,budget_usd,timeline) on public.project_requests to authenticated;
create policy "Read own requests" on public.project_requests for select to authenticated using ((select auth.uid())=user_id);
create policy "Submit own requests" on public.project_requests for insert to authenticated with check ((select auth.uid())=user_id and status='submitted');
-- Serializes insert attempts per owner; direct clients cannot bypass the limit.
create function public.limit_project_requests() returns trigger language plpgsql security definer set search_path='' as $$
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(new.user_id::text,0));
  if (select count(*) from public.project_requests where user_id=new.user_id and created_at>now()-interval '24 hours')>=5 then
    raise exception 'submission_limit';
  end if;
  return new;
end;
$$;
revoke all on function public.limit_project_requests() from public;
create trigger enforce_request_limit before insert on public.project_requests for each row execute function public.limit_project_requests();
