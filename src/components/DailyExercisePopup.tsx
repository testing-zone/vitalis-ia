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
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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
  answerType: 'scale' | 'radio' | 'text';
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: string[];
  capybaraImage: string;
}

const questions: Question[] = [
  {
    id: 1,
    type: 'mood',
    title: '¿Cómo te sientes hoy?',
    description: 'Desliza para seleccionar tu estado de ánimo actual',
    icon: <Heart className="w-6 h-6" />,
    answerType: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: ['😢 Muy mal', '😕 Mal', '😐 Regular', '😊 Bien', '🤩 Excelente'],
    capybaraImage: '/img/star.png'
  },
  {
    id: 2,
    type: 'mood',
    title: '¿Cuál es tu nivel de energía?',
    description: 'Indica qué tan enérgico te sientes',
    icon: <Activity className="w-6 h-6" />,
    answerType: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: ['🔋 Muy bajo', '🔋 Bajo', '🔋 Normal', '🔋 Alto', '⚡ Muy alto'],
    capybaraImage: '/img/jumping.png'
  },
  {
    id: 3,
    type: 'mood',
    title: '¿Cómo está tu nivel de estrés?',
    description: 'Evalúa tu nivel de estrés en este momento',
    icon: <Brain className="w-6 h-6" />,
    answerType: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: ['😌 Muy relajado', '😊 Relajado', '😐 Normal', '😬 Estresado', '😰 Muy estresado'],
    capybaraImage: '/img/hottube.png'
  },
  {
    id: 4,
    type: 'wellness',
    title: '¿Hiciste ejercicio hoy?',
    description: 'Selecciona si realizaste algún tipo de actividad física',
    icon: <Activity className="w-6 h-6" />,
    answerType: 'radio',
    options: ['Sí, ejercicio intenso', 'Sí, ejercicio ligero', 'Solo caminé', 'No hice ejercicio'],
    capybaraImage: '/img/glasses.png'
  },
  {
    id: 5,
    type: 'wellness',
    title: '¿Cómo fue tu alimentación hoy?',
    description: 'Reflexiona sobre tus hábitos alimenticios del día',
    icon: <Utensils className="w-6 h-6" />,
    answerType: 'radio',
    options: ['Muy saludable', 'Bastante saludable', 'Regular', 'Poco saludable'],
    capybaraImage: '/img/te.png'
  },
  {
    id: 6,
    type: 'mindfulness',
    title: 'Ejercicio de Atención Plena',
    description: 'Mira a tu alrededor y enumera 5 cosas que puedas ver',
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

  const renderQuestion = (question: Question) => {
    const answer = answers[question.id];

    return (
      <div className="w-full max-w-md mx-auto h-full flex flex-col">
        <Card className="flex-1 border-2 border-vitalis-gold/20 overflow-hidden">
          <CardContent className="p-4 md:p-6 h-full flex flex-col">
            {/* Capybara Image */}
            <div className="flex-shrink-0 mb-4">
              <div className="relative w-full h-32 md:h-40 bg-gradient-to-br from-vitalis-cream to-vitalis-green-light/20 rounded-2xl overflow-hidden">
                <img
                  src={question.capybaraImage}
                  alt="Capybara companion"
                  className="w-full h-full object-contain p-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
              </div>
            </div>

            {/* Question Header */}
            <div className="flex-shrink-0 text-center space-y-2 mb-4">
              <div className="mx-auto w-10 h-10 bg-vitalis-gold/10 rounded-full flex items-center justify-center text-vitalis-gold">
                {question.icon}
              </div>
              <Badge variant="outline" className="text-xs">
                {question.type === 'mood' ? 'Estado de Ánimo' : 
                 question.type === 'wellness' ? 'Bienestar' : 'Mindfulness'}
              </Badge>
              <h3 className="text-lg md:text-xl font-bold text-vitalis-brown">{question.title}</h3>
              <p className="text-xs md:text-sm text-vitalis-brown/70">
                {isMobile ? question.description.replace('Desliza', 'Desliza') : question.description.replace('Desliza', 'Selecciona')}
              </p>
            </div>

            {/* Scrollable Answer Section */}
            <div className="flex-1 overflow-y-auto min-h-0 pr-2">
              <div className="space-y-4">
                {question.answerType === 'scale' && (
                  <div className="space-y-4">
                    <Slider
                      value={[answer as number || question.scaleMin || 1]}
                      onValueChange={(value) => handleAnswer(question.id, value[0])}
                      max={question.scaleMax}
                      min={question.scaleMin}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-center">
                      <p className="text-sm md:text-lg font-semibold text-vitalis-brown">
                        {question.scaleLabels?.[((answer as number) || question.scaleMin || 1) - 1]}
                      </p>
                    </div>
                  </div>
                )}

                {question.answerType === 'radio' && (
                  <RadioGroup
                    value={answer as string}
                    onValueChange={(value) => handleAnswer(question.id, value)}
                    className="space-y-3"
                  >
                    {question.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                        <Label 
                          htmlFor={`${question.id}-${index}`}
                          className="text-xs md:text-sm text-vitalis-brown cursor-pointer leading-relaxed"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {question.answerType === 'text' && (
                  <Textarea
                    placeholder="Escribe aquí lo que observas..."
                    value={answer as string || ''}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    className="min-h-[80px] md:min-h-[100px] resize-none text-sm"
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full h-[95vh] md:h-[90vh] flex flex-col p-0">
        <DialogHeader className="flex-shrink-0 p-4 md:p-6 pb-4 border-b border-vitalis-gold/20">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-xl md:text-2xl font-bold text-vitalis-brown">
                ¡Completa tu ejercicio diario! 🌟
              </DialogTitle>
              <p className="text-xs md:text-sm text-vitalis-brown/70">
                Pregunta {currentQuestionIndex + 1} de {questions.length}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </DialogHeader>

        <div className="flex-1 p-4 md:p-6 overflow-hidden min-h-0">
          <Carousel
            className="w-full h-full"
            setApi={setCarouselApi}
            opts={{
              align: "center",
              loop: false,
              watchDrag: isMobile, // Only enable dragging on mobile
            }}
          >
            <CarouselContent className="h-full">
              {questions.map((question) => (
                <CarouselItem key={question.id} className="h-full">
                  {renderQuestion(question)}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

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