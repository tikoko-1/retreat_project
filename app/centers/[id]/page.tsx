"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyPricingBar from "@/components/StickyPricingBar";
import HeroSection from "@/components/HeroSection";
import ReservationModal from "@/components/ReservationModal";
import LocationSection from "@/components/LocationSection";
import GallerySection from "@/components/GallerySection";
import FeaturesSection from "@/components/FeaturesSection";
import RoomsSection from "@/components/RoomsSection";
import FoodSection from "@/components/FoodSection";
import IncludedSection from "@/components/IncludedSection";
import CancellationSection from "@/components/CancellationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToActionSection from "@/components/CallToActionSection";
import { RetreatDetails } from "@/types";

interface RetreatPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function RetreatPage({ params }: RetreatPageProps) {
  const [retreat, setRetreat] = useState<RetreatDetails>();
  const [showReservationModal, setShowReservationModal] = useState(false);

  useEffect(() => {
    const fetchRetreat = async () => {
      try {
        const { id } = await params;
        const response = await fetch(`/api/venues/${id}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          notFound();
        }
        const data = await response.json();
        if (!data.success) {
          notFound();
        }
        setRetreat(data.retreat);
      } catch (err) {
        console.error("Error fetching retreat:", err);
        notFound();
      }
    };

    fetchRetreat();
  }, [params]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {retreat && (
        <>
          <StickyPricingBar retreat={retreat} onReserveClick={() => setShowReservationModal(true)} />
          <HeroSection retreat={retreat} onReserveClick={() => setShowReservationModal(true)} />
          <LocationSection
            latitude={retreat?.latitude}
            longitude={retreat?.longitude}
            address={retreat?.address}
            city={retreat?.city}
            country={retreat?.country}
            locationAbout={retreat?.location_about}
            howToGetHere={retreat?.how_to_get_here}
            nearbyAttractions={retreat?.nearby_attractions}
          />
          {retreat.photos && retreat.photos.length > 0 && (
            <GallerySection galleryImages={retreat.photos} />
          )}
          {retreat.amenities && retreat.amenities.length > 0 && (
            <FeaturesSection amenities={retreat.amenities} />
          )}
          {retreat.rooms && retreat.rooms.length > 0 && (
            <RoomsSection rooms={retreat.rooms} />
          )}
          <FoodSection
            amenities={retreat.amenities || []}
            foodDining={retreat.food_dining || []}
          />
          <IncludedSection
            includedItems={retreat.included_items}
            excludedItems={retreat.excluded_items}
          />
          {retreat.cancellation_policies &&
            retreat.cancellation_policies.length > 0 && (
              <CancellationSection
                cancellationPolicies={retreat.cancellation_policies}
              />
            )}
          {retreat.reviews && retreat.reviews.length > 0 && (
            <TestimonialsSection
              initReviews={retreat.reviews}
              review_stats={retreat.review_stats}
              retreatId={retreat.id}
            />
          )}
        </>
      )}
      <CallToActionSection />
      <Footer />
      {retreat && (
        <ReservationModal
          isOpen={showReservationModal}
          onClose={() => setShowReservationModal(false)}
          retreat={retreat}
        />
      )}
    </div>
  );
}
