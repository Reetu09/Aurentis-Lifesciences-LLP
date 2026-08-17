import content from '../data/content.json'

const CSS = `
  .ab-wrap {
    background: #F7F9F9;
    position: relative;
  }

  .ab-wrap::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #2A9D8F, transparent);
  }

  .ab-a {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 40px 0;
    display: grid;
    grid-template-columns: 55% 45%;
    gap: 48px;
    align-items: center;
  }

  .ab-badge {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid rgba(42, 157, 143, 0.3);
    color: #2A9D8F;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 18px;
  }

  .ab-h2 {
    font-family: 'Playfair Display', serif;
    font-size: 52px;
    font-weight: 400;
    line-height: 1.12;
    color: #1B4A52;
    margin-bottom: 16px;
  }

  .ab-h2-accent {
    display: block;
    font-weight: 700;
    background: linear-gradient(135deg, #2A9D8F, #4DB8AC);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  .ab-line {
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #2A9D8F, #C9A84C);
    margin-bottom: 24px;
  }

  .ab-desc {
    color: #5A7A7E;
    font-size: 15px;
    line-height: 1.8;
    max-width: 440px;
  }

  .ab-stats {
    background: #ffffff;
    border-radius: 24px;
    padding: 32px;
    border: 1px solid #D4E0DF;
    box-shadow: 0 4px 24px rgba(27, 74, 82, 0.06);
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .ab-stat {
    text-align: center;
    padding: 16px 12px;
    position: relative;
  }

  .ab-stat:nth-child(odd)::after {
    content: '';
    position: absolute;
    top: 18%;
    right: 0;
    width: 1px;
    height: 64%;
    background: rgba(42, 157, 143, 0.2);
  }

  .ab-stat:nth-child(-n+2) {
    border-bottom: 1px solid rgba(42, 157, 143, 0.2);
  }

  .ab-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
    font-weight: 700;
    line-height: 1.1;
    background: linear-gradient(135deg, #2A9D8F, #4DB8AC);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  .ab-stat-lbl {
    display: block;
    margin-top: 8px;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.4);
  }

  .ab-b {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .ab-value {
    position: relative;
    overflow: hidden;
    background: #ffffff;
    border: 1px solid #D4E0DF;
    border-left: 4px solid #2A9D8F;
    border-radius: 20px;
    padding: 28px 24px;
    transition: 0.3s ease;
  }

  .ab-value:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 40px rgba(27, 74, 82, 0.1);
  }

  .ab-value-icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1B4A52, #2A9D8F);
    display: grid;
    place-items: center;
    margin-bottom: 16px;
  }

  .ab-value-icon svg {
    width: 20px;
    height: 20px;
    stroke: #ffffff;
    fill: none;
    stroke-width: 1.7;
  }

  .ab-value h3 {
    font-size: 15px;
    font-weight: 700;
    color: #1B4A52;
    margin-bottom: 8px;
  }

  .ab-value p {
    font-size: 13px;
    color: #5A7A7E;
    line-height: 1.6;
  }

  .ab-dots {
    position: absolute;
    right: 18px;
    bottom: 16px;
    display: flex;
    gap: 5px;
  }

  .ab-dots span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #2A9D8F;
    opacity: 0.35;
  }

  .ab-dots span:nth-child(2) { opacity: 0.55; }
  .ab-dots span:nth-child(3) { opacity: 0.8; }

  .ab-c {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px 80px;
  }

  .ab-banner {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #1B4A52, #0A2328);
    border-radius: 24px;
    padding: 36px 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
  }

  .ab-glow {
    position: absolute;
    top: -40px;
    right: -40px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: #4DB8AC;
    opacity: 0.15;
    filter: blur(60px);
    pointer-events: none;
  }

  .ab-banner-left {
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    z-index: 1;
  }

  .ab-flask {
    width: 56px;
    height: 56px;
    min-width: 56px;
    border-radius: 14px;
    background: rgba(201, 168, 76, 0.15);
    border: 1px solid rgba(201, 168, 76, 0.3);
    display: grid;
    place-items: center;
    color: #C9A84C;
  }

  .ab-banner h3 {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 6px;
  }

  .ab-banner-sub {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.6;
    max-width: 400px;
  }

  .ab-pills {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .ab-pill {
    border: 1px solid rgba(77, 184, 172, 0.45);
    color: #4DB8AC;
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-align: center;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .ab-a,
    .ab-b,
    .ab-c {
      padding-left: 20px;
      padding-right: 20px;
    }

    .ab-a {
      grid-template-columns: 1fr;
      padding-top: 64px;
      gap: 28px;
    }

    .ab-h2 {
      font-size: 36px;
    }

    .ab-b {
      grid-template-columns: 1fr;
    }

    .ab-banner {
      flex-direction: column;
      align-items: flex-start;
      padding: 28px 24px;
    }
  }
`

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l8 3v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
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

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19c8-1 12-8 13-14-6 1-12 6-13 14z" />
      <path d="M8 16c2-3 5-5 9-6" />
    </svg>
  )
}

function FlaskIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M9 3h6M10 3v6L6 18a3 3 0 0 0 2.6 4h6.8A3 3 0 0 0 18 18l-4-9V3" />
    </svg>
  )
}

const VALUE_ICONS = [ShieldIcon, HeartIcon, LeafIcon]
const EXCELLENCE_PILLS = ['GMP Certified', 'ISO Quality', 'Pan India']

function splitHeading(heading) {
  const [first, ...rest] = heading.split(' ')
  return { first, rest: rest.join(' ') }
}

export default function About() {
  const { first, rest } = splitHeading(content.about.heading)

  return (
    <>
      <style>{CSS}</style>
      <section className="ab-wrap" id="about">
        <div className="ab-a">
          <div>
            <span className="ab-badge">{content.about.badge}</span>
            <h2 className="ab-h2">
              {first}
              {rest ? <span className="ab-h2-accent">{rest}</span> : null}
            </h2>
            <div className="ab-line" />
            <p className="ab-desc">{content.about.description}</p>
          </div>

          <div className="ab-stats">
            {content.about.stats.map((stat) => (
              <div className="ab-stat" key={stat.label}>
                <div className="ab-stat-num">{stat.value}</div>
                <span className="ab-stat-lbl">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ab-b">
          {content.about.values.map((value, i) => {
            const Icon = VALUE_ICONS[i]
            return (
              <article className="ab-value" key={value.title}>
                <div className="ab-value-icon">{Icon ? <Icon /> : null}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
                <div className="ab-dots" aria-hidden="true">
                  <span /><span /><span />
                </div>
              </article>
            )
          })}
        </div>

        <div className="ab-c">
          <div className="ab-banner">
            <div className="ab-glow" />
            <div className="ab-banner-left">
              <div className="ab-flask">
                <FlaskIcon />
              </div>
              <div>
                <h3>{content.about.cardTitle}</h3>
                <p className="ab-banner-sub">{content.about.cardText}</p>
              </div>
            </div>
            <div className="ab-pills">
              {EXCELLENCE_PILLS.map((pill) => (
                <span className="ab-pill" key={pill}>{pill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
