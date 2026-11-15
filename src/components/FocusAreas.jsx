import { useEffect, useRef, useState } from 'react'
import content from '../data/content.json'

const CSS = `
  .fx {
    position: relative;
    overflow: hidden;
    background: #FFFFFF;
    color: #1D3651;
  }

  .fx-shell {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 40px 56px;
    display: grid;
    grid-template-columns: minmax(280px, 400px) minmax(0, 1fr);
    align-items: center;
    gap: 16px;
  }

  .fx-left {
    min-width: 0;
  }

  /* ---------- heading ---------- */
  .fx-tick {
    display: block;
    width: 76px;
    height: 3px;
    border-radius: 3px;
    background: #A17C2D;
    margin: 0 0 16px;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .fx.in .fx-tick {
    transform: scaleX(1);
  }

  .fx h2 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: clamp(26px, 2.8vw, 40px);
    line-height: 1.15;
    letter-spacing: -0.03em;
    color: #1D3651;
    max-width: 100%;
    margin: 0;
  }

  .fx-line {
    display: block;
  }

  /* ---------- badges ---------- */
  .fx-badges {
    display: flex;
    align-items: flex-start;
    gap: 0;
    margin-top: 34px;
    max-width: 100%;
  }

  .fx-badge {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 4px;
  }

  .fx-badge-ico {
    width: 56px;
    height: 56px;
    border-radius: 17px;
    background: #FFFFFF;
    border: 1px solid #A17C2D;
    box-shadow: 0 8px 16px -8px rgba(29, 54, 81, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9);
    color: #A17C2D;
    display: grid;
    place-items: center;
    margin-bottom: 10px;
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
  }

  .fx-badge:hover .fx-badge-ico {
    transform: translateY(-4px);
    box-shadow: 0 14px 22px -10px rgba(161, 124, 45, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }

  .fx-badge-ico svg {
    width: 28px;
    height: 28px;
    animation: fxBob 3.6s ease-in-out var(--bd, 0s) infinite;
  }

  .fx-badge b {
    display: block;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.35;
    color: #1D3651;
    letter-spacing: -0.01em;
  }

  .fx-div {
    width: 1px;
    height: 64px;
    margin-top: 2px;
    background: rgba(29, 54, 81, 0.18);
    flex-shrink: 0;
  }

  /* ---------- spine (arc) ---------- */
  .fx-right {
    display: grid;
    grid-template-columns: 100px minmax(0, 1fr);
    align-items: stretch;
    min-width: 0;
  }

  .fx-spine {
    position: relative;
    min-height: 100%;
  }

  .fx-spine svg {
    position: absolute;
    top: 0;
    left: 0;
    overflow: visible;
  }

  .fx-arc {
    fill: none;
    stroke: #A17C2D;
    stroke-width: 1.6;
    stroke-linecap: butt;
    stroke-dasharray: 1;
    stroke-dashoffset: 1.002;
    opacity: 0;
  }

  .fx.in .fx-arc {
    opacity: 1;
    stroke-dashoffset: 0;
    transition: stroke-dashoffset 1.7s cubic-bezier(0.4, 0.1, 0.3, 1) 0.15s, opacity 0.2s ease 0.15s;
  }

  .fx-travel {
    opacity: 0;
  }

  .fx.in .fx-travel {
    animation: fxShow 0.6s ease 2s forwards;
  }

  .fx-dot {
    position: absolute;
    width: 14px;
    height: 14px;
    margin-left: -7px;
    margin-top: -7px;
    border-radius: 50%;
    background: #1D3651;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.9), 0 3px 8px rgba(29, 54, 81, 0.35);
    transform: scale(0);
  }

  .fx-dot::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 1.5px solid rgba(161, 124, 45, 0.7);
    opacity: 0;
  }

  .fx.in .fx-dot {
    animation: fxDotIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) var(--dd, 0s) forwards;
  }

  .fx.in .fx-dot::after {
    animation: fxRing 2.6s ease-out calc(var(--dd, 0s) + 0.8s) infinite;
  }

  /* ---------- cards ---------- */
  .fx-cards {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
    padding: 6px 0 6px;
  }

  .fx-card {
    --ox: 0px;
    position: relative;
    display: flex;
    align-items: center;
    background: #FFFFFF;
    border: 1px solid rgba(29, 54, 81, 0.1);
    border-radius: 22px;
    padding: 16px 44px 16px 20px;
    box-shadow: 0 16px 36px rgba(29, 54, 81, 0.08);
    overflow: hidden;
    min-width: 0;
    transform: translate(var(--ox), 0);
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
  }

  .fx-card:nth-child(2) { --ox: 6px; }
  .fx-card:nth-child(3) { --ox: -8px; }

  .fx-card:hover {
    transform: translate(var(--ox), -6px);
    box-shadow: 0 22px 44px rgba(29, 54, 81, 0.13);
  }

  .fx-card::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 24%;
    background: linear-gradient(100deg, transparent, rgba(161, 124, 45, 0.12), transparent);
    transform: translateX(-130%);
    animation: fxShine 7s ease-in-out calc(var(--d, 0s) + 2.5s) infinite;
    pointer-events: none;
  }

  .fx-fold {
    position: absolute;
    top: 0;
    right: 0;
    width: 48px;
    height: 44px;
    fill: #1D3651;
    transform-origin: top right;
  }

  .fx-ico {
    position: relative;
    overflow: hidden;
    width: 56px;
    height: 56px;
    min-width: 56px;
    border-radius: 15px;
    background: #1D3651;
    color: #A17C2D;
    display: grid;
    place-items: center;
    box-shadow: 0 10px 18px -8px rgba(29, 54, 81, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.18);
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .fx-ico::after {
    content: '';
    position: absolute;
    top: -20%;
    bottom: -20%;
    left: 0;
    width: 35%;
    background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.28), transparent);
    transform: translateX(-160%) skewX(-18deg);
    animation: fxIcoShine 5s ease-in-out calc(var(--d, 0s) + 3s) infinite;
  }

  .fx-ico svg {
    position: relative;
    width: 28px;
    height: 28px;
    animation: fxBeat 3s ease-in-out calc(var(--d, 0s) + 1.4s) infinite;
  }

  .fx-card:hover .fx-ico {
    transform: scale(1.07) rotate(-3deg);
  }

  .fx-rule {
    width: 1px;
    height: 44px;
    background: rgba(29, 54, 81, 0.16);
    margin: 0 18px;
    flex-shrink: 0;
  }

  .fx-card h3 {
    font-size: 16.5px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #1D3651;
    margin: 0 0 3px;
    line-height: 1.3;
  }

  .fx-card p {
    margin: 0;
    font-size: 12.5px;
    line-height: 1.5;
    color: #1D3651;
    overflow-wrap: break-word;
  }

  /* ---------- entrance animations ---------- */
  .fx:not(.in) h2,
  .fx:not(.in) .fx-badge,
  .fx:not(.in) .fx-card {
    opacity: 0;
  }

  .fx.in h2 {
    animation: fxRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.08s backwards;
  }

  .fx.in .fx-badge {
    animation: fxRise 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s) backwards;
  }

  .fx.in .fx-card {
    animation: fxCardIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s) backwards;
  }

  .fx.in .fx-fold {
    animation: fxFoldIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--d, 0s) + 0.5s) backwards;
  }

  /* ---------- keyframes ---------- */
  @keyframes fxRise {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: none; }
  }

  @keyframes fxCardIn {
    from { opacity: 0; transform: translate(56px, 10px); }
    to { opacity: 1; transform: translate(var(--ox), 0); }
  }

  @keyframes fxFoldIn {
    from { transform: scale(0); }
    to { transform: scale(1); }
  }

  @keyframes fxDotIn {
    from { transform: scale(0); }
    to { transform: scale(1); }
  }

  @keyframes fxRing {
    0% { transform: scale(0.6); opacity: 0.8; }
    80%, 100% { transform: scale(2); opacity: 0; }
  }

  @keyframes fxShow {
    to { opacity: 1; }
  }

  @keyframes fxBob {
    0%, 100% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-3px) rotate(-4deg); }
  }

  @keyframes fxBeat {
    0%, 52%, 100% { transform: scale(1); }
    10% { transform: scale(1.12); }
    20% { transform: scale(1); }
    32% { transform: scale(1.07); }
    42% { transform: scale(1); }
  }

  @keyframes fxShine {
    0% { transform: translateX(-130%); }
    35%, 100% { transform: translateX(520%); }
  }

  @keyframes fxIcoShine {
    0% { transform: translateX(-160%) skewX(-18deg); }
    30%, 100% { transform: translateX(420%) skewX(-18deg); }
  }

  /* ---------- responsive ---------- */
  @media (min-width: 720px) {
    .fx-line {
      white-space: nowrap;
    }
  }

  @media (max-width: 1100px) {
    .fx-right {
      grid-template-columns: 80px minmax(0, 1fr);
    }

    .fx-card {
      padding-right: 40px;
    }

    .fx-rule {
      margin: 0 14px;
    }
  }

  @media (max-width: 980px) {
    .fx-shell {
      grid-template-columns: 1fr;
      gap: 28px;
      padding: 48px 24px 64px;
    }

    .fx-right {
      grid-template-columns: 1fr;
    }

    .fx-spine {
      display: none;
    }

    .fx .fx-card:nth-child(n) {
      --ox: 0px;
    }

    .fx-card {
      padding-right: 56px;
    }
  }

  @media (max-width: 640px) {
    .fx-shell {
      padding: 44px 16px 60px;
    }

    .fx-badges {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 22px 8px;
      margin-top: 30px;
    }

    .fx-div {
      display: none;
    }

    .fx-cards {
      gap: 14px;
    }

    .fx-card {
      padding: 16px 44px 16px 16px;
      border-radius: 22px;
    }

    .fx-ico {
      width: 54px;
      height: 54px;
      min-width: 54px;
      border-radius: 15px;
    }

    .fx-ico svg {
      width: 26px;
      height: 26px;
    }

    .fx-rule {
      height: 40px;
      margin: 0 12px;
    }

    .fx-card h3 {
      font-size: 15.5px;
    }

    .fx-card p {
      font-size: 12.5px;
      line-height: 1.5;
    }

    .fx-fold {
      width: 46px;
      height: 42px;
    }
  }

  @media (max-width: 380px) {
    .fx h2 {
      font-size: 26px;
    }

    .fx-rule {
      display: none;
    }

    .fx-ico {
      margin-right: 12px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fx *,
    .fx *::before,
    .fx *::after {
      animation: none !important;
      transition: none !important;
    }

    .fx h2,
    .fx-badge,
    .fx-card,
    .fx-arc {
      opacity: 1 !important;
    }

    .fx-tick {
      transform: none !important;
    }

    .fx-arc {
      stroke-dashoffset: 0 !important;
    }

    .fx-dot {
      transform: scale(1) !important;
    }

    .fx-travel {
      display: none;
    }
  }
`

function Ico({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

function ShieldIcon() {
  return (
    <Ico>
      <path d="M12 2.6l7.2 2.7v6c0 4.4-3 7.6-7.2 9-4.2-1.4-7.2-4.6-7.2-9V5.3L12 2.6z" />
      <path d="M8.5 11.7l2.3 2.3 4.7-4.9" />
    </Ico>
  )
}

function SealIcon() {
  return (
    <Ico>
      <path d="M8.6 13.4L6.8 21l5.2-2.6L17.2 21l-1.8-7.6" />
      <circle cx="12" cy="9" r="5.8" />
      <circle cx="12" cy="9" r="3.2" />
      <path d="M10.6 9l1 1 1.9-2" />
    </Ico>
  )
}

function LeafIcon() {
  return (
    <Ico>
      <path d="M19.2 4.8C19.2 4.8 8.6 4.6 6.4 12.2c-.8 2.9.4 5.4 2.8 6.3 5.8 2 10-5.4 10-13.7z" />
      <path d="M4.8 20C7.6 15.4 10.6 12 14.6 9" />
    </Ico>
  )
}

function FlaskIcon() {
  return (
    <Ico>
      <path d="M9 2.8h6" />
      <path d="M10 2.8v5.6L5.4 17.4c-.5 1 .2 2.2 1.4 2.2h10.4c1.2 0 1.9-1.2 1.4-2.2L14 8.4V2.8" />
      <path d="M7.4 14.2h9.2" />
    </Ico>
  )
}

function LiverIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.2 5.5H13.1L20.4 7Q21.8 7.4 21.2 8.9L13.4 12.9V14.4C11.8 14.8 9.2 15.7 7 17.4Q5.6 18.5 4.3 18.5Q3 18.4 3 16.8V9.8C3 7.3 5 5.5 8.2 5.5Z" />
      <path d="M13.1 5.7V15.9" />
    </svg>
  )
}

function MoleculeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
      <path d="M16.4 16.2L20.2 20.6" />
      <path d="M32.2 14.4L27.6 20.2" />
      <path d="M16.8 32.6L20.8 27.4" />
      <path d="M32.4 33L27.8 27.6" />
      <circle cx="24" cy="24" r="4.2" />
      <circle cx="12" cy="12.2" r="3.8" />
      <circle cx="36.4" cy="10.4" r="3.8" />
      <circle cx="12.6" cy="36.2" r="3.8" />
      <circle cx="36.2" cy="36.6" r="3.8" />
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      <path d="M24 8l14 6.2L24 20.4 10 14.2 24 8z" />
      <path d="M24 18.2l14 6.2L24 30.6 10 24.4 24 18.2z" />
      <path d="M24 28.4l14 6.2L24 40.8 10 34.6 24 28.4z" />
    </svg>
  )
}

const BADGES = [
  { lines: ['FSSAI', 'Approved'], Icon: ShieldIcon },
  { lines: ['WHO-GMP', 'Quality', 'Standards'], Icon: SealIcon },
  { lines: ['Clean Label', 'Formulations'], Icon: LeafIcon },
  { lines: ['High', 'Bioavailability'], Icon: FlaskIcon },
]

const CARD_ICONS = [LiverIcon, MoleculeIcon, LayersIcon]

export default function FocusAreas() {
  const { focusHeading, focus } = content.hero
  const [lead, rest] = focusHeading.split(' Therapeutic ')
  const sectionRef = useRef(null)
  const spineRef = useRef(null)
  const cardsRef = useRef(null)
  const [geo, setGeo] = useState(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const measure = () => {
      const spine = spineRef.current
      const cards = cardsRef.current?.querySelectorAll('.fx-card')
      if (!spine || !cards || cards.length < 2) return
      const box = spine.getBoundingClientRect()
      if (!box.height || !box.width) return

      const ys = [...cards].map((card) => {
        const rect = card.getBoundingClientRect()
        return rect.top + rect.height / 2 - box.top
      })
      const last = ys.length - 1
      const cy = (ys[0] + ys[last]) / 2
      const spacing = (ys[last] - ys[0]) / last
      const half = (ys[last] - ys[0]) / 2 + spacing * 0.5
      const sag = half * 0.47
      const R = (half * half + sag * sag) / (2 * sag)
      const apexX = box.width - 14
      const cx = apexX - R
      const xAt = (y) => cx + Math.sqrt(Math.max(R * R - (y - cy) * (y - cy), 0))

      const topY = cy - half
      const botY = cy + half
      const d = `M ${xAt(topY).toFixed(2)} ${topY.toFixed(2)} A ${R.toFixed(2)} ${R.toFixed(2)} 0 0 1 ${xAt(botY).toFixed(2)} ${botY.toFixed(2)}`

      setGeo({
        w: box.width,
        h: box.height,
        d,
        dots: ys.map((y) => ({ x: xAt(y), y, f: (y - topY) / (botY - topY) })),
      })
    }

    measure()
    const frame = requestAnimationFrame(measure)
    window.addEventListener('resize', measure)
    const observer = new ResizeObserver(measure)
    if (cardsRef.current) observer.observe(cardsRef.current)
    if (spineRef.current) observer.observe(spineRef.current)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', measure)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined
    let done = false
    let timer = 0
    const reveal = () => {
      if (done) return
      const rect = node.getBoundingClientRect()
      const view = window.innerHeight || 800
      if (rect.bottom < 64 || rect.top > view - 64) return
      done = true
      node.classList.add('in')
      setShown(true)
      window.clearInterval(timer)
    }
    timer = window.setInterval(reveal, 180)
    reveal()
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className={shown ? 'fx in' : 'fx'} ref={sectionRef} aria-label={focusHeading}>
      <style>{CSS}</style>

      <div className="fx-shell">
        <div className="fx-left">
          <span className="fx-tick" />
          <h2>
            <span className="fx-line">{lead} Therapeutic</span>
            <span className="fx-line">{rest}</span>
          </h2>
          <div className="fx-badges">
            {BADGES.map((badge, index) => (
              <div className="fx-badge-wrap" key={badge.lines.join(' ')} style={{ display: 'contents' }}>
                {index > 0 ? <span className="fx-div" /> : null}
                <div className="fx-badge" style={{ '--d': `${0.18 + index * 0.1}s` }}>
                  <span className="fx-badge-ico" style={{ '--bd': `${index * 0.45}s` }}>
                    <badge.Icon />
                  </span>
                  <b>
                    {badge.lines.map((line) => (
                      <span key={line} style={{ display: 'block' }}>{line}</span>
                    ))}
                  </b>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fx-right">
          <div className="fx-spine" aria-hidden="true" ref={spineRef}>
            {geo ? (
              <>
                <svg width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`}>
                  <path className="fx-arc" d={geo.d} pathLength="1" />
                  <g className="fx-travel">
                    <circle r="9" fill="#A17C2D" opacity="0.18" />
                    <circle r="3.6" fill="#1D3651" />
                    <animateMotion
                      dur="5.5s"
                      repeatCount="indefinite"
                      path={geo.d}
                      calcMode="spline"
                      keyTimes="0;1"
                      keySplines="0.45 0 0.55 1"
                    />
                  </g>
                </svg>
                {geo.dots.map((dot, index) => (
                  <i
                    className="fx-dot"
                    key={index}
                    style={{ left: `${dot.x}px`, top: `${dot.y}px`, '--dd': `${0.3 + dot.f * 1.4}s` }}
                  />
                ))}
              </>
            ) : null}
          </div>

          <div className="fx-cards" ref={cardsRef}>
            {focus.map((item, index) => {
              const Icon = CARD_ICONS[index] || LiverIcon
              return (
                <article className="fx-card" key={item.title} style={{ '--d': `${0.2 + index * 0.14}s` }}>
                  <svg className="fx-fold" viewBox="0 0 62 56" aria-hidden="true">
                    <path d="M0 0H62V56C60 23 35 3 0 0Z" />
                  </svg>
                  <span className="fx-ico"><Icon /></span>
                  <span className="fx-rule" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}