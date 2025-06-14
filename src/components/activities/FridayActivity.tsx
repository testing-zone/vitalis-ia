import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Palette, Timer, CheckCircle, Sparkles, Music, FileText } from 'lucide-react';

interface FridayActivityProps {
  onComplete: (xp: number, badge?: string) => void;
}

const FridayActivity: React.FC<FridayActivityProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'creating' | 'complete'>('intro');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [emotionText, setEmotionText] = useState('');
  const [achievements, setAchievements] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes
  const [lunaMessage, setLunaMessage] = useState('');

  const emotionColors = [
    { color: '#FF6B6B', emotion: 'Alegría', description: 'Momentos de felicidad' },
    { color: '#4ECDC4', emotion: 'Calma', description: 'Paz interior' },
    { color: '#45B7D1', emotion: 'Inspiración', description: 'Creatividad fluye' },
    { color: '#96CEB4', emotion: 'Esperanza', description: 'Optimismo brillante' },
    { color: '#FFEAA7', emotion: 'Energía', description: 'Vitalidad radiante' },
    { color: '#DDA0DD', emotion: 'Amor', description: 'Conexión profunda' },
    { color: '#FFB347', emotion: 'Gratitud', description: 'Aprecio sincero' },
    { color: '#87CEEB', emotion: 'Serenidad', description: 'Tranquilidad total' }
  ];

  const lunaMessages = {
    intro: "¡Hola, soy Luna! 🦋 Hoy es viernes, día de celebrar tu creatividad y expresión. Vamos a crear un lienzo de emociones que capture la esencia de tu semana. Cada color que elijas contará tu historia única.",
    creating: "Deja que tu creatividad vuele libre como mis alas. No hay respuestas correctas o incorrectas, solo tu verdad expresada en colores y palabras. Cada trazo es una celebración de tu ser auténtico.",
    complete: "¡Qué obra de arte tan hermosa has creado! Tu lienzo de emociones es único, como tú. Has transformado tus experiencias en arte puro. Lleva esta creatividad contigo siempre. ✨🎨"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentStep === 'intro') {
      setLunaMessage(lunaMessages.intro);
    } else if (currentStep === 'creating') {
      setLunaMessage(lunaMessages.creating);
    } else if (currentStep === 'complete') {
      setLunaMessage(lunaMessages.complete);
    }
  }, [currentStep]);

  const handleStartCreating = () => {
    setCurrentStep('creating');
  };

  const handleColorSelect = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(prev => prev.filter(c => c !== color));
    } else if (selectedColors.length < 5) {
      setSelectedColors(prev => [...prev, color]);
    }
  };

  const handleAddAchievement = (achievement: string) => {
    if (achievement.trim() && achievements.length < 3) {
      setAchievements(prev => [...prev, achievement.trim()]);
    }
  };

  const handleComplete = () => {
    setCurrentStep('complete');
    setTimeout(() => {
      onComplete(80, 'Artista del Alma');
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSelectedEmotions = () => {
    return emotionColors.filter(ec => selectedColors.includes(ec.color));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Luna and Timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full flex items-center justify-center text-2xl shadow-lg animate-pulse">
            🦋
          </div>
          <div>
            <h3 className="text-xl font-bold text-vitalis-brown">Viernes - Creatividad y Expresión</h3>
            <p className="text-vitalis-brown/70">Lienzo de Emociones</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-vitalis-gold" />
          <Badge variant="outline" className="border-vitalis-gold text-vitalis-gold">
            {formatTime(timeRemaining)}
          </Badge>
        </div>
      </div>

      {/* Luna's Message */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-lg flex-shrink-0">
            🦋
          </div>
          <div className="flex-1">
            <p className="text-purple-800 leading-relaxed">{lunaMessage}</p>
          </div>
        </div>
      </Card>

      {currentStep === 'intro' && (
        <div className="space-y-6">
          {/* Creative Tools Preview */}
          <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
            <h4 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Tu Kit Creativo
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h5 className="font-medium text-gray-700 text-sm">Paleta de Emociones</h5>
                <p className="text-xs text-gray-500 mt-1">8 colores únicos</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h5 className="font-medium text-gray-700 text-sm">Escritura Libre</h5>
                <p className="text-xs text-gray-500 mt-1">Expresión sin límites</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h5 className="font-medium text-gray-700 text-sm">Celebración</h5>
                <p className="text-xs text-gray-500 mt-1">Reconoce tus logros</p>
              </div>
            </div>
          </Card>

          {/* Benefits */}
          <Card className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
            <h5 className="font-semibold text-emerald-800 mb-2">Beneficios de la Expresión Creativa:</h5>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Libera emociones de manera saludable</li>
              <li>• Estimula la creatividad y la imaginación</li>
              <li>• Mejora el autoconocimiento</li>
              <li>• Celebra tus logros y crecimiento</li>
            </ul>
          </Card>

          <Button 
            onClick={handleStartCreating}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 rounded-xl shadow-lg"
          >
            <Palette className="w-5 h-5 mr-2" />
            Comenzar a Crear mi Lienzo
          </Button>
        </div>
      )}

      {currentStep === 'creating' && (
        <div className="space-y-6">
          {/* Color Palette */}
          <Card className="p-6 bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200">
            <h4 className="text-lg font-semibold text-purple-800 mb-4">Paleta de Emociones de la Semana</h4>
            <p className="text-purple-600 text-sm mb-4">Selecciona hasta 5 colores que representen tus emociones esta semana:</p>
            
            <div className="grid grid-cols-4 gap-3 mb-4">
              {emotionColors.map((ec) => (
                <button
                  key={ec.color}
                  onClick={() => handleColorSelect(ec.color)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                    selectedColors.includes(ec.color) 
                      ? 'border-purple-500 scale-105 shadow-lg' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  style={{ backgroundColor: ec.color + '20' }}
                >
                  <div 
                    className="w-8 h-8 rounded-full mx-auto mb-2 shadow-md"
                    style={{ backgroundColor: ec.color }}
                  />
                  <h6 className="text-xs font-medium text-gray-700">{ec.emotion}</h6>
                  <p className="text-xs text-gray-500">{ec.description}</p>
                </button>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-purple-600">
                Colores seleccionados: {selectedColors.length}/5
              </p>
            </div>
          </Card>

          {/* Selected Colors Display */}
          {selectedColors.length > 0 && (
            <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
              <h5 className="font-semibold text-purple-800 mb-3">Tu Paleta Emocional:</h5>
              <div className="flex gap-2 flex-wrap">
                {getSelectedEmotions().map((ec) => (
                  <div key={ec.color} className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: ec.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">{ec.emotion}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Emotion Text */}
          <Card className="p-6 bg-gradient-to-br from-white to-pink-50 border-2 border-pink-200">
            <h4 className="text-lg font-semibold text-pink-800 mb-4">Escritura Libre</h4>
            <p className="text-pink-600 text-sm mb-4">Escribe libremente sobre tu semana. No te detengas, deja que fluyan tus pensamientos:</p>
            
            <Textarea
              placeholder="Esta semana he sentido... He aprendido... Me siento agradecido por... Mañana quiero..."
              value={emotionText}
              onChange={(e) => setEmotionText(e.target.value)}
              className="min-h-[150px] border-2 border-pink-200 focus:border-pink-400 rounded-xl"
            />
          </Card>

          {/* Achievements */}
          <Card className="p-6 bg-gradient-to-br from-white to-green-50 border-2 border-green-200">
            <h4 className="text-lg font-semibold text-green-800 mb-4">Celebración de Logros</h4>
            <p className="text-green-600 text-sm mb-4">Reconoce 3 cosas que lograste esta semana (grandes o pequeñas):</p>
            
            <div className="space-y-3">
              {[1, 2, 3].map((num) => (
                <div key={num}>
                  <input
                    type="text"
                    placeholder={`Logro ${num}: Ej: Completé una tarea difícil, ayudé a alguien...`}
                    className="w-full p-3 border-2 border-green-200 focus:border-green-400 rounded-xl"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddAchievement(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              ))}
            </div>

            {achievements.length > 0 && (
              <div className="mt-4">
                <h6 className="font-medium text-green-800 mb-2">Tus Logros:</h6>
                <ul className="space-y-1">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          <Button 
            onClick={handleComplete}
            disabled={selectedColors.length === 0 || emotionText.trim() === ''}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 rounded-xl shadow-lg disabled:opacity-50"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Completar mi Obra de Arte
          </Button>
        </div>
      )}

      {currentStep === 'complete' && (
        <div className="space-y-6 text-center">
          {/* Success Animation */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
              <span className="text-4xl">🎨</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            {/* Creative particles */}
            {selectedColors.map((color, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full animate-ping"
                style={{
                  backgroundColor: color,
                  left: `${50 + Math.cos(i * Math.PI / 3) * 60}%`,
                  top: `${50 + Math.sin(i * Math.PI / 3) * 60}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>

          <div>
            <h4 className="text-2xl font-bold text-vitalis-brown mb-2">¡Obra Maestra Creada!</h4>
            <p className="text-vitalis-brown/70 mb-4">Has expresado tu semana en un hermoso lienzo de emociones</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                <div className="text-2xl mb-2">🎨</div>
                <h5 className="font-semibold text-purple-800 text-sm">Colores Emocionales</h5>
                <p className="text-xs text-purple-600 mt-1">{selectedColors.length} emociones expresadas</p>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                <div className="text-2xl mb-2">🏆</div>
                <h5 className="font-semibold text-green-800 text-sm">Logros Celebrados</h5>
                <p className="text-xs text-green-600 mt-1">{achievements.length} éxitos reconocidos</p>
              </Card>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Badge className="bg-vitalis-gold text-white px-4 py-2">
              +80 XP
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
              🏆 Artista del Alma
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default FridayActivity; 