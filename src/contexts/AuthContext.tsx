
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
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        // Handle successful sign in from magic link
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('User signed in successfully:', session.user.email);
          
          // Clean up URL hash after successful authentication
          if (window.location.hash.includes('access_token')) {
            console.log('Cleaning up auth tokens from URL');
            // Replace the current URL to remove the auth tokens from the hash
            window.history.replaceState({}, document.title, window.location.pathname);
          }
          
          // Track authorized users when they sign in
          const email = session.user.email;
          const domain = email?.split('@')[1];
          
          if (email && domain) {
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
                    email: email,
                    domain: domain,
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
          }
        }
        
        // Handle sign out
        if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setSession(null);
          setUser(null);
        }
        
        setLoading(false);
      }
    );

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
