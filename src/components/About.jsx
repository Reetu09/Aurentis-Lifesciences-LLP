import { useEffect, useRef } from 'react'
import content from '../data/content.json'

const CSS = `
  .ab-wrap {
    background:
      radial-gradient(ellipse 60% 40% at 100% 0%, rgba(42, 157, 143, 0.08), transparent 55%),
      radial-gradient(ellipse 45% 35% at 0% 80%, rgba(201, 168, 76, 0.06), transparent 50%),
      #F4F8F8;
    position: relative;
    overflow: hidden;
  }

  .ab-wrap::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #2A9D8F, transparent);
  }

  .ab-shell {
    max-width: 1200px;
    margin: 0 auto;
    padding: 88px 40px 80px;
  }

  .ab-intro {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 56px;
    align-items: center;
    margin-bottom: 48px;
  }

  .ab-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .ab-wrap.in .ab-reveal {
    opacity: 1;
    transform: translateY(0);
  }

  .ab-wrap.in .ab-copy { transition-delay: 0.05s; }
  .ab-wrap.in .ab-focus { transition-delay: 0.18s; }
  .ab-wrap.in .ab-value:nth-child(1) { transition-delay: 0.22s; }
  .ab-wrap.in .ab-value:nth-child(2) { transition-delay: 0.34s; }
  .ab-wrap.in .ab-value:nth-child(3) { transition-delay: 0.46s; }
  .ab-wrap.in .ab-banner { transition-delay: 0.5s; }

  .ab-badge {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid rgba(42, 157, 143, 0.35);
    color: #2A9D8F;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 18px;
    background: rgba(255, 255, 255, 0.7);
  }

  .ab-h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 4.4vw, 52px);
    font-weight: 400;
    line-height: 1.12;
    color: #1B4A52;
    margin-bottom: 16px;
  }

  .ab-h2-accent {
    display: block;
    font-weight: 600;
    background: linear-gradient(135deg, #2A9D8F, #4DB8AC);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  .ab-line {
    width: 72px;
    height: 3px;
    background: linear-gradient(90deg, #2A9D8F, #C9A84C);
    margin-bottom: 24px;
    border-radius: 2px;
  }

  .ab-desc {
    color: #5A7A7E;
    font-size: 16px;
    line-height: 1.8;
    max-width: 560px;
  }

  .ab-focus {
    position: relative;
    background: linear-gradient(160deg, #12363C 0%, #0A2328 55%, #1B4A52 100%);
    border-radius: 28px;
    padding: 32px 28px 28px;
    color: #ffffff;
    box-shadow: 0 18px 48px rgba(10, 35, 40, 0.18);
    overflow: hidden;
  }

  .ab-focus::after {
    content: '';
    position: absolute;
    top: -50px;
    right: -40px;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: #4DB8AC;
    opacity: 0.16;
    filter: blur(40px);
    pointer-events: none;
  }

  .ab-focus-kicker {
    display: block;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #E8C97A;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .ab-focus h3 {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .ab-focus p {
    font-size: 13px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.62);
    margin-bottom: 20px;
  }

  .ab-specs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .ab-spec {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(77, 184, 172, 0.28);
    background: rgba(255, 255, 255, 0.04);
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.92);
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
  }

  .ab-spec:hover {
    border-color: rgba(77, 184, 172, 0.7);
    background: rgba(42, 157, 143, 0.16);
    transform: translateY(-1px);
  }

  .ab-spec i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4DB8AC;
    box-shadow: 0 0 8px rgba(77, 184, 172, 0.8);
    flex-shrink: 0;
  }

  .ab-b {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 28px;
  }

  .ab-value {
    position: relative;
    overflow: hidden;
    background: #ffffff;
    border: 1px solid #D4E0DF;
    border-left: 4px solid #2A9D8F;
    border-radius: 20px;
    padding: 28px 24px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .ab-value:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(27, 74, 82, 0.1);
  }

  .ab-value-icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1B4A52, #2A9D8F);
    display: grid;
    place-items: center;
    margin-bottom: 16px;
  }

  .ab-value-icon svg {
    width: 20px;
    height: 20px;
    stroke: #ffffff;
    fill: none;
    stroke-width: 1.7;
  }

  .ab-value h3 {
    font-size: 15px;
    font-weight: 700;
    color: #1B4A52;
    margin-bottom: 8px;
  }

  .ab-value p {
    font-size: 13px;
    color: #5A7A7E;
    line-height: 1.6;
  }

  .ab-dots {
    position: absolute;
    right: 18px;
    bottom: 16px;
    display: flex;
    gap: 5px;
  }

  .ab-dots span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #2A9D8F;
    opacity: 0.35;
  }

  .ab-dots span:nth-child(2) { opacity: 0.55; }
  .ab-dots span:nth-child(3) { opacity: 0.8; }

  .ab-banner {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #1B4A52, #0A2328);
    border-radius: 24px;
    padding: 36px 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
  }

  .ab-glow {
    position: absolute;
    top: -40px;
    right: -40px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: #4DB8AC;
    opacity: 0.15;
    filter: blur(60px);
    pointer-events: none;
  }

  .ab-banner-left {
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    z-index: 1;
  }

  .ab-flask {
    width: 56px;
    height: 56px;
    min-width: 56px;
    border-radius: 14px;
    background: rgba(201, 168, 76, 0.15);
    border: 1px solid rgba(201, 168, 76, 0.3);
    display: grid;
    place-items: center;
    color: #C9A84C;
  }

  .ab-banner h3 {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 6px;
  }

  .ab-banner-sub {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.6;
    max-width: 400px;
  }

  .ab-pills {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .ab-pill {
    border: 1px solid rgba(77, 184, 172, 0.45);
    color: #4DB8AC;
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-align: center;
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    .ab-reveal {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }

  @media (max-width: 900px) {
    .ab-intro {
      grid-template-columns: 1fr;
      gap: 28px;
    }
  }

  @media (max-width: 768px) {
    .ab-shell {
      padding: 64px 20px 56px;
    }

    .ab-b {
      grid-template-columns: 1fr;
    }

    .ab-banner {
      flex-direction: column;
      align-items: flex-start;
      padding: 28px 24px;
    }

    .ab-specs {
      grid-template-columns: 1fr;
    }
  }
`

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l8 3v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z" />
    </svg>
  )
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19c8-1 12-8 13-14-6 1-12 6-13 14z" />
      <path d="M8 16c2-3 5-5 9-6" />
    </svg>
  )
}

function FlaskIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M9 3h6M10 3v6L6 18a3 3 0 0 0 2.6 4h6.8A3 3 0 0 0 18 18l-4-9V3" />
    </svg>
  )
}

const VALUE_ICONS = [ShieldIcon, HeartIcon, LeafIcon]
const EXCELLENCE_PILLS = ['GMP Certified', 'ISO Quality', 'Pan India']

function splitHeading(heading) {
  const [first, ...rest] = heading.split(' ')
  return { first, rest: rest.join(' ') }
}

export default function About() {
  const wrapRef = useRef(null)
  const { first, rest } = splitHeading(content.about.heading)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.18 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="ab-wrap" id="about" ref={wrapRef}>
      <style>{CSS}</style>
      <div className="ab-shell">
        <div className="ab-intro">
          <div className="ab-copy ab-reveal">
            <span className="ab-badge">{content.about.badge}</span>
            <h2 className="ab-h2">
              {first}
              {rest ? <span className="ab-h2-accent">{rest}</span> : null}
            </h2>
            <div className="ab-line" />
            <p className="ab-desc">{content.about.description}</p>
          </div>

          <aside className="ab-focus ab-reveal">
            <span className="ab-focus-kicker">Our Range</span>
            <h3>{content.about.focusTitle}</h3>
            <p>{content.about.focusSubtitle}</p>
            <div className="ab-specs">
              {content.about.specialties.map((item) => (
                <span className="ab-spec" key={item}>
                  <i />
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </div>

        <div className="ab-b">
          {content.about.values.map((value, i) => {
            const Icon = VALUE_ICONS[i]
            return (
              <article className="ab-value ab-reveal" key={value.title}>
                <div className="ab-value-icon">{Icon ? <Icon /> : null}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
                <div className="ab-dots" aria-hidden="true">
                  <span /><span /><span />
                </div>
              </article>
            )
          })}
        </div>

        <div className="ab-banner ab-reveal">
          <div className="ab-glow" />
          <div className="ab-banner-left">
            <div className="ab-flask">
              <FlaskIcon />
            </div>
            <div>
              <h3>{content.about.cardTitle}</h3>
              <p className="ab-banner-sub">{content.about.cardText}</p>
            </div>
          </div>
          <div className="ab-pills">
            {EXCELLENCE_PILLS.map((pill) => (
              <span className="ab-pill" key={pill}>{pill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
