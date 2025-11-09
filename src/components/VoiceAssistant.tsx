import { useCallback, useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useConversation } from '@elevenlabs/react';
import { useLanguage } from '../contexts/LanguageContext';

const AGENT_ID = 'VWL9te4MU8Ib03Ls74bX';

export default function VoiceAssistant() {
  const [isMuted, setIsMuted] = useState(false);
  const { language } = useLanguage();

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to ElevenLabs agent');
    },
    onDisconnect: () => {
      console.log('Disconnected from ElevenLabs agent');
    },
    onError: (error) => {
      console.error('Conversation error:', error);
    },
    onModeChange: ({ mode }) => {
      console.log('Mode changed:', mode);
    },
  });

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      await conversation.startSession({
        agentId: AGENT_ID,
        clientTools: {
          get_language: {
            description: 'Gets the current user language preference',
            parameters: {
              type: 'object',
              properties: {},
            },
            handler: async () => {
              return { language: language === 'es' ? 'Spanish' : 'English' };
            },
          },
        },
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      alert('Unable to start voice conversation. Please check your microphone permissions.');
    }
  }, [conversation, language]);

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

  return (
    <div className="inline-flex flex-col items-center gap-3 bg-gradient-to-br from-slate-900 via-slate-800 to-brand-main p-6 rounded-2xl shadow-2xl border-2 border-slate-700">
      <div className="flex items-center gap-3">
        <button
          onClick={isConnected ? endConversation : startConversation}
          disabled={isLoading}
          className={`group relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
            isConnected
              ? 'bg-red-600 hover:bg-red-700 animate-pulse'
              : 'bg-gradient-to-br from-red-600 to-brand-accent hover:from-red-700 hover:to-red-900 ring-4 ring-red-600/30'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          title={
            isConnected
              ? language === 'es'
                ? 'Terminar conversación'
                : 'End conversation'
              : language === 'es'
              ? 'Hablar con nuestro asistente de IA'
              : 'Talk to our AI assistant'
          }
        >
          {isLoading ? (
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
          ) : isConnected ? (
            <MicOff className="text-white" size={28} />
          ) : (
            <Mic className="text-white" size={28} />
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
            className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 shadow-xl transition-all duration-300 transform hover:scale-110"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="text-white" size={20} />
            ) : (
              <Volume2 className="text-white" size={20} />
            )}
          </button>
        )}

        <div className="ml-2 text-left">
          <div className="text-white font-semibold text-sm">
            {language === 'es' ? 'Asistente de Voz' : 'Voice Assistant'}
          </div>
          <div className="text-slate-300 text-xs">
            {isConnected
              ? language === 'es'
                ? 'Conectado'
                : 'Connected'
              : language === 'es'
              ? 'Haz clic para hablar'
              : 'Click to talk'}
          </div>
          {!isConnected && (
            <div className="text-green-400 text-xs font-medium mt-1">
              {language === 'es' ? '🇺🇸 English | 🇪🇸 Español' : '🇺🇸 English | 🇪🇸 Spanish'}
            </div>
          )}
        </div>
      </div>

      <a
        href="https://automateplanet.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 border border-slate-600"
      >
        <span className="text-slate-300 text-xs">
          {language === 'es' ? 'Desarrollado por' : 'Powered by'}
        </span>
        <span className="text-green-400 text-xs font-semibold">
          AutomatePlanet.com
        </span>
      </a>
    </div>
  );
}
