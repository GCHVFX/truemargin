import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";

export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase server environment variables.");
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}
