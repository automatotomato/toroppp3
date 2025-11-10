import DashboardLayout from '../components/DashboardLayout';
import { Radio, Play, Pause, Clock, TrendingUp, Headphones, Globe } from 'lucide-react';
import { useState } from 'react';

export default function DashboardPodcastsPage() {
  const [playingId, setPlayingId] = useState<number | null>(null);

  const podcasts = [
    {
      id: 1,
      title: 'Building a Million-Dollar Tax Practice',
      description: 'Learn the secrets of scaling your tax business from successful multi-location franchise owners.',
      duration: '45:32',
      date: 'Nov 8, 2025',
      plays: 1245,
      language: 'English',
      category: 'Growth',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
      featured: true
    },
    {
      id: 2,
      title: 'Marketing en Redes Sociales',
      description: 'Estrategias efectivas para promocionar tu negocio de impuestos en plataformas sociales.',
      duration: '38:15',
      date: 'Nov 5, 2025',
      plays: 892,
      language: 'Spanish',
      category: 'Marketing',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300',
      featured: false
    },
    {
      id: 3,
      title: 'Financial Management Fundamentals',
      description: 'Master cash flow, budgeting, and financial planning for sustainable business growth.',
      duration: '52:48',
      date: 'Nov 1, 2025',
      plays: 1567,
      language: 'English',
      category: 'Finance',
      thumbnail: 'https://images.pexels.com/photos/6772076/pexels-photo-6772076.jpeg?auto=compress&cs=tinysrgb&w=300',
      featured: false
    },
    {
      id: 4,
      title: 'Liderazgo y Gestión de Equipos',
      description: 'Desarrolla habilidades de liderazgo para construir equipos de alto rendimiento.',
      duration: '41:20',
      date: 'Oct 28, 2025',
      plays: 743,
      language: 'Spanish',
      category: 'Leadership',
      thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300',
      featured: false
    },
    {
      id: 5,
      title: 'Client Retention Strategies',
      description: 'Turn one-time clients into lifelong customers with proven retention techniques.',
      duration: '36:55',
      date: 'Oct 25, 2025',
      plays: 1123,
      language: 'English',
      category: 'Growth',
      thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300',
      featured: false
    },
    {
      id: 6,
      title: 'Automatización y Tecnología',
      description: 'Herramientas y sistemas para automatizar tu práctica fiscal y aumentar eficiencia.',
      duration: '44:12',
      date: 'Oct 21, 2025',
      plays: 654,
      language: 'Spanish',
      category: 'Technology',
      thumbnail: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=300',
      featured: false
    },
    {
      id: 7,
      title: 'Advanced Sales Techniques',
      description: 'Elevate your sales game with advanced closing techniques and objection handling.',
      duration: '49:30',
      date: 'Oct 18, 2025',
      plays: 998,
      language: 'English',
      category: 'Sales',
      thumbnail: 'https://images.pexels.com/photos/7876050/pexels-photo-7876050.jpeg?auto=compress&cs=tinysrgb&w=300',
      featured: false
    },
    {
      id: 8,
      title: 'Estrategias de Retención de Clientes',
      description: 'Crea relaciones duraderas y sistemas que mantengan a los clientes regresando.',
      duration: '40:25',
      date: 'Oct 14, 2025',
      plays: 812,
      language: 'Spanish',
      category: 'Growth',
      thumbnail: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=300',
      featured: false
    },
  ];

  const categoryColors = {
    Growth: 'bg-green-100 text-green-700',
    Marketing: 'bg-blue-100 text-blue-700',
    Finance: 'bg-purple-100 text-purple-700',
    Leadership: 'bg-orange-100 text-orange-700',
    Technology: 'bg-cyan-100 text-cyan-700',
    Sales: 'bg-red-100 text-red-700'
  };

  const featured = podcasts.find(p => p.featured);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-main mb-2">Podcasts</h1>
        <p className="text-slate-600">
          Expert insights and strategies available in English and Spanish
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-brand-accent to-red-900 rounded-xl p-6 text-white">
          <Radio size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">48</h3>
          <p className="text-red-100">Episodes Available</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <Headphones size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">12.5K</h3>
          <p className="text-blue-100">Total Plays</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
          <Globe size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">2</h3>
          <p className="text-green-100">Languages</p>
        </div>
      </div>

      {featured && (
        <div className="bg-gradient-to-br from-brand-main to-slate-800 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-brand-accent" />
            <span className="text-brand-accent font-bold text-sm">FEATURED EPISODE</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1">
              <img
                src={featured.thumbnail}
                alt={featured.title}
                className="w-full rounded-xl shadow-2xl"
              />
            </div>
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-3">{featured.title}</h2>
              <p className="text-slate-300 mb-6">{featured.description}</p>
              <div className="flex items-center gap-6 text-sm mb-6">
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {featured.duration}
                </span>
                <span className="flex items-center gap-2">
                  <Headphones size={16} />
                  {featured.plays.toLocaleString()} plays
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[featured.category as keyof typeof categoryColors]}`}>
                  {featured.category}
                </span>
              </div>
              <button
                onClick={() => setPlayingId(playingId === featured.id ? null : featured.id)}
                className="flex items-center gap-3 bg-brand-accent hover:bg-red-900 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105"
              >
                {playingId === featured.id ? (
                  <>
                    <Pause size={24} />
                    Pause
                  </>
                ) : (
                  <>
                    <Play size={24} />
                    Play Now
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-brand-main">All Episodes</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border-2 border-brand-main text-brand-main rounded-lg font-semibold hover:bg-brand-main hover:text-white transition-colors">
            All
          </button>
          <button className="px-4 py-2 bg-white border-2 border-slate-200 text-slate-600 rounded-lg font-semibold hover:border-brand-main hover:text-brand-main transition-colors">
            English
          </button>
          <button className="px-4 py-2 bg-white border-2 border-slate-200 text-slate-600 rounded-lg font-semibold hover:border-brand-main hover:text-brand-main transition-colors">
            Español
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="flex gap-6 items-center">
              <div className="relative flex-shrink-0">
                <img
                  src={podcast.thumbnail}
                  alt={podcast.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <button
                  onClick={() => setPlayingId(playingId === podcast.id ? null : podcast.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 rounded-lg transition-all"
                >
                  {playingId === podcast.id ? (
                    <Pause className="text-white" size={32} />
                  ) : (
                    <Play className="text-white" size={32} />
                  )}
                </button>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-brand-main mb-1">{podcast.title}</h3>
                    <p className="text-slate-600 text-sm">{podcast.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[podcast.category as keyof typeof categoryColors]}`}>
                    {podcast.category}
                  </span>
                </div>

                <div className="flex items-center gap-6 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {podcast.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Headphones size={14} />
                    {podcast.plays.toLocaleString()} plays
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe size={14} />
                    {podcast.language}
                  </span>
                  <span className="text-slate-400">{podcast.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
