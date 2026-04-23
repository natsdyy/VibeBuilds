import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from './components/ui/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Contact from './pages/Contact';

import { DiscoveryProvider } from './context/DiscoveryContext';
import { LanguageProvider } from './context/LanguageContext';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { Toaster } from 'react-hot-toast';
import SupportOverlay from './components/ui/SupportOverlay';
import ScrollToTop from './components/utils/ScrollToTop';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading/initialization time to prevent mobile jank
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LdjtMUsAAAAAEUxbXTeXmKgxXTFsx2FRnzvuUT4">
      <LanguageProvider>
        <DiscoveryProvider>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid rgba(253, 154, 0, 0.2)',
              borderRadius: '16px',
              padding: '16px 24px',
              fontSize: '14px',
              fontWeight: '600',
              backdropFilter: 'blur(10px)',
            },
          }}
        />
        <SupportOverlay />
        <AnimatePresence>
          {loading && <Preloader />}
        </AnimatePresence>

        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
        </DiscoveryProvider>
      </LanguageProvider>
    </GoogleReCaptchaProvider>
  );
};

export default App;
