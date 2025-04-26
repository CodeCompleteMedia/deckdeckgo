-- Create a table for decks
create table decks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  owner_id uuid not null,
  content jsonb not null default '{}'::jsonb,
  is_published boolean default false,
  published_at timestamp with time zone,
  published_url text
);

-- Create a table for published decks
create table published_decks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  deck_id uuid references decks(id) on delete cascade,
  name text not null,
  owner_id uuid not null,
  content jsonb not null,
  published_url text not null
);

-- Set up Row Level Security (RLS)
alter table decks enable row level security;
alter table published_decks enable row level security;

-- Create policies for decks
create policy "Users can view their own decks"
  on decks for select
  using (auth.uid() = owner_id);

create policy "Users can insert their own decks"
  on decks for insert
  with check (auth.uid() = owner_id);

create policy "Users can update their own decks"
  on decks for update
  using (auth.uid() = owner_id);

create policy "Users can delete their own decks"
  on decks for delete
  using (auth.uid() = owner_id);

-- Create policies for published decks
create policy "Anyone can view published decks"
  on published_decks for select
  using (true);

create policy "Users can insert their own published decks"
  on published_decks for insert
  with check (auth.uid() = owner_id);

-- Create indexes
create index decks_owner_id_idx on decks(owner_id);
create index published_decks_deck_id_idx on published_decks(deck_id);
create index published_decks_owner_id_idx on published_decks(owner_id); 