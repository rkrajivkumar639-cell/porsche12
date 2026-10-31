import React, { useState, useEffect } from 'react';
import { PORSCHE_VEHICLES, PORSCHE_CENTRES_INDIA, CONFIGURABLE_WHATSAPP_NUMBER } from '../data/porscheData';
import { BookingFormData } from '../types/porsche';
import { Calendar, Clock, MapPin, Send, MessageSquare, CheckCircle, AlertCircle, Phone, User, Mail } from 'lucide-react';

interface BookingSectionProps {
  preselectedModelId?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ preselectedModelId }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    preferredModel: 'Porsche 911 Carrera',
    preferredCity: 'Mumbai',
    preferredDate: '',
    preferredTime: '11:00 AM',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionType, setSubmissionType] = useState<'test-drive' | 'enquiry'>('test-drive');

  useEffect(() => {
    if (preselectedModelId) {
      const matched = PORSCHE_VEHICLES.find((v) => v.id === preselectedModelId);
      if (matched) {
        setFormData((prev) => ({ ...prev, preferredModel: matched.name }));
      }
    }
  }, [preselectedModelId]);

  // Set default appointment date to 3 days from today
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setFormData((prev) => ({ ...prev, preferredDate: `${yyyy}-${mm}-${dd}` }));
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    // Indian phone number validation: 10 digits starting with 6, 7, 8, or 9
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number (e.g. 9820012345)';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAction = (type: 'test-drive' | 'enquiry') => {
    setSubmissionType(type);
    if (!validate()) return;
    setIsSubmitted(true);
  };

  const selectedCentre = PORSCHE_CENTRES_INDIA.find(
    (c) => c.city.toLowerCase() === formData.preferredCity.toLowerCase()
  ) || PORSCHE_CENTRES_INDIA[0];

  // WhatsApp Concierge message formatting
  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello Porsche India Concierge,\n\nI would like to ${
        submissionType === 'test-drive' ? 'request an official Test Drive' : 'submit an enquiry'
      } for the *${formData.preferredModel}*.\n\n` +
      `*Client Details:*\n` +
      `• Name: ${formData.fullName}\n` +
      `• Mobile: +91 ${formData.phone}\n` +
      `• Email: ${formData.email}\n` +
      `• Preferred City / Centre: ${selectedCentre.name} (${selectedCentre.city})\n` +
      `• Preferred Date: ${formData.preferredDate}\n` +
      `• Preferred Time: ${formData.preferredTime}\n` +
      (formData.message ? `• Notes: ${formData.message}\n` : '') +
      `\nPlease connect me with a Brand Ambassador.`
    );
    return `https://wa.me/${CONFIGURABLE_WHATSAPP_NUMBER}?text=${text}`;
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(
      `Porsche India: ${submissionType === 'test-drive' ? 'Test Drive Request' : 'Vehicle Enquiry'} - ${formData.preferredModel} (${formData.fullName})`
    );
    const body = encodeURIComponent(
      `Dear Porsche India Concierge,\n\n` +
      `I would like to ${submissionType === 'test-drive' ? 'request an official Test Drive appointment' : 'submit a purchase enquiry'} for the ${formData.preferredModel}.\n\n` +
      `Client Information:\n` +
      `- Full Name: ${formData.fullName}\n` +
      `- Mobile (+91): ${formData.phone}\n` +
      `- Email Address: ${formData.email}\n` +
      `- Preferred Centre: ${selectedCentre.name} (${selectedCentre.address})\n` +
      `- Preferred Date: ${formData.preferredDate}\n` +
      `- Preferred Time: ${formData.preferredTime}\n\n` +
      `Additional Message / Specifications:\n${formData.message || 'None'}\n\n` +
      `Kind regards,\n${formData.fullName}`
    );
    return `mailto:contact@porsche-india.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="booking" className="py-24 sm:py-32 bg-neutral-900/40 border-t border-neutral-800 text-white relative">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.25em] uppercase text-red-500 font-semibold mb-3">
            <span>Direct Concierge Integration</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Porsche Centre India</span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            YOUR PORSCHE JOURNEY STARTS HERE.
          </h2>
          <p className="mt-3 text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
            Schedule an exclusive private consultation or track/road test drive with an authorized Porsche India Centre in your city.
          </p>
        </div>

        {/* Confirmation State Card */}
        {isSubmitted ? (
          <div className="bg-neutral-950 border border-neutral-800 p-8 sm:p-12 shadow-2xl animate-in fade-in duration-300">
            <div className="flex items-center gap-4 text-emerald-400 mb-6">
              <CheckCircle className="w-8 h-8 shrink-0" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  Enquiry Prepared for {selectedCentre.name}
                </h3>
                <p className="text-xs text-neutral-400">
                  Your request for the <strong className="text-white">{formData.preferredModel}</strong> is ready to dispatch.
                </p>
              </div>
            </div>

            {/* Summary Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-neutral-900 border border-neutral-800 text-xs mb-8">
              <div>
                <span className="text-neutral-400 uppercase tracking-wider block mb-1">Applicant:</span>
                <span className="text-white font-semibold">{formData.fullName}</span> (+91 {formData.phone})
              </div>
              <div>
                <span className="text-neutral-400 uppercase tracking-wider block mb-1">Centre / City:</span>
                <span className="text-white font-semibold">{selectedCentre.name}</span> ({selectedCentre.city})
              </div>
              <div>
                <span className="text-neutral-400 uppercase tracking-wider block mb-1">Vehicle Selected:</span>
                <span className="text-white font-semibold">{formData.preferredModel}</span>
              </div>
              <div>
                <span className="text-neutral-400 uppercase tracking-wider block mb-1">Requested Slot:</span>
                <span className="text-white font-semibold">{formData.preferredDate}</span> at {formData.preferredTime}
              </div>
            </div>

            <p className="text-xs text-neutral-300 font-light mb-6">
              To proceed, choose your direct contact channel below to instantly send your appointment specifics to our Porsche India VIP concierge desk:
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white bg-emerald-600 hover:bg-emerald-700 transition-all cursor-pointer shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Concierge (+91 98200 91100)</span>
              </a>

              <a
                href={generateMailtoUrl()}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Dispatch Email to Porsche India</span>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800 flex justify-between items-center text-xs text-neutral-400">
              <span>Appointment enquiries are processed Monday through Saturday, 09:30 – 18:30 IST.</span>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-neutral-300 hover:text-white underline cursor-pointer"
              >
                Modify Request
              </button>
            </div>
          </div>
        ) : (
          /* Real Validated Booking Form */
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAction('test-drive');
            }}
            noValidate
            className="bg-neutral-950 border border-neutral-800 p-8 sm:p-12 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    placeholder="e.g. Rajiv Kumar"
                    className={`w-full bg-neutral-900 text-xs text-white pl-10 pr-4 py-3.5 border transition-colors focus:outline-none ${
                      errors.fullName ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="e.g. client@domain.com"
                    className={`w-full bg-neutral-900 text-xs text-white pl-10 pr-4 py-3.5 border transition-colors focus:outline-none ${
                      errors.email ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Mobile Number with Indian Code (+91) */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                  Mobile Number (India) <span className="text-red-500">*</span>
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3.5 bg-neutral-800 border border-r-0 border-neutral-800 text-xs text-neutral-300 font-medium">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setFormData({ ...formData, phone: val });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    placeholder="98200 12345"
                    className={`w-full bg-neutral-900 text-xs text-white px-3.5 py-3.5 border transition-colors focus:outline-none ${
                      errors.phone ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Preferred Porsche Model */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                  Preferred Porsche Model <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.preferredModel}
                  onChange={(e) => setFormData({ ...formData, preferredModel: e.target.value })}
                  className="w-full bg-neutral-900 text-xs text-white px-3.5 py-3.5 border border-neutral-800 focus:outline-none focus:border-neutral-500 cursor-pointer"
                >
                  {PORSCHE_VEHICLES.map((v) => (
                    <option key={v.id} value={v.name}>
                      {v.name} ({v.startingPriceFormatted})
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Indian City / Porsche Centre */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                  Preferred Porsche Centre City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.preferredCity}
                    onChange={(e) => setFormData({ ...formData, preferredCity: e.target.value })}
                    className="w-full bg-neutral-900 text-xs text-white pl-10 pr-4 py-3.5 border border-neutral-800 focus:outline-none focus:border-neutral-500 cursor-pointer"
                  >
                    {PORSCHE_CENTRES_INDIA.map((c) => (
                      <option key={c.city} value={c.city}>
                        {c.city} – {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Appointment Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => {
                      setFormData({ ...formData, preferredDate: e.target.value });
                      if (errors.preferredDate) setErrors({ ...errors, preferredDate: undefined });
                    }}
                    className={`w-full bg-neutral-900 text-xs text-white px-3 py-3.5 border focus:outline-none ${
                      errors.preferredDate ? 'border-red-500' : 'border-neutral-800 focus:border-neutral-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                    Time Slot
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-neutral-900 text-xs text-white px-3 py-3.5 border border-neutral-800 focus:outline-none focus:border-neutral-500 cursor-pointer"
                  >
                    <option value="10:00 AM">10:00 AM (Morning)</option>
                    <option value="11:30 AM">11:30 AM (Morning)</option>
                    <option value="02:30 PM">02:30 PM (Afternoon)</option>
                    <option value="04:30 PM">04:30 PM (Evening)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Message */}
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                Additional Specifications or Inquiries (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention specific packages (Weissach Package, Chrono), current vehicles owned, or allocation timing..."
                className="w-full bg-neutral-900 text-xs text-white p-3.5 border border-neutral-800 focus:outline-none focus:border-neutral-500 placeholder:text-neutral-500"
              />
            </div>

            {/* Two Action Buttons: Request Test Drive & Submit Enquiry */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => handleAction('test-drive')}
                className="flex-1 py-4 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-red-950/40 border border-red-500/30"
              >
                <span>Request a Test Drive</span>
                <Send className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => handleAction('enquiry')}
                className="flex-1 py-4 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-200 bg-neutral-900 hover:bg-neutral-800 hover:text-white active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer border border-neutral-700"
              >
                <span>Submit Enquiry</span>
              </button>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 gap-2">
              <span>Porsche India Official Dealership Representative will respond within 4 business hours.</span>
              <span>WhatsApp Concierge: +91 98200 91100</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
