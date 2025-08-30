import { useState } from "react";
import { ArrowLeft, Save, Eye, Upload, MapPin, Clock, Users, DollarSign } from "lucide-react";

interface EditRetreatFormProps {
  retreatId: string | null;
  onBack: () => void;
}

const tabs = [
  { id: 'general', label: 'General Info' },
  { id: 'accommodation', label: 'Accommodation' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'media', label: 'Photos & Media' },
  { id: 'dining', label: 'Dining' },
  { id: 'policies', label: 'Policies' },
  { id: 'availability', label: 'Availability' },
  { id: 'preview', label: 'Preview & Publish' }
];

export default function EditRetreatForm({ retreatId, onBack }: EditRetreatFormProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    name: "Sanctuary Wellness Retreat",
    description: "Experience deep transformation in our award-winning retreat center nestled in the heart of Ubud's sacred jungle. Our sanctuary provides the perfect setting for yoga teachers, wellness facilitators, and spiritual guides to host meaningful retreats.",
    type: "wellness",
    location: "Ubud, Bali, Indonesia",
    contact: "+62 361 123 4567",
    email: "hello@sanctuary-bali.com",
    capacity: "25",
    rooms: "12",
    pricePerNight: "180"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Retreat Center Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Retreat Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                >
                  <option value="wellness">Wellness & Spa</option>
                  <option value="yoga">Yoga Center</option>
                  <option value="meditation">Meditation Center</option>
                  <option value="spiritual">Spiritual Retreat</option>
                  <option value="detox">Detox & Cleanse</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                placeholder="Describe your retreat center, its unique features, and what makes it special..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Max Capacity
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Number of Rooms
                </label>
                <input
                  type="number"
                  value={formData.rooms}
                  onChange={(e) => handleInputChange('rooms', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Starting Price/Night
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={formData.pricePerNight}
                    onChange={(e) => handleInputChange('pricePerNight', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'media':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Photo Gallery</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Photos</h4>
                <p className="text-gray-600 mb-4">Drag and drop photos here, or click to browse</p>
                <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  Choose Files
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  JPG, PNG up to 10MB each. Recommended: 1920x1080px or higher.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-500">Photo {index}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'preview':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-2">Ready to Publish?</h3>
              <p className="text-blue-700 mb-4">
                Review your retreat listing below. Once published, it will be visible to facilitators on the platform.
              </p>
              <div className="flex gap-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Publish Listing
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  Save as Draft
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 mb-4">Listing Preview</h4>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">{formData.name}</h3>
                  <p className="text-gray-600">{formData.location}</p>
                </div>
                <p className="text-gray-700">{formData.description}</p>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span>Up to {formData.capacity} guests</span>
                  <span>{formData.rooms} rooms</span>
                  <span>From ${formData.pricePerNight}/night</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Retreats
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-light mb-2">
              {retreatId ? 'Edit Retreat' : 'Create New Retreat'}
            </h1>
            <p className="text-gray-600">
              {retreatId ? 'Update your retreat listing details.' : 'Set up your new retreat center listing.'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {renderTabContent()}
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 px-8 py-4 z-10">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Last saved: Today at 2:34 PM
          </p>
          <div className="flex items-center gap-3">
            <button className="border border-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Save as Draft
            </button>
            <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}