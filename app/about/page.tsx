import AboutPage from '@/components/AboutPage'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'About Us - Retreat Centers Platform',
  description: 'Learn about our mission to connect yoga teachers, coaches, and retreat organizers with the world\'s finest retreat venues.',
}

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AboutPage />
      <Footer />
    </div>
  )
}