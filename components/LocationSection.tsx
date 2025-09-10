import { MapPin, Plane, Car, Clock, Navigation } from "lucide-react";
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const Map = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[3/2] lg:aspect-[5/1] bg-gray-100 rounded-xl flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  )
});

interface LocationSectionProps {
  latitude?: number;
  longitude?: number;
  address?: string;
  city?: string;
  country?: string;
  locationAbout?: string;
  howToGetHere?: any;
  nearbyAttractions?: any;
}

export default function LocationSection({
  latitude,
  longitude,
  address,
  city,
  country,
  locationAbout,
  howToGetHere,
  nearbyAttractions
}: LocationSectionProps) {
  return (
    <section className="py-16 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid gap-12">
          <h2 className="text-3xl lg:text-5xl font-light">
            Where you'll be
          </h2>

          {/* Map based on the latitude and longitude */}
          <div className="w-full aspect-[3/2] lg:aspect-[5/1] rounded-xl overflow-hidden">
            {latitude && longitude ? (
              <Map
                latitude={latitude}
                longitude={longitude}
                address={address}
                city={city}
                country={country}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <div className="text-gray-500">No location data available</div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* About the location */}
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-light">About the location</h3>
              <div className="grid gap-6 text-gray-700 leading-relaxed">
                {locationAbout ? (
                  <div
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{ __html: locationAbout }}
                  />
                ) : (
                  <>
                  </>
                )}
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="grid gap-4">
                  <h4 className="font-medium">Location details</h4>
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{address ?? `${city}, ${country}`}</span>
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

            {/* How to get here */}
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-light">How to get here</h3>

              <div className="grid gap-6">
                {howToGetHere && howToGetHere.length > 0 ? howToGetHere.map((item: any, idx: number) => (
                  <div className={`grid gap-3 pb-6 ${idx < howToGetHere.length - 1 ? 'border-b border-gray-100' : ''}`} key={idx}>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-600">
                      {item.text}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.note}
                    </p>
                  </div>
                )) : (
                  <p className="text-sm text-gray-600">No information available.</p>
                )}
              </div>
            </div>

            {/* Nearby attractions */}
            <div>
              <h3 className="text-2xl font-light mb-6">Nearby attractions</h3>

              <div className="space-y-3">
                {nearbyAttractions && nearbyAttractions.length > 0 ? nearbyAttractions.map((item: any, idx: number) => (
                  <div className="flex items-center justify-between" key={idx}>
                    <span className="text-sm text-gray-600">{item.name}</span>
                    <span className="text-xs text-gray-500">{item.distance} {item.unit} {item.note}</span>
                  </div>
                )) : (
                  <p className="text-sm text-gray-600">No information available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}