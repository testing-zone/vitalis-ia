
import React from 'react';
import { Card } from '@/components/ui/card';

interface CapybaraCompanionProps {
  level: number;
  mood: 'happy' | 'neutral' | 'sad' | 'excited';
  message?: string;
}

const CapybaraCompanion: React.FC<CapybaraCompanionProps> = ({ level, mood, message }) => {
  const getMoodMessage = () => {
    switch (mood) {
      case 'happy':
        return message || "¡Qué bien lo estás haciendo! 🌟";
      case 'excited':
        return message || "¡Increíble progreso hoy! 🎉";
      case 'sad':
        return message || "Está bien tener días difíciles 💙";
      default:
        return message || "¡Sigamos adelante juntos! 🌱";
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-vitalis-cream to-vitalis-gold/20 rounded-3xl border-2 border-vitalis-gold/30 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img 
            src="/lovable-uploads/4e3febb6-c9a1-4006-b0a9-8f196c792c60.png" 
            alt="Tu compañero Capibara" 
            className="w-20 h-20 animate-float"
          />
          <div className="absolute -top-2 -right-2 bg-vitalis-gold rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold text-white shadow-lg">
            {level}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-white/80 rounded-2xl p-4 relative">
            <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white/80"></div>
            <p className="text-vitalis-brown font-medium text-sm leading-relaxed">
              {getMoodMessage()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CapybaraCompanion;
