'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

// The homepage's sticky phone CTA: shows once the visitor has scrolled past
// the hero and hides again near the footer or while the form it points at is on screen.
// With hrefEn the bar links out (WhatsApp): one link per language, shown by html[data-lang].
export default function MobileBar({ href, hrefEn, className = 'btn btn-y', children }: { href: string; hrefEn?: string; className?: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const target = href.startsWith('#') ? document.getElementById(href.slice(1)) : null
    const onScroll = () => {
      const r = target?.getBoundingClientRect()
      const targetVisible = !!r && r.top < window.innerHeight && r.bottom > 0
      setShow(!targetVisible && window.scrollY > 640 && window.innerHeight + window.scrollY < document.body.scrollHeight - 400)
    }
    const first = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { cancelAnimationFrame(first); window.removeEventListener('scroll', onScroll) }
  }, [href])
  return (
    <div className={show ? 'm-bar show' : 'm-bar'} aria-hidden={!show}>
      {hrefEn ? (
        <>
          <a data-es="" className={className} href={href} target="_blank" rel="noopener" tabIndex={show ? 0 : -1}>{children}<span className="arr">→</span></a>
          <a data-en="" className={className} href={hrefEn} target="_blank" rel="noopener" tabIndex={show ? 0 : -1}>{children}<span className="arr">→</span></a>
        </>
      ) : href.startsWith('/')
        ? <Link className={className} href={href} tabIndex={show ? 0 : -1}>{children}<span className="arr">→</span></Link>
        : <a className={className} href={href} tabIndex={show ? 0 : -1}>{children}<span className="arr">→</span></a>}
    </div>
  )
}
