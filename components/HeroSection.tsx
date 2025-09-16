"use client"

import { Button } from "./ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { MapPin, Star, ChevronRight, Heart, Home, Users, Bed, Bath, Check, Download } from "lucide-react";
import { useState } from "react";
import { getSupabaseImageUrl } from "@/lib/utils";
import { RetreatDetails, SiteCopyBlock } from "@/types";
import GalleryModal from "./GalleryModal";
import { useSiteCopy } from "@/contexts/SiteCopyContext";
import { openCrispChat } from "./ui/crisp";

interface HeroSectionProps {
  retreat?: RetreatDetails;
  onShowAllPhotos?: () => void;
  onImageClick?: (index: number) => void;
  onReserveClick?: () => void;
}


export default function HeroSection({ retreat, onShowAllPhotos, onImageClick, onReserveClick }: HeroSectionProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { siteCopy: siteConfig } = useSiteCopy();

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <>
      <section className="relative mb-8 border-t border-gray-100">
        <div className="w-full">
          <div className="block lg:hidden">
            <div className="grid grid-cols-2 gap-1">
              {retreat?.photos?.slice(0, 4).map((image, index) => (
                <div key={index} className="aspect-square min-[600px]:aspect-[2/1] relative group cursor-pointer" onClick={() => openModal(index)}>
                  <ImageWithFallback
                    src={getSupabaseImageUrl(image.url)}
                    alt={image.alt_text}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex h-[60vh] overflow-hidden gap-1">
            <div className="flex-1 relative group cursor-pointer" onClick={() => openModal(0)}>
              <ImageWithFallback
                src={retreat?.photos?.[0] ? getSupabaseImageUrl(retreat?.photos?.[0].url) : '/placeholder.jpg'}
                alt={retreat?.photos?.[0]?.alt_text || 'Retreat image'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>

            <div className="flex flex-1 gap-1">
              <div className="flex flex-col flex-1 gap-1">
                {retreat?.photos?.slice(1, 4).map((image, index) => (
                  <div key={index} className="flex-1 relative group cursor-pointer" onClick={() => openModal(index + 1)}>
                    <ImageWithFallback
                      src={getSupabaseImageUrl(image.url)}
                      alt={image.alt_text}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col flex-1 gap-1">
                {retreat?.photos?.slice(4, 7).map((image, index) => (
                  <div key={index + 3} className="flex-1 relative group cursor-pointer" onClick={() => openModal(index + 4)}>
                    <ImageWithFallback
                      src={getSupabaseImageUrl(image.url)}
                      alt={image.alt_text}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="grid gap-12">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                    <span className="hover:text-black cursor-pointer">All centers</span>
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                    <span className="hover:text-black cursor-pointer">{retreat?.country}</span>
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                    <span className="text-black">{retreat?.city}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleToggleFavorite}
                    className={`flex items-center gap-2 px-4 py-2 border-gray-300 hover:bg-gray-50 transition-colors shrink-0 self-start sm:self-auto ${isFavorite ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' : ''
                      }`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                        }`}
                    />
                    <span className="text-sm">
                      {isFavorite ? 'Saved' : 'Add to Favorites'}
                    </span>
                  </Button>
                </div>

                {/* Title and Location */}
                <div className="grid gap-6">
                  <h1 className="text-4xl lg:text-5xl font-light">
                    {retreat?.title}
                  </h1>
                  {retreat?.hero_subline && (
                    <p className="text-xl text-gray-700 font-light">
                      {retreat.hero_subline}
                    </p>
                  )}
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const rating = retreat?.review_stats?.avg_rating ?? 0;
                        const isFull = star <= Math.floor(rating);
                        const isPartial = star === Math.ceil(rating) && rating % 1 !== 0;
                        const partialFill = isPartial ? (rating % 1) * 100 : 0;

                        return (
                          <div key={star} className="relative w-4 h-4">
                            <Star className="w-4 h-4 text-gray-300 absolute" />
                            {/* Filled portion */}
                            {isFull && (
                              <Star className="w-4 h-4 fill-black text-black absolute" />
                            )}
                            {isPartial && (
                              <div className="absolute overflow-hidden" style={{ width: `${partialFill}%` }}>
                                <Star className="w-4 h-4 fill-black text-black" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                      <span className="ml-2 font-medium">{(retreat?.review_stats?.avg_rating ?? 0).toFixed(1)}</span>
                      <span className="text-gray-600">• {retreat?.review_stats?.review_count ?? 0} facilitator reviews</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{retreat?.city}, {retreat?.country}</span>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm ${retreat?.label === 'New' ? 'bg-red-50 text-red-700' :
                      retreat?.label === 'Verified' ? 'bg-green-50 text-green-700' :
                        retreat?.label === 'Popular' ? 'bg-blue-50 text-blue-700' :
                          'bg-green-50 text-green-700' // Default fallback
                      }`}>
                      <Check className="w-3 h-3" />
                      <span>{retreat?.label ?? 'New'} venue</span>
                    </div>
                  </div>
                </div>

                {/* Venue Details */}
                <div className="border border-gray-200 rounded-lg">
                  <div className="grid grid-cols-2 sm:grid-cols-4">
                    <div className="p-6 border-r border-gray-200 sm:border-r sm:last:border-r-0">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Home className="w-4 h-4 text-gray-700" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Type</div>
                          <div className="font-medium text-gray-900">{retreat?.type?.name ?? ''}</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 sm:border-r border-gray-200">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-gray-700" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Sleeps</div>
                          <div className="font-medium text-gray-900">{retreat?.capacity_max ? `${retreat?.capacity_min ?? 0} - ${retreat?.capacity_max}` : `${retreat?.capacity_min ?? 0}+`}</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 border-r border-gray-200 border-t sm:border-t-0 sm:border-r">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Bed className="w-4 h-4 text-gray-700" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Bedrooms</div>
                          <div className="font-medium text-gray-900">{retreat?.bedrooms ?? 0}</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 border-t sm:border-t-0">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Bath className="w-4 h-4 text-gray-700" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Bathrooms</div>
                          <div className="font-medium text-gray-900">{retreat?.bathrooms ?? 0}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why Facilitators Love Us */}
                {siteConfig['why_facilitators_love_us'] && (
                  <div className="bg-gray-50 rounded-xl p-8">
                    <h3 className="text-xl font-medium mb-6">Why Facilitators Love Us</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {siteConfig['why_facilitators_love_us'].map((block: SiteCopyBlock, index: number) => (
                        <div className="flex items-start gap-3" key={index}>
                          <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                          <div>
                            <div className="font-medium">{block.title}</div>
                            <div className="text-sm text-gray-600">{block.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Description */}
                <div className="grid gap-8 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: retreat?.description ?? '' }}>
                </div>

                {/* Download PDF brochure */}
                <div>
                  <Button
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50 px-8 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-[190px]"
                    disabled={isDownloading}
                    onClick={async () => {
                      if (retreat?.id && !isDownloading) {
                        setIsDownloading(true);
                        try {
                          const link = document.createElement('a');
                          link.href = `/api/venues/${retreat.id}/brochure.pdf`;
                          link.download = `${retreat.title?.replace(/[^a-z0-9]/gi, "_") || "retreat"}-brochure.pdf`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);

                          // Reset loading state after a short delay to allow download to start
                          setTimeout(() => {
                            setIsDownloading(false);
                          }, 2000);
                        } catch (error) {
                          console.error('Download failed:', error);
                          setIsDownloading(false);
                        }
                      }
                    }}
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF brochure
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Pricing Overview */}
                {retreat?.pricing && retreat.pricing.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6 shadow-sm" data-pricing-section>
                    <h3 className="text-xl font-medium mb-6">Pricing Overview</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 mb-8">
                      {retreat.pricing.map((price) => (
                        <div className="text-center p-4 bg-gray-50 rounded-lg" key={price.id}>
                          <div className="text-sm text-gray-600 uppercase tracking-wide mb-1">{price.billing_unit}</div>
                          <div className="text-3xl font-light">{price.currency}{price.amount}</div>
                          <div className="text-sm text-gray-500">
                            {price.note}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Request Availability */}
                    <div className="mb-6">
                      <Button
                        className="w-full bg-black text-white hover:bg-gray-800 py-5 text-lg font-medium"
                        onClick={onReserveClick}
                      >
                        Request Availability
                      </Button>
                    </div>

                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600">
                        Detailed pricing and custom packages available on request.
                      </p>
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      Secure booking • No charges until confirmation
                    </p>
                  </div>
                )}

                {/* Contact specialist */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-medium mb-3">Need help planning?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Our retreat specialists can help you customize the perfect experience for your group.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300"
                    onClick={openCrispChat}
                  >
                    Contact specialist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GalleryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        images={retreat?.photos ?? []}
        initialIndex={selectedIndex}
      />
    </>
  );
}