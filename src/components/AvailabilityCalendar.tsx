import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Calendar, Users, Clock } from "lucide-react";

interface AvailableSlot {
  date: string;
  price: number;
  available: boolean;
  spots: number;
  maxSpots: number;
}

const generateAvailableSlots = (): AvailableSlot[] => {
  const slots: AvailableSlot[] = [];
  const today = new Date();
  
  for (let i = 0; i < 90; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip some dates to show realistic availability
    const available = Math.random() > 0.3;
    const spots = available ? Math.floor(Math.random() * 15) + 25 : 0;
    const price = 2800 + Math.floor(Math.random() * 800); // $2800-3600 range
    
    slots.push({
      date: date.toISOString().split('T')[0],
      price,
      available,
      spots,
      maxSpots: 40
    });
  }
  
  return slots;
};

export default function AvailabilityCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableSlots] = useState(generateAvailableSlots());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getSlotForDate = (dateString: string) => {
    return availableSlots.find(slot => slot.date === dateString);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const selectedSlot = selectedDate ? getSlotForDate(selectedDate) : null;

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const slot = getSlotForDate(dateString);
      const isToday = new Date().toISOString().split('T')[0] === dateString;
      const isPast = new Date(dateString) < new Date();
      const isSelected = selectedDate === dateString;

      days.push(
        <button
          key={day}
          onClick={() => slot?.available && !isPast && setSelectedDate(dateString)}
          disabled={!slot?.available || isPast}
          className={`h-12 rounded-lg text-sm transition-all relative ${
            isPast 
              ? 'text-gray-300 cursor-not-allowed'
              : slot?.available
                ? isSelected
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100 cursor-pointer'
                : 'text-gray-400 cursor-not-allowed'
          } ${isToday ? 'ring-1 ring-black' : ''}`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <span className={isToday ? 'font-medium' : ''}>{day}</span>
            {slot?.available && !isPast && (
              <span className="text-xs text-green-600 font-medium">
                ${Math.floor(slot.price / 100) * 100}
              </span>
            )}
          </div>
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Select dates</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium min-w-[120px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('next')}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="mb-6">
        <div className="grid grid-cols-7 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-xs text-gray-500 text-center py-2 font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Selected Date Info */}
      {selectedSlot && (
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="font-medium">
                {new Date(selectedDate!).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <span className="text-lg font-medium">${selectedSlot.price}</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{selectedSlot.spots} spots available</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>7-day minimum</span>
            </div>
          </div>

          <Button className="w-full bg-black text-white hover:bg-gray-800">
            Reserve this date
          </Button>
        </div>
      )}

      {/* Legend */}
      <div className="border-t border-gray-100 pt-4 mt-4">
        <div className="flex items-center gap-6 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-100 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <span>Unavailable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 ring-1 ring-black rounded"></div>
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}