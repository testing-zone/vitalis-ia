import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer, CheckCircle, Sparkles, Play, Pause } from 'lucide-react';

interface SaturdayActivityProps {
  onComplete: (xp: number, badge?: string) => void;
}

interface Treatment {
  id: number;
  name: string;
  description: string;
  duration: number;
  icon: string;
  completed: boolean;
}

const SaturdayActivity: React.FC<SaturdayActivityProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'spa' | 'complete'>('intro');
  const [treatments, setTreatments] = useState<Treatment[]>([
    { id: 1, name: 'Masaje Facial Virtual', description: 'Sigue los patrones en pantalla', duration: 180, icon: '💆‍♀️', completed: false },
    { id: 2, name: 'Baño de Luz Dorada', description: 'Meditación con visualización', duration: 240, icon: '✨', completed: false },
    { id: 3, name: 'Aromaterapia Digital', description: 'Respiración consciente', duration: 120, icon: '🌸', completed: false },
    { id: 4, name: 'Música Relajante', description: 'Sonidos de la naturaleza', duration: 300, icon: '🎵', completed: false }
  ]);
  const [currentTreatmentIndex, setCurrentTreatmentIndex] = useState(0);
  const [treatmentProgress, setTreatmentProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes
  const [zenMessage, setZenMessage] = useState('');

  const zenMessages = {
    intro: "Bienvenido al Spa Virtual Dorado 🐨✨ Soy Zen, tu guía de relajación. Hoy es sábado, día perfecto para renovar tu energía. Prepárate para una experiencia de autocuidado que nutrirá tu cuerpo, mente y alma.",
    spa: "Respira profundamente y permite que cada tratamiento te lleve a un estado de paz profunda. Tu bienestar es sagrado, y este momento es solo tuyo. Deja que la tranquilidad fluya por todo tu ser.",
    complete: "Has completado tu sesión de spa virtual. Tu energía está renovada y tu espíritu brilla con luz dorada. Lleva esta sensación de paz y autocuidado contigo durante el resto del día. 🌟"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentStep === 'intro') {
      setZenMessage(zenMessages.intro);
    } else if (currentStep === 'spa') {
      setZenMessage(zenMessages.spa);
    } else if (currentStep === 'complete') {
      setZenMessage(zenMessages.complete);
    }
  }, [currentStep]);

  useEffect(() => {
    if (isActive && currentStep === 'spa') {
      const interval = setInterval(() => {
        setTreatmentProgress(prev => {
          const currentTreatment = treatments[currentTreatmentIndex];
          if (prev >= 100) {
            setTreatments(prevTreatments => 
              prevTreatments.map((t, index) => 
                index === currentTreatmentIndex ? { ...t, completed: true } : t
              )
            );
            setIsActive(false);
            return 100;
          }
          return prev + (100 / (currentTreatment.duration / 10));
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isActive, currentTreatmentIndex, treatments, currentStep]);

  const handleStartSpa = () => {
    setCurrentStep('spa');
  };

  const handleStartTreatment = () => {
    setIsActive(true);
    setTreatmentProgress(0);
  };

  const handleNextTreatment = () => {
    if (currentTreatmentIndex < treatments.length - 1) {
      setCurrentTreatmentIndex(prev => prev + 1);
      setTreatmentProgress(0);
    } else {
      setCurrentStep('complete');
      setTimeout(() => {
        onComplete(65, 'Maestro del Autocuidado');
      }, 2000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTreatment = treatments[currentTreatmentIndex];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full flex items-center justify-center text-2xl shadow-lg">
            🐨
          </div>
          <div>
            <h3 className="text-xl font-bold text-vitalis-brown">Sábado - Renovación y Autocuidado</h3>
            <p className="text-vitalis-brown/70">Spa Virtual Dorado</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-vitalis-gold" />
          <Badge variant="outline" className="border-vitalis-gold text-vitalis-gold">
            {formatTime(timeRemaining)}
          </Badge>
        </div>
      </div>

      {/* Zen's Message */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-lg flex-shrink-0">
            🐨
          </div>
          <div className="flex-1">
            <p className="text-blue-800 leading-relaxed">{zenMessage}</p>
          </div>
        </div>
      </Card>

      {currentStep === 'intro' && (
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200">
            <h4 className="text-lg font-semibold text-amber-800 mb-4">Tratamientos Disponibles</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {treatments.map((treatment) => (
                <div key={treatment.id} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-300 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg text-2xl">
                    {treatment.icon}
                  </div>
                  <h5 className="font-medium text-gray-700 text-sm">{treatment.name}</h5>
                  <p className="text-xs text-gray-500 mt-1">{formatTime(treatment.duration)}</p>
                </div>
              ))}
            </div>
          </Card>

          <Button 
            onClick={handleStartSpa}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl shadow-lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Comenzar Sesión de Spa
          </Button>
        </div>
      )}

      {currentStep === 'spa' && currentTreatment && (
        <div className="space-y-6">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2">
            {treatments.map((treatment, index) => (
              <div
                key={treatment.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  treatment.completed ? 'bg-green-500' :
                  index === currentTreatmentIndex ? 'bg-blue-500 animate-pulse' :
                  'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Current Treatment */}
          <Card className="p-6 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-4xl">
                {currentTreatment.icon}
              </div>
              <h4 className="text-xl font-bold text-blue-800">{currentTreatment.name}</h4>
              <p className="text-blue-600">{currentTreatment.description}</p>
            </div>

            {isActive && (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-blue-700 mb-2">Disfrutando del tratamiento...</p>
                  <div className="w-full bg-blue-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-100"
                      style={{ width: `${treatmentProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-blue-600 mt-1">{Math.round(treatmentProgress)}% completado</p>
                </div>
              </div>
            )}
          </Card>

          {!isActive && !currentTreatment.completed && (
            <Button 
              onClick={handleStartTreatment}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl shadow-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Iniciar {currentTreatment.name}
            </Button>
          )}

          {currentTreatment.completed && (
            <Button 
              onClick={handleNextTreatment}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl shadow-lg"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {currentTreatmentIndex < treatments.length - 1 ? 'Siguiente Tratamiento' : 'Completar Spa'}
            </Button>
          )}
        </div>
      )}

      {currentStep === 'complete' && (
        <div className="space-y-6 text-center">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
              <span className="text-4xl">🧘‍♀️</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>

          <div>
            <h4 className="text-2xl font-bold text-vitalis-brown mb-2">¡Renovación Completa!</h4>
            <p className="text-vitalis-brown/70 mb-4">Has completado tu sesión de spa virtual</p>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Badge className="bg-vitalis-gold text-white px-4 py-2">+65 XP</Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2">🏆 Maestro del Autocuidado</Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaturdayActivity; 