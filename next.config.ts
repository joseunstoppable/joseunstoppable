import type { NextConfig } from 'next'

// Every public page is a Next.js page now (app/(site), app/onboarding,
// app/links); public/ only holds images and the guide PDF.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/os/:path*', destination: '/admin/:path*', permanent: false },
      // Old static addresses still shared in ads, emails and bios.
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/index', destination: '/', permanent: true },
      { source: '/reserva.html', destination: '/reserva', permanent: true },
      { source: '/masterclass.html', destination: '/masterclass', permanent: true },
      { source: '/onboarding.html', destination: '/reserva', permanent: false },
      // The site is a call-booking funnel now (3 Nov 2026). Jose runs his
      // clients in a separate app, so the client areas send people to the
      // booking page. The code stays; drop these lines to bring them back.
      { source: '/portal', destination: '/reserva', permanent: false },
      { source: '/app', destination: '/reserva', permanent: false },
      { source: '/app/:path*', destination: '/reserva', permanent: false },
      { source: '/onboarding', destination: '/reserva', permanent: false },
      { source: '/onboarding/:path*', destination: '/reserva', permanent: false },
      { source: '/bienvenida/:path*', destination: '/reserva', permanent: false },
      // The demo dashboard and the coaching demo (sample clients) are gone
      // (4 Nov 2026, Nevin). Old links land somewhere real.
      { source: '/demo-dashboard.html', destination: '/', permanent: true },
      { source: '/admin/coaching', destination: '/admin', permanent: false },
      { source: '/admin/coaching/:path*', destination: '/admin', permanent: false },
      // Short link for the free belly-fat guide shared on Instagram/TikTok.
      { source: '/guia', destination: '/guia-barriga-90-dias.pdf', permanent: false },
    ]
  },
}

export default nextConfig
