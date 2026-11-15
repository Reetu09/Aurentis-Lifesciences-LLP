import { useEffect, useRef, useState } from 'react'

const QUOTE =
  '"Aurentis Lifesciences is committed to crafting premium, science-backed therapeutic formulations that restore health, protect vital organs, and inspire clinical trust."'

const IconFlask = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 3h6M10 3v6L4.6 18.6A1.6 1.6 0 0 0 6 21h12a1.6 1.6 0 0 0 1.4-2.4L14 9V3" />
    <path d="M7.6 15h8.8" />
  </svg>
)

const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
  </svg>
)

const IconLayers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3 3 8l9 5 9-5-9-5Z" />
    <path d="m3 12.5 9 5 9-5" />
    <path d="m3 17 9 5 9-5" />
  </svg>
)

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l7.5 3v5.5c0 4.5-3.1 8.2-7.5 9.5-4.4-1.3-7.5-5-7.5-9.5V6L12 3Z" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </svg>
)

const IconGrowth = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect className="ab-bar" style={{ '--bd': '0.1s' }} x="3" y="15" width="4" height="6" fill="currentColor" />
    <rect className="ab-bar" style={{ '--bd': '0.22s' }} x="9.5" y="11" width="4" height="10" fill="currentColor" />
    <rect className="ab-bar" style={{ '--bd': '0.34s' }} x="16" y="8" width="4" height="13" fill="currentColor" />
    <path className="ab-arrow" d="M3 11.5 9 6.5l4 3L20.5 3" />
    <path className="ab-arrow" d="M16 3h4.5v4.5" />
  </svg>
)

const PILLARS = [
  {
    title: 'Our Commitment',
    icon: <IconFlask />,
    text: 'Transforming modern healthcare through research-backed, high-purity nutraceutical solutions.',
  },
  {
    title: 'Our Foundation',
    icon: <IconTarget />,
    text: 'Built on clinical excellence, uncompromised purity, and scientific integrity.',
  },
  {
    title: 'Our Expertise',
    icon: <IconLayers />,
    text: 'Developing targeted health formulations—starting with specialized Liver Protection, Cellular Regeneration, and Antioxidant Support.',
  },
  {
    title: 'Our Standards',
    icon: <IconShield />,
    text: 'Produced with top-tier active ingredients in strict compliance with international quality standards, WHO-GMP guidelines, and FSSAI safety norms.',
  },
]

const GROWTH_TEXT =
  'As a dynamic and forward-looking pharmaceutical & nutraceutical enterprise, we are continually expanding our pipeline to bring innovative, science-driven health solutions to doctors, patients, and healthcare partners across the nation.'

const CSS = `
  .ab {
    position: relative;
    overflow: hidden;
    background: #E7F4FC;
    color: #1D3651;
    scroll-margin-top: 88px;
  }

  .ab-shell {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 40px 56px;
  }

  .ab-slot {
    opacity: 0;
    transform: translateY(22px);
  }

  .ab.in .ab-slot {
    animation: abRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s) forwards;
  }

  /* ---------- top row ---------- */
  .ab-top {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.95fr);
    gap: 40px;
    align-items: start;
    margin-bottom: 32px;
  }

  .ab-kicker-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 18px;
  }

  .ab-kicker {
    display: inline-flex;
    align-items: center;
    padding: 5px 14px;
    border-radius: 999px;
    border: 1px solid #A17C2D;
    background: transparent;
    color: #A17C2D;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }

  .ab-kicker-line {
    width: 92px;
    height: 1px;
    background: #A17C2D;
    transform: scaleX(0);
    transform-origin: left center;
  }

  .ab.in .ab-kicker-line {
    animation: abDraw 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
  }

  .ab-h2 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: clamp(22px, 2.4vw, 33px);
    line-height: 1.22;
    letter-spacing: -0.025em;
    color: #1D3651;
    margin: 0 0 16px;
    overflow-wrap: break-word;
  }

  .ab-h2 span {
    display: block;
  }

  @media (min-width: 681px) {
    .ab-h2 span {
      white-space: nowrap;
    }
  }

  .ab-h2 em {
    display: block;
    font-style: normal;
    font-weight: 700;
    color: #A17C2D;
    margin-top: 4px;
  }

  .ab-rule {
    width: 64px;
    height: 3px;
    border-radius: 3px;
    background: #A17C2D;
    transform: scaleX(0);
    transform-origin: left center;
  }

  .ab.in .ab-rule {
    animation: abDraw 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.45s forwards;
  }

  /* ---------- quote (typewriter) ---------- */
  .ab-qwrap {
    position: relative;
    margin-top: 4px;
    margin-right: 14px;
  }

  .ab-qline {
    position: absolute;
    inset: 0;
    border: 1.5px solid #A17C2D;
    border-radius: 34px;
    transform: translate(14px, 10px) skewX(-14deg);
    opacity: 0.75;
  }

  .ab-qbox {
    position: relative;
    border-radius: 34px;
    overflow: hidden;
    background: #FFFFFF;
    box-shadow: 0 22px 44px -22px rgba(0, 0, 0, 0.45);
    transform: skewX(-14deg);
  }

  .ab-qfloat {
    position: relative;
    animation: abFloat 6s ease-in-out infinite;
  }

  .ab-qbox::after,
  .ab-growth::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 28%;
    background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.14), transparent);
    transform: translateX(-120%);
    animation: abShine 6s ease-in-out 2.5s infinite;
    pointer-events: none;
  }

  .ab-growth::after {
    background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.7), transparent);
    animation-delay: 3.5s;
  }

  .ab-kicker::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #A17C2D;
    margin-right: 8px;
    animation: abPulse 1.8s ease-in-out infinite;
  }

  .ab-qin {
    transform: skewX(14deg);
    padding: 18px 44px 24px 52px;
  }

  .ab-qmark {
    display: block;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 52px;
    line-height: 0.8;
    height: 26px;
    color: #A17C2D;
    margin-bottom: 6px;
  }

  .ab-qtext {
    margin: 0;
    font-family: 'Playfair Display', serif;
    font-size: clamp(15px, 1.4vw, 19px);
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: -0.015em;
    color: #1D3651;
    overflow-wrap: break-word;
  }

  .ab-caret {
    position: relative;
    display: inline-block;
    width: 0;
    height: 1em;
    vertical-align: text-bottom;
  }

  .ab-caret::after {
    content: '';
    position: absolute;
    left: 1px;
    top: 0.08em;
    width: 2px;
    height: 0.95em;
    background: #A17C2D;
    animation: abBlink 0.9s steps(1) infinite;
  }

  .ab-qtext.done .ab-caret::after {
    animation: abFade 0.6s ease 1.4s forwards;
  }

  /* ---------- pillars ---------- */
  .ab-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-bottom: 28px;
  }

  .ab-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 2px 22px;
    border-left: 1px solid rgba(29, 54, 81, 0.16);
  }

  .ab-item:first-child {
    padding-left: 0;
    border-left: 0;
  }

  .ab-item:last-child {
    padding-right: 0;
  }

  .ab-ico {
    flex: 0 0 auto;
    width: 56px;
    height: 56px;
    display: grid;
    place-items: center;
    border-radius: 16px;
    border: 1px solid #A17C2D;
    background: transparent;
    color: #A17C2D;
    box-shadow: none;
    transition: transform 0.35s ease, box-shadow 0.35s ease;
  }

  .ab-ico svg {
    width: 28px;
    height: 28px;
    animation: abBob 3.6s ease-in-out infinite;
  }

  .ab-item:nth-child(2) .ab-ico svg { animation-delay: 0.5s; }
  .ab-item:nth-child(3) .ab-ico svg { animation-delay: 1s; }
  .ab-item:nth-child(4) .ab-ico svg { animation-delay: 1.5s; }

  .ab-item:hover .ab-ico {
    transform: translateY(-4px) rotate(-3deg);
    box-shadow: 0 14px 22px -12px rgba(161, 124, 45, 0.45);
  }

  .ab-item h3 {
    margin: 2px 0 6px;
    font-size: 17px;
    font-weight: 700;
    color: #1D3651;
    letter-spacing: -0.01em;
  }

  .ab-item p {
    margin: 0;
    font-size: 13.5px;
    line-height: 1.55;
    color: #1D3651;
  }

  /* ---------- growth bar ---------- */
  .ab-growth {
    display: flex;
    align-items: center;
    gap: 22px;
    padding: 18px 28px;
    border-radius: 30px;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(29, 54, 81, 0.1);
    background: #FFFFFF;
  }

  .ab-growth-ico {
    flex: 0 0 auto;
    width: 42px;
    height: 42px;
    color: #A17C2D;
    margin-left: 24px;
  }

  .ab-growth-ico svg {
    width: 100%;
    height: 100%;
  }

  .ab-vline {
    flex: 0 0 auto;
    width: 1px;
    align-self: stretch;
    background: rgba(29, 54, 81, 0.16);
  }

  .ab-growth h3 {
    flex: 0 0 auto;
    margin: 0;
    min-width: 140px;
    font-size: 20px;
    font-weight: 700;
    color: #1D3651;
    letter-spacing: -0.01em;
  }

  .ab-growth p {
    margin: 0;
    font-size: 14.5px;
    line-height: 1.6;
    color: #1D3651;
  }

  .ab-bar {
    transform-box: fill-box;
    transform-origin: bottom;
    transform: scaleY(0);
  }

  .ab.in .ab-bar {
    animation: abBarLoop 4.6s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--bd, 0s) + 0.9s) infinite;
  }

  .ab-arrow {
    stroke-dasharray: 40;
    stroke-dashoffset: 40;
  }

  .ab.in .ab-arrow {
    animation: abArrowLoop 4.6s ease 1.3s infinite;
  }

  .ab-growth-ico {
    position: relative;
  }

  .ab-growth-ico::before {
    content: '';
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(161, 124, 45, 0.22), transparent 70%);
    animation: abRing 2.6s ease-in-out infinite;
  }

  .ab-growth-ico svg {
    position: relative;
    animation: abBob 3.2s ease-in-out infinite;
  }

  /* ---------- keyframes ---------- */
  @keyframes abRise {
    to { opacity: 1; transform: none; }
  }

  @keyframes abDraw {
    to { transform: scaleX(1); }
  }

  @keyframes abGrow {
    to { transform: scaleY(1); }
  }

  @keyframes abBarLoop {
    0% { transform: scaleY(0); }
    18%, 80% { transform: scaleY(1); }
    92%, 100% { transform: scaleY(0); }
  }

  @keyframes abArrowLoop {
    0%, 14% { stroke-dashoffset: 40; }
    42%, 80% { stroke-dashoffset: 0; }
    92%, 100% { stroke-dashoffset: 40; }
  }

  @keyframes abRing {
    0%, 100% { transform: scale(0.8); opacity: 0.4; }
    50% { transform: scale(1.15); opacity: 1; }
  }

  @keyframes abStroke {
    to { stroke-dashoffset: 0; }
  }

  @keyframes abBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes abFade {
    to { opacity: 0; }
  }

  @keyframes abFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-7px); }
  }

  @keyframes abShine {
    0% { transform: translateX(-120%); }
    35%, 100% { transform: translateX(480%); }
  }

  @keyframes abBob {
    0%, 100% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-3px) rotate(-4deg); }
  }

  @keyframes abPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(161, 124, 45, 0.45); }
    50% { box-shadow: 0 0 0 6px rgba(161, 124, 45, 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .ab-slot,
    .ab-rule,
    .ab-kicker-line,
    .ab-bar,
    .ab-arrow {
      opacity: 1 !important;
      transform: none !important;
      stroke-dashoffset: 0 !important;
      animation: none !important;
    }

    .ab-qfloat,
    .ab-qbox::after,
    .ab-growth::after,
    .ab-kicker::before,
    .ab-ico svg,
    .ab-growth-ico::before,
    .ab-growth-ico svg,
    .ab-caret::after {
      animation: none !important;
    }
  }

  /* ---------- responsive ---------- */
  @media (max-width: 1100px) {
    .ab-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      row-gap: 32px;
    }

    .ab-item:nth-child(odd) {
      padding-left: 0;
      border-left: 0;
    }

    .ab-item:nth-child(even) {
      padding-right: 0;
    }

    .ab-growth-ico {
      margin-left: 0;
    }
  }

  @media (max-width: 980px) {
    .ab-shell {
      padding-top: 60px;
      padding-bottom: 76px;
    }

    .ab-top {
      grid-template-columns: 1fr;
      gap: 36px;
    }
  }

  @media (max-width: 680px) {
    .ab-shell {
      padding: 64px 18px 80px;
    }

    .ab-qbox,
    .ab-qline {
      transform: skewX(-8deg);
    }

    .ab-qline {
      transform: translate(10px, 8px) skewX(-8deg);
    }

    .ab-qin {
      transform: skewX(8deg);
      padding: 16px 22px 20px 28px;
    }

    .ab-qmark {
      font-size: 44px;
      height: 22px;
    }

    .ab-kicker {
      white-space: normal;
    }

    .ab-grid {
      grid-template-columns: 1fr;
    }

    .ab-item,
    .ab-item:nth-child(even) {
      padding: 0;
      border-left: 0;
    }

    .ab-qwrap {
      margin-left: 8px;
      margin-right: 16px;
    }

    .ab-growth {
      flex-wrap: wrap;
      align-items: center;
      gap: 12px 16px;
      padding: 20px 20px;
      border-radius: 26px;
    }

    .ab-growth p {
      flex: 1 1 100%;
    }

    .ab-growth-ico {
      width: 40px;
      height: 40px;
      margin-left: 6px;
    }

    .ab-vline {
      display: none;
    }

    .ab-growth h3 {
      min-width: 0;
    }

    .ab-growth p {
      font-size: 14.5px;
    }
  }

  @media (max-width: 380px) {
    .ab-shell {
      padding: 40px 14px 48px;
    }

    .ab-h2 {
      font-size: 21px;
    }

    .ab-qin {
      padding: 14px 18px 18px 24px;
    }

    .ab-qtext {
      font-size: 14.5px;
    }

    .ab-ico {
      width: 50px;
      height: 50px;
    }

    .ab-item h3 {
      font-size: 16px;
    }
  }
`

export default function About() {
  const wrapRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const reveal = () => {
      el.classList.add('in')
      setStarted(true)
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(QUOTE.length)
      el.classList.add('in')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal()
          io.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let id
    const t = setTimeout(() => {
      id = setInterval(() => {
        setCount((c) => {
          if (c >= QUOTE.length) {
            clearInterval(id)
            return c
          }
          return c + 1
        })
      }, 28)
    }, 700)
    return () => {
      clearTimeout(t)
      clearInterval(id)
    }
  }, [started])

  const done = count >= QUOTE.length

  return (
    <section className="ab" id="about" ref={wrapRef}>
      <style>{CSS}</style>

      <div className="ab-shell">
        <div className="ab-top">
          <div className="ab-copy">
            <div className="ab-kicker-row ab-slot" style={{ '--d': '0.02s' }}>
              <span className="ab-kicker">Who We Are</span>
              <span className="ab-kicker-line" />
            </div>
            <h2 className="ab-h2 ab-slot" style={{ '--d': '0.1s' }}>
              <span>About Aurentis Lifesciences —</span>
              <em>Elevating Human Health Through Scientific Precision &amp; Uncompromised Quality.</em>
            </h2>
            <div className="ab-rule" />
          </div>

          <div className="ab-qwrap ab-slot" style={{ '--d': '0.25s' }}>
            <div className="ab-qfloat">
            <div className="ab-qline" />
            <blockquote className="ab-qbox" aria-label={QUOTE} style={{ margin: 0 }}>
              <div className="ab-qin">
                <span className="ab-qmark" aria-hidden="true">&ldquo;</span>
                <p className={`ab-qtext${done ? ' done' : ''}`} aria-hidden="true">
                  <span>{QUOTE.slice(0, count)}</span>
                  <span className="ab-caret" />
                  <span style={{ visibility: 'hidden' }}>{QUOTE.slice(count)}</span>
                </p>
              </div>
            </blockquote>
            </div>
          </div>
        </div>

        <div className="ab-grid">
          {PILLARS.map((p, i) => (
            <div className="ab-item ab-slot" style={{ '--d': `${0.4 + i * 0.12}s` }} key={p.title}>
              <div className="ab-ico">{p.icon}</div>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ab-growth ab-slot" style={{ '--d': '0.95s' }}>
          <div className="ab-growth-ico">
            <IconGrowth />
          </div>
          <span className="ab-vline" />
          <h3>Our Growth</h3>
          <span className="ab-vline" />
          <p>{GROWTH_TEXT}</p>
        </div>
      </div>
    </section>
  )
}