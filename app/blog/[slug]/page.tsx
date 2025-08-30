import BlogDetailPage from '@/components/BlogDetailPage'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { notFound } from 'next/navigation'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  // In a real app, you would fetch blog post data here
  return {
    title: `Blog: ${slug} - Retreat Centers Platform`,
    description: 'Expert insights on retreat planning and wellness business.',
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  // In a real app, you would validate the slug exists
  // if (!blogPostExists(slug)) {
  //   notFound()
  // }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <BlogDetailPage slug={slug} />
      <Footer />
    </div>
  )
}