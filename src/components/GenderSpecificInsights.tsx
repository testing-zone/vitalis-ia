import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Brain, Zap, Moon, Sun, Activity, TrendingUp, Lightbulb } from 'lucide-react';

interface GenderSpecificInsightsProps {
  gender: string;
  currentPhase?: string;
  age: string;
}

const GenderSpecificInsights: React.FC<GenderSpecificInsightsProps> = ({ gender, currentPhase, age }) => {
  const getInsightsForWomen = () => {
    return (
      <div className="space-y-6">
        <Card className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Moon className="w-6 h-6 text-pink-600" />
            <h3 className="text-xl font-bold text-pink-800">Consejos Hormonales</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-pink-700 mb-3">Recomendaciones:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Adapta ejercicio según tu ciclo</li>
                <li>• Mantén horarios de sueño regulares</li>
                <li>• Consume alimentos ricos en hierro</li>
                <li>• Practica mindfulness diario</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-pink-700 mb-3">Actividades sugeridas:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">Yoga suave</Badge>
                <Badge variant="secondary" className="text-xs">Meditación</Badge>
                <Badge variant="secondary" className="text-xs">Journaling</Badge>
                <Badge variant="secondary" className="text-xs">Hidratación</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const getInsightsForMen = () => {
    return (
      <div className="space-y-6">
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-blue-800">Optimización Energética</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 mb-3">Picos de energía:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-yellow-500" />
                  <span>Mañana: Testosterona alta</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>Ejercicio intenso matutino</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-blue-700 mb-3">Recomendaciones:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Ejercicio de fuerza en las mañanas</li>
                <li>• Trabajo mental en la tarde</li>
                <li>• Descanso adecuado (7-9 horas)</li>
                <li>• Manejo del estrés activo</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const getInsightsForNonBinary = () => {
    return (
      <div className="space-y-6">
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-purple-800">Bienestar Personalizado</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-purple-700 mb-3">Enfoque holístico:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Escucha las señales de tu cuerpo</li>
                <li>• Adapta rutinas a tu energía</li>
                <li>• Celebra tu individualidad</li>
                <li>• Crea espacios seguros</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-purple-700 mb-3">Principios universales:</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-purple-50 rounded-lg">
                  <Brain className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                  <span className="text-xs">Mente</span>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <span className="text-xs">Cuerpo</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  if (gender === 'mujer') {
    return getInsightsForWomen();
  } else if (gender === 'hombre') {
    return getInsightsForMen();
  } else {
    return getInsightsForNonBinary();
  }
};

export default GenderSpecificInsights; 