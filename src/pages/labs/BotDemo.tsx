import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, ArrowLeft, Shield, MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import GridBackground from '../../components/animations/GridBackground';
import { ChatInterface } from '../../components/chat';

const BotDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] !text-[#0f172a] selection:bg-[#fd9a00]/30 overflow-x-hidden">
      <GridBackground spacing={60} />
      <Header />

      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-800 text-[10px] font-black tracking-widest uppercase mb-4 shadow-sm">
              <Zap className="w-3 h-3" /> Real-time Simulation
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 !text-[#0f172a]">VibeBot <span className="text-[#fd9a00]">AI</span></h1>
            <p className="text-[#334155] font-bold">Experience the speed and logic of our automated systems.</p>
          </div>
          
          <Link 
            to="/labs"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-[#0f172a] font-black text-[10px] tracking-widest uppercase hover:bg-slate-50 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Demos
          </Link>
        </div>

        {/* Chat Interface */}
        <div className="w-full max-w-2xl mx-auto rounded-[48px] bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[700px]">
          <ChatInterface 
            isDemo={true} 
            title="VibeBot AI" 
            initialMessage="Hello! I'm VibeBot. How can I help you architect your vision today?" 
          />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {[
            { icon: <Shield className="w-6 h-6 text-blue-600" />, title: 'Encrypted', desc: 'Secure data processing with end-to-end encryption logic.' },
            { icon: <Zap className="w-6 h-6 text-amber-600" />, title: 'Instant', desc: 'Sub-second response times optimized for peak engagement.' },
            { icon: <MessageSquare className="w-6 h-6 text-emerald-600" />, title: 'Contextual', desc: 'Smart command parsing based on user intent and history.' },
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-[32px] border border-slate-200 bg-white shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black tracking-tight mb-2 text-[#0f172a]">{feature.title}</h3>
              <p className="text-sm font-medium text-[#64748b] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BotDemo;
