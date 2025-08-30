import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

interface GuidesPageProps {
  onNavigateToHostPortal?: () => void;
  onNavigateToGuideDetail?: (slug: string) => void;
}

const featuredGuides = [
  {
    id: 'bali',
    slug: 'best-yoga-retreats-bali',
    title: 'Best Yoga Retreats in Bali',
    excerpt: 'Discover authentic yoga and meditation experiences in Bali\'s most sacred and beautiful retreat centers.',
    imageUrl: 'https://images.unsplash.com/photo-1670293797043-2c0788c5a7be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwcmljZSUyMHRlcnJhY2VzfGVufDF8fHx8MTc1NTk4NDExM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    region: 'Asia',
    readTime: '12 min read'
  },
  {
    id: 'costa-rica',
    slug: 'best-wellness-retreats-costa-rica',
    title: 'Best Wellness Retreats in Costa Rica',
    excerpt: 'Explore eco-conscious wellness destinations nestled in Costa Rica\'s pristine rainforests and beaches.',
    imageUrl: 'https://images.unsplash.com/photo-1701355203545-5aeee300ef30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHJldHJlYXQlMjB3ZWxsbmVzcyUyMGNlbnRlcnxlbnwxfHx8fDE3NTU5ODQxMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    region: 'Central America',
    readTime: '10 min read'
  },
  {
    id: 'mexico',
    slug: 'best-meditation-retreats-mexico',
    title: 'Best Meditation Retreats in Mexico',
    excerpt: 'Find profound inner peace at Mexico\'s most transformative meditation retreat centers and sacred spaces.',
    imageUrl: 'https://images.unsplash.com/photo-1693921148341-abb9cc11a8ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHJldHJlYXQlMjBzcGFjZXxlbnwxfHx8fDE3NTU5ODQxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    region: 'North America',
    readTime: '8 min read'
  },
  {
    id: 'india',
    slug: 'best-yoga-retreats-india',
    title: 'Best Yoga Retreats in India',
    excerpt: 'Experience authentic yoga traditions and ancient wisdom at India\'s most revered spiritual destinations.',
    imageUrl: 'https://images.unsplash.com/photo-1726266140662-9c9ff46bfdc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTU5NTk4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    region: 'Asia',
    readTime: '15 min read'
  },
  {
    id: 'portugal',
    slug: 'best-luxury-retreats-portugal',
    title: 'Best Luxury Retreats in Portugal',
    excerpt: 'Indulge in sophisticated wellness experiences along Portugal\'s stunning coastline and countryside.',
    imageUrl: 'https://images.unsplash.com/photo-1690894788605-659becd7f809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0dWdhbCUyMG5hdHVyZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTU5NTk4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    region: 'Europe',
    readTime: '11 min read'
  },
  {
    id: 'thailand',
    slug: 'best-eco-retreats-thailand',
    title: 'Best Eco Retreats in Thailand',
    excerpt: 'Embrace sustainable luxury and natural healing in Thailand\'s most pristine island and jungle settings.',
    imageUrl: 'https://images.unsplash.com/photo-1716157328257-aa7d6826fc3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpbGFuZCUyMG5hdHVyZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTU5NTk4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    region: 'Asia',
    readTime: '9 min read'
  }
];

export default function GuidesPage({ onNavigateToHostPortal, onNavigateToGuideDetail }: GuidesPageProps) {
  const handleGuideClick = (slug: string) => {
    if (onNavigateToGuideDetail) {
      onNavigateToGuideDetail(slug);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean like BlogPage */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl lg:text-7xl tracking-tight font-extralight">
              Retreat Guides
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Discover the world's best yoga and wellness retreat destinations, carefully curated for transformational experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Guides - Like BlogPage More Articles */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl tracking-tight font-light mb-4">
              Featured Destinations
            </h2>
            <p className="text-xl text-gray-600">
              Curated collections of the world's finest retreat destinations
            </p>
          </div>

          <div className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGuides.map((guide) => (
              <article
                key={guide.id}
                onClick={() => handleGuideClick(guide.slug)}
                className="group cursor-pointer flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-6">
                  <ImageWithFallback
                    src={guide.imageUrl}
                    alt={guide.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <div className="space-y-1 mb-4">
                    <span className="text-xs text-gray-500 tracking-wide uppercase">
                      {guide.region}
                    </span>
                  </div>

                  <h3 className="text-2xl tracking-tight font-light group-hover:text-gray-700 transition-colors mb-4">
                    {guide.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                    {guide.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <span>{guide.readTime}</span>
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

      {/* CTA Section - Clean like BlogPage */}
      <section className="py-24 lg:py-32 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl tracking-tight font-light">
                Own a Retreat Center?
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Join thousands of wellness facilitators connecting with retreat organizers worldwide and showcase your unique space.
              </p>
            </div>
            
            <div className="pt-4">
              <button
                onClick={onNavigateToHostPortal}
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl transition-colors font-extralight tracking-tight"
              >
                Add Your Venue
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}