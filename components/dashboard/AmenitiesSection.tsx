import { Wifi, Plus, Check } from "lucide-react";

export default function AmenitiesSection() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-light mb-2">Amenities & Services</h1>
        <p className="text-gray-600">Configure the amenities and services available at your retreat center.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wifi className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Amenities Management</h3>
          <p className="text-gray-600">This section is under development.</p>
        </div>
      </div>
    </div>
  );
}