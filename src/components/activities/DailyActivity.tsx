import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Timer, CheckCircle, ArrowRight, ArrowLeft, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

interface DailyActivityProps {
  onComplete: (xp: number, badge?: string) => void;
}

interface ActivityStep {
  id: number;
  title: string;
  instruction: string;
  duration: number; // in seconds
  imageSpace?: boolean; // if true, shows space for image
  tips?: string[];
}

interface DayActivity {
  day: number;
  name: string;
  title: string;
  character: string;
  characterEmoji: string;
  description: string;
  totalXP: number;
  badge: string;
  steps: ActivityStep[];
}

const DailyActivity: React.FC<DailyActivityProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTimeRemaining, setTotalTimeRemaining] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getDayOfWeek = () => {
    const today = new Date().getDay();
    return today === 0 ? 7 : today; // Convert Sunday (0) to 7
  };

  const currentDay = getDayOfWeek();

  const dailyActivities: Record<number, DayActivity> = {
    1: { // Lunes
      day: 1,
      name: 'Lunes',
      title: 'Despertar Consciente',
      character: 'Capi',
      characterEmoji: '🦫',
      description: 'Comenzamos la semana con una rutina de despertar consciente',
      totalXP: 50,
      badge: 'Despertar Dorado',
      steps: [
        {
          id: 1,
          title: 'Respiración de Despertar',
          instruction: 'Siéntate cómodamente en tu cama. Inhala profundamente por 4 segundos, mantén por 4, exhala por 6. Repite 5 veces.',
          duration: 60,
          imageSpace: true,
          tips: ['Mantén la espalda recta', 'Cierra los ojos suavemente', 'Siente cómo el aire llena tus pulmones']
        },
        {
          id: 2,
          title: 'Estiramiento Matutino',
          instruction: 'De pie, estira los brazos hacia arriba, luego hacia los lados. Gira suavemente el cuello a ambos lados.',
          duration: 90,
          imageSpace: true,
          tips: ['Movimientos lentos y controlados', 'Escucha a tu cuerpo', 'No fuerces ningún movimiento']
        },
        {
          id: 3,
          title: 'Intención del Día',
          instruction: 'Piensa en una intención positiva para hoy. Puede ser "Seré paciente" o "Disfrutaré cada momento".',
          duration: 45,
          tips: ['Elige algo realista', 'Que sea positivo', 'Repítelo mentalmente 3 veces']
        },
        {
          id: 4,
          title: 'Gratitud Matutina',
          instruction: 'Menciona en voz alta o mentalmente 3 cosas por las que te sientes agradecido/a en este momento.',
          duration: 30,
          tips: ['Pueden ser cosas simples', 'Siente realmente la gratitud', 'Sonríe mientras las piensas']
        }
      ]
    },
    2: { // Martes
      day: 2,
      name: 'Martes',
      title: 'Energía en Movimiento',
      character: 'Luna',
      characterEmoji: '🦋',
      description: 'Activamos nuestro cuerpo con movimientos suaves y energizantes',
      totalXP: 60,
      badge: 'Mariposa Danzante',
      steps: [
        {
          id: 1,
          title: 'Calentamiento Suave',
          instruction: 'Rota los hombros hacia atrás 10 veces, luego hacia adelante 10 veces. Mueve la cabeza suavemente de lado a lado.',
          duration: 60,
          imageSpace: true,
          tips: ['Movimientos circulares amplios', 'Respira mientras te mueves', 'Siente cómo se relajan los músculos']
        },
        {
          id: 2,
          title: 'Marcha en el Lugar',
          instruction: 'Marcha en el lugar levantando las rodillas. Acompaña con movimiento de brazos como si caminaras.',
          duration: 120,
          imageSpace: true,
          tips: ['Mantén un ritmo constante', 'Levanta bien las rodillas', 'Respira de forma natural']
        },
        {
          id: 3,
          title: 'Estiramientos Laterales',
          instruction: 'Con los pies separados, estira un brazo hacia arriba y inclínate hacia el lado opuesto. Mantén 15 segundos cada lado.',
          duration: 90,
          imageSpace: true,
          tips: ['Siente el estiramiento en el costado', 'No rebotes', 'Mantén las caderas centradas']
        },
        {
          id: 4,
          title: 'Respiración Energizante',
          instruction: 'Inhala levantando los brazos, exhala bajándolos. Hazlo 10 veces con energía pero controlado.',
          duration: 60,
          tips: ['Coordina respiración y movimiento', 'Siente cómo se activa tu energía', 'Termina con una sonrisa']
        }
      ]
    },
    3: { // Miércoles
      day: 3,
      name: 'Miércoles',
      title: 'Pausa Mindful',
      character: 'Zen',
      characterEmoji: '🐨',
      description: 'Encontramos nuestro centro con una práctica de mindfulness',
      totalXP: 70,
      badge: 'Maestro del Presente',
      steps: [
        {
          id: 1,
          title: 'Postura de Meditación',
          instruction: 'Siéntate cómodamente con la espalda recta. Puedes usar una silla o el suelo. Coloca las manos sobre las rodillas.',
          duration: 30,
          imageSpace: true,
          tips: ['Espalda recta pero no rígida', 'Hombros relajados', 'Barbilla ligeramente hacia abajo']
        },
        {
          id: 2,
          title: 'Observación de la Respiración',
          instruction: 'Cierra los ojos suavemente. Observa tu respiración natural sin cambiarla. Solo nota cómo entra y sale el aire.',
          duration: 180,
          imageSpace: true,
          tips: ['No juzgues tu respiración', 'Si tu mente divaga, regresa suavemente', 'Es normal que la mente se distraiga']
        },
        {
          id: 3,
          title: 'Escaneo Corporal',
          instruction: 'Mentalmente, recorre tu cuerpo desde la cabeza hasta los pies. Nota cualquier tensión y respira hacia esa zona.',
          duration: 120,
          tips: ['Ve lentamente', 'No trates de cambiar nada', 'Solo observa y respira']
        },
        {
          id: 4,
          title: 'Regreso Consciente',
          instruction: 'Mueve suavemente los dedos de manos y pies. Abre los ojos lentamente y toma tres respiraciones profundas.',
          duration: 45,
          tips: ['Regresa gradualmente', 'Mantén la calma que encontraste', 'Sonríe suavemente']
        }
      ]
    },
    4: { // Jueves
      day: 4,
      name: 'Jueves',
      title: 'Conexión Social',
      character: 'Capi',
      characterEmoji: '🦫',
      description: 'Fortalecemos nuestras relaciones con ejercicios de conexión',
      totalXP: 55,
      badge: 'Corazón Conectado',
      steps: [
        {
          id: 1,
          title: 'Reflexión sobre Relaciones',
          instruction: 'Piensa en 3 personas importantes en tu vida. Visualiza sus rostros y siente el cariño que les tienes.',
          duration: 90,
          tips: ['Pueden ser familiares, amigos o mascotas', 'Siente realmente el amor', 'Sonríe mientras los recuerdas']
        },
        {
          id: 2,
          title: 'Mensaje de Aprecio',
          instruction: 'Escribe mentalmente o en papel un mensaje de agradecimiento para una de esas personas. Sé específico sobre lo que aprecias.',
          duration: 120,
          imageSpace: true,
          tips: ['Sé específico y sincero', 'Menciona algo concreto que hicieron', 'Exprésalo con tus propias palabras']
        },
        {
          id: 3,
          title: 'Autocompasión',
          instruction: 'Coloca una mano en tu corazón. Dite a ti mismo: "Me acepto como soy, me trato con bondad, merezco amor".',
          duration: 60,
          tips: ['Habla como le hablarías a un buen amigo', 'Siente el calor de tu mano', 'Cree en lo que te dices']
        },
        {
          id: 4,
          title: 'Intención de Conexión',
          instruction: 'Decide una acción concreta para conectar con alguien hoy: una llamada, un mensaje, un abrazo.',
          duration: 45,
          tips: ['Elige algo que puedas hacer hoy', 'Que sea genuino', 'Pequeños gestos tienen gran impacto']
        }
      ]
    },
    5: { // Viernes
      day: 5,
      name: 'Viernes',
      title: 'Celebración Creativa',
      character: 'Luna',
      characterEmoji: '🦋',
      description: 'Celebramos la semana con expresión creativa y alegría',
      totalXP: 80,
      badge: 'Espíritu Creativo',
      steps: [
        {
          id: 1,
          title: 'Danza Libre',
          instruction: 'Pon música que te guste y muévete libremente por 2 minutos. No hay movimientos correctos o incorrectos.',
          duration: 120,
          imageSpace: true,
          tips: ['Deja que tu cuerpo se mueva naturalmente', 'No te juzgues', 'Diviértete y sonríe']
        },
        {
          id: 2,
          title: 'Expresión Artística',
          instruction: 'Dibuja, escribe o canta algo que represente cómo te sientes. Puede ser abstracto, no necesita ser "perfecto".',
          duration: 180,
          imageSpace: true,
          tips: ['No busques perfección', 'Exprésate libremente', 'Disfruta el proceso más que el resultado']
        },
        {
          id: 3,
          title: 'Logros de la Semana',
          instruction: 'Enumera 5 cosas que lograste esta semana, por pequeñas que sean. Celebra cada una con una sonrisa.',
          duration: 90,
          tips: ['Incluye logros pequeños', 'Todo cuenta: levantarte, ser amable, aprender algo', 'Siéntete orgulloso/a']
        },
        {
          id: 4,
          title: 'Gratitud Creativa',
          instruction: 'Expresa gratitud de forma creativa: canta, dibuja o escribe un poema corto sobre algo bueno de tu semana.',
          duration: 120,
          tips: ['No importa si no eres "artístico"', 'La intención es lo que cuenta', 'Diviértete con el proceso']
        }
      ]
    },
    6: { // Sábado
      day: 6,
      name: 'Sábado',
      title: 'Autocuidado Profundo',
      character: 'Zen',
      characterEmoji: '🐨',
      description: 'Nos dedicamos tiempo de calidad con prácticas de autocuidado',
      totalXP: 65,
      badge: 'Guardián del Bienestar',
      steps: [
        {
          id: 1,
          title: 'Ritual de Limpieza',
          instruction: 'Lávate las manos conscientemente, sintiendo el agua tibia. Luego lava tu cara con cuidado y atención.',
          duration: 120,
          imageSpace: true,
          tips: ['Siente la temperatura del agua', 'Muévete lentamente', 'Disfruta este momento para ti']
        },
        {
          id: 2,
          title: 'Masaje de Manos',
          instruction: 'Masajea una mano con la otra, presionando suavemente cada dedo y la palma. Luego cambia de mano.',
          duration: 90,
          imageSpace: true,
          tips: ['Usa presión suave pero firme', 'Nota las sensaciones', 'Agradece a tus manos todo lo que hacen']
        },
        {
          id: 3,
          title: 'Hidratación Consciente',
          instruction: 'Bebe un vaso de agua lentamente, sintiendo cómo hidrata tu cuerpo. Agradece a tu cuerpo por todo lo que hace.',
          duration: 60,
          tips: ['Bebe despacio', 'Siente cómo el agua nutre tu cuerpo', 'Aprecia este acto de autocuidado']
        },
        {
          id: 4,
          title: 'Afirmaciones Positivas',
          instruction: 'Mírate al espejo y di 3 afirmaciones positivas sobre ti mismo/a. Habla con amor y convicción.',
          duration: 90,
          tips: ['Mírate a los ojos', 'Habla con sinceridad', 'Ejemplos: "Soy valioso/a", "Merezco amor", "Estoy creciendo"']
        }
      ]
    },
    7: { // Domingo
      day: 7,
      name: 'Domingo',
      title: 'Reflexión y Preparación',
      character: 'Alicia',
      characterEmoji: '🦉',
      description: 'Reflexionamos sobre la semana y nos preparamos para la siguiente',
      totalXP: 75,
      badge: 'Sabio Reflexivo',
      steps: [
        {
          id: 1,
          title: 'Revisión de la Semana',
          instruction: 'Piensa en los momentos más significativos de esta semana. ¿Qué te hizo sentir bien? ¿Qué aprendiste?',
          duration: 120,
          tips: ['No juzgues, solo observa', 'Incluye momentos pequeños pero significativos', 'Celebra tus esfuerzos']
        },
        {
          id: 2,
          title: 'Lecciones Aprendidas',
          instruction: 'Identifica 2 lecciones que aprendiste esta semana sobre ti mismo/a o sobre la vida.',
          duration: 90,
          tips: ['Pueden ser lecciones pequeñas', 'Todo aprendizaje es valioso', 'Sé gentil contigo mismo/a']
        },
        {
          id: 3,
          title: 'Intenciones para la Nueva Semana',
          instruction: 'Establece 2-3 intenciones positivas para la próxima semana. Que sean realistas y motivadoras.',
          duration: 120,
          tips: ['Sé específico pero flexible', 'Enfócate en cómo quieres sentirte', 'Elige intenciones que te inspiren']
        },
        {
          id: 4,
          title: 'Momento de Gratitud',
          instruction: 'Cierra los ojos y siente gratitud por esta semana completa, por tus esfuerzos y por este momento de reflexión.',
          duration: 60,
          tips: ['Siente la gratitud en tu corazón', 'Agradece incluso los desafíos', 'Termina con una sonrisa']
        }
      ]
    }
  };

  const currentActivity = dailyActivities[currentDay];
  const currentStepData = currentActivity.steps[currentStep];

  // Swipe detection
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart || !touchEnd) return;
    
    // Check if the touch target is a button or interactive element
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="button"]') || target.closest('input') || target.closest('textarea')) {
      return; // Don't handle swipe if touching interactive elements
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && completedSteps[currentStep]) {
      // Swipe left to go to next step (only if current step is completed)
      e.preventDefault();
      handleNextStep();
    } else if (isRightSwipe && currentStep > 0) {
      // Swipe right to go to previous step
      e.preventDefault();
      handlePrevStep();
    }
  };

  useEffect(() => {
    if (currentActivity) {
      const totalTime = currentActivity.steps.reduce((sum, step) => sum + step.duration, 0);
      setTotalTimeRemaining(totalTime);
      setCompletedSteps(new Array(currentActivity.steps.length).fill(false));
    }
  }, [currentActivity]);

  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isActive, timeRemaining]);

  const handleStartStep = () => {
    setTimeRemaining(currentStepData.duration);
    setIsActive(true);
  };

  const handlePauseStep = () => {
    setIsActive(false);
  };

  const handleCompleteStep = () => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[currentStep] = true;
    setCompletedSteps(newCompletedSteps);
    setIsActive(false);
    setTimeRemaining(0);
    setIsTransitioning(true);
    
    // Show completion message briefly, then allow manual navigation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1500);
  };

  const handleNextStep = () => {
    if (currentStep < currentActivity.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setIsActive(false);
      setTimeRemaining(0);
    } else {
      // Activity completed
      onComplete(currentActivity.totalXP, currentActivity.badge);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setIsActive(false);
      setTimeRemaining(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    return ((currentStep + (completedSteps[currentStep] ? 1 : 0)) / currentActivity.steps.length) * 100;
  };

  if (!currentActivity) {
    return <div>Actividad no encontrada</div>;
  }

  return (
    <div 
      ref={containerRef}
      className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Mobile Header */}
      <div className="text-center mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-lg">
            {currentActivity.characterEmoji}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800 leading-tight">
              {currentActivity.name} - {currentActivity.title}
            </h3>
            <p className="text-blue-600 text-sm sm:text-base">Guía: {currentActivity.character}</p>
          </div>
        </div>
        <p className="text-blue-700 text-sm sm:text-base mb-4 px-2">{currentActivity.description}</p>
        
        {/* Progress Bar */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs sm:text-sm text-blue-600 px-2">
            <span>Paso {currentStep + 1} de {currentActivity.steps.length}</span>
            <span>{Math.round(getProgress())}% completado</span>
          </div>
          <Progress value={getProgress()} className="h-2 sm:h-3" />
        </div>

        {/* Step Navigation Dots */}
        <div className="flex justify-center gap-2 mb-4">
          {currentActivity.steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'bg-blue-500 scale-125'
                  : completedSteps[index]
                  ? 'bg-blue-300'
                  : 'bg-blue-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="mx-auto max-w-4xl bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-xl rounded-2xl overflow-hidden">
        {/* Step Header */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-800">
              {currentStepData.title}
            </h4>
            <div className="flex items-center gap-2 justify-center sm:justify-end">
              <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              <Badge variant="outline" className="border-blue-300 text-blue-600 text-xs sm:text-sm">
                {isActive ? formatTime(timeRemaining) : formatTime(currentStepData.duration)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Image Space */}
          {currentStepData.imageSpace && (
            <div className="w-full h-40 sm:h-48 lg:h-56 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-dashed border-blue-300 flex items-center justify-center">
              <div className="text-center text-blue-400">
                <div className="text-3xl sm:text-4xl mb-2">🖼️</div>
                <p className="text-xs sm:text-sm">Espacio para imagen ilustrativa</p>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 p-4 sm:p-6 rounded-xl border border-blue-200">
            <p className="text-blue-800 leading-relaxed text-base sm:text-lg lg:text-xl text-center sm:text-left">
              {currentStepData.instruction}
            </p>
          </div>

          {/* Tips */}
          {currentStepData.tips && (
            <div className="bg-blue-100 p-4 sm:p-6 rounded-xl border border-blue-300">
              <h5 className="font-semibold text-blue-800 mb-3 text-sm sm:text-base flex items-center gap-2">
                <span className="text-lg">💡</span> Consejos:
              </h5>
              <ul className="space-y-2">
                {currentStepData.tips.map((tip, index) => (
                  <li key={index} className="text-blue-700 text-sm sm:text-base flex items-start gap-3">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Timer Controls */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            {!isActive && timeRemaining === 0 && !completedSteps[currentStep] && !isTransitioning && (
              <Button
                onClick={handleStartStep}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg text-sm sm:text-base"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Comenzar ({formatTime(currentStepData.duration)})
              </Button>
            )}

            {isActive && (
              <>
                <Button
                  onClick={handlePauseStep}
                  variant="outline"
                  className="w-full sm:w-auto border-blue-300 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl text-sm sm:text-base"
                >
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Pausar
                </Button>
                
                <Button
                  onClick={handleCompleteStep}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg text-sm sm:text-base"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Completar Paso
                </Button>
              </>
            )}

            {isTransitioning && (
              <div className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                <span className="text-sm sm:text-base">¡Paso Completado!</span>
              </div>
            )}

            {completedSteps[currentStep] && !isTransitioning && (
              <div className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">¡Paso Completado!</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Navigation Instructions */}
      <div className="mt-6 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mx-auto max-w-md border border-blue-200">
          <p className="text-blue-700 text-xs sm:text-sm mb-2 font-medium">Navegación:</p>
          <div className="flex items-center justify-center gap-4 text-blue-600">
            <div className="flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs">Desliza derecha</span>
            </div>
            <div className="w-px h-4 bg-blue-300"></div>
            <div className="flex items-center gap-1">
              <span className="text-xs">Desliza izquierda</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
          {!completedSteps[currentStep] && (
            <p className="text-blue-500 text-xs mt-2">Completa este paso para avanzar</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyActivity; 