import { Suspense } from "react";
import CatalogClientPage from "./CatalogClientPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VenueCardSkeleton from "@/components/VenueCardSkeleton";

// This runs on the server and provides initial data
export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogClientPage initialSearchParams={await searchParams} />
      </Suspense>
      <Footer />
    </div>
  );
}

// Loading skeleton component
function CatalogSkeleton() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="h-16 bg-gray-200 rounded animate-pulse mb-4"></div>
          </div>
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="py-6 border-b border-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="h-6 w-44 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-44 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <section className="py-8">
          <div className="grid grid-cols-1 min-[700px]:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <VenueCardSkeleton
                key={i}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
