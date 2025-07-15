
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginPage } from '@/components/LoginPage';
import { isDevelopment, createMockUser } from '@/lib/dev-utils';
import { Button } from '@/components/ui/button';

interface AuthGateProps {
  children: React.ReactNode;
}

export const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const { user, loading, setMockUser } = useAuth();
  const [devBypass, setDevBypass] = useState(false);

  const handleDevBypass = () => {
    if (isDevelopment()) {
      const mockUser = createMockUser();
      setMockUser(mockUser);
      setDevBypass(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user && !devBypass) {
    return (
      <div className="relative">
        <LoginPage />
        {isDevelopment() && (
          <div className="fixed bottom-4 right-4">
            <Button 
              onClick={handleDevBypass}
              variant="outline"
              className="bg-orange-100 border-orange-300 text-orange-800 hover:bg-orange-200"
            >
              Continue as Developer
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {isDevelopment() && (user?.id === 'dev-user-123' || devBypass) && (
        <div className="bg-orange-100 border-b border-orange-300 px-4 py-2 text-center text-sm text-orange-800">
          🚧 Development Mode - Bypassing Authentication
        </div>
      )}
      {children}
    </>
  );
};
