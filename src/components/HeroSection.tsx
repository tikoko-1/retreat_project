import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { MapPin, Star, ChevronRight, Heart, Home, Users, Bed, Bath, Check, Download } from "lucide-react";
import { useState } from "react";

interface HeroSectionProps {
  heroImages: Array<{ url: string; title: string; }>;
  onShowAllPhotos: () => void;
  onImageClick: (index: number) => void;
  onReserveClick: () => void;
}

export default function HeroSection({ heroImages, onShowAllPhotos, onImageClick, onReserveClick }: HeroSectionProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you could also add logic to save to local storage or API
  };
  return (
    <section className="relative mb-8">
      {/* Hero Gallery Grid - Full width without border radius */}
      <div className="w-full">
        {/* Mobile & Tablet: 2x2 Grid of 4 images */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-2 gap-1">
            {heroImages.slice(0, 4).map((image, index) => (
              <div key={index} className="aspect-square min-[600px]:aspect-[2/1] relative group cursor-pointer" onClick={() => onImageClick(index)}>
                <ImageWithFallback
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Original layout with one large + 6 smaller images */}
        <div className="hidden lg:flex h-[60vh] overflow-hidden gap-1">
          {/* Main large image - Left side */}
          <div className="flex-1 relative group cursor-pointer" onClick={() => onImageClick(0)}>
            <ImageWithFallback
              src={heroImages[0]?.url}
              alt={heroImages[0]?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
          
          {/* 6 smaller images grid - Right side */}
          <div className="flex flex-1 gap-1">
            <div className="flex flex-col flex-1 gap-1">
              {heroImages.slice(1, 4).map((image, index) => (
                <div key={index} className="flex-1 relative group cursor-pointer" onClick={() => onImageClick(index + 1)}>
                  <ImageWithFallback
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              ))}
            </div>
            <div className="flex flex-col flex-1 gap-1">
              {heroImages.slice(4, 7).map((image, index) => (
                <div key={index + 3} className="flex-1 relative group cursor-pointer" onClick={() => onImageClick(index + 4)}>
                  <ImageWithFallback
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>

      {/* Enhanced Content below hero */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <div className="grid gap-12">
              {/* Breadcrumbs and Add to Favorites */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                  <span className="hover:text-black cursor-pointer">All centers</span>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  <span className="hover:text-black cursor-pointer">Indonesia</span>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  <span className="text-black">Bali</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleFavorite}
                  className={`flex items-center gap-2 px-4 py-2 border-gray-300 hover:bg-gray-50 transition-colors shrink-0 self-start sm:self-auto ${
                    isFavorite ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' : ''
                  }`}
                >
                  <Heart 
                    className={`w-4 h-4 transition-colors ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`} 
                  />
                  <span className="text-sm">
                    {isFavorite ? 'Saved' : 'Add to Favorites'}
                  </span>
                </Button>
              </div>
              
              {/* Title and Location */}
              <div className="grid gap-6">
                <h1 className="text-4xl lg:text-5xl font-light">
                  The Sanctuary Bali Retreat Center
                </h1>
                <p className="text-xl text-gray-700 font-light">
                  Verified Retreat Center in Bali — ready for your next group.
                </p>
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-black text-black" />
                    ))}
                    <span className="ml-2 font-medium">5.0</span>
                    <span className="text-gray-600">• 25 facilitator reviews</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Ubud, Bali, Indonesia</span>
                  </div>
                  <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm">
                    <Check className="w-3 h-3" />
                    <span>Verified venue</span>
                  </div>
                </div>
              </div>

              {/* Venue Details */}
              <div className="border border-gray-200 rounded-lg">
                <div className="grid grid-cols-2 sm:grid-cols-4">
                  <div className="p-6 border-r border-gray-200 sm:border-r sm:last:border-r-0">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Home className="w-4 h-4 text-gray-700" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Type</div>
                        <div className="font-medium text-gray-900">Villa</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 sm:border-r border-gray-200">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-700" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Sleeps</div>
                        <div className="font-medium text-gray-900">18 - 25</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-r border-gray-200 border-t sm:border-t-0 sm:border-r">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Bed className="w-4 h-4 text-gray-700" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Bedrooms</div>
                        <div className="font-medium text-gray-900">11</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-t sm:border-t-0">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Bath className="w-4 h-4 text-gray-700" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Bathrooms</div>
                        <div className="font-medium text-gray-900">9</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Value Proposition for Facilitators */}
              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-xl font-medium mb-6">Why Facilitators Love Us</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium">Secure contracts & escrow</div>
                      <div className="text-sm text-gray-600">Protected payments and professional agreements</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium">Save 50+ hours of planning</div>
                      <div className="text-sm text-gray-600">Full-service support from booking to checkout</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium">Verified by real retreat leaders</div>
                      <div className="text-sm text-gray-600">Trusted by 200+ successful facilitators</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium">Repeat-ready bookings</div>
                      <div className="text-sm text-gray-600">Streamlined rebooking for returning groups</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="grid gap-8 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Our tranquil sanctuary in the heart of Ubud combines ancient Balinese traditions with modern wellness facilities. Designed specifically for facilitators, we provide professional-grade infrastructure while you focus on what matters most — your participants.
                </p>
                
                <p>
                  The 1,200 sq ft yoga shala features acoustics designed for sound healing, professional AV systems, and panoramic jungle views. Our 25 private suites combine traditional architecture with contemporary comfort, ensuring your group feels both grounded and luxurious.
                </p>
                
                <p>
                  With 25 years of hosting successful retreats, our dedicated team handles every logistical detail. From airport transfers to customized organic meals, we provide seamless support so you can focus entirely on delivering transformational experiences.
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div>
                <Button variant="outline" className="border-gray-300 hover:bg-gray-50 px-8 py-3 rounded-lg">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF brochure
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Simplified Pricing Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6 shadow-sm" data-pricing-section>
                <h3 className="text-xl font-medium mb-6">Pricing Overview</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 uppercase tracking-wide mb-1">Weekend Package</div>
                    <div className="text-3xl font-light">$850</div>
                    <div className="text-sm text-gray-500">2-3 days • Up to 20 people</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 uppercase tracking-wide mb-1">Week Retreat</div>
                    <div className="text-3xl font-light">$2,800</div>
                    <div className="text-sm text-gray-500">7 days • Up to 25 people</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 uppercase tracking-wide mb-1">Per Person/Night</div>
                    <div className="text-3xl font-light">$45</div>
                    <div className="text-sm text-gray-500">Flexible group pricing</div>
                  </div>
                </div>
                
                {/* Main CTA Button */}
                <div className="mb-6">
                  <Button 
                    className="w-full bg-black text-white hover:bg-gray-800 py-5 text-lg font-medium"
                    onClick={onReserveClick}
                  >
                    Request Availability
                  </Button>
                </div>
                
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600">
                    Detailed pricing and custom packages available on request.
                  </p>
                </div>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure booking • No charges until confirmation
                </p>
              </div>



              {/* Contact Host */}
              <div className="bg-gray-50 rounded-xl p-6 mt-6">
                <h4 className="font-medium mb-3">Need help planning?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Our retreat specialists can help you customize the perfect experience for your group.
                </p>
                <Button variant="outline" className="w-full border-gray-300">
                  Contact specialist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}