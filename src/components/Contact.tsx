import { Phone, Globe, Linkedin, Facebook } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Questions? Get in Touch
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-900 rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Ricky Navar</h3>
              <p className="text-red-400 font-semibold">Co-Founder / President</p>
            </div>

            <div className="space-y-4 mb-8">
              <a
                href="tel:9154901889"
                className="flex items-center justify-center gap-3 text-slate-300 hover:text-red-400 transition-colors text-lg"
              >
                <Phone size={24} />
                <span>(915) 490-1889</span>
              </a>
              <a
                href="tel:8337269675"
                className="flex items-center justify-center gap-3 text-slate-300 hover:text-red-400 transition-colors text-lg"
              >
                <Phone size={24} />
                <span>(833) 726-9675</span>
              </a>
              <a
                href="https://www.3-peak.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 text-slate-300 hover:text-red-400 transition-colors text-lg"
              >
                <Globe size={24} />
                <span>www.3-peak.com</span>
              </a>
            </div>

            <div className="flex justify-center gap-6 pt-6 border-t border-slate-700">
              <a
                href="#"
                className="w-12 h-12 bg-slate-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="text-white" size={24} />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-slate-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="text-white" size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
