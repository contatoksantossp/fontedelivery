
-- Fix search_path
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$ begin new.updated_at = now(); return new; end; $$;

-- Revoke public execute from security definer functions
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
-- has_role needs to be callable by authenticated for RLS evaluation
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
