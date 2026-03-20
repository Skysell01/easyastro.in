// cart/integrations/supabase/client.ts
import { createClient } from "@supabase/supabase-js";

export const ordersSupabase = createClient(
  process.env.NEXT_PUBLIC_ORDERS_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ORDERS_SUPABASE_ANON_KEY!,

   {
    auth: {
      persistSession: false,      // don't store session in localStorage
      autoRefreshToken: false,    // don't try to refresh any token
      detectSessionInUrl: false,  // don't read token from URL
    },
  }
);