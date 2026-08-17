import { useEffect, useState } from 'react'
import content from '../data/content.json'

const CSS = `
  .aur-products {
    background: #ffffff;
    color: var(--dark-teal);
    padding: 96px 64px;
  }

  .aur-products-head {
    text-align: center;
    max-width: 680px;
    margin: 0 auto 36px;
  }

  .aur-products-badge {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid var(--mid-teal);
    color: var(--mid-teal);
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .aur-products h2 {
    font-family: var(--font-display);
    font-size: 40px;
    margin-bottom: 14px;
  }

  .aur-products-sub {
    color: var(--gray-600);
    font-size: 15px;
    line-height: 1.75;
  }

  .aur-filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 40px;
  }

  .aur-filter {
    padding: 9px 16px;
    border-radius: 999px;
    border: 1px solid rgba(90, 122, 126, 0.35);
    color: var(--gray-600);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    background: transparent;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }

  .aur-filter.active {
    background: var(--dark-teal);
    border-color: var(--dark-teal);
    color: #ffffff;
  }

  .aur-product-grid {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }

  .aur-product {
    position: relative;
    background: var(--off-white);
    border: 1px solid var(--pale-teal);
    border-radius: 24px;
    padding: 28px 24px 22px;
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .aur-product::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--mid-teal), var(--gold));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .aur-product:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(27, 74, 82, 0.12);
  }

  .aur-product:hover::before {
    transform: scaleX(1);
  }

  .aur-product-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 5px 10px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #ffffff;
  }

  .aur-product-badge.bestseller { background: var(--gold); color: var(--dark-teal); }
  .aur-product-badge.new { background: var(--mid-teal); }
  .aur-product-badge.popular { background: var(--dark-teal); }

  .aur-product-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: linear-gradient(160deg, var(--mid-teal), var(--dark-teal));
    display: grid;
    place-items: center;
    margin-bottom: 18px;
    color: #ffffff;
  }

  .aur-product-cat {
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--mid-teal);
    font-weight: 600;
    margin-bottom: 8px;
  }

  .aur-product h3 {
    font-family: var(--font-display);
    font-size: 22px;
    margin-bottom: 10px;
  }

  .aur-product p {
    font-size: 14px;
    line-height: 1.7;
    color: var(--gray-600);
    margin-bottom: 16px;
    min-height: 72px;
  }

  .aur-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 18px;
  }

  .aur-tag {
    padding: 5px 10px;
    border-radius: 999px;
    background: var(--pale-teal);
    color: var(--dark-teal);
    font-size: 11px;
    font-weight: 600;
  }

  .aur-enquire {
    display: block;
    width: 100%;
    text-align: center;
    padding: 12px 16px;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--mid-teal), var(--dark-teal));
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
  }

  @media (max-width: 980px) {
    .aur-products {
      padding: 72px 24px;
    }

    .aur-products h2 {
      font-size: 30px;
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

function FlaskIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M9 3h6M10 3v6L6 18a3 3 0 0 0 2.6 4h6.8A3 3 0 0 0 18 18l-4-9V3" />
    </svg>
  )
}

function badgeClass(badge) {
  const key = badge.toLowerCase()
  if (key === 'bestseller') return 'bestseller'
  if (key === 'new') return 'new'
  if (key === 'popular') return 'popular'
  return ''
}

export default function Products() {
  const [filter, setFilter] = useState(content.products.filters[0])

  useEffect(() => {
    injectStyles('aurentis-products-styles', CSS)
  }, [])

  const items = content.products.items.filter(
    (item) => filter === 'All' || item.category === filter
  )

  return (
    <section className="aur-products" id="products">
      <div className="aur-products-head">
        <span className="aur-products-badge">{content.products.badge}</span>
        <h2>{content.products.heading}</h2>
        <p className="aur-products-sub">{content.products.subheading}</p>
      </div>

      <div className="aur-filters">
        {content.products.filters.map((tab) => (
          <button
            key={tab}
            className={`aur-filter${filter === tab ? ' active' : ''}`}
            onClick={() => setFilter(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="aur-product-grid">
        {items.map((item) => (
          <article className="aur-product" key={item.id}>
            {item.badge ? (
              <span className={`aur-product-badge ${badgeClass(item.badge)}`}>{item.badge}</span>
            ) : null}
            <div className="aur-product-icon">
              <FlaskIcon />
            </div>
            <div className="aur-product-cat">{item.category}</div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="aur-tags">
              {item.tags.map((tag) => (
                <span className="aur-tag" key={tag}>{tag}</span>
              ))}
            </div>
            <a className="aur-enquire" href="#contact">{content.products.cta}</a>
          </article>
        ))}
      </div>
    </section>
  )
}
