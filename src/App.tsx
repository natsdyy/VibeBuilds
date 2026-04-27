import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from './components/ui/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Labs from './pages/Labs';
import AnalyticsDemo from './pages/labs/AnalyticsDemo';
import CRMDemo from './pages/labs/CRMDemo';
import GameLab from './pages/labs/GameLab';
import InventoryDemo from './pages/labs/InventoryDemo';
import EcommerceDemo from './pages/labs/EcommerceDemo';
import BotDemo from './pages/labs/BotDemo';
import AttendanceDemo from './pages/labs/AttendanceDemo';
import MMOCreator from './pages/labs/MMOCreator';
import ProductConfigurator from './pages/labs/ProductConfigurator';
import SmartCheckout from './pages/labs/SmartCheckout';
import MMORPGLanding from './pages/mmorpg/Landing';
import MMORPGPlay from './pages/mmorpg/Play';


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

  const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LdjtMUsAAAAAEUxbXTeXmKgxXTFsx2FRnzvuUT4";

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
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
        <Router>
          <AppContent loading={loading} />
        </Router>
      </DiscoveryProvider>
    </LanguageProvider>
  </GoogleReCaptchaProvider>
);
};

const AppContent: React.FC<{ loading: boolean }> = ({ loading }) => {
const location = useLocation();
const isMMORPG = location.pathname.startsWith('/mmorpg');

return (
  <>
    {!isMMORPG && <SupportOverlay />}
    <AnimatePresence>
      {loading && <Preloader />}
    </AnimatePresence>

    <ScrollToTop />
    <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/labs/analytics" element={<AnalyticsDemo />} />
            <Route path="/labs/crm" element={<CRMDemo />} />
            <Route path="/labs/game" element={<GameLab />} />
            <Route path="/labs/inventory" element={<InventoryDemo />} />
            <Route path="/labs/ecommerce" element={<EcommerceDemo />} />
            <Route path="/labs/bot" element={<BotDemo />} />
            <Route path="/labs/attendance" element={<AttendanceDemo />} />
            <Route path="/labs/mmo-creator" element={<MMOCreator />} />
            <Route path="/labs/configurator" element={<ProductConfigurator />} />
            <Route path="/labs/checkout" element={<SmartCheckout />} />
            <Route path="/mmorpg" element={<MMORPGLanding />} />
            <Route path="/mmorpg/play" element={<MMORPGPlay />} />

          </Routes>
      </>
  );
};

export default App;
