import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, ShoppingBag, CreditCard, Banknote, Search, 
  Trash2, Plus, Minus, Receipt, ArrowLeft, Tag, Coffee
} from 'lucide-react';
import { Link } from 'react-router-dom';
import GridBackground from '../../components/animations/GridBackground';

// Mock Data
const categories = ['All', 'Coffee', 'Pastries', 'Meals', 'Merch'];

const products = [
  { id: 1, name: 'Espresso', price: 120, category: 'Coffee', image: '☕', color: 'bg-amber-100 text-amber-700' },
  { id: 2, name: 'Latte', price: 150, category: 'Coffee', image: '🥛', color: 'bg-orange-100 text-orange-700' },
  { id: 3, name: 'Cappuccino', price: 160, category: 'Coffee', image: '☕', color: 'bg-amber-100 text-amber-700' },
  { id: 4, name: 'Croissant', price: 95, category: 'Pastries', image: '🥐', color: 'bg-yellow-100 text-yellow-700' },
  { id: 5, name: 'Blueberry Muffin', price: 110, category: 'Pastries', image: '🧁', color: 'bg-purple-100 text-purple-700' },
  { id: 6, name: 'Avocado Toast', price: 220, category: 'Meals', image: '🥑', color: 'bg-emerald-100 text-emerald-700' },
  { id: 7, name: 'Club Sandwich', price: 250, category: 'Meals', image: '🥪', color: 'bg-red-100 text-red-700' },
  { id: 8, name: 'Tote Bag', price: 350, category: 'Merch', image: '🛍️', color: 'bg-blue-100 text-blue-700' },
  { id: 9, name: 'Tumbler', price: 550, category: 'Merch', image: '🥤', color: 'bg-cyan-100 text-cyan-700' },
];

type CartItem = {
  product: typeof products[0];
  quantity: number;
};

const POSDemo: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const filteredProducts = products.filter(p => 
    (activeCategory === 'All' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.12; // 12% VAT
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowReceipt(true);
    }, 1500);
  };

  const closeReceipt = () => {
    setShowReceipt(false);
    clearCart();
  };

  return (
    <div className="h-screen bg-[var(--background)] !text-[#0f172a] selection:bg-[#fd9a00]/30 overflow-hidden flex flex-col font-sans">
      <GridBackground spacing={60} />
      
      {/* Top Navigation */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Link to="/labs" className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#fd9a00] text-white flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-black tracking-tight">Vibe<span className="text-[#fd9a00]">POS</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            Terminal Active
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 border-2 border-white shadow-sm">
            CB
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative z-10">
        {/* Left Side: Products Grid */}
        <div className="flex-1 flex flex-col bg-slate-50/50">
          {/* Search & Filter Bar */}
          <div className="p-6 pb-0 flex gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl border-none bg-white shadow-sm text-sm font-bold placeholder:font-medium focus:ring-2 focus:ring-[#fd9a00] transition-all"
              />
            </div>
            <div className="flex bg-white rounded-2xl shadow-sm p-1.5 overflow-x-auto no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                    activeCategory === cat 
                      ? 'bg-[#0f172a] text-white' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.button
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                    className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#fd9a00]/30 transition-all flex flex-col text-left group"
                  >
                    <div className={`w-full aspect-square rounded-[16px] ${product.color} flex items-center justify-center text-4xl mb-4 group-hover:scale-105 transition-transform`}>
                      {product.image}
                    </div>
                    <div className="text-[10px] font-black tracking-widest uppercase text-slate-400 mb-1">{product.category}</div>
                    <div className="font-black text-[#0f172a] leading-tight mb-2 truncate">{product.name}</div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="font-black text-[#fd9a00]">₱{product.price}</div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#fd9a00] group-hover:text-white transition-colors">
                        <Plus className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Cart / Checkout */}
        <div className="w-[400px] bg-white border-l border-slate-200 flex flex-col shadow-2xl relative z-20">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#fd9a00]" />
              Current Order
            </h2>
            <button 
              onClick={clearCart}
              disabled={cart.length === 0}
              className="text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors disabled:opacity-30 flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            <AnimatePresence>
              {cart.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-slate-400"
                >
                  <Tag className="w-12 h-12 mb-4 opacity-20" />
                  <p className="font-bold text-sm">Cart is empty</p>
                </motion.div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-slate-50 p-3 rounded-2xl flex gap-3 border border-slate-100"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${item.product.color}`}>
                      {item.product.image}
                    </div>
                    <div className="flex-1">
                      <div className="font-black text-sm text-[#0f172a] truncate">{item.product.name}</div>
                      <div className="text-xs font-bold text-slate-500">₱{item.product.price}</div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <div className="font-black text-[#fd9a00]">₱{item.product.price * item.quantity}</div>
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 overflow-hidden">
                        <button onClick={() => updateQuantity(item.product.id, -1)} className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors"><Minus className="w-3 h-3" /></button>
                        <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, 1)} className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-200">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm font-bold text-slate-500">
                <span>Subtotal</span>
                <span>₱{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-500">
                <span>Tax (12% VAT)</span>
                <span>₱{tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-slate-200 w-full my-2"></div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total</span>
                <span className="text-3xl font-black tracking-tight text-[#0f172a]">₱{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0 || isProcessing}
              className={`w-full h-16 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest transition-all
                ${cart.length === 0 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-[#0f172a] text-white hover:bg-[#fd9a00] hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-slate-900/10'
                }`}
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Pay ₱{total.toFixed(2)}
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Receipt Modal Overlay */}
      <AnimatePresence>
        {showReceipt && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 text-center bg-emerald-500 text-white relative">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-emerald-500">
                  <Receipt className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-1">Payment Successful</h3>
                <p className="text-emerald-100 font-bold text-sm">Order #INV-{Math.floor(Math.random() * 10000)}</p>
              </div>
              
              <div className="p-8 bg-[#f8fafc]">
                <div className="space-y-4 mb-8">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="font-bold text-slate-600">{item.quantity}x {item.product.name}</span>
                      <span className="font-black text-[#0f172a]">₱{item.product.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="h-px border-t border-dashed border-slate-300 w-full my-4"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total Paid</span>
                    <span className="text-2xl font-black text-[#fd9a00]">₱{total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={closeReceipt}
                  className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black uppercase tracking-widest text-xs rounded-xl transition-colors"
                >
                  New Order
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default POSDemo;
