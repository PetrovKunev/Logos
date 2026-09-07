import { NextResponse, type NextRequest } from 'next/server'

// Стари URL адреси от предишния сайт, които Search Console докладва като 404.
// Сравнението е чувствително към главни/малки букви, за да не се засегнат
// текущите /courses/* маршрути (next.config redirects() не различава регистъра).
const OLD_COURSE_PATHS: Record<string, string> = {
  '/Courses/Math5': '/courses/matematika-5-klas',
  '/Courses/Math6': '/courses/matematika-6-klas',
  '/Courses/Math7': '/courses/matematika-7-klas',
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  let target: string | undefined

  if (OLD_COURSE_PATHS[pathname]) {
    target = OLD_COURSE_PATHS[pathname]
  } else if (pathname === '/Courses' || pathname.startsWith('/Courses/')) {
    target = '/courses'
  } else if (pathname.startsWith('/blog/category/')) {
    target = '/blog'
  }

  if (!target) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = target
  url.search = ''
  return NextResponse.redirect(url, 308)
}

export const config = {
  matcher: ['/Courses', '/Courses/:path*', '/blog/category/:path*'],
}
