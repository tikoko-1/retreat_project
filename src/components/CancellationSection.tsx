import { Calendar, AlertTriangle, RefreshCw, Shield, Clock, DollarSign } from "lucide-react";

export default function CancellationSection() {
  const cancellationTiers = [
    {
      period: "90+ days before arrival",
      refund: "100% refund",
      description: "Full refund minus payment processing fees. Cancel with complete peace of mind and minimal financial impact during this early planning phase."
    },
    {
      period: "60-89 days before arrival", 
      refund: "75% refund",
      description: "Partial refund to accommodate rebooking costs. We understand plans change and offer flexible terms during this advance booking period."
    },
    {
      period: "30-59 days before arrival",
      refund: "50% refund", 
      description: "Limited refund as we prepare for your arrival. Our team begins specific preparations and staff scheduling during this pre-arrival window."
    },
    {
      period: "14-29 days before arrival",
      refund: "25% refund",
      description: "Minimal refund due to confirmed arrangements. Final preparations are underway including catering orders and personalized retreat planning."
    },
    {
      period: "Less than 14 days",
      refund: "No refund",
      description: "Staff and resources fully committed to your group. All arrangements are finalized and our team is prepared exclusively for your retreat experience."
    }
  ];

  const specialCircumstances = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Travel Insurance",
      description: "We strongly recommend comprehensive travel insurance\nCovers medical emergencies, flight cancellations, and more"
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: "Force Majeure",
      description: "Natural disasters, government restrictions, pandemics\nFull credit or rescheduling options available"
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: "Rescheduling",
      description: "Change dates up to 60 days before arrival\nSubject to availability and potential rate differences"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Group Size Changes",
      description: "Minor adjustments (±20%) accepted up to 30 days prior\nMajor changes may affect pricing and availability"
    }
  ];

  return (
    <section className="py-16 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-5xl mb-6 font-light">Cancellation policy</h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
            We understand that plans can change. Our cancellation policy is designed to be fair while 
            protecting our ability to serve other retreat groups. We encourage all guests to purchase 
            travel insurance for additional protection.
          </p>
        </div>

        {/* Cancellation Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-light mb-8">Cancellation timeline</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cancellationTiers.map((tier, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <div className="grid gap-4">
                  <div>
                    <h4 className="text-lg mb-2 text-gray-900">{tier.period}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
                      tier.refund === "100% refund" ? "bg-green-100 text-green-800" :
                      tier.refund === "No refund" ? "bg-red-100 text-red-800" :
                      "bg-orange-100 text-orange-800"
                    }`}>
                      {tier.refund}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">{tier.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Circumstances */}
        <div className="mb-16">
          <h3 className="text-2xl font-light mb-8">Special circumstances</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {specialCircumstances.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 border border-gray-200 rounded-xl"
              >
                <div className="text-gray-600 flex-shrink-0 mt-1">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}