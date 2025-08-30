import { Star, ChevronDown, Instagram } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Review {
  name: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  review: string;
  avatar: string;
  instagram: string;
}

// Function to generate avatar based on name
const generateAvatar = (name: string): string => {
  const avatars = [
    "https://images.unsplash.com/photo-1676578732408-134d55bc408d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHdvbWFuJTIweW9nYSUyMGluc3RydWN0b3J8ZW58MXx8fHwxNzU1ODU2MzcxfDA&ixlib=rb-4.1.0&q=80&w=150",
    "https://images.unsplash.com/photo-1618425977996-bebc5afe88f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbiUyMG1lZGl0YXRpb24lMjB0ZWFjaGVyfGVufDF8fHx8MTc1NTg1NjM3Nnww&ixlib=rb-4.1.0&q=80&w=150",
    "https://images.unsplash.com/photo-1736939666660-d4c776e0532c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGJ1c2luZXNzJTIwd29tYW4lMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NTU4NTYzODB8MA&ixlib=rb-4.1.0&q=80&w=150",
    "https://images.unsplash.com/photo-1550378492-4903c3e172a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1pZGRsZSUyMGFnZWQlMjBtYW4lMjBjb2FjaHxlbnwxfHx8fDE3NTU4NTYzODN8MA&ixlib=rb-4.1.0&q=80&w=150",
    "https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGFzaWFuJTIwd29tYW4lMjB0ZWFjaGVyfGVufDF8fHx8MTc1NTg1NjM4N3ww&ixlib=rb-4.1.0&q=80&w=150",
    "https://images.unsplash.com/photo-1706841533834-6f0f090ba9f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGRpdmVyc2UlMjBwZW9wbGUlMjBjb2FjaGVzfGVufDF8fHx8MTc1NTg1NjM5MHww&ixlib=rb-4.1.0&q=80&w=150",
    "https://images.unsplash.com/photo-1739358276275-c1e2cd8a79fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGV0aG5pYyUyMHdvbWFuJTIwc3Bpcml0dWFsJTIwdGVhY2hlcnxlbnwxfHx8fDE3NTU4NTYzOTV8MA&ixlib=rb-4.1.0&q=80&w=150",
    "https://images.unsplash.com/photo-1584940120505-117038d90b05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGNvcnBvcmF0ZSUyMGV4ZWN1dGl2ZXxlbnwxfHx8fDE3NTU4NTYzOTl8MA&ixlib=rb-4.1.0&q=80&w=150",
    "https://images.unsplash.com/photo-1654002931929-70c5e3713bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGFmcmljYW4lMjBhbWVyaWNhbiUyMGNvYWNofGVufDF8fHx8MTc1NTg1NjQwM3ww&ixlib=rb-4.1.0&q=80&w=150",
    "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGxhdGlubyUyMG1hbiUyMGZpdG5lc3MlMjBpbnN0cnVjdG9yfGVufDF8fHx8MTc1NTg1NjQwOXww&ixlib=rb-4.1.0&q=80&w=150"
  ];
  
  // Use name to consistently assign same avatar
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % avatars.length;
  return avatars[index];
};

// Function to generate Instagram handle based on name
const generateInstagramHandle = (name: string): string => {
  const firstName = name.split(' ')[0].toLowerCase();
  const lastName = name.split(' ')[1] ? name.split(' ')[1].toLowerCase() : '';
  return `@${firstName}${lastName}yoga`;
};

// Raw review data without avatars and Instagram handles
const rawReviews = [
  {
    name: "Sarah Mitchell",
    role: "Yoga Teacher & Retreat Leader",
    location: "California, USA",
    rating: 5,
    date: "January 2025",
    review: "The most professional retreat space we've ever used. The 1,200 sq ft yoga shala has perfect acoustics for sound healing, and the natural lighting is incredible. Our 18-person group felt perfectly accommodated. The team's logistics support saved me weeks of planning."
  },
  {
    name: "Marcus Thompson",
    role: "Mindfulness Coach",
    location: "London, UK", 
    rating: 5,
    date: "December 2024",
    review: "Five-star execution from arrival to departure. The dedicated retreat coordinator handled every detail flawlessly - from airport transfers to dietary accommodations. I could focus 100% on teaching while they managed the logistics. Already booked for next year."
  },
  {
    name: "Elena Rodriguez",
    role: "Corporate Wellness Facilitator",
    location: "Barcelona, Spain",
    rating: 5,
    date: "November 2024",
    review: "Brought my executive team of 20 here for a leadership retreat. The conference facilities rival any business hotel, but the jungle setting created breakthrough moments. The professional AV setup handled our presentations perfectly. ROI was immediate."
  },
  {
    name: "Dr. James Peterson",
    role: "Breathwork Facilitator",
    location: "Melbourne, Australia", 
    rating: 5,
    date: "October 2024",
    review: "The sound isolation between rooms allowed multiple simultaneous sessions. Participants loved the variety of spaces - from intimate meditation corners to the grand ceremony hall. The sacred geometry in the architecture genuinely enhances the energy work."
  },
  {
    name: "Priya Sharma",
    role: "Ayurveda practitioner",
    location: "Mumbai, India",
    rating: 5,
    date: "October 2024",
    review: "The perfect blend of luxury and authenticity. The spa facilities are world-class and the setting feels truly sacred."
  },
  {
    name: "Jennifer Walsh",
    role: "Life coach",
    location: "Dublin, Ireland",
    rating: 5,
    date: "September 2024",
    review: "Outstanding support from the entire team. They anticipated every need and the 24/7 assistance was invaluable for our international group."
  },
  {
    name: "Ahmed Hassan",
    role: "Mindfulness instructor",
    location: "Dubai, UAE",
    rating: 5,
    date: "September 2024",
    review: "The infinity pool sessions at sunrise were magical. The architects clearly understood how space affects consciousness."
  },
  {
    name: "Lisa Anderson",
    role: "Breathwork facilitator",
    location: "Vancouver, Canada",
    rating: 5,
    date: "August 2024",
    review: "Eco-friendly practices throughout made our environmentally conscious group feel aligned with their values. Solar power and water conservation were impressive."
  },
  {
    name: "Roberto Silva",
    role: "Fitness instructor",
    location: "São Paulo, Brazil",
    rating: 5,
    date: "August 2024",
    review: "The gym exceeded expectations with top-quality equipment. The outdoor training areas in the jungle setting were unprecedented."
  },
  {
    name: "Anna Kowalski",
    role: "Yoga teacher trainer",
    location: "Warsaw, Poland",
    rating: 5,
    date: "July 2024",
    review: "Accommodation was luxurious yet grounding. Every room has its own character while maintaining the overall aesthetic. The bedding quality was hotel-standard."
  },
  {
    name: "Michael Taylor",
    role: "Retreat organizer",
    location: "Sydney, Australia",
    rating: 5,
    date: "July 2024",
    review: "Logistics were handled perfectly. Airport transfers, meal timing, room assignments - everything flowed effortlessly. This is how retreat centers should operate."
  },
  {
    name: "Fatima Al-Zahra",
    role: "Spiritual teacher",
    location: "Cairo, Egypt",
    rating: 5,
    date: "June 2024",
    review: "The energy of this place is palpable. You feel the intention and care that went into creating each space. The meditation hall has profound stillness."
  },
  {
    name: "James Wilson",
    role: "Corporate executive",
    location: "New York, USA",
    rating: 5,
    date: "June 2024",
    review: "As someone who attends many corporate retreats, this facility stands apart. The combination of nature and modern amenities created the perfect environment for our leadership training."
  },
  {
    name: "Camille Dubois",
    role: "Movement therapist",
    location: "Paris, France",
    rating: 5,
    date: "May 2024",
    review: "The variety of spaces allowed us to offer different experiences - from intimate sessions in the library to large group work in the main hall. Flexibility was key."
  },
  {
    name: "Hiroshi Tanaka",
    role: "Zen master",
    location: "Kyoto, Japan",
    rating: 5,
    date: "May 2024",
    review: "The design honors the principles of sacred geometry and natural harmony. Every angle and proportion feels intentional and supportive of practice."
  },
  {
    name: "Victoria Cross",
    role: "Trauma-informed yoga teacher",
    location: "Melbourne, Australia",
    rating: 5,
    date: "April 2024",
    review: "The safety and privacy of the space allowed for deep healing work. Sound isolation between rooms meant multiple groups could practice simultaneously."
  },
  {
    name: "Carlos Mendoza",
    role: "Shamanic practitioner",
    location: "Mexico City, Mexico",
    rating: 5,
    date: "April 2024",
    review: "The connection to nature is extraordinary. The jungle sounds create a natural soundtrack and the open-air design allows the elements to be part of the experience."
  },
  {
    name: "Ingrid Larsson",
    role: "Nordic walking instructor",
    location: "Stockholm, Sweden",
    rating: 5,
    date: "March 2024",
    review: "Trail access directly from the property opened up unique outdoor programming opportunities. The grounds maintenance is meticulous."
  },
  {
    name: "Rachel Green",
    role: "Nutritionist",
    location: "Portland, USA",
    rating: 5,
    date: "March 2024",
    review: "The organic garden tour and farm-to-table meals were educational highlights. Participants learned as much about nutrition as they did about movement."
  },
  {
    name: "Alessandro Rossi",
    role: "Sound healer",
    location: "Rome, Italy",
    rating: 5,
    date: "February 2024",
    review: "Acoustics in the main hall are phenomenal. The natural reverberation enhances crystal bowls and gongs perfectly. Architecture designed for sound healing."
  },
  {
    name: "Sophie Laurent",
    role: "Art therapy facilitator",
    location: "Geneva, Switzerland",
    rating: 5,
    date: "February 2024",
    review: "The natural light throughout the day creates an ever-changing canvas. The indoor-outdoor flow inspired creativity in ways I've never experienced."
  },
  {
    name: "William Brown",
    role: "Executive coach",
    location: "Toronto, Canada",
    rating: 5,
    date: "January 2024",
    review: "The business center facilities allowed for seamless hybrid retreats. Reliable internet and tech support meant we could include virtual participants without compromising the in-person experience."
  },
  {
    name: "Yuki Nakamura",
    role: "Tea ceremony master",
    location: "Osaka, Japan",
    rating: 5,
    date: "January 2024",
    review: "The tea pavilion became the heart of our cultural exchange retreat. The traditional elements combined with modern comfort created the perfect atmosphere for ceremony."
  },
  {
    name: "Emma Thompson",
    role: "Dance movement therapist",
    location: "Brighton, UK",
    rating: 5,
    date: "December 2023",
    review: "The flooring throughout is designed for movement - supportive yet soft. We could transition from yoga to dance to floor work seamlessly."
  },
  {
    name: "Dr. Maria Santos",
    role: "Holistic physician",
    location: "Lisbon, Portugal",
    rating: 5,
    date: "December 2023",
    review: "The health and safety protocols exceeded medical standards. The air purification system and hygiene facilities made everyone feel secure during our wellness intensive."
  }
];

// Generate complete testimonials with avatars and Instagram handles
const facilitatorTestimonials: Review[] = rawReviews.map(review => ({
  ...review,
  avatar: generateAvatar(review.name),
  instagram: generateInstagramHandle(review.name)
}));

export default function TestimonialsSection() {
  const [showAll, setShowAll] = useState(false);
  
  // Show first 3 testimonials initially
  const highlightedTestimonials = facilitatorTestimonials.slice(0, 3);
  const remainingTestimonials = facilitatorTestimonials.slice(3);
  
  return (
    <section className="py-16 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl mb-6 font-light">What facilitators say</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-black text-black" />
              ))}
            </div>
            <span className="text-xl font-medium">5.0</span>
            <span className="text-gray-600">• {facilitatorTestimonials.length} facilitator reviews</span>
          </div>
        </div>
        
        {/* Highlighted testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {highlightedTestimonials.map((review, index) => (
            <div 
              key={index} 
              className="bg-gray-50 hover:bg-gray-100 p-6 rounded-xl transition-colors duration-200 flex flex-col h-full"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-4 h-4 ${star <= review.rating ? 'fill-black text-black' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <div className="flex-1">
                <p className="text-gray-900 leading-relaxed">
                  "{review.review}"
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-start gap-3">
                  <ImageWithFallback
                    src={review.avatar}
                    alt={`${review.name} profile picture`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <a
                        href={`https://instagram.com/${review.instagram.slice(1)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-gray-700 transition-colors flex items-center gap-1"
                      >
                        {review.name}
                        <Instagram className="w-4 h-4 text-gray-500 hover:text-pink-600 transition-colors" />
                      </a>
                    </div>
                    <div className="text-sm text-gray-600">{review.role}</div>
                    <div className="text-sm text-gray-500">{review.location} • {review.date}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Expandable section for remaining testimonials */}
        {remainingTestimonials.length > 0 && (
          <div>
            <div className="text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span>{showAll ? 'Show fewer reviews' : `Show all ${facilitatorTestimonials.length} reviews`}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {showAll && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {remainingTestimonials.map((review, index) => (
                  <div 
                    key={index + highlightedTestimonials.length} 
                    className="bg-gray-50 hover:bg-gray-100 p-6 rounded-xl transition-colors duration-200 text-left flex flex-col h-full"
                  >
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= review.rating ? 'fill-black text-black' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-gray-900 leading-relaxed">
                        "{review.review}"
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex items-start gap-3">
                        <ImageWithFallback
                          src={review.avatar}
                          alt={`${review.name} profile picture`}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <a
                              href={`https://instagram.com/${review.instagram.slice(1)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium hover:text-gray-700 transition-colors flex items-center gap-1"
                            >
                              {review.name}
                              <Instagram className="w-4 h-4 text-gray-500 hover:text-pink-600 transition-colors" />
                            </a>
                          </div>
                          <div className="text-sm text-gray-600">{review.role}</div>
                          <div className="text-sm text-gray-500">{review.location} • {review.date}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}