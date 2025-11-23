import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Radio, Play, Headphones, Globe, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Podcast {
  id: string;
  title: string;
  description: string;
  audio_url_english: string;
  audio_url_spanish: string;
  published_at: string;
}

export default function DashboardPodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [languageFilter, setLanguageFilter] = useState<'all' | 'english' | 'spanish'>('all');

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPodcasts(data || []);
    } catch (error) {
      console.error('Error fetching podcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPodcasts = podcasts.filter(podcast => {
    if (languageFilter === 'english') return podcast.audio_url_english;
    if (languageFilter === 'spanish') return podcast.audio_url_spanish;
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-600">Loading podcasts...</div>
        </div>
      </DashboardLayout>
    );
  }


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
          <h3 className="text-2xl font-bold mb-2">{podcasts.length}</h3>
          <p className="text-red-100">Episodes Available</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <Headphones size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">{podcasts.filter(p => p.audio_url_english).length}</h3>
          <p className="text-blue-100">English Episodes</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
          <Globe size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">{podcasts.filter(p => p.audio_url_spanish).length}</h3>
          <p className="text-green-100">Spanish Coming Soon</p>
        </div>
      </div>


      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-brand-main">All Episodes</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguageFilter('all')}
            className={`px-4 py-2 border-2 rounded-lg font-semibold transition-colors ${
              languageFilter === 'all'
                ? 'bg-brand-main border-brand-main text-white'
                : 'bg-white border-slate-200 text-slate-600 hover:border-brand-main hover:text-brand-main'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setLanguageFilter('english')}
            className={`px-4 py-2 border-2 rounded-lg font-semibold transition-colors ${
              languageFilter === 'english'
                ? 'bg-brand-main border-brand-main text-white'
                : 'bg-white border-slate-200 text-slate-600 hover:border-brand-main hover:text-brand-main'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguageFilter('spanish')}
            className={`px-4 py-2 border-2 rounded-lg font-semibold transition-colors ${
              languageFilter === 'spanish'
                ? 'bg-brand-main border-brand-main text-white'
                : 'bg-white border-slate-200 text-slate-600 hover:border-brand-main hover:text-brand-main'
            }`}
          >
            Español
          </button>
        </div>
      </div>

      {filteredPodcasts.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-xl">
          <Radio size={48} className="mx-auto mb-4 text-slate-400" />
          <p className="text-slate-600">No podcasts available for this filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPodcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-brand-main mb-2">{podcast.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{podcast.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                    <span className="text-slate-400">{formatDate(podcast.published_at)}</span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {podcast.audio_url_english && (
                      <a
                        href={podcast.audio_url_english}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-brand-main hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        <Play size={16} />
                        Watch in English
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {podcast.audio_url_spanish && (
                      <a
                        href={podcast.audio_url_spanish}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        <Play size={16} />
                        Ver en Español
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {!podcast.audio_url_spanish && (
                      <span className="flex items-center gap-2 bg-slate-100 text-slate-500 px-4 py-2 rounded-lg text-sm">
                        <Globe size={14} />
                        Spanish version coming soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
