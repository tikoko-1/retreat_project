import { ArrowRight } from "lucide-react";

interface HostPortalCTAProps {
  onNavigateToHostPortal?: () => void;
}

export default function HostPortalCTA({ onNavigateToHostPortal }: HostPortalCTAProps) {
  return (
    <section className="py-16 lg:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl lg:text-5xl tracking-tight font-light mb-6 text-gray-900">
          Ready to List Your Retreat Center?
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-12 leading-relaxed text-gray-600">
          Join thousands of retreat centers worldwide and connect with passionate retreat leaders.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={onNavigateToHostPortal}
            className="px-8 py-4 rounded-lg transition-colors font-semibold flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800"
          >
            <span>Start Listing</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button className="underline underline-offset-4 transition-colors font-medium text-gray-600 hover:text-gray-900">
            Learn How It Works
          </button>
        </div>
      </div>
    </section>
  );
}