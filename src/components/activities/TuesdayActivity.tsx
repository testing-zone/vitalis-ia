import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Timer, CheckCircle, Sparkles, RotateCcw, Circle } from 'lucide-react';

interface TuesdayActivityProps {
  onComplete: (xp: number, badge?: string) => void;
}

interface MovementPattern {
  id: number;
  name: string;
  description: string;
  pattern: 'circle' | 'eight' | 'zigzag' | 'spiral';
  duration: number;
  completed: boolean;
}

const TuesdayActivity: React.FC<TuesdayActivityProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'dancing' | 'complete'>('intro');
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followProgress, setFollowProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
  const [lunaMessage, setLunaMessage] = useState('');
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  const patterns: MovementPattern[] = [
    {
      id: 1,
      name: 'Círculo de Energía',
      description: 'Sigue el movimiento circular de Luna para activar tu energía',
      pattern: 'circle',
      duration: 30,
      completed: false
    },
    {
      id: 2,
      name: 'Infinito de Transformación',
      description: 'Dibuja un ocho en el aire para simbolizar el cambio continuo',
      pattern: 'eight',
      duration: 35,
      completed: false
    },
    {
      id: 3,
      name: 'Zigzag de Libertad',
      description: 'Movimientos libres y espontáneos como el vuelo de una mariposa',
      pattern: 'zigzag',
      duration: 40,
      completed: false
    },
    {
      id: 4,
      name: 'Espiral de Crecimiento',
      description: 'Movimiento en espiral que representa tu evolución personal',
      pattern: 'spiral',
      duration: 45,
      completed: false
    }
  ];

  const [movementPatterns, setMovementPatterns] = useState(patterns);

  const lunaMessages = {
    intro: "¡Hola, soy Luna! 🦋 Hoy vamos a despertar tu energía con la Danza de la Mariposa. Cada movimiento que hagas liberará partículas doradas de transformación. ¿Estás listo para volar conmigo?",
    circle: "Imagina que eres una mariposa volando en círculos perfectos. Siente cómo la energía fluye por todo tu cuerpo mientras sigues mi vuelo. ¡Deja que tu espíritu se eleve!",
    eight: "Ahora dibujemos el símbolo del infinito en el aire. Este movimiento representa la transformación eterna. Con cada ocho que traces, liberas viejas energías y abrazas nuevas posibilidades.",
    zigzag: "¡Es hora de la libertad total! Muévete como te nazca, sin restricciones. Los zigzags representan la espontaneidad de la vida. ¡Deja que tu cuerpo exprese su alegría!",
    spiral: "Finalmente, creemos una espiral de crecimiento. Cada vuelta representa un nivel más alto de conciencia. Siente cómo asciendes hacia tu mejor versión.",
    complete: "¡Increíble! Has completado la Danza de la Mariposa. Tu energía ahora brilla como partículas doradas. Has liberado tu espíritu y activado tu poder de transformación. 🌟✨"
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
    } else if (currentStep === 'dancing') {
      const currentPattern = movementPatterns[currentPatternIndex];
      if (currentPattern) {
        setLunaMessage(lunaMessages[currentPattern.pattern]);
      }
    } else if (currentStep === 'complete') {
      setLunaMessage(lunaMessages.complete);
    }
  }, [currentStep, currentPatternIndex, movementPatterns]);

  const handleStartDancing = () => {
    setCurrentStep('dancing');
  };

  const handleStartPattern = () => {
    setIsFollowing(true);
    setFollowProgress(0);
    
    const currentPattern = movementPatterns[currentPatternIndex];
    const progressInterval = setInterval(() => {
      setFollowProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          handlePatternComplete();
          return 100;
        }
        return prev + (100 / (currentPattern.duration * 10)); // Update every 100ms
      });
    }, 100);

    // Generate particles during movement
    const particleInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100
        };
        setParticles(prev => [...prev.slice(-10), newParticle]); // Keep only last 10 particles
      }
    }, 200);

    setTimeout(() => {
      clearInterval(particleInterval);
    }, currentPattern.duration * 1000);
  };

  const handlePatternComplete = () => {
    setIsFollowing(false);
    setMovementPatterns(prev => prev.map((pattern, index) => 
      index === currentPatternIndex ? { ...pattern, completed: true } : pattern
    ));

    setTimeout(() => {
      if (currentPatternIndex < movementPatterns.length - 1) {
        setCurrentPatternIndex(prev => prev + 1);
        setFollowProgress(0);
      } else {
        setCurrentStep('complete');
        setTimeout(() => {
          onComplete(60, 'Alas de Libertad');
        }, 2000);
      }
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPatternIcon = (pattern: string) => {
    switch (pattern) {
      case 'circle': return '⭕';
      case 'eight': return '∞';
      case 'zigzag': return '⚡';
      case 'spiral': return '🌀';
      default: return '✨';
    }
  };

  const currentPattern = movementPatterns[currentPatternIndex];

  return (
    <div className="p-6 space-y-6 relative overflow-hidden">
      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: '2s'
          }}
        />
      ))}

      {/* Header with Luna and Timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full flex items-center justify-center text-2xl shadow-lg animate-pulse">
            🦋
          </div>
          <div>
            <h3 className="text-xl font-bold text-vitalis-brown">Martes - Energía en Movimiento</h3>
            <p className="text-vitalis-brown/70">Danza de la Mariposa</p>
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
          {/* Movement Patterns Preview */}
          <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
            <h4 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Patrones de Movimiento
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {movementPatterns.map((pattern) => (
                <div key={pattern.id} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg text-2xl">
                    {getPatternIcon(pattern.pattern)}
                  </div>
                  <h5 className="font-medium text-gray-700 text-sm">{pattern.name}</h5>
                  <p className="text-xs text-gray-500 mt-1">{pattern.duration}s</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Benefits */}
          <Card className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
            <h5 className="font-semibold text-emerald-800 mb-2">Beneficios de la Danza:</h5>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Activa la energía corporal y mental</li>
              <li>• Libera endorfinas naturales</li>
              <li>• Mejora la coordinación y flexibilidad</li>
              <li>• Conecta cuerpo, mente y espíritu</li>
            </ul>
          </Card>

          <Button 
            onClick={handleStartDancing}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 rounded-xl shadow-lg"
          >
            <Zap className="w-5 h-5 mr-2" />
            Comenzar la Danza de la Mariposa
          </Button>
        </div>
      )}

      {currentStep === 'dancing' && currentPattern && (
        <div className="space-y-6">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2">
            {movementPatterns.map((pattern, index) => (
              <div
                key={pattern.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  pattern.completed ? 'bg-green-500' :
                  index === currentPatternIndex ? 'bg-purple-500 animate-pulse' :
                  'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Current Pattern */}
          <Card className="p-6 bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-4xl">
                {getPatternIcon(currentPattern.pattern)}
              </div>
              <h4 className="text-xl font-bold text-purple-800">{currentPattern.name}</h4>
              <p className="text-purple-600">{currentPattern.description}</p>
            </div>

            {isFollowing && (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-purple-700 mb-2">Siguiendo el patrón...</p>
                  <Progress value={followProgress} className="w-full h-3" />
                  <p className="text-xs text-purple-600 mt-1">{Math.round(followProgress)}% completado</p>
                </div>
                
                {/* Visual Movement Guide */}
                <div className="relative h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border-2 border-purple-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl animate-bounce">🦋</div>
                  </div>
                  {/* Movement trail effect */}
                  <div className="absolute inset-0">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-ping"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + (i % 2) * 40}%`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>

          {!isFollowing && (
            <Button 
              onClick={handleStartPattern}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 rounded-xl shadow-lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Seguir Patrón: {currentPattern.name}
            </Button>
          )}

          {currentPattern.completed && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <p className="text-green-700 font-medium">¡Patrón completado!</p>
            </div>
          )}
        </div>
      )}

      {currentStep === 'complete' && (
        <div className="space-y-6 text-center">
          {/* Success Animation */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
              <div className="text-4xl">🦋</div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            {/* Floating particles around */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"
                style={{
                  left: `${50 + Math.cos(i * Math.PI / 4) * 60}%`,
                  top: `${50 + Math.sin(i * Math.PI / 4) * 60}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>

          <div>
            <h4 className="text-2xl font-bold text-vitalis-brown mb-2">¡Transformación Completa!</h4>
            <p className="text-vitalis-brown/70 mb-4">Has liberado tu energía con la Danza de la Mariposa</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {movementPatterns.map((pattern) => (
                <Card key={pattern.id} className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                  <div className="text-2xl mb-1">{getPatternIcon(pattern.pattern)}</div>
                  <h5 className="font-semibold text-purple-800 text-xs">{pattern.name}</h5>
                  <div className="flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Badge className="bg-vitalis-gold text-white px-4 py-2">
              +60 XP
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
              🏆 Alas de Libertad
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default TuesdayActivity; 