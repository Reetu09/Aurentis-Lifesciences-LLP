import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'

const GLOBAL_CSS = `
  :root {
    --dark-teal: #1D3651;
    --mid-teal: #1D3651;
    --light-teal: #FFFFFF;
    --pale-teal: #FFFFFF;
    --gold: #A17C2D;
    --gold-light: #A17C2D;
    --off-white: #FFFFFF;
    --gray-600: #1D3651;
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
    background: #1D3651;
    color: #FFFFFF;
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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
