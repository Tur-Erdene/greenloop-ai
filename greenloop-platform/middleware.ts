import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // /admin хамгаалах
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // TODO: Auth check хийх (NextAuth эсвэл custom auth)
    // Одоо зөвхөн development environment-д нээлттэй
    const isDev = process.env.NODE_ENV === 'development';
    const hasAdminToken = request.cookies.has('admin_token');
    
    if (!isDev && !hasAdminToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
