import { useState } from "react";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardOverview from "./components/dashboard/DashboardOverview";
import RetreatsSection from "./components/dashboard/RetreatsSection";
import EditRetreatForm from "./components/dashboard/EditRetreatForm";
import AccommodationSection from "./components/dashboard/AccommodationSection";
import AmenitiesSection from "./components/dashboard/AmenitiesSection";
import MediaSection from "./components/dashboard/MediaSection";
import CalendarSection from "./components/dashboard/CalendarSection";
import InquiriesSection from "./components/dashboard/InquiriesSection";
import ReviewsSection from "./components/dashboard/ReviewsSection";
import SettingsSection from "./components/dashboard/SettingsSection";

export type DashboardSection = 
  | 'dashboard' 
  | 'my-retreats' 
  | 'edit-retreat'
  | 'accommodation' 
  | 'amenities' 
  | 'media' 
  | 'calendar' 
  | 'inquiries' 
  | 'reviews' 
  | 'settings';

interface DashboardAppProps {
  onViewChange?: (view: 'retreat-center' | 'dashboard') => void;
}

export default function DashboardApp({ onViewChange }: DashboardAppProps) {
  const [currentSection, setCurrentSection] = useState<DashboardSection>('dashboard');
  const [editRetreatId, setEditRetreatId] = useState<string | null>(null);

  const handleEditRetreat = (retreatId: string) => {
    setEditRetreatId(retreatId);
    setCurrentSection('edit-retreat');
  };

  const handleBackToRetreats = () => {
    setEditRetreatId(null);
    setCurrentSection('my-retreats');
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardOverview onNavigate={setCurrentSection} />;
      case 'my-retreats':
        return <RetreatsSection onEditRetreat={handleEditRetreat} />;
      case 'edit-retreat':
        return <EditRetreatForm retreatId={editRetreatId} onBack={handleBackToRetreats} />;
      case 'accommodation':
        return <AccommodationSection />;
      case 'amenities':
        return <AmenitiesSection />;
      case 'media':
        return <MediaSection />;
      case 'calendar':
        return <CalendarSection />;
      case 'inquiries':
        return <InquiriesSection />;
      case 'reviews':
        return <ReviewsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <DashboardOverview onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1">
        <DashboardLayout 
          currentSection={currentSection} 
          onNavigate={setCurrentSection}
        >
          {renderContent()}
        </DashboardLayout>
      </div>
      
      {/* Footer with toggle - only show if onViewChange is provided */}
      {onViewChange && (
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="text-center">
                <h4 className="font-medium text-gray-900 mb-1">View Mode</h4>
                <p className="text-sm text-gray-600">Switch to public retreat center view</p>
              </div>
              
              {/* iPhone-style Toggle */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2 opacity-50">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Public View</span>
                </div>
                
                {/* Toggle Switch */}
                <button
                  onClick={() => onViewChange('retreat-center')}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  role="switch"
                  aria-checked={true}
                  aria-label="Switch to public view"
                >
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out translate-x-6" />
                </button>
                
                <div className="flex items-center gap-2 opacity-100">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Dashboard</span>
                </div>
              </div>
              
              {/* Current Mode Indicator */}
              <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Currently viewing: <span className="font-medium">Admin Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}