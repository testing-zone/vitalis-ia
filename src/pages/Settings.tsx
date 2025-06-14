
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Bell, Shield, Palette, Volume2, Moon, Smartphone, LogOut } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    soundEnabled: true,
    reminderFrequency: 'medium',
    privacyMode: false,
    screenTimeTracking: true,
    volume: [75]
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitalis-cream via-white to-vitalis-green-light/10">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-vitalis-brown mb-2">Configuración</h1>
          <p className="text-vitalis-brown/70">Personaliza tu experiencia en VitalisIA</p>
        </div>

        {/* Notificaciones */}
        <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-6 h-6 text-vitalis-gold" />
            <h2 className="text-xl font-bold text-vitalis-brown">Notificaciones</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-vitalis-brown">Notificaciones push</p>
                <p className="text-sm text-vitalis-brown/70">Recibe recordatorios y actualizaciones</p>
              </div>
              <Switch 
                checked={settings.notifications} 
                onCheckedChange={(checked) => updateSetting('notifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-vitalis-brown">Frecuencia de recordatorios</p>
                <p className="text-sm text-vitalis-brown/70">¿Con qué frecuencia quieres recordatorios?</p>
              </div>
              <Select value={settings.reminderFrequency} onValueChange={(value) => updateSetting('reminderFrequency', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Apariencia */}
        <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-6 h-6 text-vitalis-gold" />
            <h2 className="text-xl font-bold text-vitalis-brown">Apariencia</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-vitalis-brown">Modo oscuro</p>
                <p className="text-sm text-vitalis-brown/70">Cambia el tema de la aplicación</p>
              </div>
              <Switch 
                checked={settings.darkMode} 
                onCheckedChange={(checked) => updateSetting('darkMode', checked)}
              />
            </div>
          </div>
        </Card>

        {/* Sonido */}
        <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Volume2 className="w-6 h-6 text-vitalis-gold" />
            <h2 className="text-xl font-bold text-vitalis-brown">Audio</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-vitalis-brown">Sonidos habilitados</p>
                <p className="text-sm text-vitalis-brown/70">Efectos de sonido y notificaciones</p>
              </div>
              <Switch 
                checked={settings.soundEnabled} 
                onCheckedChange={(checked) => updateSetting('soundEnabled', checked)}
              />
            </div>
            
            <div>
              <p className="font-medium text-vitalis-brown mb-2">Volumen</p>
              <Slider
                value={settings.volume}
                onValueChange={(value) => updateSetting('volume', value)}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </Card>

        {/* Privacidad */}
        <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-vitalis-gold" />
            <h2 className="text-xl font-bold text-vitalis-brown">Privacidad</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-vitalis-brown">Modo privado</p>
                <p className="text-sm text-vitalis-brown/70">Oculta tu actividad a otros usuarios</p>
              </div>
              <Switch 
                checked={settings.privacyMode} 
                onCheckedChange={(checked) => updateSetting('privacyMode', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-vitalis-brown">Seguimiento de tiempo de pantalla</p>
                <p className="text-sm text-vitalis-brown/70">Permite el monitoreo del uso del dispositivo</p>
              </div>
              <Switch 
                checked={settings.screenTimeTracking} 
                onCheckedChange={(checked) => updateSetting('screenTimeTracking', checked)}
              />
            </div>
          </div>
        </Card>

        {/* Acciones */}
        <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start rounded-2xl border-2 border-vitalis-gold/20 hover:bg-vitalis-gold/10"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Exportar mis datos
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start rounded-2xl border-2 border-red-200 hover:bg-red-50 text-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Settings;
