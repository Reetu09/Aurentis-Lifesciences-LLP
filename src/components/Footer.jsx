import { useEffect } from 'react'
import content from '../data/content.json'

const CSS = `
  .aur-partner {
    position: relative;
    background: #1D3651;
    color: #ffffff;
    padding: 56px 0 40px;
    scroll-margin-top: 88px;
  }

  .aur-partner::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }

  .aur-partner-grid {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 48px;
    align-items: start;
  }

  .aur-partner-logo {
    height: 46px;
    width: auto;
    border-radius: 8px;
    background: #ffffff;
    margin-bottom: 16px;
  }

  .aur-partner .aur-partner-grid h2 {
    font-family: var(--font-display);
    font-size: clamp(22px, 2.1vw, 28px);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin-bottom: 14px;
    max-width: 560px;
    overflow-wrap: break-word;
  }

  .aur-partner .aur-partner-grid h3 {
    font-family: var(--font-display);
    font-size: clamp(17px, 1.6vw, 20px);
    font-weight: 600;
    color: var(--gold-light);
    margin-bottom: 10px;
    line-height: 1.3;
  }

  .aur-partner-copy {
    color: rgba(255, 255, 255, 0.86);
    font-size: 14px;
    line-height: 1.7;
    max-width: 560px;
    overflow-wrap: break-word;
  }

  .aur-contact-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .aur-contact-row {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    color: rgba(255, 255, 255, 0.86);
    font-size: 14px;
    line-height: 1.6;
    min-width: 0;
  }

  .aur-contact-row svg {
    min-width: 18px;
    margin-top: 2px;
    stroke: var(--gold);
    fill: none;
    stroke-width: 1.7;
  }

  .aur-contact-row a {
    overflow-wrap: anywhere;
  }

  .aur-contact-row a:hover {
    color: var(--light-teal);
  }

  .aur-contact-text {
    min-width: 0;
    overflow-wrap: break-word;
  }

  .aur-contact-text b {
    display: block;
    color: #ffffff;
    font-weight: 600;
    margin-bottom: 2px;
  }

  .aur-footer {
    background: #1D3651;
    color: rgba(255, 255, 255, 0.72);
    border-top: 1px solid rgba(161, 124, 45, 0.35);
    padding: 16px 24px 20px;
  }

  .aur-footer p {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    font-size: 13px;
    line-height: 1.6;
    overflow-wrap: break-word;
  }

  @media (max-width: 980px) {
    .aur-partner {
      padding: 72px 0 40px;
    }

    .aur-partner-grid {
      grid-template-columns: 1fr;
      gap: 32px;
      padding: 0 24px;
    }
  }

  @media (max-width: 640px) {
    .aur-partner {
      padding: 64px 0 32px;
    }

    .aur-partner-grid {
      padding: 0 16px;
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

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </svg>
  )
}

export default function Footer() {
  useEffect(() => {
    injectStyles('aurentis-footer-styles', CSS)
  }, [])

  const contact = content.contact
  // "Haryana - 121003" ko "Haryana 121003" bana deta hai taaki line "-" par na toote
  const address = contact.address.replace(/\s*-\s*(\d{6})/, ' $1')

  return (
    <>
      <section className="aur-partner" id="contact">
        <div className="aur-partner-grid">
          <div>
            <img src="/logo.jpeg" alt="Aurentis Lifesciences" height="46" className="aur-partner-logo" />
            <h2>{contact.heading}</h2>
            <h3>{contact.partnerHeading}</h3>
            <p className="aur-partner-copy">{contact.partnerText}</p>
          </div>

          <div>
            <h3>{contact.infoHeading}</h3>
            <div className="aur-contact-list">
              <div className="aur-contact-row">
                <PinIcon />
                <span className="aur-contact-text">
                  <b>{contact.addressLabel}:</b>
                  {address}
                </span>
              </div>
              <div className="aur-contact-row">
                <PhoneIcon />
                <span className="aur-contact-text">
                  <b>{contact.phoneLabel}:</b>
                  <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                </span>
              </div>
              <div className="aur-contact-row">
                <MailIcon />
                <span className="aur-contact-text">
                  <b>{contact.emailLabel}:</b>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="aur-footer">
        <p>&copy; {new Date().getFullYear()} Aurentis Lifesciences LLP. All rights reserved.</p>
      </footer>
    </>
  )
}