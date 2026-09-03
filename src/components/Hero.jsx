import { useEffect, useRef, useState } from 'react'
import content from '../data/content.json'

const PARTICLES = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 97}%`,
  top: `${(i * 29 + 11) % 93}%`,
  size: 2 + (i % 4),
  delay: (i % 9) * 0.45,
  duration: 7 + (i % 6),
}))

const CSS = `
  .aur-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background:
      radial-gradient(ellipse 55% 50% at 78% 38%, rgba(42, 157, 143, 0.28), transparent 62%),
      radial-gradient(ellipse 35% 40% at 12% 78%, rgba(201, 168, 76, 0.07), transparent 58%),
      linear-gradient(165deg, #061418 0%, #0A2328 42%, #12363C 72%, #061418 100%);
    overflow: hidden;
    color: #ffffff;
    padding: 88px 0 28px;
  }

  .aur-hero-particle {
    position: absolute;
    border-radius: 50%;
    background: rgba(120, 220, 210, 0.7);
    box-shadow: 0 0 8px rgba(77, 184, 172, 0.55);
    pointer-events: none;
    animation: particleDrift ease-in-out infinite;
    z-index: 0;
  }

  .aur-hero-shell {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 64px;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .aur-hero-grid {
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    align-items: center;
    gap: 12px;
    flex: 1;
  }

  .aur-hero-left {
    position: relative;
    z-index: 3;
  }

  .aur-reveal {
    opacity: 0;
    transform: translateY(28px);
    animation: fadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .aur-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px 8px 12px;
    border: 1px solid #C9A84C;
    border-radius: 999px;
    background: rgba(10, 35, 40, 0.45);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #D4AF37;
    margin-bottom: 18px;
    animation-delay: 0.12s;
  }

  .aur-hero-badge svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: #4DB8AC;
    stroke-width: 1.7;
    flex-shrink: 0;
  }

  .aur-hero h1 {
    font-family: var(--font-display);
    font-size: clamp(32px, 4.2vw, 54px);
    font-weight: 600;
    line-height: 1.06;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    margin-bottom: 16px;
    color: #ffffff;
  }

  .aur-hero h1 .ln {
    display: block;
    opacity: 0;
    transform: translateY(24px);
    animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .aur-hero h1 .ln:nth-child(1) { animation-delay: 0.22s; }
  .aur-hero h1 .ln:nth-child(2) { animation-delay: 0.36s; }
  .aur-hero h1 .ln:nth-child(3) { animation-delay: 0.5s; }

  .aur-hero-accent {
    background: linear-gradient(90deg, #5EEAD4, #2A9D8F 55%, #7BE3D4);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: none;
    filter: drop-shadow(0 0 18px rgba(77, 184, 172, 0.45));
  }

  .aur-hero h1 em {
    font-style: italic;
    font-weight: 600;
  }

  .aur-hero-rule {
    display: flex;
    align-items: center;
    gap: 0;
    width: min(280px, 70%);
    margin-bottom: 18px;
    animation-delay: 0.62s;
  }

  .aur-hero-rule span {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, #C9A84C, rgba(201, 168, 76, 0.15));
  }

  .aur-hero-rule span:last-child {
    background: linear-gradient(90deg, rgba(201, 168, 76, 0.15), #C9A84C);
  }

  .aur-hero-rule i {
    width: 7px;
    height: 7px;
    margin: 0 8px;
    background: #E8C97A;
    transform: rotate(45deg);
    box-shadow: 0 0 10px rgba(232, 201, 122, 0.85);
    flex-shrink: 0;
  }

  .aur-hero-copy {
    max-width: 540px;
    font-size: 15px;
    line-height: 1.75;
    color: rgba(247, 249, 249, 0.72);
    margin-bottom: 20px;
    animation-delay: 0.72s;
  }

  .aur-hero-feats {
    display: flex;
    flex-wrap: wrap;
    gap: 22px 28px;
    margin-bottom: 24px;
    animation-delay: 0.84s;
  }

  .aur-hero-feat {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.92);
    white-space: nowrap;
  }

  .aur-hero-feat-ico {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: radial-gradient(circle at 40% 35%, rgba(42, 157, 143, 0.35), rgba(10, 35, 40, 0.85));
    border: 1px solid rgba(77, 184, 172, 0.55);
    box-shadow: 0 0 14px rgba(42, 157, 143, 0.25);
    animation: iconPulse 3.2s ease-in-out infinite;
  }

  .aur-hero-feat:nth-child(2) .aur-hero-feat-ico { animation-delay: 0.4s; }
  .aur-hero-feat:nth-child(3) .aur-hero-feat-ico { animation-delay: 0.8s; }

  .aur-hero-feat-ico svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: #ffffff;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .aur-hero-actions {
    display: flex;
    align-items: center;
    gap: 14px;
    animation-delay: 0.96s;
  }

  .aur-btn-primary,
  .aur-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 26px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
  }

  .aur-btn-primary {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #2A9D8F 0%, #1B4A52 100%);
    color: #ffffff;
    box-shadow: 0 10px 28px rgba(42, 157, 143, 0.42);
  }

  .aur-btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.22) 50%, transparent 80%);
    transform: translateX(-120%);
    animation: btnShimmer 3.6s ease-in-out infinite;
  }

  .aur-btn-primary:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 14px 34px rgba(42, 157, 143, 0.6);
  }

  .aur-btn-ghost {
    border: 1px solid rgba(255, 255, 255, 0.85);
    color: #ffffff;
    background: transparent;
  }

  .aur-btn-ghost:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.06);
  }

  .aur-stage {
    position: relative;
    width: 100%;
    max-width: 520px;
    height: 460px;
    margin: 0 auto;
    animation: stageIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
  }

  .aur-stage-bloom {
    position: absolute;
    top: 38%;
    left: 50%;
    width: 340px;
    height: 340px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(42, 157, 143, 0.42), transparent 68%);
    filter: blur(6px);
    animation: bloomPulse 4s ease-in-out infinite;
  }

  .aur-orbit-track {
    position: absolute;
    left: 50%;
    top: 42%;
    border: 1px solid rgba(77, 184, 172, 0.28);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 18px rgba(42, 157, 143, 0.08);
  }

  .aur-orbit-track.t1 {
    width: 300px;
    height: 300px;
    animation: orbitSpin 22s linear infinite;
  }

  .aur-orbit-track.t2 {
    width: 390px;
    height: 390px;
    border-color: rgba(77, 184, 172, 0.16);
    animation: orbitSpinRev 32s linear infinite;
  }

  .aur-orbit-node {
    position: absolute;
    top: -18px;
    left: 50%;
    width: 36px;
    height: 36px;
    margin-left: -18px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: rgba(8, 28, 32, 0.88);
    border: 1px solid rgba(77, 184, 172, 0.7);
    box-shadow: 0 0 16px rgba(42, 157, 143, 0.45);
    animation: counterSpin 22s linear infinite;
  }

  .aur-orbit-track.t2 .aur-orbit-node {
    animation: counterSpinRev 32s linear infinite;
  }

  .aur-orbit-node.n2 { top: auto; bottom: -18px; }
  .aur-orbit-node.n3 { top: 50%; left: -18px; margin-left: 0; margin-top: -18px; }

  .aur-orbit-node svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: #7BE3D4;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .aur-capsule-wrap {
    position: absolute;
    top: 36px;
    left: 50%;
    z-index: 4;
    transform: translateX(-50%);
    animation: capsuleFloat 4.6s ease-in-out infinite;
  }

  .aur-capsule {
    position: relative;
    width: 124px;
    height: 258px;
    border-radius: 62px;
    overflow: hidden;
    transform: rotate(-16deg);
    box-shadow:
      inset -14px 0 22px rgba(0, 0, 0, 0.28),
      inset 12px 0 18px rgba(255, 255, 255, 0.22),
      0 18px 50px rgba(10, 35, 40, 0.45),
      0 0 56px rgba(42, 157, 143, 0.55);
  }

  .aur-cap-top {
    height: 50%;
    background: linear-gradient(145deg, #7BE3D4 0%, #2A9D8F 32%, #163E44 72%, #0A2A30 100%);
  }

  .aur-cap-bot {
    height: 50%;
    background: linear-gradient(145deg, #F6E7A8 0%, #E8C97A 22%, #C9A84C 58%, #8F7324 100%);
  }

  .aur-cap-seam {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 10px;
    transform: translateY(-50%);
    background: linear-gradient(180deg, rgba(0,0,0,0.22), rgba(255,255,255,0.28), rgba(0,0,0,0.18));
    z-index: 2;
  }

  .aur-cap-gloss {
    position: absolute;
    top: 18px;
    bottom: 18px;
    left: 18px;
    width: 16px;
    border-radius: 16px;
    background: linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.06));
    z-index: 3;
    pointer-events: none;
  }

  .aur-cap-spec {
    position: absolute;
    top: 28px;
    right: 22px;
    width: 10px;
    height: 34px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.18);
    z-index: 3;
  }

  .aur-pedestal {
    position: absolute;
    left: 50%;
    bottom: 18px;
    width: 340px;
    height: 110px;
    transform: translateX(-50%);
    z-index: 1;
  }

  .aur-ped-glow {
    position: absolute;
    left: 50%;
    bottom: 8px;
    width: 280px;
    height: 70px;
    transform: translateX(-50%);
    background: radial-gradient(ellipse, rgba(77, 184, 172, 0.55), transparent 70%);
    filter: blur(8px);
    animation: pedPulse 3.2s ease-in-out infinite;
  }

  .aur-ped-ring {
    position: absolute;
    left: 50%;
    border-radius: 50%;
    transform: translateX(-50%) scaleY(0.26);
    border: 2px solid rgba(94, 234, 212, 0.95);
    box-shadow:
      0 0 24px rgba(77, 184, 172, 0.95),
      inset 0 0 16px rgba(77, 184, 172, 0.35);
    animation: pedPulse 3.2s ease-in-out infinite;
  }

  .aur-ped-ring.r1 { width: 170px; height: 170px; bottom: 28px; animation-delay: 0s; }
  .aur-ped-ring.r2 { width: 230px; height: 230px; bottom: 8px; opacity: 0.75; animation-delay: 0.4s; border-width: 2px; }
  .aur-ped-ring.r3 { width: 300px; height: 300px; bottom: -18px; opacity: 0.4; animation-delay: 0.8s; border-width: 1.5px; }

  .aur-stats {
    position: relative;
    z-index: 4;
    margin-top: 8px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: rgba(8, 28, 34, 0.72);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(77, 184, 172, 0.22);
    border-radius: 40px;
    padding: 22px 8px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .aur-stats.in {
    opacity: 1;
    transform: translateY(0);
  }

  .aur-stat {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 8px 22px;
    position: relative;
    transition: transform 0.25s ease;
  }

  .aur-stat:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 18%;
    height: 64%;
    width: 1px;
    background: rgba(255, 255, 255, 0.1);
  }

  .aur-stat:hover {
    transform: translateY(-2px);
  }

  .aur-stat:hover .aur-stat-ico {
    transform: scale(1.08);
    box-shadow: 0 0 22px rgba(42, 157, 143, 0.55);
  }

  .aur-stat-ico {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    background: radial-gradient(circle at 40% 35%, rgba(42, 157, 143, 0.55), rgba(10, 35, 40, 0.95));
    box-shadow: 0 0 18px rgba(42, 157, 143, 0.35);
    animation: iconPulse 3.4s ease-in-out infinite;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .aur-stat:nth-child(2) .aur-stat-ico { animation-delay: 0.5s; }
  .aur-stat:nth-child(3) .aur-stat-ico { animation-delay: 1s; }
  .aur-stat:nth-child(4) .aur-stat-ico { animation-delay: 1.5s; }

  .aur-stat-ico svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: #ffffff;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .aur-stat-num {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: #ffffff;
    transition: text-shadow 0.25s ease;
  }

  .aur-stat:hover .aur-stat-num {
    text-shadow: 0 0 16px rgba(94, 234, 212, 0.55);
  }

  .aur-stat-lbl {
    display: block;
    margin-top: 3px;
    font-size: 13px;
    color: rgba(160, 196, 196, 0.85);
    font-weight: 400;
  }

  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes stageIn {
    from { opacity: 0; transform: translateY(24px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes capsuleFloat {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-18px); }
  }

  @keyframes orbitSpin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  @keyframes orbitSpinRev {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(-360deg); }
  }

  @keyframes counterSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
  }

  @keyframes counterSpinRev {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes bloomPulse {
    0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
  }

  @keyframes pedPulse {
    0%, 100% { opacity: 0.75; filter: brightness(1); }
    50% { opacity: 1; filter: brightness(1.35); }
  }

  @keyframes iconPulse {
    0%, 100% { box-shadow: 0 0 12px rgba(42, 157, 143, 0.28); }
    50% { box-shadow: 0 0 20px rgba(42, 157, 143, 0.55); }
  }

  @keyframes particleDrift {
    0%, 100% { transform: translateY(0); opacity: 0.35; }
    50% { transform: translateY(-14px); opacity: 0.9; }
  }

  @keyframes btnShimmer {
    0%, 55% { transform: translateX(-120%); }
    100% { transform: translateX(120%); }
  }

  @media (prefers-reduced-motion: reduce) {
    .aur-reveal,
    .aur-hero h1 .ln,
    .aur-hero-badge,
    .aur-stage,
    .aur-stats,
    .aur-capsule-wrap,
    .aur-orbit-track,
    .aur-orbit-node,
    .aur-hero-particle,
    .aur-btn-primary::after,
    .aur-stat-ico,
    .aur-hero-feat-ico,
    .aur-ped-ring,
    .aur-stage-bloom,
    .aur-ped-glow {
      animation: none !important;
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }

  @media (max-width: 980px) {
    .aur-hero {
      padding: 92px 0 36px;
    }

    .aur-hero-shell {
      padding: 0 24px;
    }

    .aur-hero-grid {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .aur-hero-badge,
    .aur-hero-rule {
      margin-left: auto;
      margin-right: auto;
    }

    .aur-hero-copy {
      margin-left: auto;
      margin-right: auto;
    }

    .aur-hero-feats,
    .aur-hero-actions {
      justify-content: center;
    }

    .aur-stage {
      height: 400px;
      max-width: 420px;
      margin-top: 8px;
    }

    .aur-stats {
      grid-template-columns: 1fr 1fr;
      border-radius: 28px;
      padding: 12px 6px;
    }

    .aur-stat:nth-child(2)::after {
      display: none;
    }

    .aur-stat:nth-child(-n+2) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
  }

  @media (max-width: 560px) {
    .aur-hero-feats {
      flex-direction: column;
      align-items: center;
      gap: 14px;
    }

    .aur-hero-actions {
      flex-direction: column;
    }

    .aur-stats {
      grid-template-columns: 1fr;
      border-radius: 24px;
    }

    .aur-stat:not(:last-child)::after {
      display: none;
    }

    .aur-stat:nth-child(-n+2) {
      border-bottom: 0;
    }

    .aur-stat:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .aur-stage {
      height: 380px;
      transform: scale(0.86);
      transform-origin: top center;
    }
  }
`

function ShieldBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l8 3v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

function PillIcon() {
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

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />
    </svg>
  )
}

function HeartPulseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z" />
      <path d="M8 12h2l1-2 2 4 1-2h2" />
    </svg>
  )
}

function MortarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 14c0 3.3 3.6 6 8 6s8-2.7 8-6H4z" />
      <path d="M3 11h18" />
      <path d="M16 4l4 6" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <circle cx="16" cy="9" r="2.4" />
      <path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
      <path d="M13.2 14.2c1.8-.4 3.7.6 4.8 2.8" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 21V7l8-4 8 4v14H4z" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 10h.01M12 10h.01M15 10h.01M9 14h.01M15 14h.01" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  )
}

function SmileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 10h.01M16 10h.01M8.5 15c1.2 1.4 2.6 2 3.5 2s2.3-.6 3.5-2" />
    </svg>
  )
}

const FEAT_ICONS = { pill: PillIcon, shield: ShieldIcon, heart: HeartIcon }
const STAT_ICONS = [UsersIcon, BuildingIcon, PinIcon, SmileIcon]

function useCountUp(target, active, duration = 1600) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!active) return
    let frame
    let start
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - (1 - p) ** 3
      setN(Math.round(target * eased))
      if (p < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [active, target, duration])

  return n
}

function StatItem({ stat, icon: Icon, active, delay }) {
  const n = useCountUp(stat.value, active, 1500 + delay)
  return (
    <div className="aur-stat">
      <div className="aur-stat-ico">
        <Icon />
      </div>
      <div>
        <div className="aur-stat-num">
          {n}
          {stat.suffix}
        </div>
        <span className="aur-stat-lbl">{stat.label}</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const statsRef = useRef(null)
  const [statsIn, setStatsIn] = useState(false)
  const [line1, line2, line3] = content.hero.headline
  const trustedSplit = line3.split('TRUSTED')

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const fallback = setTimeout(() => setStatsIn(true), 800)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsIn(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => {
      clearTimeout(fallback)
      io.disconnect()
    }
  }, [])

  return (
    <section className="aur-hero" id="home">
      <style>{CSS}</style>

      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="aur-hero-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <div className="aur-hero-shell">
        <div className="aur-hero-grid">
          <div className="aur-hero-left">
            <div className="aur-hero-badge aur-reveal">
              <ShieldBadgeIcon />
              {content.hero.tagline}
            </div>

            <h1>
              <span className="ln">{line1}</span>
              <span className="ln aur-hero-accent">{line2}</span>
              <span className="ln">
                {trustedSplit[0]}
                <em>TRUSTED</em>
              </span>
            </h1>

            <div className="aur-hero-rule aur-reveal">
              <span />
              <i />
              <span />
            </div>

            <p className="aur-hero-copy aur-reveal">{content.hero.subheadline}</p>

            <div className="aur-hero-feats aur-reveal">
              {content.hero.highlights.map((item) => {
                const Icon = FEAT_ICONS[item.icon] || PillIcon
                return (
                  <div className="aur-hero-feat" key={item.label}>
                    <span className="aur-hero-feat-ico">
                      <Icon />
                    </span>
                    {item.label}
                  </div>
                )
              })}
            </div>

            <div className="aur-hero-actions aur-reveal">
              <a href="#products" className="aur-btn-primary">
                {content.hero.cta_primary}
                <span aria-hidden="true">→</span>
              </a>
              <a href="#about" className="aur-btn-ghost">
                {content.hero.cta_secondary}
              </a>
            </div>
          </div>

          <div className="aur-stage" aria-hidden="true">
            <div className="aur-stage-bloom" />

            <div className="aur-orbit-track t2">
              <span className="aur-orbit-node n3">
                <MortarIcon />
              </span>
            </div>
            <div className="aur-orbit-track t1">
              <span className="aur-orbit-node">
                <CrossIcon />
              </span>
              <span className="aur-orbit-node n2">
                <HeartPulseIcon />
              </span>
            </div>

            <div className="aur-capsule-wrap">
              <div className="aur-capsule">
                <div className="aur-cap-top" />
                <div className="aur-cap-bot" />
                <div className="aur-cap-seam" />
                <div className="aur-cap-gloss" />
                <div className="aur-cap-spec" />
              </div>
            </div>

            <div className="aur-pedestal">
              <div className="aur-ped-glow" />
              <div className="aur-ped-ring r1" />
              <div className="aur-ped-ring r2" />
              <div className="aur-ped-ring r3" />
            </div>
          </div>
        </div>

        <div className={`aur-stats${statsIn ? ' in' : ''}`} ref={statsRef}>
          {content.hero.stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              stat={stat}
              icon={STAT_ICONS[i] || UsersIcon}
              active={statsIn}
              delay={i * 180}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
