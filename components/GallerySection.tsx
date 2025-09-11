"use client"

import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getSupabaseImageUrl } from "@/lib/utils";
import { useState } from "react";
import GalleryModal from "./GalleryModal";
import { IVenuePhoto } from "@/types";

interface GallerySectionProps {
  galleryImages: IVenuePhoto[];
}

export default function GallerySection({ galleryImages }: GallerySectionProps) {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  return (
    <>
      <section className="py-16 lg:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12 px-6 lg:px-12">
            <h2 className="text-3xl lg:text-5xl font-light">Explore the space</h2>
            <p className="text-gray-600">{galleryImages.length} photos</p>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 md:hidden pl-6 scrollbar-hide">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`relative cursor-pointer overflow-hidden rounded-xl flex-shrink-0 w-72 ${index === galleryImages.length - 1 ? 'pr-6' : ''
                  }`}
                onClick={() => openModal(index)}
              >
                <ImageWithFallback
                  src={getSupabaseImageUrl(image.url)}
                  alt={image.alt_text}
                  className="w-full aspect-[4/3] object-cover rounded-xl"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-xl flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-medium mb-1 text-sm">{image.alt_text}</h3>
                    <p className="text-sm text-white/80">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 lg:px-12">
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
              {galleryImages.slice(0, 16).map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-xl"
                  onMouseEnter={() => setHoveredImage(index)}
                  onMouseLeave={() => setHoveredImage(null)}
                  onClick={() => openModal(index)}
                >
                  <ImageWithFallback
                    src={getSupabaseImageUrl(image.url)}
                    alt={image.alt_text}
                    className="w-full aspect-[4/3] object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className={`absolute inset-0 bg-black/60 rounded-xl transition-opacity duration-300 flex items-end p-4 ${hoveredImage === index ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <div className="text-white">
                      <h3 className="font-medium mb-1 text-sm">{image.alt_text}</h3>
                      <p className="text-sm text-white/80">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {galleryImages.length > 16 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => openModal(0)}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span>Show all {galleryImages.length} photos</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <GalleryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        images={galleryImages}
        initialIndex={selectedIndex}
      />
    </>
  );
}