import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextRequest } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: string) {
  // Remove dollar sign and split by dash
  const [min, max] = price.replace("$", "").split("-");
  return {
    min: parseInt(min),
    max: max ? parseInt(max) : null,
    formatted: price,
  };
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function getSupabaseImageUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
}
// Format price numbers with thousand separators
export function formatPriceNumber(
  value: number | string,
  locale: string = "en-US"
) {
  let num: number;
  if (typeof value === "number") {
    num = value;
  } else {
    const cleaned = value.replace(/[^0-9.-]/g, "");
    num = Number(cleaned);
  }
  if (!Number.isFinite(num)) return "";

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

// IP Utility Functions

export async function getPublicIP(): Promise<string> {
  const res = await fetch("https://api64.ipify.org?format=json");
  const data = await res.json();
  return data.ip;
}
