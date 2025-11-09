import { CheckCircle2 } from 'lucide-react';

export default function About() {
  const highlights = [
    'Learn from industry experts',
    'Get hands-on business training',
    'Prepare to open your own Toro Tax franchise',
    'Access exclusive funding and mentorship opportunities'
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-main mb-4">
            About the Toro Tax Training Program
          </h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              The Toro Tax Training Program, powered by Peak 3 and EmployNV, offers a comprehensive pathway
              to business ownership and professional development in the tax preparation industry.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              Whether you're looking to start your own franchise or advance your career in tax services,
              our program provides the skills, certification, and support you need to succeed.
            </p>

            <div className="space-y-4 pt-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-brand-accent flex-shrink-0 mt-1" size={24} />
                  <span className="text-lg text-slate-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Training program"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-brand-accent text-white p-8 rounded-xl shadow-xl">
              <p className="text-4xl font-bold">100+</p>
              <p className="text-sm font-semibold">Success Stories</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
