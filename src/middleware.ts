import { NextRequest, NextResponse } from 'next/server'
import { extractSubdomain, isValidSlug, isSlugAvailable } from './lib/slug'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // Ana domain (siparisqr.com) ve Vercel domain
  if (hostname === 'siparisqr.com' || hostname === 'localhost:3000' || hostname.includes('vercel.app')) {
    // Ana sayfa için mevcut yapıyı kullan
    return NextResponse.next()
  }

  // Portal subdomain (portal.siparisqr.com)
  if (hostname === 'portal.siparisqr.com' || hostname.startsWith('portal.')) {
    url.pathname = `/portal${url.pathname}`
    return NextResponse.rewrite(url)
  }

  // Yönetim subdomain (yonetim.siparisqr.com)
  if (hostname === 'yonetim.siparisqr.com' || hostname.startsWith('yonetim.')) {
    url.pathname = `/yonetim${url.pathname}`
    return NextResponse.rewrite(url)
  }

  // Dinamik restoran subdomainleri ([slug].siparisqr.com)
  const subdomain = extractSubdomain(hostname)
  
  if (subdomain) {
    // Slug formatını kontrol et
    if (!isValidSlug(subdomain)) {
      // Geçersiz slug formatı - 404 sayfasına yönlendir
      url.pathname = '/404'
      return NextResponse.rewrite(url)
    }

    // Reserved slug kontrolü
    if (!isSlugAvailable(subdomain)) {
      // Reserved slug - ana sayfaya yönlendir
      return NextResponse.redirect(new URL('https://siparisqr.com', request.url))
    }

    // Restoran slug'ını URL'e ekle ve [slug] route'una yönlendir
    url.pathname = `/${subdomain}${url.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}