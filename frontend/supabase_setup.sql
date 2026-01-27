-- COPIA Y PEGA ESTO EN EL EDITOR SQL DE SUPABASE

-- 1. Crear la tabla de proyectos
create table public.projects (
  user_id uuid references auth.users not null primary key,
  content jsonb default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Habilitar seguridad (RLS)
alter table public.projects enable row level security;

-- 3. Crear política para que cada usuario solo pueda ver y editar su propio proyecto
create policy "Usuarios gestionan su propio proyecto"
on public.projects for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
