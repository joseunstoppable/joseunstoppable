import type { Metadata, Viewport } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import VideoFrame from '@/components/site/VideoFrame'
import { INTRO_VIDEO, JOSE_BEFORE_AFTER, PHOTO_TESTIMONIALS, VIDEO_TESTIMONIALS } from '@/lib/home-content'
import { LINKS, OWNER, WA_BOOK, WHATSAPP, waLink } from '@/lib/site'
import hero from '@/public/images/jose.jpg'
import back from '@/public/images/onboarding-close.jpg'
import './home.css'

export const metadata: Metadata = {
  title: 'Jose Unstoppable · Pierde la barriga en menos de 90 días',
  description: 'Coaching 1:1 online con Jose. Mis alumnos pierden la barriga en menos de 90 días entrenando 3 horas a la semana. Escríbeme por WhatsApp y vemos tu caso.',
  alternates: { canonical: '/' },
}

export const viewport: Viewport = { themeColor: '#FFFFFF' }

// Photos, videos and results live in lib/home-content.ts. On the live site an
// empty slot stays hidden; on previews it shows as a marked placeholder so
// Jose can see where each testimonial goes.
const IS_LIVE = process.env.VERCEL_ENV === 'production'
const photoTestimonials = PHOTO_TESTIMONIALS.filter(t => t.before && t.after).slice(0, 9)
const videoTestimonials = VIDEO_TESTIMONIALS.filter(t => t.video).slice(0, 6)
const photoSlots = photoTestimonials.length || IS_LIVE ? 0 : 3
const videoSlots = videoTestimonials.length || IS_LIVE ? 0 : 4
const hasJoseBeforeAfter = !!(JOSE_BEFORE_AFTER.before && JOSE_BEFORE_AFTER.after)
const WA_DISPLAY = '+' + WHATSAPP.replace(/^(\d{2})(\d{3})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5')
const WA_CASE = waLink(WA_BOOK.es)

function WaIcon() {
  return (
    <svg className="g-wa-ic" width="18" height="18" viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3C8.86 3 3.03 8.82 3.03 15.99c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75a12.97 12.97 0 0 0 6.36 1.63h.01c7.17 0 13-5.83 13-13S23.21 3 16.04 3Zm5.93 15.59c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.73.17-.22.32-.84 1.05-1.03 1.27-.19.22-.38.24-.7.08-.33-.16-1.38-.51-2.62-1.62-.97-.86-1.62-1.93-1.81-2.25-.19-.33-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.22-.32.33-.54.11-.22.05-.41-.03-.57-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.55-.73-.56h-.62c-.22 0-.57.08-.87.41-.3.32-1.14 1.11-1.14 2.71s1.17 3.15 1.33 3.36c.16.22 2.3 3.5 5.56 4.91.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.42.19-1.55-.08-.14-.3-.22-.62-.38Z" /></svg>
  )
}

function WaButton({ children = 'Escríbeme y vemos tu caso', small = false }: { children?: string; small?: boolean }) {
  return (
    <a className={small ? 'g-btn g-btn-sm' : 'g-btn'} href={WA_CASE} target="_blank" rel="noopener">
      <WaIcon />{children}<span className="g-arr" aria-hidden="true">→</span>
    </a>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="g-chip">{children}</span>
}

export default function Home() {
  return (
    <div className="home lp">
      {/* Sticky bar: the WhatsApp button stays in view all the way down */}
      <header className="g-top">
        <div className="g-wrap g-top-in">
          <Link href="/" className="g-logo" aria-label="Jose Unstoppable">JOSE<sup>+</sup></Link>
          <WaButton small>Escríbeme por WhatsApp</WaButton>
        </div>
      </header>

      {/* 1 · Hero */}
      <section className="g-hero">
        <div className="g-hero-photo">
          <Image src={hero} alt={`${OWNER.name}, entrenador online`} fill priority sizes="100vw" placeholder="blur" />
        </div>
        <div className="g-wrap g-hero-copy">
          <span className="g-pill"><span className="g-dot" aria-hidden="true" />Jose, entrenador online</span>
          <h1 className="g-h1">
            Mis alumnos pierden la barriga
            <em>en menos de 90&nbsp;días.</em>
          </h1>
          <p className="g-lead">Entrenando <b>3 horas a la semana</b>, sin dietas imposibles y conmigo a tu lado cada día. Acompañamiento 1 a 1.</p>
          <WaButton />
          <p className="g-proof"><span className="g-proof-n">+100</span> personas ya lo han logrado</p>
        </div>
      </section>

      {/* 2 · Client photos */}
      {(photoTestimonials.length > 0 || photoSlots > 0) && (
        <section className="g-sec" id="cambios">
          <div className="g-wrap">
            <div className="g-head">
              <Chip>Testimonios</Chip>
              <h2 className="g-h2">Cambios reales. <em>Personas reales.</em></h2>
            </div>
            <div className="g-photos">
              {photoTestimonials.map(t => (
                <figure key={t.before} className="g-card g-tcard">
                  <div className="g-ba">
                    <div className="g-ph"><Image src={t.before} alt={`${t.name} antes`} fill sizes="(max-width: 640px) 45vw, 190px" /><span className="g-lbl">Antes</span></div>
                    <div className="g-ph"><Image src={t.after} alt={`${t.name} después`} fill sizes="(max-width: 640px) 45vw, 190px" /><span className="g-lbl now">Después</span></div>
                  </div>
                  {t.quote && <blockquote>{t.quote}</blockquote>}
                  <figcaption><b>{t.name}</b>{t.result && <span>{t.result}</span>}</figcaption>
                </figure>
              ))}
              {Array.from({ length: photoSlots }, (_, i) => (
                <figure key={i} className="g-card g-tcard g-slot">
                  <div className="g-ba">
                    <div className="g-ph"><span className="g-slot-txt">Foto antes</span><span className="g-lbl">Antes</span></div>
                    <div className="g-ph"><span className="g-slot-txt">Foto después</span><span className="g-lbl now">Después</span></div>
                  </div>
                  <figcaption><b>Foto de testimonio {i + 1}</b><span>Hueco vacío</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3 · Client videos */}
      {(videoTestimonials.length > 0 || videoSlots > 0) && (
        <section className="g-sec" id="videos">
          <div className="g-wrap">
            <div className="g-head">
              <Chip>Vídeos</Chip>
              <h2 className="g-h2">Escúchalo <em>de ellos.</em></h2>
            </div>
            <div className="g-videos">
              {videoTestimonials.map((t, i) => (
                <div key={t.video} className="g-video">
                  <VideoFrame src={t.video} label={`Ver testimonio de ${t.name || i + 1}`} className="v">
                    <span className="h-vcap"><small>{t.result}</small><b>{t.name}</b></span>
                  </VideoFrame>
                </div>
              ))}
              {Array.from({ length: videoSlots }, (_, i) => (
                <div key={i} className="g-video">
                  <VideoFrame src="" label={`Hueco de vídeo ${i + 1}`} className="v">
                    <span className="h-vcap"><small>Hueco vacío</small><b>Vídeo de cliente {i + 1}</b></span>
                  </VideoFrame>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4 · Jose's story, short, then WhatsApp */}
      <section className="g-sec g-story" id="mi-historia">
        <div className="g-wrap g-story-in">
          <div className="g-story-media">
            {hasJoseBeforeAfter ? (
              <div className="g-ba">
                <div className="g-ph tall"><Image src={JOSE_BEFORE_AFTER.before} alt={`${OWNER.name} antes`} fill sizes="(max-width: 640px) 45vw, 240px" /><span className="g-lbl">Antes</span></div>
                <div className="g-ph tall"><Image src={JOSE_BEFORE_AFTER.after} alt={`${OWNER.name} hoy`} fill sizes="(max-width: 640px) 45vw, 240px" /><span className="g-lbl now">Hoy</span></div>
              </div>
            ) : !IS_LIVE ? (
              <div className="g-ba g-slot">
                <div className="g-ph tall"><span className="g-slot-txt">Tu foto de antes</span><span className="g-lbl">Antes</span></div>
                <div className="g-ph tall"><span className="g-slot-txt">Tu foto de ahora</span><span className="g-lbl now">Hoy</span></div>
              </div>
            ) : INTRO_VIDEO ? (
              <VideoFrame src={INTRO_VIDEO} label="Ver vídeo: quién soy" className="v">
                <Image src={hero} alt="" fill sizes="(max-width: 640px) 88vw, 360px" />
                <span className="h-vcap"><small>Quién soy</small><b>Mi historia en 1 minuto</b></span>
              </VideoFrame>
            ) : (
              <div className="g-portrait"><Image src={back} alt={`${OWNER.name} entrenando`} fill sizes="(max-width: 640px) 88vw, 400px" placeholder="blur" /></div>
            )}
          </div>
          <div className="g-story-copy">
            <Chip>Mi historia</Chip>
            <h2 className="g-h2">Hace un año <em>estaba fatal.</em></h2>
            <p>Estaba con depresión, calvo y gordo. Bebía todos los fines de semana y no sabía lo que quería hacer con mi vida.</p>
            <p>Entonces encontré mi propósito. Empecé a estudiar, cambié mis hábitos y cambié mi físico: <b>de 77 a 69 kilos en 6 meses.</b></p>
            <p>Y me di cuenta de algo: quería que otros se sintieran como yo me sentía. Por eso abrí mi asesoría online, y hoy ya he ayudado a <b>más de 100 personas</b> a cambiar su situación.</p>
            <p className="g-story-cta">Ahora te toca a ti. Escríbeme y vemos tu caso.</p>
            <WaButton />
          </div>
        </div>
      </section>

      {/* Minimal footer: contact and legal */}
      <footer className="g-foot">
        <div className="g-wrap g-foot-in">
          <span className="g-logo">JOSE<sup>+</sup></span>
          <a href={WA_CASE} target="_blank" rel="noopener">WhatsApp · {WA_DISPLAY}</a>
          <nav>
            <Link href={LINKS.legal}>Aviso legal</Link>
            <Link href={LINKS.privacy}>Privacidad</Link>
            <Link href={LINKS.terms}>Términos</Link>
          </nav>
          <span>© {new Date().getFullYear()} {OWNER.name}</span>
        </div>
      </footer>
    </div>
  )
}
