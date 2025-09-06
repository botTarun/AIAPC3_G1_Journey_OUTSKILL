import React, { useState } from 'react';
import { X, User, Mail, Phone, Calendar, CreditCard, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { createBooking, createPayment, type BookingItem, type Traveler } from '../lib/booking';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingItem: BookingItem | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, bookingItem }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [travelers, setTravelers] = useState<Traveler[]>([
    {
      firstName: '',
      lastName: '',
      email: user?.email || '',
      phone: '',
      travelerType: 'adult'
    }
  ]);

  const [contactDetails, setContactDetails] = useState({
    email: user?.email || '',
    phone: '',
    specialRequests: ''
  });

  const handleAddTraveler = () => {
    setTravelers([...travelers, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      travelerType: 'adult'
    }]);
  };

  const handleTravelerChange = (index: number, field: keyof Traveler, value: string) => {
    const updatedTravelers = [...travelers];
    updatedTravelers[index] = { ...updatedTravelers[index], [field]: value };
    setTravelers(updatedTravelers);
  };

  const handleBooking = async () => {
    if (!bookingItem || !user) return;

    setLoading(true);
    setError('');

    try {
      // Create booking
      const bookingData = {
        items: [bookingItem],
        travelers,
        contactEmail: contactDetails.email,
        contactPhone: contactDetails.phone,
        specialRequests: contactDetails.specialRequests,
      };

      const bookingResponse = await createBooking(bookingData);

      if (!bookingResponse.success) {
        throw new Error(bookingResponse.error);
      }

      // Create payment
      const paymentData = {
        bookingId: bookingResponse.booking.id,
        amount: bookingItem.unitPrice * bookingItem.quantity,
        customerDetails: {
          customerId: user.id,
          customerName: `${travelers[0].firstName} ${travelers[0].lastName}`,
          customerEmail: contactDetails.email,
          customerPhone: contactDetails.phone,
        },
        returnUrl: `${window.location.origin}/booking-success`,
      };

      const paymentResponse = await createPayment(paymentData);

      if (!paymentResponse.success) {
        throw new Error(paymentResponse.error);
      }

      // Redirect to Cashfree payment page
      if (paymentResponse.paymentUrl) {
        window.location.href = paymentResponse.paymentUrl;
      } else {
        throw new Error('Payment URL not received');
      }

    } catch (err: any) {
      setError(err.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !bookingItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Complete Your Booking
            </h2>
            <p className="text-gray-400">{bookingItem.name}</p>
            <p className="text-2xl font-bold text-white mt-2">
              ₹{(bookingItem.unitPrice * bookingItem.quantity).toLocaleString()}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Traveler Information</h3>
              
              {travelers.map((traveler, index) => (
                <div key={index} className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="text-lg font-medium text-white mb-4">
                    Traveler {index + 1}
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="First Name"
                        value={traveler.firstName}
                        onChange={(e) => handleTravelerChange(index, 'firstName', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={traveler.lastName}
                        onChange={(e) => handleTravelerChange(index, 'lastName', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        placeholder="Email"
                        value={traveler.email}
                        onChange={(e) => handleTravelerChange(index, 'email', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={traveler.phone}
                        onChange={(e) => handleTravelerChange(index, 'phone', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                onClick={handleAddTraveler}
                className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:border-purple-500 hover:text-purple-400 transition-colors"
              >
                + Add Another Traveler
              </button>

              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-lg font-medium text-white mb-4">Contact Information</h4>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      placeholder="Contact Email"
                      value={contactDetails.email}
                      onChange={(e) => setContactDetails({...contactDetails, email: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      placeholder="Contact Phone"
                      value={contactDetails.phone}
                      onChange={(e) => setContactDetails({...contactDetails, phone: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  
                  <textarea
                    placeholder="Special Requests (Optional)"
                    value={contactDetails.specialRequests}
                    onChange={(e) => setContactDetails({...contactDetails, specialRequests: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
                    rows={3}
                  />
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={loading || !travelers[0].firstName || !travelers[0].lastName || !contactDetails.email}
                className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Payment
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;