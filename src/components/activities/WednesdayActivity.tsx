import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Timer, CheckCircle, Sparkles, Pause, Play, RotateCcw } from 'lucide-react';

interface WednesdayActivityProps {
  onComplete: (xp: number, badge?: string) => void;
}

interface ZenPattern {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

const WednesdayActivity: React.FC<WednesdayActivityProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentStep, setCurrentStep] = useState<'intro' | 'drawing' | 'meditation' | 'complete'>('intro');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMeditating, setIsMeditating] = useState(false);
  const [meditationTime, setMeditationTime] = useState(0);
  const [meditationDuration] = useState(300); // 5 minutes
  const [timeRemaining, setTimeRemaining] = useState(720); // 12 minutes
  const [zenMessage, setZenMessage] = useState('');
  const [brushSize, setBrushSize] = useState([3]);
  const [patterns, setPatterns] = useState<ZenPattern[]>([
    { id: 1, name: 'Círculos de Calma', description: 'Dibuja círculos concéntricos', completed: false },
    { id: 2, name: 'Ondas de Serenidad', description: 'Crea patrones ondulados', completed: false },
    { id: 3, name: 'Espirales de Paz', description: 'Traza espirales relajantes', completed: false }
  ]);
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [breathingCount, setBreathingCount] = useState(0);

  const zenMessages = {
    intro: "Namaste 🐨 Soy Zen, tu guía hacia la paz interior. Hoy crearemos un jardín zen digital donde cada trazo será una meditación en movimiento. La arena dorada espera tus patrones de serenidad.",
    drawing: "Respira profundamente mientras dibujas. Cada línea que traces es un momento de mindfulness. No busques la perfección, busca la presencia. Deja que tu intuición guíe el pincel.",
    meditation: "Ahora cierra los ojos y sumérgete en la meditación guiada. Mientras meditas, los patrones que creaste se iluminarán con luz dorada, representando la paz que cultivas en tu interior.",
    complete: "Has encontrado tu centro. Los patrones que creaste son únicos, como tu camino hacia la paz interior. Lleva esta serenidad contigo durante el resto del día. 🌟"
  };

  const breathingInstructions = {
    inhale: "Inhala profundamente... 4 segundos",
    hold: "Mantén la respiración... 7 segundos", 
    exhale: "Exhala lentamente... 8 segundos",
    pause: "Pausa natural... 2 segundos"
  };

  const breathingDurations = {
    inhale: 4000,
    hold: 7000,
    exhale: 8000,
    pause: 2000
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
    } else if (currentStep === 'drawing') {
      setZenMessage(zenMessages.drawing);
    } else if (currentStep === 'meditation') {
      setZenMessage(zenMessages.meditation);
    } else if (currentStep === 'complete') {
      setZenMessage(zenMessages.complete);
    }
  }, [currentStep]);

  useEffect(() => {
    if (isMeditating) {
      const meditationTimer = setInterval(() => {
        setMeditationTime(prev => {
          if (prev >= meditationDuration) {
            setIsMeditating(false);
            setCurrentStep('complete');
            setTimeout(() => {
              onComplete(70, 'Maestro Zen');
            }, 2000);
            return meditationDuration;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(meditationTimer);
    }
  }, [isMeditating, meditationDuration, onComplete]);

  useEffect(() => {
    if (isMeditating) {
      const breathingTimer = setInterval(() => {
        setBreathingPhase(prev => {
          const phases: Array<'inhale' | 'hold' | 'exhale' | 'pause'> = ['inhale', 'hold', 'exhale', 'pause'];
          const currentIndex = phases.indexOf(prev);
          const nextIndex = (currentIndex + 1) % phases.length;
          
          if (nextIndex === 0) {
            setBreathingCount(count => count + 1);
          }
          
          return phases[nextIndex];
        });
      }, breathingDurations[breathingPhase]);

      return () => clearInterval(breathingTimer);
    }
  }, [isMeditating, breathingPhase]);

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create sand texture background
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    );
    gradient.addColorStop(0, '#f7e6a3');
    gradient.addColorStop(0.5, '#f4d03f');
    gradient.addColorStop(1, '#e6b800');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle texture
    for (let i = 0; i < 1000; i++) {
      ctx.fillStyle = `rgba(218, 165, 32, ${Math.random() * 0.1})`;
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = brushSize[0];
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Add golden particles effect
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = `rgba(255, 215, 0, ${Math.random() * 0.5})`;
      ctx.fillRect(
        x + (Math.random() - 0.5) * 20,
        y + (Math.random() - 0.5) * 20,
        2, 2
      );
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
  };

  const clearCanvas = () => {
    initializeCanvas();
  };

  const handleStartDrawing = () => {
    setCurrentStep('drawing');
    setTimeout(() => {
      initializeCanvas();
    }, 100);
  };

  const handleStartMeditation = () => {
    setCurrentStep('meditation');
    setIsMeditating(true);
    setMeditationTime(0);
    setBreathingCount(0);
    setBreathingPhase('inhale');
  };

  const toggleMeditation = () => {
    setIsMeditating(!isMeditating);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingCircleScale = () => {
    switch (breathingPhase) {
      case 'inhale': return 'scale-110';
      case 'hold': return 'scale-110';
      case 'exhale': return 'scale-75';
      case 'pause': return 'scale-75';
      default: return 'scale-100';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Zen and Timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
            🐨
          </div>
          <div>
            <h3 className="text-xl font-bold text-vitalis-brown">Miércoles - Centro y Equilibrio</h3>
            <p className="text-vitalis-brown/70">Jardín Zen Digital</p>
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
      <Card className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-lg flex-shrink-0">
            🐨
          </div>
          <div className="flex-1">
            <p className="text-gray-800 leading-relaxed">{zenMessage}</p>
          </div>
        </div>
      </Card>

      {currentStep === 'intro' && (
        <div className="space-y-6">
          {/* Zen Garden Preview */}
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200">
            <h4 className="text-lg font-semibold text-amber-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Tu Jardín Zen Digital
            </h4>
            <div className="grid grid-cols-3 gap-4">
              {patterns.map((pattern) => (
                <div key={pattern.id} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-300 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h5 className="font-medium text-gray-700 text-sm">{pattern.name}</h5>
                  <p className="text-xs text-gray-500 mt-1">{pattern.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Benefits */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-2">Beneficios del Jardín Zen:</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Reduce el estrés y la ansiedad</li>
              <li>• Mejora la concentración y el enfoque</li>
              <li>• Cultiva la paciencia y la mindfulness</li>
              <li>• Conecta con tu creatividad interior</li>
            </ul>
          </Card>

          <Button 
            onClick={handleStartDrawing}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white py-3 rounded-xl shadow-lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Comenzar a Crear Patrones Zen
          </Button>
        </div>
      )}

      {currentStep === 'drawing' && (
        <div className="space-y-6">
          {/* Drawing Tools */}
          <Card className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-semibold text-amber-800">Herramientas Zen</h5>
              <Button
                onClick={clearCanvas}
                variant="outline"
                size="sm"
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Limpiar Arena
              </Button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-amber-700 mb-2 block">
                  Tamaño del Pincel: {brushSize[0]}px
                </label>
                <Slider
                  value={brushSize}
                  onValueChange={setBrushSize}
                  max={20}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          {/* Canvas */}
          <Card className="p-4 bg-gradient-to-br from-amber-100 to-yellow-100 border-2 border-amber-300">
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              className="w-full h-80 border-2 border-amber-400 rounded-xl cursor-crosshair shadow-inner"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
            <p className="text-center text-amber-700 text-sm mt-2">
              Dibuja patrones circulares en la arena dorada. Respira profundamente con cada trazo.
            </p>
          </Card>

          <Button 
            onClick={handleStartMeditation}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-xl shadow-lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Continuar con Meditación Guiada
          </Button>
        </div>
      )}

      {currentStep === 'meditation' && (
        <div className="space-y-6">
          {/* Meditation Progress */}
          <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
            <div className="text-center mb-6">
              <h4 className="text-xl font-bold text-indigo-800 mb-2">Meditación Guiada</h4>
              <p className="text-indigo-600">
                {formatTime(meditationTime)} / {formatTime(meditationDuration)}
              </p>
              <div className="w-full bg-indigo-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(meditationTime / meditationDuration) * 100}%` }}
                />
              </div>
            </div>

            {/* Breathing Guide */}
            <div className="text-center space-y-6">
              <div className={`w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full mx-auto flex items-center justify-center shadow-2xl transition-transform duration-1000 ${getBreathingCircleScale()}`}>
                <span className="text-white text-4xl">🫁</span>
              </div>
              
              <div>
                <h5 className="text-lg font-semibold text-indigo-800 mb-2">
                  {breathingInstructions[breathingPhase]}
                </h5>
                <p className="text-indigo-600 text-sm">
                  Ciclo de respiración: {breathingCount + 1}
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={toggleMeditation}
                  variant="outline"
                  className="border-indigo-300 text-indigo-700 hover:bg-indigo-100"
                >
                  {isMeditating ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Continuar
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Meditation Tips */}
          <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
            <h5 className="font-semibold text-green-800 mb-2">Consejos para la Meditación:</h5>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Mantén los ojos cerrados o semi-cerrados</li>
              <li>• Sigue el ritmo de respiración 4-7-8</li>
              <li>• Si tu mente divaga, regresa suavemente a la respiración</li>
              <li>• Visualiza los patrones que creaste iluminándose</li>
            </ul>
          </Card>
        </div>
      )}

      {currentStep === 'complete' && (
        <div className="space-y-6 text-center">
          {/* Success Animation */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
              <span className="text-4xl">🧘‍♂️</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            {/* Zen particles */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full animate-ping"
                style={{
                  left: `${50 + Math.cos(i * Math.PI / 6) * 70}%`,
                  top: `${50 + Math.sin(i * Math.PI / 6) * 70}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>

          <div>
            <h4 className="text-2xl font-bold text-vitalis-brown mb-2">¡Paz Interior Alcanzada!</h4>
            <p className="text-vitalis-brown/70 mb-4">Has completado tu jardín zen y meditación guiada</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200">
                <div className="text-2xl mb-2">🎨</div>
                <h5 className="font-semibold text-amber-800 text-sm">Patrones Zen Creados</h5>
                <p className="text-xs text-amber-600 mt-1">Arte meditativo único</p>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
                <div className="text-2xl mb-2">🧘‍♂️</div>
                <h5 className="font-semibold text-indigo-800 text-sm">Meditación Completada</h5>
                <p className="text-xs text-indigo-600 mt-1">{formatTime(meditationDuration)} de mindfulness</p>
              </Card>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Badge className="bg-vitalis-gold text-white px-4 py-2">
              +70 XP
            </Badge>
            <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2">
              🏆 Maestro Zen
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default WednesdayActivity; 