import { Button } from "./ui/button";

interface CallToActionSectionProps {
  onReserveClick?: () => void;
}

export default function CallToActionSection({
  onReserveClick,
}: CallToActionSectionProps) {
  return (
    <section className="py-16 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl mb-6 font-light">
            Ready to create your perfect retreat?
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            Connect with 50+ premium retreat centers worldwide and access our
            curated network of extraordinary venues.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="!bg-black !text-white hover:!bg-gray-800 !px-8 !py-4 !rounded-lg !h-auto !min-h-0"
              onClick={onReserveClick}
            >
              Explore Centers
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="!border-black !text-black hover:!bg-gray-50 !px-8 !py-4 !rounded-lg !h-auto !min-h-0"
              onClick={onReserveClick}
            >
              Join Platform
            </Button>
          </div>

          {/* B2B Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-light mb-2">50+</div>
              <div className="text-sm text-gray-600">Premium Centers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-light mb-2">500+</div>
              <div className="text-sm text-gray-600">Retreats Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-light mb-2">24/7</div>
              <div className="text-sm text-gray-600">Platform Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-light mb-2">4.9</div>
              <div className="text-sm text-gray-600">Platform Rating</div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>Premium vetted locations worldwide</div>
            <div>Verified retreat centers only</div>
            <div>Full concierge service included</div>
          </div>
        </div>
      </div>
    </section>
  );
}
