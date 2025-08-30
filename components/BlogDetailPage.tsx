import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Calendar, User, Clock, Share2, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface BlogDetailPageProps {
  slug: string;
  onNavigateToCatalog?: () => void;
  onNavigateToHostPortal?: () => void;
}

const relatedPosts = [
  {
    id: '1',
    slug: 'retreat-marketing-strategies-2024',
    title: 'Retreat Marketing Strategies That Actually Work',
    excerpt: 'Proven marketing tactics and digital strategies to fill your retreats with ideal participants.',
    imageUrl: 'https://images.unsplash.com/photo-1683965274732-664bc41cf49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlJTIwZGVzaWduJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU2MTQwMTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    readTime: '12 min'
  },
  {
    id: '2',
    slug: 'choosing-perfect-retreat-venue',
    title: 'Choosing the Perfect Retreat Venue',
    excerpt: 'Essential criteria and questions to evaluate when selecting retreat centers.',
    imageUrl: 'https://images.unsplash.com/photo-1549399905-5d1bad747576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBjbGVhbiUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NTYxNDAxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    readTime: '6 min'
  }
];

export default function BlogDetailPage({ slug, onNavigateToCatalog, onNavigateToHostPortal }: BlogDetailPageProps) {
  // Mock data based on slug - in real app would fetch from API
  const blogPost = {
    title: 'How to Organize a Yoga Retreat',
    subtitle: 'A comprehensive guide to planning, marketing, and executing transformational retreat experiences',
    heroImage: 'https://images.unsplash.com/photo-1709636869897-8e8b9554ddf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjB3ZWxsbmVzcyUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU2MTQwMTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Planning',
    author: 'Sarah Chen',
    date: 'December 15, 2024',
    readTime: '8 min read',
    content: `Planning a successful yoga retreat requires careful attention to detail, clear vision, and systematic execution. Whether you're a seasoned yoga instructor or new to retreat facilitation, this comprehensive guide will walk you through every essential step.

## Define Your Retreat Vision and Purpose

Before diving into logistics, establish a clear vision for your retreat. Ask yourself:

- What transformation do you want to offer participants?
- What makes your retreat unique in a crowded market?
- Who is your ideal participant?

Your retreat's purpose should guide every decision you make, from venue selection to daily programming. A clearly defined vision also makes marketing much more effective, as you can speak directly to your target audience's desires and needs.

## Choose Your Retreat Location and Venue

The venue is the foundation of your retreat experience. Consider these critical factors:

**Location Accessibility**
- Flight connections and transportation options
- Visa requirements for international destinations
- Local infrastructure and safety considerations

**Venue Features**
- Dedicated yoga/meditation spaces with proper flooring
- Accommodation quality and room configurations
- Meal options and dietary accommodation capabilities
- Natural beauty and inspiring surroundings

**Practical Considerations**
- Group size capacity and room configurations
- Wi-Fi availability (or intentional digital detox)
- Emergency services and medical facility proximity
- Weather patterns during your planned dates

## Design Your Retreat Program

Create a balanced program that combines structure with flexibility:

**Daily Schedule Framework**
- Morning meditation or breathwork
- Primary yoga sessions (2-3 hours)
- Meals with community interaction time
- Afternoon workshops or free time
- Evening activities or rest

**Special Elements to Consider**
- Cultural experiences or local excursions
- Personal development workshops
- Creative activities (journaling, art, music)
- Silent periods for reflection
- Ceremony or ritual components

## Handle Legal and Insurance Requirements

Protect yourself and your participants:

- Liability insurance for retreat activities
- Health and safety waivers
- Clear terms and conditions
- Cancellation and refund policies
- Emergency contact procedures

Consult with legal professionals familiar with retreat businesses, especially for international destinations.

## Marketing and Filling Your Retreat

Start marketing 6-12 months in advance:

**Early Bird Strategy**
- Offer significant early registration discounts
- Create payment plan options
- Build anticipation through social media content

**Content Marketing**
- Share your personal retreat experiences
- Provide valuable free content related to your retreat theme
- Use testimonials from previous participants
- Partner with complementary wellness professionals

**Pricing Strategy**
- Research competitor pricing in your target market
- Factor in all costs plus reasonable profit margin
- Consider tiered pricing for different accommodation levels
- Include clear information about what's included/excluded

## Pre-Retreat Preparation

The weeks leading up to your retreat are crucial:

**Participant Communication**
- Send detailed packing lists and preparation guides
- Share itinerary and expectation-setting information
- Create a private group for participants to connect
- Provide travel and arrival instructions

**Final Logistics**
- Confirm all venue details and special requirements
- Arrange transportation from airport if needed
- Prepare retreat materials and welcome packages
- Review emergency procedures with venue staff`
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={blogPost.heroImage}
            alt={blogPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 pb-12 lg:pb-24">
            <div className="space-y-4 lg:space-y-8 text-white">
              {/* Category */}
              <div className="space-y-1 lg:space-y-2">
                <span className="text-xs lg:text-sm tracking-wide uppercase text-white/80">
                  {blogPost.category}
                </span>
              </div>
              
              {/* Title */}
              <div className="space-y-3 lg:space-y-6">
                <h1 className="text-3xl lg:text-4xl xl:text-6xl font-light tracking-tight leading-tight">
                  {blogPost.title}
                </h1>
                
                <p className="text-lg lg:text-xl xl:text-2xl text-white/90 leading-relaxed max-w-3xl">
                  {blogPost.subtitle}
                </p>
              </div>

              {/* Meta Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-white/80 text-sm lg:text-base pt-2 lg:pt-0">
                <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
                  <div className="flex items-center">
                    <User className="w-3.5 h-3.5 lg:w-4 lg:h-4 mr-1.5 lg:mr-2" />
                    <span className="text-sm lg:text-base">{blogPost.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4 mr-1.5 lg:mr-2" />
                    <span className="text-sm lg:text-base">{blogPost.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4 mr-1.5 lg:mr-2" />
                    <span className="text-sm lg:text-base">{blogPost.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">


          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {blogPost.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-3xl lg:text-4xl tracking-tight font-light mt-16 mb-8 first:mt-0">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={index} className="text-xl lg:text-2xl tracking-tight mt-12 mb-6">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const listItems = paragraph.split('\n').filter(item => item.startsWith('- '));
                return (
                  <ul key={index} className="space-y-3 my-8">
                    {listItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-700 text-lg leading-relaxed">
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-lg text-gray-700 leading-relaxed mb-8">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Key Takeaways Section - Ultra Clean Design */}
          <div className="my-24">
            <div className="max-w-3xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h3 className="text-4xl lg:text-5xl font-extralight tracking-tight text-gray-900 mb-4">
                  Key Takeaways
                </h3>
                <div className="w-12 h-px bg-gray-900 mx-auto"></div>
              </div>

              {/* Takeaways Grid */}
              <div className="space-y-12">
                <div className="group">
                  <div className="flex items-start gap-8">
                    <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex-shrink-0 flex items-center justify-center">
                      <span className="text-gray-900 text-lg font-light">1</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-light text-gray-900 tracking-tight">
                        Vision First
                      </h4>
                      <p className="text-gray-600 leading-relaxed font-light">
                        Define your retreat's purpose and target audience before making any logistics decisions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-8">
                    <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex-shrink-0 flex items-center justify-center">
                      <span className="text-gray-900 text-lg font-light">2</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-light text-gray-900 tracking-tight">
                        Location Matters
                      </h4>
                      <p className="text-gray-600 leading-relaxed font-light">
                        Choose venues that align with your retreat's atmosphere and provide necessary amenities.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-8">
                    <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex-shrink-0 flex items-center justify-center">
                      <span className="text-gray-900 text-lg font-light">3</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-light text-gray-900 tracking-tight">
                        Balance Structure & Flow
                      </h4>
                      <p className="text-gray-600 leading-relaxed font-light">
                        Create a schedule that provides guidance while allowing flexibility for spontaneous moments.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-8">
                    <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex-shrink-0 flex items-center justify-center">
                      <span className="text-gray-900 text-lg font-light">4</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-light text-gray-900 tracking-tight">
                        Early Marketing
                      </h4>
                      <p className="text-gray-600 leading-relaxed font-light">
                        Start promoting 6-12 months in advance with authentic storytelling and early bird incentives.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-8">
                    <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex-shrink-0 flex items-center justify-center">
                      <span className="text-gray-900 text-lg font-light">5</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-light text-gray-900 tracking-tight">
                        Pre-Retreat Communication
                      </h4>
                      <p className="text-gray-600 leading-relaxed font-light">
                        Clear expectations and detailed preparation guides significantly enhance participant satisfaction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Content with Images and Quotes */}
          <div className="space-y-16 my-16">
            {/* First Image */}
            <div>
              <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1687180948607-9ba1dd045e10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG1lZGl0YXRpb24lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NTYxMDY2NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Peaceful meditation space"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-500 text-center">Creating a peaceful environment is essential for retreat success</p>
            </div>

            {/* Quote 1 */}
            <div className="bg-gray-50 border-l-4 border-gray-900 p-8 rounded-r-2xl">
              <blockquote className="text-xl lg:text-2xl font-light text-gray-800 leading-relaxed mb-4">
                "The perfect retreat venue feels like a sanctuary from the moment participants arrive. It should inspire transformation through its very atmosphere."
              </blockquote>
              <cite className="text-gray-600 text-sm">— Sarah Chen, Retreat Facilitator</cite>
            </div>

            {/* Second Image */}
            <div>
              <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1728897711866-b7e6e3cf04f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcmV0cmVhdCUyMGxvY2F0aW9uJTIwdmVudWV8ZW58MXx8fHwxNzU2MTQyMjIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Beautiful retreat venue location"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-500 text-center">The right venue creates the perfect atmosphere for transformation</p>
            </div>

            {/* Quote 2 */}
            <div className="bg-gray-900 text-white p-8 rounded-2xl">
              <blockquote className="text-xl lg:text-2xl font-light leading-relaxed mb-4">
                "Success in retreat marketing comes from authentic storytelling. Share your personal journey and let potential participants feel the transformation you're offering."
              </blockquote>
              <cite className="text-white/70 text-sm">— Marcus Thompson, Wellness Marketing Expert</cite>
            </div>

            {/* Third Image */}
            <div>
              <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1603804449683-25636751db96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRyZWF0JTIwcGxhbm5pbmclMjBtYXJrZXRpbmclMjBzdHJhdGVneXxlbnwxfHx8fDE3NTYxNDIyMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Marketing strategy planning"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-500 text-center">Strategic marketing ensures your retreat attracts the right participants</p>
            </div>
          </div>
        </div>
      </article>

      {/* Dual CTA Section */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CTA 1 */}
            <div className="bg-white rounded-3xl p-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl tracking-tight">
                    Find Your Perfect Venue
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Explore our curated collection of premium retreat centers worldwide and discover the perfect setting for your transformational experience.
                  </p>
                </div>
                
                <Button
                  onClick={onNavigateToCatalog}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-xl inline-flex items-center gap-3"
                >
                  Explore Retreat Centers
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* CTA 2 */}
            <div className="bg-gray-900 text-white rounded-3xl p-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl tracking-tight">
                    List Your Retreat Center
                  </h3>
                  <p className="text-lg text-white/80 leading-relaxed">
                    Join thousands of wellness facilitators discovering exceptional venues. Connect with retreat organizers seeking the perfect space.
                  </p>
                </div>
                
                <Button
                  onClick={onNavigateToHostPortal}
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl inline-flex items-center gap-3"
                >
                  Add Your Venue
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl tracking-tight mb-4">
              Continue Reading
            </h2>
            <p className="text-xl text-gray-600">
              More insights for retreat facilitators
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {relatedPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="relative aspect-[5/3] overflow-hidden rounded-2xl mb-8">
                  <ImageWithFallback
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl tracking-tight group-hover:text-gray-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.readTime}</span>
                    <div className="flex items-center group-hover:text-gray-900 transition-colors">
                      <span>Read article</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}