
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Edit, Trophy, Target, Calendar, Star } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@universidad.edu',
    university: 'Universidad Nacional',
    career: 'Ingeniería de Sistemas',
    semester: '6to Semestre'
  });

  const stats = [
    { label: 'Días consecutivos', value: 21, icon: '🔥' },
    { label: 'XP Total', value: 2340, icon: '⭐' },
    { label: 'Nivel actual', value: 12, icon: '🏆' },
    { label: 'Actividades completadas', value: 287, icon: '✅' }
  ];

  const achievements = [
    { name: 'Primera Semana', description: '7 días consecutivos', rarity: 'común', unlocked: true },
    { name: 'Meditador', description: '50 sesiones completadas', rarity: 'raro', unlocked: true },
    { name: 'Atleta Mental', description: 'Nivel 10 alcanzado', rarity: 'épico', unlocked: true },
    { name: 'Maestro Zen', description: '100 días de mindfulness', rarity: 'legendario', unlocked: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitalis-cream via-white to-vitalis-green-light/10">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card className="p-8 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-vitalis-gold/20 rounded-full flex items-center justify-center text-4xl">
              🦫
            </div>
            
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <Input 
                    value={userInfo.name} 
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    className="text-xl font-bold"
                  />
                  <Input 
                    value={userInfo.email} 
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                  />
                  <Input 
                    value={userInfo.university} 
                    onChange={(e) => setUserInfo({...userInfo, university: e.target.value})}
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-vitalis-brown mb-2">{userInfo.name}</h1>
                  <p className="text-vitalis-brown/70 mb-1">{userInfo.email}</p>
                  <p className="text-vitalis-brown/70 mb-1">{userInfo.university}</p>
                  <p className="text-vitalis-brown/70">{userInfo.career} - {userInfo.semester}</p>
                </>
              )}
            </div>
            
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              className="bg-vitalis-gold hover:bg-vitalis-gold-dark text-white rounded-2xl"
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? 'Guardar' : 'Editar'}
            </Button>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-white rounded-2xl border-2 border-vitalis-gold/20 shadow-lg text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-vitalis-brown">{stat.value}</div>
              <div className="text-sm text-vitalis-brown/70">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Progress Section */}
        <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
          <h2 className="text-xl font-bold text-vitalis-brown mb-6">Progreso por Módulo</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-vitalis-brown font-medium">🧠 MindTrack</span>
                <span className="text-vitalis-brown/70">75%</span>
              </div>
              <Progress value={75} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-vitalis-brown font-medium">🌱 BodySync</span>
                <span className="text-vitalis-brown/70">60%</span>
              </div>
              <Progress value={60} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-vitalis-brown font-medium">🍃 SoulBoost</span>
                <span className="text-vitalis-brown/70">85%</span>
              </div>
              <Progress value={85} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-vitalis-brown font-medium">🤝 SocialHarmony</span>
                <span className="text-vitalis-brown/70">55%</span>
              </div>
              <Progress value={55} className="h-3" />
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
          <h2 className="text-xl font-bold text-vitalis-brown mb-6">Logros Desbloqueados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-2xl border-2 ${
                  achievement.unlocked 
                    ? 'bg-vitalis-gold/10 border-vitalis-gold/30' 
                    : 'bg-gray-100 border-gray-200 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-vitalis-brown">{achievement.name}</h3>
                  <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                    {achievement.rarity}
                  </Badge>
                </div>
                <p className="text-sm text-vitalis-brown/70">{achievement.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
