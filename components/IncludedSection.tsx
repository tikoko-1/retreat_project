"use client"

import { Check, X, ChevronDown } from "lucide-react";
import { useState } from "react";

const topIncluded = [
  "Professional retreat coordination",
  "All organic meals (breakfast, lunch, dinner)",
  "Accommodation for up to 25 participants",
  "Use of yoga shala and meditation spaces",
  "High-speed Wi-Fi throughout property",
  "Professional AV equipment and sound system",
  "24/7 on-site staff support",
  "Airport transfer coordination"
];

const additionalIncluded = [
  "Daily housekeeping for all rooms",
  "Welcome ceremony and orientation",
  "Use of infinity pool and fitness center",
  "Complimentary herbal teas and purified water",
  "Access to wellness library and reading areas",
  "Organic garden tour and introduction",
  "Basic first aid and emergency support",
  "Luggage storage before check-in/after checkout",
  "Complimentary bicycle rental",
  "Local area maps and recommendations",
  "Use of all common areas and terraces",
  "Traditional Balinese blessing ceremony",
  "Photography assistance for group photos",
  "Coordination with local wellness practitioners"
];

const topNotIncluded = [
  "International flights to/from Bali",
  "Visa fees and travel insurance",
  "Personal spa treatments and massages",
  "Alcoholic beverages (available for purchase)",
  "Private chef services (available on request)",
  "Laundry services (available for fee)"
];

const additionalNotIncluded = [
  "Personal retreat facilitator or teacher",
  "Excursions and activities outside the property",
  "Personal shopping and souvenirs",
  "Additional meals outside scheduled times",
  "Private transportation beyond airport transfers",
  "Phone calls and internet charges",
  "Travel to local attractions and temples",
  "Personal yoga mats and props",
  "Travel medications and personal health items",
  "Tips and gratuities for staff",
  "Extended accommodation beyond retreat dates",
  "Personal travel guide services"
];

export default function IncludedSection() {
  const [showAllIncluded, setShowAllIncluded] = useState(false);
  const [showAllNotIncluded, setShowAllNotIncluded] = useState(false);

  return (
    <section className="py-16 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-3xl lg:text-5xl mb-12 font-light">What's included</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {/* Included */}
          <div>
            <h3 className="text-2xl mb-6 font-light flex items-center gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              Included
            </h3>
            
            <div className="space-y-3">
              {topIncluded.map((item, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-700">
                  <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
              
              {showAllIncluded && additionalIncluded.map((item, index) => (
                <div key={`additional-${index}`} className="flex items-start gap-3 text-gray-700">
                  <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setShowAllIncluded(!showAllIncluded)}
              className="flex items-center gap-2 mt-4 text-sm text-gray-600 hover:text-black transition-colors"
            >
              <span>
                {showAllIncluded 
                  ? 'Show less' 
                  : `Show ${additionalIncluded.length} more included items`
                }
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAllIncluded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Not Included */}
          <div>
            <h3 className="text-2xl mb-6 font-light flex items-center gap-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <X className="w-4 h-4 text-red-600" />
              </div>
              Not included
            </h3>
            
            <div className="space-y-3">
              {topNotIncluded.map((item, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-700">
                  <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
              
              {showAllNotIncluded && additionalNotIncluded.map((item, index) => (
                <div key={`not-additional-${index}`} className="flex items-start gap-3 text-gray-700">
                  <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setShowAllNotIncluded(!showAllNotIncluded)}
              className="flex items-center gap-2 mt-4 text-sm text-gray-600 hover:text-black transition-colors"
            >
              <span>
                {showAllNotIncluded 
                  ? 'Show less' 
                  : `Show ${additionalNotIncluded.length} more excluded items`
                }
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAllNotIncluded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}