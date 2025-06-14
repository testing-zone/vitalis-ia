import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Send, 
  Volume2,
  User,
  Loader2,
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type: 'text';
}

interface Avatar {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  systemPrompt: string;
  voice?: string;
}

const avatars: Avatar[] = [
  {
    id: 'wellness',
    name: 'Dr. Serenity',
    description: 'Especialista en bienestar mental y mindfulness',
    icon: '🧘‍♀️',
    color: 'from-green-400 to-emerald-500',
    voice: 'Calm and soothing, with a gentle tone',
    systemPrompt: 'Eres Dr. Serenity, una especialista en bienestar mental y mindfulness. Habla con una voz calmada, empática y reconfortante. Usa un tono suave y pausado, como si estuvieras guiando una sesión de meditación. Eres sabia y siempre ofreces consejos prácticos para el bienestar emocional usando técnicas de mindfulness y psicología positiva.'
  },
  {
    id: 'motivation',
    name: 'Coach Alex',
    description: 'Entrenador motivacional y de desarrollo personal',
    icon: '💪',
    color: 'from-orange-400 to-red-500',
    voice: 'Energetic and enthusiastic, with confidence',
    systemPrompt: 'Eres Coach Alex, un entrenador motivacional energético y positivo. Habla con una voz fuerte, entusiasta y llena de energía. Usa un tono motivador y empoderador, como un entrenador deportivo que inspira a su equipo. Tu objetivo es inspirar y motivar a las personas a alcanzar sus metas con estrategias prácticas.'
  },
  {
    id: 'wisdom',
    name: 'Sage Luna',
    description: 'Consejera sabia con enfoque holístico',
    icon: '🌙',
    color: 'from-purple-400 to-indigo-500',
    voice: 'Wise and mystical, with deep contemplation',
    systemPrompt: 'Eres Sage Luna, una consejera sabia con un enfoque holístico de la vida. Habla con una voz profunda, contemplativa y llena de sabiduría ancestral. Usa un tono místico pero accesible, como una guía espiritual que conecta el bienestar mental, físico y espiritual. Ofreces reflexiones profundas para encontrar propósito y equilibrio interior.'
  },
  {
    id: 'energy',
    name: 'Spark',
    description: 'Compañero energético y divertido',
    icon: '⚡',
    color: 'from-yellow-400 to-amber-500',
    voice: 'Playful and upbeat, full of joy',
    systemPrompt: 'Eres Spark, un compañero de IA energético, divertido y lleno de vida. Habla con una voz alegre, juguetona y optimista. Usa un tono casual y amigable, como un mejor amigo que siempre te hace sonreír. Tu objetivo es levantar el ánimo y hacer que las conversaciones sean ligeras y positivas con humor apropiado.'
  }
];

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY // Reemplaza con tu API Key

function pcmToWav(pcmData: Uint8Array, sampleRate = 24000, numChannels = 1) {
  const buffer = new ArrayBuffer(44 + pcmData.length);
  const view = new DataView(buffer);

  // RIFF identifier 'RIFF'
  view.setUint32(0, 0x52494646, false);
  // file length minus RIFF identifier length and file description length
  view.setUint32(4, 36 + pcmData.length, true);
  // RIFF type 'WAVE'
  view.setUint32(8, 0x57415645, false);
  // format chunk identifier 'fmt '
  view.setUint32(12, 0x666d7420, false);
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (raw)
  view.setUint16(20, 1, true);
  // channel count
  view.setUint16(22, numChannels, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate (sample rate * block align)
  view.setUint32(28, sampleRate * numChannels * 2, true);
  // block align (channel count * bytes per sample)
  view.setUint16(32, numChannels * 2, true);
  // bits per sample
  view.setUint16(34, 16, true);
  // data chunk identifier 'data'
  view.setUint32(36, 0x64617461, false);
  // data chunk length
  view.setUint32(40, pcmData.length, true);

  // Write PCM samples
  new Uint8Array(buffer, 44).set(pcmData);

  return new Blob([buffer], { type: 'audio/wav' });
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  

  // Llama a Gemini TTS y reproduce el audio
  const sendTextToGeminiTTS = async (text: string) => {
    setIsLoading(true);
    try {
      
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      const transcript = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents:text,
        config: {
          systemInstruction: "You are an therapist agent that help users with his problems and speak in spanish. When the problem is so hard recommend phonenumber to call a professional or emergency services",
        }
      })
      const response_model = transcript.candidates?.[0]?.content?.parts?.[0]?.text
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: response_model,
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Achird' },
            },
          },
        },
      });
      const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (data) {
        const audioBytes = Uint8Array.from(atob(data), c => c.charCodeAt(0));
        const audioBlob = pcmToWav(audioBytes);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      }
      const assistantMessage: Message = {
        role: 'assistant',
        content: response_model,
        timestamp: new Date(),
        type: 'text',
      }
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      alert('Error al generar audio con Gemini TTS');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendTextMessage = async () => {
    if (!inputMessage.trim() || !selectedAvatar) return;
    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
      type: 'text',
    };
    setMessages(prev => [...prev, userMessage]);
    await sendTextToGeminiTTS(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

  const resetChat = () => {
    setSelectedAvatar(null);
    setMessages([]);
    setInputMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 md:left-80 bg-slate-900/95 backdrop-blur-sm z-50 flex">
      {/* Avatar Selection Screen */}
      {!selectedAvatar && (
        <div className="w-full flex items-center justify-center p-6">
          <Card className="w-full max-w-4xl bg-slate-800/90 backdrop-blur-md border-slate-600/50 rounded-3xl shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Elige tu Compañero IA</h2>
                  <p className="text-slate-300">Selecciona el avatar para conversaciones con voz nativa</p>
                  <Badge className="bg-emerald-600 text-white mt-2">
                    <Volume2 className="w-3 h-3 mr-1" />
                    Audio Nativo con Gemini 2.5
                  </Badge>
                </div>
                <Button
                  onClick={onClose}
                  className="bg-rose-900/60 hover:bg-rose-800/60 text-rose-200 border-rose-700/50 rounded-full w-12 h-12 p-0"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {avatars.map((avatar) => (
                  <Card
                    key={avatar.id}
                    className="p-6 bg-slate-700/50 border-slate-600/50 hover:bg-slate-600/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl"
                    onClick={() => setSelectedAvatar(avatar)}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${avatar.color} flex items-center justify-center text-3xl shadow-lg`}>
                        {avatar.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{avatar.name}</h3>
                        <p className="text-slate-300 text-sm">{avatar.description}</p>
                        <p className="text-slate-400 text-xs mt-1">{avatar.voice}</p>
                      </div>
                    </div>
                    <Button className="w-full bg-slate-600 hover:bg-slate-500 text-white">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Conversar con {avatar.name}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Chat Interface */}
      {selectedAvatar && (
        <div className="w-full flex flex-col bg-gradient-to-br from-slate-800 to-slate-900">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-600/50 bg-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedAvatar.color} flex items-center justify-center text-2xl shadow-lg`}>
                {selectedAvatar.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedAvatar.name}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-slate-300 text-sm">{selectedAvatar.description}</p>
                  {isLoading && (
                    <Badge className="bg-amber-600 text-white text-xs">
                      <Loader2 className="w-3 h-3 animate-spin mr-1" />
                      Generando audio...
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={resetChat}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200"
                size="sm"
              >
                Cambiar Avatar
              </Button>
              <Button
                onClick={onClose}
                className="bg-rose-900/60 hover:bg-rose-800/60 text-rose-200 border-rose-700/50 rounded-full w-10 h-10 p-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${selectedAvatar.color} flex items-center justify-center text-4xl shadow-lg mx-auto mb-4`}>
                  {selectedAvatar.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">¡Hola! Soy {selectedAvatar.name}</h3>
                <p className="text-slate-300 max-w-md mx-auto mb-4">{selectedAvatar.description}</p>
                  <div className="flex items-center justify-center gap-2 text-emerald-400">
                    <Volume2 className="w-5 h-5" />
                    <span className="text-sm">Listo para conversación por voz</span>
                  </div>
              </div>
            )}

            {isLoading && (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
                <p className="text-slate-300">Generando audio con Gemini TTS...</p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-3xl ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg ${
                    message.role === 'user' 
                      ? 'bg-blue-500' 
                      : `bg-gradient-to-br ${selectedAvatar.color}`
                  }`}>
                    {message.role === 'user' ? <User className="w-5 h-5 text-white" /> : selectedAvatar.icon}
                  </div>
                  <div className={`p-4 rounded-2xl shadow-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-100'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-slate-600/50 bg-slate-800/50 backdrop-blur-sm">
            <div className="flex gap-4">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Escribe y escucha la respuesta de ${selectedAvatar.name}...`}
                className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                disabled={isLoading}
              />
              <Button
                onClick={sendTextMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center justify-center mt-3 gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <Volume2 className="w-3 h-3" />
                <span>Conversación por voz nativa (TTS)</span>
              </div>
              <div className="flex items-center gap-1">
                <Send className="w-3 h-3" />
                <span>Enter para enviar texto</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatModal;