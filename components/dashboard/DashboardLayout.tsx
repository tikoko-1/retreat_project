import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { DashboardSection } from "../../DashboardApp";

interface DashboardLayoutProps {
  children: ReactNode;
  currentSection: DashboardSection;
  onNavigate: (section: DashboardSection) => void;
}

export default function DashboardLayout({ children, currentSection, onNavigate }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar currentSection={currentSection} onNavigate={onNavigate} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar />
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}