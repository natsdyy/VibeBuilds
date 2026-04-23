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
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

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
      <DiscoveryProvider>
        <AnimatePresence>
          {loading && <Preloader />}
        </AnimatePresence>

        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </DiscoveryProvider>
    </GoogleReCaptchaProvider>
  );
};

export default App;
