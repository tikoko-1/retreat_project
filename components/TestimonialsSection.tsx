"use client";

import { Star, ChevronDown, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getSupabaseImageUrl } from "@/lib/utils";
import { IReview } from "@/types";

interface ReviewsSectionProps {
  retreatId: string;
  initReviews: IReview[];
  review_stats: {
    avg_rating: number;
    review_count: number;
  };
}

export default function TestimonialsSection({
  initReviews,
  review_stats,
  retreatId,
}: ReviewsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [displayedReviews, setDisplayedReviews] =
    useState<IReview[]>(initReviews);
  const [allReviews, setAllReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadedAllReviews, setLoadedAllReviews] = useState(false);
  const formatMonthYear = (isoDate: string) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date);
  };
  const handleShowAll = async () => {
    if (showAll) {
      setDisplayedReviews(initReviews);
      setShowAll(false);
    } else {
      if (loadedAllReviews) {
        setDisplayedReviews(allReviews);
        setShowAll(true);
        return;
      } else {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/reviews/${retreatId}?offsetCount=3`,
            {
              cache: "no-store",
            }
          );

          if (!response.ok) {
            throw new Error(
              `API Error: ${response.status} ${response.statusText}`
            );
          }

          const data = await response.json();
          if (!data.success) {
            throw new Error(data.error || "Failed to fetch reviews");
          }

          setAllReviews([...initReviews, ...data.reviews]);
          setDisplayedReviews([...initReviews, ...data.reviews]);
          setShowAll(true);
        } catch (error) {
          console.error("Error fetching reviews:", error);
          setDisplayedReviews([...initReviews]);
          setShowAll(true);
        } finally {
          setLoading(false);
          setLoadedAllReviews(true);
        }
      }
    }
  };

  return (
    <section className="py-16 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl mb-6 font-light">
            What facilitators say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const rating = review_stats.avg_rating;
                const isFull = star <= Math.floor(rating);
                const isPartial =
                  star === Math.ceil(rating) && rating % 1 !== 0;
                const partialFill = isPartial ? (rating % 1) * 100 : 0;

                return (
                  <div key={star} className="relative w-5 h-5">
                    <Star className="w-5 h-5 text-gray-300 absolute" />
                    {isFull && (
                      <Star className="w-5 h-5 fill-black text-black absolute" />
                    )}
                    {isPartial && (
                      <div
                        className="absolute overflow-hidden"
                        style={{ width: `${partialFill}%` }}
                      >
                        <Star className="w-5 h-5 fill-black text-black" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <span className="text-xl font-medium">
              {review_stats.avg_rating.toFixed(1)}
            </span>
            <span className="text-gray-600">
              • {review_stats.review_count} facilitator reviews
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {displayedReviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 hover:bg-gray-100 p-6 rounded-xl transition-colors duration-200 flex flex-col h-full"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= (review.rating ?? 0)
                        ? "fill-black text-black"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <div className="flex-1">
                <p className="text-gray-900 leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-start gap-3">
                  <ImageWithFallback
                    src={getSupabaseImageUrl(review.user.avatar_url ?? "")}
                    alt={`${review.comment} profile picture`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <a
                        href={review.user.instagram_url ?? "javascript:void(0)"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-gray-700 transition-colors flex items-center gap-1"
                      >
                        {review.user.name}
                        {review.user.instagram_url && (
                          <Instagram className="w-4 h-4 text-gray-500 hover:text-pink-600 transition-colors" />
                        )}
                      </a>
                    </div>
                    <div className="text-sm text-gray-600">
                      {review.user.position ?? ""}
                    </div>
                    <div className="text-sm text-gray-500">
                      {review.user.address ? `${review.user.address} •` : ""}{" "}
                      {formatMonthYear(review.created_at)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {review_stats.review_count > initReviews.length && (
          <div>
            <div className="text-center">
              <button
                onClick={handleShowAll}
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span>Loading reviews...</span>
                ) : (
                  <>
                    <span>
                      {showAll
                        ? "Show fewer reviews"
                        : `Show all ${review_stats.review_count} reviews`}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        showAll ? "rotate-180" : ""
                      }`}
                    />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
