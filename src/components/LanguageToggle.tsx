import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
      className="flex items-center gap-2 text-white hover:text-brand-accent font-semibold transition-colors"
      aria-label="Toggle language"
    >
      <Languages size={20} />
      <span className="hidden sm:inline">{language === 'en' ? 'ES' : 'EN'}</span>
    </button>
  );
}
