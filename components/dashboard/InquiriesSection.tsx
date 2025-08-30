import { 
  Search, 
  Filter, 
  Eye, 
  MessageCircle, 
  CheckCircle, 
  Clock,
  Calendar,
  Users,
  Mail,
  Phone
} from "lucide-react";
import { useState } from "react";

const inquiries = [
  {
    id: "1",
    date: "2024-03-12",
    facilitatorName: "Dr. Sarah Chen",
    facilitatorRole: "Mindfulness Coach",
    email: "sarah.chen@example.com",
    phone: "+1 (555) 123-4567",
    groupSize: 18,
    retreatDates: "Mar 15-22, 2024",
    status: "new",
    message: "Hello, I'm interested in hosting a 7-day mindfulness retreat for corporate executives. We're looking for a premium location with excellent facilities.",
    budget: "$25,000-30,000"
  },
  {
    id: "2",
    date: "2024-03-10",
    facilitatorName: "Lisa Rodriguez",
    facilitatorRole: "Yoga Teacher",
    email: "lisa.r@example.com", 
    phone: "+1 (555) 987-6543",
    groupSize: 22,
    retreatDates: "Mar 28 - Apr 5, 2024",
    status: "in-progress",
    message: "Planning a 200-hour yoga teacher training. Need accommodation for 22 students with dedicated yoga space and healthy meal options.",
    budget: "$35,000-40,000"
  },
  {
    id: "3",
    date: "2024-03-08",
    facilitatorName: "Marcus Thompson",
    facilitatorRole: "Wellness Coach",
    email: "marcus.t@example.com",
    phone: "+1 (555) 456-7890", 
    groupSize: 14,
    retreatDates: "Apr 12-15, 2024",
    status: "confirmed",
    message: "Digital detox retreat for tech professionals. Looking for a peaceful environment away from city distractions.",
    budget: "$18,000-22,000"
  },
  {
    id: "4",
    date: "2024-03-06",
    facilitatorName: "Amanda Foster",
    facilitatorRole: "Life Coach",
    email: "amanda.f@example.com",
    phone: "+1 (555) 321-0987",
    groupSize: 16,
    retreatDates: "Apr 20-27, 2024", 
    status: "new",
    message: "Women's empowerment retreat focusing on leadership development and personal growth. Need space for workshops and group activities.",
    budget: "$28,000-32,000"
  }
];

export default function InquiriesSection() {
  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'new':
        return { color: 'bg-blue-100 text-blue-700', label: 'New', icon: Clock };
      case 'in-progress':
        return { color: 'bg-orange-100 text-orange-700', label: 'In Progress', icon: MessageCircle };
      case 'confirmed':
        return { color: 'bg-green-100 text-green-700', label: 'Confirmed', icon: CheckCircle };
      default:
        return { color: 'bg-gray-100 text-gray-700', label: status, icon: Clock };
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.facilitatorName.toLowerCase().includes(searchValue.toLowerCase()) ||
                         inquiry.facilitatorRole.toLowerCase().includes(searchValue.toLowerCase());
    const matchesFilter = filterStatus === "all" || inquiry.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-light mb-2">Inquiries & Bookings</h1>
        <p className="text-gray-600">Manage incoming retreat requests and confirmed bookings.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">New Inquiries</h3>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-light text-gray-900">8</p>
          <p className="text-sm text-blue-600">2 received today</p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">In Progress</h3>
            <MessageCircle className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-2xl font-light text-gray-900">5</p>
          <p className="text-sm text-orange-600">Avg response: 4hrs</p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Confirmed</h3>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-light text-gray-900">12</p>
          <p className="text-sm text-green-600">This month</p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Revenue</h3>
            <Calendar className="w-4 h-4 text-gray-600" />
          </div>
          <p className="text-2xl font-light text-gray-900">$124K</p>
          <p className="text-sm text-gray-600">YTD bookings</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by facilitator name or role..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="confirmed">Confirmed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Facilitator</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Retreat Details</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Budget</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInquiries.map((inquiry) => {
                const statusConfig = getStatusConfig(inquiry.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{inquiry.facilitatorName}</h4>
                        <p className="text-sm text-gray-600">{inquiry.facilitatorRole}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {inquiry.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {inquiry.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {inquiry.retreatDates}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {inquiry.groupSize} guests
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 max-w-xs truncate">
                        {inquiry.message}
                      </p>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{inquiry.budget}</span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedInquiry(inquiry.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Send Message"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        {inquiry.status === 'new' && (
                          <button 
                            className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Confirm
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredInquiries.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
            <p className="text-gray-600">New booking requests will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}