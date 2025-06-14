
import React from 'react';
import { Card } from '@/components/ui/card';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  progress: number;
  xp: number;
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  gradient,
  progress,
  xp,
  onClick
}) => {
  return (
    <Card 
      className={`${gradient} p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-3xl border-2 border-white/20`}
      onClick={onClick}
    >
      <div className="text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl drop-shadow-lg">{icon}</div>
          <div className="text-right bg-white/20 rounded-2xl px-3 py-2">
            <div className="text-xs opacity-90">XP</div>
            <div className="font-bold text-lg">{xp}</div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2 drop-shadow-md">{title}</h3>
        <p className="text-sm opacity-90 mb-4">{description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progreso</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ModuleCard;
