import { useEffect, useRef } from 'react'
import content from '../data/content.json'

const CSS = `
  .pr {
    background: #ffffff;
    color: #1C2B27;
    padding: 78px 0 72px;
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

  .pr h2 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(32px, 4vw, 46px);
    letter-spacing: -0.025em;
    color: #17241F;
    line-height: 1.2;
    overflow-wrap: break-word;
  }

  .pr-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    margin-top: 36px;
  }

  .pr-card {
    min-width: 0;
    background: #ffffff;
    border: 1px solid #e7eeeb;
    border-radius: 22px;
    padding: 28px 24px;
    box-shadow: 0 8px 24px rgba(16, 40, 36, 0.035);
    opacity: 0;
    transform: translateY(16px);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .pr.in .pr-card {
    animation: prUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .pr-card:hover {
    box-shadow: 0 16px 36px rgba(16, 40, 36, 0.08);
  }

  .pr-field + .pr-field {
    margin-top: 18px;
  }

  .pr-label {
    display: block;
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #1A3C34;
  }

  .pr-name {
    display: block;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(26px, 2.4vw, 34px);
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: #16241F;
    overflow-wrap: break-word;
  }

  .pr-value {
    display: block;
    font-size: 15.5px;
    line-height: 1.6;
    color: #1C2B27;
    overflow-wrap: break-word;
  }

  @keyframes prUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .pr-head,
    .pr-card {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }

  @media (max-width: 760px) {
    .pr {
      padding: 64px 0 48px;
    }

    .pr-shell {
      padding: 0 18px;
    }

    .pr-grid {
      grid-template-columns: 1fr;
    }

    .pr-card {
      padding: 22px 18px;
    }
  }
`

export default function Products() {
  const wrapRef = useRef(null)
  const { labels, items, heading } = content.products

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

  return (
    <section className="pr" id="products" ref={wrapRef}>
      <style>{CSS}</style>
      <div className="pr-shell">
        <header className="pr-head">
          <h2>{heading}</h2>
        </header>

        <div className="pr-grid">
          {items.map((item, index) => (
            <article className="pr-card" key={item.name} style={{ animationDelay: `${0.08 + index * 0.1}s` }}>
              <p className="pr-field">
                <span className="pr-label">{labels.name}:</span>
                <span className="pr-name">{item.name}</span>
              </p>
              <p className="pr-field">
                <span className="pr-label">{labels.category}:</span>
                <span className="pr-value">{item.category}</span>
              </p>
              <p className="pr-field">
                <span className="pr-label">{item.compositionLabel}:</span>
                <span className="pr-value">{item.composition}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
