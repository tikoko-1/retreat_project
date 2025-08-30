import GuideDetailPage from '@/components/GuideDetailPage'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { notFound } from 'next/navigation'

interface GuidePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: GuidePageProps) {
  // In a real app, you would fetch guide data here
  return {
    title: `Guide: ${params.slug} - Retreat Centers Platform`,
    description: 'Expert guide for retreat organizers and yoga teachers.',
  }
}

export default function GuidePage({ params }: GuidePageProps) {
  // In a real app, you would validate the slug exists
  // if (!guideExists(params.slug)) {
  //   notFound()
  // }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <GuideDetailPage slug={params.slug} />
      <Footer />
    </div>
  )
}