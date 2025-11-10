import DashboardLayout from '../components/DashboardLayout';
import { HelpCircle, ChevronDown, Search, MessageSquare, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

export default function DashboardFAQPage() {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      id: 1,
      category: 'Getting Started',
      question: 'How do I access course materials?',
      answer: 'All course materials are available in the Courses section of your dashboard. Simply click on any course to view video lessons, downloadable resources, and assignments. You can access content 24/7 from any device.'
    },
    {
      id: 2,
      category: 'Getting Started',
      question: 'Can I download resources for offline use?',
      answer: 'Yes! All PDFs, templates, and documents in the Resources section can be downloaded for offline use. Video content requires an internet connection for streaming, but you can bookmark and revisit them anytime.'
    },
    {
      id: 3,
      category: 'Billing & Payments',
      question: 'How does billing work for my subscription?',
      answer: 'Your subscription is billed monthly or annually depending on your plan selection. You\'ll receive an invoice via email before each billing cycle. Payment is processed automatically using your saved payment method.'
    },
    {
      id: 4,
      category: 'Billing & Payments',
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Absolutely! You can change your plan at any time from your account settings. Upgrades take effect immediately, while downgrades apply at the start of your next billing cycle. Contact support if you need assistance.'
    },
    {
      id: 5,
      category: 'Billing & Payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover) and ACH bank transfers for annual subscriptions. All payments are processed securely through our payment partner.'
    },
    {
      id: 6,
      category: 'Course Content',
      question: 'How long do I have access to the courses?',
      answer: 'You have unlimited access to all courses for as long as your subscription is active. There are no time limits on course completion. You can learn at your own pace and revisit content as often as needed.'
    },
    {
      id: 7,
      category: 'Course Content',
      question: 'Are new courses added regularly?',
      answer: 'Yes! We continuously update our curriculum with new courses, workshops, and content based on industry trends and member feedback. Premium members get early access to all new releases.'
    },
    {
      id: 8,
      category: 'Course Content',
      question: 'Can I get a certificate of completion?',
      answer: 'Yes, you\'ll receive a digital certificate upon completing each course. Certificates can be downloaded, shared on LinkedIn, or printed for your office. They demonstrate your commitment to professional development.'
    },
    {
      id: 9,
      category: 'Technical Support',
      question: 'I\'m having trouble accessing content. What should I do?',
      answer: 'First, try clearing your browser cache and cookies. If the issue persists, check your internet connection. Still having problems? Contact our support team via the chat widget or email support@peak3.com.'
    },
    {
      id: 10,
      category: 'Technical Support',
      question: 'What browsers are supported?',
      answer: 'Our platform works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience and security.'
    },
    {
      id: 11,
      category: 'Technical Support',
      question: 'Can I access the platform on mobile devices?',
      answer: 'Yes! Our platform is fully responsive and works on smartphones and tablets. You can watch videos, download resources, and track progress from any device with an internet connection.'
    },
    {
      id: 12,
      category: 'Community & Events',
      question: 'How do I join town hall sessions?',
      answer: 'Town hall sessions are held monthly. You\'ll receive an email invitation with the Zoom link 48 hours before each session. Can\'t make it live? All sessions are recorded and available in the Town Halls section.'
    },
    {
      id: 13,
      category: 'Community & Events',
      question: 'Is there a community forum or group?',
      answer: 'Yes! Premium members have access to our private Facebook group and Slack community where you can connect with fellow franchise owners, share experiences, and get peer support.'
    },
    {
      id: 14,
      category: 'Community & Events',
      question: 'Can I suggest topics for future content?',
      answer: 'We love member input! You can submit content suggestions through the feedback form in your dashboard or during town hall sessions. We regularly review suggestions and incorporate popular requests into our curriculum.'
    },
    {
      id: 15,
      category: 'Account Management',
      question: 'How do I update my profile information?',
      answer: 'Navigate to Account Settings from the dropdown menu in the top right corner. There you can update your name, email, password, office information, and notification preferences.'
    },
    {
      id: 16,
      category: 'Account Management',
      question: 'Can I cancel my subscription at any time?',
      answer: 'Yes, you can cancel anytime from your account settings. Your access will continue until the end of your current billing period. We\'re sorry to see you go, but there are no cancellation fees or penalties.'
    },
  ];

  const categories = [...new Set(faqs.map(faq => faq.category))];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-main mb-2">FAQ & Support</h1>
        <p className="text-slate-600">
          Find answers to frequently asked questions or contact our support team
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <HelpCircle size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">How can we help you today?</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h3 className="font-bold text-brand-main mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className="w-full text-left px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="font-bold text-brand-main mb-4">Still Need Help?</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <MessageSquare size={20} />
                  <span className="font-semibold">Live Chat</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
                  <Mail size={20} />
                  <span className="font-semibold">Email Us</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
                  <Phone size={20} />
                  <span className="font-semibold">Call Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <HelpCircle className="mx-auto mb-4 text-slate-300" size={64} />
                <h3 className="text-xl font-bold text-slate-600 mb-2">No results found</h3>
                <p className="text-slate-500">Try adjusting your search or browse by category</p>
              </div>
            ) : (
              filteredFaqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    className="w-full p-6 flex items-start gap-4 text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 flex-shrink-0">
                      <HelpCircle size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-blue-600 mb-2">{faq.category}</div>
                      <h3 className="text-lg font-bold text-brand-main mb-1">{faq.question}</h3>
                    </div>
                    <ChevronDown
                      className={`text-slate-400 flex-shrink-0 transition-transform ${
                        expandedId === faq.id ? 'rotate-180' : ''
                      }`}
                      size={24}
                    />
                  </button>

                  {expandedId === faq.id && (
                    <div className="px-6 pb-6 border-t border-slate-100">
                      <div className="pl-12 pt-4">
                        <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gradient-to-r from-brand-accent to-red-900 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Can't Find What You're Looking For?</h2>
        <p className="text-red-100 mb-6 max-w-2xl mx-auto">
          Our support team is here to help! We typically respond within 2 hours during business hours.
        </p>
        <button className="bg-white text-brand-accent px-8 py-3 rounded-full font-bold hover:bg-red-50 transition-colors">
          Contact Support Team
        </button>
      </div>
    </DashboardLayout>
  );
}
