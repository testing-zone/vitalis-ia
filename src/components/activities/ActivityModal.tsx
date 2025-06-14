import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Trophy, Star } from 'lucide-react';

// Import the new comprehensive daily activity component
import DailyActivity from './DailyActivity';

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityId: number;
  onComplete: (xp: number, badge?: string) => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ 
  isOpen, 
  onClose, 
  activityId, 
  onComplete 
}) => {
  const [isCompleting, setIsCompleting] = useState(false);

  if (!isOpen) return null;

  const getDayOfWeek = () => {
    const today = new Date().getDay();
    return today === 0 ? 7 : today; // Convert Sunday (0) to 7
  };

  const currentDay = getDayOfWeek();

  const getDayInfo = () => {
    const days = {
      1: { name: 'Lunes', title: 'Despertar Consciente', subtitle: 'Rutina matutina consciente' },
      2: { name: 'Martes', title: 'Energía en Movimiento', subtitle: 'Activación corporal suave' },
      3: { name: 'Miércoles', title: 'Pausa Mindful', subtitle: 'Práctica de mindfulness' },
      4: { name: 'Jueves', title: 'Conexión Social', subtitle: 'Fortalecimiento de relaciones' },
      5: { name: 'Viernes', title: 'Celebración Creativa', subtitle: 'Expresión y creatividad' },
      6: { name: 'Sábado', title: 'Autocuidado Profundo', subtitle: 'Tiempo de calidad personal' },
      7: { name: 'Domingo', title: 'Reflexión y Preparación', subtitle: 'Cierre y preparación semanal' }
    };
    return days[currentDay as keyof typeof days] || days[1];
  };

  const handleActivityComplete = async (xp: number, badge?: string) => {
    setIsCompleting(true);
    
    // Simulate completion animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onComplete(xp, badge);
    setIsCompleting(false);
    onClose();
  };

  const dayInfo = getDayInfo();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[95vh] overflow-hidden bg-white border-2 border-blue-200 shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-blue-200 bg-gradient-to-r from-blue-100 to-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-blue-800">{dayInfo.name} - {dayInfo.title}</h2>
              <p className="text-blue-600 text-xs sm:text-sm">{dayInfo.subtitle}</p>
            </div>
          </div>
          
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="rounded-full w-8 h-8 sm:w-10 sm:h-10 hover:bg-blue-200/50 text-blue-600"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        {/* Activity Content */}
        <div className="flex-1 overflow-y-auto max-h-[calc(95vh-80px)]">
          {isCompleting ? (
            <div className="flex flex-col items-center justify-center h-96 space-y-4 bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-blue-800 mb-2">¡Completando Actividad!</h3>
                <p className="text-blue-600">Procesando tu progreso...</p>
              </div>
            </div>
          ) : (
            <DailyActivity onComplete={handleActivityComplete} />
          )}
        </div>
      </Card>
    </div>
  );
};

export default ActivityModal; 