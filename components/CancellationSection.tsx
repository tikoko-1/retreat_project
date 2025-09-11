import { ICancellationPolicy } from "@/types";

export default function CancellationSection({ cancellationPolicies }: { cancellationPolicies: ICancellationPolicy[] }) {
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
            {cancellationPolicies.map((p, index) => {
              const label =
                p.refund_percent === 100 ? "100% refund" :
                  p.refund_percent === 0 ? "No refund" :
                    `${p.refund_percent}% refund`;
              const colorClass =
                p.refund_percent === 100 ? "bg-green-100 text-green-800" :
                  p.refund_percent === 0 ? "bg-red-100 text-red-800" :
                    "bg-orange-100 text-orange-800";
              return (
                <div key={p.id} className="bg-gray-50 p-6 rounded-xl">
                  <div className="grid gap-4">
                    <div>
                      {index === 0 ? (
                        <h4 className="text-lg mb-2 text-gray-900">{p.days_before}+ days before arrival</h4>
                      ) : (
                        <h4 className="text-lg mb-2 text-gray-900">{p.days_before}-{(cancellationPolicies[index - 1].days_before) - 1} days before arrival</h4>
                      )}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${colorClass}`}>
                        {label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {p.note}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="grid gap-4">
                <div>
                  <h4 className="text-lg mb-2 text-gray-900">Less than {cancellationPolicies[cancellationPolicies.length - 1].days_before} days</h4>
                  <span className="px-3 py-1 rounded-full text-sm font-medium inline-block bg-red-100 text-red-800">No refund</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">No refund if cancelled less than {cancellationPolicies[cancellationPolicies.length - 1].days_before} days prior.</p></div></div>
          </div>
        </div>

        {/* Special Circumstances */}
        {/* <div className="mb-16">
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
        </div> */}


      </div>
    </section>
  );
}