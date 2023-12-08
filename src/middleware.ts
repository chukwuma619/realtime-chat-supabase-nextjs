import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { Database } from './types/database.types'
import { useProfileDispatch } from './contexts/ProfileProvider'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // if user is signed in and the current path is / redirect the user to /account
  // if (req.nextUrl.pathname === '/auth/login' && user ) {
  //   return NextResponse.redirect(new URL('/', req.url))
  // }

  // if user is not signed in and the current path is not / redirect the user to /
  // if (!user && req.nextUrl.pathname !== '/') {
  //   return NextResponse.redirect(new URL('/', req.url))
  // }

  return res
}

export const config = {
  matcher: ['/', '/account'],
}