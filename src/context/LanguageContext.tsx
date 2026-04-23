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
    'discovery.title': 'Discovery Phase',
    'discovery.vision': "What's the vision?",
    'support.comingSoon': 'Coming Soon',
    'support.desc': 'Our instant engineering support is being tuned for peak performance.',
  },
  tl: {
    'hero.title': 'Gawang Sistemang Swak sa Tagumpay Mo',
    'hero.sub': 'Freelance engineering para sa iyong mga ideya. Bumubuo kami ng matitibay at mabilis na sistema at digital solutions na saktong-sakto sa iyong pananaw.',
    'hero.getStarted': 'SIMULAN NA',
    'hero.ourWork': 'GAWA NAMIN',
    'discovery.title': 'Phase ng Pagtuklas',
    'discovery.vision': "Ano ang iyong plano?",
    'support.comingSoon': 'Malapit Na',
    'support.desc': 'Ang aming instant support ay kasalukuyang hinahasa para sa pinakamabilis na serbisyo.',
  },
  es: {
    'hero.title': 'Sistemas a Medida para su Éxito',
    'hero.sub': 'Ingeniería freelance dedicada a su próxima gran idea. Arquitectamos sistemas robustos y soluciones digitales de alto rendimiento.',
    'hero.getStarted': 'EMPEZAR',
    'hero.ourWork': 'NUESTRO TRABAJO',
    'discovery.title': 'Fase de Descubrimiento',
    'discovery.vision': "¿Cuál es la visión?",
    'support.comingSoon': 'Próximamente',
    'support.desc': 'Nuestro soporte instantáneo está siendo optimizado para un rendimiento máximo.',
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
