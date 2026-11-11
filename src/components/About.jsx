import { useEffect, useRef } from 'react'
import content from '../data/content.json'

const CSS = `
  .ab {
    position: relative;
    overflow: hidden;
    background: #fbfcfb;
    color: #122028;
    scroll-margin-top: 88px;
  }

  .ab-blob {
    position: absolute;
    pointer-events: none;
    z-index: 0;
  }

  .ab-blob-a {
    width: 420px;
    height: 320px;
    top: -80px;
    right: -60px;
    background: radial-gradient(circle, rgba(198, 228, 218, 0.55), transparent 68%);
    animation: abDrift 9s ease-in-out infinite;
  }

  .ab-blob-b {
    width: 360px;
    height: 280px;
    left: -90px;
    bottom: 80px;
    background: radial-gradient(circle, rgba(214, 232, 224, 0.7), transparent 70%);
    animation: abDrift 11s ease-in-out infinite reverse;
  }

  .ab-shell {
    position: relative;
    z-index: 1;
    max-width: 1180px;
    margin: 0 auto;
    padding: 84px 40px 72px;
  }

  .ab-copy {
    max-width: 860px;
  }

  .ab-slot {
    opacity: 0;
    transform: translateY(22px);
  }

  .ab.in .ab-slot {
    animation: abRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s) forwards;
  }

  .ab-kicker-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 22px;
  }

  .ab-kicker {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 999px;
    border: 1px solid #d7e2de;
    background: #ffffff;
    color: #3c4a48;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  .ab-kicker-line {
    width: 92px;
    height: 1px;
    background: #c9d6d1;
    transform: scaleX(0);
    transform-origin: left center;
  }

  .ab.in .ab-kicker-line {
    animation: abDraw 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
  }

  .ab-h2 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: clamp(28px, 3.4vw, 42px);
    line-height: 1.22;
    letter-spacing: -0.025em;
    color: #121a22;
    margin-bottom: 16px;
    max-width: 920px;
    overflow-wrap: break-word;
  }

  .ab-h2 span {
    display: block;
  }

  .ab-h2 em {
    display: block;
    font-style: normal;
    font-weight: 600;
    color: #1a7564;
    margin-top: 6px;
  }

  .ab-rule {
    width: 52px;
    height: 3px;
    border-radius: 3px;
    background: #1a7564;
    margin-bottom: 20px;
    transform: scaleX(0);
    transform-origin: left center;
  }

  .ab.in .ab-rule {
    animation: abDraw 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.28s forwards;
  }

  .ab-desc {
    max-width: 820px;
    color: #6d6878;
    font-size: 15.5px;
    line-height: 1.75;
    margin-bottom: 16px;
    overflow-wrap: break-word;
  }

  .ab-quote {
    margin-top: 12px;
    padding: 28px 32px;
    border-radius: 32px;
    border: 1px solid #e6efeb;
    background:
      radial-gradient(220px 140px at 0% 110%, rgba(198, 226, 216, 0.7), transparent 70%),
      radial-gradient(260px 160px at 100% 0%, rgba(210, 230, 222, 0.75), transparent 68%),
      #f4f9f7;
    font-family: 'Playfair Display', serif;
    font-size: clamp(18px, 2vw, 24px);
    font-weight: 600;
    line-height: 1.45;
    letter-spacing: -0.02em;
    color: #141c24;
    overflow-wrap: break-word;
  }

  @keyframes abRise {
    to { opacity: 1; transform: none; }
  }

  @keyframes abDraw {
    to { transform: scaleX(1); }
  }

  @keyframes abDrift {
    0%, 100% { transform: translate3d(0, 0, 0); }
    50% { transform: translate3d(0, -14px, 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .ab-slot,
    .ab-rule,
    .ab-kicker-line {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
    }

    .ab-blob {
      animation: none !important;
    }
  }

  @media (max-width: 680px) {
    .ab-shell {
      padding: 64px 18px 52px;
    }

    .ab-quote {
      padding: 22px 16px;
      border-radius: 24px;
    }

    .ab-kicker {
      white-space: normal;
    }
  }
`

export default function About() {
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const reveal = () => el.classList.add('in')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal()
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal()
          io.disconnect()
        }
      },
      { threshold: 0.16 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="ab" id="about" ref={wrapRef}>
      <style>{CSS}</style>
      <div className="ab-blob ab-blob-a" />
      <div className="ab-blob ab-blob-b" />

      <div className="ab-shell">
        <div className="ab-copy">
          <div className="ab-kicker-row ab-slot" style={{ '--d': '0.02s' }}>
            <span className="ab-kicker">{content.about.badge}</span>
            <span className="ab-kicker-line" />
          </div>
          <h2 className="ab-h2 ab-slot" style={{ '--d': '0.1s' }}>
            <span>{content.about.headingLead}</span>
            <em>{content.about.headingAccent}</em>
          </h2>
          <div className="ab-rule" />
          {content.about.paragraphs.map((paragraph, index) => (
            <p className="ab-desc ab-slot" style={{ '--d': `${0.2 + index * 0.08}s` }} key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <blockquote className="ab-quote ab-slot" style={{ '--d': '0.48s' }}>
          {content.about.quote}
        </blockquote>
      </div>
    </section>
  )
}
