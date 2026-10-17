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

  .ab-top {
    display: grid;
    grid-template-columns: 0.92fr 1.08fr;
    gap: 28px;
    align-items: center;
  }

  .ab-slot {
    opacity: 0;
    transform: translateY(22px);
  }

  .ab-specs > .ab-slot,
  .ab-values > .ab-slot,
  .ab-pill-wrap > .ab-slot,
  .ab-copy > .ab-slot {
    display: block;
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
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .ab-kicker-line {
    width: 92px;
    height: 1px;
    background: #c9d6d1;
    transform: scaleX(0);
    transform-origin: left center;
  }

  .ab.in .ab-kicker-line,
  .ab.in .ab-focus-line,
  .ab.in .ab-commit-line {
    animation: abDraw 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
  }

  .ab-h2 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: clamp(42px, 4.6vw, 58px);
    line-height: 1.02;
    letter-spacing: -0.025em;
    color: #121a22;
    margin-bottom: 16px;
  }

  .ab-h2 span {
    display: block;
  }

  .ab-h2 em {
    display: block;
    font-style: normal;
    font-weight: 600;
    color: #1a7564;
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
    max-width: 460px;
    color: #6d6878;
    font-size: 15.5px;
    line-height: 1.7;
    margin-bottom: 28px;
  }

  .ab-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #0f3f34;
    color: #ffffff;
    padding: 14px 26px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 600;
    box-shadow: 0 10px 24px rgba(15, 63, 52, 0.18);
    transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  }

  .ab-btn svg {
    width: 16px;
    height: 16px;
    transition: transform 0.25s ease;
  }

  .ab-btn:hover {
    background: #0b3229;
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(15, 63, 52, 0.24);
  }

  .ab-btn:hover svg {
    transform: translateX(4px);
  }

  .ab-stage {
    position: relative;
    min-height: 100%;
  }

  .ab-bridge {
    position: absolute;
    left: -54px;
    top: 18px;
    width: 90px;
    height: 86%;
    overflow: visible;
    pointer-events: none;
  }

  .ab-bridge path {
    fill: none;
    stroke: #c5ddd4;
    stroke-width: 1.6;
    stroke-dasharray: 520;
    stroke-dashoffset: 520;
  }

  .ab.in .ab-bridge path {
    animation: abDash 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards;
  }

  .ab-dot {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #146b58;
    box-shadow: 0 0 0 5px rgba(20, 107, 88, 0.12);
    animation: abPulse 2.8s ease-in-out infinite;
  }

  .ab-dot-a { left: 18px; top: 42%; }
  .ab-dot-b { right: 28px; bottom: 22px; }
  .ab-dot-c { left: 22px; top: 46%; }

  .ab-focus {
    position: relative;
    background:
      radial-gradient(180px 120px at 96% 6%, rgba(214, 232, 224, 0.85), transparent 70%),
      radial-gradient(220px 180px at 100% 100%, rgba(206, 228, 220, 0.7), transparent 72%),
      radial-gradient(140px 160px at 0% 70%, rgba(226, 240, 235, 0.9), transparent 70%),
      #f3f8f6;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 42px 46px 48px 72px;
    padding: 34px 30px 26px;
    box-shadow: 0 18px 50px rgba(18, 48, 40, 0.05);
    overflow: hidden;
  }

  .ab-focus-kicker {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }

  .ab-focus h3 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(30px, 3vw, 38px);
    font-weight: 600;
    color: #141c24;
    letter-spacing: -0.02em;
    margin-bottom: 22px;
  }

  .ab-focus-line {
    width: 72px;
    height: 1px;
    background: #c5d4ce;
    transform: scaleX(0);
    transform-origin: left center;
  }

  .ab-specs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 14px;
  }

  .ab-specs > .ab-slot,
  .ab-values > .ab-slot {
    height: 100%;
  }

  .ab-spec {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 100%;
    min-height: 64px;
    padding: 8px 14px 8px 8px;
    background: #ffffff;
    border: 1px solid #eef3f1;
    border-radius: 999px;
    color: #1c2830;
    box-shadow: 0 6px 18px rgba(16, 40, 34, 0.04);
    transition: transform 0.28s ease, box-shadow 0.28s ease;
  }

  .ab-spec:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 26px rgba(16, 40, 34, 0.09);
  }

  .ab-ico {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #e6f3ee;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }

  .ab-ico i {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #115c48;
    color: #ffffff;
    display: grid;
    place-items: center;
    transition: transform 0.3s ease;
  }

  .ab-spec:hover .ab-ico i {
    transform: scale(1.06) rotate(-8deg);
  }

  .ab-ico svg {
    width: 16px;
    height: 16px;
  }

  .ab-spec b {
    flex: 1;
    font-size: 14.5px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .ab-chev {
    width: 16px;
    height: 16px;
    color: #8aa099;
    flex-shrink: 0;
    transition: transform 0.25s ease, color 0.25s ease;
  }

  .ab-spec:hover .ab-chev {
    transform: translateX(3px);
    color: #1a7564;
  }

  .ab-values {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 22px;
  }

  .ab-value {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    height: 100%;
    background: #ffffff;
    border: 1px solid #e7eeeb;
    border-radius: 22px;
    padding: 22px 20px 20px;
    box-shadow: 0 8px 24px rgba(16, 40, 36, 0.035);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .ab-value:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 36px rgba(16, 40, 36, 0.08);
  }

  .ab-vico {
    width: 54px;
    height: 54px;
    min-width: 54px;
    border-radius: 16px;
    background: #f4f8f6;
    border: 1px solid #e5eeea;
    color: #1a7564;
    display: grid;
    place-items: center;
    transition: transform 0.3s ease, background 0.3s ease;
  }

  .ab-value:hover .ab-vico {
    transform: translateY(-2px);
    background: #e8f5f1;
  }

  .ab-vico svg {
    width: 24px;
    height: 24px;
  }

  .ab-num {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1a7564;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    margin-bottom: 6px;
  }

  .ab-num i {
    width: 28px;
    height: 1.5px;
    background: #c5d5cf;
    transform: scaleX(0);
    transform-origin: left center;
  }

  .ab.in .ab-num i {
    animation: abDraw 0.5s ease 0.55s forwards;
  }

  .ab-value h3 {
    font-size: 17px;
    font-weight: 700;
    color: #152028;
    margin-bottom: 6px;
    letter-spacing: -0.02em;
  }

  .ab-value p {
    font-size: 13.5px;
    line-height: 1.55;
    color: #7a7582;
    max-width: 240px;
  }

  .ab-commit {
    position: relative;
    margin-top: 22px;
    display: flex;
    align-items: center;
    gap: 28px;
    padding: 26px 28px 26px 26px;
    border-radius: 32px;
    border: 1px solid #e6efeb;
    background:
      radial-gradient(220px 140px at 0% 110%, rgba(198, 226, 216, 0.7), transparent 70%),
      radial-gradient(260px 160px at 100% 0%, rgba(210, 230, 222, 0.75), transparent 68%),
      #f4f9f7;
    overflow: hidden;
  }

  .ab-flask {
    width: 64px;
    height: 64px;
    min-width: 64px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid #e3eeea;
    color: #1a7564;
    display: grid;
    place-items: center;
    position: relative;
    z-index: 1;
  }

  .ab-flask svg {
    width: 28px;
    height: 28px;
  }

  .ab-commit-copy {
    position: relative;
    z-index: 1;
    flex: 1;
    min-width: 240px;
  }

  .ab-commit-kicker {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }

  .ab-commit-line {
    width: 64px;
    height: 1px;
    background: #c5d4ce;
    transform: scaleX(0);
    transform-origin: left center;
  }

  .ab-commit h3 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(26px, 2.6vw, 34px);
    font-weight: 600;
    color: #141c24;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 8px;
  }

  .ab-commit h3 em {
    font-style: normal;
    color: #1a7564;
  }

  .ab-commit p {
    max-width: 360px;
    color: #6f7d7a;
    font-size: 14px;
    line-height: 1.55;
  }

  .ab-pills {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ab-pill-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ab-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 148px;
    padding: 10px 12px 10px 10px;
    background: #ffffff;
    border: 1px solid #e8efec;
    border-radius: 999px;
    box-shadow: 0 6px 16px rgba(16, 40, 34, 0.04);
    transition: transform 0.28s ease, box-shadow 0.28s ease;
  }

  .ab-pill:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(16, 40, 34, 0.08);
  }

  .ab-pill-ico {
    width: 36px;
    height: 36px;
    min-width: 36px;
    border-radius: 50%;
    background: #eef6f3;
    color: #146b58;
    display: grid;
    place-items: center;
  }

  .ab-pill-ico svg {
    width: 18px;
    height: 18px;
  }

  .ab-pill b {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #1a242c;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .ab-pill svg.ab-chev {
    margin-left: auto;
  }

  .ab-pill:hover .ab-chev {
    transform: translateX(3px);
    color: #1a7564;
  }

  .ab-div {
    width: 1px;
    height: 36px;
    background: #dce6e2;
    flex-shrink: 0;
  }

  @keyframes abRise {
    to { opacity: 1; transform: none; }
  }

  @keyframes abDraw {
    to { transform: scaleX(1); }
  }

  @keyframes abDash {
    to { stroke-dashoffset: 0; }
  }

  @keyframes abDrift {
    0%, 100% { transform: translate3d(0, 0, 0); }
    50% { transform: translate3d(0, -14px, 0); }
  }

  @keyframes abPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.18); }
  }

  @media (prefers-reduced-motion: reduce) {
    .ab-slot,
    .ab-rule,
    .ab-kicker-line,
    .ab-focus-line,
    .ab-commit-line,
    .ab-num i,
    .ab-bridge path {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
      stroke-dashoffset: 0 !important;
    }

    .ab-blob,
    .ab-dot {
      animation: none !important;
    }
  }

  @media (max-width: 980px) {
    .ab-top,
    .ab-values {
      grid-template-columns: 1fr;
    }

    .ab-bridge,
    .ab-dot-a {
      display: none;
    }

    .ab-commit {
      flex-wrap: wrap;
    }

    .ab-pills {
      width: 100%;
      flex-wrap: wrap;
    }
  }

  @media (max-width: 680px) {
    .ab-shell {
      padding: 64px 18px 52px;
    }

    .ab-specs {
      grid-template-columns: 1fr;
    }

    .ab-focus {
      border-radius: 28px;
      padding: 24px 16px 18px;
    }

    .ab-commit {
      padding: 22px 16px;
      border-radius: 24px;
    }

    .ab-pill-wrap,
    .ab-pill {
      width: 100%;
    }

    .ab-pill {
      min-width: 0;
    }

    .ab-div {
      display: none;
    }
  }
`

function Ico({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

function LeafIcon() {
  return (
    <Ico>
      <path d="M5 19c8-1 12-8 14-15-7 1-13 6-14 15z" />
      <path d="M8 15c2-2.4 4.4-4 8-5" />
    </Ico>
  )
}

function HeartIcon() {
  return (
    <Ico>
      <path d="M12 19s-6.2-3.8-6.2-8.2A3.4 3.4 0 0 1 12 8.2a3.4 3.4 0 0 1 6.2 2.6C18.2 15.2 12 19 12 19z" />
    </Ico>
  )
}

function BoneIcon() {
  return (
    <Ico>
      <path d="M7 8.5a2 2 0 1 1 2.2-2.8L16 9.2a2 2 0 1 1 1.6 3.4l-6.8 3.6a2 2 0 1 1-2.4-3.1L7 8.5z" />
    </Ico>
  )
}

function DropIcon() {
  return (
    <Ico>
      <path d="M12 3.5s6 6.2 6 10a6 6 0 0 1-12 0c0-3.8 6-10 6-10z" />
    </Ico>
  )
}

function WaveIcon() {
  return (
    <Ico>
      <path d="M3 9c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2" />
      <path d="M3 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2" />
    </Ico>
  )
}

function BrainIcon() {
  return (
    <Ico>
      <path d="M9 7a3 3 0 0 0-3 3v1a2.5 2.5 0 0 0 0 5 3 3 0 0 0 3 2" />
      <path d="M15 7a3 3 0 0 1 3 3v1a2.5 2.5 0 0 1 0 5 3 3 0 0 1-3 2" />
      <path d="M9 7a3 3 0 0 1 3-2 3 3 0 0 1 3 2M12 5v14" />
    </Ico>
  )
}

function ShieldIcon() {
  return (
    <Ico>
      <path d="M12 3.5l7 2.6v5.4c0 4.2-2.8 7.2-7 8.5-4.2-1.3-7-4.3-7-8.5V6.1l7-2.6z" />
      <path d="M9 12l2 2 4-4" />
    </Ico>
  )
}

function UserIcon() {
  return (
    <Ico>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.2a6.5 6.5 0 0 1 13 0" />
    </Ico>
  )
}

function FlaskIcon() {
  return (
    <Ico>
      <path d="M9 3h6" />
      <path d="M10 3v5.2L6.2 17a3.2 3.2 0 0 0 2.8 4.6h6a3.2 3.2 0 0 0 2.8-4.6L14 8.2V3" />
      <path d="M8.2 14h7.6" />
    </Ico>
  )
}

function AwardIcon() {
  return (
    <Ico>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.8 13.2L8 20l4-2 4 2-.8-6.8" />
    </Ico>
  )
}

function PinIcon() {
  return (
    <Ico>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
      <circle cx="12" cy="11" r="1.8" />
    </Ico>
  )
}

function Chevron() {
  return (
    <svg className="ab-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

const SPEC_ICONS = {
  Nutraceuticals: LeafIcon,
  Cardiovascular: HeartIcon,
  Orthopaedics: BoneIcon,
  'Diabetic Care': DropIcon,
  Dermatology: WaveIcon,
  Neurology: BrainIcon,
}

const VALUE_ICONS = [ShieldIcon, UserIcon, LeafIcon]

const PILLS = [
  { label: 'GMP\nCertified', Icon: ShieldIcon },
  { label: 'ISO\nQuality', Icon: AwardIcon },
  { label: 'Pan India', Icon: PinIcon },
]

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
        <div className="ab-top">
          <div className="ab-copy">
            <div className="ab-kicker-row ab-slot" style={{ '--d': '0.02s' }}>
              <span className="ab-kicker">{content.about.badge}</span>
              <span className="ab-kicker-line" />
            </div>
            <h2 className="ab-h2 ab-slot" style={{ '--d': '0.1s' }}>
              <span>{first}</span>
              {rest ? <em>{rest}</em> : null}
            </h2>
            <div className="ab-rule" />
            <p className="ab-desc ab-slot" style={{ '--d': '0.2s' }}>{content.about.description}</p>
            <div className="ab-slot" style={{ '--d': '0.3s' }}>
              <a className="ab-btn" href="#products">
                Learn More
                <Arrow />
              </a>
            </div>
          </div>

          <div className="ab-stage ab-slot" style={{ '--d': '0.14s' }}>
            <svg className="ab-bridge" viewBox="0 0 90 420" aria-hidden="true">
              <path d="M78 8 C 18 70, 8 150, 52 196 S 86 300, 28 400" />
            </svg>
            <span className="ab-dot ab-dot-a" />
            <aside className="ab-focus">
              <div className="ab-focus-kicker">
                <span className="ab-kicker">Our Focus</span>
                <span className="ab-focus-line" />
              </div>
              <h3>{content.about.focusTitle}</h3>
              <div className="ab-specs">
                {content.about.specialties.map((item, i) => {
                  const Icon = SPEC_ICONS[item] || LeafIcon
                  return (
                    <div className="ab-slot" style={{ '--d': `${0.28 + i * 0.07}s` }} key={item}>
                      <a
                        className="ab-spec"
                        href="#products"
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent('aurentis:filter', { detail: item }))
                        }}
                      >
                        <span className="ab-ico"><i><Icon /></i></span>
                        <b>{item}</b>
                        <Chevron />
                      </a>
                    </div>
                  )
                })}
              </div>
            </aside>
          </div>
        </div>

        <div className="ab-values">
          {content.about.values.map((value, i) => {
            const Icon = VALUE_ICONS[i] || LeafIcon
            const num = String(i + 1).padStart(2, '0')
            return (
              <div className="ab-slot" style={{ '--d': `${0.42 + i * 0.1}s` }} key={value.title}>
                <article className="ab-value">
                  <div className="ab-vico"><Icon /></div>
                  <div>
                    <div className="ab-num">{num}<i /></div>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </div>
                </article>
              </div>
            )
          })}
        </div>

        <div className="ab-commit ab-slot" style={{ '--d': '0.62s' }}>
          <span className="ab-dot ab-dot-c" />
          <span className="ab-dot ab-dot-b" />
          <div className="ab-flask"><FlaskIcon /></div>
          <div className="ab-commit-copy">
            <div className="ab-commit-kicker">
              <span className="ab-kicker">Our Commitment</span>
              <span className="ab-commit-line" />
            </div>
            <h3>
              Pharmaceutical <em>Excellence</em>
            </h3>
            <p>{content.about.cardText}</p>
          </div>
          <div className="ab-pills">
            {PILLS.map((pill, i) => (
              <div className="ab-pill-wrap" key={pill.label}>
                {i > 0 ? <span className="ab-div" /> : null}
                <span className="ab-slot" style={{ '--d': `${0.74 + i * 0.08}s` }}>
                  <span className="ab-pill">
                    <span className="ab-pill-ico"><pill.Icon /></span>
                    <b>
                      {pill.label.split('\n').map((line) => (
                        <span key={line} style={{ display: 'block' }}>{line}</span>
                      ))}
                    </b>
                    <Chevron />
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
