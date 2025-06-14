import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { X, Star, Trophy, Heart, Activity, Brain, Utensils, Eye, Clock, Target } from 'lucide-react';

interface ActivityStep {
  id: number;
  type: 'instruction' | 'reflection' | 'action' | 'completion';
  title: string;
  description: string;
  icon: React.ReactNode;
  content: string;
  actionType?: 'text' | 'radio' | 'emoji-scale' | 'timer';
  options?: string[];
  emojiOptions?: { emoji: string; label: string; value: number }[];
  capybaraImage: string;
  duration?: number; // for timer activities
}

// Define activity steps based on the day
const getActivitySteps = (dayOfWeek: number): ActivityStep[] => {
  const baseSteps = [
    {
      id: 1,
      type: 'instruction' as const,
      title: 'Bienvenido a tu actividad diaria',
      description: 'Prepárate para una experiencia de bienestar personalizada',
      icon: <Star className="w-6 h-6" />,
      content: 'Hoy vamos a trabajar en tu crecimiento personal. Tómate unos minutos para conectar contigo mismo y disfrutar de este momento.',
      capybaraImage: '/img/star.png'
    },
    {
      id: 2,
      type: 'reflection' as const,
      title: '¿Cómo te sientes ahora?',
      description: 'Conecta con tu estado emocional actual',
      icon: <Heart className="w-6 h-6" />,
      content: 'Antes de comenzar, es importante que reconozcas cómo te sientes en este momento.',
      actionType: 'emoji-scale' as const,
      emojiOptions: [
        { emoji: '😢', label: 'Muy mal', value: 1 },
        { emoji: '😕', label: 'Mal', value: 2 },
        { emoji: '😐', label: 'Regular', value: 3 },
        { emoji: '😊', label: 'Bien', value: 4 },
        { emoji: '🤩', label: 'Excelente', value: 5 }
      ],
      capybaraImage: '/img/hottube.png'
    }
  ];

  // Add day-specific activities
  const daySpecificSteps: Record<number, ActivityStep[]> = {
    1: [ // Monday - Morning routine
      {
        id: 3,
        type: 'action' as const,
        title: 'Respiración consciente',
        description: 'Practica 5 respiraciones profundas',
        icon: <Brain className="w-6 h-6" />,
        content: 'Inhala profundamente por 4 segundos, mantén por 4 segundos, exhala por 6 segundos. Repite 5 veces.',
        actionType: 'timer' as const,
        duration: 60,
        capybaraImage: '/img/leaf.png'
      },
      {
        id: 4,
        type: 'reflection' as const,
        title: 'Intención del día',
        description: 'Establece tu propósito para hoy',
        icon: <Target className="w-6 h-6" />,
        content: '¿Cuál es tu intención principal para el día de hoy?',
        actionType: 'text' as const,
        capybaraImage: '/img/glasses.png'
      }
    ],
    2: [ // Tuesday - Movement
      {
        id: 3,
        type: 'action' as const,
        title: 'Activación corporal',
        description: 'Movimientos suaves para despertar el cuerpo',
        icon: <Activity className="w-6 h-6" />,
        content: 'Realiza estiramientos suaves: cuello, hombros, brazos y piernas. Escucha a tu cuerpo.',
        actionType: 'timer' as const,
        duration: 120,
        capybaraImage: '/img/jumping.png'
      },
      {
        id: 4,
        type: 'reflection' as const,
        title: '¿Cómo se siente tu cuerpo?',
        description: 'Conecta con las sensaciones físicas',
        icon: <Heart className="w-6 h-6" />,
        content: 'Después del movimiento, ¿cómo se siente tu cuerpo?',
        actionType: 'radio' as const,
        options: ['Más relajado', 'Con más energía', 'Igual que antes', 'Un poco tenso'],
        capybaraImage: '/img/te.png'
      }
    ],
    3: [ // Wednesday - Mindfulness
      {
        id: 3,
        type: 'action' as const,
        title: 'Observación mindful',
        description: 'Practica la atención plena',
        icon: <Eye className="w-6 h-6" />,
        content: 'Observa 5 cosas que puedes ver, 4 que puedes tocar, 3 que puedes oír, 2 que puedes oler, 1 que puedes saborear.',
        actionType: 'text' as const,
        capybaraImage: '/img/leaf.png'
      },
      {
        id: 4,
        type: 'reflection' as const,
        title: 'Momento de gratitud',
        description: 'Reconoce lo positivo en tu vida',
        icon: <Heart className="w-6 h-6" />,
        content: '¿Por qué tres cosas te sientes agradecido hoy?',
        actionType: 'text' as const,
        capybaraImage: '/img/star.png'
      }
    ],
    4: [ // Thursday - Social connection
      {
        id: 3,
        type: 'reflection' as const,
        title: 'Conexión social',
        description: 'Reflexiona sobre tus relaciones',
        icon: <Heart className="w-6 h-6" />,
        content: '¿A quién podrías contactar hoy para fortalecer una relación?',
        actionType: 'text' as const,
        capybaraImage: '/img/glasses.png'
      },
      {
        id: 4,
        type: 'action' as const,
        title: 'Acto de bondad',
        description: 'Planifica un gesto amable',
        icon: <Heart className="w-6 h-6" />,
        content: 'Piensa en un pequeño acto de bondad que puedas hacer hoy por alguien.',
        actionType: 'text' as const,
        capybaraImage: '/img/te.png'
      }
    ],
    5: [ // Friday - Creativity
      {
        id: 3,
        type: 'action' as const,
        title: 'Expresión creativa',
        description: 'Libera tu creatividad',
        icon: <Star className="w-6 h-6" />,
        content: 'Dedica 2 minutos a una actividad creativa: dibujar, escribir, cantar, o cualquier expresión artística.',
        actionType: 'timer' as const,
        duration: 120,
        capybaraImage: '/img/mustach.png'
      },
      {
        id: 4,
        type: 'reflection' as const,
        title: '¿Cómo te sentiste creando?',
        description: 'Reflexiona sobre tu experiencia creativa',
        icon: <Heart className="w-6 h-6" />,
        content: '¿Qué emociones experimentaste durante tu momento creativo?',
        actionType: 'emoji-scale' as const,
        emojiOptions: [
          { emoji: '😴', label: 'Aburrido', value: 1 },
          { emoji: '😐', label: 'Neutral', value: 2 },
          { emoji: '😊', label: 'Contento', value: 3 },
          { emoji: '😄', label: 'Inspirado', value: 4 },
          { emoji: '🤩', label: 'Eufórico', value: 5 }
        ],
        capybaraImage: '/img/star.png'
      }
    ],
    6: [ // Saturday - Self-care
      {
        id: 3,
        type: 'action' as const,
        title: 'Autocuidado profundo',
        description: 'Dedica tiempo a cuidarte',
        icon: <Heart className="w-6 h-6" />,
        content: 'Elige una actividad de autocuidado: un baño relajante, masaje en las manos, o simplemente descansar.',
        actionType: 'timer' as const,
        duration: 300,
        capybaraImage: '/img/hottube.png'
      },
      {
        id: 4,
        type: 'reflection' as const,
        title: '¿Qué necesitas hoy?',
        description: 'Escucha las necesidades de tu cuerpo y mente',
        icon: <Brain className="w-6 h-6" />,
        content: '¿Qué es lo que más necesitas en este momento para sentirte bien?',
        actionType: 'text' as const,
        capybaraImage: '/img/te.png'
      }
    ],
    7: [ // Sunday - Reflection
      {
        id: 3,
        type: 'reflection' as const,
        title: 'Reflexión semanal',
        description: 'Revisa tu semana',
        icon: <Trophy className="w-6 h-6" />,
        content: '¿Cuál fue el momento más significativo de tu semana?',
        actionType: 'text' as const,
        capybaraImage: '/img/glasses.png'
      },
      {
        id: 4,
        type: 'action' as const,
        title: 'Preparación para la nueva semana',
        description: 'Establece intenciones para los próximos días',
        icon: <Target className="w-6 h-6" />,
        content: '¿Qué te gustaría lograr o experimentar la próxima semana?',
        actionType: 'text' as const,
        capybaraImage: '/img/star.png'
      }
    ]
  };

  const completionStep: ActivityStep = {
    id: 5,
    type: 'completion' as const,
    title: '¡Actividad completada!',
    description: 'Has terminado tu práctica diaria',
    icon: <Trophy className="w-6 h-6" />,
    content: '¡Excelente trabajo! Has dedicado tiempo valioso a tu bienestar. Cada pequeño paso cuenta en tu journey de crecimiento personal.',
    capybaraImage: '/img/star.png'
  };

  return [...baseSteps, ...(daySpecificSteps[dayOfWeek] || daySpecificSteps[1]), completionStep];
};

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityId: number;
  onComplete: (xp: number, badge?: string) => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ 
  isOpen, 
  onClose, 
  activityId, 
  onComplete 
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Get current day of week (1-7, Monday-Sunday)
  const getDayOfWeek = () => {
    const today = new Date().getDay();
    return today === 0 ? 7 : today;
  };

  const currentDay = getDayOfWeek();
  const steps = useMemo(() => getActivitySteps(currentDay), [currentDay]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync carousel with current step index when using swipe on mobile
  useEffect(() => {
    if (carouselApi) {
      const onSelect = () => {
        const selectedIndex = carouselApi.selectedScrollSnap();
        // Only update if the index actually changed to prevent unnecessary re-renders
        setCurrentStepIndex(prev => {
          if (prev !== selectedIndex) {
            return selectedIndex;
          }
          return prev;
        });
      };

      carouselApi.on('select', onSelect);
      return () => carouselApi.off('select', onSelect);
    }
  }, [carouselApi]);

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  const handleAnswer = useCallback((stepId: number, answer: string | number) => {
    setAnswers(prev => ({ ...prev, [stepId]: answer }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      const newIndex = currentStepIndex + 1;
      setCurrentStepIndex(newIndex);
      // Use immediate scrollTo without delay
      if (carouselApi) {
        carouselApi.scrollTo(newIndex, false); // false = no smooth animation for faster transition
      }
    }
  }, [currentStepIndex, steps.length, carouselApi]);

  const handlePrevious = useCallback(() => {
    if (currentStepIndex > 0) {
      const newIndex = currentStepIndex - 1;
      setCurrentStepIndex(newIndex);
      // Use immediate scrollTo without delay
      if (carouselApi) {
        carouselApi.scrollTo(newIndex, false); // false = no smooth animation for faster transition
      }
    }
  }, [currentStepIndex, carouselApi]);

  const handleComplete = useCallback(() => {
    const xpEarned = 50 + (Object.keys(answers).length * 10);
    onComplete(xpEarned, 'Daily Journey Completed');
    onClose();
  }, [answers, onComplete, onClose]);

  const startTimer = useCallback((duration: number) => {
    setTimeRemaining(duration);
    setTimerActive(true);
  }, []);

  const isCurrentStepAnswered = useMemo(() => {
    const currentStep = steps[currentStepIndex];
    if (currentStep.type === 'instruction' || currentStep.type === 'completion') return true;
    if (currentStep.actionType === 'timer') return !timerActive && timeRemaining === 0;
    return answers[currentStep.id] !== undefined;
  }, [currentStepIndex, steps, timerActive, timeRemaining, answers]);

  const progress = ((currentStepIndex + 1) / steps.length) * 100;
  const answeredSteps = Object.keys(answers).length;

  const getDayInfo = () => {
    const days = {
      1: { name: 'Lunes', title: 'Despertar Consciente', subtitle: 'Rutina matutina mindful' },
      2: { name: 'Martes', title: 'Energía en Movimiento', subtitle: 'Activación corporal suave' },
      3: { name: 'Miércoles', title: 'Pausa Mindful', subtitle: 'Práctica de atención plena' },
      4: { name: 'Jueves', title: 'Conexión Social', subtitle: 'Fortalecimiento de relaciones' },
      5: { name: 'Viernes', title: 'Celebración Creativa', subtitle: 'Expresión y creatividad' },
      6: { name: 'Sábado', title: 'Autocuidado Profundo', subtitle: 'Tiempo de calidad personal' },
      7: { name: 'Domingo', title: 'Reflexión y Preparación', subtitle: 'Cierre y preparación semanal' }
    };
    return days[currentDay as keyof typeof days] || days[1];
  };

  const dayInfo = getDayInfo();

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[95vh] md:max-h-[90vh] flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="flex-shrink-0 p-4 md:p-6 pb-4 border-b border-vitalis-gold/20">
          <div className="space-y-2">
            <DialogTitle className="text-xl md:text-2xl font-bold text-vitalis-brown">
              {dayInfo.name} - {dayInfo.title} ✨
            </DialogTitle>
            <p className="text-xs md:text-sm text-vitalis-brown/70">
              Paso {currentStepIndex + 1} de {steps.length} • {dayInfo.subtitle}
            </p>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </DialogHeader>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <Carousel
            className="w-full h-full"
            setApi={setCarouselApi}
            opts={{
              align: "center",
              loop: false,
              watchDrag: isMobile,
              duration: 15, // Faster transition duration (default is 25)
              skipSnaps: false,
              dragFree: false,
              containScroll: "trimSnaps"
            }}
          >
            <CarouselContent>
              {steps.map((step) => (
                <CarouselItem key={step.id}>
                  <div className="h-full max-h-[60vh] md:max-h-[50vh] overflow-y-auto p-4 md:p-6">
                    <Card className="w-full max-w-md mx-auto border-2 border-vitalis-gold/20">
                      <CardContent className="p-4 md:p-6 space-y-6">
                        {/* Capybara Image */}
                        <div className="relative w-full h-28 md:h-36 bg-gradient-to-br from-vitalis-cream to-vitalis-green-light/20 rounded-2xl overflow-hidden">
                          <img
                            src={step.capybaraImage}
                            alt="Capybara companion"
                            className="w-full h-full object-contain p-2"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                        </div>

                        {/* Step Header */}
                        <div className="text-center space-y-3">
                          <div className="mx-auto w-12 h-12 bg-vitalis-gold/10 rounded-full flex items-center justify-center text-vitalis-gold">
                            {step.icon}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {step.type === 'instruction' ? 'Instrucción' : 
                             step.type === 'reflection' ? 'Reflexión' : 
                             step.type === 'action' ? 'Acción' : 'Completado'}
                          </Badge>
                          <h3 className="text-lg md:text-xl font-bold text-vitalis-brown">{step.title}</h3>
                          <p className="text-sm text-vitalis-brown/70">
                            {step.description}
                          </p>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                          <p className="text-sm text-vitalis-brown/80 text-center leading-relaxed">
                            {step.content}
                          </p>

                          {/* Action Section */}
                          {step.actionType === 'emoji-scale' && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-5 gap-2">
                                {step.emojiOptions?.map((option, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleAnswer(step.id, option.value)}
                                    className={`
                                      relative w-full aspect-square rounded-full border-3 transition-all duration-300 transform
                                      ${answers[step.id] === option.value 
                                        ? 'border-vitalis-gold bg-vitalis-gold/20 scale-110 shadow-lg shadow-vitalis-gold/30' 
                                        : 'border-gray-200 hover:border-vitalis-gold/50 hover:scale-105 hover:bg-vitalis-gold/5'
                                      }
                                      active:scale-95 flex items-center justify-center
                                    `}
                                  >
                                    <span className="text-xl md:text-2xl">{option.emoji}</span>
                                    {answers[step.id] === option.value && (
                                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                                        <div className="w-2 h-2 bg-vitalis-gold rounded-full animate-pulse" />
                                      </div>
                                    )}
                                  </button>
                                ))}
                              </div>
                              {answers[step.id] !== undefined && (
                                <div className="text-center">
                                  <p className="text-sm font-semibold text-vitalis-brown bg-vitalis-gold/10 rounded-full px-4 py-2 mx-auto inline-block">
                                    {step.emojiOptions?.find(opt => opt.value === answers[step.id])?.label}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {step.actionType === 'radio' && (
                            <div className="space-y-3">
                              {step.options?.map((option, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleAnswer(step.id, option)}
                                  className={`
                                    w-full p-3 rounded-xl border-2 text-left transition-all duration-300 transform
                                    ${answers[step.id] === option 
                                      ? 'border-vitalis-gold bg-vitalis-gold/10 shadow-md scale-[1.02]' 
                                      : 'border-gray-200 hover:border-vitalis-gold/50 hover:bg-vitalis-gold/5 hover:scale-[1.01]'
                                    }
                                    active:scale-95
                                  `}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-vitalis-brown font-medium">
                                      {option}
                                    </span>
                                    <div className={`
                                      w-5 h-5 rounded-full border-2 transition-all duration-300
                                      ${answers[step.id] === option 
                                        ? 'border-vitalis-gold bg-vitalis-gold' 
                                        : 'border-gray-300'
                                      }
                                    `}>
                                      {answers[step.id] === option && (
                                        <div className="w-full h-full rounded-full bg-white scale-[0.4]" />
                                      )}
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}

                          {step.actionType === 'text' && (
                            <div className="space-y-4">
                              <Textarea
                                placeholder="Escribe tu reflexión aquí..."
                                value={answers[step.id] as string || ''}
                                onChange={(e) => handleAnswer(step.id, e.target.value)}
                                className="min-h-[80px] resize-none border-2 border-gray-200 focus:border-vitalis-gold rounded-xl p-3 text-sm"
                              />
                            </div>
                          )}

                          {step.actionType === 'timer' && (
                            <div className="space-y-4 text-center">
                              {!timerActive && timeRemaining === 0 && (
                                <Button
                                  onClick={() => startTimer(step.duration || 60)}
                                  className="bg-vitalis-gold hover:bg-vitalis-gold/90 text-white"
                                >
                                  <Clock className="w-4 h-4 mr-2" />
                                  Comenzar ({step.duration}s)
                                </Button>
                              )}
                              {(timerActive || timeRemaining > 0) && (
                                <div className="space-y-2">
                                  <div className="text-3xl font-bold text-vitalis-gold">
                                    {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                                  </div>
                                  <Progress value={((step.duration! - timeRemaining) / step.duration!) * 100} className="w-full" />
                                  {timeRemaining === 0 && (
                                    <p className="text-sm text-green-600 font-semibold">¡Completado! ✅</p>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {step.type === 'completion' && (
                            <div className="text-center space-y-4">
                              <div className="w-16 h-16 bg-gradient-to-br from-vitalis-gold to-vitalis-gold-dark rounded-full flex items-center justify-center mx-auto animate-pulse">
                                <Trophy className="w-8 h-8 text-white" />
                              </div>
                              <Badge className="bg-vitalis-gold text-white">
                                +{50 + (answeredSteps * 10)} XP ganados
                              </Badge>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 md:p-6 pt-4 border-t border-vitalis-gold/20">
          <div className="flex items-center justify-between">
            <div className="text-xs md:text-sm text-vitalis-brown/70">
              {answeredSteps} pasos completados
              {isMobile && (
                <div className="text-xs text-vitalis-brown/50 mt-1">
                  Desliza para navegar entre pasos
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {/* Show navigation buttons only on desktop */}
              {!isMobile && (
                <>
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStepIndex === 0}
                    className="min-w-20"
                  >
                    Anterior
                  </Button>
                  {currentStepIndex === steps.length - 1 ? (
                    <Button
                      onClick={handleComplete}
                      className="min-w-20 bg-vitalis-gold hover:bg-vitalis-gold/90"
                    >
                      Completar
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={!isCurrentStepAnswered}
                      className="min-w-20 bg-vitalis-gold hover:bg-vitalis-gold/90"
                    >
                      Siguiente
                    </Button>
                  )}
                </>
              )}
              
              {/* Show only complete button on mobile when on last step */}
              {isMobile && currentStepIndex === steps.length - 1 && (
                <Button
                  onClick={handleComplete}
                  className="min-w-20 bg-vitalis-gold hover:bg-vitalis-gold/90"
                >
                  Completar
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityModal; 