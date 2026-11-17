// Change this when the production domain is known. Every canonical URL,
// Open Graph URL, sitemap entry, and robots Sitemap line is built from it.
export const SITE_URL = 'https://aurentislifesciences.com'

export const HOME_TITLE = 'Aurentis Lifesciences LLP | Science-Backed Nutrition'
export const HOME_DESCRIPTION =
  'Aurentis Lifesciences LLP offers high-purity, research-driven therapeutic nutrition for liver care and cellular protection. FSSAI approved, WHO-GMP quality.'

export const CONTACT_TITLE = 'Contact Us | Aurentis Lifesciences LLP'
export const CONTACT_DESCRIPTION =
  'Get in touch with Aurentis Lifesciences LLP for product enquiries and business partnerships. Send us a message and our team will respond soon.'

export function absoluteUrl(path = '/') {
  const base = SITE_URL.replace(/\/$/, '')
  if (!path || path === '/') return `${base}/`
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}
