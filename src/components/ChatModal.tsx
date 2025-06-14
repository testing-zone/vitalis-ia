import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  X, 
  Minimize2,
  Maximize2,
  Sparkles
} from 'lucide-react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      message: '¡Hola! Soy tu asistente personal de bienestar VitalisIA. ¿En qué puedo ayudarte hoy? 🌟',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      message: currentMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        message: getBotResponse(currentMessage),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('ansiedad') || message.includes('ansioso')) {
      return 'Entiendo que te sientes ansioso. La ansiedad es algo que muchos experimentamos. Te sugiero hacer una breve sesión de respiración profunda. ¿Te gustaría que te guíe a través de un ejercicio de respiración?';
    }
    if (message.includes('triste') || message.includes('deprimido')) {
      return 'Lamento que te sientas así. Es completamente válido sentirse triste a veces. Recuerda que no estás solo en esto. ¿Has considerado contactar a un psicólogo de tu universidad? También puedes activar tu red de apoyo desde el botón de emergencia.';
    }
    if (message.includes('ejercicio') || message.includes('deporte')) {
      return '¡Excelente! El ejercicio es fundamental para el bienestar mental y físico. Te recomiendo empezar con 30 minutos de actividad moderada. ¿Quieres que te programe un recordatorio o te sugiera algunas actividades del Journey Map?';
    }
    if (message.includes('sueño') || message.includes('dormir')) {
      return 'El buen sueño es clave para tu bienestar. Te sugiero mantener un horario regular, evitar pantallas antes de dormir y crear un ambiente relajante. ¿Quieres que agreguemos esto a tu Journey Map como una actividad diaria?';
    }
    if (message.includes('amigos') || message.includes('social')) {
      return 'Las conexiones sociales son muy importantes para nuestro bienestar. ¿Has revisado tu sección de amigos en la app? Puedes conectar con tus contactos de confianza o hacer nuevas conexiones saludables.';
    }
    if (message.includes('journey') || message.includes('actividades')) {
      return 'El Journey Map es una excelente herramienta para tu crecimiento personal. Cada actividad está diseñada para ayudarte a desarrollar diferentes aspectos de tu bienestar. ¿Te gustaría que te explique alguna actividad específica?';
    }
    
    return 'Gracias por compartir conmigo. Recuerda que estoy aquí para apoyarte en tu journey de bienestar. ¿Te gustaría explorar algún módulo específico como MindTrack, BodySync, SoulBoost o SocialHarmony?';
  };

  const quickSuggestions = [
    "¿Cómo puedo manejar el estrés?",
    "Ayúdame con ejercicios de respiración",
    "¿Qué actividades me recomiendas hoy?",
    "Necesito motivación"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-3xl shadow-2xl transition-all duration-300 ${
        isMinimized ? 'w-80 h-20' : 'w-full max-w-4xl h-[80vh]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-vitalis-gold/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-vitalis-gold to-vitalis-green rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-vitalis-brown">VitalisIA Assistant</h3>
              <p className="text-xs text-vitalis-green">Siempre aquí para ti</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setIsMinimized(!isMinimized)}
              className="rounded-full"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={onClose}
              className="rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4" style={{ height: 'calc(80vh - 160px)' }}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md p-4 rounded-2xl ${
                      message.sender === 'user' 
                        ? 'bg-vitalis-gold text-white' 
                        : 'bg-vitalis-green/10 text-vitalis-brown border border-vitalis-green/20'
                    }`}>
                      <div className="flex items-start gap-2">
                        {message.sender === 'bot' && (
                          <Bot className="w-4 h-4 text-vitalis-green mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">{message.message}</p>
                          <p className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-white/70' : 'text-vitalis-brown/50'
                          }`}>
                            {message.time}
                          </p>
                        </div>
                        {message.sender === 'user' && (
                          <User className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Quick Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-vitalis-brown/60 mb-2">Sugerencias rápidas:</p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-full border-vitalis-gold/20 hover:bg-vitalis-gold/10"
                      onClick={() => setCurrentMessage(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-vitalis-gold/20">
              <div className="flex gap-3">
                <Input
                  placeholder="Escribe tu mensaje..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="rounded-2xl border-2 border-vitalis-gold/20 focus:border-vitalis-gold"
                />
                <Button 
                  onClick={sendMessage}
                  className="bg-vitalis-gold hover:bg-vitalis-gold-dark text-white rounded-2xl px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatModal; 