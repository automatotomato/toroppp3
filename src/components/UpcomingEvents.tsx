import { useEffect, useState } from 'react';
import { Calendar, Clock, Video } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Event {
  id: string;
  title: string;
  event_date: string;
  event_time: string;
  event_type: string;
  is_live: boolean;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', now)
        .order('event_date', { ascending: true })
        .limit(5);

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
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
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-brand-main mb-3 md:mb-4 flex items-center gap-2">
          <Video size={20} className="text-blue-600" />
          Upcoming Events
        </h2>
        <div className="text-slate-600">Loading events...</div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-brand-main mb-3 md:mb-4 flex items-center gap-2">
          <Video size={20} className="text-blue-600" />
          Upcoming Events
        </h2>
        <div className="text-slate-600 text-sm">No upcoming events scheduled.</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-brand-main mb-3 md:mb-4 flex items-center gap-2">
        <Video size={20} className="text-blue-600" />
        Upcoming Events
      </h2>
      <div className="space-y-3 md:space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className={`border-l-4 rounded-r-lg p-3 md:p-4 ${
              event.event_type === 'townhall'
                ? 'border-blue-600 bg-blue-50'
                : 'border-green-600 bg-green-50'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-sm md:text-base text-brand-main">{event.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold flex-shrink-0 ${
                event.event_type === 'townhall'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {event.event_type === 'townhall' ? 'Town Hall' : 'Course'}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs md:text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {formatEventDate(event.event_date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {event.event_time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
