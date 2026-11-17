import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import content from '../data/content.json'

const CSS = `
  .aur-nav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 800;
    padding: 0 20px;
    pointer-events: none;
  }

  .aur-nav-inner {
    position: relative;
    pointer-events: auto;
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-height: 0;
    padding: 4px 14px 8px 18px;
    border-radius: 0 0 40px 40px;
    border-top: 0;
    background: rgba(29, 54, 81, 0.9);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.24), inset 0 -1px 0 rgba(161, 124, 45, 0.35);
    transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
  }

  .aur-nav.scrolled .aur-nav-inner {
    background: rgba(29, 54, 81, 0.98);
    border-color: rgba(161, 124, 45, 0.5);
    box-shadow: 0 16px 38px rgba(0, 0, 0, 0.34), inset 0 -1px 0 rgba(161, 124, 45, 0.5);
  }

  .aur-nav-brand {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border-radius: 999px;
    padding: 3px 18px;
    height: 70px;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
  }

  .aur-nav-logo {
    height: 62px;
    width: auto;
    display: block;
    border-radius: 0;
    mix-blend-mode: multiply;
    transform: scale(1.45);
    transform-origin: center;
  }

  .aur-nav-links {
    display: flex;
    align-items: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    gap: 4px;
    padding: 4px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .aur-nav-link {
    position: relative;
    isolation: isolate;
    font-size: 12.5px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.92);
    padding: 10px 20px;
    border-radius: 999px;
    transition: color 0.25s ease, background 0.25s ease;
  }

  .aur-nav-link:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08);
  }

  .aur-nav-link.active {
    color: #ffffff;
    font-weight: 600;
  }

  .aur-nav-link.active:hover {
    background: transparent;
  }

  .aur-nav-indicator {
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 999px;
    background: linear-gradient(180deg, #B8923A 0%, #A17C2D 50%, #86661F 100%);
    box-shadow: 0 6px 16px rgba(161, 124, 45, 0.4);
    pointer-events: none;
    animation: navIndicatorIn 0.35s ease;
  }

  .aur-nav-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 22px;
    background: #ffffff;
    color: #1D3651;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.02em;
    border-radius: 999px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
    transition: transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease;
  }

  .aur-nav-cta svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: #A17C2D;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .aur-nav-cta:hover {
    transform: translateY(-1px);
    filter: brightness(0.97);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
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
    background: rgba(255, 255, 255, 0.06);
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
    from { opacity: 0; transform: scale(0.85); }
    to { opacity: 1; transform: scale(1); }
  }

  @media (max-width: 900px) {
    .aur-nav {
      padding: 10px 14px 0;
    }

    .aur-nav {
      padding: 0 12px;
    }

    .aur-nav-inner {
      min-height: 0;
      padding: 4px 10px 7px 12px;
      border-radius: 0 0 28px 28px;
    }

    .aur-nav-brand {
      height: 58px;
      padding: 2px 14px;
    }

    .aur-nav-logo {
      height: 50px;
    }

    .aur-nav-toggle {
      display: flex;
      margin-left: auto;
    }

    .aur-nav-cta.desktop {
      display: none;
    }

    .aur-nav-links {
      position: absolute;
      top: calc(100% + 10px);
      left: 0;
      right: 0;
      transform: translateY(-8px);
      flex-direction: column;
      align-items: stretch;
      gap: 4px;
      padding: 12px;
      border-radius: 24px;
      background: rgba(29, 54, 81, 0.98);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(161, 124, 45, 0.5);
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
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
      padding: 14px 18px;
      border-radius: 16px;
    }

    .aur-nav-indicator {
      border-radius: 16px;
    }

    .aur-nav-cta.mobile {
      display: inline-flex;
      justify-content: center;
      margin-top: 8px;
      width: 100%;
    }
  }

  @media (min-width: 901px) {
    .aur-nav-cta.mobile {
      display: none;
    }
  }

  @media (min-width: 901px) and (max-width: 1060px) {
    .aur-nav-link {
      padding: 10px 14px;
      letter-spacing: 0.1em;
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

const SECTION_IDS = ['home', 'about', 'products']

export default function Navbar() {
  const { pathname } = useLocation()
  const onContact = pathname === '/contact'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(onContact ? '/contact' : '#home')
  const headerRef = useRef(null)
  const lockUntil = useRef(0)

  // navbar sticky nahi hai, isliye section ke top par scroll karte waqt offset nahi chahiye
  const navHeight = () => 0

  // section ka top edge navbar ke bilkul neeche aaye
  const targetTop = (el) =>
    Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - navHeight()))

  const scrollToId = useCallback((id, smooth = true) => {
    const el = document.getElementById(id)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    lockUntil.current = Date.now() + 1100
    setActive(`#${id}`)
    window.scrollTo({ top: targetTop(el), behavior: smooth && !reduce ? 'smooth' : 'auto' })
    // images/animations se layout badle to position dobara theek karo
    const fix = () => {
      const t = targetTop(el)
      if (Math.abs(window.scrollY - t) > 2) window.scrollTo({ top: t, behavior: 'auto' })
    }
    window.setTimeout(fix, 700)
    window.setTimeout(fix, 1250)
    if (window.history?.replaceState) window.history.replaceState(window.history.state, '', `#${id}`)
  }, [])

  // active link: scroll par bhi navbar height ke hisab se
  useEffect(() => {
    if (onContact) {
      setActive('/contact')
      const onScroll = () => setScrolled(window.scrollY > 16)
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      return () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
      }
    }

    const update = () => {
      const line = window.scrollY + navHeight() + 40
      let current = '#home'
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= line) current = `#${id}`
      }
      setActive(current)
    }
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      if (Date.now() < lockUntil.current) return
      update()
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const settle = window.setInterval(() => {
      if (Date.now() >= lockUntil.current) update()
    }, 400)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.clearInterval(settle)
    }
  }, [onContact])

  // sabhi "#section" links (navbar + hero buttons) ek hi sahi scroll se chalein
  useEffect(() => {
    if (onContact) return undefined

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target.closest?.('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href').slice(1)
      if (!id || !document.getElementById(id)) return
      event.preventDefault()
      scrollToId(id)
    }
    document.addEventListener('click', onClick)

    const hash = window.location.hash.slice(1)
    let timer = 0
    if (hash && document.getElementById(hash)) {
      timer = window.setTimeout(() => scrollToId(hash, false), 350)
    }
    return () => {
      document.removeEventListener('click', onClick)
      window.clearTimeout(timer)
    }
  }, [scrollToId, onContact])

  const close = () => setOpen(false)

  return (
    <header className={`aur-nav${scrolled ? ' scrolled' : ''}`} ref={headerRef}>
      <style>{CSS}</style>
      <div className="aur-nav-inner">
        {onContact ? (
          <Link to="/#home" className="aur-nav-brand" onClick={close}>
            <img src="/logo.jpeg" alt="Aurentis Lifesciences LLP logo" className="aur-nav-logo" />
          </Link>
        ) : (
          <a href="#home" className="aur-nav-brand" onClick={close}>
            <img src="/logo.jpeg" alt="Aurentis Lifesciences LLP logo" className="aur-nav-logo" />
          </a>
        )}

        <nav className={`aur-nav-links${open ? ' open' : ''}`}>
          {content.nav.links.map((link) => {
            const isActive = onContact ? link.href === '/contact' : active === link.href
            const className = `aur-nav-link${isActive ? ' active' : ''}`
            const label = (
              <>
                {link.label}
                {isActive ? <span className="aur-nav-indicator" /> : null}
              </>
            )
            if (link.href.startsWith('/') || onContact) {
              const to = link.href.startsWith('#') ? `/${link.href}` : link.href
              return (
                <Link key={link.href} to={to} className={className} onClick={close}>
                  {label}
                </Link>
              )
            }
            return (
              <a key={link.href} href={link.href} className={className} onClick={close}>
                {label}
              </a>
            )
          })}
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