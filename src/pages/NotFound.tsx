import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import GridBackground from '../components/animations/GridBackground';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] font-sans text-foreground selection:bg-[#fd9a00]/30 overflow-x-hidden relative">
      <GridBackground lineColor="rgba(253, 154, 0, 0.05)" spacing={60} />
      <Header />

      <main className="flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Animated Glow Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#fd9a00]/20 blur-[100px] rounded-full" />
          
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 mb-8 flex justify-center"
          >
            <img 
              src="/assets/mmo/ismeye's/Idle_Standing/Front.png" 
              alt="Lost Character" 
              className="w-48 h-48 object-contain"
            />
          </motion.div>

          <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#fd9a00] to-[#fd9a00]/20 select-none">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight uppercase">
            Lost in Space?
          </h2>
          <p className="text-lg text-[var(--text-muted)] font-medium mb-12">
            The page you're looking for has drifted off into the digital void. Don't worry, we can get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#fd9a00] text-white rounded-2xl font-black text-sm tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#fd9a00]/20"
            >
              <Home className="w-4 h-4" /> BACK TO HOME
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-sm tracking-widest hover:bg-white/10 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> GO BACK
            </button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
