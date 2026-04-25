import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Palette, Shirt, Scissors, Eye, 
  ArrowLeft, ChevronRight, ChevronLeft, Sparkles,
  Shield, Zap, Globe, Save, RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import GridBackground from '../../components/animations/GridBackground';

const MMOCreator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [hairIndex, setHairIndex] = useState(0);
  const [eyeIndex, setEyeIndex] = useState(0);
  const [outfitIndex, setOutfitIndex] = useState(0);
  const [skinTone, setSkinTone] = useState('#f3d1b0');

  // Asset URLs from generated images
  const ASSETS = {
    base: "/assets/mmo/bases.png",
    hair: "/assets/mmo/hair_clean.png",
    eyes: "/assets/mmo/eyes_clean.png",
    clothes: "/assets/mmo/clothes.png"
  };

  const hairOptions = [
    { name: 'Spiky', color: 'Black' },
    { name: 'Flowing', color: 'Blonde' },
    { name: 'Ponytail', color: 'Pink' },
    { name: 'Bob', color: 'Cyan' },
    { name: 'Undercut', color: 'Brown' }
  ];

  const eyeOptions = [
    { name: 'Determined', color: 'Blue' },
    { name: 'Sharp', color: 'Green' },
    { name: 'Sleepy', color: 'Brown' },
    { name: 'Heroic', color: 'Red' }
  ];

  const outfitOptions = [
    { name: 'Casual Traveler', desc: 'Basic cotton shirt and jeans.' },
    { name: 'Urban Scout', desc: 'Hoodie and cargo pants.' },
    { name: 'Novice Guard', desc: 'Leather vest and reinforced boots.' },
    { name: 'Vibe Architect', desc: 'Premium branded jacket and sneakers.' }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] !text-[#0f172a] selection:bg-[#fd9a00]/30 overflow-x-hidden">
      <GridBackground spacing={60} />
      <Header />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-[10px] font-black tracking-widest uppercase mb-4 shadow-sm">
              <Sparkles className="w-3 h-3" /> Character Studio
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 !text-[#0f172a]">Avatar <span className="text-[#fd9a00]">Builder</span></h1>
            <p className="text-[#334155] font-bold">Modular customization system for the VibeMMO engine.</p>
          </div>
          
          <Link 
            to="/labs"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-[#0f172a] font-black text-[10px] tracking-widest uppercase hover:bg-slate-50 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Demos
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Character Preview */}
          <div className="lg:col-span-7 relative">
            <div className="aspect-[4/5] rounded-[48px] bg-white border border-slate-200 shadow-2xl overflow-hidden flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
              
              {/* Premium Component Showcase */}
              <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                
                {/* 1. Main Character Card (The Base) */}
                <div className="relative w-72 h-80 rounded-[48px] bg-slate-50 border border-slate-100 overflow-hidden shadow-2xl group/character mb-10 ring-8 ring-white/50">
                   <motion.div 
                    key={gender + skinTone}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full bg-no-repeat transition-all duration-700 transform scale-[1.6]"
                    style={{
                      backgroundImage: `url(${ASSETS.base})`,
                      backgroundSize: '200% auto',
                      backgroundPosition: gender === 'male' ? '0% center' : '100% center',
                      filter: skinTone === '#f3d1b0' ? 'none' : 
                              skinTone === '#d8a47f' ? 'sepia(0.2) saturate(1.2) brightness(0.9)' :
                              skinTone === '#a67c52' ? 'sepia(0.4) saturate(1.1) brightness(0.7)' :
                              'sepia(0.6) saturate(1.0) brightness(0.5)'
                    }}
                   />
                   {/* Glassmorphism Badge */}
                   <div className="absolute top-6 left-6 px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-lg">
                      <p className="text-[10px] font-black text-[#fd9a00] uppercase tracking-widest flex items-center gap-2">
                        <User className="w-3 h-3" /> {gender.toUpperCase()} BASE
                      </p>
                   </div>
                </div>

                {/* 2. Component Gallery (The Parts) */}
                <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                    {/* Hair Component Card */}
                    <div className="p-6 rounded-[32px] bg-white border border-slate-100 shadow-xl relative overflow-hidden group/part">
                        <div className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest text-slate-400 z-10">Component / Hair</div>
                        <div className="mt-8 mb-4 h-28 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-[#fd9a00]/5 rounded-2xl" />
                            <motion.div 
                                key={hairIndex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full h-full bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${ASSETS.hair})`,
                                    backgroundSize: '600% 600%', // Increased zoom
                                    backgroundPosition: `${(hairIndex % 5) * 20 + 2}% ${(Math.floor(hairIndex / 5)) * 20 + 2}%`,
                                    transform: 'scale(1.8)'
                                }}
                            />
                        </div>
                        <p className="text-xs font-black text-[#0f172a] text-center uppercase tracking-widest">{hairOptions[hairIndex].name}</p>
                    </div>

                    {/* Eyes Component Card */}
                    <div className="p-6 rounded-[32px] bg-white border border-slate-100 shadow-xl relative overflow-hidden group/part">
                        <div className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest text-slate-400 z-10">Component / Eyes</div>
                        <div className="mt-8 mb-4 h-28 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-blue-500/5 rounded-2xl" />
                            <motion.div 
                                key={eyeIndex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full h-full bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${ASSETS.eyes})`,
                                    backgroundSize: '600% 600%', // Increased zoom
                                    backgroundPosition: `${(eyeIndex % 5) * 20 + 5}% ${(Math.floor(eyeIndex / 5)) * 20 + 5}%`,
                                    transform: 'scale(2.5) translateY(2px)'
                                }}
                            />
                        </div>
                        <p className="text-xs font-black text-[#0f172a] text-center uppercase tracking-widest">{eyeOptions[eyeIndex].name}</p>
                    </div>
                </div>

              </div>

              {/* Toolbar */}
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                <button className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-100 flex items-center justify-center shadow-lg hover:bg-[#fd9a00] hover:text-white transition-all group/btn">
                  <RefreshCw className="w-5 h-5 group-hover/btn:rotate-180 transition-all duration-500" />
                </button>
                <button className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-100 flex items-center justify-center shadow-lg hover:bg-blue-500 hover:text-white transition-all">
                  <Save className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">
              {[
                { icon: <Shield className="w-5 h-5 text-blue-600" />, label: 'Engine', value: 'VibeMMO Core' },
                { icon: <Zap className="w-5 h-5 text-amber-600" />, label: 'Latency', value: 'Instant Render' },
                { icon: <Globe className="w-5 h-5 text-emerald-600" />, label: 'Network', value: 'Sync Layers' },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">{stat.icon}</div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-xs font-black text-[#0f172a]">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            {/* Gender Selection */}
            <div className="p-8 rounded-[40px] bg-white border border-slate-200 shadow-xl">
              <h3 className="text-sm font-black tracking-widest uppercase text-slate-400 mb-6 flex items-center gap-2">
                <User className="w-4 h-4" /> Select Base
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {['male', 'female'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g as any)}
                    className={`py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase transition-all border-2 ${
                      gender === g 
                        ? 'bg-[#0f172a] text-white border-[#0f172a]' 
                        : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Customization Tabs */}
            <div className="p-8 rounded-[40px] bg-white border border-slate-200 shadow-xl">
              <div className="space-y-10">
                {/* Skin Tone */}
                <div>
                  <h3 className="text-sm font-black tracking-widest uppercase text-slate-400 mb-4 flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Skin Tone
                  </h3>
                  <div className="flex gap-3">
                    {['#f3d1b0', '#d8a47f', '#a67c52', '#7a5430'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setSkinTone(color)}
                        className={`w-10 h-10 rounded-full border-4 transition-all ${
                          skinTone === color ? 'border-[#fd9a00] scale-110' : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Hair Style */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-black tracking-widest uppercase text-slate-400 flex items-center gap-2">
                      <Scissors className="w-4 h-4" /> Hairstyle
                    </h3>
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
                      <img src={ASSETS.hair} alt="Hair Sprite" className="w-full h-full object-cover opacity-60" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                    <button 
                      onClick={() => setHairIndex(prev => prev > 0 ? prev - 1 : hairOptions.length - 1)}
                      className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:bg-slate-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1 text-center font-black text-xs uppercase tracking-widest">
                      {hairOptions[hairIndex].name}
                    </div>
                    <button 
                      onClick={() => setHairIndex(prev => prev < hairOptions.length - 1 ? prev + 1 : 0)}
                      className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:bg-slate-50"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Eyes */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-black tracking-widest uppercase text-slate-400 flex items-center gap-2">
                      <Eye className="w-4 h-4" /> Eye Style
                    </h3>
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
                      <img src={ASSETS.eyes} alt="Eye Sprite" className="w-full h-full object-cover opacity-60" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                    <button 
                      onClick={() => setEyeIndex(prev => prev > 0 ? prev - 1 : eyeOptions.length - 1)}
                      className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:bg-slate-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1 text-center font-black text-xs uppercase tracking-widest">
                      {eyeOptions[eyeIndex].name}
                    </div>
                    <button 
                      onClick={() => setEyeIndex(prev => prev < eyeOptions.length - 1 ? prev + 1 : 0)}
                      className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:bg-slate-50"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Clothing */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-black tracking-widest uppercase text-slate-400 flex items-center gap-2">
                      <Shirt className="w-4 h-4" /> Outfit
                    </h3>
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
                      <img src={ASSETS.clothes} alt="Clothing Sprite" className="w-full h-full object-cover opacity-60" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {outfitOptions.map((outfit, i) => (
                      <button
                        key={i}
                        onClick={() => setOutfitIndex(i)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all ${
                          outfitIndex === i 
                            ? 'border-[#fd9a00] bg-[#fd9a00]/5' 
                            : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                        }`}
                      >
                        <p className={`text-[10px] font-black uppercase tracking-widest ${outfitIndex === i ? 'text-[#fd9a00]' : 'text-[#0f172a]'}`}>
                          {outfit.name}
                        </p>
                        <p className="text-[9px] text-slate-400 font-medium mt-1 uppercase tracking-tighter">
                          {outfit.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button className="w-full mt-12 py-6 rounded-3xl bg-[#fd9a00] text-white font-black text-[11px] tracking-[0.3em] uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-amber-500/20">
                FINALIZED CHARACTER
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MMOCreator;
