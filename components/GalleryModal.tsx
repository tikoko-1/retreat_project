import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getSupabaseImageUrl } from "@/lib/utils";
import { IVenuePhoto } from "@/types";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: IVenuePhoto[];
  initialIndex?: number;
}

export default function GalleryModal({ isOpen, onClose, images, initialIndex = 0 }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between p-4 min-[640px]:p-6">
          <div className="text-white">
            <h3 className="text-base min-[640px]:text-lg font-medium">{currentImage.alt_text ?? ''}</h3>
            <p className="text-xs min-[640px]:text-sm text-white/80">
              {currentIndex + 1} of {images.length} photos
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 min-[640px]:w-10 min-[640px]:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4 min-[640px]:w-5 min-[640px]:h-5" />
          </button>
        </div>
      </div>

      {/* Main Image */}
      <div className="flex items-center justify-center h-full px-0 py-0 min-[640px]:px-8 min-[640px]:py-8 lg:px-20 lg:py-20">
        <div className="relative w-full h-full min-[640px]:max-w-full min-[640px]:max-h-full">
          <ImageWithFallback
            src={currentImage.url ? getSupabaseImageUrl(currentImage.url) : ''}
            alt={currentImage.alt_text || ''}
            className="w-full h-full min-[640px]:max-w-full min-[640px]:max-h-full object-contain"
          />
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-2 min-[640px]:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 min-[640px]:w-12 min-[640px]:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            disabled={images.length <= 1}
          >
            <ChevronLeft className="w-5 h-5 min-[640px]:w-6 min-[640px]:h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 min-[640px]:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 min-[640px]:w-12 min-[640px]:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            disabled={images.length <= 1}
          >
            <ChevronRight className="w-5 h-5 min-[640px]:w-6 min-[640px]:h-6" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent">
        <div className="p-4 min-[640px]:p-6">
          <div className="flex items-center justify-center gap-1 min-[640px]:gap-2 overflow-x-auto scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-12 h-9 min-[640px]:w-16 min-[640px]:h-12 rounded-md min-[640px]:rounded-lg overflow-hidden border-2 transition-all ${index === currentIndex
                  ? 'border-white shadow-lg'
                  : 'border-transparent opacity-60 hover:opacity-80'
                  }`}
              >
                <ImageWithFallback
                  src={getSupabaseImageUrl(image.url)}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Description */}
          {currentImage?.description && (
            <div className="text-center mt-3 min-[640px]:mt-4">
              <p className="text-white/90 text-xs min-[640px]:text-sm max-w-2xl mx-auto px-2">
                {currentImage.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Background Click to Close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
      />
    </div>
  );
}