
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Smartphone, Clock, TrendingDown, AlertCircle } from 'lucide-react';

const ScreenTimeWidget = () => {
  // Datos simulados del tiempo de pantalla
  const screenTimeData = {
    todayTotal: 4.2, // horas
    dailyGoal: 6, // horas
    weeklyAverage: 5.1,
    topApps: [
      { name: 'Instagram', time: 1.2, icon: '📱' },
      { name: 'WhatsApp', time: 0.8, icon: '💬' },
      { name: 'YouTube', time: 0.9, icon: '📺' },
      { name: 'TikTok', time: 0.7, icon: '🎵' }
    ],
    trend: -0.3 // horas menos que ayer
  };

  const progressPercentage = (screenTimeData.todayTotal / screenTimeData.dailyGoal) * 100;
  const isOverGoal = screenTimeData.todayTotal > screenTimeData.dailyGoal;

  return (
    <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-vitalis-green/10 rounded-2xl">
          <Smartphone className="w-6 h-6 text-vitalis-green" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-vitalis-brown">Tiempo de Pantalla</h3>
          <p className="text-sm text-vitalis-brown/70">Hoy</p>
        </div>
      </div>

      {/* Tiempo total de hoy */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-vitalis-brown mb-1">
          {screenTimeData.todayTotal}h
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
          {screenTimeData.trend < 0 ? (
            <>
              <TrendingDown className="w-4 h-4 text-vitalis-green" />
              <span className="text-vitalis-green">
                {Math.abs(screenTimeData.trend)}h menos que ayer
              </span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500">
                {screenTimeData.trend}h más que ayer
              </span>
            </>
          )}
        </div>
      </div>

      {/* Progreso hacia el objetivo */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-vitalis-brown font-medium">
            Meta diaria: {screenTimeData.dailyGoal}h
          </span>
          <span className={`text-sm font-medium ${
            isOverGoal ? 'text-orange-500' : 'text-vitalis-green'
          }`}>
            {progressPercentage.toFixed(0)}%
          </span>
        </div>
        <Progress 
          value={Math.min(progressPercentage, 100)} 
          className="h-2"
        />
        {isOverGoal && (
          <p className="text-xs text-orange-500 mt-1">
            Has superado tu meta diaria
          </p>
        )}
      </div>

      {/* Apps más usadas */}
      <div>
        <h4 className="text-sm font-medium text-vitalis-brown mb-3">Apps más usadas</h4>
        <div className="space-y-2">
          {screenTimeData.topApps.map((app, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{app.icon}</span>
                <span className="text-sm text-vitalis-brown">{app.name}</span>
              </div>
              <span className="text-sm text-vitalis-brown/70 font-medium">
                {app.time}h
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Estadística semanal */}
      <div className="mt-4 pt-4 border-t border-vitalis-gold/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-vitalis-brown/70">Promedio semanal</span>
          <span className="text-vitalis-brown font-medium">
            {screenTimeData.weeklyAverage}h/día
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ScreenTimeWidget;
