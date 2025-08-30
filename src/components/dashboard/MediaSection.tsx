import { Camera, Upload } from "lucide-react";

export default function MediaSection() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-light mb-2">Photos & Media</h1>
        <p className="text-gray-600">Manage your retreat center's photo gallery and media assets.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Media Library</h3>
          <p className="text-gray-600">Upload and manage photos, videos, and other media files.</p>
        </div>
      </div>
    </div>
  );
}