import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TestSupabase() {
  useEffect(() => {
    const test = async () => {
      const { data, error } = await supabase.from('users').select('*').limit(1);
      if (error) {
        console.error('Error de conexión:', error.message);
      } else {
        console.log('Conexión exitosa. Ejemplo de datos:', data);
      }
    };
    test();
  }, []);
  return null;
} 