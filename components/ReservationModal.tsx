import { EPriceUnit, RetreatDetails } from "@/types";
import { X, Calendar, Users, Mail, Phone, User } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { formatPriceNumber } from "@/lib/utils";
import emailjs from "@emailjs/browser";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  retreat: RetreatDetails;
}

export default function ReservationModal({ isOpen, onClose, retreat }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    groupSize: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    retreatType: '',
    dateFlexibility: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blurredFields, setBlurredFields] = useState<Set<string>>(new Set());

  const validateField = useCallback((field: string, value: any, formData?: any) => {
    let isValid = false;
    let errorMessage = '';

    switch (field) {
      case 'firstName':
      case 'lastName':
        isValid = value.trim() !== '';
        if (!isValid) {
          errorMessage = field === 'firstName' ? 'First name is required' : 'Last name is required';
        }
        break;

      case 'email':
        isValid = value.trim() !== '';
        if (!isValid) {
          errorMessage = 'Email address is required';
        } else {
          const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          isValid = emailRegex.test(value);
          if (!isValid) {
            errorMessage = 'Please enter a valid email address';
          }
        }
        break;

      case 'groupSize':
        const groupSizeNum = parseInt(value);
        isValid = !isNaN(groupSizeNum);
        if (!isValid) {
          errorMessage = 'Group size is required';
        } else if (groupSizeNum <= 0) {
          isValid = false;
          errorMessage = 'Group size must be greater than 0';
        } else if (groupSizeNum > 1000) {
          isValid = false;
          errorMessage = 'Group size must be less than 1000';
        }
        break;

      case 'checkIn':
      case 'checkOut':
        const checkInValue = field === 'checkIn' ? value : (formData?.checkIn || '');
        const checkOutValue = field === 'checkOut' ? value : (formData?.checkOut || '');
        if (checkInValue && checkOutValue) {
          const checkInDate = new Date(checkInValue);
          const checkOutDate = new Date(checkOutValue);
          if (checkInDate > checkOutDate) {
            isValid = false;
            errorMessage = 'Check-in date must be before check-out date';
          } else {
            isValid = true;
          }
        } else {
          isValid = true;
        }
        break;

      default:
        isValid = true;
    }

    return { isValid, errorMessage };
  }, []);

  const validateAllFields = useCallback(() => {
    const newErrors: Record<string, string> = {};

    const requiredFields = ['firstName', 'lastName', 'email', 'groupSize'];

    requiredFields.forEach(field => {
      const { isValid, errorMessage } = validateField(field, formData[field as keyof typeof formData]);
      if (!isValid) {
        newErrors[field] = errorMessage;
      }
    });

    if (formData.checkIn && formData.checkOut) {
      const { isValid, errorMessage } = validateField('checkIn', formData.checkIn, formData);
      if (!isValid) {
        newErrors.checkOut = errorMessage;
      }
    }

    return newErrors;
  }, [formData, validateField]);

  const fetchAvailabilityRequestsCount = async (): Promise<boolean | undefined> => {
    try {
      const response = await fetch('/api/venues/availability_count', {
        cache: "no-store",
      });
      const data = await response.json();
      return data.availability as boolean;
    } catch (err) {
      console.error("Error fetching availability requests count:", err);
      return undefined;
    }
  };

  useEffect(() => {
    if (isOpen) {
      setBlurredFields(new Set());
      try {
        const savedData = localStorage.getItem('retreatReservationData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setFormData(prev => {
            const updates: any = { ...prev };
            if (!prev.firstName && parsedData.firstName) updates.firstName = parsedData.firstName;
            if (!prev.lastName && parsedData.lastName) updates.lastName = parsedData.lastName;
            if (!prev.email && parsedData.email) updates.email = parsedData.email;
            if (!prev.phone && parsedData.phone) updates.phone = parsedData.phone;
            if (!prev.groupSize && parsedData.groupSize) updates.groupSize = parsedData.groupSize;
            return updates;
          });
        }
      } catch (error) {
        console.error('Failed to load from localStorage:', error);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (blurredFields.size === 0) return;

    setErrors(prev => {
      const newErrors = { ...prev };

      blurredFields.forEach(field => {
        const value = formData[field as keyof typeof formData];
        const { isValid, errorMessage } = validateField(field, value, formData);

        if (isValid) {
          delete newErrors[field];
        } else {
          newErrors[field] = errorMessage;
        }
      });

      return newErrors;
    });
  }, [blurredFields, formData, validateField]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    setBlurredFields(new Set(['firstName', 'lastName', 'email', 'groupSize']));

    const newErrors = validateAllFields();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fill in all fields correctly');
      return;
    }

    setIsSubmitting(true);

    try {
      const contactData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      };
      localStorage.setItem('retreatReservationData', JSON.stringify(contactData));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }

    if (!await fetchAvailabilityRequestsCount()) {
      toast.error("You have reached the maximum number of requests. Please try again later.");
      setIsSubmitting(false);
      return;
    }

    const requestBody = {
      requester_name: `${formData.firstName} ${formData.lastName}`,
      requester_email: formData.email,
      requester_phone: formData.phone || null,
      start_date: formData.checkIn || null,
      end_date: formData.checkOut || null,
      date_flexibility: formData.dateFlexibility || null,
      group_size_min: parseInt(formData.groupSize),
      group_size_max: parseInt(formData.groupSize),
      program_type: formData.retreatType || null,
      organization: formData.organization || null,
      notes: formData.message || null,
    };

    try {
      const venueId = window.location.pathname.split('/')[2];
      const response = await fetch(`/api/venues/${venueId}/availability-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        clearFormData();
        onClose();

        setTimeout(() => {
          emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CLIENT!,
            {
              to_email: requestBody.requester_email,
              reply_to_email: result.data.owner_email,
              to_name: requestBody.requester_name,
              from_name: result.data.owner_name,
              venue_title: result.data.venue_title,
              content: requestBody
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
          ).catch((error) => {
            console.warn("Client email failed:", error);
            toast.error("Error sending email: " + error.text);
          });

          emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_OWNER!,
            {
              to_email: result.data.owner_email,
              reply_to_email: requestBody.requester_email,
              to_name: result.data.owner_name,
              from_name: requestBody.requester_name,
              venue_title: result.data.venue_title,
              content: requestBody
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
          ).catch((error) => {
            console.warn("Owner email failed:", error);
            toast.error("Error sending email: " + error.text);
          });
        }, 0);
      } else {
        console.error('API error:', result);
        toast.error(`Error: ${result.error || 'Failed to submit request'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [validateAllFields]);

  const updateFormData = useCallback((field: string, value: any) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value } as typeof prev;

      if (field === 'checkIn' || field === 'checkOut') {
        const checkInValue = field === 'checkIn' ? value : next.checkIn;
        const checkOutValue = field === 'checkOut' ? value : next.checkOut;

        if (checkInValue && checkOutValue) {
          const checkInDate = new Date(checkInValue);
          const checkOutDate = new Date(checkOutValue);
          setErrors(prevErrors => {
            const updated = { ...prevErrors } as Record<string, string>;
            if (checkInDate > checkOutDate) {
              updated.checkOut = 'Check-in date must be before check-out date';
            } else {
              delete updated.checkOut;
            }
            return updated;
          });
        } else {
          setErrors(prevErrors => {
            const updated = { ...prevErrors } as Record<string, string>;
            delete updated.checkOut;
            return updated;
          });
        }
      }

      return next;
    });
  }, []);

  const handleBlur = useCallback((field: string) => {
    setBlurredFields(prev => new Set(prev).add(field));
  }, []);

  const clearFormData = useCallback(() => {
    setFormData({
      checkIn: '',
      checkOut: '',
      groupSize: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      organization: '',
      retreatType: '',
      dateFlexibility: '',
      message: ''
    });
    setErrors({});
    setBlurredFields(new Set());
  }, []);

  const handleClose = useCallback(() => {
    setErrors({});
    setBlurredFields(new Set());
    onClose();
  }, [onClose]);

  const isHidden = !isOpen;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 ${isHidden ? 'hidden' : ''}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-[100vh] max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-medium">Request Availability</h2>
            <p className="text-gray-600 mt-1">Serenity Hills Retreat • Ubud, Bali</p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={formData.checkIn}
                  onChange={(e) => updateFormData('checkIn', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:ring-black focus:border-black focus-visible:outline-none ${errors.checkIn ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={formData.checkOut}
                  onChange={(e) => updateFormData('checkOut', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:ring-black focus:border-black focus-visible:outline-none ${errors.checkOut ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.checkOut && <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Group Size
                </label>
                <input
                  type="number"
                  value={formData.groupSize}
                  onChange={(e) => updateFormData('groupSize', e.target.value)}
                  onBlur={() => handleBlur('groupSize')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:ring-black focus:border-black focus-visible:outline-none ${blurredFields.has('groupSize') && errors.groupSize ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                <p className="text-red-500 text-sm mt-1">
                  {blurredFields.has('groupSize') && errors.groupSize ? errors.groupSize : "\u00A0"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  onBlur={() => handleBlur('firstName')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:ring-black focus:border-black focus-visible:outline-none ${blurredFields.has('firstName') && errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                <p className="text-red-500 text-sm mt-1">
                  {blurredFields.has('firstName') && errors.firstName ? errors.firstName : "\u00A0"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  onBlur={() => handleBlur('lastName')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:ring-black focus:border-black focus-visible:outline-none ${blurredFields.has('lastName') && errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                <p className="text-red-500 text-sm mt-1">
                  {blurredFields.has('lastName') && errors.lastName ? errors.lastName : "\u00A0"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:ring-black focus:border-black focus-visible:outline-none ${blurredFields.has('email') && errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter your email address"
                />
                <p className="text-red-500 text-sm mt-1">
                  {blurredFields.has('email') && errors.email ? errors.email : "\u00A0"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:ring-black focus:border-black focus-visible:outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization/Studio Name
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => updateFormData('organization', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:ring-black focus:border-black focus-visible:outline-none ${errors.organization ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Your business or organization"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Retreat
                </label>
                <select
                  value={formData.retreatType}
                  onChange={(e) => updateFormData('retreatType', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:ring-black focus:border-black focus-visible:outline-none ${errors.retreatType ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                  <option value="">Select retreat type</option>
                  <option value="yoga">Yoga Retreat</option>
                  <option value="meditation">Meditation Retreat</option>
                  <option value="wellness">Wellness Workshop</option>
                  <option value="corporate">Corporate Retreat</option>
                  <option value="coaching">Life Coaching</option>
                  <option value="therapeutic">Therapeutic Retreat</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Flexibility
                </label>
                <select
                  value={formData.dateFlexibility}
                  onChange={(e) => updateFormData('dateFlexibility', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:ring-black focus:border-black focus-visible:outline-none ${errors.dateFlexibility ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                  <option value="">Select date flexibility</option>
                  <option value="fixed">fixed</option>
                  <option value="±3d">±3 days flexible</option>
                  <option value="±7d">±7 days flexible</option>
                  <option value="flexible">flexible</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => updateFormData('message', e.target.value)}
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:ring-black focus:border-black focus-visible:outline-none resize-none ${errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Tell us about your retreat vision, special requirements, or any questions..."
              />
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg transition-colors font-medium text-lg flex items-center justify-center ${isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed text-black'
                  : 'bg-black text-white hover:bg-gray-900'
                  }`}
              >
                {isSubmitting && (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent mr-2"></div>
                )}
                {isSubmitting ? 'Submitting...' : 'Submit Availability Request'}
              </button>

              <p className="text-sm text-gray-600 text-center mt-4">
                Pricing starts from ${formatPriceNumber(retreat.price_min ?? 0)}-${formatPriceNumber(retreat.price_max ?? 0)} {retreat.price_unit === EPriceUnit.Custom ? "" : retreat.price_unit === EPriceUnit.Weekend ? "per weekend" : retreat.price_unit === EPriceUnit.PerNight ? "per night" : retreat.price_unit === EPriceUnit.PerPerson ? "per person" : retreat.price_unit === EPriceUnit.Week ? "per week" : ""}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}