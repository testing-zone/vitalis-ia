import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Heart, Users, Timer, CheckCircle, Sparkles, Send } from 'lucide-react';

interface ThursdayActivityProps {
  onComplete: (xp: number, badge?: string) => void;
}

interface Bridge {
  id: number;
  personName: string;
  appreciation: string;
  loveAction: string;
  message: string;
  completed: boolean;
}

const ThursdayActivity: React.FC<ThursdayActivityProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'building' | 'complete'>('intro');
  const [bridges, setBridges] = useState<Bridge[]>([
    { id: 1, personName: '', appreciation: '', loveAction: '', message: '', completed: false },
    { id: 2, personName: '', appreciation: '', loveAction: '', message: '', completed: false },
    { id: 3, personName: '', appreciation: '', loveAction: '', message: '', completed: false }
  ]);
  const [currentBridgeIndex, setCurrentBridgeIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(480); // 8 minutes
  const [capiMessage, setCapiMessage] = useState('');

  const capiMessages = {
    intro: "¡Hola de nuevo! 🦫 Soy Capi, y hoy construiremos puentes dorados hacia las personas que más amas. Cada puente que construyas fortalecerá tus conexiones y llenará tu corazón de gratitud y amor.",
    building: "Piensa en alguien especial mientras construyes este puente. Cada respuesta que escribas es como colocar una piedra dorada que conecta tu corazón con el suyo. El amor que das siempre regresa multiplicado.",
    complete: "¡Qué hermoso! Has construido tres puentes dorados de conexión. Estos puentes no solo existen en tu corazón, sino que pueden convertirse en acciones reales. El amor compartido es el tesoro más grande de la vida. 💖"
  };

  const bridgeQuestions = [
    {
      key: 'appreciation' as keyof Bridge,
      question: '¿Qué aprecias más de esta persona?',
      placeholder: 'Ej: Su bondad, su humor, su apoyo incondicional...',
      icon: '✨'
    },
    {
      key: 'loveAction' as keyof Bridge,
      question: '¿Cómo puedes mostrar amor hacia esta persona hoy?',
      placeholder: 'Ej: Llamarla, enviar un mensaje, hacer algo especial...',
      icon: '💝'
    },
    {
      key: 'message' as keyof Bridge,
      question: '¿Qué mensaje le enviarías desde el corazón?',
      placeholder: 'Ej: Gracias por estar siempre ahí, te amo mucho...',
      icon: '💌'
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentStep === 'intro') {
      setCapiMessage(capiMessages.intro);
    } else if (currentStep === 'building') {
      setCapiMessage(capiMessages.building);
    } else if (currentStep === 'complete') {
      setCapiMessage(capiMessages.complete);
    }
  }, [currentStep]);

  const handleStartBuilding = () => {
    setCurrentStep('building');
  };

  const handlePersonNameChange = (value: string) => {
    setBridges(prev => prev.map((bridge, index) => 
      index === currentBridgeIndex ? { ...bridge, personName: value } : bridge
    ));
  };

  const handleAnswerChange = (value: string) => {
    const currentQuestion = bridgeQuestions[currentQuestionIndex];
    setBridges(prev => prev.map((bridge, index) => 
      index === currentBridgeIndex ? { ...bridge, [currentQuestion.key]: value } : bridge
    ));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < bridgeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Complete current bridge
      setBridges(prev => prev.map((bridge, index) => 
        index === currentBridgeIndex ? { ...bridge, completed: true } : bridge
      ));

      setTimeout(() => {
        if (currentBridgeIndex < bridges.length - 1) {
          setCurrentBridgeIndex(prev => prev + 1);
          setCurrentQuestionIndex(0);
        } else {
          setCurrentStep('complete');
          setTimeout(() => {
            onComplete(55, 'Constructor de Puentes');
          }, 2000);
        }
      }, 1500);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentBridge = bridges[currentBridgeIndex];
  const currentQuestion = bridgeQuestions[currentQuestionIndex];
  const currentAnswer = currentBridge && currentQuestion ? String(currentBridge[currentQuestion.key]) : '';

  const canProceed = () => {
    if (!currentBridge) return false;
    if (currentQuestionIndex === 0) return currentBridge.personName.trim() !== '';
    return currentAnswer.trim() !== '';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Capi and Timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full flex items-center justify-center text-2xl shadow-lg animate-pulse">
            🦫
          </div>
          <div>
            <h3 className="text-xl font-bold text-vitalis-brown">Jueves - Conexión y Amor</h3>
            <p className="text-vitalis-brown/70">Puentes Dorados de Conexión</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-vitalis-gold" />
          <Badge variant="outline" className="border-vitalis-gold text-vitalis-gold">
            {formatTime(timeRemaining)}
          </Badge>
        </div>
      </div>

      {/* Capi's Message */}
      <Card className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-lg flex-shrink-0">
            🦫
          </div>
          <div className="flex-1">
            <p className="text-rose-800 leading-relaxed">{capiMessage}</p>
          </div>
        </div>
      </Card>

      {currentStep === 'intro' && (
        <div className="space-y-6">
          {/* Bridge Preview */}
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200">
            <h4 className="text-lg font-semibold text-amber-800 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Tus Puentes de Conexión
            </h4>
            <div className="grid grid-cols-3 gap-4">
              {bridges.map((bridge, index) => (
                <div key={bridge.id} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-300 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <span className="text-2xl">🌉</span>
                  </div>
                  <h5 className="font-medium text-gray-700 text-sm">Puente {index + 1}</h5>
                  <p className="text-xs text-gray-500 mt-1">Hacia alguien especial</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Benefits */}
          <Card className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
            <h5 className="font-semibold text-emerald-800 mb-2">Beneficios de Construir Puentes:</h5>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Fortalece tus relaciones más importantes</li>
              <li>• Cultiva la gratitud y el amor</li>
              <li>• Mejora tu bienestar emocional</li>
              <li>• Crea conexiones más profundas</li>
            </ul>
          </Card>

          <Button 
            onClick={handleStartBuilding}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-3 rounded-xl shadow-lg"
          >
            <Heart className="w-5 h-5 mr-2" />
            Comenzar a Construir Puentes
          </Button>
        </div>
      )}

      {currentStep === 'building' && currentBridge && (
        <div className="space-y-6">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2">
            {bridges.map((bridge, index) => (
              <div
                key={bridge.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  bridge.completed ? 'bg-green-500' :
                  index === currentBridgeIndex ? 'bg-rose-500 animate-pulse' :
                  'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Current Bridge */}
          <Card className="p-6 bg-gradient-to-br from-white to-rose-50 border-2 border-rose-200">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl">🌉</span>
              </div>
              <h4 className="text-xl font-bold text-rose-800">Puente {currentBridgeIndex + 1}</h4>
              <p className="text-rose-600">Construyendo conexión con amor</p>
            </div>

            <div className="space-y-6">
              {/* Person Name Input */}
              {currentQuestionIndex === 0 && (
                <div>
                  <label className="block text-sm font-medium text-rose-700 mb-2">
                    ¿Hacia quién quieres construir este puente?
                  </label>
                  <Input
                    placeholder="Nombre de la persona especial..."
                    value={currentBridge.personName}
                    onChange={(e) => handlePersonNameChange(e.target.value)}
                    className="border-2 border-rose-200 focus:border-rose-400 rounded-xl"
                  />
                </div>
              )}

              {/* Current Question */}
              {currentQuestionIndex > 0 && currentQuestion && (
                <div>
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{currentQuestion.icon}</div>
                    <h5 className="text-lg font-semibold text-rose-800 mb-2">
                      Para: {currentBridge.personName}
                    </h5>
                    <p className="text-rose-600">{currentQuestion.question}</p>
                  </div>
                  
                  <Textarea
                    placeholder={currentQuestion.placeholder}
                    value={currentAnswer}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    className="min-h-[120px] border-2 border-rose-200 focus:border-rose-400 rounded-xl"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Next Button */}
          <Button 
            onClick={handleNextQuestion}
            disabled={!canProceed()}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-3 rounded-xl shadow-lg disabled:opacity-50"
          >
            {currentBridge.completed ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                ¡Puente Completado!
              </>
            ) : currentQuestionIndex === bridgeQuestions.length - 1 ? (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Completar Puente
              </>
            ) : (
              <>
                <Heart className="w-5 h-5 mr-2" />
                {currentQuestionIndex === 0 ? 'Comenzar Construcción' : 'Siguiente Pregunta'}
              </>
            )}
          </Button>
        </div>
      )}

      {currentStep === 'complete' && (
        <div className="space-y-6 text-center">
          {/* Success Animation */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
              <span className="text-4xl">💖</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            {/* Love particles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full animate-ping"
                style={{
                  left: `${50 + Math.cos(i * Math.PI / 4) * 60}%`,
                  top: `${50 + Math.sin(i * Math.PI / 4) * 60}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>

          <div>
            <h4 className="text-2xl font-bold text-vitalis-brown mb-2">¡Puentes de Amor Construidos!</h4>
            <p className="text-vitalis-brown/70 mb-4">Has creado conexiones doradas con las personas que amas</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {bridges.map((bridge, index) => (
                <Card key={bridge.id} className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200">
                  <div className="text-2xl mb-2">🌉</div>
                  <h5 className="font-semibold text-rose-800 text-sm">{bridge.personName}</h5>
                  <p className="text-xs text-rose-600 mt-1 line-clamp-2">{bridge.appreciation}</p>
                  <div className="flex items-center justify-center mt-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Badge className="bg-vitalis-gold text-white px-4 py-2">
              +55 XP
            </Badge>
            <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2">
              🏆 Constructor de Puentes
            </Badge>
          </div>

          {/* Optional: Send Messages */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-2">💡 Sugerencia:</h5>
            <p className="text-sm text-blue-700">
              ¿Por qué no conviertes estos puentes en acciones reales? Envía un mensaje, haz una llamada o realiza ese gesto de amor que escribiste.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ThursdayActivity; 