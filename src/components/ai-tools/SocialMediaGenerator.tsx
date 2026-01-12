import { useState } from 'react';
import { ArrowLeft, Copy, Save, Sparkles, Check, Facebook, Linkedin, Instagram } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface SocialMediaGeneratorProps {
  onClose: () => void;
  onComplete: () => void;
}

export default function SocialMediaGenerator({ onClose, onComplete }: SocialMediaGeneratorProps) {
  const { user } = useAuth();
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    platform: 'linkedin',
    postType: 'educational',
    topic: '',
    keyMessage: '',
    callToAction: ''
  });

  const [generatedContent, setGeneratedContent] = useState('');
  const [charCount, setCharCount] = useState(0);

  const platforms = [
    { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, limit: 3000, color: 'text-blue-600' },
    { value: 'facebook', label: 'Facebook', icon: Facebook, limit: 63206, color: 'text-blue-700' },
    { value: 'instagram', label: 'Instagram', icon: Instagram, limit: 2200, color: 'text-pink-600' },
  ];

  const postTypes = [
    { value: 'educational', label: 'Educational Tip' },
    { value: 'announcement', label: 'Business Announcement' },
    { value: 'seasonal', label: 'Seasonal Reminder' },
    { value: 'success-story', label: 'Success Story' },
    { value: 'engagement', label: 'Engagement Post' },
    { value: 'promotional', label: 'Service Promotion' },
  ];

  const selectedPlatform = platforms.find(p => p.value === formData.platform)!;

  const handleGenerate = async () => {
    setGenerating(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const templates = {
      educational: {
        linkedin: `💡 Tax Tip Tuesday: ${formData.topic}

${formData.keyMessage || 'Understanding tax strategies can make a significant difference in your bottom line.'}

Here are key points to remember:
✅ Plan ahead for tax season
✅ Keep detailed records year-round
✅ Consult with professionals early
✅ Take advantage of available deductions

${formData.callToAction || 'Need help with your tax strategy? Let\'s connect!'}

#TaxTips #SmallBusiness #TaxPlanning #BusinessGrowth #FinancialAdvice`,

        facebook: `🎯 ${formData.topic}

${formData.keyMessage || 'Did you know? Smart tax planning is one of the most important things you can do for your business!'}

We're here to help you navigate the complexities and maximize your savings. 💰

${formData.callToAction || 'Comment below or send us a message to learn more!'}

#TaxServices #SmallBusinessSupport #TaxAdvice #LocalBusiness`,

        instagram: `✨ ${formData.topic}

${formData.keyMessage || 'Your success is our mission! Let us help you with your tax needs.'}

${formData.callToAction || '👉 DM us to get started!'}

#TaxPro #SmallBiz #BusinessOwner #TaxSeason #Entrepreneur #FinancialFreedom #TaxHelp`
      },

      announcement: {
        linkedin: `📢 Exciting News!

${formData.topic}

${formData.keyMessage || 'We\'re thrilled to announce this new development that will help us serve you better.'}

${formData.callToAction || 'Stay tuned for more updates!'}

#BusinessNews #ProfessionalServices #ClientSuccess`,

        facebook: `🎉 Big News! 🎉

${formData.topic}

${formData.keyMessage || 'We\'re excited to share this update with our amazing community!'}

${formData.callToAction || 'Let us know what you think in the comments!'}

#NewBeginnings #BusinessUpdate #ExcitingNews`,

        instagram: `🌟 ANNOUNCEMENT 🌟

${formData.topic}

${formData.keyMessage || 'We can\'t wait to share more details!'}

${formData.callToAction || 'Drop a ❤️ if you\'re excited!'}

#Announcement #News #Update #BusinessGrowth`
      },

      seasonal: {
        linkedin: `🗓️ ${formData.topic}

${formData.keyMessage || 'The season is approaching - are you prepared?'}

Don't wait until the last minute. Start planning now to:
• Maximize deductions
• Ensure compliance
• Reduce stress
• Save money

${formData.callToAction || 'Contact us today to get ahead of the game!'}

#TaxDeadline #Planning #BusinessTips`,

        facebook: `⏰ Reminder: ${formData.topic}

${formData.keyMessage || 'Time flies! Make sure you\'re ready.'}

We\'re here to help make the process smooth and stress-free. ✅

${formData.callToAction || 'Reach out to schedule your appointment!'}

#TaxSeason #Prepared #PeaceOfMind`,

        instagram: `⚠️ ${formData.topic}

${formData.keyMessage || 'Don\'t miss important deadlines!'}

${formData.callToAction || 'Tap the link in bio to get started 👆'}

#Deadline #Important #TaxTime #GetReady`
      },

      'success-story': {
        linkedin: `🏆 Client Success Story

${formData.topic}

${formData.keyMessage || 'We helped a client achieve incredible results this year.'}

This is why we do what we do - helping businesses thrive through expert guidance and personalized service.

${formData.callToAction || 'Your success story could be next!'}

#ClientSuccess #Results #BusinessGrowth #TaxStrategy`,

        facebook: `💪 Success Story Alert!

${formData.topic}

${formData.keyMessage || 'We love seeing our clients succeed!'}

${formData.callToAction || 'Could this be you? Let\'s chat!'}

#SuccessStory #HappyClient #BusinessWins`,

        instagram: `🎯 RESULTS MATTER

${formData.topic}

${formData.keyMessage || 'Helping businesses succeed is our passion!'}

${formData.callToAction || 'Your turn! 💼'}

#Success #ClientWin #BusinessSuccess #Results`
      },

      engagement: {
        linkedin: `❓ Question for Business Owners:

${formData.topic}

${formData.keyMessage || 'We\'d love to hear your thoughts on this topic!'}

${formData.callToAction || 'Drop your answer in the comments below!'}

#BusinessCommunity #Discussion #Networking #SmallBusiness`,

        facebook: `🤔 Let's Talk: ${formData.topic}

${formData.keyMessage || 'We want to hear from you!'}

${formData.callToAction || 'Share your thoughts in the comments! 👇'}

#Community #LetsTalk #Engagement #YourOpinion`,

        instagram: `💬 Your Turn!

${formData.topic}

${formData.keyMessage || 'Tell us what you think!'}

${formData.callToAction || 'Comment below 👇'}

#Community #Engage #YourThoughts #LetsChat`
      },

      promotional: {
        linkedin: `🎁 Special Offer: ${formData.topic}

${formData.keyMessage || 'For a limited time, we\'re offering exclusive services to help your business thrive.'}

This includes:
• Comprehensive consultation
• Customized strategy
• Ongoing support
• Expert guidance

${formData.callToAction || 'Message me to learn more about this opportunity!'}

#SpecialOffer #BusinessServices #LimitedTime #Investment`,

        facebook: `🌟 SPECIAL PROMOTION 🌟

${formData.topic}

${formData.keyMessage || 'Don\'t miss this limited-time opportunity!'}

${formData.callToAction || 'Click the link or call us today!'}

#SpecialOffer #Promotion #DontMiss #LimitedTime`,

        instagram: `⚡ LIMITED TIME ⚡

${formData.topic}

${formData.keyMessage || 'Act fast!'}

${formData.callToAction || 'Link in bio! 👆'}

#Sale #Offer #LimitedTime #ActNow #Special`
      }
    };

    const template = templates[formData.postType as keyof typeof templates][formData.platform as keyof typeof templates.educational];
    setGeneratedContent(template);
    setCharCount(template.length);
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
          tool_type: 'social_media',
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

  const PlatformIcon = selectedPlatform.icon;

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
        <h1 className="text-3xl font-bold text-brand-main mb-2">Social Media Content Generator</h1>
        <p className="text-slate-600">
          Create engaging social media posts optimized for each platform
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-brand-main mb-6">Post Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Platform
              </label>
              <div className="grid grid-cols-3 gap-3">
                {platforms.map(platform => {
                  const Icon = platform.icon;
                  return (
                    <button
                      key={platform.value}
                      onClick={() => setFormData({ ...formData, platform: platform.value })}
                      className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                        formData.platform === platform.value
                          ? 'border-brand-accent bg-red-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Icon className={platform.color} size={24} />
                      <span className="text-sm font-semibold">{platform.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Post Type
              </label>
              <select
                value={formData.postType}
                onChange={(e) => setFormData({ ...formData, postType: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-accent focus:outline-none"
              >
                {postTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Topic / Main Theme
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="Year-end tax planning strategies"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Key Message
              </label>
              <textarea
                value={formData.keyMessage}
                onChange={(e) => setFormData({ ...formData, keyMessage: e.target.value })}
                placeholder="What's the main point you want to communicate?"
                rows={3}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-accent focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Call to Action
              </label>
              <input
                type="text"
                value={formData.callToAction}
                onChange={(e) => setFormData({ ...formData, callToAction: e.target.value })}
                placeholder="Contact us today for a free consultation!"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-brand-accent focus:outline-none"
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
                  Generate Post
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-brand-main">Generated Post</h2>
            {generatedContent && (
              <div className="flex items-center gap-2">
                <PlatformIcon className={selectedPlatform.color} size={20} />
                <span className={`text-sm font-semibold ${charCount > selectedPlatform.limit ? 'text-red-600' : 'text-green-600'}`}>
                  {charCount} / {selectedPlatform.limit}
                </span>
              </div>
            )}
          </div>

          {generatedContent ? (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4 border-2 border-slate-200 min-h-[400px]">
                <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700">
                  {generatedContent}
                </pre>
              </div>

              {charCount > selectedPlatform.limit && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 text-sm text-red-700">
                  ⚠️ Warning: This post exceeds the recommended character limit for {selectedPlatform.label}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                  {copied ? 'Copied!' : 'Copy Post'}
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
                Feel free to customize the post before publishing
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px] text-slate-400">
              <div className="text-center">
                <Sparkles size={48} className="mx-auto mb-4 opacity-50" />
                <p>Fill in the details and click Generate to create your post</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
