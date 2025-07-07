
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Extract domain from email
      const domain = email.split('@')[1];
      
      // Check if domain is allowed
      const { data: allowedDomain, error: domainError } = await supabase
        .from('allowed_domains')
        .select('*')
        .eq('domain', domain)
        .single();

      if (domainError || !allowedDomain) {
        toast({
          title: "Access Denied",
          description: `Sorry, ${domain} is not an authorized domain. This portfolio is only accessible to specific companies I've applied to.`,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Send magic link
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setSent(true);
        toast({
          title: "Magic Link Sent!",
          description: `Check your email at ${email} for a secure login link from ${allowedDomain.company_name}.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Sam Bryant's Portfolio
          </CardTitle>
          <CardDescription className="text-gray-600">
            Exclusive access for hiring managers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!sent ? (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.name@company.com"
                  required
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Only authorized company domains can access this portfolio
                </p>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Sending..." : "Send Magic Link"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Check Your Email!</h3>
                <p className="text-green-700 text-sm mt-2">
                  We've sent a secure login link to <strong>{email}</strong>
                </p>
                <p className="text-green-600 text-xs mt-2">
                  Click the link in your email to access the portfolio
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSent(false);
                  setEmail('');
                }}
                className="w-full"
              >
                Try Different Email
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
