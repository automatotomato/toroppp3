import { Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "The Toro Tax Training Program gave me the skills and confidence to start my own franchise. Best decision I ever made.",
      name: "Maria Rodriguez",
      title: "Franchise Owner, Las Vegas"
    },
    {
      quote: "Peak 3's comprehensive approach to training prepared me for every aspect of running a successful tax business.",
      name: "James Chen",
      title: "Certified Tax Professional"
    },
    {
      quote: "The mentorship and funding opportunities made it possible for me to achieve my dream of business ownership.",
      name: "Sarah Johnson",
      title: "Entrepreneur & Franchise Partner"
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-main mb-4">
            Success Stories
          </h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <Quote className="text-brand-accent mb-4" size={40} />
              <p className="text-slate-700 text-lg mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-brand-main">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
