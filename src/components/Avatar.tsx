
import React from 'react';

interface AvatarProps {
  level: number;
  mood: 'happy' | 'neutral' | 'sad' | 'excited';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ level, mood, className = '' }) => {
  const getMoodExpression = () => {
    switch (mood) {
      case 'happy':
        return '😊';
      case 'excited':
        return '🤩';
      case 'sad':
        return '😔';
      default:
        return '😌';
    }
  };

  const getAvatarColor = () => {
    if (level >= 20) return 'bg-gradient-to-br from-vitalis-gold to-vitalis-brown';
    if (level >= 15) return 'bg-gradient-to-br from-vitalis-gold-light to-vitalis-gold';
    if (level >= 10) return 'bg-gradient-to-br from-vitalis-green to-vitalis-green-light';
    if (level >= 5) return 'bg-gradient-to-br from-vitalis-green-light to-vitalis-green';
    return 'bg-gradient-to-br from-gray-400 to-gray-600';
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`w-20 h-20 rounded-full ${getAvatarColor()} flex items-center justify-center text-3xl animate-float shadow-lg border-2 border-vitalis-brown`}>
        {getMoodExpression()}
      </div>
      <div className="absolute -top-2 -right-2 bg-vitalis-cream rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold text-vitalis-brown shadow-md border border-vitalis-gold">
        {level}
      </div>
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gradient-vitalis rounded-full px-2 py-1 text-xs text-white font-medium">
        Nivel {level}
      </div>
    </div>
  );
};

export default Avatar;
