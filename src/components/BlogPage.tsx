import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, User, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import CallToActionSection from "./CallToActionSection";

interface BlogPageProps {
  onNavigateToBlogPost?: (slug: string) => void;
  onNavigateToHostPortal?: () => void;
}

const featuredPosts = [
  {
    id: '1',
    slug: 'how-to-organize-yoga-retreat-step-by-step',
    title: 'How to Organize a Yoga Retreat',
    subtitle: 'Complete guide to planning transformational experiences',
    excerpt: 'Planning a successful yoga retreat requires careful attention to detail, clear vision, and systematic execution. This comprehensive guide will walk you through every essential step.',
    imageUrl: 'https://images.unsplash.com/photo-1709636869897-8e8b9554ddf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjB3ZWxsbmVzcyUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU2MTQwMTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Planning',
    author: 'Sarah Chen',
    readTime: '8 min read'
  },
  {
    id: '2',
    slug: 'retreat-marketing-strategies-2024',
    title: 'Retreat Marketing Strategies That Work',
    subtitle: 'Proven tactics for filling your retreats',
    excerpt: 'Discover the marketing strategies and digital tactics that successful retreat leaders use to attract their ideal participants and build sustainable businesses.',
    imageUrl: 'https://images.unsplash.com/photo-1683965274732-664bc41cf49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlJTIwZGVzaWduJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU2MTQwMTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Marketing',
    author: 'Marcus Rodriguez',
    readTime: '12 min read'
  },
  {
    id: '3',
    slug: 'choosing-perfect-retreat-venue',
    title: 'Choosing the Perfect Retreat Venue',
    subtitle: 'A complete evaluation checklist',
    excerpt: 'Essential criteria and questions to consider when selecting retreat centers that align with your vision and create meaningful experiences for participants.',
    imageUrl: 'https://images.unsplash.com/photo-1726377240070-19b747fc9f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWxsbmVzcyUyMGpvdXJuYWwlMjB3cml0aW5nfGVufDF8fHx8MTc1NjE0MDExNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Planning',
    author: 'Elena Kowalski',
    readTime: '6 min read'
  }
];

const latestPosts = [
  {
    id: '4',
    slug: 'retreat-pricing-psychology',
    title: 'The Psychology of Retreat Pricing',
    excerpt: 'Understanding value perception and pricing strategies that resonate with your target audience.',
    imageUrl: 'https://images.unsplash.com/photo-1549399905-5d1bad747576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBjbGVhbiUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NTYxNDAxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Business',
    author: 'David Park',
    readTime: '10 min read'
  },
  {
    id: '5',
    slug: 'wellness-trends-2025',
    title: '2025 Wellness Trends for Retreat Leaders',
    excerpt: 'Emerging wellness trends and participant expectations shaping the future of retreats.',
    imageUrl: 'https://images.unsplash.com/photo-1721887862787-bbc687dd3671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbmF0dXJlJTIwbGFuZHNjYXBlJTIwbW91bnRhaW58ZW58MXx8fHwxNzU2MTQwMTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Wellness',
    author: 'Aria Patel',
    readTime: '7 min read'
  },
  {
    id: '6',
    slug: 'building-retreat-community',
    title: 'Building Lasting Community Through Retreats',
    excerpt: 'Strategies for creating deeper connections and meaningful relationships that extend beyond your retreats.',
    imageUrl: 'https://images.unsplash.com/photo-1557735567-d1b80e463789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWxsbmVzcyUyMHRlYSUyMGNlcmVtb255fGVufDF8fHx8MTc1NjE0MDEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Wellness',
    author: 'James Wilson',
    readTime: '9 min read'
  }
];

const moreArticles = [
  {
    id: '7',
    slug: 'mindfulness-based-retreats',
    title: 'Creating Mindfulness-Based Retreat Programs',
    excerpt: 'Design authentic mindfulness experiences that create lasting transformation.',
    imageUrl: 'https://images.unsplash.com/photo-1694614513690-25cfb8e764f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwemVuJTIwZ2FyZGVufGVufDF8fHx8MTc1NjE0MDU1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Wellness',
    author: 'Maria Santos',
    readTime: '11 min read'
  },
  {
    id: '8',
    slug: 'luxury-retreat-experiences',
    title: 'Designing Luxury Retreat Experiences',
    excerpt: 'Elevate your retreats with premium touches that justify higher pricing.',
    imageUrl: 'https://images.unsplash.com/photo-1715405155658-9b7c9589b37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWxsbmVzcyUyMHJldHJlYXQlMjB5b2dhfGVufDF8fHx8MTc1NjE0MDU1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Business',
    author: 'Alexandra Kim',
    readTime: '8 min read'
  },
  {
    id: '9',
    slug: 'meditation-retreat-techniques',
    title: 'Advanced Meditation Techniques for Retreats',
    excerpt: 'Incorporate profound meditation practices that deepen participant experience.',
    imageUrl: 'https://images.unsplash.com/photo-1631441961409-d350ca05f453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsbmVzcyUyMG1lZGl0YXRpb24lMjBzdG9uZXN8ZW58MXx8fHwxNzU2MTQwNTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Wellness',
    author: 'Chen Wei',
    readTime: '13 min read'
  },
  {
    id: '10',
    slug: 'spa-wellness-integration',
    title: 'Integrating Spa Services into Retreat Programs',
    excerpt: 'Seamlessly blend spa treatments with wellness activities for holistic experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1587330454197-adb07f0ee321?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMHNwYSUyMG5hdHVyYWwlMjBsaWdodHxlbnwxfHx8fDE3NTYxNDA1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Wellness',
    author: 'Isabella Rodriguez',
    readTime: '9 min read'
  },
  {
    id: '11',
    slug: 'yoga-teacher-training-retreats',
    title: 'Running Successful Yoga Teacher Training Retreats',
    excerpt: 'Best practices for intensive training programs that create certified instructors.',
    imageUrl: 'https://images.unsplash.com/photo-1717821681365-36b0da044a75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwdGVhY2hlciUyMHRyYWluaW5nfGVufDF8fHx8MTc1NjE0MDU3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Planning',
    author: 'Rachel Thompson',
    readTime: '15 min read'
  },
  {
    id: '12',
    slug: 'holistic-wellness-approaches',
    title: 'Holistic Approaches to Wellness Retreats',
    excerpt: 'Integrate multiple healing modalities for comprehensive wellness experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1754941622136-6664a3f50b2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xpc3RpYyUyMHdlbGxuZXNzJTIwdGhlcmFweXxlbnwxfHx8fDE3NTYxNDA1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Wellness',
    author: 'Dr. Michael Foster',
    readTime: '12 min read'
  },
  {
    id: '13',
    slug: 'breathwork-integration',
    title: 'Integrating Breathwork into Retreat Programs',
    excerpt: 'Powerful breathing techniques that enhance meditation and yoga practices.',
    imageUrl: 'https://images.unsplash.com/photo-1564029476-c16c3f973e82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVhdGh3b3JrJTIwbWVkaXRhdGlvbiUyMHByYWN0aWNlfGVufDF8fHx8MTc1NjE0MDU3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Wellness',
    author: 'Sofia Andersson',
    readTime: '10 min read'
  },
  {
    id: '14',
    slug: 'nature-immersion-retreats',
    title: 'Designing Nature Immersion Retreats',
    excerpt: 'Connect participants with the healing power of natural environments.',
    imageUrl: 'https://images.unsplash.com/photo-1687181133399-668ddc50065c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMHJldHJlYXQlMjBuYXR1cmV8ZW58MXx8fHwxNzU2MTA2MzgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Wellness',
    author: 'Lucas Green',
    readTime: '11 min read'
  },
  {
    id: '15',
    slug: 'sound-healing-retreats',
    title: 'Creating Transformative Sound Healing Retreats',
    excerpt: 'Incorporate sound therapy and vibrational healing into your programs.',
    imageUrl: 'https://images.unsplash.com/photo-1746802401350-b99c6e692a05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMGhlYWxpbmclMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc1NjE0MDU4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Wellness',
    author: 'Amara Singh',
    readTime: '9 min read'
  },
  {
    id: '16',
    slug: 'digital-detox-retreats',
    title: 'Planning Effective Digital Detox Retreats',
    excerpt: 'Help participants disconnect from technology and reconnect with themselves.',
    imageUrl: 'https://images.unsplash.com/photo-1500815845799-7748ca339f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZGV0b3glMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NTYxNDA1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Wellness',
    author: 'Emma Clarke',
    readTime: '8 min read'
  },
  {
    id: '17',
    slug: 'retreat-food-nutrition',
    title: 'Nutritional Planning for Wellness Retreats',
    excerpt: 'Design meal programs that support healing and transformation.',
    imageUrl: 'https://images.unsplash.com/photo-1549399905-5d1bad747576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBjbGVhbiUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NTYxNDAxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Planning',
    author: 'Chef Antoine Dubois',
    readTime: '12 min read'
  },
  {
    id: '18',
    slug: 'retreat-leadership-skills',
    title: 'Essential Leadership Skills for Retreat Facilitators',
    excerpt: 'Develop the skills needed to guide transformational group experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1715405155658-9b7c9589b37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWxsbmVzcyUyMHJldHJlYXQlMjB5b2dhfGVufDF8fHx8MTc1NjE0MDU1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Business',
    author: 'Dr. Patricia Lee',
    readTime: '14 min read'
  },
  {
    id: '19',
    slug: 'international-retreat-logistics',
    title: 'Managing International Retreat Logistics',
    excerpt: 'Navigate the complexities of hosting retreats in foreign destinations.',
    imageUrl: 'https://images.unsplash.com/photo-1683965274732-664bc41cf49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlJTIwZGVzaWduJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU2MTQwMTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Planning',
    author: 'Roberto Valdez',
    readTime: '16 min read'
  },
  {
    id: '20',
    slug: 'retreat-safety-protocols',
    title: 'Safety Protocols for Wellness Retreats',
    excerpt: 'Essential safety measures to protect participants and facilitators.',
    imageUrl: 'https://images.unsplash.com/photo-1631441961409-d350ca05f453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsbmVzcyUyMG1lZGl0YXRpb24lMjBzdG9uZXN8ZW58MXx8fHwxNzU2MTQwNTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Planning',
    author: 'Sarah Mitchell',
    readTime: '10 min read'
  },
  {
    id: '21',
    slug: 'retreat-insurance-essentials',
    title: 'Insurance Essentials for Retreat Organizers',
    excerpt: 'Protect your retreat business with proper insurance coverage.',
    imageUrl: 'https://images.unsplash.com/photo-1687181133399-668ddc50065c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMHJldHJlYXQlMjBuYXR1cmV8ZW58MXx8fHwxNzU2MTA2MzgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Business',
    author: 'Mark Johnson',
    readTime: '11 min read'
  }
];

export default function BlogPage({ onNavigateToBlogPost, onNavigateToHostPortal }: BlogPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePostClick = (slug: string) => {
    if (onNavigateToBlogPost) {
      onNavigateToBlogPost(slug);
    }
  };

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl lg:text-7xl tracking-tight font-extralight">
              Retreat Insights
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Guides, insights, and stories for retreat facilitators creating transformational experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Carousel */}
      <section className="py-3 lg:py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="relative group">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredPosts.map((post, index) => (
                  <div key={post.id} className="w-full flex-shrink-0">
                    <article
                      onClick={() => handlePostClick(post.slug)}
                      className="group cursor-pointer"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center min-h-[320px] md:min-h-[480px]">
                        {/* Image */}
                        <div className="relative aspect-[16/10] md:aspect-[4/3] overflow-hidden rounded-xl md:rounded-2xl">
                          <ImageWithFallback
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                        </div>

                        {/* Content */}
                        <div className="space-y-4 md:space-y-8">
                          <div className="space-y-1">
                            <span className="text-sm text-gray-500 tracking-wide uppercase">
                              {post.category}
                            </span>
                          </div>

                          <div className="space-y-3 md:space-y-6">
                            <h2 className="text-2xl md:text-3xl xl:text-4xl tracking-tight font-light group-hover:text-gray-700 transition-colors">
                              {post.title}
                            </h2>
                            
                            <h3 className="text-lg md:text-xl text-gray-600 font-light">
                              {post.subtitle}
                            </h3>
                            
                            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                              {post.excerpt}
                            </p>
                          </div>

                          {/* Meta */}
                          <div className="flex items-center justify-between pt-2 md:pt-4">
                            <div className="flex items-center space-x-4 md:space-x-6 text-sm text-gray-500">
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-1.5 md:mr-2" />
                                <span className="text-xs md:text-sm">{post.author}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1.5 md:mr-2" />
                                <span className="text-xs md:text-sm">{post.readTime}</span>
                              </div>
                            </div>

                            <div className="flex items-center text-sm group-hover:text-gray-900 transition-colors">
                              <span className="text-xs md:text-sm">Read article</span>
                              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1.5 md:ml-2 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Carousel Controls */}
            <button
              onClick={prevSlide}
              className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 hover:text-black rounded-full p-3 transition-all duration-200 z-10 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 hover:text-black rounded-full p-3 transition-all duration-200 z-10 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Navigation Bar */}
            <div className="flex justify-center items-center space-x-4 mt-6 lg:mt-8">
              {/* Indicators */}
              <div className="flex items-center space-x-2">
                {featuredPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`rounded-full transition-all duration-200 ${
                      index === currentSlide 
                        ? 'bg-gray-900 w-6 h-2 lg:w-8 lg:h-2' 
                        : 'bg-gray-300 w-2 h-2'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl tracking-tight font-light mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600">
              Fresh insights for the modern retreat facilitator
            </p>
          </div>

          <div className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => handlePostClick(post.slug)}
                className="group cursor-pointer flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-6">
                  <ImageWithFallback
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <div className="space-y-1 mb-4">
                    <span className="text-xs text-gray-500 tracking-wide uppercase">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl tracking-tight font-light group-hover:text-gray-700 transition-colors mb-4">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <div className="flex items-center text-sm group-hover:text-gray-900 transition-colors">
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* More Articles */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl tracking-tight font-light mb-4">
              More Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 gap-8">
            {moreArticles.map((post) => (
              <article
                key={post.id}
                onClick={() => handlePostClick(post.slug)}
                className="group cursor-pointer flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-6">
                  <ImageWithFallback
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <div className="space-y-1 mb-4">
                    <span className="text-xs text-gray-500 tracking-wide uppercase">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-2xl tracking-tight font-light group-hover:text-gray-700 transition-colors mb-4">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <div className="flex items-center text-sm group-hover:text-gray-900 transition-colors">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 lg:py-32 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl tracking-tight font-light">
                Stay Connected
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Get the latest insights, trends, and strategies for retreat facilitators delivered to your inbox.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg h-auto">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CallToActionSection onReserveClick={onNavigateToHostPortal} />
    </div>
  );
}