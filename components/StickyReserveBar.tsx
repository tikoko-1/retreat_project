import { useState, useEffect } from "react";

interface StickyReserveBarProps {
  onReserveClick: () => void;
}

export default function StickyReserveBar({ onReserveClick }: StickyReserveBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-medium">$45 per person</span>
              <span className="text-sm text-gray-600">per night</span>
            </div>
            <div className="text-sm text-gray-500">The Sanctuary Bali Retreat Center</div>
          </div>
        </div>
        
        {/* Primary CTA - Slightly Larger */}
        <button
          onClick={onReserveClick}
          className="bg-black text-white px-10 py-4 rounded-lg hover:bg-gray-900 transition-colors text-lg font-medium shadow-md hover:shadow-lg"
        >
          Request Availability
        </button>
      </div>
    </div>
  );
}