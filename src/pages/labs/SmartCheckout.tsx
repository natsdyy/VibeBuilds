import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShieldCheck, CreditCard, Package, CheckCircle2, Lock, ChevronRight, ShoppingCart, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const SmartCheckout: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const cart = {
    items: [
      { id: 1, name: 'VibeWatch Ultra', price: 1299, image: '⌚' },
      { id: 2, name: 'Cyber Link Strap', price: 150, image: '⛓️' }
    ],
    shipping: 25,
    tax: 115
  };

  const subtotal = cart.items.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal + cart.shipping + cart.tax;

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-[#fd9a00]/30 selection:text-white">
      {/* Header */}
      <header className="p-6 bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/labs" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-zinc-100 group-hover:bg-[#fd9a00] group-hover:text-white transition-all">
               <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-black text-sm tracking-widest uppercase">Back to Labs</span>
          </Link>
          <div className="flex items-center gap-2">
             <Lock className="w-4 h-4 text-emerald-500" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Secure Neural Encryption</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Checkout Steps */}
        <div className="lg:col-span-8 flex flex-col gap-8">
           <AnimatePresence mode="wait">
             {!isSuccess ? (
               <motion.div 
                 key="form"
                 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                 className="flex flex-col gap-6"
               >
                  {/* Step 1: Contact */}
                  <div className={`p-8 rounded-[32px] border-2 transition-all ${step === 1 ? 'border-[#fd9a00] bg-white shadow-2xl shadow-[#fd9a00]/5' : 'border-zinc-100 bg-white/50 opacity-60'}`}>
                     <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${step >= 1 ? 'bg-[#fd9a00] text-white' : 'bg-zinc-100 text-zinc-400'}`}>1</div>
                           <h2 className="text-xl font-black tracking-tight uppercase">Contact Information</h2>
                        </div>
                        {step > 1 && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                     </div>
                     {step === 1 && (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input type="email" placeholder="Email Address" className="p-4 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#fd9a00] transition-all" />
                          <input type="tel" placeholder="Neural ID / Phone" className="p-4 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#fd9a00] transition-all" />
                          <button onClick={() => setStep(2)} className="md:col-span-2 py-4 bg-zinc-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2">
                             Continue to Shipping <ChevronRight className="w-4 h-4" />
                          </button>
                       </div>
                     )}
                  </div>

                  {/* Step 2: Shipping */}
                  <div className={`p-8 rounded-[32px] border-2 transition-all ${step === 2 ? 'border-[#fd9a00] bg-white shadow-2xl shadow-[#fd9a00]/5' : 'border-zinc-100 bg-white/50 opacity-60'}`}>
                     <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${step >= 2 ? 'bg-[#fd9a00] text-white' : 'bg-zinc-100 text-zinc-400'}`}>2</div>
                           <h2 className="text-xl font-black tracking-tight uppercase">Shipping Method</h2>
                        </div>
                        {step > 2 && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                     </div>
                     {step === 2 && (
                       <div className="grid grid-cols-1 gap-4">
                          <div className="p-6 rounded-2xl border-2 border-[#fd9a00] bg-[#fd9a00]/5 flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                <Truck className="w-6 h-6 text-[#fd9a00]" />
                                <div className="flex flex-col">
                                   <span className="font-bold">Neural Express Deployment</span>
                                   <span className="text-xs text-zinc-500">Instant teleportation available in your sector</span>
                                </div>
                             </div>
                             <span className="font-black text-[#fd9a00]">FREE</span>
                          </div>
                          <button onClick={() => setStep(3)} className="py-4 bg-zinc-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2">
                             Continue to Payment <ChevronRight className="w-4 h-4" />
                          </button>
                       </div>
                     )}
                  </div>

                  {/* Step 3: Payment */}
                  <div className={`p-8 rounded-[32px] border-2 transition-all ${step === 3 ? 'border-[#fd9a00] bg-white shadow-2xl shadow-[#fd9a00]/5' : 'border-zinc-100 bg-white/50 opacity-60'}`}>
                     <div className="flex items-center gap-4 mb-8">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${step >= 3 ? 'bg-[#fd9a00] text-white' : 'bg-zinc-100 text-zinc-400'}`}>3</div>
                        <h2 className="text-xl font-black tracking-tight uppercase">Payment Details</h2>
                     </div>
                     {step === 3 && (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2 relative">
                             <input type="text" placeholder="Card Number" className="w-full p-4 pl-12 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#fd9a00] transition-all" />
                             <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                          </div>
                          <input type="text" placeholder="MM/YY" className="p-4 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#fd9a00] transition-all" />
                          <input type="text" placeholder="CVC" className="p-4 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#fd9a00] transition-all" />
                          <button 
                            disabled={isProcessing}
                            onClick={handleProcess} 
                            className="md:col-span-2 py-6 bg-[#fd9a00] text-black rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3 mt-4"
                          >
                             {isProcessing ? (
                               <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                             ) : (
                               <>Pay ${total.toLocaleString()} Securely <ShieldCheck className="w-5 h-5" /></>
                             )}
                          </button>
                       </div>
                     )}
                  </div>
               </motion.div>
             ) : (
               <motion.div 
                 key="success"
                 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                 className="flex flex-col items-center justify-center py-20 text-center"
               >
                  <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-8">
                     <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h1 className="text-5xl font-black tracking-tight mb-4 uppercase">Transmission Received</h1>
                  <p className="text-zinc-500 text-xl max-w-md font-medium leading-relaxed">
                    Your order #VB-9921 has been processed. Your VibeWatch is currently being synchronized.
                  </p>
                  <Link to="/labs" className="mt-12 px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">
                    Return to Playground
                  </Link>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Order Summary Column */}
        {!isSuccess && (
          <div className="lg:col-span-4">
             <div className="sticky top-32 p-8 rounded-[40px] bg-zinc-900 text-white shadow-2xl">
                <div className="flex items-center gap-2 mb-8">
                   <ShoppingCart className="w-5 h-5 text-[#fd9a00]" />
                   <h2 className="text-lg font-black uppercase tracking-widest">Order Summary</h2>
                </div>
                
                <div className="space-y-6 mb-8 border-b border-white/10 pb-8">
                   {cart.items.map(item => (
                     <div key={item.id} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">{item.image}</div>
                        <div className="flex-1 flex flex-col">
                           <span className="font-bold text-sm">{item.name}</span>
                           <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">Qty: 1</span>
                        </div>
                        <span className="font-bold text-sm">${item.price}</span>
                     </div>
                   ))}
                </div>

                <div className="space-y-3">
                   <div className="flex justify-between text-xs text-white/60 font-black uppercase tracking-widest">
                      <span>Subtotal</span>
                      <span>${subtotal.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-xs text-white/60 font-black uppercase tracking-widest">
                      <span>Neural Shipping</span>
                      <span>${cart.shipping.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-xs text-white/60 font-black uppercase tracking-widest">
                      <span>Vibe Tax</span>
                      <span>${cart.tax.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-xl font-black text-[#fd9a00] pt-6 border-t border-white/10 mt-6">
                      <span>TOTAL</span>
                      <span>${total.toLocaleString()}</span>
                   </div>
                </div>

                <div className="mt-8 flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">
                   <Package className="w-4 h-4 text-[#fd9a00] shrink-0" />
                   Priority Neural Delivery Guaranteed for your sector.
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SmartCheckout;
