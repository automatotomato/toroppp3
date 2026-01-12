import { useState } from 'react';
import { ArrowLeft, Copy, Save, Sparkles, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface EmailGeneratorProps {
  onClose: () => void;
  onComplete: () => void;
}

export default function EmailGenerator({ onClose, onComplete }: EmailGeneratorProps) {
  const { user } = useAuth();
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    emailType: 'follow-up',
    clientName: '',
    purpose: '',
    tone: 'professional',
    keyPoints: ''
  });

  const [generatedContent, setGeneratedContent] = useState('');

  const emailTypes = [
    { value: 'follow-up', label: 'Client Follow-up' },
    { value: 'appointment', label: 'Appointment Reminder' },
    { value: 'welcome', label: 'Welcome New Client' },
    { value: 'service-offer', label: 'Service Offering' },
    { value: 'seasonal', label: 'Seasonal Greeting' },
    { value: 'thank-you', label: 'Thank You Note' },
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'formal', label: 'Formal' },
    { value: 'casual', label: 'Casual' },
  ];

  const handleGenerate = async () => {
    setGenerating(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const emailTemplates = {
      'follow-up': `Subject: Following Up on Our Recent Conversation

Dear ${formData.clientName || '[Client Name]'},

I hope this email finds you well. I wanted to follow up on our recent conversation regarding ${formData.purpose || 'your tax matters'}.

${formData.keyPoints ? `As discussed, I wanted to highlight the following points:\n${formData.keyPoints.split('\n').map(point => `• ${point}`).join('\n')}` : ''}

I'm here to answer any questions you might have and help you move forward with ${formData.purpose || 'these matters'}. Please don't hesitate to reach out if you need any clarification or would like to schedule a time to discuss further.

Looking forward to hearing from you soon.

Best regards,
[Your Name]
[Your Title]
[Your Contact Information]`,

      'appointment': `Subject: Reminder: Your Upcoming Appointment

Dear ${formData.clientName || '[Client Name]'},

This is a friendly reminder about your upcoming appointment scheduled for ${formData.purpose || '[Date/Time]'}.

${formData.keyPoints ? `Please remember to bring:\n${formData.keyPoints.split('\n').map(point => `• ${point}`).join('\n')}` : 'Please bring any relevant documents we discussed.'}

If you need to reschedule or have any questions before our meeting, please don't hesitate to contact me.

I look forward to seeing you soon!

Best regards,
[Your Name]
[Your Title]
[Your Contact Information]`,

      'welcome': `Subject: Welcome to [Your Firm Name]!

Dear ${formData.clientName || '[Client Name]'},

Welcome! We're thrilled to have you as a new client and look forward to helping you with ${formData.purpose || 'your tax and financial needs'}.

${formData.keyPoints ? `Here's what you can expect from working with us:\n${formData.keyPoints.split('\n').map(point => `• ${point}`).join('\n')}` : 'We pride ourselves on providing personalized, professional service tailored to your unique situation.'}

I'll be your primary contact, and I'm here to answer any questions you may have. Feel free to reach out anytime via email or phone.

Thank you for choosing us to be your trusted tax partner. We're excited to start this journey with you!

Warm regards,
[Your Name]
[Your Title]
[Your Contact Information]`,

      'service-offer': `Subject: Exclusive Service Offering for Our Valued Clients

Dear ${formData.clientName || '[Client Name]'},

I wanted to personally reach out to share an opportunity that I believe would be valuable for ${formData.purpose || 'your business'}.

${formData.keyPoints ? `This service includes:\n${formData.keyPoints.split('\n').map(point => `• ${point}`).join('\n')}` : 'We offer comprehensive solutions designed to maximize your efficiency and profitability.'}

I'd love to discuss how this can specifically benefit you and answer any questions you might have. Would you be available for a brief call this week?

Please let me know what works best for your schedule.

Best regards,
[Your Name]
[Your Title]
[Your Contact Information]`,

      'seasonal': `Subject: Season's Greetings from [Your Firm Name]

Dear ${formData.clientName || '[Client Name]'},

As ${formData.purpose || 'the holiday season'} approaches, I wanted to take a moment to express my gratitude for your continued trust and partnership.

${formData.keyPoints ? `Looking ahead:\n${formData.keyPoints.split('\n').map(point => `• ${point}`).join('\n')}` : 'It has been a pleasure working with you this year, and I look forward to continuing to serve your needs in the coming year.'}

Wishing you and your family a wonderful ${formData.purpose || 'holiday season'} and a prosperous new year!

Warmest regards,
[Your Name]
[Your Title]
[Your Contact Information]`,

      'thank-you': `Subject: Thank You!

Dear ${formData.clientName || '[Client Name]'},

I wanted to take a moment to thank you for ${formData.purpose || 'your business and trust'}.

${formData.keyPoints ? `I especially appreciate:\n${formData.keyPoints.split('\n').map(point => `• ${point}`).join('\n')}` : 'Working with you has been a true pleasure, and I value our professional relationship.'}

If there's anything else I can do to support you, please don't hesitate to reach out. I'm always here to help.

With gratitude,
[Your Name]
[Your Title]
[Your Contact Information]`
    };

    const template = emailTemplates[formData.emailType as keyof typeof emailTemplates];
    setGeneratedContent(template);
    setGenerating(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('ai_generated_content')
        .insert({
          user_id: user?.id,
          tool_type: 'email',
          input_data: formData,
          generated_content: generatedContent
        });

      if (error) throw error;

      setSaved(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content. Please try again.');
    }
  };

  return (
    <div>
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-brand-main hover:text-brand-accent mb-6 font-semibold"
      >
        <ArrowLeft size={20} />
        Back to AI Tools
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-main mb-2">Client Email Generator</h1>
        <p className="text-slate-600">
          Generate professional, personalized emails for your clients
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-brand-main mb-6">Email Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Type
              </label>
              <select
                value={formData.emailType}
                onChange={(e) => setFormData({ ...formData, emailType: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-accent focus:outline-none"
              >
                {emailTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Client Name
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="John Smith"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Purpose / Main Topic
              </label>
              <input
                type="text"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                placeholder="Tax planning for Q4 2026"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tone
              </label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-accent focus:outline-none"
              >
                {tones.map(tone => (
                  <option key={tone.value} value={tone.value}>{tone.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Key Points (one per line)
              </label>
              <textarea
                value={formData.keyPoints}
                onChange={(e) => setFormData({ ...formData, keyPoints: e.target.value })}
                placeholder="Documents needed&#10;Deadline information&#10;Next steps"
                rows={4}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-accent focus:outline-none resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full bg-brand-main hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Email
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-brand-main mb-6">Generated Email</h2>

          {generatedContent ? (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4 border-2 border-slate-200 min-h-[400px]">
                <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700">
                  {generatedContent}
                </pre>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>

                <button
                  onClick={handleSave}
                  disabled={saved}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  {saved ? <Check size={20} /> : <Save size={20} />}
                  {saved ? 'Saved!' : 'Save to History'}
                </button>
              </div>

              <p className="text-sm text-slate-500 text-center">
                Remember to personalize the email with your details before sending
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px] text-slate-400">
              <div className="text-center">
                <Sparkles size={48} className="mx-auto mb-4 opacity-50" />
                <p>Fill in the details and click Generate to create your email</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
