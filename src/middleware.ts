import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'fr', 'ar'];
const defaultLocale = 'en';

function getLocaleFromHeaders(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language');
  if (!acceptLang) return defaultLocale;

  const preferred = acceptLang
    .split(',')
    .map((part) => {
      const [lang, q] = part.trim().split(';q=');
      return { lang: lang.split('-')[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of preferred) {
    if (locales.includes(lang)) return lang;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal Next.js paths, static files, API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.') // static files (images, fonts, etc.)
  ) {
    return NextResponse.next();
  }

  // Check if the path already has a locale prefix
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) return NextResponse.next();

  // Redirect to locale-prefixed path
  const locale = getLocaleFromHeaders(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|favicon\\.ico|.*\\..*).*)'],
};
