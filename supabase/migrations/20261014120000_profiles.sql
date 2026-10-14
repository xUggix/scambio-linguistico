-- Passo 2: profilo dell'utente.
-- Ogni utente legge e modifica solo il proprio profilo (RLS).
-- I dati pubblici per il matching arriveranno al passo 3, con una regola a parte.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null
    check (char_length(btrim(display_name)) between 1 and 40),
  native_language text not null check (native_language in ('it', 'en')),
  practice_language text not null check (practice_language in ('it', 'en')),
  declared_level text not null
    check (declared_level in ('A1', 'A2', 'B1', 'B2', 'C1')),
  -- Conferma di avere almeno 18 anni: senza questa data il profilo non esiste.
  adult_confirmed_at timestamptz not null,
  ui_locale text not null default 'it' check (ui_locale in ('it', 'en')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_languages_differ check (native_language <> practice_language)
);

alter table public.profiles enable row level security;

-- Chi non ha fatto l'accesso non vede nulla.
revoke all on public.profiles from anon;

create policy "profilo: lettura solo del proprio"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

create policy "profilo: creazione solo del proprio"
  on public.profiles for insert to authenticated
  with check ((select auth.uid()) = id);

create policy "profilo: modifica solo del proprio"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Nessuna regola di cancellazione per l'utente: la cancellazione dell'account
-- (passo 9) passa dal server ed elimina l'utente, e il profilo segue (on delete cascade).

create function public.profiles_set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.profiles_set_updated_at();
