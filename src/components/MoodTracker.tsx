
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);

  const moods = [
    { level: 1, emoji: '😢', label: 'Muy mal', color: 'bg-red-500' },
    { level: 2, emoji: '😔', label: 'Mal', color: 'bg-orange-500' },
    { level: 3, emoji: '😐', label: 'Normal', color: 'bg-vitalis-gold' },
    { level: 4, emoji: '😊', label: 'Bien', color: 'bg-vitalis-green' },
    { level: 5, emoji: '😄', label: 'Genial', color: 'bg-vitalis-green-light' }
  ];

  const triggers = [
    '📚 Estudios', '👨‍👩‍👧‍👦 Familia', '💕 Pareja', '🏠 Hogar',
    '💰 Dinero', '🏃‍♂️ Ejercicio', '🌦️ Clima', '😴 Sueño'
  ];

  const handleMoodSelect = (level: number) => {
    setSelectedMood(level);
  };

  const handleTriggerToggle = (trigger: string) => {
    setSelectedTriggers(prev => 
      prev.includes(trigger) 
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const handleSubmit = () => {
    if (selectedMood) {
      console.log('Mood registered:', { mood: selectedMood, triggers: selectedTriggers });
      setSelectedMood(null);
      setSelectedTriggers([]);
    }
  };

  return (
    <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-center text-vitalis-brown">¿Cómo te sientes?</h3>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          {moods.map((mood) => (
            <button
              key={mood.level}
              onClick={() => handleMoodSelect(mood.level)}
              className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 border-2 ${
                selectedMood === mood.level 
                  ? `${mood.color} text-white transform scale-110 shadow-lg border-white` 
                  : 'hover:bg-vitalis-gold/10 border-transparent hover:border-vitalis-gold'
              }`}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.label}</span>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="animate-slide-up">
            <h4 className="font-semibold mb-3 text-vitalis-brown">¿Qué influyó en tu estado?</h4>
            <div className="grid grid-cols-2 gap-2">
              {triggers.map((trigger) => (
                <button
                  key={trigger}
                  onClick={() => handleTriggerToggle(trigger)}
                  className={`p-3 rounded-2xl text-sm transition-all duration-200 border-2 ${
                    selectedTriggers.includes(trigger)
                      ? 'bg-vitalis-gold text-white border-vitalis-gold'
                      : 'bg-vitalis-cream/50 hover:bg-vitalis-gold/20 border-vitalis-gold/30 text-vitalis-brown'
                  }`}
                >
                  {trigger}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedMood && (
          <Button 
            onClick={handleSubmit}
            className="w-full bg-vitalis-gold hover:bg-vitalis-gold-dark text-white font-medium rounded-2xl py-3"
          >
            Registrar Estado
          </Button>
        )}
      </div>
    </Card>
  );
};

export default MoodTracker;
