import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Send, 
  Minimize2, 
  Maximize2,
  Bot,
  User,
  Heart,
  Brain,
  Sparkles,
  Zap
} from 'lucide-react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Avatar {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  systemPrompt: string;
}

const avatars: Avatar[] = [
  {
    id: 'wellness',
    name: 'Dr. Serenity',
    description: 'Especialista en bienestar mental y mindfulness',
    icon: '🧘‍♀️',
    color: 'from-green-400 to-emerald-500',
    systemPrompt: 'Eres Dr. Serenity, una especialista en bienestar mental y mindfulness. Eres empática, sabia y siempre ofreces consejos prácticos para el bienestar emocional. Hablas de manera calmada y comprensiva, usando técnicas de mindfulness y psicología positiva. Siempre preguntas cómo se siente la persona y ofreces ejercicios de respiración o meditación cuando es apropiado.'
  },
  {
    id: 'motivation',
    name: 'Coach Alex',
    description: 'Entrenador motivacional y de desarrollo personal',
    icon: '💪',
    color: 'from-orange-400 to-red-500',
    systemPrompt: 'Eres Coach Alex, un entrenador motivacional energético y positivo. Tu objetivo es inspirar y motivar a las personas a alcanzar sus metas. Eres directo, entusiasta y siempre ves el lado positivo de las situaciones. Ofreces estrategias prácticas para superar obstáculos y celebras cada pequeño logro. Usas un lenguaje motivador y empoderador.'
  },
  {
    id: 'wisdom',
    name: 'Sage Luna',
    description: 'Consejera sabia con enfoque holístico',
    icon: '🌙',
    color: 'from-purple-400 to-indigo-500',
    systemPrompt: 'Eres Sage Luna, una consejera sabia con un enfoque holístico de la vida. Tienes una perspectiva profunda y filosófica, conectando el bienestar mental, físico y espiritual. Hablas con sabiduría ancestral pero de manera accesible. Ofreces reflexiones profundas y ayudas a las personas a encontrar su propósito y equilibrio interior.'
  },
  {
    id: 'energy',
    name: 'Spark',
    description: 'Compañero energético y divertido',
    icon: '⚡',
    color: 'from-yellow-400 to-amber-500',
    systemPrompt: 'Eres Spark, un compañero de IA energético, divertido y lleno de vida. Eres optimista, juguetón y siempre buscas maneras de hacer sonreír a las personas. Usas humor apropiado, emojis y un lenguaje casual y amigable. Tu objetivo es levantar el ánimo y hacer que las conversaciones sean ligeras y positivas, mientras sigues siendo útil y comprensivo.'
  }
];

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

  const sendMessage = async () => {
    if (!inputMessage.trim() || !selectedAvatar || isLoading) return;

    // Check if API key is configured
    if (!process.env.NEXT_PUBLIC_TOTALGPT_API_KEY) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Lo siento, el chatbot no está configurado correctamente. Por favor, configura tu API key de TotalGPT en el archivo .env.local. Consulta el archivo README_API_SETUP.md para más información.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.totalgpt.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOTALGPT_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'Sao10K-72B-Qwen2.5-Kunou-v1-FP8-Dynamic',
          messages: [
            { role: 'system', content: selectedAvatar.systemPrompt },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: inputMessage }
          ],
          max_tokens: 7000,
          temperature: 0.7,
          top_k: 40,
          repetition_penalty: 1.2
        })
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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
                  <p className="text-slate-300">Selecciona el avatar con el que te gustaría conversar</p>
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
                      </div>
                    </div>
                    <Button className="w-full bg-slate-600 hover:bg-slate-500 text-white">
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
                <p className="text-slate-300 text-sm">{selectedAvatar.description}</p>
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
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${selectedAvatar.color} flex items-center justify-center text-4xl shadow-lg mx-auto mb-4`}>
                  {selectedAvatar.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">¡Hola! Soy {selectedAvatar.name}</h3>
                <p className="text-slate-300 max-w-md mx-auto">{selectedAvatar.description}. ¿En qué puedo ayudarte hoy?</p>
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

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedAvatar.color} flex items-center justify-center text-lg shadow-lg`}>
                    {selectedAvatar.icon}
                  </div>
                  <div className="bg-slate-700 p-4 rounded-2xl shadow-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-slate-600/50 bg-slate-800/50 backdrop-blur-sm">
            <div className="flex gap-4">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Escribe tu mensaje a ${selectedAvatar.name}...`}
                className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatModal; 