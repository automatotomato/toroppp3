import { useState } from 'react';
import { ArrowLeft, Copy, Save, Sparkles, Check, Download } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface ProposalGeneratorProps {
  onClose: () => void;
  onComplete: () => void;
}

export default function ProposalGenerator({ onClose, onComplete }: ProposalGeneratorProps) {
  const { user } = useAuth();
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    serviceType: 'tax-preparation',
    clientName: '',
    businessName: '',
    services: '',
    pricing: '',
    timeline: ''
  });

  const [generatedContent, setGeneratedContent] = useState('');

  const serviceTypes = [
    { value: 'tax-preparation', label: 'Tax Preparation Services' },
    { value: 'bookkeeping', label: 'Bookkeeping Services' },
    { value: 'consulting', label: 'Business Consulting' },
    { value: 'audit-support', label: 'Audit Support' },
    { value: 'payroll', label: 'Payroll Services' },
    { value: 'comprehensive', label: 'Comprehensive Package' },
  ];

  const handleGenerate = async () => {
    setGenerating(true);

    await new Promise(resolve => setTimeout(resolve, 2500));

    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const proposal = `SERVICE PROPOSAL

Prepared for: ${formData.clientName || '[Client Name]'}
${formData.businessName ? `Company: ${formData.businessName}` : ''}
Date: ${today}
Prepared by: [Your Name/Firm Name]

═══════════════════════════════════════════════════════════════

EXECUTIVE SUMMARY

Thank you for considering our ${serviceTypes.find(s => s.value === formData.serviceType)?.label.toLowerCase() || 'professional services'}. We are committed to providing exceptional service tailored to your specific needs and helping your business thrive.

This proposal outlines our recommended approach, deliverables, investment, and timeline for partnering with ${formData.businessName || formData.clientName || 'your organization'}.

═══════════════════════════════════════════════════════════════

SCOPE OF SERVICES

We will provide the following services:

${formData.services ? formData.services.split('\n').map(service => `• ${service}`).join('\n') : `• Comprehensive ${serviceTypes.find(s => s.value === formData.serviceType)?.label.toLowerCase()}
• Regular communication and updates
• Professional consultation and support
• Compliance and regulatory guidance`}

═══════════════════════════════════════════════════════════════

DELIVERABLES

Our engagement will include:

✓ Detailed analysis and recommendations
✓ Regular progress reports and updates
✓ Direct access to our team of experts
✓ Customized solutions for your unique situation
✓ Documentation and supporting materials
✓ Ongoing support and consultation

═══════════════════════════════════════════════════════════════

INVESTMENT

${formData.pricing || 'Our fee structure is designed to be transparent and provide excellent value:'}

${!formData.pricing ? `Standard Package: $[X,XXX]
Premium Package: $[X,XXX]
Enterprise Package: $[X,XXX]

Payment terms: [Specify terms]
All fees are quoted in USD` : ''}

═══════════════════════════════════════════════════════════════

TIMELINE

${formData.timeline || `Phase 1: Initial Consultation & Setup (Week 1-2)
Phase 2: Implementation & Processing (Week 3-6)
Phase 3: Review & Finalization (Week 7-8)
Phase 4: Ongoing Support (As needed)`}

═══════════════════════════════════════════════════════════════

WHY CHOOSE US

Experience: Years of proven success in serving clients like you
Expertise: Licensed professionals with deep industry knowledge
Dedication: Personalized attention and responsive service
Results: Track record of delivering measurable value

═══════════════════════════════════════════════════════════════

NEXT STEPS

To move forward with this proposal:

1. Review this proposal and let us know if you have any questions
2. Sign the acceptance section below
3. Schedule your kick-off meeting
4. We'll begin serving you immediately!

═══════════════════════════════════════════════════════════════

ACCEPTANCE

I accept this proposal and authorize [Your Firm Name] to proceed with the services outlined above.

Client Signature: _________________________  Date: __________

Print Name: _________________________

═══════════════════════════════════════════════════════════════

We look forward to partnering with you and contributing to your success!

Questions? Contact us at:
[Your Email]
[Your Phone]
[Your Website]`;

    setGeneratedContent(proposal);
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
          tool_type: 'proposal',
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
        <h1 className="text-3xl font-bold text-brand-main mb-2">Service Proposal Generator</h1>
        <p className="text-slate-600">
          Create professional proposals to present your services to potential clients
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-brand-main mb-6">Proposal Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Service Type
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-accent focus:outline-none"
              >
                {serviceTypes.map(type => (
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
                Business Name (Optional)
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="ABC Corporation"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Specific Services (one per line)
              </label>
              <textarea
                value={formData.services}
                onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                placeholder="Monthly bookkeeping&#10;Quarterly tax planning&#10;Annual tax return preparation"
                rows={4}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-accent focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Pricing Information
              </label>
              <textarea
                value={formData.pricing}
                onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                placeholder="Monthly retainer: $500&#10;Setup fee: $200&#10;Payment terms: Net 15"
                rows={3}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-accent focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Timeline (Optional)
              </label>
              <textarea
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                placeholder="Week 1: Onboarding&#10;Week 2-4: Initial setup&#10;Week 5+: Ongoing services"
                rows={3}
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
                  Generate Proposal
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-brand-main mb-6">Generated Proposal</h2>

          {generatedContent ? (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4 border-2 border-slate-200 min-h-[500px] max-h-[600px] overflow-y-auto">
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
                  {copied ? 'Copied!' : 'Copy Proposal'}
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
                Customize with your firm details before sending to client
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[500px] text-slate-400">
              <div className="text-center">
                <Sparkles size={48} className="mx-auto mb-4 opacity-50" />
                <p>Fill in the details and click Generate to create your proposal</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
