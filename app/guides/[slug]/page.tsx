import GuideDetailPage from '@/components/GuideDetailPage'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { notFound } from 'next/navigation'

interface GuidePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: GuidePageProps) {
  const { slug } = await params;
  // In a real app, you would fetch guide data here
  return {
    title: `Guide: ${slug} - Retreat Centers Platform`,
    description: 'Expert guide for retreat organizers and yoga teachers.',
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  // In a real app, you would validate the slug exists
  // if (!guideExists(slug)) {
  //   notFound()
  // }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <GuideDetailPage slug={slug} />
      <Footer />
    </div>
  )
}