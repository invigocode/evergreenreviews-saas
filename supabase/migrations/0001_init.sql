-- Evergreen Reviews — core schema
-- Every tenant-owned table carries business_id and is protected by RLS
-- scoped through business_members, so a business can only ever see its own
-- rows. Business/membership creation happens server-side with the service
-- role key (see lib/auth.ts), not through client-side inserts.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Businesses & membership
-- ---------------------------------------------------------------------------

create table businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  website text,
  phone text,
  address text,
  employee_count text,
  google_review_url text,
  google_place_connected boolean not null default false,
  timezone text default 'UTC',
  created_at timestamptz not null default now()
);

create table business_members (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner', 'manager', 'member')),
  created_at timestamptz not null default now(),
  unique (business_id, user_id)
);

create index business_members_user_id_idx on business_members(user_id);

-- Helpers used by RLS policies below.
create function is_business_member(target_business_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from business_members
    where business_id = target_business_id and user_id = auth.uid()
  );
$$;

create function is_business_owner(target_business_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from business_members
    where business_id = target_business_id and user_id = auth.uid() and role = 'owner'
  );
$$;

-- ---------------------------------------------------------------------------
-- Campaigns
-- ---------------------------------------------------------------------------

create table campaigns (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  status text not null default 'draft' check (status in ('active', 'paused', 'draft', 'completed')),
  channel text not null check (channel in ('sms', 'email', 'whatsapp', 'qr', 'link')),
  audience text,
  timing text not null default 'manual' check (timing in ('immediate', 'delayed', 'manual', 'scheduled')),
  delay_hours int,
  message_template text not null default '',
  requests_sent int not null default 0,
  clicks int not null default 0,
  completions int not null default 0,
  created_at timestamptz not null default now()
);

create index campaigns_business_id_idx on campaigns(business_id);

-- ---------------------------------------------------------------------------
-- Customers
-- ---------------------------------------------------------------------------

create table customers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  service text,
  service_date date,
  last_request_date timestamptz,
  campaign_id uuid references campaigns(id) on delete set null,
  request_status text not null default 'not_sent' check (request_status in ('not_sent', 'sent', 'completed', 'no_response')),
  consent boolean not null default true,
  created_at timestamptz not null default now()
);

create index customers_business_id_idx on customers(business_id);

-- ---------------------------------------------------------------------------
-- Reviews
-- ---------------------------------------------------------------------------

create table reviews (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  reviewer_name text not null,
  rating smallint not null check (rating between 1 and 5),
  review_text text not null default '',
  review_date timestamptz not null default now(),
  source text not null default 'google',
  responded boolean not null default false,
  response_text text,
  response_date timestamptz,
  needs_attention boolean not null default false,
  sentiment text check (sentiment in ('positive', 'neutral', 'negative')),
  service text,
  created_at timestamptz not null default now()
);

create index reviews_business_id_idx on reviews(business_id);

-- ---------------------------------------------------------------------------
-- Review requests
-- ---------------------------------------------------------------------------

create table review_requests (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  customer_name text not null,
  date_requested timestamptz not null default now(),
  method text not null check (method in ('sms', 'email', 'whatsapp', 'manual', 'qr', 'link')),
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'sent', 'delivered', 'clicked', 'completed', 'failed', 'cancelled')),
  campaign_id uuid references campaigns(id) on delete set null,
  clicked boolean not null default false,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

create index review_requests_business_id_idx on review_requests(business_id);

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table businesses enable row level security;
alter table business_members enable row level security;
alter table campaigns enable row level security;
alter table customers enable row level security;
alter table reviews enable row level security;
alter table review_requests enable row level security;

create policy "Members can view their business" on businesses
  for select using (is_business_member(id));
create policy "Owners can update their business" on businesses
  for update using (is_business_owner(id)) with check (is_business_owner(id));

create policy "Members can view their membership rows" on business_members
  for select using (is_business_member(business_id));

create policy "Members can view campaigns" on campaigns
  for select using (is_business_member(business_id));
create policy "Members can manage campaigns" on campaigns
  for all using (is_business_member(business_id)) with check (is_business_member(business_id));

create policy "Members can view customers" on customers
  for select using (is_business_member(business_id));
create policy "Members can manage customers" on customers
  for all using (is_business_member(business_id)) with check (is_business_member(business_id));

create policy "Members can view reviews" on reviews
  for select using (is_business_member(business_id));
create policy "Members can manage reviews" on reviews
  for all using (is_business_member(business_id)) with check (is_business_member(business_id));

create policy "Members can view review requests" on review_requests
  for select using (is_business_member(business_id));
create policy "Members can manage review requests" on review_requests
  for all using (is_business_member(business_id)) with check (is_business_member(business_id));

-- businesses/business_members have no client-side insert policy on purpose:
-- account + first-membership creation happens server-side via the service
-- role key during onboarding (lib/auth.ts), which bypasses RLS.
