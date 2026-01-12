import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Mail, Share2, FileText, Sparkles, History, Star, Archive } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import EmailGenerator from '../components/ai-tools/EmailGenerator';
import SocialMediaGenerator from '../components/ai-tools/SocialMediaGenerator';
import ProposalGenerator from '../components/ai-tools/ProposalGenerator';
import ContentHistory from '../components/ai-tools/ContentHistory';

type ToolType = 'email' | 'social_media' | 'proposal' | null;

interface ContentStats {
  total: number;
  emails: number;
  socialPosts: number;
  proposals: number;
}

export default function DashboardAIToolsPage() {
  const { user } = useAuth();
  const [activeTool, setActiveTool] = useState<ToolType>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [stats, setStats] = useState<ContentStats>({
    total: 0,
    emails: 0,
    socialPosts: 0,
    proposals: 0
  });

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_generated_content')
        .select('tool_type')
        .eq('user_id', user?.id);

      if (error) throw error;

      const stats = {
        total: data?.length || 0,
        emails: data?.filter(item => item.tool_type === 'email').length || 0,
        socialPosts: data?.filter(item => item.tool_type === 'social_media').length || 0,
        proposals: data?.filter(item => item.tool_type === 'proposal').length || 0
      };

      setStats(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleToolComplete = () => {
    fetchStats();
    setActiveTool(null);
  };

  const tools = [
    {
      id: 'email' as ToolType,
      title: 'Client Email Generator',
      description: 'Generate professional emails for client communication, follow-ups, and service offerings',
      icon: Mail,
      color: 'from-blue-600 to-blue-700',
      iconColor: 'text-blue-600',
      count: stats.emails,
      features: ['Professional tone', 'Personalized content', 'Multiple templates', 'Copy to clipboard']
    },
    {
      id: 'social_media' as ToolType,
      title: 'Social Media Content',
      description: 'Create engaging social media posts with hashtags for Facebook, LinkedIn, and Instagram',
      icon: Share2,
      color: 'from-purple-600 to-purple-700',
      iconColor: 'text-purple-600',
      count: stats.socialPosts,
      features: ['Platform-specific', 'Hashtag suggestions', 'Character limits', 'Engagement tips']
    },
    {
      id: 'proposal' as ToolType,
      title: 'Service Proposal Generator',
      description: 'Create professional proposals and quotes to present to potential clients',
      icon: FileText,
      color: 'from-green-600 to-green-700',
      iconColor: 'text-green-600',
      count: stats.proposals,
      features: ['Custom branding', 'Pricing tables', 'Professional format', 'PDF export']
    }
  ];

  if (showHistory) {
    return (
      <DashboardLayout>
        <ContentHistory onClose={() => setShowHistory(false)} onStatsUpdate={fetchStats} />
      </DashboardLayout>
    );
  }

  if (activeTool === 'email') {
    return (
      <DashboardLayout>
        <EmailGenerator onClose={() => setActiveTool(null)} onComplete={handleToolComplete} />
      </DashboardLayout>
    );
  }

  if (activeTool === 'social_media') {
    return (
      <DashboardLayout>
        <SocialMediaGenerator onClose={() => setActiveTool(null)} onComplete={handleToolComplete} />
      </DashboardLayout>
    );
  }

  if (activeTool === 'proposal') {
    return (
      <DashboardLayout>
        <ProposalGenerator onClose={() => setActiveTool(null)} onComplete={handleToolComplete} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-brand-main flex items-center gap-3">
            <Sparkles className="text-amber-500" size={32} />
            AI Tools Suite
          </h1>
          <button
            onClick={() => setShowHistory(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-brand-main text-brand-main rounded-lg hover:bg-slate-50 transition-colors font-semibold"
          >
            <History size={20} />
            View History
          </button>
        </div>
        <p className="text-slate-600">
          Generate professional content instantly with AI-powered tools designed for tax professionals
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-brand-accent to-red-900 rounded-xl p-6 text-white">
          <Sparkles size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">{stats.total}</h3>
          <p className="text-red-100">Content Generated</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <Mail size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">{stats.emails}</h3>
          <p className="text-blue-100">Emails Created</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <Share2 size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">{stats.socialPosts}</h3>
          <p className="text-purple-100">Social Posts</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
          <FileText size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">{stats.proposals}</h3>
          <p className="text-green-100">Proposals</p>
        </div>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => setActiveTool(tool.id)}
            >
              <div className={`bg-gradient-to-br ${tool.color} p-6 text-white`}>
                <Icon size={48} className="mb-3" />
                <h3 className="text-2xl font-bold mb-2">{tool.title}</h3>
                <p className="text-white/90 text-sm">{tool.description}</p>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-600">Generated</span>
                    <span className="text-2xl font-bold text-brand-main">{tool.count}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {tool.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button className="w-full bg-brand-main hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
                  <Sparkles size={18} />
                  Generate Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-gradient-to-r from-brand-accent to-red-900 rounded-2xl p-8 text-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">How AI Tools Work</h2>
            <p className="text-red-100 mb-6">
              Our AI tools use advanced language models to generate professional, customized content based on your input. Simply provide the details, and let AI do the heavy lifting.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-semibold mb-1">Enter Your Details</h4>
                  <p className="text-red-100 text-sm">Provide information about what you need</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-semibold mb-1">AI Generates Content</h4>
                  <p className="text-red-100 text-sm">Our AI creates professional content instantly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-semibold mb-1">Review & Use</h4>
                  <p className="text-red-100 text-sm">Edit if needed, then copy or download</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Star className="text-amber-300" />
              Pro Tips
            </h3>
            <ul className="space-y-3 text-red-100">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                <span>Be specific with your input for better results</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                <span>Save generated content to your history for later use</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                <span>Edit and personalize AI content to match your style</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                <span>Use templates as starting points for consistency</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
