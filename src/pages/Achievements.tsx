import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  X
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
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
}

const Achievements: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [animationOffset, setAnimationOffset] = useState(0);

  // Animate background effects
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationOffset(prev => (prev + 1) % 360);
    }, 80);
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
      unlockedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Respirador Consciente',
      description: 'Completa 5 sesiones de respiración',
      icon: 'wind',
      category: 'wellness',
      unlocked: true,
      progress: 5,
      maxProgress: 5,
      xp: 100,
      rarity: 'common',
      unlockedDate: '2024-01-18'
    },
    {
      id: 3,
      title: 'Guerrero del Bienestar',
      description: 'Mantén una racha de 7 días',
      icon: 'flame',
      category: 'consistency',
      unlocked: false,
      progress: 3,
      maxProgress: 7,
      xp: 200,
      rarity: 'rare'
    },
    {
      id: 4,
      title: 'Corazón Social',
      description: 'Conecta con 5 amigos diferentes',
      icon: 'hearts',
      category: 'social',
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      xp: 150,
      rarity: 'rare'
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
      rarity: 'epic'
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
      rarity: 'legendary'
    }
  ];

  const categories = [
    { id: 'all', label: 'Todos', icon: Trophy },
    { id: 'wellness', label: 'Bienestar', icon: Heart },
    { id: 'social', label: 'Social', icon: Users },
    { id: 'consistency', label: 'Consistencia', icon: Target },
    { id: 'milestone', label: 'Hitos', icon: Medal },
    { id: 'special', label: 'Especiales', icon: Star }
  ];

  const getRarityStyles = (rarity: Achievement['rarity'], unlocked: boolean) => {
    const rarityStyles = {
      common: {
        bg: 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400',
        border: 'border-gray-400',
        shadow: 'shadow-gray-300/50',
        glow: unlocked ? 'shadow-gray-400/50' : '',
        text: 'text-gray-700'
      },
      rare: {
        bg: 'bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400',
        border: 'border-blue-400',
        shadow: 'shadow-blue-300/50',
        glow: unlocked ? 'shadow-blue-400/50' : '',
        text: 'text-blue-700'
      },
      epic: {
        bg: 'bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400',
        border: 'border-purple-400',
        shadow: 'shadow-purple-300/50',
        glow: unlocked ? 'shadow-purple-400/50' : '',
        text: 'text-purple-700'
      },
      legendary: {
        bg: 'bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400',
        border: 'border-amber-400',
        shadow: 'shadow-amber-300/50',
        glow: unlocked ? 'shadow-amber-400/50 animate-pulse' : '',
        text: 'text-amber-700'
      }
    };
    return rarityStyles[rarity];
  };

  const getAchievementIcon = (iconType: string, unlocked: boolean) => {
    const IconComponent = iconType === 'footprints' ? Target :
                         iconType === 'wind' ? Zap :
                         iconType === 'flame' ? Star :
                         iconType === 'hearts' ? Heart :
                         iconType === 'lotus' ? Medal :
                         iconType === 'crown' ? Crown : Trophy;
    
    return (
      <IconComponent 
        className={`w-8 h-8 ${unlocked ? '' : 'text-gray-400'}`}
      />
    );
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitalis-cream via-white to-vitalis-cream/50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-vitalis-gold/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onOpenJourneyMap={() => {}}
      />
      
      {/* Main content with sidebar offset */}
      <div className="md:ml-80 transition-all duration-300">
        <Header />
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-12 h-12 text-vitalis-gold" />
              <h1 className="text-4xl font-bold text-vitalis-brown">
                Logros
              </h1>
            </div>
            <p className="text-lg text-vitalis-brown/70 mb-6">
              Celebra tus victorias y progreso en el camino del bienestar
            </p>
            
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Card className="p-4 bg-gradient-to-r from-vitalis-gold/10 to-vitalis-gold/5 border-vitalis-gold/20">
                <div className="flex items-center gap-2 justify-center">
                  <Award className="w-5 h-5 text-vitalis-gold" />
                  <span className="font-semibold text-vitalis-brown">
                    {unlockedCount}/{achievements.length} Desbloqueados
                  </span>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-r from-vitalis-green/10 to-vitalis-green/5 border-vitalis-green/20">
                <div className="flex items-center gap-2 justify-center">
                  <Zap className="w-5 h-5 text-vitalis-green" />
                  <span className="font-semibold text-vitalis-brown">
                    {totalXP} XP Total
                  </span>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-r from-vitalis-brown/10 to-vitalis-brown/5 border-vitalis-brown/20">
                <div className="flex items-center gap-2 justify-center">
                  <Target className="w-5 h-5 text-vitalis-brown" />
                  <span className="font-semibold text-vitalis-brown">
                    {Math.round((unlockedCount / achievements.length) * 100)}% Completado
                  </span>
                </div>
              </Card>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-vitalis-gold hover:bg-vitalis-gold-dark text-white'
                    : 'border-vitalis-gold/20 text-vitalis-brown hover:bg-vitalis-gold/10'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </Button>
            ))}
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => {
              const styles = getRarityStyles(achievement.rarity, achievement.unlocked);
              const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
              
              return (
                <Card
                  key={achievement.id}
                  className={`
                    relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105
                    ${styles.bg} ${styles.border} border-2 ${styles.shadow}
                    ${achievement.unlocked ? `shadow-lg ${styles.glow}` : 'opacity-75'}
                  `}
                  onClick={() => setSelectedAchievement(achievement)}
                >
                  {!achievement.unlocked && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
                      <Lock className="w-8 h-8 text-gray-600" />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getAchievementIcon(achievement.icon, achievement.unlocked)}
                        <div>
                          <h3 className={`font-bold text-lg ${styles.text}`}>
                            {achievement.title}
                          </h3>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${styles.text} bg-white/50`}
                          >
                            {achievement.rarity.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      {achievement.unlocked && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    
                    <p className={`text-sm ${styles.text} mb-4`}>
                      {achievement.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className={styles.text}>Progreso</span>
                        <span className={styles.text}>
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <div className="w-full bg-white/50 rounded-full h-2">
                        <div 
                          className="bg-vitalis-gold rounded-full h-2 transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${styles.text}`}>
                        +{achievement.xp} XP
                      </span>
                      {achievement.unlockedDate && (
                        <span className="text-xs text-gray-600">
                          {achievement.unlockedDate}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </main>
        
        <Footer />
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-vitalis-brown">
                  {selectedAchievement.title}
                </h2>
                <Button
                  onClick={() => setSelectedAchievement(null)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                {getAchievementIcon(selectedAchievement.icon, selectedAchievement.unlocked)}
                <div>
                  <Badge className="mb-2">
                    {selectedAchievement.rarity.toUpperCase()}
                  </Badge>
                  <p className="text-vitalis-brown/70">
                    {selectedAchievement.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-vitalis-brown mb-2">Progreso</h4>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-vitalis-gold rounded-full h-3 transition-all duration-500"
                      style={{ 
                        width: `${(selectedAchievement.progress / selectedAchievement.maxProgress) * 100}%` 
                      }}
                    />
                  </div>
                  <p className="text-sm text-vitalis-brown/70 mt-1">
                    {selectedAchievement.progress} / {selectedAchievement.maxProgress}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-vitalis-brown">Recompensa</h4>
                    <p className="text-vitalis-brown/70">+{selectedAchievement.xp} XP</p>
                  </div>
                  {selectedAchievement.unlockedDate && (
                    <div>
                      <h4 className="font-semibold text-vitalis-brown">Desbloqueado</h4>
                      <p className="text-vitalis-brown/70">{selectedAchievement.unlockedDate}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Achievements; 