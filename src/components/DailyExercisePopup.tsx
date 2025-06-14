import React, { useState, useEffect } from 'react';
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
import { X, Heart, Activity, Brain, Utensils, Eye } from 'lucide-react';
import { DailyExerciseAnswer } from '@/hooks/useDailyExercise';

interface Question {
  id: number;
  type: 'mood' | 'wellness' | 'mindfulness';
  title: string;
  description: string;
  icon: React.ReactNode;
  answerType: 'emoji-scale' | 'radio' | 'text';
  options?: string[];
  emojiOptions?: { emoji: string; label: string; value: number }[];
  capybaraImage: string;
}

const questions: Question[] = [
  {
    id: 1,
    type: 'mood',
    title: '¿Cómo te sientes hoy?',
    description: 'Toca el emoji que mejor represente tu estado de ánimo',
    icon: <Heart className="w-6 h-6" />,
    answerType: 'emoji-scale',
    emojiOptions: [
      { emoji: '😢', label: 'Muy mal', value: 1 },
      { emoji: '😕', label: 'Mal', value: 2 },
      { emoji: '😐', label: 'Regular', value: 3 },
      { emoji: '😊', label: 'Bien', value: 4 },
      { emoji: '🤩', label: 'Excelente', value: 5 }
    ],
    capybaraImage: '/img/star.png'
  },
  {
    id: 2,
    type: 'mood',
    title: '¿Cuál es tu nivel de energía?',
    description: 'Selecciona qué tan enérgico te sientes',
    icon: <Activity className="w-6 h-6" />,
    answerType: 'emoji-scale',
    emojiOptions: [
      { emoji: '🔋', label: 'Muy bajo', value: 1 },
      { emoji: '🔋', label: 'Bajo', value: 2 },
      { emoji: '⚡', label: 'Normal', value: 3 },
      { emoji: '⚡', label: 'Alto', value: 4 },
      { emoji: '🔥', label: 'Muy alto', value: 5 }
    ],
    capybaraImage: '/img/jumping.png'
  },
  {
    id: 3,
    type: 'mood',
    title: '¿Cómo está tu nivel de estrés?',
    description: 'Indica tu nivel de estrés actual',
    icon: <Brain className="w-6 h-6" />,
    answerType: 'emoji-scale',
    emojiOptions: [
      { emoji: '😌', label: 'Muy relajado', value: 1 },
      { emoji: '😊', label: 'Relajado', value: 2 },
      { emoji: '😐', label: 'Normal', value: 3 },
      { emoji: '😬', label: 'Estresado', value: 4 },
      { emoji: '😰', label: 'Muy estresado', value: 5 }
    ],
    capybaraImage: '/img/hottube.png'
  },
  {
    id: 4,
    type: 'wellness',
    title: '¿Hiciste ejercicio hoy?',
    description: 'Selecciona tu nivel de actividad física',
    icon: <Activity className="w-6 h-6" />,
    answerType: 'radio',
    options: ['Sí, ejercicio intenso', 'Sí, ejercicio ligero', 'Solo caminé', 'No hice ejercicio'],
    capybaraImage: '/img/glasses.png'
  },
  {
    id: 5,
    type: 'wellness',
    title: '¿Cómo fue tu alimentación hoy?',
    description: 'Reflexiona sobre tus hábitos alimenticios',
    icon: <Utensils className="w-6 h-6" />,
    answerType: 'radio',
    options: ['Muy saludable', 'Bastante saludable', 'Regular', 'Poco saludable'],
    capybaraImage: '/img/te.png'
  },
  {
    id: 6,
    type: 'mindfulness',
    title: 'Ejercicio de Atención Plena',
    description: 'Enumera 5 cosas que puedas ver a tu alrededor',
    icon: <Eye className="w-6 h-6" />,
    answerType: 'text',
    capybaraImage: '/img/leaf.png'
  }
];

interface DailyExercisePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (answers: DailyExerciseAnswer[]) => void;
}

const DailyExercisePopup: React.FC<DailyExercisePopupProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync carousel with current question index when using swipe on mobile
  useEffect(() => {
    if (carouselApi) {
      const onSelect = () => {
        const selectedIndex = carouselApi.selectedScrollSnap();
        setCurrentQuestionIndex(selectedIndex);
      };

      carouselApi.on('select', onSelect);
      return () => carouselApi.off('select', onSelect);
    }
  }, [carouselApi]);

  const handleAnswer = (questionId: number, answer: string | number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      carouselApi?.scrollTo(newIndex);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      carouselApi?.scrollTo(newIndex);
    }
  };

  const handleComplete = () => {
    const exerciseAnswers: DailyExerciseAnswer[] = Object.entries(answers).map(([questionId, answer]) => ({
      questionId: parseInt(questionId),
      answer,
      timestamp: new Date()
    }));
    onComplete(exerciseAnswers);
  };

  const isCurrentQuestionAnswered = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return answers[currentQuestion.id] !== undefined;
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredQuestions = Object.keys(answers).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[95vh] md:max-h-[90vh] flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="flex-shrink-0 p-4 md:p-6 pb-4 border-b border-vitalis-gold/20">
          <div className="space-y-2">
            <DialogTitle className="text-xl md:text-2xl font-bold text-vitalis-brown">
              ¡Completa tu ejercicio diario! 🌟
            </DialogTitle>
            <p className="text-xs md:text-sm text-vitalis-brown/70">
              Pregunta {currentQuestionIndex + 1} de {questions.length}
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
            }}
          >
            <CarouselContent>
              {questions.map((question) => (
                <CarouselItem key={question.id}>
                  <div className="h-full max-h-[60vh] md:max-h-[50vh] overflow-y-auto p-4 md:p-6">
                    <Card className="w-full max-w-md mx-auto border-2 border-vitalis-gold/20">
                      <CardContent className="p-4 md:p-6 space-y-6">
                        {/* Capybara Image */}
                        <div className="relative w-full h-28 md:h-36 bg-gradient-to-br from-vitalis-cream to-vitalis-green-light/20 rounded-2xl overflow-hidden">
                          <img
                            src={question.capybaraImage}
                            alt="Capybara companion"
                            className="w-full h-full object-contain p-2"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                        </div>

                        {/* Question Header */}
                        <div className="text-center space-y-3">
                          <div className="mx-auto w-12 h-12 bg-vitalis-gold/10 rounded-full flex items-center justify-center text-vitalis-gold">
                            {question.icon}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {question.type === 'mood' ? 'Estado de Ánimo' : 
                             question.type === 'wellness' ? 'Bienestar' : 'Mindfulness'}
                          </Badge>
                          <h3 className="text-lg md:text-xl font-bold text-vitalis-brown">{question.title}</h3>
                          <p className="text-sm text-vitalis-brown/70">
                            {question.description}
                          </p>
                        </div>

                        {/* Answer Section */}
                        <div className="space-y-4">
                          {question.answerType === 'emoji-scale' && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-5 gap-2">
                                {question.emojiOptions?.map((option, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleAnswer(question.id, option.value)}
                                    className={`
                                      relative w-full aspect-square rounded-full border-3 transition-all duration-300 transform
                                      ${answers[question.id] === option.value 
                                        ? 'border-vitalis-gold bg-vitalis-gold/20 scale-110 shadow-lg shadow-vitalis-gold/30' 
                                        : 'border-gray-200 hover:border-vitalis-gold/50 hover:scale-105 hover:bg-vitalis-gold/5'
                                      }
                                      active:scale-95 flex items-center justify-center
                                    `}
                                  >
                                    <span className="text-xl md:text-2xl">{option.emoji}</span>
                                    {answers[question.id] === option.value && (
                                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                                        <div className="w-2 h-2 bg-vitalis-gold rounded-full animate-pulse" />
                                      </div>
                                    )}
                                  </button>
                                ))}
                              </div>
                              {answers[question.id] !== undefined && (
                                <div className="text-center">
                                  <p className="text-sm font-semibold text-vitalis-brown bg-vitalis-gold/10 rounded-full px-4 py-2 mx-auto inline-block">
                                    {question.emojiOptions?.find(opt => opt.value === answers[question.id])?.label}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {question.answerType === 'radio' && (
                            <div className="space-y-3">
                              {question.options?.map((option, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleAnswer(question.id, option)}
                                  className={`
                                    w-full p-3 rounded-xl border-2 text-left transition-all duration-300 transform
                                    ${answers[question.id] === option 
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
                                      ${answers[question.id] === option 
                                        ? 'border-vitalis-gold bg-vitalis-gold' 
                                        : 'border-gray-300'
                                      }
                                    `}>
                                      {answers[question.id] === option && (
                                        <div className="w-full h-full rounded-full bg-white scale-[0.4]" />
                                      )}
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}

                          {question.answerType === 'text' && (
                            <div className="space-y-4">
                              <Textarea
                                placeholder="Ejemplo: Una planta verde, mi taza de café, el cielo azul..."
                                value={answers[question.id] as string || ''}
                                onChange={(e) => handleAnswer(question.id, e.target.value)}
                                className="min-h-[80px] resize-none border-2 border-gray-200 focus:border-vitalis-gold rounded-xl p-3 text-sm"
                              />
                              <div className="flex items-center gap-2 text-xs text-vitalis-brown/50">
                                <Eye className="w-4 h-4" />
                                <span>Intenta ser específico y descriptivo</span>
                              </div>
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
              {answeredQuestions} de {questions.length} completadas
              {isMobile && (
                <div className="text-xs text-vitalis-brown/50 mt-1">
                  Desliza para navegar entre preguntas
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
                    disabled={currentQuestionIndex === 0}
                    className="min-w-20"
                  >
                    Anterior
                  </Button>
                  {currentQuestionIndex === questions.length - 1 ? (
                    <Button
                      onClick={handleComplete}
                      disabled={answeredQuestions < questions.length}
                      className="min-w-20 bg-vitalis-gold hover:bg-vitalis-gold/90"
                    >
                      Completar
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={!isCurrentQuestionAnswered()}
                      className="min-w-20 bg-vitalis-gold hover:bg-vitalis-gold/90"
                    >
                      Siguiente
                    </Button>
                  )}
                </>
              )}
              
              {/* Show only complete button on mobile when on last question */}
              {isMobile && currentQuestionIndex === questions.length - 1 && (
                <Button
                  onClick={handleComplete}
                  disabled={answeredQuestions < questions.length}
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

export default DailyExercisePopup; 