
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';

const ChatWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      message: '¡Hola! Soy tu asistente de bienestar. ¿En qué puedo ayudarte hoy?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

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
      return 'Entendo que te sientes ansioso. Te sugiero hacer una breve sesión de respiración profunda. ¿Te gustaría que te guíe?';
    }
    if (message.includes('triste') || message.includes('deprimido')) {
      return 'Lamento que te sientas así. Es importante que hables con alguien. ¿Has considerado contactar a un psicólogo de tu universidad?';
    }
    if (message.includes('ejercicio') || message.includes('deporte')) {
      return '¡Excelente! El ejercicio es fundamental para el bienestar. Te recomiendo empezar con 30 minutos de caminata. ¿Quieres que te programe un recordatorio?';
    }
    if (message.includes('sueño') || message.includes('dormir')) {
      return 'El buen sueño es clave para tu bienestar. Te sugiero mantener un horario regular y evitar pantallas antes de dormir. ¿Quieres tips de higiene del sueño?';
    }
    
    return 'Gracias por compartir conmigo. ¿Te gustaría explorar algún módulo específico como MindTrack o SoulBoost para trabajar en esto?';
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={() => setIsExpanded(true)}
          className="w-16 h-16 bg-vitalis-gold hover:bg-vitalis-gold-dark text-white rounded-full shadow-lg animate-pulse-glow"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 z-50">
      <Card className="bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-vitalis-gold/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-vitalis-gold/20 rounded-full flex items-center justify-center">
              🦫
            </div>
            <div>
              <h3 className="font-bold text-vitalis-brown text-sm">VitalisIA Assistant</h3>
              <p className="text-xs text-vitalis-green">En línea</p>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setIsExpanded(false)}
            className="rounded-full"
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-3 rounded-2xl ${
                message.sender === 'user' 
                  ? 'bg-vitalis-gold text-white' 
                  : 'bg-vitalis-green/10 text-vitalis-brown border border-vitalis-green/20'
              }`}>
                <p className="text-sm">{message.message}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-vitalis-brown/50'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-vitalis-gold/20">
          <div className="flex gap-2">
            <Input
              placeholder="Escribe tu mensaje..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="rounded-xl border-2 border-vitalis-gold/20 text-sm"
            />
            <Button 
              onClick={sendMessage}
              className="bg-vitalis-gold hover:bg-vitalis-gold-dark text-white rounded-xl px-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatWidget;
