import React, { useState } from 'react';
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
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Users, MessageCircle } from 'lucide-react';

const Index = () => {
  const [currentLevel] = useState(12);
  const [currentXP] = useState(2340);
  const [nextLevelXP] = useState(2500);
  const [avatarMood, setAvatarMood] = useState<'happy' | 'neutral' | 'sad' | 'excited'>('happy');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [journeyMapOpen, setJourneyMapOpen] = useState(false);
  const [sidebarChatOpen, setSidebarChatOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitalis-cream via-white to-vitalis-green-light/10">
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
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
              {/* Welcome Section con Capibara - Mejorado para desktop */}
              <div className="">
                <div className="xl:col-span-2">
                  <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-vitalis-brown mb-2">¡Hola, Alex! 👋</h1>
                        <p className="text-vitalis-brown/70">¿Listo para otro día increíble?</p>
                      </div>
                      <Avatar level={currentLevel} mood={avatarMood} />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-vitalis-brown">
                        <span>XP: {currentXP}/{nextLevelXP}</span>
                        <span>Próximo nivel: {currentLevel + 1}</span>
                      </div>
                      <div className="w-full bg-vitalis-gold/20 rounded-full h-4">
                        <div
                          className="bg-vitalis-gold rounded-full h-4 transition-all duration-500"
                          style={{ width: `${(currentXP / nextLevelXP) * 100}%` }}
                        />
                      </div>
                    </div>
                  </Card>
                </div>

              </div>
              {/* Stats Cards - Extendidos horizontalmente en una sola fila */}
              {/* Stats Cards - Ocupan todo el espacio horizontal */}
              <div className="flex flex-col md:flex-row w-full gap-4">
                <div className="w-full md:flex-1">
                  <StatsCard
                    title="Racha"
                    value="7 días"
                    change="+2"
                    icon="🔥"
                    trend="up"
                  />
                </div>
                <div className="w-full md:flex-1">
                  <StatsCard
                    title="Estado"
                    value="4.2/5"
                    change="+0.3"
                    icon="😊"
                    trend="up"
                  />
                </div>
                <div className="w-full md:flex-1">
                  <StatsCard
                    title="Actividades"
                    value="3/5"
                    change="2 pendientes"
                    icon="✅"
                    trend="neutral"
                  />
                </div>
                <div className="w-full md:flex-1">
                  <StatsCard
                    title="XP Total"
                    value={currentXP.toLocaleString()}
                    change="+150"
                    icon="⭐"
                    trend="up"
                  />
                </div>
              </div>


              {/* Video Widget Section */}
              <Card className="w-full p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-vitalis-brown">Reflexión del Día</h2>
                  <div className="flex items-center gap-2 text-sm text-vitalis-brown/70">
                    <span>Desliza para ver más</span>
                    <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
                    {/* Video 1 */}
                    <div className="flex-none w-[300px] snap-center">
                      <div className="relative w-full pt-[56.25%] mb-3 group">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                          src="https://www.youtube.com/embed/FS1jdi51U8I"
                          title="Mindfulness para principiantes"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-vitalis-brown">Mindfulness para principiantes</h3>
                        <p className="text-xs text-vitalis-brown/70">5 minutos • Principiante</p>
                      </div>
                    </div>

                    {/* Video 2 */}
                    <div className="flex-none w-[300px] snap-center">
                      <div className="relative w-full pt-[56.25%] mb-3 group">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                          src="https://www.youtube.com/embed/b5w7DkseJjc"
                          title="Meditación guiada"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-vitalis-brown">Meditación guiada de 10 minutos</h3>
                        <p className="text-xs text-vitalis-brown/70">10 minutos • Intermedio</p>
                      </div>
                    </div>

                    {/* Video 3 */}
                    <div className="flex-none w-[300px] snap-center">
                      <div className="relative w-full pt-[56.25%] mb-3 group">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                          src="https://www.youtube.com/embed/sPbwiBHFgSU"
                          title="Gratitud diaria"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-vitalis-brown">Practicando la gratitud diaria</h3>
                        <p className="text-xs text-vitalis-brown/70">8 minutos • Todos los niveles</p>
                      </div>
                    </div>

                    {/* Video 4 */}
                    <div className="flex-none w-[300px] snap-center">
                      <div className="relative w-full pt-[56.25%] mb-3 group">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                          src="https://www.youtube.com/embed/rzT51IXkiS4"
                          title="Respiración consciente"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-vitalis-brown">Técnicas de respiración consciente</h3>
                        <p className="text-xs text-vitalis-brown/70">6 minutos • Principiante</p>
                      </div>
                    </div>
                  </div>

                  {/* Scroll Indicators */}
                  <div className="flex justify-center gap-2 mt-4">
                    <div className="w-2 h-2 rounded-full bg-vitalis-gold" />
                    <div className="w-2 h-2 rounded-full bg-vitalis-gold/30" />
                    <div className="w-2 h-2 rounded-full bg-vitalis-gold/30" />
                    <div className="w-2 h-2 rounded-full bg-vitalis-gold/30" />
                  </div>
                </div>
              </Card>

              {/* Layout mejorado para desktop */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Columna izquierda */}
                <div className="xl:col-span-2 space-y-6">
                  {/* Habit Tracker y Mood Tracker */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <HabitTracker />
                    <MoodTracker />
                  </div>

                  
                </div>

                {/* Columna derecha - Widgets */}
                <div className="space-y-6">
                  <ScreenTimeWidget />

                 
                </div>
              </div>

              {/* Tabs para contenido adicional */}
              <Tabs defaultValue="activities" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-white rounded-3xl border-2 border-vitalis-gold/20 p-1.5">
                  <TabsTrigger 
                    value="activities" 
                    className="rounded-2xl data-[state=active]:bg-vitalis-gold data-[state=active]:text-white transition-all duration-300 text-sm font-medium py-3"
                  >
                    Actividades
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analytics" 
                    className="rounded-2xl data-[state=active]:bg-vitalis-gold data-[state=active]:text-white transition-all duration-300 text-sm font-medium py-3"
                  >
                    Análisis
                  </TabsTrigger>
                  <TabsTrigger 
                    value="achievements" 
                    className="rounded-2xl data-[state=active]:bg-vitalis-gold data-[state=active]:text-white transition-all duration-300 text-sm font-medium py-3"
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
