import { useLayoutEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Seo from '../components/Seo'
import { CONTACT_DESCRIPTION, CONTACT_TITLE } from '../site.js'

// Submissions are handled by Netlify Forms. There is no backend in this project.
// The notification email is configured in the Netlify dashboard
// (Forms > Settings > Form notifications > Email: aurentislifesciences@gmail.com),
// not in this file.

const CSS = `
  .aur-page {
    background: #FFFFFF;
    color: #1D3651;
    min-height: 100vh;
    padding: 95px 0 28px;
  }

  .aur-page-inner {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .aur-page-head {
    max-width: 520px;
    margin: 0 auto;
    text-align: center;
  }

  .aur-page-head h1 {
    margin: 0;
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: #1D3651;
  }

  .aur-page-rule {
    display: block;
    width: 40px;
    height: 2px;
    margin: 8px auto 10px;
    background: #A17C2D;
  }

  .aur-page-head p {
    max-width: 420px;
    margin: 0 auto 20px;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(29, 54, 81, 0.72);
  }

  .aur-card {
    position: relative;
    max-width: 520px;
    margin: 0 auto;
    padding: 18px 16px;
    background: #FFFFFF;
    border: 1px solid rgba(29, 54, 81, 0.14);
    border-radius: 16px;
    box-shadow: 0 16px 40px rgba(29, 54, 81, 0.1);
  }

  .aur-card:has(.aur-thanks) {
    padding: 24px;
  }

  .aur-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .aur-field {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .aur-field label {
    margin-bottom: 5px;
    font-size: 12.5px;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: 0.04em;
    color: #1D3651;
  }

  .aur-field input,
  .aur-field textarea {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(29, 54, 81, 0.22);
    border-radius: 10px;
    background: #FFFFFF;
    color: #1D3651;
    font-family: inherit;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .aur-field input {
    height: 42px;
    padding: 0 14px;
    line-height: 40px;
  }

  .aur-field textarea {
    min-height: 96px;
    padding: 11px 14px;
    line-height: 1.45;
    resize: vertical;
  }

  .aur-field input:focus,
  .aur-field textarea:focus {
    border-color: #A17C2D;
    box-shadow: 0 0 0 3px rgba(161, 124, 45, 0.18);
  }

  .aur-field input[aria-invalid="true"],
  .aur-field textarea[aria-invalid="true"] {
    border-color: #A17C2D;
  }

  .aur-error {
    margin: 4px 0 0;
    font-size: 12px;
    line-height: 1.3;
    color: #A17C2D;
  }

  .aur-banner {
    margin: 0 0 12px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid rgba(161, 124, 45, 0.45);
    background: rgba(161, 124, 45, 0.1);
    color: #1D3651;
    font-size: 13px;
    line-height: 1.4;
  }

  .aur-send {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    height: 42px;
    margin-top: 4px;
    padding: 0 26px;
    border: none;
    border-radius: 999px;
    background: linear-gradient(180deg, #B8923A 0%, #A17C2D 50%, #86661F 100%);
    color: #FFFFFF;
    font-family: inherit;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.04em;
    box-shadow: 0 6px 16px rgba(161, 124, 45, 0.4);
    cursor: pointer;
    transition: transform 0.2s ease, filter 0.2s ease;
  }

  .aur-send:hover:not(:disabled) {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }

  .aur-send:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(161, 124, 45, 0.18), 0 6px 16px rgba(161, 124, 45, 0.4);
  }

  .aur-send:disabled {
    opacity: 0.72;
    cursor: not-allowed;
  }

  .aur-thanks {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0;
  }

  .aur-thanks-icon {
    display: block;
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
  }

  .aur-thanks-title {
    margin: 0 0 6px;
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 600;
    line-height: 1.2;
    color: #1D3651;
  }

  .aur-thanks-text {
    margin: 0 0 14px;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(29, 54, 81, 0.72);
  }

  .aur-hp {
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 1px;
    margin: 0;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (min-width: 641px) {
    .aur-page-head h1 {
      font-size: clamp(24px, 2.6vw, 30px);
    }

    .aur-card {
      padding: 24px;
    }

    .aur-form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 12px;
      row-gap: 14px;
    }

    .aur-field:nth-child(1),
    .aur-field:nth-child(4),
    .aur-send {
      grid-column: 1 / -1;
    }

    .aur-send {
      width: auto;
      justify-self: start;
    }

    .aur-thanks .aur-send {
      justify-self: center;
    }
  }

  @media (min-width: 901px) {
    .aur-page {
      padding-top: 120px;
    }
  }
`

const EMPTY = { name: '', email: '', phone: '', message: '' }

function fieldErrors(values) {
  const errors = {}
  if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  const phone = values.phone.trim()
  const digits = phone.replace(/\D/g, '')
  if (!/^\+?[\d\s-]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
    errors.phone = 'Enter a phone number with 7 to 15 digits. +, spaces, and dashes are allowed.'
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }
  return errors
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [bot, setBot] = useState('')
  const [touched, setTouched] = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [serverError, setServerError] = useState('')
  const sending = useRef(false)

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  const errors = fieldErrors(values)
  const visibleError = (field) => (touched[field] || submitAttempted ? errors[field] : '')

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  function markTouched(field) {
    setTouched((current) => ({ ...current, [field]: true }))
  }

  function resetForm() {
    setValues(EMPTY)
    setBot('')
    setTouched({})
    setSubmitAttempted(false)
    setSubmitting(false)
    setSucceeded(false)
    setServerError('')
    sending.current = false
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitAttempted(true)
    setServerError('')
    if (Object.keys(fieldErrors(values)).length > 0 || sending.current) return

    sending.current = true
    setSubmitting(true)
    try {
      const body = new URLSearchParams({
        'form-name': 'contact',
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
        'bot-field': bot,
      }).toString()
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      if (!response.ok) throw new Error('Form request failed')
      setSucceeded(true)
    } catch {
      setServerError('Something went wrong and your message was not sent. Please try again.')
    } finally {
      sending.current = false
      setSubmitting(false)
    }
  }

  return (
    <>
      <style>{CSS}</style>
      <Seo title={CONTACT_TITLE} description={CONTACT_DESCRIPTION} path="/contact" />
      <Navbar />
      <main className="aur-page">
        <div className="aur-page-inner">
          <header className="aur-page-head">
            <h1>Contact Us</h1>
            <span className="aur-page-rule" aria-hidden="true" />
            <p>Send us your query and our team will get back to you.</p>
          </header>

          <div className="aur-card">
            {succeeded ? (
              <div className="aur-thanks" role="status">
                <svg className="aur-thanks-icon" viewBox="0 0 40 40" aria-hidden="true">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="#A17C2D" strokeWidth="1.5" />
                  <path d="M12 20.5l5 5 11-11" fill="none" stroke="#1D3651" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="aur-thanks-title">Thank you!</p>
                <p className="aur-thanks-text">Your message has been sent. We'll contact you soon.</p>
                <button type="button" className="aur-send" onClick={resetForm}>
                  Send another message
                </button>
              </div>
            ) : (
              <>
                {serverError ? (
                  <p className="aur-banner" role="alert">{serverError}</p>
                ) : null}
                <form
                  name="contact"
                  method="POST"
                  action="/"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="aur-hp" aria-hidden="true">
                    <label>
                      Do not fill this out
                      <input
                        type="text"
                        name="bot-field"
                        tabIndex={-1}
                        autoComplete="off"
                        value={bot}
                        onChange={(event) => setBot(event.target.value)}
                      />
                    </label>
                  </div>

                  <div className="aur-form">
                    <div className="aur-field">
                      <label htmlFor="contact-name">Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        aria-invalid={visibleError('name') ? 'true' : 'false'}
                        aria-describedby={visibleError('name') ? 'contact-name-error' : undefined}
                        onBlur={() => markTouched('name')}
                        onChange={(event) => update('name', event.target.value)}
                      />
                      {visibleError('name') ? (
                        <p className="aur-error" id="contact-name-error">{visibleError('name')}</p>
                      ) : null}
                    </div>

                    <div className="aur-field">
                      <label htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        aria-invalid={visibleError('email') ? 'true' : 'false'}
                        aria-describedby={visibleError('email') ? 'contact-email-error' : undefined}
                        onBlur={() => markTouched('email')}
                        onChange={(event) => update('email', event.target.value)}
                      />
                      {visibleError('email') ? (
                        <p className="aur-error" id="contact-email-error">{visibleError('email')}</p>
                      ) : null}
                    </div>

                    <div className="aur-field">
                      <label htmlFor="contact-phone">Phone Number</label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        value={values.phone}
                        aria-invalid={visibleError('phone') ? 'true' : 'false'}
                        aria-describedby={visibleError('phone') ? 'contact-phone-error' : undefined}
                        onBlur={() => markTouched('phone')}
                        onChange={(event) => update('phone', event.target.value)}
                      />
                      {visibleError('phone') ? (
                        <p className="aur-error" id="contact-phone-error">{visibleError('phone')}</p>
                      ) : null}
                    </div>

                    <div className="aur-field">
                      <label htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={values.message}
                        aria-invalid={visibleError('message') ? 'true' : 'false'}
                        aria-describedby={visibleError('message') ? 'contact-message-error' : undefined}
                        onBlur={() => markTouched('message')}
                        onChange={(event) => update('message', event.target.value)}
                      />
                      {visibleError('message') ? (
                        <p className="aur-error" id="contact-message-error">{visibleError('message')}</p>
                      ) : null}
                    </div>

                    <button type="submit" className="aur-send" disabled={submitting}>
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
