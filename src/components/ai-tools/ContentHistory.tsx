import { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Share2, FileText, Copy, Trash2, Star, Archive, Check, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface ContentHistoryProps {
  onClose: () => void;
  onStatsUpdate: () => void;
}

interface ContentItem {
  id: string;
  tool_type: 'email' | 'social_media' | 'proposal';
  generated_content: string;
  is_favorited: boolean;
  is_archived: boolean;
  created_at: string;
  input_data: any;
}

export default function ContentHistory({ onClose, onStatsUpdate }: ContentHistoryProps) {
  const { user } = useAuth();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'email' | 'social_media' | 'proposal'>('all');
  const [showArchived, setShowArchived] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchContent();
  }, [user, filter, showArchived]);

  const fetchContent = async () => {
    try {
      let query = supabase
        .from('ai_generated_content')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_archived', showArchived)
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('tool_type', filter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('ai_generated_content')
        .update({ is_favorited: !currentValue })
        .eq('id', id);

      if (error) throw error;

      fetchContent();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleArchive = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ai_generated_content')
        .update({ is_archived: true })
        .eq('id', id);

      if (error) throw error;

      fetchContent();
      onStatsUpdate();
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('Error archiving content:', error);
    }
  };

  const handleUnarchive = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ai_generated_content')
        .update({ is_archived: false })
        .eq('id', id);

      if (error) throw error;

      fetchContent();
      onStatsUpdate();
    } catch (error) {
      console.error('Error unarchiving content:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this content?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('ai_generated_content')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchContent();
      onStatsUpdate();
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getToolIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'social_media': return Share2;
      case 'proposal': return FileText;
      default: return FileText;
    }
  };

  const getToolColor = (type: string) => {
    switch (type) {
      case 'email': return 'text-blue-600 bg-blue-50';
      case 'social_media': return 'text-purple-600 bg-purple-50';
      case 'proposal': return 'text-green-600 bg-green-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getToolLabel = (type: string) => {
    switch (type) {
      case 'email': return 'Email';
      case 'social_media': return 'Social Media';
      case 'proposal': return 'Proposal';
      default: return type;
    }
  };

  const filteredContent = content.filter(item =>
    item.generated_content.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold text-brand-main mb-2">Content History</h1>
        <p className="text-slate-600">
          View, manage, and reuse your AI-generated content
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {['all', 'email', 'social_media', 'proposal'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === f
                    ? 'bg-brand-main text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f === 'all' ? 'All' : getToolLabel(f)}
              </button>
            ))}
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search content..."
                className="pl-10 pr-4 py-2 border-2 border-slate-200 rounded-lg focus:border-brand-accent focus:outline-none w-full md:w-64"
              />
            </div>
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                showArchived
                  ? 'bg-brand-accent text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Archive size={18} />
              {showArchived ? 'Archived' : 'Active'}
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-main"></div>
        </div>
      ) : filteredContent.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <FileText size={48} className="mx-auto mb-4 text-slate-300" />
          <h3 className="text-xl font-bold text-slate-600 mb-2">No content found</h3>
          <p className="text-slate-500">
            {searchTerm ? 'Try a different search term' : showArchived ? 'No archived content yet' : 'Start generating content to see it here'}
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {filteredContent.map((item) => {
              const Icon = getToolIcon(item.tool_type);
              const colorClass = getToolColor(item.tool_type);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all hover:shadow-xl border-2 ${
                    selectedItem?.id === item.id ? 'border-brand-accent' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-main">
                          {getToolLabel(item.tool_type)}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {new Date(item.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(item.id, item.is_favorited);
                      }}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Star
                        size={18}
                        className={item.is_favorited ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}
                      />
                    </button>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2">
                    {item.generated_content}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-24">
            {selectedItem ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = getToolIcon(selectedItem.tool_type);
                      const colorClass = getToolColor(selectedItem.tool_type);
                      return (
                        <div className={`p-2 rounded-lg ${colorClass}`}>
                          <Icon size={20} />
                        </div>
                      );
                    })()}
                    <div>
                      <h3 className="font-semibold text-brand-main">
                        {getToolLabel(selectedItem.tool_type)}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {new Date(selectedItem.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border-2 border-slate-200 mb-4 max-h-[400px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700">
                    {selectedItem.generated_content}
                  </pre>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleCopy(selectedItem.generated_content)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'Copied!' : 'Copy Content'}
                  </button>

                  {showArchived ? (
                    <button
                      onClick={() => handleUnarchive(selectedItem.id)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      <Archive size={18} />
                      Unarchive
                    </button>
                  ) : (
                    <button
                      onClick={() => handleArchive(selectedItem.id)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      <Archive size={18} />
                      Archive
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(selectedItem.id)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <FileText size={48} className="mx-auto mb-4 text-slate-300" />
                <h3 className="text-xl font-bold text-slate-600 mb-2">Select an item</h3>
                <p className="text-slate-500">
                  Click on any content to view details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
