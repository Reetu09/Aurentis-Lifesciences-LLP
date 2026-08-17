import { useEffect, useState } from 'react'
import content from '../data/content.json'

const CSS = `
  .aur-hero {
    position: relative;
    height: 100vh;
    min-height: 720px;
    display: flex;
    flex-direction: column;
    background:
      radial-gradient(ellipse 70% 55% at 78% 42%, rgba(42, 157, 143, 0.22), transparent 58%),
      radial-gradient(ellipse 40% 40% at 18% 80%, rgba(201, 168, 76, 0.08), transparent 55%),
      linear-gradient(165deg, #0A2328 0%, #1B4A52 58%, #0A2328 100%);
    overflow: hidden;
    color: #ffffff;
  }

  .aur-hero-inner {
    flex: 1;
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    align-items: center;
    gap: 24px;
    padding: 100px 64px 12px;
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    min-height: 0;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.85s ease, transform 0.85s ease;
  }

  .aur-hero-inner.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .aur-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    border: 1px solid var(--gold);
    border-radius: 999px;
    background: rgba(10, 35, 40, 0.35);
    font-size: 12px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--gold-light);
    margin-bottom: 22px;
  }

  .aur-pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--light-teal);
    box-shadow: 0 0 0 0 rgba(77, 184, 172, 0.7);
    animation: aurPulse 1.8s ease-out infinite;
  }

  .aur-hero h1 {
    font-family: var(--font-display);
    font-size: clamp(32px, 4.2vw, 50px);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    margin-bottom: 18px;
    color: #ffffff;
  }

  .aur-hero-accent {
    background: linear-gradient(90deg, var(--mid-teal), var(--light-teal));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .aur-hero-copy {
    max-width: 520px;
    font-size: 15px;
    line-height: 1.75;
    color: rgba(247, 249, 249, 0.72);
    margin-bottom: 22px;
  }

  .aur-hero-tiles {
    display: flex;
    gap: 12px;
    margin-bottom: 26px;
  }

  .aur-hero-tile {
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    border-radius: 14px;
    background: linear-gradient(160deg, var(--mid-teal), var(--dark-teal));
    box-shadow: 0 8px 20px rgba(27, 74, 82, 0.35);
  }

  .aur-hero-tile svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: #ffffff;
    stroke-width: 1.7;
  }

  .aur-hero-actions {
    display: flex;
    align-items: center;
    gap: 0;
  }

  .aur-btn-primary,
  .aur-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 26px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .aur-btn-primary {
    background: linear-gradient(135deg, var(--mid-teal), var(--dark-teal));
    color: #ffffff;
    box-shadow: 0 10px 28px rgba(42, 157, 143, 0.45);
  }

  .aur-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 32px rgba(42, 157, 143, 0.6);
  }

  .aur-btn-line {
    width: 28px;
    height: 1px;
    background: rgba(255, 255, 255, 0.45);
  }

  .aur-btn-ghost {
    border: 1px solid #ffffff;
    color: #ffffff;
    background: transparent;
  }

  .aur-btn-ghost:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.06);
  }

  .aur-stage {
    position: relative;
    width: 460px;
    height: 480px;
    margin: 0 auto;
  }

  .aur-stage-glow {
    position: absolute;
    top: 50%;
    left: 52%;
    width: 280px;
    height: 280px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(42, 157, 143, 0.35), transparent 68%);
    filter: blur(8px);
    z-index: 0;
  }

  .aur-orbit {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--light-teal);
    box-shadow: 0 0 14px rgba(77, 184, 172, 0.95);
    animation: aurDotPulse 2.4s ease-in-out infinite;
    z-index: 4;
  }

  .aur-orbit.o1 { top: 48px; left: 90px; animation-delay: 0s; }
  .aur-orbit.o2 { top: 88px; right: 48px; animation-delay: 0.4s; }
  .aur-orbit.o3 { bottom: 90px; left: 52px; animation-delay: 0.9s; }
  .aur-orbit.o4 { bottom: 48px; right: 120px; animation-delay: 1.3s; }
  .aur-orbit.o5 { top: 210px; left: 18px; animation-delay: 0.6s; }

  .aur-capsule {
    position: absolute;
    top: 70px;
    right: 70px;
    width: 110px;
    height: 230px;
    border-radius: 55px;
    overflow: hidden;
    transform: rotate(-15deg);
    z-index: 3;
    box-shadow: 0 0 50px rgba(42, 157, 143, 0.55), 0 18px 40px rgba(10, 35, 40, 0.4);
    animation: capsuleFloat 4s ease-in-out infinite;
  }

  .aur-capsule-top {
    height: 50%;
    background: linear-gradient(180deg, #1B4A52, #2A9D8F);
    position: relative;
  }

  .aur-capsule-bottom {
    height: 50%;
    background: linear-gradient(180deg, #C9A84C, #E8C97A);
  }

  .aur-capsule-shine {
    position: absolute;
    top: 16px;
    bottom: 16px;
    left: 14px;
    width: 10px;
    border-radius: 10px;
    background: linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.08));
    z-index: 2;
  }

  .aur-bubble {
    position: absolute;
    border-radius: 50%;
    background: rgba(232, 245, 243, 0.55);
    animation: aurBubble 3.2s ease-in-out infinite;
  }

  .aur-bubble.b1 { width: 16px; height: 16px; top: 22px; left: 36px; animation-delay: 0s; }
  .aur-bubble.b2 { width: 10px; height: 10px; top: 28px; left: 68px; animation-delay: 0.3s; }
  .aur-bubble.b3 { width: 13px; height: 13px; top: 52px; left: 26px; animation-delay: 0.6s; }
  .aur-bubble.b4 { width: 8px; height: 8px; top: 60px; left: 62px; animation-delay: 0.9s; }
  .aur-bubble.b5 { width: 14px; height: 14px; top: 80px; left: 42px; animation-delay: 1.1s; }
  .aur-bubble.b6 { width: 7px; height: 7px; top: 38px; left: 20px; animation-delay: 1.4s; }
  .aur-bubble.b7 { width: 9px; height: 9px; top: 88px; left: 70px; animation-delay: 0.5s; }

  .aur-syringe {
    position: absolute;
    top: 130px;
    left: 36px;
    width: 26px;
    height: 200px;
    transform: rotate(-30deg);
    z-index: 2;
    animation: syringeFloat 5s ease-in-out infinite;
    animation-delay: 0.7s;
    filter: drop-shadow(0 0 18px rgba(42, 157, 143, 0.5));
  }

  .aur-syringe-handle {
    width: 26px;
    height: 18px;
    margin: 0 auto;
    border-radius: 4px;
    background: linear-gradient(180deg, var(--light-teal), var(--dark-teal));
  }

  .aur-syringe-body {
    width: 14px;
    height: 150px;
    margin: 0 auto;
    border-radius: 7px;
    background: linear-gradient(180deg, var(--light-teal), var(--mid-teal) 40%, var(--dark-teal));
    position: relative;
  }

  .aur-syringe-body::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 3px;
    width: 4px;
    height: 80px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.35);
  }

  .aur-syringe-needle {
    width: 0;
    height: 0;
    margin: 0 auto;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 22px solid var(--gray-600);
  }

  .aur-vial {
    position: absolute;
    right: 28px;
    bottom: 36px;
    width: 48px;
    height: 84px;
    z-index: 2;
    animation: vialFloat 6s ease-in-out infinite;
    animation-delay: 1.2s;
    filter: drop-shadow(0 0 16px rgba(42, 157, 143, 0.45));
  }

  .aur-vial-cap {
    width: 48px;
    height: 14px;
    border-radius: 8px 8px 2px 2px;
    background: var(--dark-teal);
  }

  .aur-vial-body {
    height: 70px;
    border-radius: 0 0 6px 6px;
    background: rgba(77, 184, 172, 0.22);
    border: 1px solid rgba(77, 184, 172, 0.45);
    overflow: hidden;
    position: relative;
  }

  .aur-vial-liquid {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60%;
    background: linear-gradient(180deg, var(--mid-teal), var(--dark-teal));
  }

  .aur-ampoule {
    position: absolute;
    top: 22px;
    right: 168px;
    width: 16px;
    height: 110px;
    transform: rotate(-10deg);
    z-index: 1;
    animation: ampouleFloat 3.5s ease-in-out infinite;
    animation-delay: 1.8s;
    filter: drop-shadow(0 0 14px rgba(77, 184, 172, 0.45));
  }

  .aur-ampoule-head {
    width: 10px;
    height: 10px;
    margin: 0 auto;
    border-radius: 50%;
    background: var(--light-teal);
  }

  .aur-ampoule-neck {
    width: 5px;
    height: 12px;
    margin: 0 auto;
    background: var(--light-teal);
  }

  .aur-ampoule-body {
    width: 16px;
    height: 88px;
    border-radius: 0 0 10px 10px;
    background: linear-gradient(180deg, var(--light-teal), var(--mid-teal));
  }

  .aur-gate {
    position: fixed;
    inset: 0;
    z-index: 9000;
    pointer-events: none;
  }

  .aur-gate.done {
    display: none;
  }

  .aur-gate-panel {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100vh;
    background: linear-gradient(160deg, #0A2328, #1B4A52 55%, #2A9D8F);
    transition: transform 0.95s cubic-bezier(0.76, 0, 0.24, 1);
  }

  .aur-gate-left { left: 0; }
  .aur-gate-right { right: 0; }

  .aur-gate.open .aur-gate-left { transform: translateX(-100%); }
  .aur-gate.open .aur-gate-right { transform: translateX(100%); }

  .aur-gate-badge {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    padding: 12px 28px;
    border-radius: 999px;
    background: linear-gradient(135deg, #1B4A52, #2A9D8F);
    border: 1px solid var(--light-teal);
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    white-space: nowrap;
    box-shadow: 0 0 30px rgba(42, 157, 143, 0.55);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .aur-gate.open .aur-gate-badge {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }

  @keyframes capsuleFloat {
    0%, 100% { transform: rotate(-15deg) translateY(0); }
    50% { transform: rotate(-15deg) translateY(-20px); }
  }

  @keyframes syringeFloat {
    0%, 100% { transform: rotate(-30deg) translateY(0); }
    50% { transform: rotate(-30deg) translateY(-14px); }
  }

  @keyframes vialFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-16px); }
  }

  @keyframes ampouleFloat {
    0%, 100% { transform: rotate(-10deg) translateY(0); }
    50% { transform: rotate(-10deg) translateY(-12px); }
  }

  @keyframes aurBubble {
    0%, 100% { transform: translateY(0); opacity: 0.7; }
    50% { transform: translateY(-6px); opacity: 1; }
  }

  @keyframes aurPulse {
    0% { box-shadow: 0 0 0 0 rgba(77, 184, 172, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(77, 184, 172, 0); }
    100% { box-shadow: 0 0 0 0 rgba(77, 184, 172, 0); }
  }

  @keyframes aurDotPulse {
    0%, 100% { opacity: 0.45; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.35); }
  }

  @media (max-width: 980px) {
    .aur-hero {
      height: auto;
      min-height: 100vh;
    }

    .aur-hero-inner {
      grid-template-columns: 1fr;
      padding: 110px 24px 20px;
      text-align: center;
    }

    .aur-hero-copy {
      margin-left: auto;
      margin-right: auto;
    }

    .aur-hero-tiles,
    .aur-hero-actions {
      justify-content: center;
    }
  }

  @media (max-width: 520px) {
    .aur-stage {
      width: 300px;
      height: 360px;
      transform: scale(0.82);
      transform-origin: top center;
    }

    .aur-gate-badge {
      font-size: 11px;
      padding: 10px 16px;
    }
  }
`

function MedicineIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="8" y="3" width="8" height="18" rx="4" />
      <path d="M8 12h8" />
    </svg>
  )
}

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

const TILE_ICONS = [MedicineIcon, ShieldIcon, HeartIcon]

export default function Hero() {
  const [gateOpen, setGateOpen] = useState(false)
  const [gateDone, setGateDone] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    document.getElementById('aurentis-hero-styles')?.remove()
    const openTimer = setTimeout(() => setGateOpen(true), 400)
    const showTimer = setTimeout(() => setVisible(true), 1300)
    const doneTimer = setTimeout(() => setGateDone(true), 1600)
    return () => {
      clearTimeout(openTimer)
      clearTimeout(showTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  const [line1, line2, line3] = content.hero.headline

  return (
    <section className="aur-hero" id="home">
      <style>{CSS}</style>
      <div className={`aur-gate${gateOpen ? ' open' : ''}${gateDone ? ' done' : ''}`}>
        <div className="aur-gate-panel aur-gate-left" />
        <div className="aur-gate-panel aur-gate-right" />
        <div className="aur-gate-badge">{content.brand.name}</div>
      </div>

      <div className={`aur-hero-inner${visible ? ' visible' : ''}`}>
        <div>
          <div className="aur-hero-badge">
            <span className="aur-pulse-dot" />
            {content.hero.tagline}
          </div>
          <h1>
            {line1}
            <br />
            <span className="aur-hero-accent">{line2}</span>
            <br />
            {line3}
          </h1>
          <p className="aur-hero-copy">{content.hero.subheadline}</p>
          <div className="aur-hero-tiles">
            {content.hero.highlights.map((label, i) => {
              const Icon = TILE_ICONS[i]
              return (
                <div className="aur-hero-tile" key={label} title={label}>
                  {Icon ? <Icon /> : null}
                </div>
              )
            })}
          </div>
          <div className="aur-hero-actions">
            <a href="#products" className="aur-btn-primary">
              {content.hero.cta_primary}
              <span aria-hidden="true">→</span>
            </a>
            <span className="aur-btn-line" />
            <a href="#about" className="aur-btn-ghost">
              {content.hero.cta_secondary}
            </a>
          </div>
        </div>

        <div className="aur-stage" aria-hidden="true">
          <div className="aur-stage-glow" />
          <span className="aur-orbit o1" />
          <span className="aur-orbit o2" />
          <span className="aur-orbit o3" />
          <span className="aur-orbit o4" />
          <span className="aur-orbit o5" />

          <div className="aur-ampoule">
            <div className="aur-ampoule-head" />
            <div className="aur-ampoule-neck" />
            <div className="aur-ampoule-body" />
          </div>

          <div className="aur-syringe">
            <div className="aur-syringe-handle" />
            <div className="aur-syringe-body" />
            <div className="aur-syringe-needle" />
          </div>

          <div className="aur-capsule">
            <div className="aur-capsule-top">
              <span className="aur-bubble b1" />
              <span className="aur-bubble b2" />
              <span className="aur-bubble b3" />
              <span className="aur-bubble b4" />
              <span className="aur-bubble b5" />
              <span className="aur-bubble b6" />
              <span className="aur-bubble b7" />
            </div>
            <div className="aur-capsule-bottom" />
            <div className="aur-capsule-shine" />
          </div>

          <div className="aur-vial">
            <div className="aur-vial-cap" />
            <div className="aur-vial-body">
              <div className="aur-vial-liquid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
