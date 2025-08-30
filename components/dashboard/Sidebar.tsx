import { 
  LayoutDashboard, 
  Home, 
  Bed, 
  Settings, 
  Calendar,
  MessageSquare,
  Star,
  Camera,
  Utensils,
  Wifi,
  ChevronRight
} from "lucide-react";
import { DashboardSection } from "../../DashboardApp";

interface SidebarProps {
  currentSection: DashboardSection;
  onNavigate: (section: DashboardSection) => void;
}

const navigationItems = [
  { id: 'dashboard' as DashboardSection, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'my-retreats' as DashboardSection, label: 'My Retreats', icon: Home },
  { id: 'accommodation' as DashboardSection, label: 'Accommodation', icon: Bed },
  { id: 'amenities' as DashboardSection, label: 'Amenities & Services', icon: Wifi },
  { id: 'media' as DashboardSection, label: 'Photos & Media', icon: Camera },
  { id: 'calendar' as DashboardSection, label: 'Calendar', icon: Calendar },
  { id: 'inquiries' as DashboardSection, label: 'Inquiries & Bookings', icon: MessageSquare },
  { id: 'reviews' as DashboardSection, label: 'Reviews', icon: Star },
  { id: 'settings' as DashboardSection, label: 'Settings', icon: Settings },
];

export default function Sidebar({ currentSection, onNavigate }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-light tracking-tight">RETREAT CENTERS</h1>
        <p className="text-sm text-gray-600 mt-1">Manager Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors
                    ${isActive 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>Sanctuary Wellness Retreat</p>
          <p>Ubud, Bali • Verified</p>
        </div>
      </div>
    </div>
  );
}