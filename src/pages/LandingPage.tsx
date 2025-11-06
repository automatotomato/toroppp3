import { Link } from 'react-router-dom';
import {  ArrowRight, CheckCircle2, BookOpen, Users, TrendingUp, Award, Play, DollarSign, Target, Zap, Clock, BarChart3, Star, MessageSquare, Shield } from 'lucide-react';

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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
                ✨ Delivered by Peak Performance Partners
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Advancement Academy
              </h1>
              <p className="text-2xl md:text-3xl mb-6 text-slate-300 font-semibold">
                Transform Your Tax Business Into a Year-Round Success
              </p>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Master cash flow, sales systems, marketing, and leadership through 12 power-packed workshops designed specifically for Toro Tax franchise owners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Free Trial
                  <ArrowRight size={24} />
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-bold border-2 border-white/30 transition-all"
                >
                  View Courses
                  <Play size={20} />
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-400" size={20} />
                  <span>12 Courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-400" size={20} />
                  <span>90+ Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-400" size={20} />
                  <span>Lifetime Access</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <DollarSign className="text-green-400 mb-3" size={40} />
                <div className="text-4xl font-bold mb-2">250%</div>
                <div className="text-slate-300 text-sm">Average Revenue Increase</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <TrendingUp className="text-blue-400 mb-3" size={40} />
                <div className="text-4xl font-bold mb-2">85%</div>
                <div className="text-slate-300 text-sm">Client Retention Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <Users className="text-purple-400 mb-3" size={40} />
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-slate-300 text-sm">Franchise Owners Trained</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <Award className="text-amber-400 mb-3" size={40} />
                <div className="text-4xl font-bold mb-2">4.9/5</div>
                <div className="text-slate-300 text-sm">Satisfaction Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">12</div>
              <div className="text-slate-600 font-semibold">Expert Workshops</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">90+</div>
              <div className="text-slate-600 font-semibold">Training Hours</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">50+</div>
              <div className="text-slate-600 font-semibold">Resources & Tools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-slate-600 font-semibold">Platform Access</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Transform Your Business Results
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See the dramatic impact our program has on franchise performance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
              <div className="text-center mb-6">
                <div className="inline-block bg-red-100 rounded-full p-4 mb-4">
                  <DollarSign className="text-red-600" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Revenue Growth</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-600">Before Academy</span>
                    <span className="font-bold text-slate-900">$180K</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-600">After Academy</span>
                    <span className="font-bold text-red-600">$450K</span>
                  </div>
                  <div className="h-3 bg-red-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">+250%</div>
                    <div className="text-sm text-slate-600">Average Increase</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
              <div className="text-center mb-6">
                <div className="inline-block bg-blue-100 rounded-full p-4 mb-4">
                  <Users className="text-blue-600" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Client Base</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-600">Before Academy</span>
                    <span className="font-bold text-slate-900">850</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-600">After Academy</span>
                    <span className="font-bold text-blue-600">1,800</span>
                  </div>
                  <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">+112%</div>
                    <div className="text-sm text-slate-600">Client Growth</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
              <div className="text-center mb-6">
                <div className="inline-block bg-purple-100 rounded-full p-4 mb-4">
                  <TrendingUp className="text-purple-600" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Profit Margin</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-600">Before Academy</span>
                    <span className="font-bold text-slate-900">18%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-600">After Academy</span>
                    <span className="font-bold text-purple-600">42%</span>
                  </div>
                  <div className="h-3 bg-purple-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">+24pts</div>
                    <div className="text-sm text-slate-600">Margin Improvement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Join 500+ Successful Franchise Owners</h3>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Whether you're a new franchisee or seasoned operator, transform your tax office into a year-round success story
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-slate-100 px-8 py-4 rounded-full text-lg font-bold shadow-2xl transition-all transform hover:scale-105"
            >
              Start Your Transformation
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Your Learning Journey
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Follow our proven path to business transformation
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 transform -translate-y-1/2"></div>

            <div className="grid md:grid-cols-5 gap-8 relative">
              {[
                { icon: Target, title: 'Foundation', desc: 'Weeks 1-2', color: 'red' },
                { icon: TrendingUp, title: 'Growth', desc: 'Weeks 3-5', color: 'orange' },
                { icon: Zap, title: 'Optimization', desc: 'Weeks 6-8', color: 'amber' },
                { icon: Users, title: 'Leadership', desc: 'Weeks 9-10', color: 'purple' },
                { icon: Award, title: 'Mastery', desc: 'Weeks 11-12', color: 'blue' },
              ].map((step, index) => {
                const Icon = step.icon;
                const colorClasses: Record<string, string> = {
                  red: 'bg-red-600',
                  orange: 'bg-orange-600',
                  amber: 'bg-amber-600',
                  purple: 'bg-purple-600',
                  blue: 'bg-blue-600',
                };
                return (
                  <div key={index} className="relative">
                    <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-4 border-white hover:border-slate-200 transition-all">
                      <div className={`${colorClasses[step.color]} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg`}>
                        <Icon size={32} />
                      </div>
                      <div className="bg-slate-900 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-3">
                        Step {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-600">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: BookOpen,
                title: 'Financial Mastery',
                stat: '95%',
                label: 'Improved Cash Flow',
                description: 'Master cash flow, forecasting, and financial literacy to make data-driven decisions.',
              },
              {
                icon: Users,
                title: 'Growth Systems',
                stat: '3.2x',
                label: 'Client Growth',
                description: 'Implement proven marketing, sales, and retention strategies that drive results.',
              },
              {
                icon: Zap,
                title: 'Operational Excellence',
                stat: '60%',
                label: 'Time Saved',
                description: 'Leverage technology, automation, and strategic planning to scale efficiently.',
              },
            ].map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-slate-100"
                >
                  <Icon className="text-red-600 mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{highlight.title}</h3>
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-red-600 mb-1">{highlight.stat}</div>
                    <div className="text-sm text-slate-600 font-semibold">{highlight.label}</div>
                  </div>
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
              Master every aspect of franchise ownership through our comprehensive curriculum
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Financial', count: 2, color: 'bg-blue-100 text-blue-700' },
              { label: 'Operations', count: 3, color: 'bg-purple-100 text-purple-700' },
              { label: 'Growth', count: 4, color: 'bg-green-100 text-green-700' },
              { label: 'Leadership', count: 3, color: 'bg-orange-100 text-orange-700' },
            ].map((category, index) => (
              <div key={index} className={`${category.color} rounded-xl p-4 text-center font-semibold`}>
                {category.count} {category.label} Courses
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.number}
                className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border-2 border-slate-200 hover:border-red-600 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl w-14 h-14 flex items-center justify-center font-bold text-xl flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    {course.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-tight">
                      {course.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>90 min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Play size={14} />
                    <span>Video + Resources</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-600">Progress</span>
                    <span className="text-sm font-bold text-slate-400">0%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all transform hover:scale-105"
            >
              <BookOpen size={24} />
              View Full Course Curriculum
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Success Stories
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real results from franchise owners like you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria Rodriguez',
                role: 'Franchise Owner, Las Vegas',
                rating: 5,
                revenue: '+$285K',
                quote: 'The Advancement Academy gave me the confidence and tools to scale beyond tax season. My business has never been stronger.',
                image: 'M',
                metric: 'Revenue Growth',
              },
              {
                name: 'James Chen',
                role: 'Multi-Location Owner',
                rating: 5,
                revenue: '+420 Clients',
                quote: 'The sales and marketing systems completely transformed how we attract and retain clients. Game changer!',
                image: 'J',
                metric: 'Client Growth',
              },
              {
                name: 'Sarah Johnson',
                role: 'First-Year Franchisee',
                rating: 5,
                revenue: '38% Margin',
                quote: 'As a new owner, this program gave me the foundation I needed. I\'m profitable in my first year thanks to the Academy.',
                image: 'S',
                metric: 'Profit Margin',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-slate-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-amber-400 fill-amber-400" size={20} />
                  ))}
                </div>

                <div className="bg-white rounded-xl p-4 mb-4 border-2 border-red-100">
                  <div className="text-3xl font-bold text-red-600 mb-1">{testimonial.revenue}</div>
                  <div className="text-sm text-slate-600 font-semibold">{testimonial.metric}</div>
                </div>

                <p className="text-slate-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-green-50 border-2 border-green-200 rounded-full px-6 py-3 text-green-800 font-semibold">
              <Shield size={24} className="text-green-600" />
              <span>Trusted by 500+ franchise owners • 4.9/5 rating • 98% would recommend</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Begin your transformation today
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '1',
                icon: Users,
                title: 'Create Your Account',
                description: 'Sign up with your office details. Takes less than 60 seconds.',
                time: '1 min',
              },
              {
                step: '2',
                icon: DollarSign,
                title: 'Choose Your Plan',
                description: 'Select annual membership for full access to all courses and resources.',
                time: '2 min',
              },
              {
                step: '3',
                icon: BookOpen,
                title: 'Start Learning',
                description: 'Immediate access to all 12 workshops and begin your transformation.',
                time: '5 min',
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20 hover:border-red-400 transition-all text-center">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-xl">
                      {step.step}
                    </div>
                    <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
                      <Icon className="text-red-400" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-slate-300 mb-4 leading-relaxed">{step.description}</p>
                    <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
                      <Clock size={16} />
                      <span>{step.time}</span>
                    </div>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-red-400 z-10">
                      <ArrowRight size={32} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl transition-all transform hover:scale-105"
            >
              Start Your Free Trial Now
              <ArrowRight size={28} />
            </Link>
            <p className="text-slate-400 mt-4 text-sm">No credit card required • 7-day money-back guarantee</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 text-red-100 max-w-3xl mx-auto">
              Join the Advancement Academy today and gain access to everything you need to succeed
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30">
              <div className="text-center">
                <div className="inline-block bg-white/20 rounded-full px-4 py-2 text-sm font-bold mb-4">
                  ✨ EVERYTHING INCLUDED
                </div>
                <div className="mb-8">
                  <div className="text-6xl font-bold mb-2">$997</div>
                  <div className="text-red-100 text-lg">Annual Membership</div>
                  <div className="text-red-200 text-sm">Per Office • Unlimited Team Access</div>
                </div>

                <div className="space-y-3 text-left mb-8">
                  {[
                    '12 comprehensive workshop courses',
                    '90+ hours of expert training',
                    '50+ downloadable resources & tools',
                    'Town hall recordings & live Q&A',
                    'Bilingual podcast library',
                    'Weekly tips & best practices',
                    'Private community access',
                    'Lifetime course updates',
                    '24/7 platform access',
                    'Certificate of completion',
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="text-green-400 flex-shrink-0" size={20} />
                      <span className="text-white">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/30 mb-6">
                <BarChart3 className="text-green-400 mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-2">Average ROI</h3>
                <div className="text-5xl font-bold text-green-400 mb-2">450%</div>
                <p className="text-red-100">Members see average returns of $4,485 for every $997 invested</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/30 mb-6">
                <MessageSquare className="text-blue-400 mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-2">98% Recommend</h3>
                <p className="text-red-100">Our members consistently recommend the program to other franchise owners</p>
              </div>

              <Link
                to="/register"
                className="w-full bg-white text-red-600 hover:bg-slate-100 px-10 py-5 rounded-full text-xl font-bold shadow-2xl transition-all transform hover:scale-105 text-center inline-flex items-center justify-center gap-2"
              >
                Enroll Now
                <ArrowRight size={28} />
              </Link>
              <p className="text-red-100 text-center mt-4 text-sm">
                ⚡ Limited Time: 7-Day Money-Back Guarantee
              </p>
            </div>
          </div>
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
