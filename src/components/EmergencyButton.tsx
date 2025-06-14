import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertTriangle, 
  Phone, 
  Users, 
  Send, 
  X, 
  Heart,
  MessageSquare,
  MapPin,
  Clock
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const EmergencyButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'initial' | 'form' | 'sent'>('initial');
  const [formData, setFormData] = useState({
    urgency: 'medium',
    description: '',
    contactPsychologist: true,
    contactFriends: true,
    shareLocation: false
  });
  const { toast } = useToast();

  const handleEmergencyReport = () => {
    // Simular envío de reporte
    console.log('Enviando reporte de emergencia:', formData);
    
    // Mostrar confirmación
    toast({
      title: "Reporte enviado",
      description: "Tu reporte ha sido enviado. Te contactaremos pronto.",
      duration: 5000,
    });

    setStep('sent');
    
    // Cerrar automáticamente después de 3 segundos
    setTimeout(() => {
      setIsOpen(false);
      setStep('initial');
      setFormData({
        urgency: 'medium',
        description: '',
        contactPsychologist: true,
        contactFriends: true,
        shareLocation: false
      });
    }, 3000);
  };

  const urgencyLevels = [
    { value: 'low', label: 'Necesito hablar', color: 'bg-yellow-500', icon: '💬' },
    { value: 'medium', label: 'Me siento mal', color: 'bg-orange-500', icon: '😰' },
    { value: 'high', label: 'Es urgente', color: 'bg-red-500', icon: '🚨' }
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg animate-pulse"
        >
          <AlertTriangle className="w-7 h-7" />
        </Button>
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full animate-ping" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 z-50">
      <Card className="bg-white rounded-3xl border-2 border-red-200 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-red-100 bg-red-50 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-red-800 text-sm">Apoyo de Emergencia</h3>
              <p className="text-xs text-red-600">Estamos aquí para ayudarte</p>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setIsOpen(false)}
            className="rounded-full hover:bg-red-100"
          >
            <X className="w-4 h-4 text-red-600" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          {step === 'initial' && (
            <div className="space-y-4">
              <div className="text-center">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  ¿Necesitas ayuda?
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Si te sientes abrumado o necesitas apoyo inmediato, estamos aquí para ti.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setStep('form')}
                  className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl py-3"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Enviar reporte de bienestar
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="text-xs py-2 border-red-200 hover:bg-red-50 rounded-xl"
                    onClick={() => {
                      window.open('tel:+1234567890', '_blank');
                    }}
                  >
                    <Phone className="w-3 h-3 mr-1" />
                    Línea Crisis
                  </Button>
                  <Button
                    variant="outline"
                    className="text-xs py-2 border-red-200 hover:bg-red-50 rounded-xl"
                    onClick={() => {
                      console.log('Contactar psicólogo universitario');
                    }}
                  >
                    <Users className="w-3 h-3 mr-1" />
                    Psicólogo
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  También puedes hablar con nuestro chatbot para apoyo inmediato
                </p>
                <Button
                  variant="link"
                  className="text-xs text-vitalis-gold hover:text-vitalis-gold-dark"
                  onClick={() => {
                    // Abrir chatbot
                    console.log('Abrir chatbot');
                  }}
                >
                  Abrir Chat IA
                </Button>
              </div>
            </div>
          )}

          {step === 'form' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">
                  ¿Cómo te sientes?
                </h4>
                <div className="space-y-2">
                  {urgencyLevels.map((level) => (
                    <Button
                      key={level.value}
                      variant={formData.urgency === level.value ? "default" : "outline"}
                      className={`w-full justify-start rounded-xl py-3 ${
                        formData.urgency === level.value 
                          ? `${level.color} text-white` 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setFormData({...formData, urgency: level.value})}
                    >
                      <span className="mr-2">{level.icon}</span>
                      {level.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cuéntanos más (opcional)
                </label>
                <Textarea
                  placeholder="Describe brevemente cómo te sientes o qué está pasando..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="rounded-xl border-gray-200 min-h-[80px]"
                />
              </div>

              <div className="space-y-3">
                <h5 className="font-medium text-gray-700">¿A quién contactar?</h5>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="psychologist"
                    checked={formData.contactPsychologist}
                    onChange={(e) => setFormData({...formData, contactPsychologist: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="psychologist" className="text-sm text-gray-700">
                    Psicólogo universitario
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="friends"
                    checked={formData.contactFriends}
                    onChange={(e) => setFormData({...formData, contactFriends: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="friends" className="text-sm text-gray-700">
                    Contactos de confianza
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="location"
                    checked={formData.shareLocation}
                    onChange={(e) => setFormData({...formData, shareLocation: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="location" className="text-sm text-gray-700">
                    Compartir mi ubicación
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep('initial')}
                  className="flex-1 rounded-xl border-gray-200"
                >
                  Volver
                </Button>
                <Button
                  onClick={handleEmergencyReport}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar
                </Button>
              </div>
            </div>
          )}

          {step === 'sent' && (
            <div className="text-center space-y-4 py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Mensaje enviado
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Tu reporte ha sido enviado a tu red de apoyo. Alguien se pondrá en contacto contigo pronto.
                </p>
                <div className="flex items-center justify-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  Enviado ahora
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default EmergencyButton; 