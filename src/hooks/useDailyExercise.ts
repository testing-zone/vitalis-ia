import { useState, useEffect } from 'react';

export interface DailyExerciseAnswer {
  questionId: number;
  answer: string | number;
  timestamp: Date;
}

export interface DailyExerciseState {
  date: string;
  completed: boolean;
  answers: DailyExerciseAnswer[];
}

export const useDailyExercise = () => {
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [exerciseState, setExerciseState] = useState<DailyExerciseState | null>(null);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedState = localStorage.getItem('daily-exercise-state');
    
    if (storedState) {
      const parsedState: DailyExerciseState = JSON.parse(storedState);
      
      // Si es un nuevo día, mostrar el popup
      if (parsedState.date !== today) {
        setShouldShowPopup(true);
        const newState: DailyExerciseState = {
          date: today,
          completed: false,
          answers: []
        };
        setExerciseState(newState);
        localStorage.setItem('daily-exercise-state', JSON.stringify(newState));
      } else {
        // Si es el mismo día, verificar si ya se completó
        setExerciseState(parsedState);
        setShouldShowPopup(!parsedState.completed);
      }
    } else {
      // Primera vez usando la app
      setShouldShowPopup(true);
      const newState: DailyExerciseState = {
        date: today,
        completed: false,
        answers: []
      };
      setExerciseState(newState);
      localStorage.setItem('daily-exercise-state', JSON.stringify(newState));
    }
  }, []);

  const completeExercise = (answers: DailyExerciseAnswer[]) => {
    if (!exerciseState) return;

    const updatedState: DailyExerciseState = {
      ...exerciseState,
      completed: true,
      answers
    };
    
    setExerciseState(updatedState);
    setShouldShowPopup(false);
    localStorage.setItem('daily-exercise-state', JSON.stringify(updatedState));
  };

  const dismissPopup = () => {
    setShouldShowPopup(false);
  };

  return {
    shouldShowPopup,
    exerciseState,
    completeExercise,
    dismissPopup
  };
}; 