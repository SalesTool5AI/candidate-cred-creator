
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AccessRequestForm } from '@/components/AccessRequestForm';
import { ArrowLeft } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [domain, setDomain] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
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
        .maybeSingle();

      // Note: authorized_emails table doesn't exist, so only check domains
      if (domainError || !allowedDomain) {
        // Domain is not authorized
        setDomain(domain);
        setShowRequestForm(true);
        setLoading(false);
        return;
      }

      // Handle sign up or sign in
      let error;
      
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        error = signUpError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        error = signInError;
      }

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        const companyName = allowedDomain?.company_name || "Sam Bryant";
        if (isSignUp) {
          toast({
            title: "Account Created!",
            description: `Welcome to ${companyName}! You may need to verify your email.`,
          });
        } else {
          toast({
            title: "Login Successful!",
            description: `Welcome back to ${companyName}!`,
          });
        }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Network lines */}
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-cyan-400/30 to-transparent transform rotate-45"></div>
        <div className="absolute top-1/3 right-1/3 w-px h-24 bg-gradient-to-b from-blue-400/20 to-transparent transform -rotate-12"></div>
        <div className="absolute bottom-1/4 left-1/3 w-px h-28 bg-gradient-to-b from-cyan-300/25 to-transparent transform rotate-12"></div>
        
        {/* Floating dots */}
        <div className="absolute top-1/4 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Central lightbulb-inspired design */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
        <div className="relative w-64 h-64">
          {/* Lightbulb outline */}
          <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"></div>
          <div className="absolute top-8 left-8 right-8 bottom-16 border-2 border-cyan-400/20 rounded-t-full"></div>
          
          {/* Network pattern inside */}
          <div className="absolute inset-12">
            <div className="w-full h-full relative">
              <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-cyan-400/20 to-transparent"></div>
              <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-cyan-400/20 to-transparent"></div>
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full"></div>
              <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 flex flex-col items-center">
        {/* Profile Picture */}
        <div className="mb-6 flex justify-center">
          <img 
            src="/lovable-uploads/b76ddfd7-5e01-4edf-b5a4-0d1bae7fb384.png" 
            alt="Sam Bryant" 
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-cyan-400 shadow-2xl object-cover"
          />
        </div>
        
        {showRequestForm ? (
          <div className="w-full">
            <Button
              onClick={() => {
                setShowRequestForm(false);
                setEmail('');
                setDomain('');
              }}
              variant="ghost"
              className="mb-4 text-gray-300 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Button>
            <AccessRequestForm
              email={email}
              domain={domain}
              onSuccess={() => {
                setShowRequestForm(false);
                setSent(true);
              }}
            />
          </div>
        ) : (
          <>
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm shadow-2xl mb-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-light text-white mb-2">
                  Sam Bryant's Portfolio
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Strategic Sales Leadership Portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!sent ? (
                  <form onSubmit={handleAuth} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3">
                        Company Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.name@company.com"
                        required
                        className="w-full bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-3">
                        Password
                      </label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                      />
                    </div>
                    <p className="text-xs text-gray-400">
                      Only authorized company domains can access this portfolio
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
                      </button>
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3 transition-all duration-300 transform hover:scale-105"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>{isSignUp ? "Creating Account..." : "Signing In..."}</span>
                        </div>
                      ) : (
                        isSignUp ? "Create Account" : "Sign In"
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center space-y-6">
                    <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 p-6 rounded-lg border border-green-500/20">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-white mb-2">Request Submitted!</h3>
                      <p className="text-gray-300 text-sm mb-2">
                        Your access request has been sent. You'll receive an email confirmation shortly.
                      </p>
                      <p className="text-cyan-400 font-medium text-sm mb-3">{email}</p>
                      <p className="text-gray-400 text-xs">
                        I'll review your request and get back to you within 24 hours.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSent(false);
                        setEmail('');
                        setShowRequestForm(false);
                      }}
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* New tagline */}
            <div className="text-center">
              <p className="text-gray-200 text-lg font-light leading-relaxed max-w-lg">
                Helping Global Enterprises Solve Complex Problems Through Strategic Sales, Empathy & Execution
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
