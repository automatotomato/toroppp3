import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'nav.login': 'Login',
    'nav.getStarted': 'Get Started',
    'hero.title': 'Advancement Academy',
    'hero.subtitle': 'Transform Your Tax Business Into a Year-Round Success',
    'hero.description': 'Master cash flow, sales systems, marketing, and leadership through 12 power-packed workshops designed specifically for Toro Tax franchise owners.',
    'cta.viewOffer': 'View Special Offer',
    'cta.viewCourses': 'View Courses',
    'cta.getStarted': 'Get Started Today',
    'cta.claimOffer': 'Claim This Offer Now',
    'stats.courses': 'Courses',
    'stats.hours': 'Hours',
    'stats.lifetimeAccess': 'Lifetime Access',
    'offer.exclusive': 'TOROCON EXCLUSIVE OFFER',
    'offer.title': 'Get Elite Access for Only $129/month',
    'offer.description': 'Pay $299 registration + $129/month and get the full $499/month Elite Package',
    'offer.totalValue': 'TOTAL VALUE',
    'offer.includes': 'Includes $9,995 Business Analysis + LIFETIME ACCESS',
    'value.save': 'YOU SAVE $370 EVERY MONTH!',
  },
  es: {
    'nav.login': 'Iniciar Sesión',
    'nav.getStarted': 'Comenzar',
    'hero.title': 'Academia de Avance',
    'hero.subtitle': 'Transforme Su Negocio de Impuestos en un Éxito Durante Todo el Año',
    'hero.description': 'Domine el flujo de efectivo, sistemas de ventas, marketing y liderazgo a través de 12 talleres diseñados específicamente para propietarios de franquicias Toro Tax.',
    'cta.viewOffer': 'Ver Oferta Especial',
    'cta.viewCourses': 'Ver Cursos',
    'cta.getStarted': 'Comenzar Hoy',
    'cta.claimOffer': 'Reclamar Esta Oferta Ahora',
    'stats.courses': 'Cursos',
    'stats.hours': 'Horas',
    'stats.lifetimeAccess': 'Acceso de por Vida',
    'offer.exclusive': 'OFERTA EXCLUSIVA DE TOROCON',
    'offer.title': 'Obtenga Acceso Elite por Solo $129/mes',
    'offer.description': 'Pague $299 de registro + $129/mes y obtenga el Paquete Elite completo de $499/mes',
    'offer.totalValue': 'VALOR TOTAL',
    'offer.includes': 'Incluye Análisis de Negocio de $9,995 + ACCESO DE POR VIDA',
    'value.save': '¡AHORRE $370 CADA MES!',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
