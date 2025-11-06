import { Link } from 'react-router-dom';
import {  ArrowRight, CheckCircle2, BookOpen, Users, TrendingUp, Award, Play } from 'lucide-react';

const courses = [
  { number: 1, title: 'Mastering Cashflow & Profitability' },
  { number: 2, title: 'Financial Literacy for Franchise Owners' },
  { number: 3, title: 'Local Marketing That Works' },
  { number: 4, title: 'Sales Systems for Consistent Growth' },
  { number: 5, title: 'Operational Excellence' },
  { number: 6, title: 'Technology & Automation' },
  { number: 7, title: 'Strategic Planning for Franchise Owners' },
  { number: 8, title: 'Data-Driven Decision Making' },
  { number: 9, title: 'Client Retention & Lifetime Value' },
  { number: 10, title: 'Innovation & Growth Beyond Tax Season' },
  { number: 11, title: 'Leadership Skills for Franchise Owners' },
  { number: 12, title: 'Employee Engagement & Retention' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-slate-900 py-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Award className="text-red-600" size={32} />
            <span className="text-white font-bold text-xl">Advancement Academy</span>
          </div>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="text-white hover:text-red-400 font-semibold transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Delivered by Peak Performance Partners
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Advancement Academy
            </h1>
            <p className="text-2xl md:text-3xl mb-8 text-slate-300">
              Empowering Toro Tax Franchise Owners to Scale and Succeed Year-Round
            </p>
            <p className="text-xl text-slate-400 max-w-4xl mx-auto mb-12 leading-relaxed">
              The Advancement Academy equips franchise owners with the tools and strategies to increase profitability,
              streamline operations, and lead high-performing teams. Through twelve power-packed workshops, participants
              master cash flow, sales systems, marketing, technology, and leadership — transforming their tax office into
              a thriving, year-round business.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Who Should Attend
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
              Franchise owners, managers, and key team leaders ready to grow their business, improve profitability,
              and lead with excellence. Whether you're a new franchisee or a seasoned operator, the Advancement Academy
              provides the framework and tools to take your business to the next level.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Program Highlights
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Financial Mastery',
                description: 'Learn to control cash flow, forecast with confidence, and make financially sound decisions that boost your bottom line.',
              },
              {
                icon: Users,
                title: 'Growth Systems',
                description: 'Implement proven sales, marketing, and client retention strategies that drive sustainable client growth and loyalty.',
              },
              {
                icon: Award,
                title: 'Operational Excellence',
                description: 'Streamline processes, leverage technology, and build high-performing teams that deliver consistent results.',
              },
              {
                icon: BookOpen,
                title: 'Strategic Leadership',
                description: 'Develop clarity, focus, and confidence as a business leader through data-driven decision-making and strategic planning.',
              },
              {
                icon: CheckCircle2,
                title: 'Sustainable Success',
                description: 'Expand beyond tax season with innovative services and long-term client relationships that keep your business thriving year-round.',
              },
            ].map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <Icon className="text-red-600 mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{highlight.title}</h3>
                  <p className="text-slate-700 leading-relaxed">{highlight.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              12 Power-Packed Workshops
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
              Through twelve dynamic workshops, participants gain hands-on tools to master financial management,
              streamline operations, strengthen teams, and expand their community presence. Each session provides
              actionable strategies tailored to the realities of running a high-performing tax franchise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.number}
                className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200 hover:border-red-600 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                    {course.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      {course.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-bold text-lg"
            >
              View Detailed Course Descriptions
              <Play size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Program Goals
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              'Transform seasonal income into predictable, year-round profitability',
              'Strengthen financial literacy and decision-making confidence',
              'Create consistent client acquisition and retention systems',
              'Improve team performance, engagement, and accountability',
              'Build leaders who drive growth, culture, and innovation',
            ].map((goal, index) => (
              <div key={index} className="flex items-start gap-4 bg-slate-800 p-6 rounded-xl">
                <CheckCircle2 className="text-red-600 flex-shrink-0 mt-1" size={28} />
                <p className="text-lg text-slate-200">{goal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join the Advancement Academy today and gain access to all 12 workshops, exclusive resources,
            town halls, podcasts, and ongoing support.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-slate-100 px-10 py-5 rounded-full text-lg font-bold shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <Award className="text-red-600" size={36} />
              <span className="text-white font-bold text-xl">Advancement Academy</span>
            </div>
            <p className="text-slate-400 text-center">
              Delivered by Peak Performance Partners<br />
              <a href="https://www.3-peak.com" className="hover:text-red-400 transition-colors">www.3-peak.com</a> |
              <a href="mailto:info@3-peak.com" className="hover:text-red-400 transition-colors ml-2">info@3-peak.com</a>
            </p>
            <div className="text-center text-slate-400 text-sm border-t border-slate-800 pt-8 w-full">
              <p>&copy; 2025 Peak Performance Partners | All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
