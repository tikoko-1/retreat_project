import {
  TrendingUp,
  Calendar,
  DollarSign,
  MessageCircle,
  Plus,
  Upload,
  Settings,
  Eye,
  Edit,
  Clock,
} from "lucide-react";
import { DashboardSection } from "../../DashboardApp";

interface DashboardOverviewProps {
  onNavigate: (section: DashboardSection) => void;
}

const statsCards = [
  {
    title: "Bookings this month",
    value: "12",
    change: "+23%",
    changeType: "positive" as const,
    icon: Calendar,
  },
  {
    title: "Occupancy rate",
    value: "78%",
    change: "+5%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Revenue estimate",
    value: "$24,800",
    change: "+12%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Pending inquiries",
    value: "8",
    change: "2 new today",
    changeType: "negative" as const,
    icon: MessageCircle,
  },
];

const upcomingRetreats = [
  {
    id: "1",
    title: "Mindful Leadership Retreat",
    facilitator: "Dr. Sarah Chen",
    dates: "Mar 15-22, 2024",
    groupSize: "18 participants",
    status: "Confirmed",
    statusColor: "green",
  },
  {
    id: "2",
    title: "Yoga Teacher Training",
    facilitator: "Lisa Rodriguez",
    dates: "Mar 28 - Apr 5, 2024",
    groupSize: "22 participants",
    status: "Confirmed",
    statusColor: "green",
  },
  {
    id: "3",
    title: "Digital Detox Retreat",
    facilitator: "Marcus Thompson",
    dates: "Apr 12-15, 2024",
    groupSize: "14 participants",
    status: "Pending Payment",
    statusColor: "orange",
  },
  {
    id: "4",
    title: "Women's Empowerment Circle",
    facilitator: "Amanda Foster",
    dates: "Apr 20-27, 2024",
    groupSize: "16 participants",
    status: "Inquiry",
    statusColor: "blue",
  },
];

const quickActions = [
  {
    title: "Add New Retreat",
    description: "Create a new retreat listing",
    icon: Plus,
    action: () => {},
    primary: true,
  },
  {
    title: "Upload Photos",
    description: "Add new gallery images",
    icon: Upload,
    action: () => {},
    primary: false,
  },
  {
    title: "Update Pricing",
    description: "Modify accommodation rates",
    icon: Settings,
    action: () => {},
    primary: false,
  },
];

export default function DashboardOverview({
  onNavigate,
}: DashboardOverviewProps) {
  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-light mb-2">
          Welcome back, Maya
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your retreat center today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              <div className="mb-2">
                <h3 className="text-2xl font-light text-gray-900">
                  {card.value}
                </h3>
                <p className="text-sm text-gray-600">{card.title}</p>
              </div>
              <div
                className={`text-sm ${
                  card.changeType === "positive"
                    ? "text-green-600"
                    : card.changeType === "negative"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {card.change}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming Retreats */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-light">Upcoming Retreats</h2>
              <button
                onClick={() => onNavigate("my-retreats")}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                View all
              </button>
            </div>

            <div className="space-y-4">
              {upcomingRetreats.map((retreat) => (
                <div
                  key={retreat.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {retreat.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {retreat.dates}
                      </span>
                      <span>{retreat.facilitator}</span>
                      <span>{retreat.groupSize}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        retreat.statusColor === "green"
                          ? "bg-green-100 text-green-700"
                          : retreat.statusColor === "orange"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {retreat.status}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-light mb-6">Quick Actions</h2>

            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg text-left transition-colors ${
                      action.primary
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        action.primary ? "bg-white/20" : "bg-gray-100"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          action.primary ? "text-white" : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-medium ${
                          action.primary ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {action.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          action.primary ? "text-white/80" : "text-gray-600"
                        }`}
                      >
                        {action.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="font-medium text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">
                    New booking from Lisa Rodriguez
                  </span>
                  <span className="text-gray-400 ml-auto">2h ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">
                    Inquiry received for April dates
                  </span>
                  <span className="text-gray-400 ml-auto">4h ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">
                    Payment pending for March retreat
                  </span>
                  <span className="text-gray-400 ml-auto">1d ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
