import BlogDetailPage from '@/components/BlogDetailPage'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { notFound } from 'next/navigation'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  // In a real app, you would fetch blog post data here
  return {
    title: `Blog: ${params.slug} - Retreat Centers Platform`,
    description: 'Expert insights on retreat planning and wellness business.',
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // In a real app, you would validate the slug exists
  // if (!blogPostExists(params.slug)) {
  //   notFound()
  // }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <BlogDetailPage slug={params.slug} />
      <Footer />
    </div>
  )
}