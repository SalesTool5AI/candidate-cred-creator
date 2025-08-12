
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
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


  useEffect(() => {
    // Set up auth state listener first (must be synchronous to avoid deadlocks)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);

      // Update core auth state immediately
      setSession(session);
      setUser(session?.user ?? null);

      // Handle successful sign in
      if (event === 'SIGNED_IN' && session?.user) {
        // Clean up URL hash after successful authentication
        if (typeof window !== 'undefined' && window.location.hash.includes('access_token')) {
          try {
            window.history.replaceState({}, document.title, window.location.pathname);
          } catch (e) {
            console.warn('Failed to clean URL hash:', e);
          }
        }

        // Defer Supabase calls to avoid async work inside the callback
        setTimeout(() => {
          const email = session.user?.email;
          const domain = email?.split('@')[1];

          if (email && domain) {
            (async () => {
              try {
                // Get company name from allowed_domains - use maybeSingle for safety
                const { data: domainData } = await supabase
                  .from('allowed_domains')
                  .select('company_name')
                  .eq('domain', domain)
                  .maybeSingle();

                if (domainData) {
                  // Insert or update authorized user record
                  await supabase
                    .from('authorized_users')
                    .upsert({
                      user_id: session.user.id,
                      email,
                      domain,
                      company_name: domainData.company_name,
                      last_login: new Date().toISOString()
                    }, {
                      onConflict: 'user_id'
                    });
                  console.log('User tracking updated successfully');
                }
              } catch (error) {
                console.error('Error tracking user:', error);
              }
            })();
          }
        }, 0);
      }

      // Handle sign out
      if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        setSession(null);
        setUser(null);
      }

      setLoading(false);
    });

    // Check for existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email || 'No session');
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
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
