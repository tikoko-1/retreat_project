import { Star, MessageCircle } from "lucide-react";

const reviews = [
  {
    id: "1",
    facilitatorName: "Dr. Sarah Chen",
    role: "Mindfulness Coach",
    rating: 5,
    date: "2024-03-10",
    text: "Absolutely incredible retreat center! The facilities are world-class and the staff went above and beyond to make our mindfulness retreat a success.",
    retreat: "7-day Mindfulness Retreat"
  },
  {
    id: "2",
    facilitatorName: "Lisa Rodriguez", 
    role: "Yoga Teacher",
    rating: 5,
    date: "2024-03-05",
    text: "Perfect setting for our yoga teacher training. The yoga shala is beautiful and the accommodation exceeded our expectations.",
    retreat: "200hr Yoga Teacher Training"
  }
];

export default function ReviewsSection() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-light mb-2">Reviews</h1>
        <p className="text-gray-600">View and respond to reviews from retreat facilitators.</p>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium text-gray-900">{review.facilitatorName}</h3>
                <p className="text-sm text-gray-600">{review.role}</p>
                <p className="text-xs text-gray-500 mt-1">{review.retreat}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{review.date}</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{review.text}</p>
            
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <MessageCircle className="w-4 h-4" />
              Reply to review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}