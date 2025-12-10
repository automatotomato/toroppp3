import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Lightbulb, TrendingUp, Calendar, Bookmark, Share2, ThumbsUp, RefreshCw, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  key_points: string[];
  gradient: string;
  likes_count: number;
  week_start_date: string;
  published_at: string;
}

export default function DashboardTipsPage() {
  const { user } = useAuth();
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      const { data, error } = await supabase
        .from('tips_of_week')
        .select('*')
        .eq('is_active', true)
        .order('published_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTips(data || []);
    } catch (error) {
      console.error('Error fetching tips:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateNewTip = async () => {
    if (!user) {
      alert('You must be logged in to generate tips');
      return;
    }

    setGenerating(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      if (!token) {
        alert('No authentication token found. Please log in again.');
        setGenerating(false);
        return;
      }

      console.log('Calling edge function...');
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-weekly-tip`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ count: 1 })
        }
      );

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);

      if (result.success) {
        await fetchTips();
        alert('New tip generated successfully!');
      } else {
        alert(`Failed to generate tip: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error generating tip:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    } finally {
      setGenerating(false);
    }
  };

  const categoryColors = {
    Revenue: 'bg-green-100 text-green-700 border-green-300',
    Growth: 'bg-blue-100 text-blue-700 border-blue-300',
    Finance: 'bg-purple-100 text-purple-700 border-purple-300',
    Marketing: 'bg-orange-100 text-orange-700 border-orange-300',
    Operations: 'bg-cyan-100 text-cyan-700 border-cyan-300',
    Technology: 'bg-indigo-100 text-indigo-700 border-indigo-300'
  };

  const formatWeekDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-600">Loading tips...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-brand-main mb-2">Tips of the Week</h1>
            <p className="text-slate-600">
              Weekly insights and best practices to elevate your franchise performance
            </p>
          </div>
          <button
            onClick={generateNewTip}
            disabled={generating}
            className="flex items-center gap-2 bg-gradient-to-r from-brand-accent to-red-900 hover:from-red-900 hover:to-brand-accent text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate New Tip
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-white">
          <Lightbulb size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">{tips.length}</h3>
          <p className="text-orange-100">Tips Available</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <TrendingUp size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">{tips.reduce((sum, tip) => sum + tip.likes_count, 0)}</h3>
          <p className="text-blue-100">Total Likes</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
          <Sparkles size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">AI</h3>
          <p className="text-green-100">Generated Tips</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <Calendar size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">Weekly</h3>
          <p className="text-purple-100">Auto Updates</p>
        </div>
      </div>

      {tips.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Lightbulb size={64} className="mx-auto mb-4 text-amber-500" />
          <h3 className="text-2xl font-bold text-brand-main mb-3">No Tips Available Yet</h3>
          <p className="text-slate-600 mb-6">Click the "Generate New Tip" button above to create your first AI-powered tip!</p>
          <button
            onClick={generateNewTip}
            disabled={generating}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-accent to-red-900 hover:from-red-900 hover:to-brand-accent text-white px-8 py-4 rounded-lg font-semibold shadow-lg transition-all disabled:opacity-50"
          >
            {generating ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Your First Tip
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
            >
              <div className={`h-2 bg-gradient-to-r ${tip.gradient}`} />
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="text-slate-400" size={18} />
                      <span className="text-sm text-slate-500 font-medium">Week of {formatWeekDate(tip.week_start_date)}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[tip.category as keyof typeof categoryColors]}`}>
                        {tip.category}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-300">
                        AI Generated
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-brand-main mb-3">{tip.title}</h3>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">{tip.content}</p>
                  </div>
                  <button className="p-2 rounded-lg transition-all bg-slate-100 text-slate-400 hover:bg-slate-200">
                    <Bookmark size={20} />
                  </button>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-brand-main mb-4 flex items-center gap-2">
                    <Lightbulb size={18} className="text-amber-500" />
                    Key Action Items
                  </h4>
                  <ul className="space-y-3">
                    {tip.key_points.map((point, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-700">
                        <div className="bg-brand-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-slate-600 hover:text-brand-accent transition-colors font-semibold">
                      <ThumbsUp size={20} />
                      <span>{tip.likes_count}</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-600 hover:text-brand-accent transition-colors font-semibold">
                      <Share2 size={20} />
                      <span>Share</span>
                    </button>
                  </div>
                  <button className="bg-brand-main hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    Implement This
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-gradient-to-r from-brand-accent to-red-900 rounded-2xl p-8 text-white text-center">
        <Lightbulb size={48} className="mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3">Get Weekly Tips Delivered</h2>
        <p className="text-red-100 mb-6 max-w-2xl mx-auto">
          Never miss a tip! New insights are published every Monday to help you stay ahead.
        </p>
        <button className="bg-white text-brand-accent px-8 py-3 rounded-full font-bold hover:bg-red-50 transition-colors">
          Enable Email Notifications
        </button>
      </div>
    </DashboardLayout>
  );
}
