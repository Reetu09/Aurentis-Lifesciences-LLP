import { useEffect, useState } from 'react'
import content from '../data/content.json'

const CSS = `
  .aur-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 800;
    transition: background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease;
    background: transparent;
  }

  .aur-nav.scrolled {
    background: rgba(27, 74, 82, 0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 8px 32px rgba(10, 35, 40, 0.28);
  }

  .aur-nav-inner {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 64px;
  }

  .aur-nav-logo {
    height: 50px;
    width: auto;
    border-radius: 8px;
    background: #ffffff;
  }

  .aur-nav-links {
    display: flex;
    align-items: center;
    gap: 36px;
  }

  .aur-nav-link {
    position: relative;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #ffffff;
    padding-bottom: 4px;
    transition: color 0.25s ease;
  }

  .aur-nav-link::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.5px;
    background: var(--light-teal);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .aur-nav-link:hover::after {
    transform: scaleX(1);
  }

  .aur-nav-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 22px;
    background: var(--gold);
    color: var(--dark-teal);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.06em;
    border-radius: 999px;
    transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  }

  .aur-nav-cta:hover {
    background: var(--gold-light);
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(201, 168, 76, 0.35);
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

  @media (max-width: 860px) {
    .aur-nav-inner {
      padding: 12px 24px;
    }

    .aur-nav-toggle {
      display: flex;
    }

    .aur-nav-links {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      padding: 12px 24px 20px;
      background: rgba(27, 74, 82, 0.97);
      backdrop-filter: blur(16px);
      transform: translateY(-8px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
    }

    .aur-nav-links.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    .aur-nav-link,
    .aur-nav-cta {
      padding: 14px 4px;
    }

    .aur-nav-cta {
      text-align: center;
      margin-top: 8px;
    }
  }
`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.getElementById('aurentis-navbar-styles')?.remove()
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`aur-nav${scrolled ? ' scrolled' : ''}`}>
      <style>{CSS}</style>
      <div className="aur-nav-inner">
        <a href="#home" onClick={close}>
          <img src="/logo.jpeg" alt="" height="50" className="aur-nav-logo" />
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

        <nav className={`aur-nav-links${open ? ' open' : ''}`}>
          {content.nav.links.map((link) => (
            <a key={link.href} href={link.href} className="aur-nav-link" onClick={close}>
              {link.label}
            </a>
          ))}
          <a href={`tel:${content.footer.phones[0]}`} className="aur-nav-cta" onClick={close}>
            {content.nav.cta}
          </a>
        </nav>
      </div>
    </header>
  )
}
