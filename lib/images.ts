// Utility functions for handling Supabase storage images

/**
 * Get the full public URL for a Supabase storage image
 * @param path - The storage path (e.g., 'venue_photos/venue-1.avif')
 * @param bucket - The bucket name (defaults to 'venue_photos')
 * @returns Full public URL for the image
 */
export function getSupabaseImageUrl(
  path: string,
  bucket: string = "venue_photos"
): string {
  if (!path) return "";

  // If it's already a full URL, return as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // If it's a Supabase storage path, construct the full URL
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl) {
    // Remove the bucket prefix if it exists in the path
    const cleanPath = path.startsWith(`${bucket}/`)
      ? path.replace(`${bucket}/`, "")
      : path;
    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${cleanPath}`;
  }

  // Fallback to placeholder image
  return getPlaceholderImage();
}

/**
 * Get a placeholder image URL
 * @returns URL to a placeholder image
 */
export function getPlaceholderImage(): string {
  return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";
}

/**
 * Get image URL for different bucket types
 */
export const imageUtils = {
  venue: (path: string) => getSupabaseImageUrl(path, "venue_photos"),
  avatar: (path: string) => getSupabaseImageUrl(path, "avatars"),
  blog: (path: string) => getSupabaseImageUrl(path, "blog_covers"),
  guide: (path: string) => getSupabaseImageUrl(path, "guide_covers"),
  placeholder: getPlaceholderImage,
};
