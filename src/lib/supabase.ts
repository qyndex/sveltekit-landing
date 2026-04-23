import { createClient } from "@supabase/supabase-js";
import { env } from "$env/dynamic/public";

// Create a single Supabase browser client.
// Uses $env/dynamic/public so values can be injected at runtime
// (e.g. in Docker) rather than baked in at build time.
export const supabase = createClient(
  env.PUBLIC_SUPABASE_URL ?? "",
  env.PUBLIC_SUPABASE_ANON_KEY ?? ""
);
