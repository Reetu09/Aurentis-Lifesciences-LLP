import { useEffect, useState } from 'react'
import content from '../data/content.json'

const CSS = `
  .aur-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 800;
    background: rgba(7, 22, 28, 0.94);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    transition: background 0.4s ease, box-shadow 0.4s ease;
  }

  .aur-nav.scrolled {
    background: rgba(7, 22, 28, 0.98);
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.28);
  }

  .aur-nav-inner {
    position: relative;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 56px;
    gap: 24px;
  }

  .aur-nav-brand {
    display: inline-flex;
    align-items: center;
    background: #ffffff;
    border-radius: 10px;
    padding: 3px 5px;
    height: 54px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
  }

  .aur-nav-logo {
    height: 48px;
    width: auto;
    border-radius: 7px;
  }

  .aur-nav-links {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .aur-nav-link {
    position: relative;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.92);
    padding: 8px 0 10px;
    transition: color 0.25s ease;
  }

  .aur-nav-link:hover {
    color: #ffffff;
  }

  .aur-nav-indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1.5px;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.95) 18%, rgba(255, 255, 255, 0.95) 82%, transparent 100%);
    pointer-events: none;
    animation: navIndicatorIn 0.35s ease;
  }

  .aur-nav-indicator::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 7px;
    height: 7px;
    background: #E8C97A;
    transform: translate(-50%, -50%) rotate(45deg);
    box-shadow: 0 0 10px rgba(232, 201, 122, 0.95);
  }

  .aur-nav-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 22px;
    background: linear-gradient(180deg, #F3E3A8 0%, #C9A84C 48%, #A8882E 100%);
    color: #0A2328;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.02em;
    border-radius: 999px;
    box-shadow: 0 8px 22px rgba(201, 168, 76, 0.38);
    transition: transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease;
  }

  .aur-nav-cta svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: #0A2328;
    stroke-width: 1.9;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .aur-nav-cta:hover {
    transform: translateY(-1px);
    filter: brightness(1.06);
    box-shadow: 0 12px 26px rgba(201, 168, 76, 0.5);
  }

  .aur-nav-toggle {
    display: none;
    width: 42px;
    height: 42px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .aur-nav-toggle span {
    display: block;
    width: 18px;
    height: 1.5px;
    background: #ffffff;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .aur-nav-toggle.open span:nth-child(1) {
    transform: translateY(6.5px) rotate(45deg);
  }

  .aur-nav-toggle.open span:nth-child(2) {
    opacity: 0;
  }

  .aur-nav-toggle.open span:nth-child(3) {
    transform: translateY(-6.5px) rotate(-45deg);
  }

  @keyframes navIndicatorIn {
    from { opacity: 0; transform: scaleX(0.4); }
    to { opacity: 1; transform: scaleX(1); }
  }

  @media (max-width: 900px) {
    .aur-nav-inner {
      position: static;
      padding: 10px 20px;
    }

    .aur-nav-toggle {
      display: flex;
    }

    .aur-nav-cta.desktop {
      display: none;
    }

    .aur-nav-links {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      transform: translateY(-8px);
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      padding: 8px 20px 20px;
      background: rgba(7, 22, 28, 0.98);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
    }

    .aur-nav-links.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    .aur-nav-link {
      padding: 14px 4px;
    }

    .aur-nav-cta.mobile {
      display: inline-flex;
      justify-content: center;
      margin-top: 10px;
      width: 100%;
    }
  }

  @media (min-width: 901px) {
    .aur-nav-cta.mobile {
      display: none;
    }
  }
`

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const ids = ['home', 'about', 'products', 'contact']
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      const y = window.scrollY + 140
      let current = '#home'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) current = `#${id}`
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`aur-nav${scrolled ? ' scrolled' : ''}`}>
      <style>{CSS}</style>
      <div className="aur-nav-inner">
        <a href="#home" className="aur-nav-brand" onClick={close}>
          <img src="/logo.jpeg" alt="Aurentis Lifesciences LLP" className="aur-nav-logo" />
        </a>

        <nav className={`aur-nav-links${open ? ' open' : ''}`}>
          {content.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`aur-nav-link${active === link.href ? ' active' : ''}`}
              onClick={close}
            >
              {link.label}
              {active === link.href ? <span className="aur-nav-indicator" /> : null}
            </a>
          ))}
          <a href={content.nav.phoneHref} className="aur-nav-cta mobile" onClick={close}>
            <PhoneIcon />
            {content.nav.cta}
          </a>
        </nav>

        <a href={content.nav.phoneHref} className="aur-nav-cta desktop">
          <PhoneIcon />
          {content.nav.cta}
        </a>

        <button
          className={`aur-nav-toggle${open ? ' open' : ''}`}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
