import BlogPage from '@/components/BlogPage'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Blog - Retreat Centers Platform',
  description: 'Insights, tips, and stories from the world of yoga retreats and wellness travel.',
}

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <BlogPage />
      <Footer />
    </div>
  )
}