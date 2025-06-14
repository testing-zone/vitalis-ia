import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Star, 
  Crown,
  Target,
  Zap,
  Heart,
  Users,
  Calendar,
  Medal,
  Award,
  CheckCircle,
  Lock,
  X,
  Flame,
  Brain,
  Sparkles,
  Gift,
  TrendingUp,
  Shield,
  Gem,
  Rocket
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: 'wellness' | 'social' | 'consistency' | 'milestone' | 'special';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  xp: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedDate?: string;
  tips?: string[];
}

const Achievements: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [animationOffset, setAnimationOffset] = useState(0);
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  // Animate background effects
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationOffset(prev => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const achievements: Achievement[] = [
    {
      id: 1,
      title: 'Primer Paso',
      description: 'Completa tu primera actividad de bienestar',
      icon: 'footprints',
      category: 'milestone',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      xp: 50,
      rarity: 'common',
      unlockedDate: '2024-01-15',
      tips: ['¡Felicidades por comenzar tu viaje!', 'Cada gran aventura comienza con un solo paso']
    },
    {
      id: 2,
      title: 'Respirador Consciente',
      description: 'Completa 5 sesiones de respiración consciente',
      icon: 'wind',
      category: 'wellness',
      unlocked: true,
      progress: 5,
      maxProgress: 5,
      xp: 100,
      rarity: 'common',
      unlockedDate: '2024-01-18',
      tips: ['La respiración es la base del bienestar', 'Practica 5 minutos diarios para mejores resultados']
    },
    {
      id: 3,
      title: 'Guerrero del Bienestar',
      description: 'Mantén una racha de 7 días consecutivos',
      icon: 'flame',
      category: 'consistency',
      unlocked: false,
      progress: 3,
      maxProgress: 7,
      xp: 200,
      rarity: 'rare',
      tips: ['La consistencia es clave', 'Solo te faltan 4 días más', 'Establece recordatorios diarios']
    },
    {
      id: 4,
      title: 'Corazón Social',
      description: 'Conecta con 5 amigos diferentes en la plataforma',
      icon: 'hearts',
      category: 'social',
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      xp: 150,
      rarity: 'rare',
      tips: ['Las conexiones sociales mejoran el bienestar', 'Invita a tus amigos a unirse', 'Comparte tu progreso']
    },
    {
      id: 5,
      title: 'Maestro de la Calma',
      description: 'Completa 20 sesiones de meditación',
      icon: 'lotus',
      category: 'wellness',
      unlocked: false,
      progress: 8,
      maxProgress: 20,
      xp: 300,
      rarity: 'epic',
      tips: ['La meditación transforma la mente', 'Practica en el mismo horario cada día', 'Empieza con sesiones cortas']
    },
    {
      id: 6,
      title: 'Leyenda del Bienestar',
      description: 'Alcanza 30 días de racha perfecta',
      icon: 'crown',
      category: 'milestone',
      unlocked: false,
      progress: 0,
      maxProgress: 30,
      xp: 500,
      rarity: 'legendary',
      tips: ['El logro más prestigioso', 'Requiere dedicación absoluta', 'Solo el 1% lo consigue']
    },
    {
      id: 7,
      title: 'Mentor Sabio',
      description: 'Ayuda a 10 amigos a completar actividades',
      icon: 'brain',
      category: 'social',
      unlocked: false,
      progress: 1,
      maxProgress: 10,
      xp: 250,
      rarity: 'epic',
      tips: ['Enseñar es la mejor forma de aprender', 'Comparte tu experiencia', 'Motiva a otros']
    },
    {
      id: 8,
      title: 'Explorador Curioso',
      description: 'Completa actividades en todos los módulos',
      icon: 'rocket',
      category: 'milestone',
      unlocked: false,
      progress: 2,
      maxProgress: 4,
      xp: 180,
      rarity: 'rare',
      tips: ['Diversifica tu experiencia', 'Cada módulo aporta algo único', 'Sal de tu zona de confort']
    }
  ];

  const categories = [
    { id: 'all', label: 'Todos', icon: Trophy, color: 'vitalis-gold' },
    { id: 'wellness', label: 'Bienestar', icon: Heart, color: 'rose-500' },
    { id: 'social', label: 'Social', icon: Users, color: 'blue-500' },
    { id: 'consistency', label: 'Consistencia', icon: Flame, color: 'orange-500' },
    { id: 'milestone', label: 'Hitos', icon: Medal, color: 'purple-500' },
    { id: 'special', label: 'Especiales', icon: Star, color: 'amber-500' }
  ];

  const getRarityConfig = (rarity: Achievement['rarity']) => {
    const configs = {
      common: {
        bg: 'from-slate-100 via-slate-200 to-slate-300',
        border: 'border-slate-300',
        glow: 'shadow-slate-300/30',
        text: 'text-slate-700',
        badge: 'bg-slate-500',
        icon: '🥉'
      },
      rare: {
        bg: 'from-blue-100 via-blue-200 to-blue-300',
        border: 'border-blue-300',
        glow: 'shadow-blue-300/40',
        text: 'text-blue-700',
        badge: 'bg-blue-500',
        icon: '🥈'
      },
      epic: {
        bg: 'from-purple-100 via-purple-200 to-purple-300',
        border: 'border-purple-300',
        glow: 'shadow-purple-300/50',
        text: 'text-purple-700',
        badge: 'bg-purple-500',
        icon: '🥇'
      },
      legendary: {
        bg: 'from-amber-100 via-yellow-200 to-amber-300',
        border: 'border-amber-300',
        glow: 'shadow-amber-300/60 shadow-lg',
        text: 'text-amber-700',
        badge: 'bg-gradient-to-r from-amber-500 to-yellow-500',
        icon: '👑'
      }
    };
    return configs[rarity];
  };

  const getAchievementIcon = (iconType: string, unlocked: boolean) => {
    const iconMap = {
      footprints: Target,
      wind: Zap,
      flame: Flame,
      hearts: Heart,
      lotus: Sparkles,
      crown: Crown,
      brain: Brain,
      rocket: Rocket
    };
    
    const IconComponent = iconMap[iconType] || Trophy;
    
    return (
      <IconComponent 
        className={`w-8 h-8 ${unlocked ? 'text-vitalis-gold' : 'text-gray-400'}`}
      />
    );
  };

  const filteredAchievements = achievements.filter(achievement => {
    const categoryMatch = selectedCategory === 'all' || achievement.category === selectedCategory;
    const unlockedMatch = !showUnlockedOnly || achievement.unlocked;
    return categoryMatch && unlockedMatch;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0);
  const completionPercentage = Math.round((unlockedCount / achievements.length) * 100);

  const rarityStats = {
    common: achievements.filter(a => a.rarity === 'common' && a.unlocked).length,
    rare: achievements.filter(a => a.rarity === 'rare' && a.unlocked).length,
    epic: achievements.filter(a => a.rarity === 'epic' && a.unlocked).length,
    legendary: achievements.filter(a => a.rarity === 'legendary' && a.unlocked).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitalis-cream via-white to-vitalis-green-light/10 flex flex-col">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-vitalis-gold/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onOpenJourneyMap={() => {}}
      />
      
      <div className="md:ml-80 transition-all duration-300 flex-1 flex flex-col">
        <div className="flex-1 p-4">
          <div className="max-w-7xl mx-auto py-6">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="relative">
                  <Trophy className="w-16 h-16 text-vitalis-gold animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-vitalis-gold rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{unlockedCount}</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-vitalis-brown mb-2">Logros</h1>
                  <p className="text-lg text-vitalis-brown/70">
                    Celebra tus victorias y progreso en el camino del bienestar
                  </p>
                </div>
              </div>
              
              {/* Progress Overview */}
              <Card className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-vitalis-gold/10 via-white to-vitalis-green/10 border-2 border-vitalis-gold/20 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-vitalis-brown">{unlockedCount}/{achievements.length}</div>
                    <div className="text-sm text-vitalis-brown/70">Desbloqueados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-vitalis-green">{totalXP}</div>
                    <div className="text-sm text-vitalis-brown/70">XP Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-vitalis-gold">{completionPercentage}%</div>
                    <div className="text-sm text-vitalis-brown/70">Completado</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{rarityStats.legendary}</div>
                    <div className="text-sm text-vitalis-brown/70">Legendarios</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-vitalis-brown">Progreso General</span>
                    <span className="text-vitalis-brown">{completionPercentage}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-3" />
                </div>
              </Card>
            </div>

            {/* Rarity Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 text-center bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
                <div className="text-2xl mb-2">🥉</div>
                <div className="text-lg font-bold text-slate-700">{rarityStats.common}</div>
                <div className="text-xs text-slate-600">Común</div>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="text-2xl mb-2">🥈</div>
                <div className="text-lg font-bold text-blue-700">{rarityStats.rare}</div>
                <div className="text-xs text-blue-600">Raro</div>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="text-2xl mb-2">🥇</div>
                <div className="text-lg font-bold text-purple-700">{rarityStats.epic}</div>
                <div className="text-xs text-purple-600">Épico</div>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-200">
                <div className="text-2xl mb-2">👑</div>
                <div className="text-lg font-bold text-amber-700">{rarityStats.legendary}</div>
                <div className="text-xs text-amber-600">Legendario</div>
              </Card>
            </div>

            {/* Filters and Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <TabsList className="flex w-full md:w-auto bg-white rounded-3xl border-2 border-vitalis-gold/20 p-2 gap-1 overflow-x-auto">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex items-center gap-2 rounded-2xl data-[state=active]:bg-vitalis-gold data-[state=active]:text-white transition-all duration-300 text-sm font-medium py-3 px-4 whitespace-nowrap"
                    >
                      <category.icon className="w-4 h-4" />
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <Button
                  onClick={() => setShowUnlockedOnly(!showUnlockedOnly)}
                  variant={showUnlockedOnly ? "default" : "outline"}
                  className={`${showUnlockedOnly ? 'bg-vitalis-gold hover:bg-vitalis-gold-dark' : 'border-vitalis-gold/20 hover:bg-vitalis-gold/10'} text-sm`}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Solo desbloqueados
                </Button>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAchievements.map((achievement) => {
                  const config = getRarityConfig(achievement.rarity);
                  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
                  
                  return (
                    <Card
                      key={achievement.id}
                      className={`
                        relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1
                        bg-gradient-to-br ${config.bg} ${config.border} border-2 
                        ${achievement.unlocked ? `shadow-lg ${config.glow}` : 'opacity-75 grayscale'}
                        group
                      `}
                      onClick={() => setSelectedAchievement(achievement)}
                    >
                      {/* Rarity indicator */}
                      <div className="absolute top-3 right-3 text-2xl">
                        {config.icon}
                      </div>
                      
                      {!achievement.unlocked && (
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center z-10">
                          <div className="bg-white/90 rounded-full p-2">
                            <Lock className="w-6 h-6 text-gray-600" />
                          </div>
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="flex-shrink-0">
                            {getAchievementIcon(achievement.icon, achievement.unlocked)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-bold text-lg ${config.text} mb-1 line-clamp-2`}>
                              {achievement.title}
                            </h3>
                            <Badge 
                              className={`text-xs text-white ${config.badge} mb-2`}
                            >
                              {achievement.rarity.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className={`text-sm ${config.text} mb-4 line-clamp-2`}>
                          {achievement.description}
                        </p>
                        
                        {/* Progress Section */}
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className={config.text}>Progreso</span>
                            <span className={config.text}>
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1">
                              <Zap className="w-4 h-4 text-vitalis-gold" />
                              <span className={`text-sm font-medium ${config.text}`}>
                                +{achievement.xp} XP
                              </span>
                            </div>
                            {achievement.unlockedDate && (
                              <span className="text-xs text-gray-500">
                                {new Date(achievement.unlockedDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Card>
                  );
                })}
              </div>

              {filteredAchievements.length === 0 && (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-500 mb-2">No hay logros en esta categoría</h3>
                  <p className="text-gray-400">Prueba con otra categoría o desactiva el filtro</p>
                </div>
              )}
            </Tabs>
          </div>
        </div>
        
        <Footer />
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  {getAchievementIcon(selectedAchievement.icon, selectedAchievement.unlocked)}
                  <div>
                    <h2 className="text-2xl font-bold text-vitalis-brown">
                      {selectedAchievement.title}
                    </h2>
                    <Badge className={`${getRarityConfig(selectedAchievement.rarity).badge} text-white`}>
                      {selectedAchievement.rarity.toUpperCase()} {getRarityConfig(selectedAchievement.rarity).icon}
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedAchievement(null)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-vitalis-brown/70 text-lg">
                    {selectedAchievement.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-vitalis-brown mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Progreso Actual
                  </h4>
                  <div className="bg-gray-100 rounded-xl p-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completado</span>
                      <span className="font-medium">
                        {selectedAchievement.progress} / {selectedAchievement.maxProgress}
                      </span>
                    </div>
                    <Progress 
                      value={(selectedAchievement.progress / selectedAchievement.maxProgress) * 100} 
                      className="h-3 mb-2" 
                    />
                    <div className="text-xs text-gray-600">
                      {Math.round((selectedAchievement.progress / selectedAchievement.maxProgress) * 100)}% completado
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-vitalis-gold/10 rounded-xl p-4 text-center">
                    <Zap className="w-6 h-6 text-vitalis-gold mx-auto mb-2" />
                    <div className="font-semibold text-vitalis-brown">Recompensa</div>
                    <div className="text-vitalis-gold font-bold">+{selectedAchievement.xp} XP</div>
                  </div>
                  {selectedAchievement.unlockedDate && (
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="font-semibold text-green-800">Desbloqueado</div>
                      <div className="text-green-600 text-sm">
                        {new Date(selectedAchievement.unlockedDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
                
                {selectedAchievement.tips && (
                  <div>
                    <h4 className="font-semibold text-vitalis-brown mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Consejos
                    </h4>
                    <div className="space-y-2">
                      {selectedAchievement.tips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-blue-800 text-sm">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Global styles for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default Achievements; 