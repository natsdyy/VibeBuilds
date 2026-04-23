import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Users, Sun, Moon, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

import { useDiscovery } from '../../context/DiscoveryContext';
import { useLanguage } from '../../context/LanguageContext';

const Header: React.FC = () => {
  const { openDiscovery } = useDiscovery();
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'SERVICES & PRICING', path: '/services' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'px-6 py-4' : 'px-0 py-0'}`}>
      <motion.div 
        animate={{
          maxWidth: isScrolled ? '1280px' : '100%',
          borderRadius: isScrolled ? '1rem' : '0rem',
          paddingLeft: isScrolled ? '1.5rem' : '2.5rem',
          paddingRight: isScrolled ? '1.5rem' : '2.5rem',
          paddingTop: isScrolled ? '0.75rem' : '1.25rem',
          paddingBottom: isScrolled ? '0.75rem' : '1.25rem',
          backgroundColor: isScrolled ? 'var(--card-bg)' : 'transparent',
          borderColor: isScrolled ? 'var(--border)' : 'transparent',
          boxShadow: isScrolled ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : 'none',
        }}
        transition={{ type: 'tween', duration: 0.8, ease: 'easeInOut' }}
        className="mx-auto flex items-center justify-between backdrop-blur-xl border transition-colors duration-300"
      >
        {/* Left Side: Logo & Navigation */}
        <div className="flex items-center gap-10">
          <Link to="/">
            <Logo className="h-8" />
          </Link>
          <span className="hidden lg:block text-foreground/20 font-light text-xl">/</span>
          <nav className="hidden lg:flex items-center gap-8 text-[12px] font-bold tracking-widest">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`transition-colors cursor-pointer ${
                  location.pathname === link.path 
                ? 'text-[#fd9a00]' 
                : 'text-[var(--text-muted)] hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Theme Toggle - Now visible on mobile too */}
          <button 
            onClick={toggleTheme}
            className="flex p-2 rounded-xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-all text-foreground/80 items-center justify-center w-10 h-10 md:w-11 md:h-11 overflow-hidden relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'light' ? <Moon className="w-5 h-5 md:w-6 md:h-6" /> : <Sun className="w-5 h-5 md:w-6 md:h-6" />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex p-2 rounded-xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-all text-foreground/80 items-center justify-center w-10 h-10 md:w-11 md:h-11 overflow-hidden"
            >
              <Globe className="w-5 h-5 opacity-60" />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full mt-3 right-0 w-32 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] backdrop-blur-2xl shadow-2xl overflow-hidden p-1.5"
                >
                  {[
                    { id: 'en', label: 'English' },
                    { id: 'tl', label: 'Tagalog' },
                    { id: 'es', label: 'Español' },
                  ].map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => {
                        setLanguage(lang.id as any);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${
                        language === lang.id 
                        ? 'bg-[#fd9a00] text-white' 
                        : 'hover:bg-foreground/5 text-[var(--text-muted)]'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:block">
            <motion.button 
              onClick={openDiscovery}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(253, 154, 0, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-xl bg-foreground text-background text-[11px] font-bold tracking-widest shadow-lg"
            >
              GET STARTED
            </motion.button>
          </div>

          {/* Mobile Burger Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-xl bg-foreground/5 text-foreground flex items-center justify-center w-11 h-11 relative z-[60]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMenuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[51] lg:hidden"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[var(--background)]/80 backdrop-blur-2xl border-l border-[var(--border)] z-[65] lg:hidden p-10 flex flex-col justify-between shadow-[-20px_0_50px_rgba(0,0,0,0.3)]"
            >
              {/* Internal Close Button */}
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-8 p-3 rounded-xl bg-foreground/5 text-foreground hover:bg-foreground/10 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="pt-24 space-y-12">
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      transition={{ 
                        delay: 0.2 + i * 0.1, 
                        type: 'spring', 
                        damping: 20, 
                        stiffness: 100 
                      }}
                    >
                      <Link 
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-3xl font-black tracking-[0.2em] uppercase transition-all duration-300 hover:tracking-[0.3em] ${
                          location.pathname === link.path ? 'text-[#fd9a00]' : 'text-[var(--text-muted)] hover:text-foreground'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    openDiscovery();
                  }}
                  className="w-full py-6 rounded-2xl bg-[#fd9a00] text-white font-black text-xs tracking-[0.2em] uppercase shadow-2xl shadow-[#fd9a00]/30"
                >
                  GET STARTED
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};


export default Header;
