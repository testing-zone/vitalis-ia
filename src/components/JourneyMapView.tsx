import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Lock, 
  Star, 
  Play,
  X,
  Calendar,
  Trophy,
  Clock,
  Zap
} from 'lucide-react';
import ActivityModal from './activities/ActivityModal';
import { useJourneyActivities, JourneyActivity } from '@/hooks/useJourneyActivities';

interface JourneyMapViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const JourneyMapView: React.FC<JourneyMapViewProps> = ({ isOpen, onClose }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<JourneyActivity | null>(null);
  const [animationOffset, setAnimationOffset] = useState(0);
  const [windOffset, setWindOffset] = useState(0);
  const [activityModalOpen, setActivityModalOpen] = useState(false);

  // Use the journey activities hook
  const { activities, completeActivity } = useJourneyActivities();

  // Animate grass movement and wind effects
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationOffset(prev => (prev + 1) % 360);
      setWindOffset(prev => (prev + 0.5) % 360);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Generate unique star animations
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'star-animations';
    
    let css = '';
    
    // Generate animations for 125 stars (reduced from 250)
    for (let i = 0; i < 125; i++) {
      const minOpacity = 0.1 + Math.random() * 0.2;
      const maxOpacity = 0.8 + Math.random() * 0.2;
      css += `
        @keyframes starTwinkle${i} {
          0%, 85%, 100% { 
            opacity: ${minOpacity}; 
            transform: scale(0.8); 
          }
          5%, 10% { 
            opacity: ${maxOpacity}; 
            transform: scale(1.2); 
          }
        }
      `;
    }
    
    // Generate constellation animations (reduced from 16 to 8)
    for (let i = 0; i < 8; i++) {
      css += `
        @keyframes constellationGlow${i} {
          0%, 90%, 100% { 
            opacity: 0.3; 
            box-shadow: 0 0 8px rgba(147, 197, 253, 0.4);
          }
          5%, 8% { 
            opacity: 0.9; 
            box-shadow: 0 0 16px rgba(147, 197, 253, 0.8), 0 0 32px rgba(147, 197, 253, 0.4);
          }
        }
      `;
    }
    
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
    
    return () => {
      const existingStyle = document.getElementById('star-animations');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  const getThemeStyles = (theme: JourneyActivity['theme'], completed: boolean, locked: boolean) => {
    const themes = {
      morning: {
        bg: completed ? 'bg-gray-400' : 'bg-gradient-to-br from-amber-200 via-orange-200 to-yellow-300',
        border: completed ? 'border-gray-500' : 'border-amber-400',
        shadow: completed ? 'shadow-gray-300/50' : 'shadow-amber-300/50',
        glow: completed ? 'shadow-gray-400/50' : 'shadow-amber-400/50'
      },
      exercise: {
        bg: completed ? 'bg-gray-400' : 'bg-gradient-to-br from-emerald-200 via-teal-200 to-green-300',
        border: completed ? 'border-gray-500' : 'border-emerald-400',
        shadow: completed ? 'shadow-gray-300/50' : 'shadow-emerald-300/50',
        glow: completed ? 'shadow-gray-400/50' : 'shadow-emerald-400/50'
      },
      meditation: {
        bg: completed ? 'bg-gray-400' : 'bg-gradient-to-br from-violet-200 via-purple-200 to-indigo-300',
        border: completed ? 'border-gray-500' : 'border-violet-400',
        shadow: completed ? 'shadow-gray-300/50' : 'shadow-violet-300/50',
        glow: completed ? 'shadow-gray-400/50' : 'shadow-violet-400/50'
      },
      social: {
        bg: completed ? 'bg-gray-400' : 'bg-gradient-to-br from-rose-200 via-pink-200 to-fuchsia-300',
        border: completed ? 'border-gray-500' : 'border-rose-400',
        shadow: completed ? 'shadow-gray-300/50' : 'shadow-rose-300/50',
        glow: completed ? 'shadow-gray-400/50' : 'shadow-rose-400/50'
      },
      reflection: {
        bg: completed ? 'bg-gray-400' : 'bg-gradient-to-br from-blue-200 via-cyan-200 to-sky-300',
        border: completed ? 'border-gray-500' : 'border-blue-400',
        shadow: completed ? 'shadow-gray-300/50' : 'shadow-blue-300/50',
        glow: completed ? 'shadow-gray-400/50' : 'shadow-blue-400/50'
      },
      evening: {
        bg: completed ? 'bg-gray-400' : 'bg-gradient-to-br from-indigo-300 via-purple-300 to-slate-400',
        border: completed ? 'border-gray-500' : 'border-indigo-400',
        shadow: completed ? 'shadow-gray-300/50' : 'shadow-indigo-300/50',
        glow: completed ? 'shadow-gray-400/50' : 'shadow-indigo-400/50'
      }
    };

    return themes[theme];
  };

  const getActivityIcon = (iconType: string, completed: boolean, locked: boolean) => {
    if (completed) {
      return (
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
          <div className="w-4 h-2 border-l-2 border-b-2 border-white transform rotate-[-45deg] translate-y-[-1px]"></div>
        </div>
      );
    }
    
    if (locked) {
      return (
        <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
          <div className="w-4 h-5 border-2 border-white rounded-t-md relative">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      );
    }

    switch (iconType) {
      case 'sunrise':
        return (
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full"></div>
            <div className="absolute top-1 left-1 w-8 h-8 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full"></div>
          </div>
        );
      case 'breath':
        return (
          <div className="relative">
            <div className="w-10 h-6 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></div>
            <div className="absolute top-2 left-2 w-6 h-2 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full"></div>
          </div>
        );
      case 'exercise':
        return (
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg transform rotate-45"></div>
            <div className="absolute top-1 left-1 w-6 h-6 bg-gradient-to-br from-green-200 to-emerald-300 rounded-lg transform rotate-45"></div>
          </div>
        );
      case 'journal':
        return (
          <div className="relative">
            <div className="w-8 h-10 bg-gradient-to-b from-blue-400 to-cyan-500 rounded-sm"></div>
            <div className="absolute top-1 left-1 w-6 h-1 bg-blue-200 rounded"></div>
            <div className="absolute top-3 left-1 w-5 h-1 bg-blue-200 rounded"></div>
            <div className="absolute top-5 left-1 w-4 h-1 bg-blue-200 rounded"></div>
          </div>
        );
      case 'social':
        return (
          <div className="relative">
            <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full"></div>
            <div className="absolute top-1 left-4 w-6 h-6 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full"></div>
          </div>
        );
      case 'onsen':
        return (
          <div className="relative">
            <div className="w-10 h-6 bg-gradient-to-t from-purple-500 to-indigo-400 rounded-t-full"></div>
            <div className="absolute -top-1 left-2 w-2 h-3 bg-gradient-to-t from-purple-300 to-transparent rounded-full"></div>
            <div className="absolute -top-1 left-4 w-2 h-4 bg-gradient-to-t from-indigo-300 to-transparent rounded-full"></div>
            <div className="absolute -top-1 left-6 w-2 h-3 bg-gradient-to-t from-purple-300 to-transparent rounded-full"></div>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full"></div>
        );
    }
  };

  const handleActivityClick = (activity: JourneyActivity) => {
    if (!activity.locked) {
      setSelectedActivity(activity);
      setActivityModalOpen(true);
    }
  };

  const handleActivityComplete = (xp: number, badge?: string) => {
    // Mark activity as completed using the hook
    if (selectedActivity) {
      completeActivity(selectedActivity.id);
      console.log(`Activity ${selectedActivity.id} completed! +${xp} XP`, badge ? `Badge earned: ${badge}` : '');
    }
    
    setActivityModalOpen(false);
    setSelectedActivity(null);
  };

  if (!isOpen) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-800 relative overflow-hidden">
      {/* Starfield - multiple layers of twinkling stars */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large bright stars - only in upper area */}
        {[...Array(25)].map((_, i) => {
          const duration = 30 + Math.random() * 30; // 30-60 seconds
          const delay = Math.random() * 60; // 0-60 seconds delay
          return (
            <div
              key={`star-large-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`, // Only upper 50% of screen
                width: '3px',
                height: '3px',
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4)',
                opacity: 0.3,
                animation: `starTwinkle${i} ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`
              }}
            />
          );
        })}

        {/* Medium stars - only in upper area */}
        {[...Array(40)].map((_, i) => {
          const duration = 40 + Math.random() * 40; // 40-80 seconds
          const delay = Math.random() * 80; // 0-80 seconds delay
          return (
            <div
              key={`star-medium-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`, // Only upper 60% of screen
                width: '2px',
                height: '2px',
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.6), 0 0 8px rgba(255, 255, 255, 0.3)',
                opacity: 0.2,
                animation: `starTwinkle${i + 25} ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`
              }}
            />
          );
        })}

        {/* Small distant stars - only in upper area */}
        {[...Array(60)].map((_, i) => {
          const duration = 50 + Math.random() * 50; // 50-100 seconds
          const delay = Math.random() * 100; // 0-100 seconds delay
          return (
            <div
              key={`star-small-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 70}%`, // Only upper 70% of screen
                width: '1px',
                height: '1px',
                boxShadow: '0 0 2px rgba(255, 255, 255, 0.4)',
                opacity: 0.1,
                animation: `starTwinkle${i + 65} ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`
              }}
            />
          );
        })}

        {/* Constellation-like connected stars - only in upper area */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`constellation-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + Math.random() * 30}%` // Only upper 40% of screen
            }}
          >
            <div
              className="absolute rounded-full bg-blue-200"
              style={{
                width: '2px',
                height: '2px',
                opacity: 0.3,
                animation: `constellationGlow${i} 45s ease-in-out infinite`,
                animationDelay: `${i * 5}s`
              }}
            />
            <div
              className="absolute rounded-full bg-blue-200"
              style={{
                left: '15px',
                top: '10px',
                width: '2px',
                height: '2px',
                opacity: 0.3,
                animation: `constellationGlow${i + 4} 45s ease-in-out infinite`,
                animationDelay: `${i * 5 + 10}s`
              }}
            />
            <div
              className="absolute w-4 h-px bg-gradient-to-r from-blue-200/30 to-transparent"
              style={{
                left: '2px',
                top: '6px',
                transform: 'rotate(35deg)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Dawn horizon glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-900/20 via-pink-900/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-900/30 via-orange-900/15 to-transparent" />

      {/* Subtle cloud wisps */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={`cloud-wisp-${i}`}
            className="absolute opacity-10"
            style={{
              left: `${i * 20 + 10}%`,
              top: `${60 + i * 5}%`,
              fontSize: '4rem',
              color: 'rgba(255, 255, 255, 0.1)'
            }}
          >
            ☁️
          </div>
        ))}
      </div>

      {/* Floating ethereal mist */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mist layers */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-800/30 via-slate-700/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-700/40 via-slate-600/25 to-transparent" />
        
        {/* Floating mist particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`mist-${i}`}
            className="absolute rounded-full bg-white/5"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100 + 20}px`,
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              filter: 'blur(8px)'
            }}
          />
        ))}
      </div>

      {/* Enhanced Header with starry night styling */}
      <div className="relative z-10 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-2xl">
                ✨ Today's Journey
              </h1>
              <p className="text-blue-200 text-sm mt-1">
                {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <Badge variant="secondary" className="bg-slate-800/60 text-blue-200 border-slate-600/50 backdrop-blur-sm ghibli-shadow">
              Semana {selectedWeek}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden md:flex gap-2">
              <Button
                size="sm"
                variant={selectedWeek === 1 ? "default" : "outline"}
                className="bg-slate-800/60 border-slate-600/50 text-blue-200 hover:bg-slate-700/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 ghibli-shadow"
                onClick={() => setSelectedWeek(1)}
              >
                Semana 1
              </Button>
              <Button
                size="sm"
                variant={selectedWeek === 2 ? "default" : "outline"}
                className="bg-slate-800/60 border-slate-600/50 text-blue-200 hover:bg-slate-700/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 ghibli-shadow"
                onClick={() => setSelectedWeek(2)}
              >
                Semana 2
              </Button>
            </div>
            
            <Button
              onClick={onClose}
              className="bg-rose-900/60 hover:bg-rose-800/60 text-rose-200 border-rose-700/50 rounded-full w-12 h-12 p-0 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:rotate-90 ghibli-shadow"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Enhanced Progress Stats with starry night styling - smaller cards */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <Card className="p-3 bg-slate-800/40 backdrop-blur-md border-slate-600/50 ghibli-shadow hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-slate-700/40">
            <div className="flex flex-col items-center gap-1">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <div className="text-center">
                <p className="text-xs text-blue-200 font-medium">Completadas</p>
                <p className="font-bold text-white text-sm">{activities.filter(a => a.completed).length}/{activities.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-3 bg-slate-800/40 backdrop-blur-md border-slate-600/50 ghibli-shadow hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-slate-700/40">
            <div className="flex flex-col items-center gap-1">
              <Zap className="w-5 h-5 text-amber-400" />
              <div className="text-center">
                <p className="text-xs text-blue-200 font-medium">XP Total</p>
                <p className="font-bold text-white text-sm">{activities.filter(a => a.completed).reduce((sum, a) => sum + a.xp, 0)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-3 bg-slate-800/40 backdrop-blur-md border-slate-600/50 ghibli-shadow hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-slate-700/40">
            <div className="flex flex-col items-center gap-1">
              <Calendar className="w-5 h-5 text-sky-400" />
              <div className="text-center">
                <p className="text-xs text-blue-200 font-medium">Día Actual</p>
                <p className="font-bold text-white text-sm">{Math.max(...activities.filter(a => a.completed).map(a => a.day), 1)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-3 bg-slate-800/40 backdrop-blur-md border-slate-600/50 ghibli-shadow hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-slate-700/40">
            <div className="flex flex-col items-center gap-1">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <div className="text-center">
                <p className="text-xs text-blue-200 font-medium">Racha</p>
                <p className="font-bold text-white text-sm">{activities.filter(a => a.completed).length} días</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Journey Path */}
      <div className="relative z-10 flex-1 px-4 md:px-6 pb-6">
        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
          {/* Enhanced Path Line for starry night */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
                <stop offset="25%" stopColor="#4c1d95" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#7c2d12" stopOpacity="0.9" />
                <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="starGlow">
                <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Ethereal path background */}
            <path
              d={`M ${activities[0]?.position.x}% ${activities[0]?.position.y}% ${activities.map(activity => 
                `L ${activity.position.x}% ${activity.position.y}%`
              ).join('')}`}
              stroke="rgba(148, 163, 184, 0.3)"
              strokeWidth="16"
              fill="none"
              filter="url(#starGlow)"
              className="animate-pulse"
            />
            
            {/* Main stellar path */}
            <path
              d={`M ${activities[0]?.position.x}% ${activities[0]?.position.y}% ${activities.map(activity => 
                `L ${activity.position.x}% ${activity.position.y}%`
              ).join('')}`}
              stroke="url(#pathGradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray="25,15"
              filter="url(#glow)"
              className="animate-pulse"
              style={{
                animation: 'dash 5s linear infinite',
                strokeDashoffset: '40'
              }}
            />
          </svg>

          {/* Activity Stops with starry night styling */}
          {activities.map((activity, index) => {
            const themeStyles = getThemeStyles(activity.theme, activity.completed, activity.locked);
            const pulseDelay = index * 0.7;
            
            return (
              <div
                key={activity.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${activity.position.x}%`,
                  top: `${activity.position.y}%`,
                  animationDelay: `${pulseDelay}s`
                }}
                onClick={() => handleActivityClick(activity)}
              >
                {/* Ethereal mist platform under each activity */}
                <div 
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 rounded-full bg-slate-700/20 pointer-events-none"
                  style={{
                    width: '80px',
                    height: '25px',
                    filter: 'blur(10px)'
                  }}
                />

                {/* Stellar constellation glow effect */}
                <div className={`
                  absolute inset-0 rounded-full
                  ${!activity.locked && !activity.completed ? 'opacity-50' : 'opacity-0'}
                `} 
                style={{ 
                  width: '100px', 
                  height: '100px',
                  background: `radial-gradient(circle, ${
                    activity.completed ? 'rgba(34, 197, 94, 0.2)' : 
                    activity.locked ? 'rgba(107, 114, 128, 0.1)' : 
                    'rgba(59, 130, 246, 0.15)'
                  }, transparent)`,
                  boxShadow: activity.completed ? '0 0 40px rgba(34, 197, 94, 0.3)' : 
                             !activity.locked ? '0 0 30px rgba(59, 130, 246, 0.2)' : 'none'
                }} />

                {/* Activity Node with stellar styling */}
                <div className={`
                  relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-4 
                  ${themeStyles.bg} ${themeStyles.border}
                  flex items-center justify-center text-3xl md:text-4xl lg:text-5xl
                  transform transition-all duration-700 hover:scale-130 hover:-translate-y-4
                  ${!activity.locked ? 'hover:shadow-2xl cursor-pointer' : 'cursor-not-allowed'}
                  ${activity.completed ? 'ring-4 ring-emerald-400/50' : ''}
                  backdrop-blur-sm border-slate-600/60
                `}
                style={{
                  boxShadow: activity.completed ? 
                    '0 0 50px rgba(34, 197, 94, 0.6), 0 0 100px rgba(34, 197, 94, 0.3), inset 0 0 20px rgba(34, 197, 94, 0.1)' : 
                    !activity.locked ? 
                    '0 0 40px rgba(59, 130, 246, 0.4), 0 0 80px rgba(59, 130, 246, 0.2), inset 0 0 15px rgba(59, 130, 246, 0.1)' : 
                    '0 0 25px rgba(107, 114, 128, 0.3), inset 0 0 10px rgba(107, 114, 128, 0.1)'
                }}>
                  <div className="drop-shadow-2xl filter brightness-110 flex items-center justify-center">
                    {getActivityIcon(activity.icon, activity.completed, activity.locked)}
                  </div>
                  
                  {/* Enhanced XP Badge with stellar styling */}
                  {!activity.locked && (
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white text-sm font-bold rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border-3 border-slate-800 shadow-2xl backdrop-blur-sm">
                      <span className="drop-shadow-lg text-xs md:text-sm">{activity.xp}</span>
                    </div>
                  )}
                  
                  {/* Enhanced Day Badge with dawn styling */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 text-blue-200 text-sm font-bold rounded-full px-6 py-2 shadow-2xl border-2 border-slate-500 backdrop-blur-sm">
                    Día {activity.day}
                  </div>
                </div>

                {/* Enhanced Activity Info Tooltip with starry styling */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-8 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 scale-95 group-hover:scale-100">
                  <Card className="p-5 bg-slate-800/90 backdrop-blur-md border-slate-600/70 shadow-2xl min-w-[260px] rounded-2xl border-2">
                    <h3 className="font-bold text-blue-200 text-sm mb-2">{activity.title}</h3>
                    <p className="text-xs text-slate-300 mb-4 leading-relaxed">{activity.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs bg-amber-900/50 text-amber-200 border-amber-700/50">
                        ⚡ {activity.xp} XP
                      </Badge>
                      {activity.completed && (
                        <Badge variant="outline" className="text-xs text-emerald-300 border-emerald-500/50 bg-emerald-900/30">
                          ✅ Completado
                        </Badge>
                      )}
                      {activity.locked && (
                        <Badge variant="outline" className="text-xs text-slate-400 border-slate-500/50 bg-slate-800/50">
                          🔒 Bloqueado
                        </Badge>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Modal */}
      <ActivityModal
        isOpen={activityModalOpen}
        onClose={() => {
          setActivityModalOpen(false);
          setSelectedActivity(null);
        }}
        activityId={selectedActivity?.id || 0}
        onComplete={handleActivityComplete}
      />
    </div>
  );
};

export default JourneyMapView; 