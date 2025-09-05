import { Skeleton } from "@/components/ui/skeleton";

export default function VenueCardSkeleton() {
  return (
    <div className="bg-white rounded-md overflow-hidden border border-gray-100">
      {/* Image skeleton */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Skeleton className="w-full h-full rounded-b-none" />
      </div>

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>

        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>

        {/* Capacity and rooms skeleton */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        {/* Rating and price skeleton */}
        <div className="flex items-center justify-between border-t border-gray-50 pt-3">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="text-right">
            <Skeleton className="h-5 w-20 mb-1" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
