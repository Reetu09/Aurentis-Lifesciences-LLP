import { useEffect, useRef, useState } from 'react'
import content from '../data/content.json'

const CSS = `
  .pr {
    background: #ffffff;
    color: #1C2B27;
    padding: 78px 0 0;
    position: relative;
    overflow: hidden;
    scroll-margin-top: 92px;
  }

  .pr-shell {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 28px;
  }

  .pr-head {
    text-align: center;
    max-width: 680px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .pr.in .pr-head {
    opacity: 1;
    transform: none;
  }

  .pr-range {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
    color: #1A3C34;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  .pr-range i {
    width: 46px;
    height: 1px;
    background: #1A3C34;
    position: relative;
    display: block;
  }

  .pr-range i::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #1A3C34;
    translate: 0 -50%;
  }

  .pr-range i:first-child::before { left: 0; }
  .pr-range i:last-child::before { right: 0; }

  .pr h2 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(32px, 4vw, 46px);
    letter-spacing: -0.025em;
    color: #17241F;
    line-height: 1.15;
  }

  .pr h2 em {
    font-style: normal;
    color: #1E7A48;
  }

  .pr-sub {
    margin: 12px auto 0;
    max-width: 620px;
    color: #8A9692;
    font-size: 14.5px;
    line-height: 1.7;
  }

  .pr-filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px 16px;
    margin: 28px 0 10px;
  }

  .pr-filter {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 14px;
    border-radius: 999px;
    color: #1A3C34;
    font-size: 14px;
    font-weight: 600;
    opacity: 0;
    transform: translateY(10px);
    transition: background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, translate 0.25s ease;
  }

  .pr.in .pr-filter {
    animation: prUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .pr-filter svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .pr-filter svg.solid {
    fill: currentColor;
    stroke: none;
  }

  .pr-filter:hover {
    background: #F3F8F6;
    translate: 0 -1px;
  }

  .pr-filter.active {
    background: #1A3C34;
    color: #ffffff;
    box-shadow: 0 8px 18px rgba(26, 60, 52, 0.16);
  }

  .pr-filter.active:hover {
    background: #214940;
    translate: 0 -1px;
  }

  .pr-stage {
    display: grid;
    grid-template-columns: minmax(0, 1.22fr) minmax(300px, 0.86fr);
    gap: 8px 18px;
    align-items: center;
    margin-top: 8px;
  }

  .pr-feature {
    position: relative;
    display: grid;
    grid-template-columns: minmax(220px, 0.86fr) minmax(250px, 1.14fr);
    align-items: center;
    min-height: 540px;
  }

  .pr-orb-wrap {
    position: absolute;
    width: 500px;
    height: 500px;
    right: -8px;
    top: 50%;
    translate: 0 -50%;
    z-index: 0;
    opacity: 0;
    pointer-events: none;
  }

  .pr.in .pr-orb-wrap {
    animation: prOrbIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .pr-orb {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background:
      radial-gradient(circle at 48% 46%, #ffffff 0%, #f4faf7 36%, #e5f3ec 70%, #d9ebe3 100%);
    animation: prBreath 7.5s ease-in-out infinite;
  }

  .pr-copy {
    position: relative;
    z-index: 2;
    padding: 28px 8px 28px 6px;
    max-width: 340px;
  }

  .pr.in .pr-copy {
    animation: prUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .pr-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }

  .pr-kicker-cat {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .pr-badge-pill {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 5px 9px;
    border-radius: 999px;
    line-height: 1;
  }

  .pr-title {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(36px, 3.5vw, 52px);
    line-height: 1.02;
    letter-spacing: -0.03em;
    color: #16241F;
    margin: 0 0 14px;
  }

  .pr-title.is-long {
    font-size: clamp(30px, 2.7vw, 40px);
    line-height: 1.08;
  }

  .pr-lead {
    margin: 0;
    max-width: 300px;
    color: #7E8C88;
    font-size: 14.5px;
    line-height: 1.65;
  }

  .pr-perks {
    display: flex;
    gap: 18px;
    margin: 22px 0 26px;
  }

  .pr-perk {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    min-width: 64px;
    color: #667570;
    font-size: 11px;
    font-weight: 500;
    text-align: center;
  }

  .pr-perk i {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 1px solid #D5E2DC;
    background: rgba(255, 255, 255, 0.72);
    display: grid;
    place-items: center;
    color: #1A3C34;
  }

  .pr-perk svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .pr-enquire {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 22px;
    border-radius: 999px;
    background: #1A3C34;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0 8px 18px rgba(26, 60, 52, 0.12);
    transition: background 0.25s ease, translate 0.25s ease, box-shadow 0.25s ease;
  }

  .pr-enquire svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: translate 0.25s ease;
  }

  .pr-enquire:hover {
    background: #245248;
    translate: 0 -2px;
    box-shadow: 0 12px 22px rgba(26, 60, 52, 0.18);
  }

  .pr-enquire:hover svg {
    translate: 4px 0;
  }

  .pr-scene {
    position: relative;
    height: 540px;
    z-index: 1;
    pointer-events: none;
    opacity: 0;
  }

  .pr.in .pr-scene {
    animation: prUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.08s forwards;
  }

  .pr-arcs {
    position: absolute;
    width: 210px;
    height: 420px;
    left: -46px;
    top: 36px;
    z-index: 1;
  }

  .pr-arcs {
    opacity: 0;
  }

  .pr.in .pr-arcs {
    animation: prFade 0.9s ease 0.25s forwards;
  }

  .pr-leaf {
    position: absolute;
    z-index: 5;
  }

  .pr-leaf svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .pr-leaf-l {
    width: 248px;
    left: -28px;
    bottom: 18px;
    transform-origin: 70% 100%;
    animation: prSwayL 6s ease-in-out infinite;
  }

  .pr-leaf-r {
    width: 156px;
    right: -20px;
    bottom: 36px;
    z-index: 2;
    transform-origin: 30% 100%;
    animation: prSwayR 7s ease-in-out infinite;
  }

  .pr-stone-wrap {
    position: absolute;
    left: 50%;
    bottom: 34px;
    width: 236px;
    translate: -50% 0;
    z-index: 3;
  }

  .pr-stone-wrap svg {
    display: block;
    width: 100%;
    height: auto;
    position: relative;
    z-index: 1;
  }

  .pr-shadow {
    position: absolute;
    left: 50%;
    bottom: 10px;
    width: 132px;
    height: 18px;
    translate: -50% 0;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(22, 48, 40, 0.28), transparent 70%);
    animation: prShadow 4.8s ease-in-out infinite;
    z-index: 0;
  }

  .pr-bottle-slot {
    position: absolute;
    left: 50%;
    bottom: 78px;
    width: 176px;
    translate: -50% 0;
    z-index: 4;
  }

  .pr.in .pr-bottle-slot {
    animation: prBottleIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .pr-bottle-float {
    animation: prFloat 4.8s ease-in-out infinite;
  }

  .pr-bottle-float svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .pr-stamp {
    position: absolute;
    width: 98px;
    height: 98px;
    top: 42px;
    right: 10px;
    z-index: 6;
  }

  .pr-stamp-spin {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    animation: prSpin 28s linear infinite;
  }

  .pr-stamp-core {
    position: absolute;
    inset: 27px;
    border-radius: 50%;
    background: #ffffff;
    display: grid;
    place-items: center;
    color: #1E6B4A;
    box-shadow: 0 8px 16px rgba(27, 70, 55, 0.08);
  }

  .pr-stamp-core svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .pr-speck {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.85);
    animation: prSpeck 5.5s ease-in-out infinite;
  }

  .pr-list {
    display: flex;
    flex-direction: column;
    padding: 2px 0 2px 2px;
  }

  .pr-row {
    width: 100%;
    display: grid;
    grid-template-columns: 34px 78px minmax(0, 1fr) 34px;
    gap: 0 16px;
    align-items: center;
    text-align: left;
    padding: 8px 4px 8px 0;
    border-radius: 20px;
    color: inherit;
    opacity: 0;
    background: transparent;
    transition: background 0.25s ease;
  }

  .pr.in .pr-row {
    animation: prRow 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .pr-row:hover {
    background: #F7FBFA;
  }

  .pr-rail {
    position: relative;
    align-self: stretch;
    min-height: 78px;
  }

  .pr-rail::before {
    content: '';
    position: absolute;
    left: 50%;
    top: -18px;
    bottom: -18px;
    width: 1px;
    background: #D5E6E2;
    transform: translateX(-50%);
  }

  .pr-row:first-child .pr-rail::before {
    top: calc(50% - 22px);
  }

  .pr-row:last-child .pr-rail::before {
    bottom: calc(50% - 5px);
  }

  .pr-num {
    position: absolute;
    top: calc(50% - 28px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    padding: 0 3px;
    background: #ffffff;
    font-size: 12.5px;
    font-weight: 600;
    line-height: 1;
    color: #5A8086;
    letter-spacing: 0.03em;
    font-variant-numeric: tabular-nums;
    transition: color 0.25s ease, background 0.25s ease;
  }

  .pr-row:hover .pr-num {
    color: #2C6468;
    background: #F7FBFA;
  }

  .pr-rail-dot {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #0F6866;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 3px #ffffff;
    transition: box-shadow 0.25s ease;
  }

  .pr-row:hover .pr-rail-dot {
    box-shadow: 0 0 0 3px #F7FBFA;
  }

  .pr-thumb {
    width: 78px;
    height: 78px;
    border-radius: 50%;
    display: block;
    overflow: hidden;
    background: transparent;
  }

  .pr-thumb svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .pr-thumb .btl {
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .pr-row:hover .pr-thumb .btl {
    transform: translateY(-2px);
  }

  .pr-row-copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .pr-row-cat {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    line-height: 1.2;
  }

  .pr-row-name {
    font-size: 16.5px;
    font-weight: 700;
    color: #162428;
    letter-spacing: -0.018em;
    line-height: 1.2;
  }

  .pr-row-desc {
    margin-top: 3px;
    color: #8B949E;
    font-size: 13px;
    line-height: 1.45;
  }

  .pr-go {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    display: grid;
    place-items: center;
    color: #ffffff;
    background: #0E4C4E;
    justify-self: end;
    transition: background 0.25s ease, translate 0.25s ease;
  }

  .pr-go svg {
    width: 13px;
    height: 13px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .pr-row:hover .pr-go {
    background: #14686A;
    translate: 3px 0;
  }

  .pr-band {
    position: relative;
    margin-top: 34px;
    min-height: 248px;
    padding: 18px 0 28px;
  }

  .pr-band-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  .pr-flourish {
    position: absolute;
    z-index: 1;
    pointer-events: none;
    overflow: visible;
  }

  .pr-flourish-tl {
    width: min(280px, 28vw);
    height: 130px;
    top: -8px;
    left: -10px;
  }

  .pr-flourish-tr {
    width: min(320px, 32vw);
    height: 150px;
    top: -22px;
    right: -8px;
  }

  .pr-trust {
    position: relative;
    z-index: 2;
    max-width: 1140px;
    margin: 0 auto;
    padding: 20px 28px 18px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
  }

  .pr-trust-wave {
    position: absolute;
    left: 28px;
    right: 28px;
    top: 92px;
    height: 92px;
    z-index: 1;
    pointer-events: none;
    overflow: visible;
  }

  .pr-trust-wave path {
    fill: none;
    stroke: #7EAEA3;
    stroke-width: 2.15;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
    pathLength: 1;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
  }

  .pr.in .pr-trust-wave path {
    animation: prDraw 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.12s forwards;
  }

  .pr-dot {
    display: block;
    position: absolute;
    top: 93px;
    width: 9px;
    height: 9px;
    margin-left: -4.5px;
    border-radius: 50%;
    background: #12786E;
    z-index: 4;
    opacity: 0;
    box-shadow: 0 0 0 3px #E7F4F0;
  }

  .pr-dot.a { left: calc(28px + (100% - 56px) * 0.25); }
  .pr-dot.b { left: calc(28px + (100% - 56px) * 0.75); }

  .pr.in .pr-dot.a { animation: prPop 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.72s forwards; }
  .pr.in .pr-dot.b { animation: prPop 0.45s cubic-bezier(0.22, 1, 0.36, 1) 1.05s forwards; }

  .pr-trust-item {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6px 10px 0;
    opacity: 0;
  }

  .pr.in .pr-trust-item {
    animation: prUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .pr-trust-ico {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 1.5px solid #8FCFB6;
    background: #F7FCFA;
    display: grid;
    place-items: center;
    color: #1E6B4A;
    margin-bottom: 12px;
  }

  .pr-trust-ico svg {
    width: 24px;
    height: 24px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .pr-trust-item strong {
    display: block;
    font-size: 15px;
    font-weight: 700;
    color: #1A2C28;
    margin-bottom: 4px;
  }

  .pr-trust-item span {
    display: block;
    max-width: 168px;
    font-size: 12.5px;
    line-height: 1.45;
    color: #8A9692;
  }

  .pr-filter:focus-visible,
  .pr-row:focus-visible,
  .pr-enquire:focus-visible {
    outline: 2px solid #1E7A48;
    outline-offset: 3px;
  }

  @keyframes prUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes prRow {
    from { opacity: 0; transform: translateX(14px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes prBottleIn {
    from { opacity: 0; transform: translateY(18px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes prOrbIn {
    from { opacity: 0; scale: 0.94; }
    to { opacity: 1; scale: 1; }
  }

  @keyframes prBreath {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.018); }
  }

  @keyframes prFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }

  @keyframes prShadow {
    0%, 100% { transform: scaleX(1); opacity: 0.55; }
    50% { transform: scaleX(0.76); opacity: 0.22; }
  }

  @keyframes prSwayL {
    0%, 100% { transform: rotate(-2.4deg); }
    50% { transform: rotate(2.2deg); }
  }

  @keyframes prSwayR {
    0%, 100% { transform: rotate(2deg) scaleX(-1); }
    50% { transform: rotate(-2.4deg) scaleX(-1); }
  }

  @keyframes prSpin {
    to { transform: rotate(360deg); }
  }

  @keyframes prWaveX {
    to { transform: scaleX(1); }
  }

  @keyframes prFade {
    to { opacity: 1; }
  }

  @keyframes prDraw {
    to { stroke-dashoffset: 0; }
  }

  @keyframes prPop {
    from { opacity: 0; transform: scale(0.4); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes prSpeck {
    0%, 100% { transform: translateY(0); opacity: 0.35; }
    50% { transform: translateY(-8px); opacity: 0.9; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pr-head, .pr-filter, .pr-copy, .pr-scene, .pr-row,
    .pr-trust-item, .pr-orb-wrap, .pr-bottle-slot, .pr-dot,
    .pr-leaf-l, .pr-leaf-r, .pr-bottle-float, .pr-stamp-spin,
    .pr-orb, .pr-shadow, .pr-arcs, .pr-trust-wave path, .pr-speck {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
      clip-path: none !important;
      stroke-dashoffset: 0 !important;
    }
  }

  @media (max-width: 1080px) {
    .pr-stage {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .pr-feature {
      min-height: 500px;
    }

    .pr-list {
      max-width: 680px;
      width: 100%;
      margin: 0 auto;
    }

    .pr-orb-wrap {
      width: 440px;
      height: 440px;
      right: 4%;
    }
  }

  @media (max-width: 760px) {
    .pr {
      padding: 64px 0 0;
    }

    .pr-shell {
      padding: 0 18px;
    }

    .pr-filters {
      flex-wrap: nowrap;
      justify-content: flex-start;
      overflow-x: auto;
      margin-left: -18px;
      margin-right: -18px;
      padding: 0 18px 8px;
      scrollbar-width: none;
    }

    .pr-filters::-webkit-scrollbar { display: none; }

    .pr-filter { flex-shrink: 0; }

    .pr-feature {
      display: flex;
      flex-direction: column;
      min-height: 0;
      align-items: stretch;
    }

    .pr-copy {
      max-width: none;
      padding: 8px 0 0;
    }

    .pr-lead { max-width: 460px; }

    .pr-orb-wrap {
      width: 320px;
      height: 320px;
      right: auto;
      left: 50%;
      top: auto;
      bottom: 20px;
      translate: -50% 0;
    }

    .pr-scene {
      height: 390px;
      margin-top: 8px;
    }

    .pr-leaf-l { width: 150px; left: 4px; }
    .pr-leaf-r { width: 112px; right: 0; }
    .pr-bottle-slot { width: 140px; bottom: 64px; }
    .pr-stone-wrap { width: 180px; }
    .pr-stamp { width: 78px; height: 78px; top: 28px; right: 8px; }
    .pr-stamp-core { inset: 21px; }
    .pr-arcs { display: none; }

    .pr-band {
      margin-top: 18px;
      padding-bottom: 20px;
    }

    .pr-trust {
      grid-template-columns: 1fr 1fr;
      gap: 22px 12px;
    }

    .pr-trust-wave, .pr-dot, .pr-flourish { display: none; }
  }

  @media (max-width: 520px) {
    .pr-perks { gap: 12px; }
    .pr-row {
      grid-template-columns: 28px 60px minmax(0, 1fr) 30px;
      gap: 0 10px;
      padding: 8px 0;
    }
    .pr-thumb { width: 60px; height: 60px; }
    .pr-rail { min-height: 60px; }
    .pr-go { width: 28px; height: 28px; }
    .pr-row-name { font-size: 15px; }
    .pr-row-desc { font-size: 12.5px; }
    .pr-trust { grid-template-columns: 1fr; }
  }
`

const CAT_COLOR = {
  Nutraceuticals: '#3E8F6A',
  Cardiovascular: '#E25B56',
  Orthopaedics: '#D08A32',
  'Diabetic Care': '#3B86C8',
  Dermatology: '#E16D78',
  Neurology: '#7B68B4',
}

const THEMES = {
  immunity: {
    cap: '#1F6B4A',
    capLite: '#34906A',
    capDark: '#154832',
    body: '#F7F8F6',
    shade: '#D5E3DC',
    label: '#D3EEE2',
    icon: '#1C6B48',
    thumb: '#E5F6EF',
  },
  omega: {
    cap: '#1B4A42',
    capLite: '#2A6B60',
    capDark: '#12352F',
    body: '#F7F8F6',
    shade: '#D7E4E0',
    label: '#E7F6F1',
    icon: '#E15D4E',
    thumb: '#E7F6F1',
  },
  bone: {
    cap: '#E4D3BC',
    capLite: '#F3E7D6',
    capDark: '#CDB89A',
    body: '#FBF8F3',
    shade: '#E7E0D4',
    label: '#F4E7D0',
    icon: '#C48A3A',
    thumb: '#F8F1E6',
  },
  gluco: {
    cap: '#D5E4F2',
    capLite: '#EEF5FB',
    capDark: '#B7CCE2',
    body: '#F7F9FB',
    shade: '#D9E4EE',
    label: '#D9EBFA',
    icon: '#3E8ED0',
    thumb: '#E7F2FB',
  },
  derma: {
    cap: '#F0C3CC',
    capLite: '#F8E0E5',
    capDark: '#E3A8B4',
    body: '#FDF8F8',
    shade: '#F0E0E3',
    label: '#F8D9E0',
    icon: '#E17D8E',
    thumb: '#FDECEF',
  },
  neuro: {
    kind: 'syrup',
    thumb: '#F8F1E4',
    icon: '#5C4030',
  },
}

function GridIcon() {
  return (
    <svg className="solid" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="7.2" height="7.2" rx="1.5" />
      <rect x="13.8" y="3" width="7.2" height="7.2" rx="1.5" />
      <rect x="3" y="13.8" width="7.2" height="7.2" rx="1.5" />
      <rect x="13.8" y="13.8" width="7.2" height="7.2" rx="1.5" />
    </svg>
  )
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19c8-1 13-8 14-15-7 1-14 7-14 15z" />
      <path d="M9 15c2-2.6 5-5 9-6" />
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

function BoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.2 8.2a2.1 2.1 0 1 1 .4-3.6 2.1 2.1 0 0 1 2.4 2.1c.2.5 0 1-.4 1.3L16 14.6c.4.3.6.8.5 1.3a2.1 2.1 0 1 1-2.4 2.2 2.1 2.1 0 0 1-.4-3.5L7.2 8.2z" />
    </svg>
  )
}

function DropIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2.4M12 18.1v2.4M3.5 12h2.4M18.1 12h2.4M6 6l1.7 1.7M16.3 16.3 18 18M18 6l-1.7 1.7M7.7 16.3 6 18" />
    </svg>
  )
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 6.2A2.8 2.8 0 0 1 12 4a2.8 2.8 0 0 1 2.7 2A2.7 2.7 0 0 1 18 8.6c1 .5 1.7 1.5 1.7 2.7 0 1-.5 1.9-1.3 2.4V16a2.6 2.6 0 0 1-2.6 2.6H12" />
      <path d="M9 6.2A2.8 2.8 0 0 0 6.2 8.8 2.6 2.6 0 0 0 4.3 11.3c0 1 .5 1.9 1.4 2.4V16A2.6 2.6 0 0 0 8.3 18.6H12" />
      <path d="M12 7.2v11.4" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5 19 6.2v5.2c0 4.4-2.9 7.4-7 8.3-4.1-.9-7-3.9-7-8.3V6.2L12 3.5z" />
      <path d="m9 12 2 2 4-4.5" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 3 5 13h6l-1 8 8-11h-6l1-7z" />
    </svg>
  )
}

function PulseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 12h4l2-5 4 10 2-5h6" />
    </svg>
  )
}

function FlaskIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 3h6M10 3v6L5.2 18a3 3 0 0 0 2.6 4.5h8.4A3 3 0 0 0 18.8 18L14 9V3" />
      <path d="M8 15h8" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5 13.4 9 19 10.5 13.4 12 12 17.5 10.6 12 5 10.5 10.6 9 12 3.5z" />
    </svg>
  )
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.1" />
      <path d="M6.2 19.2c.7-3.1 2.8-4.7 5.8-4.7s5.1 1.6 5.8 4.7" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
      <circle cx="12" cy="11" r="1.7" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

const FILTER_ICONS = {
  All: GridIcon,
  Nutraceuticals: LeafIcon,
  Cardiovascular: HeartIcon,
  Orthopaedics: BoneIcon,
  'Diabetic Care': DropIcon,
  Dermatology: SunIcon,
  Neurology: BrainIcon,
}

const PERK_ICONS = {
  Immunity: ShieldIcon,
  'Daily Care': BoltIcon,
  Vitality: LeafIcon,
  'Heart Health': HeartIcon,
  Omega: DropIcon,
  Circulation: PulseIcon,
  Bones: BoneIcon,
  Joints: BoneIcon,
  Mobility: PulseIcon,
  Glucose: DropIcon,
  Metabolic: FlaskIcon,
  Energy: BoltIcon,
  Collagen: SparkIcon,
  Skin: SparkIcon,
  Glow: SunIcon,
  Nerves: BrainIcon,
  Cognition: BrainIcon,
  Balance: LeafIcon,
}

const TRUST_ICONS = [ShieldIcon, PersonIcon, FlaskIcon, PinIcon]

const GLYPHS = {
  immunity: (
    <>
      <path d="M2 24C0 8-16-12-18-30 4-22 12-2 2 24z" fill="currentColor" fillOpacity="0.14" />
      <path d="M0 18C6 6 12-8 14-24" />
    </>
  ),
  omega: (
    <path d="M0 14s-11-6-11-13a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 7-11 13-11 13z" />
  ),
  bone: (
    <path d="M-8-8a3.4 3.4 0 1 1 1.2-5.2 3.2 3.2 0 0 1 3.6 2.6c.3.8 0 1.5-.6 2L8 6.2c.6.4 1 1.1.8 1.9a3.3 3.3 0 1 1-4.2 3.4 3.2 3.2 0 0 1-.2-5.4L-7.2-6.2A3.2 3.2 0 0 1-8-8z" />
  ),
  gluco: (
    <path d="M0-16s10 11 10 18a10 10 0 1 1-20 0c0-7 10-18 10-18z" />
  ),
  derma: (
    <>
      <circle r="6" />
      <path d="M0-14v4M0 10v4M-14 0h4M10 0h4M-10-10l3 3M7 7l3 3M-10 10l3-3M7-7l3-3" />
    </>
  ),
}

function BottleArt({ visual }) {
  const theme = THEMES[visual] || THEMES.immunity
  if (theme.kind === 'syrup') return <SyrupArt />
  const id = `prb-${visual}`
  return (
    <svg viewBox="0 0 200 300" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={theme.shade} />
          <stop offset="16%" stopColor="#ffffff" />
          <stop offset="48%" stopColor={theme.body} />
          <stop offset="100%" stopColor={theme.shade} />
        </linearGradient>
        <linearGradient id={`${id}-cap`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={theme.capDark} />
          <stop offset="28%" stopColor={theme.capLite} />
          <stop offset="70%" stopColor={theme.cap} />
          <stop offset="100%" stopColor={theme.capDark} />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="22" rx="30" ry="8" fill={theme.capDark} />
      <rect x="70" y="18" width="60" height="40" rx="8" fill={`url(#${id}-cap)`} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M76 ${26 + i * 5.2}h48`} stroke="rgba(255,255,255,0.32)" strokeWidth="1.15" />
      ))}
      <rect x="68" y="56" width="64" height="8" rx="2.5" fill={theme.capDark} />
      <path d="M84 64h32l6 16c1 6-4 12-12 14h-20c-8-2-13-8-12-14l6-16z" fill={`url(#${id}-body)`} />
      <rect x="46" y="92" width="108" height="190" rx="34" fill={`url(#${id}-body)`} />
      <path d="M66 112c-2 36-1 78 4 118" stroke="#fff" strokeWidth="9" strokeLinecap="round" opacity="0.72" fill="none" />
      <path d="M148 130c2 28 1 60-2 92" stroke={theme.shade} strokeWidth="6" strokeLinecap="round" opacity="0.45" fill="none" />
      <rect x="68" y="128" width="64" height="104" rx="10" fill={theme.label} />
      <g transform="translate(100 176)" fill="none" stroke={theme.icon} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={{ color: theme.icon }}>
        {GLYPHS[visual] || GLYPHS.immunity}
      </g>
    </svg>
  )
}

function SyrupArt() {
  return (
    <svg viewBox="0 0 180 248" aria-hidden="true">
      <defs>
        <linearGradient id="prs-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6A3A22" />
          <stop offset="24%" stopColor="#C47848" />
          <stop offset="62%" stopColor="#A35A32" />
          <stop offset="100%" stopColor="#6E3C24" />
        </linearGradient>
      </defs>
      <rect x="76" y="6" width="28" height="12" rx="3" fill="#3E2A20" />
      <rect x="68" y="16" width="44" height="20" rx="5" fill="#5A3B2C" />
      <path d="M72 36h36v14H72z" fill="#6B4634" />
      <path d="M56 62c0-12 10-18 22-18h24c12 0 22 6 22 18v118c0 22-16 36-34 36H90c-18 0-34-14-34-36V62z" fill="url(#prs-glass)" />
      <path d="M56 132h68v48c0 22-16 36-34 36H90c-18 0-34-14-34-36v-48z" fill="#C46A38" opacity="0.9" />
      <path d="M70 74c2 22 2 48 0 78" stroke="#fff" strokeOpacity="0.28" strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="68" y="86" width="44" height="40" rx="7" fill="#F3E6C4" />
      <g transform="translate(90 106)" fill="none" stroke="#6B4634" strokeWidth="1.8" strokeLinecap="round">
        <path d="M-1-8a5 5 0 0 1 8 2 4 4 0 0 1 5 5 4 4 0 0 1-2 5v3h-8a5 5 0 0 1-6-5 4 4 0 0 1 1-6 4 4 0 0 1 2-4z" />
      </g>
    </svg>
  )
}

function BroadLeaf({ rotate, fill, scale = 1 }) {
  return (
    <g transform={`rotate(${rotate}) scale(${scale})`}>
      <path d="M0 2C-34-8-58-46-16-86C6-62 26-28 18-2C12 2 6 3 0 2Z" fill={fill} />
      <path d="M-2-6C-8-28-14-52-16-78" stroke="rgba(255,255,255,0.34)" strokeWidth="1.6" fill="none" />
    </g>
  )
}

function Foliage() {
  return (
    <svg viewBox="-140 -108 280 124" aria-hidden="true">
      <BroadLeaf rotate={-58} fill="#1A4630" scale="1.05" />
      <BroadLeaf rotate={-30} fill="#2E7A4A" scale="1.18" />
      <BroadLeaf rotate={-4} fill="#143828" scale="0.92" />
      <BroadLeaf rotate={24} fill="#3E945C" scale="1.08" />
      <BroadLeaf rotate={50} fill="#246644" scale="0.86" />
    </svg>
  )
}

function Stone() {
  return (
    <svg viewBox="0 0 260 96" aria-hidden="true">
      <path d="M36 50c8-24 38-38 94-38 58 0 90 16 98 38 6 16-16 30-48 36-34 6-96 8-128 0-24-6-30-22-16-36z" fill="#E4DDD2" />
      <path d="M54 48c12-16 40-26 80-26 42 0 70 8 84 22-10 14-38 24-82 24-48 0-74-8-82-20z" fill="#F4F0E7" />
      <path d="M78 46c22-8 52-10 78-2" stroke="#fff" strokeOpacity="0.75" fill="none" strokeWidth="2" />
      <path d="M156 30c10 12 12 26 6 42" stroke="#D5CFC4" fill="none" strokeWidth="1.4" />
    </svg>
  )
}

function Arcs() {
  return (
    <svg className="pr-arcs" viewBox="0 0 300 480" fill="none" aria-hidden="true">
      <path pathLength="1" d="M250 24C120 48 36 140 28 268" stroke="#7EAE98" strokeWidth="1.6" />
      <path pathLength="1" d="M268 70C128 86 18 188 16 320" stroke="#A9CBBC" strokeWidth="1.45" />
      <path pathLength="1" d="M8 150c52-78 140-112 230-96" stroke="#8FB8A4" strokeWidth="1.35" />
      <circle cx="28" cy="268" r="3.4" fill="#5E9A82" />
      <circle cx="16" cy="320" r="2.8" fill="#7EAE98" />
      <circle cx="232" cy="58" r="3" fill="#6EA890" />
    </svg>
  )
}

function Stamp() {
  return (
    <div className="pr-stamp" aria-hidden="true">
      <svg className="pr-stamp-spin" viewBox="0 0 100 100">
        <defs>
          <path id="prStampPath" d="M50 14a36 36 0 1 1 0 72 36 36 0 1 1 0-72" />
        </defs>
        <circle cx="50" cy="50" r="36" fill="none" stroke="#A9CDBB" strokeWidth="0.7" />
        <text fill="#6EA88C" fontSize="7.3" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="1.35">
          <textPath href="#prStampPath">NATURAL CARE • STRONGER LIFE • </textPath>
        </text>
      </svg>
      <span className="pr-stamp-core">
        <LeafIcon />
      </span>
    </div>
  )
}

const THUMB_SPEC = {
  omega: {
    bg: '#D7EBE4',
    cap: '#16756C',
    capLite: '#1E8C80',
    capDark: '#0C4E48',
    label: '#D4EFE4',
    icon: '#1B7A64',
  },
  bone: {
    bg: '#FBF3E7',
    cap: '#F4F0EA',
    capLite: '#FFFFFF',
    capDark: '#DDD5CA',
    label: '#F3E6D2',
    icon: '#A8845C',
  },
  gluco: {
    bg: '#DCEFFB',
    cap: '#1C4558',
    capLite: '#3D6E86',
    capDark: '#0E2E3C',
    label: '#D3E9F6',
    icon: '#3A7EAE',
  },
  derma: {
    bg: '#FCE4E7',
    cap: '#F0D0D4',
    capLite: '#FBEAEC',
    capDark: '#E0B8BE',
    label: '#F8DDE2',
    icon: '#D47A86',
  },
}

const THUMB_GLYPH = {
  omega: (
    <g fill="#1B7A64" stroke="none">
      <path d="M0.4 6.2C-6.2 5-8.4-1.2-3.6-6.6 2.6-3.2 4.6 1.2 0.4 6.2z" />
      <path d="M-0.6 4.6C-0.2 1.2 0.4-2-2.8-5.2" stroke="#E9F8F2" strokeWidth="0.9" fill="none" />
    </g>
  ),
  bone: (
    <path
      fill="#B08A62"
      d="M-5.2-4.6a2.15 2.15 0 1 1 .7-3.3 2 2 0 0 1 2.3 1.6c.2.5 0 1-.35 1.3L3.2 1.6c.35.25.6.7.5 1.15a2.1 2.1 0 1 1-2.6 2.1 2 2 0 0 1-.15-3.4L-4.6-3.4a2 2 0 0 1-.6-1.2z"
    />
  ),
  gluco: (
    <path fill="#3E86B8" d="M0-6.4s5.2 5.4 5.2 8.4a5.2 5.2 0 1 1-10.4 0C-5.2-1 0-6.4 0-6.4z" />
  ),
  derma: (
    <g fill="none" stroke="#E08A90" strokeWidth="1.35" strokeLinecap="round">
      <circle r="2.5" />
      <path d="M0-6.4v2.1M0 4.3v2.1M-6.4 0h2.1M4.3 0h2.1M-4.5-4.5l1.5 1.5M3 3l1.5 1.5M-4.5 4.5  -3 3M3-3l1.5-1.5" />
    </g>
  ),
}

function ListThumb({ visual }) {
  if (visual === 'neuro') return <SyrupThumb />
  const spec = THUMB_SPEC[visual] || THUMB_SPEC.omega
  const id = `lt-${visual}`
  return (
    <svg viewBox="0 0 88 88" aria-hidden="true">
      <circle cx="44" cy="44" r="44" fill={spec.bg} />
      <defs>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E4E7E5" />
          <stop offset="16%" stopColor="#FFFFFF" />
          <stop offset="58%" stopColor="#F6F7F6" />
          <stop offset="100%" stopColor="#D0D4D2" />
        </linearGradient>
        <linearGradient id={`${id}-c`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={spec.capDark} />
          <stop offset="38%" stopColor={spec.capLite} />
          <stop offset="100%" stopColor={spec.capDark} />
        </linearGradient>
      </defs>
      <g className="btl">
        <ellipse cx="44" cy="76" rx="15" ry="2.3" fill="rgba(30, 40, 32, 0.08)" />
        <rect x="27" y="36" width="34" height="38" rx="9" fill={`url(#${id}-b)`} />
        <path d="M34 36h20l2.4 7H31.6z" fill={`url(#${id}-b)`} />
        <rect x="33" y="15" width="22" height="15" rx="3.5" fill={`url(#${id}-c)`} />
        <rect x="32" y="28.5" width="24" height="3.4" rx="1.2" fill={spec.capDark} />
        <rect x="33" y="46" width="22" height="18" rx="2.2" fill={spec.label} />
        <g transform="translate(44 55)" stroke={spec.icon} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          {THUMB_GLYPH[visual] || THUMB_GLYPH.omega}
        </g>
      </g>
    </svg>
  )
}

function SyrupThumb() {
  return (
    <svg viewBox="0 0 88 88" aria-hidden="true">
      <circle cx="44" cy="44" r="44" fill="#F3EADF" />
      <defs>
        <linearGradient id="lt-neuro-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6A3418" />
          <stop offset="28%" stopColor="#E2B07A" />
          <stop offset="62%" stopColor="#C48448" />
          <stop offset="100%" stopColor="#7A3E1C" />
        </linearGradient>
      </defs>
      <g className="btl">
        <ellipse cx="44" cy="77" rx="13" ry="2.2" fill="rgba(70, 32, 10, 0.14)" />
        <rect x="39" y="12" width="10" height="5.5" rx="1.4" fill="#1A1A1A" />
        <rect x="36.5" y="16.5" width="15" height="7" rx="1.6" fill="#2A211C" />
        <path d="M31 30c0-4.2 4.2-6.5 13-6.5s13 2.3 13 6.5v30c0 8.2-5.4 14-13 14s-13-5.8-13-14V30z" fill="url(#lt-neuro-g)" />
        <path d="M34 36c.4 10 .3 20 0 30" stroke="#fff" strokeOpacity="0.28" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <rect x="36" y="40" width="16" height="20" rx="1.6" fill="#F6E6CF" />
        <g transform="translate(44 50)" fill="none" stroke="#6A5344" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round">
          <circle r="6.2" />
          <path d="M0-4.6v9.2" />
          <path d="M-3.6-1.6c1 .9 2.2 1.5 3.6 1.5s2.6-.6 3.6-1.5" />
          <path d="M-3.4 1.5c.9.8 2 1.3 3.4 1.3s2.5-.5 3.4-1.3" />
          <path d="M-4.4-3.2c.8.5 1.6.2 2.2-.4M4.4-3.2c-.8.5-1.6.2-2.2-.4" />
        </g>
      </g>
    </svg>
  )
}

function pillStyle(badge) {
  const key = (badge || '').toLowerCase()
  if (key === 'bestseller') return { background: '#E6C36A', color: '#3F3414' }
  if (key === 'popular') return { background: '#E7F0FA', color: '#2E5A88' }
  if (key === 'new') return { background: '#E5F6EF', color: '#1E6B4F' }
  return { background: '#EEF3F1', color: '#1A3C34' }
}

function bestsellerId(items) {
  return (items.find((item) => item.badge === 'Bestseller') || items[0]).id
}

export default function Products() {
  const wrapRef = useRef(null)
  const items = content.products.items
  const [filter, setFilter] = useState(content.products.filters[0])
  const [featuredId, setFeaturedId] = useState(() => bestsellerId(items))

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
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const featured = items.find((item) => item.id === featuredId) || items[0]
  const list = items.filter((item) => item.id !== featured.id)

  function chooseFilter(tab) {
    setFilter(tab)
    if (tab === 'All') {
      setFeaturedId(bestsellerId(items))
      return
    }
    const match = items.find((item) => item.category === tab)
    if (match) setFeaturedId(match.id)
  }

  function chooseProduct(item) {
    setFeaturedId(item.id)
    setFilter(item.category)
  }

  const heading = content.products.heading
  const highlight = 'Healthcare'
  const headingParts = heading.includes(highlight) ? heading.split(highlight) : null

  return (
    <section className="pr" id="products" ref={wrapRef}>
      <style>{CSS}</style>
      <div className="pr-shell">
        <header className="pr-head">
          <div className="pr-range">
            <i />
            <span>{content.products.badge}</span>
            <i />
          </div>
          <h2>
            {headingParts ? (
              <>
                {headingParts[0]}
                <em>{highlight}</em>
                {headingParts[1]}
              </>
            ) : (
              heading
            )}
          </h2>
          <p className="pr-sub">{content.products.subheading}</p>
        </header>

        <div className="pr-filters" role="tablist" aria-label="Product categories">
          {content.products.filters.map((tab, index) => {
            const Icon = FILTER_ICONS[tab] || GridIcon
            const active = filter === tab
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                className={`pr-filter${active ? ' active' : ''}`}
                style={{ animationDelay: `${0.08 + index * 0.05}s` }}
                onClick={() => chooseFilter(tab)}
              >
                <Icon />
                {tab}
              </button>
            )
          })}
        </div>

        <div className="pr-stage">
          <div className="pr-feature">
            <div className="pr-orb-wrap" aria-hidden="true">
              <div className="pr-orb" />
              <Arcs />
            </div>

            <div className="pr-copy" key={featured.id}>
              <div className="pr-meta">
                <span className="pr-kicker-cat" style={{ color: CAT_COLOR[featured.category] || '#3E8F6A' }}>
                  {featured.category}
                </span>
                {featured.badge ? (
                  <span className="pr-badge-pill" style={pillStyle(featured.badge)}>{featured.badge}</span>
                ) : null}
              </div>
              <h3 className={`pr-title${featured.name.length > 16 ? ' is-long' : ''}`}>{featured.name}</h3>
              <p className="pr-lead">{featured.description}</p>
              <div className="pr-perks">
                {featured.tags.map((tag) => {
                  const Icon = PERK_ICONS[tag] || LeafIcon
                  return (
                    <div className="pr-perk" key={tag}>
                      <i><Icon /></i>
                      <span>{tag}</span>
                    </div>
                  )
                })}
              </div>
              <a className="pr-enquire" href="#contact">
                {content.products.cta}
                <ArrowIcon />
              </a>
            </div>

            <div className="pr-scene" aria-hidden="true">
              <div className="pr-leaf pr-leaf-l"><Foliage /></div>
              <div className="pr-leaf pr-leaf-r"><Foliage /></div>
              <div className="pr-stone-wrap">
                <div className="pr-shadow" />
                <Stone />
              </div>
              <Stamp />
              <div className="pr-bottle-slot" key={featured.visual}>
                <div className="pr-bottle-float">
                  <BottleArt visual={featured.visual} />
                </div>
              </div>
            </div>
          </div>

          <div className="pr-list" key={featured.id}>
            {list.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="pr-row"
                style={{ animationDelay: `${0.12 + index * 0.045}s` }}
                onClick={() => chooseProduct(item)}
              >
                <span className="pr-rail">
                  <span className="pr-num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="pr-rail-dot" />
                </span>
                <span className="pr-thumb">
                  <ListThumb visual={item.visual} />
                </span>
                <span className="pr-row-copy">
                  <span className="pr-row-cat" style={{ color: CAT_COLOR[item.category] || '#3E8F6A' }}>
                    {item.category}
                  </span>
                  <span className="pr-row-name">{item.name}</span>
                  <span className="pr-row-desc">{item.description}</span>
                </span>
                <span className="pr-go" aria-hidden="true"><ArrowIcon /></span>
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className="pr-band">
        <svg className="pr-band-bg" viewBox="0 0 1440 340" preserveAspectRatio="none" aria-hidden="true">
          <path
            fill="#E7F4F0"
            d="M0 78C150 26 250 108 420 58C600 6 760 0 960 46C1160 92 1280 22 1440 70L1440 268C1260 318 1080 228 880 262C680 296 500 214 320 252C160 284 70 228 0 262Z"
          />
          <path
            d="M-20 86C140 30 260 118 430 64C610 8 770 2 970 50C1170 98 1290 26 1460 74"
            fill="none"
            stroke="#C5E0D8"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M-20 248C170 302 340 206 540 246C760 290 940 200 1160 246C1300 276 1380 232 1460 270"
            fill="none"
            stroke="#C5E0D8"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <svg className="pr-flourish pr-flourish-tl" viewBox="0 0 240 130" fill="none" aria-hidden="true">
          <path d="M8 108C42 78 78 36 128 16C168 2 206-6 248 12" stroke="#B7D4CC" strokeWidth="1.6" />
        </svg>
        <svg className="pr-flourish pr-flourish-tr" viewBox="0 0 280 150" fill="none" aria-hidden="true">
          <path d="M-10 18C50 48 90 12 150 36C200 56 240 18 290 8" stroke="#B7D4CC" strokeWidth="1.6" />
          <path d="M40 140C110 108 160 128 230 86C268 64 300 92 320 70" stroke="#C5E0D8" strokeWidth="1.5" />
        </svg>

        <div className="pr-trust">
          <svg className="pr-trust-wave" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 16C40 58 58 90 86 90L206 90C224 90 232 8 250 8C268 8 276 90 294 90L706 90C724 90 732 8 750 8C768 8 776 90 794 90L928 90C958 90 976 24 1000 6" />
          </svg>
          <i className="pr-dot a" aria-hidden="true" />
          <i className="pr-dot b" aria-hidden="true" />
          {content.products.trust.map((item, index) => {
            const Icon = TRUST_ICONS[index] || ShieldIcon
            return (
              <div className="pr-trust-item" key={item.title} style={{ animationDelay: `${0.28 + index * 0.08}s` }}>
                <span className="pr-trust-ico"><Icon /></span>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
