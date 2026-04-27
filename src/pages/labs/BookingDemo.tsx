import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, Clock, Users, ArrowLeft, 
  CheckCircle2, MapPin, Star, CalendarDays, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import GridBackground from '../../components/animations/GridBackground';

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
  '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM', 
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', 
  '04:00 PM', '04:30 PM'
];

const BookingDemo: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Date/Time, 2: Details, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);

  // Calendar logic
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 1500);
  };

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 sm:h-12"></div>);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const isPast = currentDate.getMonth() === today.getMonth() && 
                     currentDate.getFullYear() === today.getFullYear() && 
                     i < today.getDate();
      
      const isSelected = selectedDate === i;

      days.push(
        <button
          key={`day-${i}`}
          disabled={isPast}
          onClick={() => {
            setSelectedDate(i);
            setSelectedTime(null);
          }}
          className={`h-10 sm:h-12 w-full rounded-xl flex items-center justify-center text-sm font-bold transition-all
            ${isPast ? 'text-slate-300 cursor-not-allowed' : 
              isSelected ? 'bg-[#0f172a] text-white shadow-lg shadow-slate-900/20 scale-105' : 
              'text-slate-700 hover:bg-slate-100'}`}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-[var(--background)] !text-[#0f172a] selection:bg-[#fd9a00]/30 font-sans">
      <GridBackground spacing={60} />
      
      {/* Top Navigation */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/50 backdrop-blur-xl border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Link to="/labs" className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-black tracking-tight">Vibe<span className="text-indigo-600">Book</span></h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Business Info (Hidden on mobile if step > 1) */}
          <div className={`lg:col-span-4 space-y-6 ${step > 1 ? 'hidden lg:block' : 'block'}`}>
            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-indigo-900">
                {/* Simulated abstract cover photo */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              </div>
              <div className="w-20 h-20 bg-white p-1 rounded-2xl shadow-lg relative z-10 mt-12 mb-4">
                <div className="w-full h-full bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                  <Star className="w-8 h-8 fill-current" />
                </div>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-[#0f172a] mb-2">The Grand Reserve</h2>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-6">
                <MapPin className="w-4 h-4" /> 123 Metro Ave, Central District
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="text-sm font-bold text-slate-500">Service</span>
                  <span className="text-sm font-black text-[#0f172a]">Premium Table Booking</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="text-sm font-bold text-slate-500">Duration</span>
                  <span className="text-sm font-black text-[#0f172a]">2 Hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-500">Price</span>
                  <span className="text-sm font-black text-indigo-600">Free Reservation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Flow */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
              
              {/* Progress Steps */}
              {step < 3 && (
                <div className="px-8 pt-8 pb-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-lg font-black tracking-tight text-[#0f172a]">
                    {step === 1 ? 'Select Date & Time' : 'Your Details'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                    <div className="w-8 h-px bg-slate-200"></div>
                    <div className={`w-2.5 h-2.5 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                  </div>
                </div>
              )}

              {/* Step 1: Calendar & Time Slots */}
              {step === 1 && (
                <div className="flex-1 flex flex-col md:flex-row">
                  {/* Calendar */}
                  <div className="p-8 border-b md:border-b-0 md:border-r border-slate-100 flex-1">
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="font-black text-[#0f172a]">
                        {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </h4>
                      <div className="flex gap-2">
                        <button onClick={handlePrevMonth} className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={handleNextMonth} className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-2 text-center mb-4">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {renderCalendarDays()}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="p-8 w-full md:w-[320px] bg-slate-50 flex flex-col max-h-[500px] overflow-hidden">
                    <h4 className="font-black text-[#0f172a] mb-6 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-600" /> Available Times
                    </h4>
                    
                    {!selectedDate ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                        <CalendarDays className="w-12 h-12 mb-4 text-slate-400" />
                        <p className="text-sm font-bold text-slate-500">Please select a date first</p>
                      </div>
                    ) : (
                      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                        <AnimatePresence>
                          {timeSlots.map((time, i) => (
                            <motion.button
                              key={time}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              onClick={() => setSelectedTime(time)}
                              className={`w-full p-4 rounded-2xl font-black text-sm border transition-all
                                ${selectedTime === time 
                                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20' 
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-600/50'
                                }`}
                            >
                              {time}
                            </motion.button>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Guest Details Form */}
              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  className="flex-1 p-8"
                >
                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-8 flex items-start gap-4">
                    <CalendarIcon className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-black text-indigo-900">
                        {currentDate.toLocaleDateString('en-US', { month: 'short' })} {selectedDate}, {currentDate.getFullYear()} at {selectedTime}
                      </p>
                      <button onClick={() => setStep(1)} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline mt-1">Change date/time</button>
                    </div>
                  </div>

                  <form id="bookingForm" onSubmit={handleBooking} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">First Name</label>
                        <input required type="text" className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 font-medium" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Last Name</label>
                        <input required type="text" className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 font-medium" placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Address</label>
                      <input required type="email" className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 font-medium" placeholder="john@example.com" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Number of Guests</label>
                      <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 w-fit rounded-xl p-1">
                        <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-lg hover:bg-white text-slate-600 font-black">-</button>
                        <span className="w-8 text-center font-black">{guests}</span>
                        <button type="button" onClick={() => setGuests(Math.min(10, guests + 1))} className="w-10 h-10 rounded-lg hover:bg-white text-slate-600 font-black">+</button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Special Requests (Optional)</label>
                      <textarea className="w-full h-24 p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600 font-medium resize-none" placeholder="Allergies, seating preference, etc." />
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-6 relative">
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}
                    >
                      <CheckCircle2 className="w-12 h-12" />
                    </motion.div>
                    <div className="absolute inset-0 border-4 border-emerald-500 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-[#0f172a] mb-2">Booking Confirmed!</h3>
                  <p className="text-slate-500 font-medium mb-8 max-w-sm">
                    We've sent a confirmation email with all the details. We look forward to seeing you.
                  </p>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 w-full max-w-sm text-left space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CalendarIcon className="w-5 h-5 text-indigo-600 shrink-0" />
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date & Time</div>
                        <div className="font-bold text-[#0f172a]">{currentDate.toLocaleDateString('en-US', { month: 'short' })} {selectedDate}, {selectedTime}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-indigo-600 shrink-0" />
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Guests</div>
                        <div className="font-bold text-[#0f172a]">{guests} People</div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setStep(1);
                      setSelectedDate(null);
                      setSelectedTime(null);
                    }}
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    Make another booking
                  </button>
                </motion.div>
              )}

              {/* Bottom Action Bar */}
              {step < 3 && (
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
                  {step === 1 ? (
                    <button
                      onClick={() => setStep(2)}
                      disabled={!selectedDate || !selectedTime}
                      className="px-8 py-4 rounded-xl bg-[#0f172a] text-white font-black uppercase tracking-widest text-xs transition-all disabled:opacity-30 hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/10"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      form="bookingForm"
                      type="submit"
                      disabled={isProcessing}
                      className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/20 flex items-center justify-center min-w-[200px]"
                    >
                      {isProcessing ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingDemo;
