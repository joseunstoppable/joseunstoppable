'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LangToggle from './LangToggle'
import { INTRO_VIDEO, PHOTO_TESTIMONIALS, VIDEO_TESTIMONIALS } from '@/lib/home-content'
import { LINKS } from '@/lib/site'

// Links follow what the home page is showing: the video block and the
// testimonials only appear once they have content.
const hasTestimonials = VIDEO_TESTIMONIALS.some(t => t.video) || PHOTO_TESTIMONIALS.some(t => t.before && t.after)
const NAV = [
  INTRO_VIDEO
    ? { href: '/#empieza', es: 'Empieza aquí', en: 'Start here' }
    : { href: '/#story', es: 'Mi historia', en: 'My story' },
  { href: '/#method', es: 'El método', en: 'The method' },
  ...(hasTestimonials ? [{ href: '/#testimonios', es: 'Testimonios', en: 'Testimonials' }] : []),
  { href: '/#offer', es: 'Precio', en: 'Pricing' },
  { href: '/#faq', es: 'Preguntas', en: 'FAQ' },
]

export default function Header() {
  const path = usePathname()
  const onBooking = path === LINKS.book
  return (
    <header className="hdr">
      <div className="wrap">
        <Link href="/" className="logo" aria-label="Jose Unstoppable"><span className="mk">J</span><span>Jose<b>Unstoppable</b></span></Link>
        <nav className="nav">
          {NAV.map(n => (
            <Link key={n.href} href={n.href}><span data-es>{n.es}</span><span data-en>{n.en}</span></Link>
          ))}
        </nav>
        <div className="hdr-r">
          <LangToggle />
          {!onBooking && (
            <Link className="hdr-cta" href={LINKS.book}><span data-es>Reservar llamada</span><span data-en>Book a call</span></Link>
          )}
        </div>
      </div>
    </header>
  )
}
