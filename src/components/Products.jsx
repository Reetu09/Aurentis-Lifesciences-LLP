import { useEffect, useRef, useState } from 'react'
import content from '../data/content.json'

const CSS = `
  .pr {
    background: #ffffff;
    color: #1B4A52;
    padding: 96px 48px 80px;
    position: relative;
  }

  .pr-shell {
    max-width: 1180px;
    margin: 0 auto;
  }

  .pr-head {
    text-align: center;
    max-width: 720px;
    margin: 0 auto 32px;
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .pr.in .pr-head {
    opacity: 1;
    transform: none;
  }

  .pr-badge {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 999px;
    background: #E8F5F3;
    color: #1B4A52;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .pr h2 {
    font-family: var(--font-display);
    font-size: clamp(32px, 4vw, 44px);
    font-weight: 600;
    color: #12363C;
    margin-bottom: 12px;
  }

  .pr-sub {
    color: #6B7F82;
    font-size: 15px;
    line-height: 1.75;
  }

  .pr-filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 36px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s;
  }

  .pr.in .pr-filters {
    opacity: 1;
    transform: none;
  }

  .pr-filter {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 16px;
    border-radius: 999px;
    border: 1px solid #D5DEDE;
    background: #ffffff;
    color: #1B4A52;
    font-size: 13px;
    font-weight: 600;
    transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
  }

  .pr-filter svg {
    width: 15px;
    height: 15px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .pr-filter:hover {
    transform: translateY(-1px);
    border-color: #2A9D8F;
  }

  .pr-filter.active {
    background: #1B4A52;
    border-color: #1B4A52;
    color: #ffffff;
    box-shadow: 0 8px 18px rgba(27, 74, 82, 0.22);
  }

  .pr-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
    margin-bottom: 36px;
  }

  .pr-card {
    display: grid;
    grid-template-columns: 0.9fr 1.15fr;
    min-height: 248px;
    background: #ffffff;
    border: 1px solid #E2EBEA;
    border-radius: 22px;
    overflow: hidden;
    opacity: 0;
    translate: 0 28px;
    animation: prCardIn 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }

  .pr-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 22px 44px rgba(27, 74, 82, 0.12);
    border-color: #C9D9D6;
  }

  .pr-card:hover .pr-shot {
    animation-play-state: paused;
    transform: scale(1.06) translateY(-4px);
  }

  .pr-visual {
    position: relative;
    background:
      radial-gradient(circle at 50% 78%, rgba(42, 157, 143, 0.12), transparent 55%),
      linear-gradient(180deg, #F4FAF9 0%, #E7F2F0 100%);
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .pr-mark {
    position: absolute;
    width: 120px;
    height: 120px;
    opacity: 0.12;
    color: #1B4A52;
  }

  .pr-mark svg {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.3;
  }

  .pr-shot {
    position: relative;
    z-index: 1;
    width: 118px;
    height: 168px;
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
    animation: prFloat 4.2s ease-in-out infinite;
  }

  .pr-card:nth-child(2) .pr-shot { animation-delay: 0.4s; }
  .pr-card:nth-child(3) .pr-shot { animation-delay: 0.8s; }
  .pr-card:nth-child(4) .pr-shot { animation-delay: 0.2s; }
  .pr-card:nth-child(5) .pr-shot { animation-delay: 0.6s; }
  .pr-card:nth-child(6) .pr-shot { animation-delay: 1s; }

  .pr-info {
    position: relative;
    padding: 20px 20px 18px 18px;
    display: flex;
    flex-direction: column;
  }

  .pr-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 6px;
  }

  .pr-cat {
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 700;
  }

  .pr-cat.nutraceuticals { color: #2A9D8F; }
  .pr-cat.cardiovascular { color: #C45C5C; }
  .pr-cat.orthopaedics { color: #C48A3A; }
  .pr-cat.diabetic { color: #3B7BB8; }
  .pr-cat.dermatology { color: #C47A8A; }
  .pr-cat.neurology { color: #6B6BB8; }

  .pr-pill {
    flex-shrink: 0;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .pr-pill.bestseller { background: #E8C97A; color: #1B4A52; }
  .pr-pill.popular { background: #2E5A88; color: #ffffff; }
  .pr-pill.new { background: #2A9D8F; color: #ffffff; }

  .pr-info h3 {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 600;
    color: #12363C;
    line-height: 1.2;
    margin-bottom: 8px;
  }

  .pr-info p {
    font-size: 13px;
    line-height: 1.55;
    color: #6B7F82;
    margin-bottom: 12px;
    flex: 1;
  }

  .pr-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 14px;
  }

  .pr-tag {
    padding: 4px 9px;
    border-radius: 999px;
    background: #EEF5F4;
    color: #1B4A52;
    font-size: 11px;
    font-weight: 600;
  }

  .pr-enquire {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 11px 14px;
    border-radius: 10px;
    background: #1B4A52;
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .pr-enquire svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    transition: transform 0.25s ease;
  }

  .pr-enquire:hover {
    background: #246068;
  }

  .pr-enquire:hover svg {
    transform: translateX(4px);
  }

  .pr-trust {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    background: #F4F7F7;
    border-radius: 22px;
    padding: 22px 18px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s;
  }

  .pr.in .pr-trust {
    opacity: 1;
    transform: none;
  }

  .pr-trust-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 6px 10px;
  }

  .pr-trust-ico {
    width: 42px;
    height: 42px;
    min-width: 42px;
    border-radius: 50%;
    background: #1B4A52;
    color: #ffffff;
    display: grid;
    place-items: center;
  }

  .pr-trust-ico svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .pr-trust-item strong {
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: #12363C;
    margin-bottom: 3px;
  }

  .pr-trust-item span {
    font-size: 12px;
    line-height: 1.45;
    color: #6B7F82;
  }

  @keyframes prCardIn {
    to { opacity: 1; translate: 0 0; }
  }

  @keyframes prFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-7px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .pr-head, .pr-filters, .pr-trust, .pr-card, .pr-shot {
      animation: none !important;
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }

  @media (max-width: 1100px) {
    .pr-grid {
      grid-template-columns: 1fr 1fr;
    }

    .pr-trust {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 760px) {
    .pr {
      padding: 72px 20px 56px;
    }

    .pr-grid,
    .pr-trust {
      grid-template-columns: 1fr;
    }

    .pr-card {
      grid-template-columns: 0.85fr 1.2fr;
      min-height: 220px;
    }
  }

  @media (max-width: 520px) {
    .pr-card {
      grid-template-columns: 1fr;
    }

    .pr-visual {
      min-height: 180px;
    }
  }
`

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.2" />
      <rect x="14" y="3" width="7" height="7" rx="1.2" />
      <rect x="3" y="14" width="7" height="7" rx="1.2" />
      <rect x="14" y="14" width="7" height="7" rx="1.2" />
    </svg>
  )
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19c8-1 13-8 14-15-7 1-14 7-14 15z" />
      <path d="M8 16c2.4-3 6-6 11-7" />
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
      <path d="M7 8a2.2 2.2 0 1 1 0-4.4A2.2 2.2 0 0 1 7 8zm0 0 10 10m0 0a2.2 2.2 0 1 0 3.1 3.1 2.2 2.2 0 0 0-3.1-3.1zM17 8a2.2 2.2 0 1 0 0-4.4A2.2 2.2 0 0 0 17 8zm0 0L7 18m0 0a2.2 2.2 0 1 1-3.1 3.1A2.2 2.2 0 0 1 7 18z" />
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

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v4M12 17v4M4.9 6.5l2.8 2.8M16.3 14.7l2.8 2.8M3 12h4M17 12h4M4.9 17.5l2.8-2.8M16.3 9.3l2.8-2.8" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  )
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.5 6.5a3 3 0 0 1 5.4-1.6A3 3 0 0 1 18 8.2c1.3.4 2.2 1.6 2.2 3 0 1.2-.7 2.2-1.7 2.7V16a3 3 0 0 1-3 3h-1.2M8.5 6.5A3 3 0 0 0 4 9.3c-1.2.5-2 1.6-2 2.9 0 1.2.7 2.2 1.8 2.7V16a3 3 0 0 0 3 3h6.4" />
    </svg>
  )
}

function ShieldMark() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 3l8 3v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V6l8-3z" />
    </svg>
  )
}

function PulseMark() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M3 12h4l2-5 4 10 2-5h6" />
    </svg>
  )
}

function BoneMark() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M7 8a2.2 2.2 0 1 1 0-4.4A2.2 2.2 0 0 1 7 8zm0 0 10 10" />
    </svg>
  )
}

function MeterMark() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="4" y="5" width="16" height="14" rx="3" />
      <path d="M8 12h2l1.5-3 2 6L15 12h3" />
    </svg>
  )
}

function GlowMark() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="6" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  )
}

function NeuroMark() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M8.5 6.5a3 3 0 0 1 5.4-1.6A3 3 0 0 1 18 8.2c1.3.4 2.2 1.6 2.2 3 0 1.2-.7 2.2-1.7 2.7V16a3 3 0 0 1-3 3h-6.7A3 3 0 0 1 5.8 16v-1.2C4.7 14.3 4 13.3 4 12.1c0-1.3.8-2.4 2-2.9A3 3 0 0 1 8.5 6.5z" />
    </svg>
  )
}

function Bottle({ cap, body, label, accent, gid }) {
  return (
    <svg viewBox="0 0 120 168" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="38%" stopColor={body} />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
      </defs>
      <rect x="46" y="8" width="28" height="10" rx="3" fill={cap} />
      <rect x="42" y="16" width="36" height="14" rx="4" fill={cap} />
      <path d="M38 34h44v10c0 4-3 8-8 8H46c-5 0-8-4-8-8V34z" fill={cap} opacity="0.9" />
      <path d="M32 52c0-6 5-10 11-10h34c6 0 11 4 11 10v92c0 10-8 18-18 18H50c-10 0-18-8-18-18V52z" fill={`url(#${gid})`} stroke="rgba(10,35,40,0.08)" />
      <rect x="40" y="78" width="40" height="38" rx="6" fill={label} opacity="0.92" />
      <rect x="46" y="86" width="28" height="4" rx="2" fill="#fff" opacity="0.55" />
      <rect x="50" y="96" width="20" height="3" rx="1.5" fill="#fff" opacity="0.35" />
      <path d="M40 56c0 0 4 28 4 50s-2 40-2 40" fill="none" stroke="#fff" strokeWidth="4" opacity="0.28" strokeLinecap="round" />
    </svg>
  )
}

function Jar() {
  return (
    <svg viewBox="0 0 120 168" width="100%" height="100%" aria-hidden="true">
      <rect x="30" y="46" width="60" height="14" rx="4" fill="#D9E4E2" />
      <rect x="34" y="34" width="52" height="16" rx="6" fill="#F2F6F5" stroke="#C9D6D3" />
      <path d="M28 60h64c4 0 8 4 8 9v52c0 12-10 20-22 20H42c-12 0-22-8-22-20V69c0-5 4-9 8-9z" fill="#F7FBFA" stroke="#D3DEDC" />
      <path d="M28 78h80" stroke="#E8C97A" strokeWidth="10" opacity="0.35" />
      <ellipse cx="60" cy="118" rx="22" ry="10" fill="#E8F5F3" />
      <path d="M38 64c2 20 4 36 4 48" fill="none" stroke="#fff" strokeWidth="5" opacity="0.45" />
    </svg>
  )
}

function Meter() {
  return (
    <svg viewBox="0 0 120 168" width="100%" height="100%" aria-hidden="true">
      <rect x="28" y="36" width="64" height="96" rx="16" fill="#1B4A52" />
      <rect x="36" y="48" width="48" height="36" rx="8" fill="#D6F3EE" />
      <path d="M42 66h8l6-10 8 18 5-8h11" fill="none" stroke="#2A9D8F" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="48" cy="102" r="6" fill="#4DB8AC" />
      <circle cx="72" cy="102" r="6" fill="#C9A84C" />
      <rect x="44" y="116" width="32" height="6" rx="3" fill="#4DB8AC" opacity="0.7" />
    </svg>
  )
}

function Syrup() {
  return (
    <svg viewBox="0 0 120 168" width="100%" height="100%" aria-hidden="true">
      <rect x="50" y="6" width="20" height="12" rx="3" fill="#5A3A28" />
      <rect x="46" y="16" width="28" height="16" rx="5" fill="#6B4632" />
      <path d="M44 34h32v12H44z" fill="#8A5A3C" />
      <path d="M38 50c0-6 5-10 12-10h20c7 0 12 4 12 10v94c0 8-7 14-16 14H54c-9 0-16-6-16-14V50z" fill="#8B4E2A" />
      <path d="M38 92h44v52c0 8-7 14-16 14H54c-9 0-16-6-16-14V92z" fill="#C46A32" opacity="0.85" />
      <rect x="46" y="62" width="28" height="22" rx="4" fill="#E8C97A" opacity="0.85" />
      <path d="M46 56c1 18 2 40 2 58" fill="none" stroke="#fff" strokeWidth="3.5" opacity="0.25" />
    </svg>
  )
}

const VISUALS = {
  immunity: { shot: <Bottle gid="b-imm" cap="#C9A84C" body="#F4F7F6" label="#1B4A52" accent="#D9E6E3" />, mark: <ShieldMark /> },
  omega: { shot: <Bottle gid="b-omg" cap="#1B4A52" body="#2A9D8F" label="#0A2328" accent="#1B4A52" />, mark: <PulseMark /> },
  bone: { shot: <Bottle gid="b-bon" cap="#D9E4E2" body="#F7F4EE" label="#C48A3A" accent="#E8DFD0" />, mark: <BoneMark /> },
  gluco: { shot: <Meter />, mark: <MeterMark /> },
  derma: { shot: <Jar />, mark: <GlowMark /> },
  neuro: { shot: <Syrup />, mark: <NeuroMark /> },
}

const FILTER_ICONS = {
  All: GridIcon,
  Nutraceuticals: LeafIcon,
  Cardiovascular: HeartIcon,
  Orthopaedics: BoneIcon,
  'Diabetic Care': DropIcon,
  Dermatology: SparkIcon,
  Neurology: BrainIcon,
}

function RibbonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="10" r="6" />
      <path d="M9 15.5 8 21l4-2 4 2-1-5.5" />
    </svg>
  )
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <circle cx="16" cy="9" r="2.3" />
      <path d="M4 19c.6-3.2 2.8-5 5-5s4.4 1.8 5 5" />
      <path d="M13.4 14.4c1.7-.4 3.5.5 4.6 2.6" />
    </svg>
  )
}

function ScopeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="9" r="5" />
      <path d="m13 13 7 7M7.5 8.2c.6-1 1.6-1.7 2.8-1.8" />
    </svg>
  )
}

function IndiaIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3c2 1 4.2 2.2 5 4.4.7 1.8.3 3.4-.2 5.1-.4 1.4.2 2.6 1.2 3.5-1.6.8-3.2 1.2-4.2 2.8-.6-1.4-1.6-2.2-3-2.4-1.4.6-2.6 0-3.6-1.2-.6-1.6-1.4-3.2-1-5C7 6.6 9.4 4.2 12 3z" />
    </svg>
  )
}

const TRUST_SVGS = [RibbonIcon, PeopleIcon, ScopeIcon, IndiaIcon]

function catClass(category) {
  if (category === 'Diabetic Care') return 'diabetic'
  return category.toLowerCase().replace(/\s+/g, '')
}

function badgeClass(badge) {
  const key = badge.toLowerCase()
  if (key === 'bestseller') return 'bestseller'
  if (key === 'new') return 'new'
  if (key === 'popular') return 'popular'
  return ''
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export default function Products() {
  const wrapRef = useRef(null)
  const [filter, setFilter] = useState(content.products.filters[0])
  const [animKey, setAnimKey] = useState(0)

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

  const items = content.products.items.filter(
    (item) => filter === 'All' || item.category === filter
  )

  return (
    <section className="pr" id="products" ref={wrapRef}>
      <style>{CSS}</style>
      <div className="pr-shell">
        <div className="pr-head">
          <span className="pr-badge">{content.products.badge}</span>
          <h2>{content.products.heading}</h2>
          <p className="pr-sub">{content.products.subheading}</p>
        </div>

        <div className="pr-filters">
          {content.products.filters.map((tab) => {
            const Icon = FILTER_ICONS[tab] || GridIcon
            return (
              <button
                key={tab}
                type="button"
                className={`pr-filter${filter === tab ? ' active' : ''}`}
                onClick={() => {
                  setFilter(tab)
                  setAnimKey((k) => k + 1)
                }}
              >
                <Icon />
                {tab}
              </button>
            )
          })}
        </div>

        <div className="pr-grid" key={animKey}>
          {items.map((item, i) => {
            const visual = VISUALS[item.visual] || VISUALS.immunity
            return (
              <article
                className="pr-card"
                key={item.id}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="pr-visual">
                  <span className="pr-mark">{visual.mark}</span>
                  <div className="pr-shot">{visual.shot}</div>
                </div>
                <div className="pr-info">
                  <div className="pr-top">
                    <span className={`pr-cat ${catClass(item.category)}`}>{item.category}</span>
                    {item.badge ? (
                      <span className={`pr-pill ${badgeClass(item.badge)}`}>{item.badge}</span>
                    ) : null}
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="pr-tags">
                    {item.tags.map((tag) => (
                      <span className="pr-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a className="pr-enquire" href="#contact">
                    {content.products.cta}
                    <ArrowIcon />
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        <div className="pr-trust">
          {content.products.trust.map((item, i) => {
            const Icon = TRUST_SVGS[i] || RibbonIcon
            return (
              <div className="pr-trust-item" key={item.title}>
                <span className="pr-trust-ico"><Icon /></span>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
