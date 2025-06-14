
import React from 'react';
import { Card } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, trend }) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-vitalis-green';
      case 'down': return 'text-red-500';
      default: return 'text-vitalis-brown/70';
    }
  };

  const getTrendArrow = () => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  return (
    <Card className="p-4 bg-white rounded-2xl border-2 border-vitalis-gold/20 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-vitalis-brown/70 mb-1 font-medium">{title}</p>
          <p className="text-xl font-bold text-vitalis-brown">{value}</p>
          <p className={`text-xs ${getTrendColor()} flex items-center gap-1 font-medium`}>
            <span>{getTrendArrow()}</span>
            {change}
          </p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
    </Card>
  );
};

export default StatsCard;
