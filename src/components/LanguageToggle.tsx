import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
      className="flex items-center gap-2 bg-brand-main hover:bg-slate-800 text-white px-3 py-2 rounded-full font-semibold transition-colors shadow-lg"
      aria-label="Toggle language"
    >
      <Globe size={20} />
      <span>{language === 'en' ? 'ES' : 'EN'}</span>
    </button>
  );
}
