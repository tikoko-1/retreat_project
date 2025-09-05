import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AboutPageLegacyProps {
  onNavigateToHostPortal?: () => void;
}

export default function AboutPageLegacy({ onNavigateToHostPortal }: AboutPageLegacyProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Manifesto */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white"></div>
        <div className="relative max-w-6xl mx-auto px-6 lg:px-12 py-32 lg:py-40 text-center">
          <div className="space-y-12 lg:space-y-16">
            <h1 className="text-4xl lg:text-6xl xl:text-7xl tracking-[-0.02em] font-light leading-[0.95] text-black">
              Retreat Industry<br />
              <span className="text-gray-500">Needs Fixing</span>
            </h1>
            <div className="max-w-3xl mx-auto space-y-8">
              <p className="text-xl lg:text-2xl text-gray-600 font-light leading-relaxed">
                We're building the world's most trusted platform for transformational experiences.
              </p>
              <p className="text-base lg:text-lg text-gray-500 font-light max-w-2xl mx-auto">
                No more hidden fees. No fake reviews. Just authentic connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Block */}
      <section className="py-32 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24 lg:mb-32">
            <h2 className="text-3xl lg:text-4xl font-light text-black mb-8">
              Our Mission
            </h2>
            <p className="text-lg lg:text-xl text-gray-500 font-light max-w-4xl mx-auto">
              Creating authentic connections between seekers and transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20">
            {/* Transparency */}
            <div className="text-center space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-light text-black">
                  Transparency
                </h3>
                <p className="text-base lg:text-lg text-gray-600 font-light leading-relaxed max-w-sm mx-auto">
                  Real reviews, honest pricing, authentic experiences. No hidden fees.
                </p>
              </div>
            </div>

            {/* Community */}
            <div className="text-center space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-light text-black">
                  Community
                </h3>
                <p className="text-base lg:text-lg text-gray-600 font-light leading-relaxed max-w-sm mx-auto">
                  Connecting seekers with genuine teachers who prioritize transformation.
                </p>
              </div>
            </div>

            {/* Excellence */}
            <div className="text-center space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-light text-black">
                  Excellence
                </h3>
                <p className="text-base lg:text-lg text-gray-600 font-light leading-relaxed max-w-sm mx-auto">
                  Curated selection of the world's finest retreat centers, vetted for quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Break */}
      <section className="py-0">
        <div className="aspect-[16/6] overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1750036015902-c6f5ebca924e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcmNoaXRlY3R1cmUlMjBtaW5pbWFsaXN0JTIwaW50ZXJpb3IlMjB6ZW58ZW58MXx8fHwxNzU2MjI4NDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury minimalist architecture"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Timeline / Story */}
      <section className="py-32 lg:py-40 bg-gray-50/30">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24 lg:mb-32">
            <h2 className="text-3xl lg:text-4xl font-light text-black">
              Our Story
            </h2>
          </div>

          <div className="space-y-24 lg:space-y-32">
            {/* 2015 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="space-y-8">
                  <div className="text-6xl lg:text-7xl font-extralight text-gray-200">
                    2015
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-light text-black">
                    The Idea
                  </h3>
                  <p className="text-lg lg:text-xl text-gray-600 font-light leading-relaxed">
                    After a life-changing retreat experience, we realized the industry needed a trusted platform for authentic transformation.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1627756519275-25fe6ecbb658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbW91bnRhaW4lMjBuYXR1cmUlMjBsYW5kc2NhcGUlMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NTYyMjg0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Mountain landscape"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 2023 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1663669076938-e9d1459bd4d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZm9yZXN0JTIwdHJlZXMlMjB0ZXh0dXJlJTIwbmF0dXJhbHxlbnwxfHx8fDE3NTYyMjg0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Forest trees"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="space-y-8">
                  <div className="text-6xl lg:text-7xl font-extralight text-gray-200">
                    2023
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-light text-black">
                    Community Growth
                  </h3>
                  <p className="text-lg lg:text-xl text-gray-600 font-light leading-relaxed">
                    Our platform gained the trust of 2.6M+ seekers worldwide through curated recommendations and genuine reviews.
                  </p>
                </div>
              </div>
            </div>

            {/* 2025 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="space-y-8">
                  <div className="text-6xl lg:text-7xl font-extralight text-gray-200">
                    2025
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-light text-black">
                    Platform Launch
                  </h3>
                  <p className="text-lg lg:text-xl text-gray-600 font-light leading-relaxed">
                    RetreatCenters.com launches as the definitive marketplace for vetted retreat centers and conscious facilitators.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1735293721285-10638816709b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwcGxhdGZvcm0lMjBsYXVuY2glMjBkaWdpdGFsJTIwZnV0dXJlfGVufDF8fHx8MTc1Njk3OTc4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Digital platform technology"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values / Principles */}
      <section className="py-32 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24 lg:mb-32">
            <h2 className="text-3xl lg:text-4xl font-light text-black">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24">
            {/* Radical Honesty */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-light text-black">
                  Radical Honesty
                </h3>
                <p className="text-base lg:text-lg text-gray-600 font-light leading-relaxed">
                  We believe in transparent communication, honest reviews, and authentic experiences without the marketing fluff.
                </p>
              </div>
            </div>

            {/* Quality Over Quantity */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-light text-black">
                  Quality Over Quantity
                </h3>
                <p className="text-base lg:text-lg text-gray-600 font-light leading-relaxed">
                  Every retreat center in our network is carefully vetted. We'd rather have 100 exceptional centers than 1000 mediocre ones.
                </p>
              </div>
            </div>

            {/* Real Transformation */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-light text-black">
                  Real Transformation
                </h3>
                <p className="text-base lg:text-lg text-gray-600 font-light leading-relaxed">
                  We support experiences that create lasting change, not just Instagram moments or temporary escapes.
                </p>
              </div>
            </div>

            {/* Industry Disruption */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-light text-black">
                  Industry Disruption
                </h3>
                <p className="text-base lg:text-lg text-gray-600 font-light leading-relaxed">
                  We're changing how people discover and book transformational experiences through technology and curation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Image Break */}
      <section className="py-0">
        <div className="aspect-[16/6] overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1574249943499-d83fddc3e331?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBvY2VhbiUyMHdhdmVzJTIwc3Vuc2V0JTIwbWluaW1hbHxlbnwxfHx8fDE3NTYyMjg0MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Ocean waves at sunset"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* CTA Section - Dark Contrast */}
      <section className="py-32 lg:py-40 bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <div className="space-y-16">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl xl:text-6xl font-light tracking-[-0.02em] leading-[0.95] text-white">
                Ready to Skip<br />
                <span className="text-gray-400">the Bullshit?</span>
              </h2>
              <p className="text-lg lg:text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                Whether you're seeking transformation or offering it, we're here to make authentic connections happen.
              </p>
            </div>
            
            <div className="flex justify-center items-center pt-8">
              <button 
                onClick={onNavigateToHostPortal}
                className="bg-white text-black px-12 py-6 rounded-2xl hover:bg-gray-100 transition-all duration-300 text-lg font-medium inline-flex items-center justify-center gap-3 min-w-[280px]"
              >
                List Your Center
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}