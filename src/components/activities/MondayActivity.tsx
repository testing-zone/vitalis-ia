import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Brain, Users, Sparkles, CheckCircle, Timer } from 'lucide-react';

interface MondayActivityProps {
  onComplete: (xp: number, badge?: string) => void;
}

interface Seed {
  id: number;
  area: 'mental' | 'relaciones' | 'autocuidado';
  intention: string;
  planted: boolean;
  growing: boolean;
}

const MondayActivity: React.FC<MondayActivityProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'planting' | 'complete'>('intro');
  const [seeds, setSeeds] = useState<Seed[]>([
    { id: 1, area: 'mental', intention: '', planted: false, growing: false },
    { id: 2, area: 'relaciones', intention: '', planted: false, growing: false },
    { id: 3, area: 'autocuidado', intention: '', planted: false, growing: false }
  ]);
  const [currentSeedIndex, setCurrentSeedIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(420); // 7 minutes in seconds
  const [capiMessage, setCapiMessage] = useState('');

  const areaInfo = {
    mental: {
      icon: Brain,
      color: 'from-purple-400 to-indigo-500',
      title: 'Salud Mental',
      description: 'Cuidar tu mente y emociones',
      placeholder: 'Ej: Meditar 10 minutos cada día, practicar gratitud...'
    },
    relaciones: {
      icon: Users,
      color: 'from-rose-400 to-pink-500',
      title: 'Relaciones',
      description: 'Conectar con otros de manera significativa',
      placeholder: 'Ej: Llamar a un amigo, expresar amor a mi familia...'
    },
    autocuidado: {
      icon: Heart,
      color: 'from-emerald-400 to-teal-500',
      title: 'Autocuidado',
      description: 'Nutrir tu bienestar físico y emocional',
      placeholder: 'Ej: Dormir 8 horas, hacer ejercicio, comer saludable...'
    }
  };

  const capiMessages = {
    intro: "¡Hola! Soy Capi, tu guía de sabiduría. Hoy plantaremos las semillas de tus intenciones para esta semana. Cada semilla que plantes crecerá con tus acciones diarias. 🌱",
    mental: "La mente es como un jardín. Cuando la cuidas con intenciones claras, florecen pensamientos hermosos y paz interior. ¿Qué quieres cultivar en tu mente esta semana?",
    relaciones: "Las relaciones son puentes dorados que conectan corazones. Cuando plantas semillas de amor y conexión, cosechas momentos inolvidables. ¿Cómo quieres nutrir tus relaciones?",
    autocuidado: "Tu bienestar es tu tesoro más preciado. Como un río que fluye tranquilo, el autocuidado te da la energía para brillar. ¿Qué necesita tu ser para florecer?",
    complete: "¡Maravilloso! Has plantado tres semillas doradas en tu jardín de intenciones. Recuerda regarlas cada día con pequeñas acciones. Yo estaré aquí para recordarte su crecimiento. 🌟"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentStep === 'intro') {
      setCapiMessage(capiMessages.intro);
    } else if (currentStep === 'planting') {
      const currentSeed = seeds[currentSeedIndex];
      if (currentSeed) {
        setCapiMessage(capiMessages[currentSeed.area]);
      }
    } else if (currentStep === 'complete') {
      setCapiMessage(capiMessages.complete);
    }
  }, [currentStep, currentSeedIndex, seeds]);

  const handleStartPlanting = () => {
    setCurrentStep('planting');
  };

  const handleIntentionChange = (value: string) => {
    setSeeds(prev => prev.map((seed, index) => 
      index === currentSeedIndex ? { ...seed, intention: value } : seed
    ));
  };

  const handlePlantSeed = async () => {
    if (!seeds[currentSeedIndex].intention.trim()) return;

    // Plant the seed with animation
    setSeeds(prev => prev.map((seed, index) => 
      index === currentSeedIndex ? { ...seed, planted: true } : seed
    ));

    // Wait for planting animation
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Start growing animation
    setSeeds(prev => prev.map((seed, index) => 
      index === currentSeedIndex ? { ...seed, growing: true } : seed
    ));

    // Wait for growing animation
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (currentSeedIndex < seeds.length - 1) {
      setCurrentSeedIndex(prev => prev + 1);
    } else {
      setCurrentStep('complete');
      setTimeout(() => {
        onComplete(50, 'Jardinero de Sueños');
      }, 2000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentSeed = seeds[currentSeedIndex];
  const currentAreaInfo = currentSeed ? areaInfo[currentSeed.area] : null;

  return (
    <div className="p-6 space-y-6">
      {/* Header with Capi and Timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center text-2xl shadow-lg animate-bounce">
            🦫
          </div>
          <div>
            <h3 className="text-xl font-bold text-vitalis-brown">Lunes - Nuevo Comienzo</h3>
            <p className="text-vitalis-brown/70">Mapa de Intenciones Semanales</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-vitalis-gold" />
          <Badge variant="outline" className="border-vitalis-gold text-vitalis-gold">
            {formatTime(timeRemaining)}
          </Badge>
        </div>
      </div>

      {/* Capi's Message */}
      <Card className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full flex items-center justify-center text-lg flex-shrink-0">
            🦫
          </div>
          <div className="flex-1">
            <p className="text-amber-800 leading-relaxed">{capiMessage}</p>
          </div>
        </div>
      </Card>

      {currentStep === 'intro' && (
        <div className="space-y-6">
          {/* Garden Preview */}
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Tu Jardín de Intenciones
            </h4>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(areaInfo).map(([key, info]) => {
                const IconComponent = info.icon;
                return (
                  <div key={key} className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h5 className="font-medium text-gray-700">{info.title}</h5>
                    <p className="text-xs text-gray-500 mt-1">{info.description}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Button 
            onClick={handleStartPlanting}
            className="w-full bg-gradient-to-r from-vitalis-gold to-vitalis-gold-dark hover:from-vitalis-gold-dark hover:to-vitalis-gold text-white py-3 rounded-xl shadow-lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Comenzar a Plantar Semillas
          </Button>
        </div>
      )}

      {currentStep === 'planting' && currentAreaInfo && (
        <div className="space-y-6">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2">
            {seeds.map((seed, index) => (
              <div
                key={seed.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index < currentSeedIndex ? 'bg-green-500' :
                  index === currentSeedIndex ? 'bg-vitalis-gold animate-pulse' :
                  'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Current Seed Area */}
          <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200">
            <div className="text-center mb-6">
              <div className={`w-20 h-20 bg-gradient-to-br ${currentAreaInfo.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <currentAreaInfo.icon className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800">{currentAreaInfo.title}</h4>
              <p className="text-gray-600">{currentAreaInfo.description}</p>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                ¿Qué intención quieres plantar en esta área?
              </label>
              <Textarea
                placeholder={currentAreaInfo.placeholder}
                value={currentSeed.intention}
                onChange={(e) => handleIntentionChange(e.target.value)}
                className="min-h-[100px] border-2 border-gray-200 focus:border-vitalis-gold rounded-xl"
              />
            </div>
          </Card>

          {/* Plant Button */}
          <Button 
            onClick={handlePlantSeed}
            disabled={!currentSeed.intention.trim()}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl shadow-lg disabled:opacity-50"
          >
            {currentSeed.planted ? (
              currentSeed.growing ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  ¡Semilla Plantada y Creciendo!
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Plantando Semilla...
                </>
              )
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Plantar Semilla Dorada
              </>
            )}
          </Button>
        </div>
      )}

      {currentStep === 'complete' && (
        <div className="space-y-6 text-center">
          {/* Success Animation */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-vitalis-gold to-vitalis-gold-dark rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>

          <div>
            <h4 className="text-2xl font-bold text-vitalis-brown mb-2">¡Felicitaciones!</h4>
            <p className="text-vitalis-brown/70 mb-4">Has plantado tus 3 semillas doradas de intenciones</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {seeds.map((seed) => {
                const areaData = areaInfo[seed.area];
                const IconComponent = areaData.icon;
                return (
                  <Card key={seed.id} className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                    <div className={`w-12 h-12 bg-gradient-to-br ${areaData.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-semibold text-gray-800 text-sm">{areaData.title}</h5>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{seed.intention}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Badge className="bg-vitalis-gold text-white px-4 py-2">
              +50 XP
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
              🏆 Jardinero de Sueños
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default MondayActivity; 