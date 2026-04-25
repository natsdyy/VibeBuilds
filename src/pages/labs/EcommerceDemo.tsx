import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Star, ArrowRight, X, 
  CreditCard, ShieldCheck, Zap, Heart,
  Minus, Plus, ShoppingBag, ArrowLeft, Check
} from 'lucide-react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import GridBackground from '../../components/animations/GridBackground';

const products = [
  { id: 1, name: 'Quantum System', price: 1250, rating: 4.9, category: 'Software', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 2, name: 'Vibe Core Node', price: 850, rating: 4.8, category: 'Hardware', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 3, name: 'Neural Bot API', price: 450, rating: 5.0, category: 'Cloud', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 4, name: 'Cyber Shield', price: 1500, rating: 4.7, category: 'Security', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=300&h=300' },
];

const EcommerceDemo: React.FC = () => {
  const [cart, setCart] = useState<{id: number, qty: number}[]>([]);
  const [modalState, setModalState] = useState<'IDLE' | 'REVIEW' | 'CHECKOUT'>('IDLE');

  const addToCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { id, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => {
    const p = products.find(prod => prod.id === item.id);
    return sum + (p?.price || 0) * item.qty;
  }, 0);

  const handleClose = () => {
    setModalState('IDLE');
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[#1a1a1a] selection:bg-[#fd9a00]/30 overflow-x-hidden">
      <GridBackground spacing={60} />
      <Header />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        {/* Store Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fd9a00]/10 border border-[#fd9a00]/30 text-[#451a03] text-[10px] font-black tracking-widest uppercase mb-4 shadow-sm">
              Consumer UX Lab
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-[#1a1a1a]">Vibe<span className="text-[#fd9a00]">Store</span></h1>
            <p className="text-[#334155] font-bold">Premium e-commerce flow with high-conversion logic.</p>
          </div>

          <button 
            onClick={() => setModalState('REVIEW')}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#1a1a1a] text-white font-black text-[10px] tracking-widest uppercase shadow-2xl hover:scale-105 transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" /> Cart ({cart.reduce((a, b) => a + b.qty, 0)})
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -10 }}
              className="group relative p-6 rounded-[40px] border border-slate-200 bg-white shadow-lg transition-all duration-500"
            >
              <div className="relative aspect-square rounded-[32px] overflow-hidden mb-6">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <button className="absolute top-4 right-4 p-3 rounded-full bg-black/50 backdrop-blur-md text-white/50 hover:text-[#fd9a00] transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#64748b]">{product.category}</span>
                  <div className="flex items-center gap-1 text-amber-600">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[10px] font-black">{product.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-black tracking-tight text-[#1a1a1a]">{product.name}</h3>
                <p className="text-2xl font-black text-[#fd9a00]">${product.price}</p>
              </div>

              <button 
                onClick={() => addToCart(product.id)}
                className="w-full py-4 rounded-2xl bg-slate-50 border border-slate-200 text-[#1a1a1a] font-black text-[10px] tracking-widest uppercase hover:bg-[#fd9a00] hover:text-white hover:border-[#fd9a00] transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add to Cart
              </button>
            </motion.div>
          ))}
        </div>

        {/* Cart Modal */}
        <AnimatePresence>
          {modalState !== 'IDLE' && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-2xl max-h-[90vh] bg-white border border-slate-200 p-8 md:p-12 rounded-[48px] shadow-2xl overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-4">
                    {modalState === 'CHECKOUT' && (
                      <button onClick={() => setModalState('REVIEW')} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200">
                        <ArrowLeft className="w-5 h-5 text-[#1a1a1a]" />
                      </button>
                    )}
                    <h2 className="text-3xl font-black tracking-tight text-[#1a1a1a]">
                      {modalState === 'REVIEW' ? <>Your <span className="text-[#fd9a00]">Bag</span></> : 'Checkout'}
                    </h2>
                  </div>
                  <button onClick={handleClose} className="p-3 rounded-full bg-slate-100 hover:bg-slate-200">
                    <X className="w-6 h-6 text-[#1a1a1a]" />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {modalState === 'REVIEW' && (
                    <motion.div key="review">
                      {cart.length === 0 ? (
                        <div className="h-[40vh] flex flex-col items-center justify-center text-slate-400">
                          <ShoppingBag className="w-20 h-20 opacity-10 mb-6" />
                          <p className="font-black uppercase tracking-widest text-sm">Bag is empty</p>
                        </div>
                      ) : (
                        <div className="space-y-8">
                          <div className="space-y-4">
                            {cart.map((item) => {
                              const p = products.find(prod => prod.id === item.id)!;
                              return (
                                <div key={item.id} className="flex items-center gap-6 p-4 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm">
                                  <img src={p.image} className="w-16 h-16 rounded-2xl object-cover" />
                                  <div className="flex-1">
                                    <h4 className="font-black text-sm text-[#1a1a1a]">{p.name}</h4>
                                    <p className="text-xs text-[#fd9a00] font-black">${p.price}</p>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100"><Minus className="w-3 h-3 text-[#1a1a1a]" /></button>
                                    <span className="font-black text-sm text-[#1a1a1a]">{item.qty}</span>
                                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100"><Plus className="w-3 h-3 text-[#1a1a1a]" /></button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-200 space-y-6 shadow-md">
                            <div className="flex justify-between items-center">
                              <span className="font-black text-lg tracking-tight text-slate-800">Total</span>
                              <span className="font-black text-3xl text-[#fd9a00]">${cartTotal}</span>
                            </div>

                            <button 
                              onClick={() => setModalState('CHECKOUT')}
                              className="w-full py-5 rounded-[24px] bg-[#fd9a00] text-white font-black text-sm tracking-widest uppercase shadow-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-all"
                            >
                              Review & Checkout <ArrowRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {modalState === 'CHECKOUT' && (
                    <motion.div key="checkout" className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#64748b]">Full Name</label>
                          <input type="text" placeholder="Alex Rivera" className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#fd9a00]/50 outline-none font-black text-[#1a1a1a]" />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#64748b]">Email</label>
                          <input type="email" placeholder="alex@vibe.io" className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#fd9a00]/50 outline-none font-black text-[#1a1a1a]" />
                        </div>
                      </div>

                      <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-200 space-y-6 shadow-md">
                        <h4 className="font-black uppercase tracking-widest text-[10px] text-[#64748b]">Payment Summary</h4>
                        <div className="flex justify-between font-black text-[#1a1a1a]">
                          <span>Final Total</span>
                          <span className="text-2xl text-[#fd9a00]">${cartTotal}</span>
                        </div>
                        <button className="w-full py-5 rounded-[24px] bg-[#1a1a1a] text-white font-black text-sm tracking-widest uppercase shadow-2xl flex items-center justify-center gap-3">
                          <CreditCard className="w-5 h-5" /> Pay with VibePay
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-[#64748b]">
                        <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-700" /> Secure</span>
                        <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-700" /> Verified</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default EcommerceDemo;
