import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(req) {
  const res = NextResponse.next()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const { data: { session } } = await supabase.auth.getSession()

  if (!session && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
}