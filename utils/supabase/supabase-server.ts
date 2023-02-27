import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase/database'

export const createClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })