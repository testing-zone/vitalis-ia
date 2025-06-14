
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  icon: string;
  completed: boolean;
}

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', name: 'Beber 8 vasos de agua', icon: '💧', completed: false },
    { id: '2', name: 'Meditar 10 minutos', icon: '🧘‍♂️', completed: true },
    { id: '3', name: 'Hacer ejercicio', icon: '🏃‍♂️', completed: false },
    { id: '4', name: 'Leer 30 minutos', icon: '📚', completed: false },
    { id: '5', name: 'Dormir 8 horas', icon: '😴', completed: true },
  ]);

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const completedCount = habits.filter(h => h.completed).length;

  return (
    <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-vitalis-brown">Hábitos de Hoy</h3>
        <div className="bg-vitalis-gold/20 rounded-full px-3 py-1">
          <span className="text-vitalis-brown font-bold">{completedCount}/{habits.length}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {habits.map((habit) => (
          <div
            key={habit.id}
            onClick={() => toggleHabit(habit.id)}
            className={`
              flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300
              ${habit.completed 
                ? 'bg-vitalis-green/20 border-2 border-vitalis-green' 
                : 'bg-gray-50 border-2 border-gray-200 hover:border-vitalis-gold'
              }
            `}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all
              ${habit.completed 
                ? 'bg-vitalis-green border-vitalis-green' 
                : 'border-gray-300 hover:border-vitalis-gold'
              }
            `}>
              {habit.completed && <Check className="w-4 h-4 text-white" />}
            </div>
            
            <span className="text-2xl">{habit.icon}</span>
            
            <span className={`font-medium ${habit.completed ? 'text-vitalis-green-dark line-through' : 'text-vitalis-brown'}`}>
              {habit.name}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HabitTracker;
