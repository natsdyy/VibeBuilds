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
