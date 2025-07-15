
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  setMockUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const setMockUser = (mockUser: any) => {
    setUser(mockUser);
    setLoading(false);
  };

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Track authorized users when they sign in
        if (event === 'SIGNED_IN' && session?.user) {
          const email = session.user.email;
          const domain = email?.split('@')[1];
          
          if (email && domain) {
            // Get company name from allowed_domains
            const { data: domainData } = await supabase
              .from('allowed_domains')
              .select('company_name')
              .eq('domain', domain)
              .single();
            
            if (domainData) {
              // Insert or update authorized user record
              await supabase
                .from('authorized_users')
                .upsert({
                  user_id: session.user.id,
                  email: email,
                  domain: domain,
                  company_name: domainData.company_name,
                  last_login: new Date().toISOString()
                }, {
                  onConflict: 'user_id'
                });
            }
          }
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut, setMockUser }}>
      {children}
    </AuthContext.Provider>
  );
};
