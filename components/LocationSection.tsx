import { MapPin, Plane, Car, Clock, Navigation } from "lucide-react";

export default function LocationSection() {
  return (
    <section className="py-16 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid gap-12">
          {/* Header */}
          <h2 className="text-3xl lg:text-5xl font-light">
            Where you'll be
          </h2>

          {/* Full-width Map */}
          <div className="w-full aspect-[3/2] lg:aspect-[5/1] bg-gray-100 rounded-xl overflow-hidden relative">
            {/* Mock Map Interface */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-50 to-blue-50"></div>
            
            {/* Map Controls */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <button className="w-8 h-8 bg-white rounded shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                <span className="text-gray-600 font-medium">+</span>
              </button>
              <button className="w-8 h-8 bg-white rounded shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                <span className="text-gray-600 font-medium">−</span>
              </button>
            </div>

            {/* Location Pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                  The Sanctuary Ubud
                </div>
              </div>
            </div>

            {/* Mock Road Lines - adjusted for wider aspect ratio */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200">
              <path
                d="M 100 100 Q 300 60 500 100 Q 700 140 900 100"
                stroke="#d1d5db"
                strokeWidth="3"
                fill="none"
                className="opacity-60"
              />
              <path
                d="M 500 20 Q 500 60 500 100 Q 500 140 500 180"
                stroke="#d1d5db"
                strokeWidth="3"
                fill="none"
                className="opacity-60"
              />
              <path
                d="M 200 140 Q 400 120 600 140 Q 800 160 900 140"
                stroke="#d1d5db"
                strokeWidth="2"
                fill="none"
                className="opacity-40"
              />
              <path
                d="M 150 60 Q 350 80 550 60 Q 750 40 850 60"
                stroke="#d1d5db"
                strokeWidth="2"
                fill="none"
                className="opacity-40"
              />
            </svg>

            {/* Map Attribution */}
            <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
              © MapProvider
            </div>
          </div>

          {/* Content in 3 columns */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Column 1: About Location */}
            <div className="grid gap-6">
              <h3 className="text-2xl font-light">About the location</h3>
              <div className="grid gap-6 text-gray-700 leading-relaxed">
                <p>
                  The Sanctuary is located in the heart of Ubud, Bali's spiritual and cultural center. Nestled among lush rice terraces and tropical rainforest, our retreat offers the perfect balance of tranquility and accessibility.
                </p>
                <p>
                  Ubud itself is a vibrant town known for its yoga studios, organic cafes, traditional markets, and world-class wellness practitioners. The town has an unhurried air, with tree-lined streets perfect for peaceful walks and contemplation.
                </p>
              </div>
              
              {/* Location Details */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="grid gap-4">
                  <h4 className="font-medium">Location details</h4>
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Ubud, Gianyar Regency, Bali, Indonesia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Check-in: 3:00 PM • Check-out: 11:00 AM</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Exact address provided 48 hours before arrival for security and privacy.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Transportation */}
            <div className="grid gap-6">
              <h3 className="text-2xl font-light">How to get here</h3>
              
              <div className="grid gap-6">
                {/* From Airport */}
                <div className="grid gap-3 pb-6 border-b border-gray-100">
                  <h4 className="font-medium">From Airport (DPS)</h4>
                  <p className="text-sm text-gray-600">
                    Private transfer: 1 hour 15 minutes through scenic Balinese countryside. Our preferred drivers know the route well and provide comfortable, air-conditioned vehicles.
                  </p>
                  <p className="text-xs text-gray-500">
                    $35-45 USD • Available 24/7 • We can arrange pickup upon request
                  </p>
                </div>

                {/* By Car */}
                <div className="grid gap-3 pb-6 border-b border-gray-100">
                  <h4 className="font-medium">By car or taxi</h4>
                  <p className="text-sm text-gray-600">
                    From Denpasar: 45 minutes via well-maintained roads. Local taxis (Blue Bird recommended) offer fixed rates. Grab and Gojek apps work well in this area.
                  </p>
                  <p className="text-xs text-gray-500">
                    Free secure parking available • Electric vehicle charging station on-site
                  </p>
                </div>

                {/* Local Transport */}
                <div className="grid gap-3">
                  <h4 className="font-medium">Around Ubud</h4>
                  <p className="text-sm text-gray-600">
                    Walk to center: 15 minutes through peaceful rice paddies. The scenic route includes traditional villages and stunning valley views perfect for mindful walking.
                  </p>
                  <p className="text-xs text-gray-500">
                    Complimentary bicycles available • Local motorbike taxi services nearby
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: Nearby Attractions */}
            <div>
              <h3 className="text-2xl font-light mb-6">Nearby attractions</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ubud Traditional Market</span>
                  <span className="text-xs text-gray-500">15 min walk</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sacred Monkey Forest</span>
                  <span className="text-xs text-gray-500">20 min walk</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tegallalang Rice Terraces</span>
                  <span className="text-xs text-gray-500">15 min drive</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Campuhan Ridge Walk</span>
                  <span className="text-xs text-gray-500">10 min walk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}