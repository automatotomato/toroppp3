import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Does the cost cover per person or per office?',
    answer: 'The membership is per office. This means your entire office can use the same login credentials to access all training materials, courses, and resources. If someone wants their own individual access with separate tracking, that would require a separate membership.',
  },
  {
    question: 'How long do I have access to the courses?',
    answer: 'Your annual membership gives you 12 months of unlimited access to all courses, resources, town halls, and new content as it\'s added. You can watch and rewatch any content as many times as you need.',
  },
  {
    question: 'Are the courses available in Spanish?',
    answer: 'Currently, the main workshop content is in English, but our podcast library includes both English and Spanish versions. We are working on expanding Spanish language support across all content.',
  },
  {
    question: 'Can I download the resources and materials?',
    answer: 'Yes! All handouts, templates, charts, graphs, and tools are available for download. You can save them to your computer and use them in your business operations.',
  },
  {
    question: 'What if I need help or have questions about the content?',
    answer: 'You can reach out through our support system, attend live town hall sessions for Q&A, or use our AI chatbot for quick answers to common questions. Our team is here to support your success.',
  },
  {
    question: 'How often is new content added?',
    answer: 'We regularly add new town hall recordings, podcast episodes, and weekly tips. The core 12 workshops are comprehensive and evergreen, while supplementary content is updated frequently to keep you current with industry best practices.',
  },
  {
    question: 'Can I share my login with my team?',
    answer: 'Yes! Since the membership is per office, you\'re encouraged to share access with your team members. This allows everyone in your office to benefit from the training and stay aligned with best practices.',
  },
  {
    question: 'What happens when my annual membership expires?',
    answer: 'You\'ll receive reminders before your membership expires. You can choose to renew to maintain access to all content, updates, and new materials. If you don\'t renew, your access will end but your progress and uploaded materials will be preserved if you rejoin later.',
  },
  {
    question: 'How do I upload my CBA results?',
    answer: 'Navigate to the Resources section in your dashboard where you\'ll find a CBA Results upload tool. You can upload your assessment files and add notes for future reference.',
  },
  {
    question: 'Is there a mobile app?',
    answer: 'While we don\'t have a dedicated mobile app yet, our platform is fully responsive and works great on mobile browsers. You can access all content from your smartphone or tablet.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-main mb-2">Frequently Asked Questions</h1>
        <p className="text-slate-600">Find answers to common questions about Peak Performance Partners Academy</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <MessageCircle className="text-blue-600 flex-shrink-0 mt-1" size={32} />
          <div>
            <h2 className="text-xl font-bold text-brand-main mb-2">Need More Help?</h2>
            <p className="text-slate-600">
              Can't find the answer you're looking for? Our AI assistant is here to help 24/7.
              Just type your question below and get instant answers in English or Spanish.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4">
          <input
            type="text"
            placeholder="Ask a question... (e.g., How do I reset my password?)"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-accent focus:ring-2 focus:ring-red-600/20 outline-none transition-all"
          />
          <p className="text-sm text-slate-500 mt-2">
            AI Assistant powered by Peak Performance Partners
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg divide-y divide-slate-200">
        {faqs.map((faq, index) => (
          <div key={index} className="p-6">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between text-left group"
            >
              <h3 className="text-lg font-semibold text-brand-main group-hover:text-brand-accent transition-colors pr-4">
                {faq.question}
              </h3>
              {openIndex === index ? (
                <ChevronUp className="text-brand-accent flex-shrink-0" size={24} />
              ) : (
                <ChevronDown className="text-slate-400 group-hover:text-brand-accent flex-shrink-0 transition-colors" size={24} />
              )}
            </button>

            {openIndex === index && (
              <div className="mt-4 text-slate-700 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-slate-50 rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-brand-main mb-2">Still have questions?</h3>
        <p className="text-slate-600 mb-4">
          Contact our support team directly
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:info@3-peak.com"
            className="inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-red-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Email Support
          </a>
          <a
            href="https://www.3-peak.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-slate-300 hover:border-brand-accent text-slate-700 hover:text-brand-accent px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Visit Our Website
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}
