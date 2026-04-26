import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Box, Palette, Layers, ShieldCheck, Truck, ShoppingCart, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductConfigurator: React.FC = () => {
  const [activeColor, setActiveColor] = useState({ name: 'Phantom Black', hex: '#000000', price: 0 });
  const [activeMaterial, setActiveMaterial] = useState({ name: 'Titanium Shard', price: 250 });
  const [activeStrap, setActiveStrap] = useState({ name: 'Cyber Link', price: 150 });
  
  const colors = [
    { name: 'Phantom Black', hex: '#000000', price: 0 },
    { name: 'Vibe Amber', hex: '#fd9a00', price: 50 },
    { name: 'Neural Teal', hex: '#00ffd2', price: 50 },
    { name: 'Void Purple', hex: '#6366f1', price: 50 },
  ];

  const materials = [
    { name: 'Carbon Fiber', price: 0 },
    { name: 'Titanium Shard', price: 250 },
    { name: 'Lunar Ceramic', price: 400 },
  ];

  const basePrice = 1299;
  const totalPrice = basePrice + activeColor.price + activeMaterial.price + activeStrap.price;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#fd9a00]/30 overflow-hidden flex flex-col">
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center border-b border-white/5 backdrop-blur-xl bg-black/20 fixed top-0 w-full z-50">
        <div className="flex items-center gap-4">
          <Link to="/labs" className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-[#fd9a00] uppercase tracking-widest">Shard Configurator</span>
            <h1 className="text-sm font-bold uppercase tracking-tight">VibeWatch Ultra v1.0</h1>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Total Investment</span>
            <span className="text-xl font-black text-[#fd9a00]">${totalPrice.toLocaleString()}</span>
          </div>
          <button className="px-6 py-3 rounded-xl bg-[#fd9a00] text-black font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#fd9a00]/20">
            <ShoppingCart className="w-4 h-4" /> Add to Vault
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col lg:flex-row pt-24">
        {/* Visualizer Area */}
        <div className="flex-1 relative flex items-center justify-center p-12 overflow-hidden">
           {/* Abstract Background Elements */}
           <div className="absolute inset-0 z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#fd9a00]/10 blur-[120px] rounded-full" />
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full" />
           </div>

           <motion.div 
             key={activeColor.name + activeMaterial.name}
             initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
             animate={{ opacity: 1, scale: 1, rotateY: 0 }}
             className="relative z-10 w-full max-w-lg aspect-square flex items-center justify-center"
           >
              {/* This represents our "3D" Product */}
              <div className="relative w-72 h-72">
                {/* Watch Body */}
                <motion.div 
                  className="absolute inset-0 rounded-[60px] border-8 shadow-2xl transition-all duration-700"
                  style={{ 
                    backgroundColor: activeColor.hex, 
                    borderColor: 'rgba(255,255,255,0.1)',
                    boxShadow: `0 0 80px ${activeColor.hex}44`
                  }}
                >
                   {/* Watch Screen */}
                   <div className="absolute inset-4 rounded-[45px] bg-gradient-to-br from-zinc-800 to-black overflow-hidden flex items-center justify-center border border-white/5">
                      <div className="flex flex-col items-center">
                        <span className="text-4xl font-black tracking-tighter italic">21:52</span>
                        <div className="flex items-center gap-2 mt-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#00ffd2] animate-pulse" />
                           <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Neural Link Active</span>
                        </div>
                      </div>
                   </div>
                   
                   {/* Digital Crown */}
                   <div className="absolute top-1/4 -right-3 w-6 h-12 bg-zinc-800 rounded-lg border border-white/10" />
                </motion.div>
                
                {/* Straps (Simple Visual Representation) */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-48 h-32 bg-zinc-900/50 rounded-t-3xl border-x border-t border-white/5 -z-10" />
                <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-48 h-32 bg-zinc-900/50 rounded-b-3xl border-x border-b border-white/5 -z-10" />
              </div>

              {/* Callouts */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                className="absolute top-10 right-0 p-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl flex flex-col gap-1"
              >
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Selected Chassis</span>
                <span className="text-sm font-bold">{activeMaterial.name}</span>
              </motion.div>
           </motion.div>

           {/* Labels */}
           <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#fd9a00]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">2 Year VibeCare+</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#fd9a00]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">Priority Deployment</span>
              </div>
           </div>
        </div>

        {/* Configuration Panel */}
        <div className="w-full lg:w-[450px] bg-black/40 border-l border-white/5 backdrop-blur-3xl p-10 flex flex-col gap-10 overflow-y-auto">
          {/* Section: Color */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#fd9a00]" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Finish</span>
              </div>
              <span className="text-[10px] font-bold text-white/40">{activeColor.name}</span>
            </div>
            <div className="flex gap-4">
              {colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setActiveColor(color)}
                  className={`w-12 h-12 rounded-full border-2 transition-all p-1 ${activeColor.name === color.name ? 'border-[#fd9a00] scale-110 shadow-[0_0_20px_#fd9a0044]' : 'border-white/10 hover:border-white/30'}`}
                >
                  <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                </button>
              ))}
            </div>
          </div>

          {/* Section: Material */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#fd9a00]" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Material</span>
              </div>
              <span className="text-[10px] font-bold text-white/40">+${activeMaterial.price}</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {materials.map(mat => (
                <button
                  key={mat.name}
                  onClick={() => setActiveMaterial(mat)}
                  className={`px-6 py-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    activeMaterial.name === mat.name ? 'bg-[#fd9a00]/10 border-[#fd9a00] text-[#fd9a00]' : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xs font-black uppercase tracking-widest">{mat.name}</span>
                  {activeMaterial.name === mat.name && <ShieldCheck className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Highlight */}
          <div className="mt-auto p-6 rounded-3xl bg-gradient-to-br from-[#fd9a00]/20 to-transparent border border-[#fd9a00]/10">
             <div className="flex items-center gap-2 mb-2 text-[#fd9a00]">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-widest">Premium Inclusion</span>
             </div>
             <h3 className="text-lg font-black mb-1">Neural Core 5.0</h3>
             <p className="text-[10px] text-white/60 leading-relaxed uppercase font-bold tracking-wider">
               Every VibeWatch includes our proprietary Neural Core for instant biometric synchronization.
             </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductConfigurator;
