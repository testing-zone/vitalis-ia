import { useState, useEffect } from 'react';

export interface JourneyActivity {
  id: number;
  title: string;
  description: string;
  icon: string;
  theme: 'morning' | 'exercise' | 'meditation' | 'social' | 'reflection' | 'evening';
  completed: boolean;
  locked: boolean;
  xp: number;
  day: number;
  position: { x: number; y: number };
}

export const useJourneyActivities = () => {
  const [activities, setActivities] = useState<JourneyActivity[]>([
    { 
      id: 1, 
      title: 'Check-in Matutino', 
      description: 'Comienza tu día conectando contigo mismo',
      icon: 'sunrise', 
      theme: 'morning',
      completed: false, 
      locked: false, 
      xp: 50, 
      day: 1,
      position: { x: 15, y: 80 }
    },
    { 
      id: 2, 
      title: 'Respiración Consciente', 
      description: 'Técnicas de respiración para la calma interior',
      icon: 'breath', 
      theme: 'meditation',
      completed: false, 
      locked: false, 
      xp: 75, 
      day: 1,
      position: { x: 25, y: 60 }
    },
    { 
      id: 3, 
      title: 'Ejercicio Suave', 
      description: 'Movimiento consciente para tu bienestar',
      icon: 'exercise', 
      theme: 'exercise',
      completed: false, 
      locked: false, 
      xp: 100, 
      day: 2,
      position: { x: 40, y: 45 }
    },
    { 
      id: 4, 
      title: 'Diario de Gratitud', 
      description: 'Reflexiona sobre las cosas positivas del día',
      icon: 'journal', 
      theme: 'reflection',
      completed: false, 
      locked: false, 
      xp: 60, 
      day: 2,
      position: { x: 55, y: 30 }
    },
    { 
      id: 5, 
      title: 'Conexión Social', 
      description: 'Comparte momentos significativos con otros',
      icon: 'social', 
      theme: 'social',
      completed: false, 
      locked: true, 
      xp: 80, 
      day: 3,
      position: { x: 70, y: 50 }
    },
    { 
      id: 6, 
      title: 'Onsen Mental', 
      description: 'Sumérgete en la relajación profunda',
      icon: 'onsen', 
      theme: 'meditation',
      completed: false, 
      locked: true, 
      xp: 120, 
      day: 3,
      position: { x: 85, y: 35 }
    }
  ]);

  // Cargar actividades del localStorage al inicializar
  useEffect(() => {
    const savedActivities = localStorage.getItem('journey-activities');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
  }, []);

  // Guardar actividades en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('journey-activities', JSON.stringify(activities));
  }, [activities]);

  const completeActivity = (activityId: number) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === activityId 
          ? { ...activity, completed: true }
          : activity
      )
    );
  };

  const unlockActivity = (activityId: number) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === activityId 
          ? { ...activity, locked: false }
          : activity
      )
    );
  };

  const resetDailyActivities = () => {
    // Resetear solo las actividades completadas, mantener el estado de desbloqueado
    setActivities(prev => 
      prev.map(activity => ({ 
        ...activity, 
        completed: false 
      }))
    );
  };

  const getCompletedCount = () => {
    return activities.filter(activity => activity.completed).length;
  };

  const getTotalCount = () => {
    return activities.length;
  };

  const getAvailableActivities = () => {
    return activities.filter(activity => !activity.locked);
  };

  const getUncompletedActivities = () => {
    return activities.filter(activity => !activity.completed && !activity.locked);
  };

  return {
    activities,
    completeActivity,
    unlockActivity,
    resetDailyActivities,
    getCompletedCount,
    getTotalCount,
    getAvailableActivities,
    getUncompletedActivities
  };
}; 