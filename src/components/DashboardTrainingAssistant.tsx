import { useCallback, useState } from 'react';
import { Headphones, Volume2, VolumeX, X } from 'lucide-react';
import { useConversation } from '@elevenlabs/react';
import { useAuth } from '../contexts/AuthContext';

const TRAINING_AGENT_ID = 'agent_4101kbjzx23yeec8cnrtpka3d2kh';

export default function DashboardTrainingAssistant() {
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { profile } = useAuth();

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to training assistant');
    },
    onDisconnect: () => {
      console.log('Disconnected from training assistant');
    },
    onError: (error) => {
      console.error('Training assistant error:', error);
    },
    onModeChange: ({ mode }) => {
      console.log('Mode changed:', mode);
    },
  });

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      await conversation.startSession({
        agentId: TRAINING_AGENT_ID,
        clientTools: {
          get_user_info: {
            description: 'Gets the current user information including name and office',
            parameters: {
              type: 'object',
              properties: {},
            },
            handler: async () => {
              return {
                name: profile?.full_name || 'User',
                office: profile?.office_name || 'Office',
                email: profile?.email || '',
              };
            },
          },
          get_subscription_status: {
            description: 'Gets the user subscription status',
            parameters: {
              type: 'object',
              properties: {},
            },
            handler: async () => {
              return {
                status: profile?.subscription_status || 'inactive',
                hasAccess: profile?.subscription_status === 'active',
              };
            },
          },
        },
      });
    } catch (error) {
      console.error('Failed to start training conversation:', error);
      alert('Unable to start voice conversation. Please check your microphone permissions.');
    }
  }, [conversation, profile]);

  const endConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const toggleMute = useCallback(async () => {
    const newMutedState = !isMuted;
    await conversation.setVolume(newMutedState ? 0 : 1);
    setIsMuted(newMutedState);
  }, [conversation, isMuted]);

  const isConnected = conversation.status === 'connected';
  const isLoading = conversation.status === 'connecting';

  if (isMinimized && !isConnected) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 ring-4 ring-blue-600/30"
        title="Open Training Assistant"
      >
        <Headphones size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 inline-flex flex-col items-center gap-3 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-2xl shadow-2xl border-2 border-blue-600">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={isConnected ? endConversation : startConversation}
            disabled={isLoading}
            className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
              isConnected
                ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 ring-4 ring-blue-500/30'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={isConnected ? 'End conversation' : 'Talk to training assistant'}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Headphones className="text-white" size={24} />
            )}

            {isConnected && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            )}
          </button>

          {isConnected && (
            <button
              onClick={toggleMute}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-600 shadow-xl transition-all duration-300 transform hover:scale-110"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="text-white" size={18} />
              ) : (
                <Volume2 className="text-white" size={18} />
              )}
            </button>
          )}

          <div className="ml-2 text-left">
            <div className="text-white font-semibold text-sm">
              Training Assistant
            </div>
            <div className="text-blue-200 text-xs">
              {isConnected
                ? 'Connected'
                : 'Click to talk'}
            </div>
          </div>
        </div>

        {!isConnected && (
          <button
            onClick={() => setIsMinimized(true)}
            className="text-white/60 hover:text-white transition-colors ml-2"
            title="Minimize"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {!isConnected && (
        <div className="text-blue-200 text-xs text-center border-t border-blue-600 pt-3 w-full">
          Ask me anything about your training!
        </div>
      )}
    </div>
  );
}
