import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Gamepad2, Users, Zap, Shield, 
  ArrowRight, Globe, Sword, Star
} from 'lucide-react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import GridBackground from '../../components/animations/GridBackground';

const MMORPGLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#fd9a00]/30 overflow-x-hidden">
      <GridBackground spacing={80} />
      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-48 pb-32 px-6 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fd9a00]/10 border border-[#fd9a00]/30 text-[#fd9a00] text-[10px] font-black tracking-[0.2em] uppercase mb-8"
          >
            <Star className="w-3 h-3 fill-current" /> Next-Gen Web Engine
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
          >
            VIBE<span className="text-[#fd9a00]">MMO</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
          >
            A persistent, real-time multiplayer universe built entirely for the web. 
            Experience zero-latency interaction in a stunning digital realm.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              to="/mmorpg/play"
              className="group relative px-10 py-5 bg-[#fd9a00] text-black font-black text-xs tracking-widest uppercase rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-amber-500/20"
            >
              <span className="relative z-10 flex items-center gap-3">
                Enter World <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black text-xs tracking-widest uppercase rounded-2xl hover:bg-white/10 transition-all">
              Watch Trailer
            </button>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Massive Multiplayer",
                desc: "Hundreds of players in a single shared shard using optimized synchronization."
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Zero Latency",
                desc: "Proprietary networking stack for smooth movement and combat experiences."
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Persistent World",
                desc: "Your actions matter. The world evolves and saves your progress in real-time."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#fd9a00]/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#fd9a00]/10 flex items-center justify-center text-[#fd9a00] mb-8 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-32 bg-[#fd9a00]/5 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Active Players", value: "1.2k+" },
              { label: "World Regions", value: "12" },
              { label: "Server Latency", value: "14ms" },
              { label: "Uptime", value: "99.9%" }
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-[#fd9a00] text-4xl md:text-5xl font-black mb-2 tracking-tighter">{stat.value}</p>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MMORPGLanding;
