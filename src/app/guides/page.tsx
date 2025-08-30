import GuidesPage from '@/components/GuidesPage'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Guides - Retreat Centers Platform',
  description: 'Expert guides and resources for running successful yoga retreats and wellness programs.',
}

export default function Guides() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <GuidesPage />
      <Footer />
    </div>
  )
}