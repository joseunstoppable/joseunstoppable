import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FreeCallsNote from '@/components/site/FreeCallsNote'
import MobileBar from '@/components/site/MobileBar'
import VideoFrame from '@/components/site/VideoFrame'
import { T } from '@/components/site/bits'
import { INSIDE_SHOTS, INSIDE_VIDEO, INTRO_VIDEO, JOSE_BEFORE_AFTER, PHOTO_TESTIMONIALS, TECHNIQUE_VIDEOS, VIDEO_TESTIMONIALS } from '@/lib/home-content'
import { LINKS, OWNER, PRICE, WA_BOOK, WHATSAPP, waLink } from '@/lib/site'
import hero from '@/public/images/jose.jpg'
import back from '@/public/images/onboarding-close.jpg'
import './home.css'

export const metadata: Metadata = {
  title: 'Jose Unstoppable · Pierde la barriga en menos de 90 días',
  description: 'Coaching 1:1 online con Jose. Mis alumnos pierden la barriga en menos de 90 días entrenando 3 horas a la semana, con nutrición que encaja en su vida y seguimiento diario.',
  alternates: { canonical: '/' },
}

// Videos, photos and results live in lib/home-content.ts. Each block below
// shows only once it has something real to show.
const videoTestimonials = VIDEO_TESTIMONIALS.filter(t => t.video).slice(0, 6)
const photoTestimonials = PHOTO_TESTIMONIALS.filter(t => t.before && t.after).slice(0, 6)
const hasResults = videoTestimonials.length + photoTestimonials.length > 0
const insideShots = INSIDE_SHOTS.filter(s => s.src)
const techniqueVideos = TECHNIQUE_VIDEOS.filter(Boolean).slice(0, 2)
const hasInside = !!INSIDE_VIDEO || insideShots.length + techniqueVideos.length > 0
const hasJoseBeforeAfter = !!(JOSE_BEFORE_AFTER.before && JOSE_BEFORE_AFTER.after)

function Ck() {
  return (
    <span className="h-ck" aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6.3l2.3 2.3 4.7-5.1" /></svg>
    </span>
  )
}

function WaIcon() {
  return (
    <span className="arr" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M16.04 3C8.86 3 3.03 8.82 3.03 15.99c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75a12.97 12.97 0 0 0 6.36 1.63h.01c7.17 0 13-5.83 13-13S23.21 3 16.04 3Zm5.93 15.59c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.73.17-.22.32-.84 1.05-1.03 1.27-.19.22-.38.24-.7.08-.33-.16-1.38-.51-2.62-1.62-.97-.86-1.62-1.93-1.81-2.25-.19-.33-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.22-.32.33-.54.11-.22.05-.41-.03-.57-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.55-.73-.56h-.62c-.22 0-.57.08-.87.41-.3.32-1.14 1.11-1.14 2.71s1.17 3.15 1.33 3.36c.16.22 2.3 3.5 5.56 4.91.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.42.19-1.55-.08-.14-.3-.22-.62-.38Z" /></svg>
    </span>
  )
}

// The main call to action: a WhatsApp chat with Jose to book the free call,
// one link per language so the pre-filled message matches the page.
function WaButton({ es = 'Escríbeme por WhatsApp', en = 'Message me on WhatsApp' }: { es?: string; en?: string }) {
  return (
    <>
      <a data-es="" className="btn btn-wa" href={waLink(WA_BOOK.es)} target="_blank" rel="noopener">{es}<WaIcon /></a>
      <a data-en="" className="btn btn-wa" href={waLink(WA_BOOK.en)} target="_blank" rel="noopener">{en}<WaIcon /></a>
    </>
  )
}

function BookLink() {
  return <Link className="h-booklink" href={LINKS.book}><T es="o reserva tu llamada directamente" en="or book your call directly" /></Link>
}

const WA_DISPLAY = '+' + WHATSAPP.replace(/^(\d{2})(\d{3})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5')

const FAQ: [string, string, string, string][] = [
  ['Siempre abandono. ¿Por qué ahora sería distinto?', 'I always quit. Why would this time be different?', 'Porque no lo haces solo: tienes un plan claro, WhatsApp diario conmigo y un check-in cada semana.', "Because you're not doing it alone: a clear plan, daily WhatsApp with me and a check-in every week."],
  ['¿Voy a pasar hambre o dejar de salir?', 'Will I go hungry or have to stop going out?', 'No. Aprendes a comer con una estructura sencilla que encaja con tu vida social.', 'No. You learn a simple way of eating that fits your social life.'],
  ['¿Qué pasa en la llamada gratuita?', 'What happens on the free call?', 'Son 30 minutos. Me cuentas tu situación y te digo con sinceridad si te puedo ayudar. Sin compromiso.', "It's 30 minutes. You tell me where you are and I tell you honestly whether I can help. No commitment."],
]

export default function Home() {
  return (
    <div className="home">
      {/* 1 · Hero: photo, who, promise, call to action */}
      <section id="top" className="h-hero">
        <div className="wrap">
          <div className="h-photo">
            <Image src={hero} alt={`${OWNER.name}, entrenador online`} fill priority sizes="(max-width: 640px) 88vw, 420px" placeholder="blur" />
          </div>
          <div className="h-copy">
            <p className="h-name"><T es={`${OWNER.name.split(' ')[0]}, entrenador online`} en={`${OWNER.name.split(' ')[0]}, online coach`} /></p>
            <span className="h-pill"><T es="Acompañamiento 1 a 1 · +100 personas ya lo han logrado" en="1:1 coaching · 100+ people have already done it" /></span>
            <h1 className="disp">
              <T
                es={<>Mis alumnos pierden la barriga <span className="hl">en menos de 90&nbsp;días,</span> entrenando 3&nbsp;h a la semana.</>}
                en={<>My clients lose the belly <span className="hl">in under 90&nbsp;days,</span> training 3&nbsp;h a week.</>}
              />
            </h1>
            <p className="lead"><T es="Sin dietas imposibles ni vivir en el gimnasio. Con un plan hecho para ti y yo a tu lado cada día." en="No impossible diets, no living at the gym. A plan built for you and me by your side every day." /></p>
            <div className="h-ctas">
              <WaButton />
              <BookLink />
              <FreeCallsNote />
            </div>
          </div>
        </div>
      </section>

      {/* 3 · Intro video, once recorded */}
      {INTRO_VIDEO && (
        <section id="empieza" className="sec tint h-center">
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow"><T es="Empieza aquí" en="Start here" /></span>
              <h2 className="disp"><T es={<>Quién soy y <span className="hl">cómo te ayudo.</span></>} en={<>Who I am and <span className="hl">how I help.</span></>} /></h2>
            </div>
            <div className="h-intro-video">
              <VideoFrame src={INTRO_VIDEO} label="Ver vídeo: quién soy" className="v">
                <Image src={hero} alt="" fill sizes="(max-width: 640px) 88vw, 380px" />
                <span className="h-vcap"><small><T es="Empieza aquí" en="Start here" /></small><b><T es="Quién soy y cómo te voy a ayudar" en="Who I am and how I'll help you" /></b></span>
              </VideoFrame>
            </div>
          </div>
        </section>
      )}

      {/* 4 · Client videos and results */}
      {hasResults && (
        <section id="resultados" className="sec h-center">
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow"><T es="Resultados" en="Results" /></span>
              <h2 className="disp"><T es={<>Ellos ya <span className="hl">lo han conseguido.</span></>} en={<>They&apos;ve <span className="hl">already done it.</span></>} /></h2>
            </div>
            {videoTestimonials.length > 0 && (
              <div className="h-tvideos">
                {videoTestimonials.map((t, i) => (
                  <div key={t.video} className="h-tvideo">
                    <VideoFrame src={t.video} label={`Ver testimonio de ${t.name || i + 1}`} className="v">
                      <span className="h-vcap"><small>{t.result}</small><b>{t.name}</b></span>
                    </VideoFrame>
                  </div>
                ))}
              </div>
            )}
            {photoTestimonials.length > 0 && (
              <div className="h-tquotes">
                {photoTestimonials.map(t => (
                  <figure key={t.before} className="h-tcard">
                    <div className="h-tba">
                      <div className="h-tph"><Image src={t.before} alt={`${t.name} antes`} fill sizes="(max-width: 900px) 45vw, 180px" /><span className="lbl"><T es="Antes" en="Before" /></span></div>
                      <div className="h-tph after"><Image src={t.after} alt={`${t.name} después`} fill sizes="(max-width: 900px) 45vw, 180px" /><span className="lbl"><T es="Después" en="After" /></span></div>
                    </div>
                    {t.quote && <blockquote>{t.quote}</blockquote>}
                    <figcaption><b>{t.name}</b>{t.result && <span>{t.result}</span>}</figcaption>
                  </figure>
                ))}
              </div>
            )}
            <div className="h-after-cta"><WaButton es="Quiero ser el siguiente" en="I want to be next" /></div>
          </div>
        </section>
      )}

      {/* 5 · About Jose, short */}
      <section id="sobre-mi" className="sec tint">
        <div className="wrap h-about">
          <div className="h-about-media">
            {hasJoseBeforeAfter ? (
              <div className="h-jba">
                <figure><Image src={JOSE_BEFORE_AFTER.before} alt={`${OWNER.name} antes`} fill sizes="(max-width: 900px) 45vw, 260px" /><figcaption><T es="Antes · 77 kg" en="Before · 77 kg" /></figcaption></figure>
                <figure className="now"><Image src={JOSE_BEFORE_AFTER.after} alt={`${OWNER.name} hoy`} fill sizes="(max-width: 900px) 45vw, 260px" /><figcaption><T es="Hoy · 69 kg" en="Today · 69 kg" /></figcaption></figure>
              </div>
            ) : (
              <div className="h-about-photo"><Image src={back} alt={`${OWNER.name} entrenando`} fill sizes="(max-width: 900px) 88vw, 460px" placeholder="blur" /></div>
            )}
          </div>
          <div className="h-about-copy">
            <span className="eyebrow"><T es="Sobre mí" en="About me" /></span>
            <h2 className="disp"><T es={<>Yo también <span className="hl">estuve ahí.</span></>} en={<>I&apos;ve <span className="hl">been there too.</span></>} /></h2>
            <p><T es="Camarero en Marbella, malos hábitos, alcohol cada fin de semana y un cuerpo que no quería ni ver en las fotos." en="A waiter in Marbella, bad habits, drinking every weekend and a body I didn't want to see in photos." /></p>
            <p><T es={<>A principios de 2025 dije basta. Entrenando fuerza 3 veces por semana y comiendo bien, <strong>en 6 meses pasé de 77 a 69 kilos</strong> y me volví a gustar.</>} en={<>In early 2025 I said enough. Training strength 3 times a week and eating well, <strong>I went from 77 to 69 kg in 6 months</strong> and liked myself again.</>} /></p>
            <p><T es="Desde entonces he ayudado a más de 100 personas a conseguir lo mismo. Te doy el camino exacto para que tú lo hagas en 90 días." en="Since then I've helped more than 100 people do the same. I give you the exact path to do it in 90 days." /></p>
            <ul className="h-about-facts">
              <li><b>77 → 69</b><T es="kilos" en="kg" /></li>
              <li><b>6</b><T es="meses" en="months" /></li>
              <li><b>+100</b><T es="alumnos" en="clients" /></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6 · How it works */}
      <section id="method" className="sec h-center">
        <div className="wrap">
          <div className="head center">
            <span className="eyebrow"><T es="Cómo funciona" en="How it works" /></span>
            <h2 className="disp"><T es={<>Simple, efectivo y <span className="hl">conmigo cada día.</span></>} en={<>Simple, effective and <span className="hl">with me every day.</span></>} /></h2>
          </div>
          <div className="h-pillars">
            <div className="h-pillar"><span className="num">01</span><h3><T es="Entreno de 3 h a la semana" en="3 hours of training a week" /></h3><p><T es="Rutinas de fuerza hechas para ti en mi app, con cada ejercicio explicado paso a paso." en="Strength routines built for you in my app, every exercise explained step by step." /></p></div>
            <div className="h-pillar"><span className="num">02</span><h3><T es="Nutrición sin dietas imposibles" en="Nutrition without impossible diets" /></h3><p><T es="Una estructura clara y recetas sencillas que encajan con tu trabajo, tu familia y tus cenas fuera." en="A clear structure and simple recipes that fit your job, your family and your dinners out." /></p></div>
            <div className="h-pillar"><span className="num">03</span><h3><T es="Yo contigo cada día" en="Me with you every day" /></h3><p><T es="WhatsApp diario y un check-in cada semana para ajustar el plan. Nunca vas solo." en="Daily WhatsApp and a weekly check-in to adjust the plan. You're never alone." /></p></div>
          </div>
        </div>
      </section>

      {/* 7 · Inside the program, once there are screenshots or videos */}
      {hasInside && (
        <section id="por-dentro" className="sec h-inside h-center">
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow"><T es="Así es por dentro" en="See inside" /></span>
              <h2 className="disp"><T es={<>Esto es lo que vas a tener <span className="hl">en tu móvil.</span></>} en={<>This is what you get <span className="hl">on your phone.</span></>} /></h2>
            </div>
            <div className="h-inside-grid">
              {INSIDE_VIDEO && (
                <div className="h-inside-video">
                  <VideoFrame src={INSIDE_VIDEO} label="Ver la app por dentro" className="v">
                    <span className="h-vcap"><small><T es="La app por dentro" en="Inside the app" /></small><b><T es="Así es un día de entreno" en="A training day, step by step" /></b></span>
                  </VideoFrame>
                </div>
              )}
              {insideShots.map(shot => (
                <figure key={shot.src} className="h-shot">
                  <div className="h-phone"><Image src={shot.src} alt={shot.es} fill sizes="(max-width: 640px) 70vw, 230px" /></div>
                  <figcaption><T es={shot.es} en={shot.en} /></figcaption>
                </figure>
              ))}
              {techniqueVideos.map((v, i) => (
                <div key={v} className="h-inside-video">
                  <VideoFrame src={v} label={`Ver corrección de técnica ${i + 1}`} className="v">
                    <span className="h-vcap"><small><T es="Corrección de técnica" en="Technique check" /></small><b><T es="Así corrijo tus ejercicios" en="How I correct your lifts" /></b></span>
                  </VideoFrame>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8 · Offer */}
      <section id="offer" className="sec tint">
        <div className="wrap h-offer">
          <div className="h-offer-l">
            <span className="eyebrow"><T es="Tu programa" en="Your program" /></span>
            <h2 className="disp"><T es={<>90 días para <span className="hl">volver a gustarte.</span></>} en={<>90 days to <span className="hl">like yourself again.</span></>} /></h2>
            <div className="h-guar">
              <div className="h-seal" aria-hidden="true">
                <svg viewBox="0 0 100 100"><defs><path id="seal-circle" d="M50 50m-40 0a40 40 0 1 1 80 0a40 40 0 1 1-80 0" /></defs><text><textPath href="#seal-circle">GARANTÍA · IMPARABLE · GARANTÍA · IMPARABLE ·</textPath></text></svg>
                <b>100%</b>
              </div>
              <div>
                <h3><T es="Garantía Imparable" en="The Unstoppable Guarantee" /></h3>
                <p><T es="Si sigues el plan, haces tus entrenos y tus check-ins, y no ves resultados, te devuelvo el 100% de tu dinero." en="If you follow the plan, do your workouts and check-ins, and don't see results, I refund 100% of your money." /></p>
              </div>
            </div>
          </div>
          <div className="h-price">
            <div className="h-price-top"><b><T es="Programa Imparable" en="Unstoppable Program" /></b><span><T es="3 meses" en="3 months" /></span></div>
            <div className="h-amount"><b>{PRICE}<sup>€</sup></b><T es="coaching 1:1 durante 3 meses" en="1:1 coaching for 3 months" /></div>
            <ul>
              <li><Ck /><T es="Plan de fuerza personalizado en mi app" en="Personal strength plan in my app" /></li>
              <li><Ck /><T es="Nutrición adaptada con recetas sencillas" en="Tailored nutrition with simple recipes" /></li>
              <li><Ck /><T es="WhatsApp diario y check-in semanal conmigo" en="Daily WhatsApp and weekly check-in with me" /></li>
              <li><Ck /><strong><T es="Garantía de devolución del 100%" en="100% money-back guarantee" /></strong></li>
            </ul>
            <WaButton es="Escríbeme y agendamos tu llamada" en="Message me to book your call" />
            <p className="micro"><T es="Primero hablamos por WhatsApp y te agendo una llamada gratuita de 30 minutos." en="We chat on WhatsApp first and I book you a free 30-minute call." /></p>
          </div>
        </div>
      </section>

      {/* 9 · FAQ */}
      <section id="faq" className="sec">
        <div className="wrap h-faq">
          <div className="head center">
            <span className="eyebrow"><T es="Preguntas frecuentes" en="FAQ" /></span>
            <h2 className="disp"><T es={<>Lo que te estás <span className="hl">preguntando.</span></>} en={<>What you&apos;re <span className="hl">wondering.</span></>} /></h2>
          </div>
          <div className="h-faq-list">
            {FAQ.map(([qEs, qEn, aEs, aEn]) => (
              <details key={qEn} className="qa">
                <summary><span><T es={qEs} en={qEn} /></span><span className="pm">+</span></summary>
                <p><T es={aEs} en={aEn} /></p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Close: talk to Jose on WhatsApp before booking */}
      <section id="whatsapp" className="sec final">
        <div className="wrap">
          <span className="eyebrow"><T es="Hablemos" en="Let's talk" /></span>
          <h2 className="disp"><T es={<>Escríbeme y <span className="hl">agendamos tu llamada.</span></>} en={<>Message me and <span className="hl">we&apos;ll book your call.</span></>} /></h2>
          <p className="lead"><T es="Cuéntame en un mensaje dónde estás y qué quieres conseguir. Te respondo yo mismo y te doy día y hora para una llamada gratuita de 30 minutos." en="Tell me in a message where you are and what you want. I reply myself and give you a day and time for a free 30-minute call." /></p>
          <WaButton />
          <p className="h-wa-number"><T es="WhatsApp" en="WhatsApp" /> · {WA_DISPLAY}</p>
          <FreeCallsNote className="on-dark" />
        </div>
      </section>

      <MobileBar href={waLink(WA_BOOK.es)} hrefEn={waLink(WA_BOOK.en)} className="btn btn-wa"><T es="Escríbeme por WhatsApp" en="Message me on WhatsApp" /></MobileBar>
    </div>
  )
}
