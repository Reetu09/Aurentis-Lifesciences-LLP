import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'

const GLOBAL_CSS = `
  :root {
    --dark-teal: #1B4A52;
    --mid-teal: #2A9D8F;
    --light-teal: #4DB8AC;
    --pale-teal: #E8F5F3;
    --gold: #C9A84C;
    --gold-light: #E8C97A;
    --off-white: #F7F9F9;
    --gray-600: #5A7A7E;
    --font-display: 'Playfair Display', serif;
    --font-body: 'Inter', sans-serif;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-body);
    background: #0A2328;
    color: #F7F9F9;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  img {
    max-width: 100%;
    display: block;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  ul {
    list-style: none;
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

export default function App() {
  useEffect(() => {
    injectStyles('aurentis-global-styles', GLOBAL_CSS)
  }, [])

  return (
    <>
      <Navbar />
      <Home />
    </>
  )
}
