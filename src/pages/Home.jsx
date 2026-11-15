import Hero from '../components/Hero'
import FocusAreas from '../components/FocusAreas'
import About from '../components/About'
import Products from '../components/Products'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <FocusAreas />
      <About />
      <Products />
      <Footer />
    </main>
  )
}
