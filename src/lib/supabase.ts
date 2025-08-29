import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

// Client-side Supabase client
export function createClientComponentClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Server-side Supabase client for Server Components
export function createServerComponentClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}

// Server-side Supabase client for Server Actions
export function createServerActionClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}

// Admin client with service role key (for server-side admin operations)
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

// Utility function to get current user from server component
export async function getCurrentUser() {
  const supabase = createServerComponentClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return {
      ...user,
      profile
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

// Utility function to check if user is admin
export async function isAdmin(userId?: string) {
  if (!userId) return false
  
  const supabase = createServerComponentClient()
  
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()

    return profile?.role === 'admin'
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

// Utility function to check if user is host
export async function isHost(userId?: string) {
  if (!userId) return false
  
  const supabase = createServerComponentClient()
  
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()

    return profile?.role === 'host' || profile?.role === 'admin'
  } catch (error) {
    console.error('Error checking host status:', error)
    return false
  }
}

