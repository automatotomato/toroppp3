import { useState, useEffect } from 'react';
import { Upload, FileText, TrendingUp, MessageSquare, Clock, Target, Award, Tag, Download, LineChart, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface AnalysisResults {
  opportunities?: Array<{
    quote: string;
    suggestion: string;
    timestamp?: string;
  }>;
  missed_questions?: Array<{
    moment: string;
    recommended_question: string;
  }>;
  talk_ratio?: {
    agent_percentage: number;
    client_percentage: number;
    assessment: string;
  };
  sentiment_timeline?: Array<{
    timestamp: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    note: string;
  }>;
  improvements?: Array<{
    quote: string;
    issue: string;
    better_approach: string;
  }>;
  scorecard?: {
    rapport_building: number;
    needs_discovery: number;
    solution_presentation: number;
    objection_handling: number;
    closing: number;
  };
}

interface SalesCall {
  id: string;
  call_title: string;
  transcript_text: string;
  upload_date: string;
  analysis_results: AnalysisResults;
  overall_score: number;
  tags: string[];
  processing_status: 'pending' | 'processing' | 'completed' | 'failed';
}

const SERVICE_TAGS = [
  'Bookkeeping',
  'Tax Preparation',
  'Tax Advisory',
  'Payroll',
  'Business Consulting',
  'CFO Services',
  'Audit Support',
  'Financial Planning'
];

export default function SalesCallAnalyzer() {
  const { user } = useAuth();
  const [calls, setCalls] = useState<SalesCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [callTitle, setCallTitle] = useState('');
  const [transcript, setTranscript] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadCalls();
    }
  }, [user]);

  const loadCalls = async () => {
    try {
      const { data, error } = await supabase
        .from('sales_calls')
        .select('*')
        .eq('user_id', user?.id)
        .order('upload_date', { ascending: false });

      if (error) throw error;
      setCalls(data || []);
    } catch (error) {
      console.error('Error loading calls:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setTranscript(text);
    };
    reader.readAsText(file);
  };

  const analyzeCall = async () => {
    if (!callTitle.trim() || !transcript.trim()) {
      alert('Please provide both a title and transcript');
      return;
    }

    setAnalyzing(true);

    try {
      const { data, error } = await supabase
        .from('sales_calls')
        .insert({
          user_id: user?.id,
          call_title: callTitle,
          transcript_text: transcript,
          tags: selectedTags,
          processing_status: 'processing'
        })
        .select()
        .single();

      if (error) throw error;

      simulateAIAnalysis(data.id);

      setCallTitle('');
      setTranscript('');
      setSelectedTags([]);
      setShowInput(false);
    } catch (error) {
      console.error('Error creating call:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const simulateAIAnalysis = async (callId: string) => {
    setTimeout(async () => {
      const mockAnalysis: AnalysisResults = {
        opportunities: [
          {
            quote: "I'm struggling to keep up with my bookkeeping, it takes me hours every week",
            suggestion: "Upsell monthly bookkeeping service - client clearly has pain point with time management",
            timestamp: "03:45"
          },
          {
            quote: "My tax bill was higher than expected last year",
            suggestion: "Offer tax planning consultation to identify deductions and strategies for next year",
            timestamp: "12:20"
          },
          {
            quote: "I'm thinking about hiring my first employee",
            suggestion: "Cross-sell payroll services - perfect timing as they scale up",
            timestamp: "18:30"
          }
        ],
        missed_questions: [
          {
            moment: "Client mentioned cash flow concerns",
            recommended_question: "Can you tell me more about when these cash flow issues typically occur? Is it seasonal or consistent?"
          },
          {
            moment: "Client said they're using QuickBooks",
            recommended_question: "How comfortable are you with QuickBooks? Are there any features you're not utilizing that could help?"
          }
        ],
        talk_ratio: {
          agent_percentage: 55,
          client_percentage: 45,
          assessment: "Slightly high - aim for 30-40% agent talk time. Let the client share more about their needs."
        },
        sentiment_timeline: [
          {
            timestamp: "00:00-05:00",
            sentiment: "neutral",
            note: "Opening rapport building phase, client is reserved"
          },
          {
            timestamp: "05:00-15:00",
            sentiment: "positive",
            note: "Client opened up about pain points, showing engagement"
          },
          {
            timestamp: "15:00-20:00",
            sentiment: "negative",
            note: "Mild concern about pricing, became slightly defensive"
          },
          {
            timestamp: "20:00-end",
            sentiment: "positive",
            note: "Regained confidence after value explanation, ended strong"
          }
        ],
        improvements: [
          {
            quote: "Our bookkeeping service costs $500 per month",
            issue: "Led with price before establishing value",
            better_approach: "First confirm their current pain points and time spent, then frame price as ROI: 'Most clients save 15+ hours per month, which at your hourly rate of $150 means this service actually generates a positive return.'"
          },
          {
            quote: "We're the best in the industry",
            issue: "Generic claim without proof",
            better_approach: "Use specific, verifiable results: 'Last quarter we helped 12 clients reduce their tax liability by an average of $8,500 through strategic planning.'"
          }
        ],
        scorecard: {
          rapport_building: 85,
          needs_discovery: 72,
          solution_presentation: 68,
          objection_handling: 78,
          closing: 65
        }
      };

      const overallScore = Math.round(
        (mockAnalysis.scorecard!.rapport_building +
          mockAnalysis.scorecard!.needs_discovery +
          mockAnalysis.scorecard!.solution_presentation +
          mockAnalysis.scorecard!.objection_handling +
          mockAnalysis.scorecard!.closing) / 5
      );

      await supabase
        .from('sales_calls')
        .update({
          analysis_results: mockAnalysis,
          overall_score: overallScore,
          processing_status: 'completed'
        })
        .eq('id', callId);

      await loadCalls();
    }, 3000);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const deleteCall = async (callId: string) => {
    if (!confirm('Are you sure you want to delete this call analysis?')) return;

    try {
      await supabase.from('sales_calls').delete().eq('id', callId);
      await loadCalls();
    } catch (error) {
      console.error('Error deleting call:', error);
    }
  };

  const calculateAverageImprovement = () => {
    if (calls.length < 2) return null;

    const completedCalls = calls
      .filter(c => c.processing_status === 'completed')
      .sort((a, b) => new Date(a.upload_date).getTime() - new Date(b.upload_date).getTime());

    if (completedCalls.length < 2) return null;

    const firstHalf = completedCalls.slice(0, Math.ceil(completedCalls.length / 2));
    const secondHalf = completedCalls.slice(Math.ceil(completedCalls.length / 2));

    const avgFirst = firstHalf.reduce((sum, c) => sum + c.overall_score, 0) / firstHalf.length;
    const avgSecond = secondHalf.reduce((sum, c) => sum + c.overall_score, 0) / secondHalf.length;

    return avgSecond - avgFirst;
  };

  const selectedCall = selectedCallId ? calls.find(c => c.id === selectedCallId) : null;
  const improvement = calculateAverageImprovement();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading call analyses...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Sales Call Analyzer</h2>
          <p className="text-gray-400 mt-1">Analyze sales conversations to identify opportunities and improve closing rates</p>
        </div>
        <button
          onClick={() => setShowInput(!showInput)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showInput ? 'Cancel' : 'Analyze New Call'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Calls Analyzed</p>
              <p className="text-2xl font-bold text-white mt-1">{calls.length}</p>
            </div>
            <MessageSquare className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Score</p>
              <p className="text-2xl font-bold text-white mt-1">
                {calls.length > 0
                  ? Math.round(calls.reduce((sum, c) => sum + c.overall_score, 0) / calls.length)
                  : 0}
              </p>
            </div>
            <Award className="text-yellow-500" size={32} />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Improvement</p>
              <p className={`text-2xl font-bold mt-1 ${improvement && improvement > 0 ? 'text-green-500' : 'text-gray-400'}`}>
                {improvement ? `+${improvement.toFixed(0)}` : 'N/A'}
              </p>
            </div>
            <TrendingUp className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Opportunities Found</p>
              <p className="text-2xl font-bold text-white mt-1">
                {calls.reduce((sum, c) => sum + (c.analysis_results?.opportunities?.length || 0), 0)}
              </p>
            </div>
            <Target className="text-purple-500" size={32} />
          </div>
        </div>
      </div>

      {showInput && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-4">
          <div>
            <label className="block text-white mb-2 font-medium">Call Title</label>
            <input
              type="text"
              value={callTitle}
              onChange={(e) => setCallTitle(e.target.value)}
              placeholder="e.g., John Smith - Initial Consultation"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-medium">Service Type Tags</label>
            <div className="flex flex-wrap gap-2">
              {SERVICE_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white mb-2 font-medium">Transcript</label>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste the call transcript here, or upload a text file below..."
              rows={12}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 font-mono text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label
                htmlFor="transcript-upload"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <Upload size={20} />
                Upload Transcript File (TXT)
              </label>
              <input
                type="file"
                id="transcript-upload"
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            <button
              onClick={analyzeCall}
              disabled={analyzing}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {analyzing ? 'Analyzing...' : 'Analyze Call'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Call History</h3>
        </div>
        <div className="divide-y divide-gray-700">
          {calls.map((call) => (
            <div
              key={call.id}
              className="p-6 hover:bg-gray-700/30 transition-colors cursor-pointer"
              onClick={() => setSelectedCallId(selectedCallId === call.id ? null : call.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-white font-semibold">{call.call_title}</h4>
                    {call.processing_status === 'processing' && (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded">
                        Processing
                      </span>
                    )}
                    {call.processing_status === 'completed' && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded">
                        Completed
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                    <span>{new Date(call.upload_date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1">
                      <Award size={14} />
                      Score: {call.overall_score}/100
                    </span>
                  </div>
                  {call.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {call.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCall(call.id);
                  }}
                  className="text-red-500 hover:text-red-400"
                >
                  Delete
                </button>
              </div>

              {selectedCallId === call.id && call.processing_status === 'completed' && (
                <div className="mt-6 space-y-6 border-t border-gray-700 pt-6">
                  {call.analysis_results.scorecard && (
                    <div>
                      <h5 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Award size={18} />
                        Performance Scorecard
                      </h5>
                      <div className="grid grid-cols-5 gap-4">
                        {Object.entries(call.analysis_results.scorecard).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-2xl font-bold text-white mb-1">{value}</div>
                            <div className="text-xs text-gray-400 capitalize">
                              {key.replace(/_/g, ' ')}
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                              <div
                                className={`h-2 rounded-full ${
                                  value >= 80 ? 'bg-green-500' : value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {call.analysis_results.talk_ratio && (
                    <div>
                      <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <Clock size={18} />
                        Talk Time Ratio
                      </h5>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <div className="flex gap-4 mb-3">
                          <div className="flex-1">
                            <div className="text-sm text-gray-400 mb-1">Agent</div>
                            <div className="text-2xl font-bold text-white">
                              {call.analysis_results.talk_ratio.agent_percentage}%
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-gray-400 mb-1">Client</div>
                            <div className="text-2xl font-bold text-white">
                              {call.analysis_results.talk_ratio.client_percentage}%
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
                          <div
                            className="bg-blue-500 h-3 rounded-l-full"
                            style={{ width: `${call.analysis_results.talk_ratio.agent_percentage}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-300">{call.analysis_results.talk_ratio.assessment}</p>
                      </div>
                    </div>
                  )}

                  {call.analysis_results.opportunities && call.analysis_results.opportunities.length > 0 && (
                    <div>
                      <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <Target size={18} />
                        Upsell Opportunities Identified
                      </h5>
                      <div className="space-y-3">
                        {call.analysis_results.opportunities.map((opp, idx) => (
                          <div key={idx} className="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
                            <div className="text-xs text-gray-400 mb-2">{opp.timestamp}</div>
                            <div className="text-sm text-gray-300 italic mb-2">"{opp.quote}"</div>
                            <div className="text-sm text-green-400 font-medium">→ {opp.suggestion}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {call.analysis_results.missed_questions && call.analysis_results.missed_questions.length > 0 && (
                    <div>
                      <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle size={18} />
                        Missed Probing Questions
                      </h5>
                      <div className="space-y-3">
                        {call.analysis_results.missed_questions.map((miss, idx) => (
                          <div key={idx} className="bg-gray-900 rounded-lg p-4 border-l-4 border-yellow-500">
                            <div className="text-sm text-gray-300 mb-2">{miss.moment}</div>
                            <div className="text-sm text-yellow-400 font-medium">→ {miss.recommended_question}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {call.analysis_results.improvements && call.analysis_results.improvements.length > 0 && (
                    <div>
                      <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp size={18} />
                        Improvement Suggestions
                      </h5>
                      <div className="space-y-4">
                        {call.analysis_results.improvements.map((imp, idx) => (
                          <div key={idx} className="bg-gray-900 rounded-lg p-4 border-l-4 border-blue-500">
                            <div className="text-sm text-gray-300 italic mb-2">"{imp.quote}"</div>
                            <div className="text-sm text-red-400 mb-2">❌ Issue: {imp.issue}</div>
                            <div className="text-sm text-green-400">✓ Better: {imp.better_approach}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {call.analysis_results.sentiment_timeline && call.analysis_results.sentiment_timeline.length > 0 && (
                    <div>
                      <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <LineChart size={18} />
                        Sentiment Timeline
                      </h5>
                      <div className="space-y-2">
                        {call.analysis_results.sentiment_timeline.map((sent, idx) => (
                          <div key={idx} className="flex items-center gap-4 bg-gray-900 rounded-lg p-3">
                            <div className="text-sm text-gray-400 font-mono w-32">{sent.timestamp}</div>
                            <div
                              className={`w-3 h-3 rounded-full ${
                                sent.sentiment === 'positive'
                                  ? 'bg-green-500'
                                  : sent.sentiment === 'negative'
                                  ? 'bg-red-500'
                                  : 'bg-gray-500'
                              }`}
                            />
                            <div className="text-sm text-gray-300 flex-1">{sent.note}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {calls.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No call analyses yet. Click "Analyze New Call" to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}