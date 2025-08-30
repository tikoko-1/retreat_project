export default function KeyFactsStrip() {
  const facts = [
    { label: "40 guests", sublabel: "Maximum capacity" },
    { label: "3 spaces", sublabel: "Yoga, meditation, dining" },
    { label: "24/7 support", sublabel: "Dedicated team" },
    { label: "100% organic", sublabel: "Plant-based cuisine" }
  ];

  return (
    <section className="py-16 lg:py-24 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {facts.map((fact, index) => (
            <div key={index}>
              <div className="text-lg lg:text-xl mb-1">{fact.label}</div>
              <div className="text-sm text-gray-600">{fact.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}