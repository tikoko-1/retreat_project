"use client"

import { Check, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSiteCopy } from "@/contexts/SiteCopyContext";

interface IncludedSectionProps {
  includedItems?: string[];
  excludedItems?: string[];
}

export default function IncludedSection({ includedItems, excludedItems }: IncludedSectionProps) {
  const [showAllIncluded, setShowAllIncluded] = useState(false);
  const [showAllNotIncluded, setShowAllNotIncluded] = useState(false);
  const { siteCopy: siteConfig } = useSiteCopy();

  const INCLUDED_INITIAL = 8;
  const EXCLUDED_INITIAL = 6;

  const finalIncludedItems = (includedItems && includedItems.length > 0) ? includedItems : siteConfig?.included?.map(item => item.title) || [];
  const finalExcludedItems = (excludedItems && excludedItems.length > 0) ? excludedItems : siteConfig?.excluded?.map(item => item.title) || [];

  const visibleIncluded = showAllIncluded
    ? finalIncludedItems
    : finalIncludedItems.slice(0, INCLUDED_INITIAL);
  const visibleExcluded = showAllNotIncluded
    ? finalExcludedItems
    : finalExcludedItems.slice(0, EXCLUDED_INITIAL);

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
              {visibleIncluded.map((item, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-700">
                  <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            {(finalIncludedItems.length > INCLUDED_INITIAL) && (
              <button
                onClick={() => setShowAllIncluded(!showAllIncluded)}
                className="flex items-center gap-2 mt-4 text-sm text-gray-600 hover:text-black transition-colors"
              >
                <span>
                  {showAllIncluded
                    ? 'Show less'
                    : `Show ${finalIncludedItems.length - INCLUDED_INITIAL} more included items`}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showAllIncluded ? 'rotate-180' : ''}`} />
              </button>
            )}
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
              {visibleExcluded.map((item, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-700">
                  <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            {(finalExcludedItems.length > EXCLUDED_INITIAL) && (
              <button
                onClick={() => setShowAllNotIncluded(!showAllNotIncluded)}
                className="flex items-center gap-2 mt-4 text-sm text-gray-600 hover:text-black transition-colors"
              >
                <span>
                  {showAllNotIncluded
                    ? 'Show less'
                    : `Show ${finalExcludedItems.length - EXCLUDED_INITIAL} more excluded items`}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showAllNotIncluded ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}