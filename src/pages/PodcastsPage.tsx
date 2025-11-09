import { useState, useEffect } from 'react';
import { Play, Globe, ChevronDown } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { supabase } from '../lib/supabase';

interface Video {
  id: string;
  title_en: string;
  title_es: string;
  description_en: string;
  description_es: string;
  youtube_url: string;
  duration_minutes: number;
  order_position: number;
}

export default function PodcastsPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showPlaylist, setShowPlaylist] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('category', 'podcast')
        .order('order_position', { ascending: true });

      if (error) throw error;
      setVideos(data || []);
      if (data && data.length > 0) {
        setSelectedVideo(data[0]);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : '';
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-slate-600">Loading podcasts...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-main mb-2">
              3 Peak Performance Podcasts
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              {language === 'en'
                ? 'Learn from industry experts and grow your business'
                : 'Aprenda de expertos de la industria y haga crecer su negocio'}
            </p>
          </div>
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="flex items-center gap-2 bg-brand-accent hover:bg-red-900 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors flex-shrink-0 text-sm sm:text-base"
          >
            <Globe size={18} className="sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">{language === 'en' ? 'Español' : 'English'}</span>
            <span className="xs:hidden">{language === 'en' ? 'ES' : 'EN'}</span>
          </button>
        </div>
      </div>

      {videos.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <p className="text-slate-600 text-lg">
            {language === 'en'
              ? 'No podcasts available yet. Check back soon!'
              : '¡Todavía no hay podcasts disponibles. Vuelva pronto!'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            {selectedVideo && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${getVideoId(selectedVideo.youtube_url)}`}
                    title={language === 'en' ? selectedVideo.title_en : selectedVideo.title_es}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-brand-main mb-2 sm:mb-3">
                    {language === 'en' ? selectedVideo.title_en : selectedVideo.title_es}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {language === 'en' ? selectedVideo.description_en : selectedVideo.description_es}
                  </p>
                  {selectedVideo.duration_minutes > 0 && (
                    <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-600">
                      {language === 'en' ? 'Duration' : 'Duración'}: {selectedVideo.duration_minutes} {language === 'en' ? 'minutes' : 'minutos'}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="lg:hidden w-full bg-white rounded-xl shadow-lg p-4 flex items-center justify-between text-brand-main font-bold mb-4"
            >
              <span className="text-lg">
                {language === 'en' ? 'All Episodes' : 'Todos los Episodios'} ({videos.length})
              </span>
              <ChevronDown
                size={24}
                className={`transition-transform ${showPlaylist ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 ${showPlaylist ? 'block' : 'hidden lg:block'}`}>
              <h3 className="text-lg sm:text-xl font-bold text-brand-main mb-4 hidden lg:block">
                {language === 'en' ? 'All Episodes' : 'Todos los Episodios'}
              </h3>
              <div className="space-y-2 sm:space-y-3 max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto">
                {videos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => {
                      setSelectedVideo(video);
                      setShowPlaylist(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3 sm:p-4 rounded-lg transition-all active:scale-98 ${
                      selectedVideo?.id === video.id
                        ? 'bg-brand-accent text-white shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-900'
                    }`}
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Play
                        size={18}
                        className={`flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5 ${
                          selectedVideo?.id === video.id ? 'text-white' : 'text-brand-accent'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold mb-1 line-clamp-2 text-sm sm:text-base">
                          {language === 'en' ? video.title_en : video.title_es}
                        </div>
                        {video.duration_minutes > 0 && (
                          <div className={`text-xs sm:text-sm ${
                            selectedVideo?.id === video.id ? 'text-red-100' : 'text-slate-600'
                          }`}>
                            {video.duration_minutes} {language === 'en' ? 'min' : 'min'}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
