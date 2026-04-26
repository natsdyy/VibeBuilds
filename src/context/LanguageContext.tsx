import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'tl' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'hero.title': 'Custom Systems Built for Your Success',
    'hero.sub': 'Dedicated freelance engineering for your next big idea. We architect robust, scalable systems and high-performance digital solutions tailored exactly to your vision.',
    'hero.getStarted': 'GET STARTED',
    'hero.ourWork': 'OUR WORK',
    'nav.home': 'HOME',
    'nav.about': 'ABOUT',
    'nav.projects': 'PROJECTS',
    'nav.services': 'SERVICES & PRICING',
    'nav.labs': 'DEMOS',
    'nav.contact': 'CONTACT',
    'discovery.title': 'Discovery Phase',
    'discovery.vision': "What's the vision?",
    'support.comingSoon': 'Coming Soon',
    'support.desc': 'Our instant engineering support is being tuned for peak performance.',
    'about.title': 'The Minds Shaping VibeBuilds',
    'about.sub': "We're more than just developers; we're digital architects dedicated to crafting your vision into reality.",
    'projects.title': 'The Portfolio of Innovation',
    'projects.sub': 'A curation of high-performance systems and immersive digital experiences.',
    'services.title': 'Investment in Excellence',
    'services.sub': 'Transparent pricing in PHP for world-class digital engineering. Choose the plan that scales with your ambition.',
    'contact.title': 'Let’s Build the Future',
    'contact.sub': "Ready to start your next big project? We're here to turn your vision into reality.",
    'labs.title': 'VibeDemos',
    'labs.subtitle': 'Our technical playground. High-performance samples of the systems and experiences we build for our partners.',
    'labs.crm.title': 'Lead CRM',
    'labs.crm.desc': 'Custom lead management system tracking Discovery Modal submissions in real-time.',
    'labs.analytics.title': 'Sales Analytics',
    'labs.analytics.desc': 'DSS (Decision Support System) visualizing market trends and lead velocity.',
    'labs.game.title': 'FlappyVibe',
    'labs.game.desc': 'High-performance HTML5 canvas game built for peak browser engagement.',
    'labs.inventory.title': 'Stock Control',
    'labs.inventory.desc': 'Enterprise-grade inventory tracking with smart stock alerts.',
    'labs.ecommerce.title': 'VibeStore',
    'labs.ecommerce.desc': 'Premium e-commerce flow with glassmorphic checkout logic.',
    'labs.mmorpg.title': 'VibeMMO',
    'labs.mmorpg.desc': 'Next-gen real-time MMORPG engine with persistent world and chat synchronization.',
    'labs.bot.title': 'VibeBot AI',
    'labs.bot.desc': 'Automated Telegram-style bot with intelligent command processing and instant replies.',
    'labs.mmo_creator.title': 'MMO Character Creator',
    'labs.mmo_creator.desc': 'Advanced modular avatar system for real-time character customization and layering.',
    'labs.launch': 'Launch Demo',
    'labs.filter.all': 'All Demos',
    'labs.filter.systems': 'Systems',
    'labs.filter.gaming': 'Gaming',
    'labs.filter.ecommerce': 'E-Commerce',
    'labs.configurator.title': '3D Product Configurator',
    'labs.configurator.desc': 'Interactive tool for real-time product customization and dynamic pricing.',
    'labs.checkout.title': 'Smart Checkout',
    'labs.checkout.desc': 'High-speed, single-page checkout flow optimized for maximum conversion.',

  },
  tl: {
    'hero.title': 'Gawang Sistemang Swak sa Tagumpay Mo',
    'hero.sub': 'Freelance engineering para sa iyong mga ideya. Bumubuo kami ng matitibay at mabilis na sistema at digital solutions na saktong-sakto sa iyong pananaw.',
    'hero.getStarted': 'SIMULAN NA',
    'hero.ourWork': 'GAWA NAMIN',
    'nav.home': 'HOME',
    'nav.about': 'TUNGKOL SA AMIN',
    'nav.projects': 'MGA PROYEKTO',
    'nav.services': 'SERBISYO AT PRESYO',
    'nav.labs': 'MGA DEMO',
    'nav.contact': 'KONTAK',
    'discovery.title': 'Phase ng Pagtuklas',
    'discovery.vision': "Ano ang iyong plano?",
    'support.comingSoon': 'Malapit Na',
    'support.desc': 'Ang aming instant support ay kasalukuyang hinahasa para sa pinakamabilis na serbisyo.',
    'about.title': 'Ang mga Isip sa Likod ng VibeBuilds',
    'about.sub': 'Hindi lang kami basta developers; kami ay mga digital architect na handang gawing realidad ang iyong pananaw.',
    'projects.title': 'Ang Portfolio ng Inobasyon',
    'projects.sub': 'Koleksyon ng mga sistemang may mataas na kalidad at digital na karanasan.',
    'services.title': 'Pamumuhunan sa Kahusayan',
    'services.sub': 'Malinaw na presyo para sa world-class engineering. Piliin ang plano na swak sa iyong ambisyon.',
    'contact.title': 'Buuin Natin ang Kinabukasan',
    'contact.sub': 'Handa ka na bang simulan ang iyong proyekto? Nandito kami para tulungan ka.',
    'labs.title': 'VibeDemos',
    'labs.subtitle': 'Ang aming teknikal na palaruan. High-performance samples ng mga sistema at karanasang binuo namin para sa aming mga partner.',
    'labs.crm.title': 'Lead CRM',
    'labs.crm.desc': 'Custom na lead management system na nagbabantay sa Discovery Modal submissions nang real-time.',
    'labs.analytics.title': 'Sales Analytics',
    'labs.analytics.desc': 'DSS (Decision Support System) na nagpapakita ng market trends at bilis ng lead.',
    'labs.game.title': 'FlappyVibe',
    'labs.game.desc': 'High-performance na HTML5 game na binuo para sa pinakamabilis na browser engagement.',
    'labs.inventory.title': 'Kontrol sa Stock',
    'labs.inventory.desc': 'Enterprise-grade na inventory tracking na may smart stock alerts.',
    'labs.ecommerce.title': 'VibeStore',
    'labs.ecommerce.desc': 'Premium na e-commerce flow na may glassmorphic checkout logic.',
    'labs.mmorpg.title': 'VibeMMO',
    'labs.mmorpg.desc': 'Next-gen real-time MMORPG engine na may persistent world at chat synchronization.',
    'labs.bot.title': 'VibeBot AI',
    'labs.bot.desc': 'Automated na Telegram-style bot na may intelligent command processing at mabilis na sagot.',
    'labs.mmo_creator.title': 'MMO Character Creator',
    'labs.mmo_creator.desc': 'Advanced na modular avatar system para sa real-time na character customization at layering.',
    'labs.launch': 'Ilunsad ang Demo',
    'labs.filter.all': 'Lahat ng Demo',
    'labs.filter.systems': 'Mga Sistema',
    'labs.filter.gaming': 'Gaming',
    'labs.filter.ecommerce': 'E-Commerce',
    'labs.configurator.title': '3D Configurator ng Produkto',
    'labs.configurator.desc': 'Interactive na tool para sa real-time na customization at dynamic na presyo.',
    'labs.checkout.title': 'Mabilis na Checkout',
    'labs.checkout.desc': 'High-speed checkout flow na binuo para sa pinakamataas na conversion.',

  },
  es: {
    'hero.title': 'Sistemas a Medida para su Éxito',
    'hero.sub': 'Ingeniería freelance dedicada a su próxima gran idea. Arquitectamos sistemas robustos y soluciones digitales de alto rendimiento.',
    'hero.getStarted': 'EMPEZAR',
    'hero.ourWork': 'NUESTRO TRABAJO',
    'nav.home': 'INICIO',
    'nav.about': 'NOSOTROS',
    'nav.projects': 'PROYECTOS',
    'nav.services': 'SERVICIOS',
    'nav.labs': 'DEMOS',
    'nav.contact': 'CONTACTO',
    'discovery.title': 'Fase de Descubrimiento',
    'discovery.vision': "¿Cuál es la visión?",
    'support.comingSoon': 'Próximamente',
    'support.desc': 'Nuestro soporte instantáneo está siendo optimizado para un rendimiento máximo.',
    'about.title': 'Las Mentes Detrás de VibeBuilds',
    'about.sub': 'Somos más que desarrolladores; somos arquitectos digitales dedicados a hacer realidad su visión.',
    'projects.title': 'El Portafolio de Innovación',
    'projects.sub': 'Una curaduría de sistemas de alto rendimiento y experiencias digitales inmersivas.',
    'services.title': 'Inversión en Excelencia',
    'services.sub': 'Precios transparentes para ingeniería digital de clase mundial. Elija el plan que se adapte a su ambición.',
    'contact.title': 'Construyamos el Futuro',
    'contact.sub': '¿Listo para comenzar su próximo gran proyecto? Estamos aquí para ayudarle.',
    'labs.title': 'VibeDemos',
    'labs.subtitle': 'Nuestro campo de juegos técnico. Muestras de alto rendimiento de los sistemas y experiencias que construimos para nuestros socios.',
    'labs.crm.title': 'CRM de Leads',
    'labs.crm.desc': 'Sistema personalizado de gestión de leads que rastrea las presentaciones del Modal de Descubrimiento en tiempo real.',
    'labs.analytics.title': 'Analítica de Ventas',
    'labs.analytics.desc': 'DSS (Sistema de Soporte de Decisiones) que visualiza las tendencias del mercado y la velocidad de los leads.',
    'labs.game.title': 'FlappyVibe',
    'labs.game.desc': 'Juego HTML5 de alto rendimiento diseñado para el máximo compromiso en el navegador.',
    'labs.inventory.title': 'Control de Stock',
    'labs.inventory.desc': 'Seguimiento de inventario de grado empresarial con alertas inteligentes.',
    'labs.ecommerce.title': 'VibeStore',
    'labs.ecommerce.desc': 'Flujo de comercio electrónico premium con lógica de pago.',
    'labs.mmorpg.title': 'VibeMMO',
    'labs.mmorpg.desc': 'Motor de MMORPG en tiempo real de próxima generación con mundo persistente y sincronización de chat.',
    'labs.bot.title': 'VibeBot AI',
    'labs.bot.desc': 'Bot automatizado estilo Telegram con procesamiento inteligente de comandos y respuestas instantáneas.',
    'labs.mmo_creator.title': 'Creador de Personajes MMO',
    'labs.mmo_creator.desc': 'Sistema avanzado de avatar modular para personalización y capas de personajes en tiempo real.',
    'labs.launch': 'Lanzar Demo',
    'labs.filter.all': 'Todos los Demos',
    'labs.filter.systems': 'Sistemas',
    'labs.filter.gaming': 'Gaming',
    'labs.filter.ecommerce': 'E-Commerce',
    'labs.configurator.title': 'Configurador de Productos 3D',
    'labs.configurator.desc': 'Herramienta interactiva para personalización en tiempo real y precios dinámicos.',
    'labs.checkout.title': 'Pago Inteligente',
    'labs.checkout.desc': 'Flujo de pago de alta velocidad optimizado para la máxima conversión.',

  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
