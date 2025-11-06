import { Calendar, MapPin, Clock } from 'lucide-react';

export default function EventDetails() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Upcoming Event
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-slate-800 p-8 rounded-xl shadow-xl text-center border border-slate-700 hover:border-red-600 transition-colors">
            <Calendar className="text-red-600 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">Date</h3>
            <p className="text-slate-300 text-lg">Next Training Session</p>
            <p className="text-red-400 font-semibold mt-2">TBA</p>
          </div>

          <div className="bg-slate-800 p-8 rounded-xl shadow-xl text-center border border-slate-700 hover:border-red-600 transition-colors">
            <Clock className="text-red-600 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">Time</h3>
            <p className="text-slate-300 text-lg">Full Day Workshop</p>
            <p className="text-red-400 font-semibold mt-2">9:00 AM - 5:00 PM</p>
          </div>

          <div className="bg-slate-800 p-8 rounded-xl shadow-xl text-center border border-slate-700 hover:border-red-600 transition-colors">
            <MapPin className="text-red-600 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">Location</h3>
            <p className="text-slate-300 text-lg">Las Vegas, NV</p>
            <p className="text-red-400 font-semibold mt-2">Details Upon Registration</p>
          </div>
        </div>

        <div className="bg-slate-800 p-8 md:p-12 rounded-2xl shadow-xl border border-slate-700 max-w-3xl mx-auto">
          <p className="text-lg text-slate-300 leading-relaxed text-center">
            Join us for an intensive training session where you'll learn everything you need to know
            about becoming a certified Toro Tax franchise partner. Network with industry professionals,
            gain hands-on experience, and take the first step toward business ownership.
          </p>
        </div>
      </div>
    </section>
  );
}
