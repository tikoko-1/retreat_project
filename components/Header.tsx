"use client";

import {
  Menu,
  User,
  Search,
  X,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  FileText,
  Home,
  BookOpen,
  Building2,
  Info,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import HeaderSearchModal from "./HeaderSearchModal";
import { FilterState } from "./SearchFilters";

export default function Header() {
  const router = useRouter();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchFilters, setSearchFilters] = useState<FilterState>({
    search: "",
    guests: "",
    priceRange: "",
    sortBy: "relevance",
    amenities: [],
    area: [100, 10000],
    bedrooms: "",
    bathrooms: "",
    venueTypes: [],
    foodOptions: [],
    cancellationPolicy: "",
    hasReviews: false,
    topRated: false,
  });

  const handleSearchFromModal = () => {
    setShowSearchModal(false);
    const params = new URLSearchParams();

    Object.entries(searchFilters).forEach(([key, value]) => {
      if (
        value &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, value.toString());
        }
      }
    });

    const queryString = params.toString();
    const catalogUrl = queryString ? `/catalog?${queryString}` : "/catalog";
    router.push(catalogUrl);
  };

  const handleNavigateToHostPortal = () => {
    router.push("/dashboard");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Clickable to go home */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
              >
                {/* Minimal Logo - R in black circle */}
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">R</span>
                </div>

                {/* Brand Name */}
                <div className="flex items-center gap-4">
                  <h1 className="text-xl font-medium text-black tracking-tight">
                    RETREAT CENTERS
                  </h1>
                  <span className="text-xs text-gray-400 font-normal tracking-wide hidden sm:block">
                    10K+ retreat centers worldwide
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation - Hidden on mobile */}
            <nav className="hidden lg:flex items-center gap-2">
              <Link
                href="/catalog"
                className="text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-200 px-4 py-2 rounded-lg cursor-pointer"
              >
                Centers
              </Link>
              <Link
                href="/guides"
                className="text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-200 px-4 py-2 rounded-lg cursor-pointer"
              >
                Guides
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-200 px-4 py-2 rounded-lg cursor-pointer"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-200 px-4 py-2 rounded-lg cursor-pointer"
              >
                About
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <button
                onClick={() => setShowSearchModal(true)}
                className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-200"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Add Listing Button - Desktop only */}
              <button
                onClick={handleNavigateToHostPortal}
                className="hidden lg:flex bg-black text-white hover:bg-gray-800 transition-all duration-200 px-4 py-2 rounded-lg cursor-pointer"
              >
                Add Listing
              </button>

              {/* Mobile Menu Burger - Mobile only */}
              <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
                <SheetTrigger asChild>
                  <button className="lg:hidden p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-200">
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full sm:w-96 bg-white p-0 border-none shadow-2xl [&>button]:hidden"
                >
                  <div className="hidden">
                    <SheetTitle>Hidden title for accessibility</SheetTitle>
                  </div>
                  {/* Premium Header */}
                  <div className="relative bg-gradient-to-r from-gray-50 to-white border-b border-gray-100/50">
                    <div className="flex items-center justify-between p-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-semibold text-base">
                            R
                          </span>
                        </div>
                        <div>
                          <h1 className="text-xl font-semibold text-black tracking-tight">
                            RETREAT CENTERS
                          </h1>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Premium Retreat Network
                          </p>
                        </div>
                      </div>

                      {/* Premium Close Button */}
                      <button
                        onClick={() => setShowMobileMenu(false)}
                        className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 flex items-center justify-center group border border-gray-100"
                      >
                        <X className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex flex-col h-full overflow-y-auto">
                    {/* Primary Navigation */}
                    <div className="px-8 py-8">
                      <div className="space-y-2">
                        <Link
                          href="/"
                          onClick={() => setShowMobileMenu(false)}
                          className="flex items-center gap-5 w-full text-left text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-50/50 active:scale-95 transition-all duration-200 px-5 py-5 rounded-2xl group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-white flex items-center justify-center transition-all duration-200">
                            <Home className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors duration-200" />
                          </div>
                          <span className="font-semibold text-lg">Home</span>
                        </Link>
                        <Link
                          href="/catalog"
                          onClick={() => setShowMobileMenu(false)}
                          className="flex items-center gap-5 w-full text-left text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-50/50 active:scale-95 transition-all duration-200 px-5 py-5 rounded-2xl group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-white flex items-center justify-center transition-all duration-200">
                            <Building2 className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors duration-200" />
                          </div>
                          <span className="font-semibold text-lg">Centers</span>
                        </Link>
                        <Link
                          href="/guides"
                          onClick={() => setShowMobileMenu(false)}
                          className="flex items-center gap-5 w-full text-left text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-50/50 active:scale-95 transition-all duration-200 px-5 py-5 rounded-2xl group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-white flex items-center justify-center transition-all duration-200">
                            <BookOpen className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors duration-200" />
                          </div>
                          <span className="font-semibold text-lg">Guides</span>
                        </Link>
                        <Link
                          href="/blog"
                          onClick={() => setShowMobileMenu(false)}
                          className="flex items-center gap-5 w-full text-left text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-50/50 active:scale-95 transition-all duration-200 px-5 py-5 rounded-2xl group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-white flex items-center justify-center transition-all duration-200">
                            <FileText className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors duration-200" />
                          </div>
                          <span className="font-semibold text-lg">Blog</span>
                        </Link>
                        <Link
                          href="/about"
                          onClick={() => setShowMobileMenu(false)}
                          className="flex items-center gap-5 w-full text-left text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-50/50 active:scale-95 transition-all duration-200 px-5 py-5 rounded-2xl group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-white flex items-center justify-center transition-all duration-200">
                            <Info className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors duration-200" />
                          </div>
                          <span className="font-semibold text-lg">About</span>
                        </Link>
                      </div>
                    </div>

                    {/* Premium Separator */}
                    <div className="mx-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                    {/* Business Section */}
                    <div className="px-8 py-8">
                      <div className="mb-6">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.1em] mb-1">
                          For Business
                        </h4>
                        <p className="text-xs text-gray-400">
                          Grow your retreat business
                        </p>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            handleNavigateToHostPortal();
                            setShowMobileMenu(false);
                          }}
                          className="flex items-center gap-4 w-full text-left bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 px-6 py-5 rounded-2xl group"
                        >
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              +
                            </span>
                          </div>
                          <div>
                            <span className="font-semibold text-base">
                              List Your Center
                            </span>
                            <p className="text-xs text-white/70 mt-0.5">
                              Start earning today
                            </p>
                          </div>
                        </button>

                        <div className="space-y-1 pt-2">
                          <a
                            href="#"
                            onClick={() => setShowMobileMenu(false)}
                            className="flex items-center justify-between w-full text-left text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 px-5 py-4 rounded-xl group"
                          >
                            <span className="font-medium">How It Works</span>
                            <div className="w-6 h-6 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center">
                              <span className="text-xs text-gray-500">→</span>
                            </div>
                          </a>
                          <a
                            href="#"
                            onClick={() => setShowMobileMenu(false)}
                            className="flex items-center justify-between w-full text-left text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 px-5 py-4 rounded-xl group"
                          >
                            <span className="font-medium">Pricing Guide</span>
                            <div className="w-6 h-6 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center">
                              <span className="text-xs text-gray-500">→</span>
                            </div>
                          </a>
                          <a
                            href="#"
                            onClick={() => setShowMobileMenu(false)}
                            className="flex items-center justify-between w-full text-left text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 px-5 py-4 rounded-xl group"
                          >
                            <span className="font-medium">Success Stories</span>
                            <div className="w-6 h-6 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center">
                              <span className="text-xs text-gray-500">→</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Premium Separator */}
                    <div className="mx-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                    {/* Support Section */}
                    <div className="px-8 py-8">
                      <div className="mb-6">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.1em] mb-1">
                          Support
                        </h4>
                        <p className="text-xs text-gray-400">
                          We're here to help
                        </p>
                      </div>
                      <div className="space-y-1">
                        <a
                          href="#"
                          onClick={() => setShowMobileMenu(false)}
                          className="flex items-center justify-between w-full text-left text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 px-5 py-4 rounded-xl group"
                        >
                          <span className="font-medium">Help Center</span>
                          <div className="w-6 h-6 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center">
                            <span className="text-xs text-gray-500">→</span>
                          </div>
                        </a>
                        <a
                          href="mailto:hello@retreatcenters.com"
                          onClick={() => setShowMobileMenu(false)}
                          className="flex items-center gap-4 w-full text-left text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 px-5 py-4 rounded-xl group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors duration-200">
                            <Mail className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <span className="font-medium text-sm">
                              Email Support
                            </span>
                            <p className="text-xs text-gray-500 mt-0.5">
                              hello@retreatcenters.com
                            </p>
                          </div>
                        </a>
                        <a
                          href="tel:+15551234567"
                          onClick={() => setShowMobileMenu(false)}
                          className="flex items-center gap-4 w-full text-left text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 px-5 py-4 rounded-xl group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors duration-200">
                            <Phone className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <span className="font-medium text-sm">
                              Phone Support
                            </span>
                            <p className="text-xs text-gray-500 mt-0.5">
                              +1 (555) 123-4567
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Footer with Social Links and Legal */}
                    <div className="mt-auto bg-gradient-to-t from-gray-50 to-white border-t border-gray-100/50">
                      <div className="px-8 py-6">
                        {/* Legal Links */}
                        <div className="flex flex-wrap gap-4 mb-6">
                          <a
                            href="#"
                            onClick={() => setShowMobileMenu(false)}
                            className="text-xs text-gray-500 hover:text-gray-700 transition-colors font-medium"
                          >
                            Privacy
                          </a>
                          <a
                            href="#"
                            onClick={() => setShowMobileMenu(false)}
                            className="text-xs text-gray-500 hover:text-gray-700 transition-colors font-medium"
                          >
                            Terms
                          </a>
                          <a
                            href="#"
                            onClick={() => setShowMobileMenu(false)}
                            className="text-xs text-gray-500 hover:text-gray-700 transition-colors font-medium"
                          >
                            Cookies
                          </a>
                        </div>

                        {/* Social and Copyright */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <a
                              href="#"
                              className="w-9 h-9 rounded-xl bg-white hover:bg-gray-100 transition-all duration-200 flex items-center justify-center group"
                              onClick={() => setShowMobileMenu(false)}
                            >
                              <Instagram className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                            </a>
                            <a
                              href="#"
                              className="w-9 h-9 rounded-xl bg-white hover:bg-gray-100 transition-all duration-200 flex items-center justify-center group"
                              onClick={() => setShowMobileMenu(false)}
                            >
                              <Twitter className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                            </a>
                            <a
                              href="#"
                              className="w-9 h-9 rounded-xl bg-white hover:bg-gray-100 transition-all duration-200 flex items-center justify-center group"
                              onClick={() => setShowMobileMenu(false)}
                            >
                              <Facebook className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                            </a>
                          </div>
                          <div className="text-xs text-gray-400 font-medium">
                            © 2024 Retreat Centers
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal Overlay */}
      <Dialog open={showSearchModal} onOpenChange={setShowSearchModal}>
        <DialogContent className="max-w-5xl max-h-[90vh] p-0 bg-white rounded-xl border border-gray-200 shadow-2xl overflow-y-auto">
          <DialogHeader className="px-8 py-6 border-b border-gray-100 sticky top-0 bg-white z-10">
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Find Your Perfect Retreat Center
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Search from 10K+ retreat centers worldwide
            </DialogDescription>
          </DialogHeader>

          <div className="p-8">
            <HeaderSearchModal
              filters={searchFilters}
              onFiltersChange={setSearchFilters}
              onSearch={handleSearchFromModal}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
