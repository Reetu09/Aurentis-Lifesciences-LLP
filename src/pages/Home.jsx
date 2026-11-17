import Hero from '../components/Hero'
import FocusAreas from '../components/FocusAreas'
import About from '../components/About'
import Products from '../components/Products'
import Footer from '../components/Footer'
import Seo from '../components/Seo'
import { HOME_DESCRIPTION, HOME_TITLE } from '../site.js'

export default function Home() {
  return (
    <main>
      <Seo title={HOME_TITLE} description={HOME_DESCRIPTION} path="/" />
      <Hero />
      <FocusAreas />
      <About />
      <Products />
      <Footer />
    </main>
  )
}
