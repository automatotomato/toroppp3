import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import VoiceAssistant from '../components/VoiceAssistant';

const faqs = [
  {
    category: 'Payment & Billing',
    questions: [
      {
        question: 'When is my first payment due?',
        answer: 'Your first payment is made at the time of registration. This includes your one-time Advancement Academy membership fee, which unlocks your access to the full training library and resources.',
      },
      {
        question: 'When does my monthly subscription begin?',
        answer: 'Your monthly subscription begins 30 days after registration, and renews automatically on the same day each month thereafter.',
      },
      {
        question: 'How do I update my payment method?',
        answer: 'If you need to update your credit card or payment information, please email Info@3-peak.com, and our team will send you a secure link to update your billing details safely.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit and debit cards. For ACH or business billing arrangements, please reach out to Info@3-peak.com for customized setup.',
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes. All transactions are processed through Stripe, a PCI-compliant, industry-leading payment processor that encrypts and protects your financial data.',
      },
      {
        question: 'Do I receive a receipt or invoice each month?',
        answer: 'Yes. You\'ll automatically receive a payment confirmation email and digital invoice each month after your subscription renews.',
      },
      {
        question: 'Will my membership price ever increase?',
        answer: 'No. The price you start with is locked in for life. Even as new members join at higher rates or as additional features are added, your monthly rate will never change.',
      },
    ],
  },
  {
    category: 'Access & Usage',
    questions: [
      {
        question: 'How do I access the classes and resources?',
        answer: 'Once you register, you\'ll receive an email with your login credentials and step-by-step instructions for accessing the Advancement Academy online training portal. All courses are on-demand, allowing you and your team to train anytime, anywhere, and at your own pace—perfect for busy tax-season schedules.',
      },
      {
        question: 'Who can access the training under my membership?',
        answer: 'Your investment covers your entire office. Team members working within your Toro Tax franchise location can use your login to complete courses together and strengthen performance across your team.',
      },
      {
        question: 'What if I prefer not to share my login credentials with my team?',
        answer: 'No problem. Each unique login is tied to one membership. If a team member would like their own account, they can register for a separate membership, and we\'ll assist in setting that up.',
      },
      {
        question: 'Does the cost cover per person or per office?',
        answer: 'The membership is per office. This means your entire office can use the same login credentials to access all training materials, courses, and resources. If someone wants their own individual access with separate tracking, that would require a separate membership.',
      },
    ],
  },
  {
    category: 'Membership Management',
    questions: [
      {
        question: 'How do I cancel my membership?',
        answer: 'You can cancel anytime by contacting our support team at Info@3-peak.com. We\'ll guide you through a quick, no-hassle cancellation process.',
      },
      {
        question: 'What happens if I cancel my subscription—can I rejoin later?',
        answer: 'Yes, you can rejoin at any time. However, if you cancel, you will be required to pay the full $3,000 registration fee again when re-enrolling.',
      },
      {
        question: 'Can I pause my membership instead of canceling?',
        answer: 'Yes. If you need a short break—such as during the off-season—you may request to pause your membership for up to 60 days while keeping your locked-in rate.',
      },
      {
        question: 'What happens after I complete the 12-month training program?',
        answer: 'Your membership is lifetime. You\'ll continue to have access to all current and future courses, tools, and resources added to the Advancement Academy. As new training modules are developed for Toro Tax franchisees, you\'ll automatically gain access.',
      },
      {
        question: 'Are refunds available?',
        answer: 'Because the Advancement Academy provides immediate access to digital materials and proprietary training, all sales are final. However, you may cancel future renewals at any time.',
      },
    ],
  },
  {
    category: 'Content & Support',
    questions: [
      {
        question: 'How long do I have access to the courses?',
        answer: 'Your membership gives you unlimited access to all courses, resources, town halls, and new content as it\'s added. You can watch and rewatch any content as many times as you need.',
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
        question: 'How often is new content added?',
        answer: 'We regularly add new town hall recordings, podcast episodes, and weekly tips. The core 12 workshops are comprehensive and evergreen, while supplementary content is updated frequently to keep you current with industry best practices.',
      },
      {
        question: 'What support is included with my membership?',
        answer: 'Members have ongoing access to the Peak Performance Partners support team for help with billing, technical access, or training questions. You can reach us anytime at Info@3-peak.com.',
      },
      {
        question: 'What if I need help or have questions about the content?',
        answer: 'You can reach out through our support system, attend live town hall sessions for Q&A, or use our AI chatbot for quick answers to common questions. Our team is here to support your success.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleQuestion = (category: string, questionIndex: number) => {
    const key = `${category}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-brand-main mb-2">Frequently Asked Questions</h1>
        <p className="text-sm md:text-base text-slate-600">Find answers to common questions about Advancement Academy</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-6 md:mb-8">
        <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
          <MessageCircle className="text-blue-600 flex-shrink-0 mt-1" size={28} />
          <div>
            <h2 className="text-lg md:text-xl font-bold text-brand-main mb-2">Need More Help?</h2>
            <p className="text-sm md:text-base text-slate-600">
              Can't find the answer you're looking for? Our AI voice assistant is here to help 24/7.
              Click the microphone to speak with our assistant in English or Spanish.
            </p>
          </div>
        </div>

        <div className="flex justify-center py-4">
          <VoiceAssistant />
        </div>
      </div>

      <div className="space-y-6">
        {faqs.map((category) => (
          <div key={category.category} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-4 md:px-6 py-3 md:py-4 border-b border-slate-200">
              <h2 className="text-lg md:text-xl font-bold text-brand-main">{category.category}</h2>
            </div>
            <div className="divide-y divide-slate-200">
              {category.questions.map((faq, index) => {
                const key = `${category.category}-${index}`;
                const isOpen = openIndex === key;
                return (
                  <div key={index} className="p-4 md:p-6">
                    <button
                      onClick={() => toggleQuestion(category.category, index)}
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <h3 className="text-base md:text-lg font-semibold text-brand-main group-hover:text-brand-accent transition-colors pr-4">
                        {faq.question}
                      </h3>
                      {isOpen ? (
                        <ChevronUp className="text-brand-accent flex-shrink-0" size={24} />
                      ) : (
                        <ChevronDown className="text-slate-400 group-hover:text-brand-accent flex-shrink-0 transition-colors" size={24} />
                      )}
                    </button>

                    {isOpen && (
                      <div className="mt-3 md:mt-4 text-sm md:text-base text-slate-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-8 bg-slate-50 rounded-xl p-6 md:p-8 text-center">
        <h3 className="text-lg md:text-xl font-bold text-brand-main mb-2">Still have questions?</h3>
        <p className="text-sm md:text-base text-slate-600 mb-4">
          Contact our support team directly
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <a
            href="mailto:info@3-peak.com"
            className="inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-red-900 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-colors"
          >
            Email Support
          </a>
          <a
            href="https://www.3-peak.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-slate-300 hover:border-brand-accent text-slate-700 hover:text-brand-accent px-5 md:px-6 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-colors"
          >
            Visit Our Website
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}
