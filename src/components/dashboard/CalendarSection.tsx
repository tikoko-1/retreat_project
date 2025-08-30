import { Calendar } from "lucide-react";

export default function CalendarSection() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-light mb-2">Calendar</h1>
        <p className="text-gray-600">Manage availability, blackout dates, and booking calendar.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Availability Calendar</h3>
          <p className="text-gray-600">Set available dates and manage booking calendar.</p>
        </div>
      </div>
    </div>
  );
}