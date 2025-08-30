import { 
  Plus, 
  Eye, 
  Edit, 
  MoreHorizontal, 
  Search,
  Filter,
  Copy,
  Trash2
} from "lucide-react";
import { useState } from "react";

interface RetreatsSectionProps {
  onEditRetreat: (retreatId: string) => void;
}

const retreats = [
  {
    id: "1",
    name: "Sanctuary Wellness Retreat",
    location: "Ubud, Bali",
    status: "Published",
    lastUpdated: "2024-03-10",
    bookings: 12,
    revenue: "$24,800",
    image: "https://images.unsplash.com/photo-1609850280339-b85f1fd5d351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcm9vbSUyMG1pbmltYWx8ZW58MXx8fHwxNzU1Njk4MjI2fDA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: "2",
    name: "Mountain Yoga Retreat",
    location: "Rishikesh, India",
    status: "Draft",
    lastUpdated: "2024-03-08",
    bookings: 0,
    revenue: "$0",
    image: "https://images.unsplash.com/photo-1646239646963-b0b9be56d6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMG1pbmltYWwlMjB5b2dhJTIwc3BhY2V8ZW58MXx8fHwxNzU1Njk3OTYzfDA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: "3",
    name: "Coastal Meditation Center",
    location: "Tulum, Mexico",
    status: "Published",
    lastUpdated: "2024-03-05",
    bookings: 8,
    revenue: "$16,400",
    image: "https://images.unsplash.com/photo-1682278763092-a16f9a5e484d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZW4lMjBnYXJkZW4lMjBtaW5pbWFsfGVufDF8fHx8MTc1NTY5ODIyOXww&ixlib=rb-4.1.0&q=80&w=400"
  }
];

export default function RetreatsSection({ onEditRetreat }: RetreatsSectionProps) {
  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredRetreats = retreats.filter(retreat => {
    const matchesSearch = retreat.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                         retreat.location.toLowerCase().includes(searchValue.toLowerCase());
    const matchesFilter = filterStatus === "all" || retreat.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-light mb-2">My Retreats</h1>
            <p className="text-gray-600">Manage your retreat center listings and track performance.</p>
          </div>
          <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors w-fit">
            <Plus className="w-5 h-5" />
            Add New Retreat
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search retreats by name or location..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Retreats Grid */}
      <div className="space-y-4">
        {filteredRetreats.map((retreat) => (
          <div key={retreat.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors">
            <div className="flex items-start gap-6">
              {/* Image */}
              <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={retreat.image} 
                  alt={retreat.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{retreat.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{retreat.location}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Last updated: {retreat.lastUpdated}</span>
                      <span>•</span>
                      <span>{retreat.bookings} bookings</span>
                      <span>•</span>
                      <span>{retreat.revenue} revenue</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      retreat.status === 'Published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {retreat.status}
                    </span>
                    
                    <div className="flex items-center gap-1">
                      <button 
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onEditRetreat(retreat.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="More options"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Occupancy Rate</p>
                    <p className="font-medium text-gray-900">
                      {retreat.status === 'Published' ? '78%' : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Avg. Daily Rate</p>
                    <p className="font-medium text-gray-900">
                      {retreat.status === 'Published' ? '$185' : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Next Booking</p>
                    <p className="font-medium text-gray-900">
                      {retreat.status === 'Published' ? 'Mar 15' : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRetreats.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No retreats found</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first retreat listing.</p>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Add New Retreat
          </button>
        </div>
      )}
    </div>
  );
}