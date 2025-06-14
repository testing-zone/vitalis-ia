import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Timer, CheckCircle, Sparkles, Eye, Scroll } from 'lucide-react';

interface SundayActivityProps {
  onComplete: (xp: number, badge?: string) => void;
}

interface ReflectionQuestion {
  id: number;
  question: string;
  placeholder: string;
  icon: string;
}

const SundayActivity: React.FC<SundayActivityProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'reflecting' | 'complete'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [nextWeekIntention, setNextWeekIntention] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
  const [aliciaMessage, setAliciaMessage] = useState('');

  const reflectionQuestions: ReflectionQuestion[] = [
    {
      id: 1,
      question: '¿Cuál fue tu momento más brillante esta semana?',
      placeholder: 'Describe ese momento especial que te llenó de alegría o satisfacción...',
      icon: '✨'
    },
    {
      id: 2,
      question: '¿Qué aprendiste sobre ti mismo/a?',
      placeholder: 'Reflexiona sobre los descubrimientos personales que hiciste...',
      icon: '🔍'
    },
    {
      id: 3,
      question: '¿Qué cambiarías para la próxima semana?',
      placeholder: 'Piensa en ajustes que te ayudarían a crecer y mejorar...',
      icon: '🔄'
    }
  ];

  const aliciaMessages = {
    intro: "Saludos, soy Alicia 🦉, guardiana de la sabiduría. Desde mi observatorio puedo ver toda tu semana como un hermoso paisaje. Es momento de reflexionar, aprender y prepararnos para una nueva semana llena de posibilidades.",
    reflecting: "Cada respuesta que escribas se convierte en sabiduría. No hay prisa, tómate el tiempo necesario para mirar hacia adentro. La reflexión honesta es el primer paso hacia el crecimiento personal.",
    complete: "Has creado tu pergamino de sabiduría semanal. Estas reflexiones son tesoros que te guiarán en tu camino. Lleva estos aprendizajes contigo y que iluminen tu próxima semana. 🌟📜"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentStep === 'intro') {
      setAliciaMessage(aliciaMessages.intro);
    } else if (currentStep === 'reflecting') {
      setAliciaMessage(aliciaMessages.reflecting);
    } else if (currentStep === 'complete') {
      setAliciaMessage(aliciaMessages.complete);
    }
  }, [currentStep]);

  const handleStartReflecting = () => {
    setCurrentStep('reflecting');
  };

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => prev.map((answer, index) => 
      index === currentQuestionIndex ? value : answer
    ));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < reflectionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // All questions answered, show intention setting
      setCurrentQuestionIndex(-1); // Special state for intention
    }
  };

  const handleComplete = () => {
    setCurrentStep('complete');
    setTimeout(() => {
      onComplete(75, 'Sabio Reflexivo');
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = reflectionQuestions[currentQuestionIndex];
  const canProceed = () => {
    if (currentQuestionIndex === -1) return nextWeekIntention.trim() !== '';
    return answers[currentQuestionIndex]?.trim() !== '';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full flex items-center justify-center text-2xl shadow-lg">
            🦉
          </div>
          <div>
            <h3 className="text-xl font-bold text-vitalis-brown">Domingo - Reflexión y Preparación</h3>
            <p className="text-vitalis-brown/70">Observatorio de la Sabiduría</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-vitalis-gold" />
          <Badge variant="outline" className="border-vitalis-gold text-vitalis-gold">
            {formatTime(timeRemaining)}
          </Badge>
        </div>
      </div>

      {/* Alicia's Message */}
      <Card className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-lg flex-shrink-0">
            🦉
          </div>
          <div className="flex-1">
            <p className="text-indigo-800 leading-relaxed">{aliciaMessage}</p>
          </div>
        </div>
      </Card>

      {currentStep === 'intro' && (
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200">
            <h4 className="text-lg font-semibold text-amber-800 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Vista Panorámica de tu Semana
            </h4>
            <div className="grid grid-cols-3 gap-4">
              {reflectionQuestions.map((question) => (
                <div key={question.id} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-300 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg text-2xl">
                    {question.icon}
                  </div>
                  <h5 className="font-medium text-gray-700 text-sm">Reflexión {question.id}</h5>
                  <p className="text-xs text-gray-500 mt-1">Pregunta profunda</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
            <h5 className="font-semibold text-emerald-800 mb-2">Beneficios de la Reflexión:</h5>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Aumenta el autoconocimiento</li>
              <li>• Identifica patrones y aprendizajes</li>
              <li>• Mejora la toma de decisiones</li>
              <li>• Prepara para futuros desafíos</li>
            </ul>
          </Card>

          <Button 
            onClick={handleStartReflecting}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-xl shadow-lg"
          >
            <Eye className="w-5 h-5 mr-2" />
            Subir al Observatorio
          </Button>
        </div>
      )}

      {currentStep === 'reflecting' && (
        <div className="space-y-6">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index < currentQuestionIndex || (index === 3 && currentQuestionIndex === -1) ? 'bg-green-500' :
                  index === currentQuestionIndex || (index === 3 && currentQuestionIndex === -1) ? 'bg-indigo-500 animate-pulse' :
                  'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Current Question or Intention Setting */}
          <Card className="p-6 bg-gradient-to-br from-white to-indigo-50 border-2 border-indigo-200">
            {currentQuestionIndex >= 0 && currentQuestion ? (
              <div>
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-3xl">
                    {currentQuestion.icon}
                  </div>
                  <h4 className="text-xl font-bold text-indigo-800">Reflexión {currentQuestion.id}</h4>
                  <p className="text-indigo-600">{currentQuestion.question}</p>
                </div>

                <Textarea
                  placeholder={currentQuestion.placeholder}
                  value={answers[currentQuestionIndex]}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="min-h-[150px] border-2 border-indigo-200 focus:border-indigo-400 rounded-xl"
                />
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-3xl">
                    🎯
                  </div>
                  <h4 className="text-xl font-bold text-purple-800">Intención para la Próxima Semana</h4>
                  <p className="text-purple-600">¿Qué quieres lograr o experimentar la próxima semana?</p>
                </div>

                <Textarea
                  placeholder="Mi intención para la próxima semana es... Quiero enfocarme en... Me comprometo a..."
                  value={nextWeekIntention}
                  onChange={(e) => setNextWeekIntention(e.target.value)}
                  className="min-h-[120px] border-2 border-purple-200 focus:border-purple-400 rounded-xl"
                />
              </div>
            )}
          </Card>

          <Button 
            onClick={currentQuestionIndex === -1 ? handleComplete : handleNextQuestion}
            disabled={!canProceed()}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-xl shadow-lg disabled:opacity-50"
          >
            {currentQuestionIndex === -1 ? (
              <>
                <Scroll className="w-5 h-5 mr-2" />
                Crear Pergamino de Sabiduría
              </>
            ) : currentQuestionIndex === reflectionQuestions.length - 1 ? (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Establecer Intención
              </>
            ) : (
              <>
                <Eye className="w-5 h-5 mr-2" />
                Siguiente Reflexión
              </>
            )}
          </Button>
        </div>
      )}

      {currentStep === 'complete' && (
        <div className="space-y-6 text-center">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
              <span className="text-4xl">📜</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>

          <div>
            <h4 className="text-2xl font-bold text-vitalis-brown mb-2">¡Pergamino de Sabiduría Creado!</h4>
            <p className="text-vitalis-brown/70 mb-4">Has completado tu reflexión semanal y establecido tu intención</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
                <div className="text-2xl mb-2">🔍</div>
                <h5 className="font-semibold text-indigo-800 text-sm">Reflexiones Profundas</h5>
                <p className="text-xs text-indigo-600 mt-1">{reflectionQuestions.length} preguntas respondidas</p>
              </Card>
              
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                <div className="text-2xl mb-2">🎯</div>
                <h5 className="font-semibold text-purple-800 text-sm">Intención Establecida</h5>
                <p className="text-xs text-purple-600 mt-1">Enfoque para la próxima semana</p>
              </Card>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Badge className="bg-vitalis-gold text-white px-4 py-2">+75 XP</Badge>
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2">🏆 Sabio Reflexivo</Badge>
          </div>

          <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-2">💡 Tu Pergamino de Sabiduría:</h5>
            <p className="text-sm text-blue-700">
              Tus reflexiones han sido guardadas en tu pergamino personal. Revísalo cuando necesites recordar tus aprendizajes y mantener el rumbo hacia tus objetivos.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SundayActivity; 