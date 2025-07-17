import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AccessRequestFormProps {
  email: string;
  domain: string;
  onSuccess: () => void;
}

export const AccessRequestForm: React.FC<AccessRequestFormProps> = ({ 
  email, 
  domain, 
  onSuccess 
}) => {
  const [companyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyName.trim()) {
      toast({
        title: "Company name required",
        description: "Please enter your company name.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-access-request-notification', {
        body: {
          email,
          domain,
          company_name: companyName,
          request_message: message
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Request submitted!",
        description: "Your access request has been sent. You'll receive a confirmation email shortly.",
      });

      onSuccess();
    } catch (error: any) {
      console.error('Error submitting access request:', error);
      toast({
        title: "Submission failed",
        description: error.message || "Failed to submit access request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Request Access</CardTitle>
        <CardDescription>
          Your domain isn't currently authorized. Please provide your details to request access.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-200">Email</label>
            <Input
              type="email"
              value={email}
              disabled
              className="bg-gray-800 text-gray-300"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-200">Company Name *</label>
            <Input
              type="text"
              placeholder="Your company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="bg-gray-800 border-gray-600 focus:border-cyan-500"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-200">Message (Optional)</label>
            <Textarea
              placeholder="Tell me about your interest in my portfolio..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="bg-gray-800 border-gray-600 focus:border-cyan-500"
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Request
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};