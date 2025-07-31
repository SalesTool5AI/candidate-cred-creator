import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface HealthStatus {
  database: boolean;
  functions: boolean;
  overall: boolean;
  lastChecked: Date | null;
}

export const useHealthCheck = (interval = 30000) => {
  const [health, setHealth] = useState<HealthStatus>({
    database: true,
    functions: true,
    overall: true,
    lastChecked: null
  });

  const checkHealth = async () => {
    try {
      // Check database connectivity
      const { error: dbError } = await supabase
        .from('sam_knowledge_base')
        .select('id')
        .limit(1);

      // Check edge function health
      let functionsHealthy = true;
      try {
        const { error: fnError } = await supabase.functions.invoke('chat-with-sam', {
          body: { message: 'health-check', healthCheck: true }
        });
        functionsHealthy = !fnError;
      } catch {
        functionsHealthy = false;
      }

      const databaseHealthy = !dbError;
      const overallHealth = databaseHealthy && functionsHealthy;

      setHealth({
        database: databaseHealthy,
        functions: functionsHealthy,
        overall: overallHealth,
        lastChecked: new Date()
      });

      if (!overallHealth) {
        console.warn('Health check failed:', {
          database: databaseHealthy,
          functions: functionsHealthy
        });
      }

    } catch (error) {
      console.error('Health check error:', error);
      setHealth({
        database: false,
        functions: false,
        overall: false,
        lastChecked: new Date()
      });
    }
  };

  useEffect(() => {
    checkHealth();
    const healthInterval = setInterval(checkHealth, interval);
    return () => clearInterval(healthInterval);
  }, [interval]);

  return { health, checkHealth };
};