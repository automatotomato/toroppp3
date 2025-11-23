import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Video, Calendar, Clock, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface TownHall {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  is_live: boolean;
  thumbnail: string;
}

export default function DashboardTownHallsPage() {
  const [townHalls, setTownHalls] = useState<TownHall[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTownHalls();
  }, []);

  const fetchTownHalls = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('event_type', 'townhall')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setTownHalls(data || []);
    } catch (error) {
      console.error('Error fetching town halls:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatEventDate = (eventDate: string) => {
    return new Date(eventDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-600">Loading town halls...</div>
        </div>
      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-main mb-2">Town Hall Recordings</h1>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold text-brand-main mb-3">Your Access is Almost Ready!</h2>
          <p className="text-slate-700 leading-relaxed">
            The Town Hall recording will be available here after the live broadcast. Revisit the energy, announcements, and momentum as we continue to Achieve Success Faster together.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <Video size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">{townHalls.length}</h3>
          <p className="text-blue-100">Total Town Halls</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
          <Clock size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">{townHalls.filter(th => th.is_live).length}</h3>
          <p className="text-green-100">Available Now</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {townHalls.map((townHall) => (
          <div
            key={townHall.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={townHall.thumbnail}
                alt={townHall.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              {!townHall.is_live && (
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="bg-white/90 p-4 rounded-full">
                    <Lock className="text-slate-700" size={48} />
                  </div>
                </div>
              )}
              {!townHall.is_live && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-slate-100 text-slate-700 border-slate-300">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-brand-main mb-2">
                {townHall.title}
              </h3>
              {townHall.description && (
                <p className="text-slate-600 text-sm mb-4">{townHall.description}</p>
              )}

              {!townHall.is_live && (
                <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <Calendar size={14} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-700 mb-1">Will be available after:</div>
                      <div>{formatEventDate(townHall.event_date)} at {townHall.event_time}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-slate-500 border-t border-slate-100 pt-4">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {formatEventDate(townHall.event_date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {townHall.event_time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {townHalls.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-xl">
          <Video size={48} className="mx-auto mb-4 text-slate-400" />
          <p className="text-slate-600">No town halls scheduled yet. Check back soon!</p>
        </div>
      )}
    </DashboardLayout>
  );
}
