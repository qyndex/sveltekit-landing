import { createClient } from "@supabase/supabase-js";
import { env } from "$env/dynamic/private";
import { env as publicEnv } from "$env/dynamic/public";

// Server-side Supabase client.
// Uses the service-role key when available for admin operations (e.g. reading
// waitlist), falling back to the anon key for public reads.
export function createServerClient() {
  const url = publicEnv.PUBLIC_SUPABASE_URL || "http://localhost:54321";
  const key = env.SUPABASE_SERVICE_ROLE_KEY ?? publicEnv.PUBLIC_SUPABASE_ANON_KEY ?? "placeholder";
  return createClient(url, key);
}
