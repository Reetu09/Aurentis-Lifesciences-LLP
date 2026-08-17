import { useEffect } from 'react'
import content from '../data/content.json'

const CSS = `
  .aur-footer {
    background: linear-gradient(180deg, #0A2328, #1B4A52);
    color: #ffffff;
    position: relative;
    padding: 72px 64px 0;
  }

  .aur-footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }

  .aur-footer-grid {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.4fr 0.8fr 1fr;
    gap: 48px;
    padding-bottom: 40px;
  }

  .aur-footer-logo {
    height: 50px;
    width: auto;
    border-radius: 8px;
    background: #ffffff;
    margin-bottom: 16px;
  }

  .aur-footer-tagline {
    display: block;
    font-style: italic;
    color: var(--gold);
    margin-bottom: 14px;
    font-size: 15px;
  }

  .aur-footer-desc {
    color: rgba(247, 249, 249, 0.7);
    font-size: 14px;
    line-height: 1.75;
    max-width: 420px;
    margin-bottom: 18px;
  }

  .aur-gstin {
    display: inline-block;
    padding: 8px 14px;
    border: 1px solid var(--gold);
    border-radius: 8px;
    color: var(--gold-light);
    font-size: 12px;
    letter-spacing: 0.06em;
  }

  .aur-footer h4 {
    font-family: var(--font-display);
    font-size: 20px;
    margin-bottom: 18px;
    color: var(--gold-light);
  }

  .aur-footer-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .aur-footer-links a {
    color: rgba(247, 249, 249, 0.78);
    font-size: 14px;
    transition: color 0.2s ease;
  }

  .aur-footer-links a:hover {
    color: var(--light-teal);
  }

  .aur-contact-row {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    margin-bottom: 14px;
    color: rgba(247, 249, 249, 0.78);
    font-size: 14px;
    line-height: 1.6;
  }

  .aur-contact-row svg {
    min-width: 18px;
    margin-top: 2px;
    stroke: var(--gold);
    fill: none;
    stroke-width: 1.7;
  }

  .aur-contact-row a:hover {
    color: var(--light-teal);
  }

  .aur-footer-bottom {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    padding: 18px 0 24px;
    border-top: 1px solid rgba(42, 157, 143, 0.2);
    font-size: 12px;
    color: rgba(247, 249, 249, 0.5);
  }

  @media (max-width: 980px) {
    .aur-footer {
      padding: 56px 24px 0;
    }

    .aur-footer-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }
`

function injectStyles(id, css) {
  let style = document.getElementById(id)
  if (!style) {
    style = document.createElement('style')
    style.id = id
    document.head.appendChild(style)
  }
  style.textContent = css
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M7 3h3l1.2 4.2-2 1.2a12 12 0 0 0 6.4 6.4l1.2-2L21 14v3a2 2 0 0 1-2.2 2A16 16 0 0 1 5 5.2 2 2 0 0 1 7 3z" />
    </svg>
  )
}

export default function Footer() {
  useEffect(() => {
    injectStyles('aurentis-footer-styles', CSS)
  }, [])

  return (
    <footer className="aur-footer" id="contact">
      <div className="aur-footer-grid">
        <div>
          <img src="/logo.jpeg" alt="" height="50" className="aur-footer-logo" />
          <em className="aur-footer-tagline">{content.footer.tagline}</em>
          <p className="aur-footer-desc">{content.footer.description}</p>
          <div className="aur-gstin">
            {content.footer.gstinLabel}: {content.footer.gstin}
          </div>
        </div>

        <div>
          <h4>{content.footer.quickHeading}</h4>
          <div className="aur-footer-links">
            {content.footer.links.quick.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </div>
        </div>

        <div>
          <h4>{content.footer.contactHeading}</h4>
          <div className="aur-contact-row">
            <PinIcon />
            <span>{content.footer.address}</span>
          </div>
          {content.footer.phones.map((phone) => (
            <div className="aur-contact-row" key={phone}>
              <PhoneIcon />
              <a href={`tel:${phone}`}>{phone}</a>
            </div>
          ))}
        </div>
      </div>

      <div className="aur-footer-bottom">
        <span>{content.footer.copyright}</span>
        <span>{content.footer.designed}</span>
      </div>
    </footer>
  )
}
