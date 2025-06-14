import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Avatar from '@/components/Avatar';
import ModuleCard from '@/components/ModuleCard';
import StatsCard from '@/components/StatsCard';
import MoodTracker from '@/components/MoodTracker';
import HabitTracker from '@/components/HabitTracker';
import CapybaraCompanion from '@/components/CapybaraCompanion';
import ProgressChart from '@/components/ProgressChart';
import AchievementBadge from '@/components/AchievementBadge';
import ScreenTimeWidget from '@/components/ScreenTimeWidget';
import Sidebar from '@/components/Sidebar';
import EmergencyButton from '@/components/EmergencyButton';
import ChatModal from '@/components/ChatModal';
import JourneyMapView from '@/components/JourneyMapView';
import DailyExercisePopup from '@/components/DailyExercisePopup';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Users, MessageCircle } from 'lucide-react';
import { useDailyExercise, DailyExerciseAnswer } from '@/hooks/useDailyExercise';
import { useJourneyActivities } from '@/hooks/useJourneyActivities';

const Index = () => {
  const [currentLevel] = useState(12);
  const [currentXP, setCurrentXP] = useState(2340);
  const [nextLevelXP] = useState(2500);
  const [avatarMood, setAvatarMood] = useState<'happy' | 'neutral' | 'sad' | 'excited'>('happy');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [journeyMapOpen, setJourneyMapOpen] = useState(false);
  const [sidebarChatOpen, setSidebarChatOpen] = useState(false);

  // Daily exercise hook
  const { shouldShowPopup, exerciseState, completeExercise, dismissPopup } = useDailyExercise();
  
  // Journey activities hook
  const { 
    activities, 
    completeActivity, 
    getCompletedCount, 
    getTotalCount, 
    getUncompletedActivities 
  } = useJourneyActivities();

  // Handle daily exercise completion
  const handleExerciseComplete = (answers: DailyExerciseAnswer[]) => {
    completeExercise(answers);
    
    // Award XP for completing daily exercise
    setCurrentXP(prev => prev + 100);
    
    // Complete a random uncompleted activity from journey map
    const uncompletedActivities = getUncompletedActivities();
    if (uncompletedActivities.length > 0) {
      const randomActivity = uncompletedActivities[Math.floor(Math.random() * uncompletedActivities.length)];
      completeActivity(randomActivity.id);
    }
    
    // Update mood based on answers if available
    const moodAnswer = answers.find(a => a.questionId === 1);
    if (moodAnswer && typeof moodAnswer.answer === 'number') {
      if (moodAnswer.answer >= 4) {
        setAvatarMood('happy');
      } else if (moodAnswer.answer >= 3) {
        setAvatarMood('neutral');
      } else {
        setAvatarMood('sad');
      }
    }
  };

  // Datos de ejemplo para los gráficos
  const moodData = [
    { name: 'Lun', mood: 4 },
    { name: 'Mar', mood: 3 },
    { name: 'Mie', mood: 5 },
    { name: 'Jue', mood: 4 },
    { name: 'Vie', mood: 5 },
    { name: 'Sab', mood: 4 },
    { name: 'Dom', mood: 3 }
  ];

  const activityData = [
    { name: 'Mind', value: 85 },
    { name: 'Body', value: 72 },
    { name: 'Soul', value: 90 },
    { name: 'Social', value: 65 }
  ];

  const modules = [
    {
      title: 'MindTrack',
      description: 'Seguimiento emocional inteligente',
      icon: '🧠',
      gradient: 'bg-gradient-mind',
      progress: 75,
      xp: 850
    },
    {
      title: 'BodySync',
      description: 'Bienestar físico y nutrición',
      icon: '🌱',
      gradient: 'bg-gradient-body',
      progress: 60,
      xp: 720
    },
    {
      title: 'SoulBoost',
      description: 'Crecimiento personal y mindfulness',
      icon: '🍃',
      gradient: 'bg-gradient-soul',
      progress: 85,
      xp: 940
    },
    {
      title: 'SocialHarmony',
      description: 'Relaciones interpersonales',
      icon: '🤝',
      gradient: 'bg-gradient-social',
      progress: 55,
      xp: 650
    }
  ];

  const achievements = [
    { title: 'Primera Semana', description: '7 días consecutivos', icon: '🌟', unlocked: true, rarity: 'common' as const },
    { title: 'Meditador', description: '50 sesiones completadas', icon: '🧘‍♂️', unlocked: true, rarity: 'rare' as const },
    { title: 'Atleta Mental', description: 'Nivel 10 alcanzado', icon: '🏆', unlocked: true, rarity: 'epic' as const },
    { title: 'Maestro Zen', description: '100 días de mindfulness', icon: '🍃', unlocked: false, rarity: 'legendary' as const }
  ];

  // Update stats card with real data from journey activities
  const completedActivitiesCount = getCompletedCount();
  const totalActivitiesCount = getTotalCount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitalis-cream via-white to-vitalis-green-light/10">
      {/* Daily Exercise Popup */}
      <DailyExercisePopup
        isOpen={shouldShowPopup}
        onClose={dismissPopup}
        onComplete={handleExerciseComplete}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onOpenJourneyMap={() => setJourneyMapOpen(true)}
        onChatStateChange={(isOpen) => setSidebarChatOpen(isOpen)}
      />

      {/* Main content with sidebar offset */}
      <div className="md:ml-80 transition-all duration-300">
        {journeyMapOpen ? (
          // Journey Map View
          <JourneyMapView
            isOpen={journeyMapOpen}
            onClose={() => setJourneyMapOpen(false)}
          />
        ) : (
          // Main Dashboard Content
          <>
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
              {/* Hero Section - Completely Redesigned */}
              <div className="relative overflow-hidden">
                {/* Dynamic Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-joy/5 via-calm/5 to-growth/5 animate-gradient" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-warmth/10 to-transparent rounded-full blur-3xl animate-morphing" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-wisdom/10 to-transparent rounded-full blur-3xl animate-morphing" style={{ animationDelay: '2s' }} />
                
                <div className="relative">
                  <Card className="p-8 md:p-12 bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-gradient-to-r from-joy/30 via-calm/30 to-growth/30 shadow-2xl hover:shadow-3xl transition-all duration-700 hover-glow">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                      <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-12 bg-gradient-to-b from-joy via-energy to-growth rounded-full animate-pulse-glow" />
                          <div>
                            <h1 className="font-display text-5xl md:text-7xl font-bold text-vitalis-brown leading-tight">
                              ¡Hola, Alex! 
                              <span className="inline-block animate-wave ml-3 text-6xl">👋</span>
                            </h1>
                            <div className="font-handwritten text-2xl md:text-3xl text-warmth mt-2 opacity-80">
                              Tu journey de bienestar continúa...
                            </div>
                          </div>
                        </div>
                        
                        <p className="font-body text-xl md:text-2xl text-vitalis-brown/80 font-medium leading-relaxed">
                          {exerciseState?.completed 
                            ? (
                              <span className="flex items-center gap-3">
                                <span className="text-3xl animate-bounce">🎉</span>
                                <span className="text-growth font-semibold">
                                  ¡Increíble! Has completado tu ejercicio diario
                                </span>
                              </span>
                            )
                            : (
                              <span className="flex items-center gap-3">
                                <span className="text-3xl animate-pulse">✨</span>
                                <span>¿Listo para conquistar otro día extraordinario?</span>
                              </span>
                            )
                          }
                        </p>
                      </div>

                      {/* Enhanced Progress Section - Simplified */}
                      <div className="relative lg:w-96">
                        {/* Streak Display - Next to Progress Card */}
                        <div className="absolute -top-4 -right-16 z-10">
                          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-energy/20">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">🔥</span>
                              <div>
                                <div className="text-lg font-bold text-vitalis-brown">7</div>
                                <div className="text-xs text-energy font-medium">días</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Progress Card - Simplified */}
                        <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30">
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                              <span className="font-heading text-sm font-semibold text-vitalis-brown">Progreso Actual</span>
                              <div className="px-3 py-1 bg-gradient-to-r from-joy to-energy rounded-full text-xs font-bold text-vitalis-brown shadow-lg">
                                Nivel {currentLevel}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-display text-3xl font-bold text-joy">
                                {currentXP.toLocaleString()}
                              </div>
                              <div className="font-body text-xs text-vitalis-brown/60">XP Total</div>
                            </div>
                          </div>
                          
                          <div className="relative mb-4">
                            <div className="w-full bg-gradient-to-r from-vitalis-gold/20 via-vitalis-green/20 to-vitalis-gold/20 rounded-full h-8 shadow-inner">
                              <div
                                className="bg-gradient-to-r from-joy via-energy to-growth rounded-full h-8 transition-all duration-1500 ease-out shadow-lg relative overflow-hidden"
                                style={{ width: `${(currentXP / nextLevelXP) * 100}%` }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                                <div className="absolute inset-0 bg-gradient-to-r from-joy/20 to-growth/20 animate-pulse" />
                              </div>
                            </div>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-sm text-white/95 drop-shadow-lg">
                              {Math.round((currentXP / nextLevelXP) * 100)}%
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <span className="font-body text-sm text-vitalis-brown/70 bg-gradient-to-r from-calm/10 to-growth/10 px-4 py-2 rounded-full">
                              {nextLevelXP - currentXP} XP para el siguiente nivel
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Motivational Quote - Redesigned with Personality */}
              <div className="relative group">
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/50 hover:border-white/70 transition-all duration-500 hover:shadow-2xl">
                  <div className="flex items-center justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex items-start gap-6">
                        <div className="w-2 h-20 bg-gradient-to-b from-wisdom via-calm to-warmth rounded-full flex-shrink-0 animate-pulse-glow" />
                        <div className="space-y-4">
                          <blockquote className="font-heading text-xl md:text-2xl font-semibold text-vitalis-brown italic leading-relaxed">
                            "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito."
                          </blockquote>
                          <cite className="block font-body text-base text-vitalis-brown/70 font-medium not-italic">
                            — Albert Schweitzer
                          </cite>
                          <div className="font-handwritten text-sm text-warmth opacity-70">
                            Reflexión del día ✨
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 hidden md:block">
                      <div className="relative w-28 h-28 group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-warmth/30 to-wisdom/30 rounded-full blur-lg animate-pulse" />
                        <img
                          src="/img/te.png"
                          alt="Momento de reflexión"
                          className="relative w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 filter drop-shadow-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Section - Enhanced with Better Spacing */}
              <Card className="w-full p-8 bg-white/95 backdrop-blur-sm rounded-3xl border-2 border-vitalis-gold/20 shadow-xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-vitalis-gold to-vitalis-gold-dark rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">🎬</span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-vitalis-brown">Reflexión del Día</h2>
                      <p className="text-vitalis-brown/70">Contenido personalizado para tu crecimiento</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-vitalis-brown/70 bg-vitalis-gold/10 px-4 py-2 rounded-full">
                    <span>Desliza para explorar</span>
                    <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
                    {/* Video 1 */}
                    <div className="flex-none w-[320px] snap-center group">
                      <div className="relative w-full pt-[56.25%] mb-4 group">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full rounded-2xl transition-transform duration-300 group-hover:scale-[1.02] shadow-lg"
                          src="https://www.youtube.com/embed/FS1jdi51U8I"
                          title="Mindfulness para principiantes"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-2xl" />
                      </div>
                      <div className="space-y-2 px-2">
                        <h3 className="text-base font-semibold text-vitalis-brown group-hover:text-vitalis-gold transition-colors">
                          Mindfulness para principiantes
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-vitalis-brown/70">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            Principiante
                          </span>
                          <span>5 minutos</span>
                        </div>
                      </div>
                    </div>

                    {/* Video 2 */}
                    <div className="flex-none w-[320px] snap-center group">
                      <div className="relative w-full pt-[56.25%] mb-4 group">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full rounded-2xl transition-transform duration-300 group-hover:scale-[1.02] shadow-lg"
                          src="https://www.youtube.com/embed/b5w7DkseJjc"
                          title="Meditación guiada"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-2xl" />
                      </div>
                      <div className="space-y-2 px-2">
                        <h3 className="text-base font-semibold text-vitalis-brown group-hover:text-vitalis-gold transition-colors">
                          Meditación guiada de 10 minutos
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-vitalis-brown/70">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            Intermedio
                          </span>
                          <span>10 minutos</span>
                        </div>
                      </div>
                    </div>

                    {/* Video 3 */}
                    <div className="flex-none w-[320px] snap-center group">
                      <div className="relative w-full pt-[56.25%] mb-4 group">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full rounded-2xl transition-transform duration-300 group-hover:scale-[1.02] shadow-lg"
                          src="https://www.youtube.com/embed/sPbwiBHFgSU"
                          title="Gratitud diaria"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-2xl" />
                      </div>
                      <div className="space-y-2 px-2">
                        <h3 className="text-base font-semibold text-vitalis-brown group-hover:text-vitalis-gold transition-colors">
                          Practicando la gratitud diaria
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-vitalis-brown/70">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                            Todos los niveles
                          </span>
                          <span>8 minutos</span>
                        </div>
                      </div>
                    </div>

                    {/* Video 4 */}
                    <div className="flex-none w-[320px] snap-center group">
                      <div className="relative w-full pt-[56.25%] mb-4 group">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full rounded-2xl transition-transform duration-300 group-hover:scale-[1.02] shadow-lg"
                          src="https://www.youtube.com/embed/rzT51IXkiS4"
                          title="Respiración consciente"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-2xl" />
                      </div>
                      <div className="space-y-2 px-2">
                        <h3 className="text-base font-semibold text-vitalis-brown group-hover:text-vitalis-gold transition-colors">
                          Técnicas de respiración consciente
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-vitalis-brown/70">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            Principiante
                          </span>
                          <span>6 minutos</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Scroll Indicators */}
                  <div className="flex justify-center gap-3 mt-6">
                    <div className="w-3 h-3 rounded-full bg-vitalis-gold shadow-lg" />
                    <div className="w-3 h-3 rounded-full bg-vitalis-gold/30 hover:bg-vitalis-gold/60 transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-vitalis-gold/30 hover:bg-vitalis-gold/60 transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-vitalis-gold/30 hover:bg-vitalis-gold/60 transition-colors cursor-pointer" />
                  </div>
                </div>
              </Card>

              {/* Enhanced Layout with Better Visual Separation */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column - Enhanced */}
                <div className="xl:col-span-2 space-y-8">
                  {/* Habit Tracker y Mood Tracker with Enhanced Styling */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="relative group">
                      <HabitTracker />
                    </div>
                    <div className="relative group">
                      <MoodTracker />
                    </div>
                  </div>
                </div>

                {/* Right Column - Enhanced */}
                <div className="space-y-8">
                  <div className="relative group">
                    <ScreenTimeWidget />
                  </div>
                </div>
              </div>

              {/* Tabs para contenido adicional */}
              <Tabs defaultValue="activities" className="w-full">
                <TabsList className="flex w-full mb-8 bg-white rounded-3xl border-2 border-vitalis-gold/20 p-1 shadow-lg items-center justify-center gap-2">
                  <TabsTrigger 
                    value="activities" 
                    className="flex-1 rounded-2xl data-[state=active]:bg-vitalis-gold data-[state=active]:text-white transition-all duration-300 text-sm font-medium py-4 px-6 text-center flex items-center justify-center min-h-[48px]"
                  >
                    Actividades
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analytics" 
                    className="flex-1 rounded-2xl data-[state=active]:bg-vitalis-gold data-[state=active]:text-white transition-all duration-300 text-sm font-medium py-4 px-6 text-center flex items-center justify-center min-h-[48px]"
                  >
                    Análisis
                  </TabsTrigger>
                  <TabsTrigger 
                    value="achievements" 
                    className="flex-1 rounded-2xl data-[state=active]:bg-vitalis-gold data-[state=active]:text-white transition-all duration-300 text-sm font-medium py-4 px-6 text-center flex items-center justify-center min-h-[48px]"
                  >
                    Logros
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="activities" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
                      <h3 className="text-xl font-bold mb-4 text-vitalis-brown">Actividades Pendientes</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-vitalis-green/10 rounded-2xl border-2 border-vitalis-green/20">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🚶‍♂️</span>
                            <div>
                              <p className="font-medium text-vitalis-brown">Caminar 30 min</p>
                              <p className="text-sm text-vitalis-green-dark">Ejercicio diario</p>
                            </div>
                          </div>
                          <Button size="sm" className="bg-vitalis-green hover:bg-vitalis-green-dark text-white rounded-xl">
                            Empezar
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-vitalis-gold/10 rounded-2xl border-2 border-vitalis-gold/20">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">📖</span>
                            <div>
                              <p className="font-medium text-vitalis-brown">Diario de gratitud</p>
                              <p className="text-sm text-vitalis-brown/70">3 cosas positivas</p>
                            </div>
                          </div>
                          <Button size="sm" className="bg-vitalis-gold hover:bg-vitalis-gold-dark text-white rounded-xl">
                            Escribir
                          </Button>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-green/20 shadow-lg">
                      <h3 className="text-xl font-bold mb-4 text-vitalis-brown">Recomendaciones IA</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-vitalis-gold/10 rounded-2xl border-2 border-vitalis-gold/20">
                          <p className="font-medium text-vitalis-brown mb-2">💡 Sugerencia del día</p>
                          <p className="text-sm text-vitalis-brown/80">
                            Según tu patrón de sueño, una sesión de relajación te ayudaría antes de dormir.
                          </p>
                        </div>

                        <div className="p-4 bg-vitalis-green/10 rounded-2xl border-2 border-vitalis-green/20">
                          <p className="font-medium text-vitalis-brown mb-2">🎯 Meta semanal</p>
                          <p className="text-sm text-vitalis-brown/80">
                            ¡Solo 2 actividades más para completar tu objetivo!
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ProgressChart
                      title="Estado de Ánimo - Última Semana"
                      data={moodData}
                      type="line"
                      dataKey="mood"
                      color="#7FA650"
                    />

                    <ProgressChart
                      title="Progreso por Módulo"
                      data={activityData}
                      type="bar"
                      dataKey="value"
                      color="#F4C430"
                    />
                  </div>

                  <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-vitalis-brown">VitalisIA Wrapped - Este Mes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-vitalis-gold/10 rounded-2xl border-2 border-vitalis-gold/20">
                        <div className="text-3xl font-bold text-vitalis-brown">287</div>
                        <p className="text-vitalis-brown/70">Actividades</p>
                      </div>

                      <div className="text-center p-6 bg-vitalis-green/10 rounded-2xl border-2 border-vitalis-green/20">
                        <div className="text-3xl font-bold text-vitalis-brown">21</div>
                        <p className="text-vitalis-brown/70">Días seguidos</p>
                      </div>

                      <div className="text-center p-6 bg-vitalis-cream/50 rounded-2xl border-2 border-vitalis-gold/20">
                        <div className="text-3xl font-bold text-vitalis-brown">4.1</div>
                        <p className="text-vitalis-brown/70">Estado promedio</p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-6">
                  <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
                    <h3 className="text-xl font-bold mb-6 text-vitalis-brown">Tus Logros</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {achievements.map((achievement, index) => (
                        <AchievementBadge key={index} {...achievement} />
                      ))}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <Footer />
          </>
        )}

        <EmergencyButton />
        <ChatModal
          isOpen={chatModalOpen}
          onClose={() => setChatModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Index;
