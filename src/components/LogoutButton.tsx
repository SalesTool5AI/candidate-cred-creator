
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export const LogoutButton: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Button
      onClick={signOut}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-50"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Sign Out
    </Button>
  );
};
