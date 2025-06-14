
import React from 'react';

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ 
  title, 
  description, 
  icon, 
  unlocked, 
  rarity 
}) => {
  const getRarityStyles = () => {
    switch (rarity) {
      case 'legendary':
        return 'bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-300';
      case 'epic':
        return 'bg-gradient-to-br from-purple-500 to-pink-500 border-purple-300';
      case 'rare':
        return 'bg-gradient-to-br from-blue-500 to-cyan-500 border-blue-300';
      default:
        return 'bg-gradient-to-br from-green-500 to-emerald-500 border-green-300';
    }
  };

  return (
    <div className={`
      relative p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer
      ${unlocked 
        ? `${getRarityStyles()} text-white shadow-lg hover:scale-105` 
        : 'bg-gray-200 border-gray-300 text-gray-500'
      }
      ${unlocked ? 'animate-pulse-glow' : ''}
    `}>
      <div className="text-center">
        <div className={`text-3xl mb-2 ${unlocked ? '' : 'grayscale'}`}>
          {icon}
        </div>
        <h4 className="font-bold text-sm mb-1">{title}</h4>
        <p className="text-xs opacity-90">{description}</p>
        
        {unlocked && (
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            ✓
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementBadge;
