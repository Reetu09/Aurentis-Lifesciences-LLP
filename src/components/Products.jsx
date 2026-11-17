import { useEffect, useRef, useState } from 'react'
import content from '../data/content.json'

const VISUALS = ['/products/aureliv.png', '/products/tocovital.png']

const CSS = `
  .pr {
    position: relative;
    overflow: hidden;
    background: #FFFFFF;
    color: #1D3651;
    scroll-margin-top: 92px;
  }

  .pr-blob {
    position: absolute;
    pointer-events: none;
    z-index: 0;
  }

  .pr-blob-a {
    width: 320px;
    height: 200px;
    top: -50px;
    left: -70px;
    background: radial-gradient(ellipse at 40% 40%, rgba(161, 124, 45, 0.16), transparent 70%);
    animation: prDrift 10s ease-in-out infinite;
  }

  .pr-blob-b {
    width: 420px;
    height: 220px;
    right: -90px;
    bottom: -70px;
    background: radial-gradient(ellipse at 60% 40%, rgba(29, 54, 81, 0.06), transparent 70%);
    animation: prDrift 12s ease-in-out infinite reverse;
  }

  .pr-shell {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 36px 40px 52px;
  }

  /* ---------- heading ---------- */
  .pr h2 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: clamp(28px, 3vw, 38px);
    letter-spacing: -0.03em;
    color: #1D3651;
    text-align: center;
    line-height: 1.1;
    margin: 0;
  }

  .pr-rule {
    display: block;
    width: 64px;
    height: 3px;
    border-radius: 3px;
    background: #A17C2D;
    margin: 12px auto 0;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
  }

  .pr.in .pr-rule {
    transform: scaleX(1);
  }

  /* ---------- grid ---------- */
  .pr-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    margin-top: 32px;
  }

  /* ---------- card ---------- */
  .pr-card {
    position: relative;
    overflow: hidden;
    min-width: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 240px;
    align-items: stretch;
    gap: 20px;
    padding: 28px 24px 28px 32px;
    border-radius: 30px;
    border: 1px solid rgba(29, 54, 81, 0.12);
    background: #FFFFFF;
    box-shadow: 0 14px 34px rgba(29, 54, 81, 0.08);
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease, border-color 0.4s ease;
  }

  .pr-card:hover {
    transform: translateY(-6px);
    border-color: rgba(161, 124, 45, 0.7);
    box-shadow: 0 24px 46px rgba(29, 54, 81, 0.13), 0 0 0 4px rgba(161, 124, 45, 0.1);
  }

  .pr-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #A17C2D;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--d, 0s) + 0.4s);
  }

  .pr.in .pr-card::before {
    transform: scaleX(1);
  }

  .pr-card::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 22%;
    background: linear-gradient(100deg, transparent, rgba(161, 124, 45, 0.1), transparent);
    transform: translateX(-130%);
    animation: prShine 7s ease-in-out calc(var(--d, 0s) + 2.5s) infinite;
    pointer-events: none;
  }

  /* ---------- text ---------- */
  .pr-copy {
    min-width: 0;
    align-self: center;
  }

  .pr-name {
    margin: 0 0 18px;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: clamp(24px, 2.2vw, 29px);
    letter-spacing: -0.02em;
    line-height: 1.2;
    color: #1D3651;
  }

  .pr-name sup {
    position: relative;
    top: 0.02em;
    margin-left: 1px;
    font-size: 0.45em;
    line-height: 0;
    vertical-align: super;
    color: #A17C2D;
  }

  .pr-row + .pr-row {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px dashed rgba(29, 54, 81, 0.18);
  }

  .pr-label {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 4px;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #A17C2D;
  }

  .pr-label::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 2px;
    background: #A17C2D;
    transform: rotate(45deg);
    flex: 0 0 auto;
  }

  .pr-value {
    display: block;
    font-size: 14.5px;
    line-height: 1.55;
    color: #1D3651;
    overflow-wrap: break-word;
  }

  /* ---------- image tile ---------- */
  .pr-tile {
    position: relative;
    overflow: hidden;
    min-height: 260px;
    border-radius: 22px;
    background: #FFFFFF;
    display: grid;
    place-items: center;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.7);
  }

  .pr-ring {
    position: absolute;
    left: 50%;
    top: 56%;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 1px solid rgba(29, 54, 81, 0.16);
    transform: translate(-50%, -50%);
    animation: prRing 4.5s ease-in-out infinite;
  }

  .pr-ring-2 {
    width: 260px;
    height: 260px;
    border-style: dashed;
    border-color: rgba(161, 124, 45, 0.4);
    animation-delay: 1.4s;
  }

  .pr-spark {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #A17C2D;
    box-shadow: 0 0 8px rgba(161, 124, 45, 0.9);
    animation: prSpark 4s ease-in-out infinite;
  }

  .pr-spark-1 { left: 14%; top: 24%; }
  .pr-spark-2 { right: 14%; top: 42%; animation-delay: 1.3s; }
  .pr-spark-3 { left: 22%; bottom: 14%; animation-delay: 2.4s; }

  .pr-float {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    animation: prFloat 5.5s ease-in-out infinite;
  }

  .pr-float img {
    display: block;
    width: 100%;
    height: auto;
    max-height: 230px;
    object-fit: contain;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .pr-card:hover .pr-float img {
    transform: scale(1.08);
  }

  /* ---------- entrance animations ---------- */
  .pr:not(.in) .pr-head,
  .pr:not(.in) .pr-card {
    opacity: 0;
  }

  .pr.in .pr-head {
    animation: prRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  }

  .pr.in .pr-card {
    animation: prRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s) backwards;
  }

  .pr.in .pr-name {
    animation: prRise 0.7s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--d, 0s) + 0.25s) backwards;
  }

  .pr.in .pr-row:nth-of-type(1) {
    animation: prRise 0.7s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--d, 0s) + 0.4s) backwards;
  }

  .pr.in .pr-row:nth-of-type(2) {
    animation: prRise 0.7s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--d, 0s) + 0.55s) backwards;
  }

  .pr.in .pr-float img {
    animation: prImgIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--d, 0s) + 0.3s) backwards;
  }

  @keyframes prRise {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: none; }
  }

  @keyframes prImgIn {
    from { opacity: 0; transform: translateX(28px) scale(0.94); }
    to { opacity: 1; transform: none; }
  }

  @keyframes prRing {
    0%, 100% { transform: translate(-50%, -50%) scale(0.94); opacity: 0.45; }
    50% { transform: translate(-50%, -50%) scale(1.06); opacity: 1; }
  }

  @keyframes prSpark {
    0%, 100% { transform: translateY(0) scale(0.7); opacity: 0.3; }
    50% { transform: translateY(-10px) scale(1.15); opacity: 1; }
  }

  @keyframes prFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }

  @keyframes prShine {
    0% { transform: translateX(-130%); }
    32%, 100% { transform: translateX(560%); }
  }

  @keyframes prDrift {
    0%, 100% { transform: translate3d(0, 0, 0); }
    50% { transform: translate3d(0, -14px, 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .pr *,
    .pr *::before,
    .pr *::after {
      animation: none !important;
      transition: none !important;
    }

    .pr-head,
    .pr-card {
      opacity: 1 !important;
    }

    .pr-rule,
    .pr-card::before {
      transform: none !important;
    }
  }

  /* ---------- responsive ---------- */
  @media (max-width: 1020px) {
    .pr-grid {
      grid-template-columns: 1fr;
      gap: 16px;
      max-width: 640px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  @media (max-width: 980px) {
    .pr-shell {
      padding-top: 60px;
      padding-bottom: 72px;
    }
  }

  @media (max-width: 520px) {
    .pr-shell {
      padding: 56px 16px 68px;
    }

    .pr-grid {
      margin-top: 22px;
    }

    .pr-card {
      grid-template-columns: 1fr;
      padding: 22px 18px 18px;
      border-radius: 24px;
      gap: 14px;
    }

    .pr-tile {
      min-height: 220px;
    }

    .pr-float img {
      max-height: 210px;
    }
  }
`

function Name({ text }) {
  const i = text.indexOf('™')
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <sup>™</sup>
      {text.slice(i + 1)}
    </>
  )
}

export default function Products() {
  const wrapRef = useRef(null)
  const [shown, setShown] = useState(false)
  const { items, heading } = content.products

  useEffect(() => {
    const node = wrapRef.current
    if (!node) return undefined
    let done = false
    let timer = 0
    const reveal = () => {
      if (done) return
      const rect = node.getBoundingClientRect()
      const view = window.innerHeight || 800
      if (rect.bottom < 64 || rect.top > view - 64) return
      done = true
      node.classList.add('in')
      setShown(true)
      window.clearInterval(timer)
    }
    timer = window.setInterval(reveal, 180)
    reveal()
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className={shown ? 'pr in' : 'pr'} id="products" ref={wrapRef}>
      <style>{CSS}</style>
      <div className="pr-blob pr-blob-a" />
      <div className="pr-blob pr-blob-b" />
      <div className="pr-shell">
        <header className="pr-head">
          <h2>{heading}</h2>
          <span className="pr-rule" />
        </header>

        <div className="pr-grid">
          {items.map((item, index) => (
            <article className="pr-card" key={item.name} style={{ '--d': `${0.12 + index * 0.14}s` }}>
              <div className="pr-copy">
                <h3 className="pr-name"><Name text={item.name} /></h3>
                <div className="pr-row">
                  <span className="pr-label">Category</span>
                  <span className="pr-value">{item.category}</span>
                </div>
                <div className="pr-row">
                  <span className="pr-label">{item.compositionLabel}</span>
                  <span className="pr-value">{item.composition}</span>
                </div>
              </div>

              <div className="pr-tile">
                <span className="pr-ring" />
                <span className="pr-ring pr-ring-2" />
                <span className="pr-spark pr-spark-1" />
                <span className="pr-spark pr-spark-2" />
                <span className="pr-spark pr-spark-3" />
                <div className="pr-float">
                  <img src={VISUALS[index]} alt={item.name} loading="lazy" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}