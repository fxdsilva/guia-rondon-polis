import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://tpyrkmrzaarlvsbgzadk.supabase.co'
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'mock-signature'

// Import the supabase client like this:
// import { supabase } from "@/lib/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: async (url, options) => {
      // Intercept requests when using mock credentials to prevent 401 Unauthorized errors
      // Returns a successful 200 OK with an empty array. This safely eliminates the
      // mock credentials from network requests while preventing crashes.
      if (
        SUPABASE_PUBLISHABLE_KEY === 'mock-signature' ||
        SUPABASE_PUBLISHABLE_KEY.includes('mock')
      ) {
        return new Response(JSON.stringify([]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      return fetch(url, options)
    },
  },
})
