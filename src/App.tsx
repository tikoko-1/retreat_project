import { useState } from "react";
import Header from "./components/Header";
import StickyReserveBar from "./components/StickyReserveBar";
import StickyPricingBar from "./components/StickyPricingBar";
import HeroSection from "./components/HeroSection";
import ReservationModal from "./components/ReservationModal";
import LocationSection from "./components/LocationSection";
import GallerySection from "./components/GallerySection";
import FeaturesSection from "./components/FeaturesSection";
import RoomsSection from "./components/RoomsSection";
import FoodSection from "./components/FoodSection";
import IncludedSection from "./components/IncludedSection";
import CancellationSection from "./components/CancellationSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CallToActionSection from "./components/CallToActionSection";
import Footer from "./components/Footer";
import GalleryModal from "./components/GalleryModal";
import DashboardApp from "./DashboardApp";
import CatalogPage from "./components/CatalogPage";
import HomePage from "./components/HomePage";
import GuidesPage from "./components/GuidesPage";
import GuideDetailPage from "./components/GuideDetailPage";
import BlogPage from "./components/BlogPage";
import BlogDetailPage from "./components/BlogDetailPage";
import AboutPage from "./components/AboutPage";

import { FilterState } from "./components/SearchFilters";
import { ViewMode, createNavigationHandlers } from "./components/utils/navigation";
import { heroImages, allGalleryImages } from "./components/constants/images";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [currentGuideSlug, setCurrentGuideSlug] = useState<string>('');
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string>('');

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);
  const [showReservationModal, setShowReservationModal] = useState(false);

  // Create navigation handlers
  const navigation = createNavigationHandlers(setCurrentView, setCurrentGuideSlug, setCurrentBlogSlug);





  // Render Dashboard
  if (currentView === 'dashboard') {
    return <DashboardApp onViewChange={(view) => setCurrentView(view)} />;
  }

  // Render About Page
  if (currentView === 'about') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigateHome={navigation.onNavigateToHome}
          onNavigateToCatalog={navigation.onNavigateToCatalog}
          onNavigateToHostPortal={navigation.onNavigateToHostPortal}
          onNavigateToGuides={navigation.onNavigateToGuides}
          onNavigateToBlog={navigation.onNavigateToBlog}
          onNavigateToAbout={navigation.onNavigateToAbout}
        />
        <AboutPage 
          onNavigateToHostPortal={navigation.onNavigateToHostPortal}
          onNavigateToCatalog={navigation.onNavigateToCatalog}
        />
        <Footer />
      </div>
    );
  }

  // Render Catalog Page
  if (currentView === 'catalog') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigateHome={navigation.onNavigateToHome}
          onNavigateToCatalog={navigation.onNavigateToCatalog}
          onNavigateToHostPortal={navigation.onNavigateToHostPortal}
          onNavigateToGuides={navigation.onNavigateToGuides}
          onNavigateToBlog={navigation.onNavigateToBlog}
          onNavigateToAbout={navigation.onNavigateToAbout}
        />
        <CatalogPage onSelectRetreat={navigation.onSelectRetreat} />
        <Footer />
      </div>
    );
  }

  // Render Guides Page
  if (currentView === 'guides') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigateHome={navigation.onNavigateToHome}
          onNavigateToCatalog={navigation.onNavigateToCatalog}
          onNavigateToHostPortal={navigation.onNavigateToHostPortal}
          onNavigateToGuides={navigation.onNavigateToGuides}
          onNavigateToBlog={navigation.onNavigateToBlog}
          onNavigateToAbout={navigation.onNavigateToAbout}
        />
        <GuidesPage 
          onNavigateToHostPortal={navigation.onNavigateToHostPortal}
          onNavigateToGuideDetail={navigation.onNavigateToGuideDetail}
        />
        <Footer />
      </div>
    );
  }

  // Render Guide Detail Page
  if (currentView === 'guide-detail') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigateHome={navigation.onNavigateToHome}
          onNavigateToCatalog={navigation.onNavigateToCatalog}
          onNavigateToHostPortal={navigation.onNavigateToHostPortal}
          onNavigateToGuides={navigation.onNavigateToGuides}
          onNavigateToBlog={navigation.onNavigateToBlog}
          onNavigateToAbout={navigation.onNavigateToAbout}
        />
        <GuideDetailPage 
          slug={currentGuideSlug}
          onNavigateToHostPortal={navigation.onNavigateToHostPortal}
        />
        <Footer />
      </div>
    );
  }

  // Render Blog Page
  if (currentView === 'blog') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigateHome={navigation.onNavigateToHome}
          onNavigateToCatalog={navigation.onNavigateToCatalog}
          onNavigateToHostPortal={navigation.onNavigateToHostPortal}
          onNavigateToGuides={navigation.onNavigateToGuides}
          onNavigateToBlog={navigation.onNavigateToBlog}
          onNavigateToAbout={navigation.onNavigateToAbout}
        />
        <BlogPage 
          onNavigateToBlogPost={navigation.onNavigateToBlogPost}
          onNavigateToHostPortal={navigation.onNavigateToHostPortal}
        />
        <Footer />
      </div>
    );
  }

  // Render Blog Detail Page
  if (currentView === 'blog-detail') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigateHome={navigation.onNavigateToHome}
          onNavigateToCatalog={navigation.onNavigateToCatalog}
          onNavigateToHostPortal={navigation.onNavigateToHostPortal}
          onNavigateToGuides={navigation.onNavigateToGuides}
          onNavigateToBlog={navigation.onNavigateToBlog}
          onNavigateToAbout={navigation.onNavigateToAbout}
        />
        <BlogDetailPage 
          slug={currentBlogSlug}
          onNavigateToCatalog={navigation.onNavigateToCatalog}
          onNavigateToHostPortal={navigation.onNavigateToHostPortal}
        />
        <Footer />
      </div>
    );
  }

  // Render Home Page
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigateHome={navigation.onNavigateToHome}
          onNavigateToCatalog={navigation.onNavigateToCatalog}
          onNavigateToHostPortal={navigation.onNavigateToHostPortal}
          onNavigateToGuides={navigation.onNavigateToGuides}
          onNavigateToBlog={navigation.onNavigateToBlog}
          onNavigateToAbout={navigation.onNavigateToAbout}
        />
        <HomePage 
          onNavigateToCatalog={navigation.onNavigateToCatalog}
          onSelectRetreat={navigation.onSelectRetreat}
          onNavigateToHostPortal={navigation.onNavigateToHostPortal}
        />
        <Footer />
      </div>
    );
  }

  // Render Retreat Center Detail Page
  return (
    <div className="min-h-screen bg-white">
      <Header 
        onNavigateHome={navigation.onNavigateToHome}
        onNavigateToCatalog={navigation.onNavigateToCatalog}
        onNavigateToHostPortal={navigation.onNavigateToHostPortal}
        onNavigateToGuides={navigation.onNavigateToGuides}
        onNavigateToBlog={navigation.onNavigateToBlog}
        onNavigateToAbout={navigation.onNavigateToAbout}
      />
      <StickyPricingBar onReserveClick={() => setShowReservationModal(true)} />
      <HeroSection 
        heroImages={heroImages} 
        onShowAllPhotos={() => {
          setGalleryStartIndex(0);
          setShowGalleryModal(true);
        }}
        onImageClick={(index) => {
          setGalleryStartIndex(index);
          setShowGalleryModal(true);
        }}
        onReserveClick={() => setShowReservationModal(true)}
      />

      <LocationSection />
      <GallerySection galleryImages={allGalleryImages} />
      <FeaturesSection />
      <RoomsSection />
      <FoodSection />
      <IncludedSection />
      <CancellationSection />
      <TestimonialsSection />
      <CallToActionSection onReserveClick={() => setShowReservationModal(true)} />
      <Footer />
      
      {/* Gallery Modal for "Show all photos" button */}
      <GalleryModal
        isOpen={showGalleryModal}
        onClose={() => setShowGalleryModal(false)}
        images={allGalleryImages}
        initialIndex={galleryStartIndex}
      />
      
      {/* Reservation Modal */}
      <ReservationModal
        isOpen={showReservationModal}
        onClose={() => setShowReservationModal(false)}
      />
    </div>
  );
}