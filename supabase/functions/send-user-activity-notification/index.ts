import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ActivityNotificationData {
  type: 'login' | 'site_view';
  email?: string;
  company_name?: string;
  domain?: string;
  user_agent?: string;
  ip_address?: string;
  timestamp?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, email, company_name, domain, user_agent, ip_address, timestamp }: ActivityNotificationData = await req.json();

    console.log(`Processing ${type} notification for: ${email || 'anonymous user'}`);

    let subject = '';
    let htmlContent = '';

    if (type === 'login') {
      subject = `New User Login - ${email}`;
      htmlContent = `
        <h2>New User Login Alert</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company_name || 'Unknown'}</p>
        <p><strong>Domain:</strong> ${domain || 'Unknown'}</p>
        <p><strong>Login Time:</strong> ${timestamp || new Date().toISOString()}</p>
        <p><strong>User Agent:</strong> ${user_agent || 'Unknown'}</p>
        <p><strong>IP Address:</strong> ${ip_address || 'Unknown'}</p>
        <hr>
        <p>A user has successfully logged into your portfolio.</p>
      `;
    } else if (type === 'site_view') {
      subject = `New Site Visitor`;
      htmlContent = `
        <h2>New Site Visit Alert</h2>
        <p><strong>Visit Time:</strong> ${timestamp || new Date().toISOString()}</p>
        <p><strong>User Agent:</strong> ${user_agent || 'Unknown'}</p>
        <p><strong>IP Address:</strong> ${ip_address || 'Unknown'}</p>
        <hr>
        <p>Someone has visited your portfolio site.</p>
      `;
    }

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Portfolio Activity <noreply@sbryant.io>",
      to: ["sam@sbryant.io"],
      subject: subject,
      html: htmlContent,
    });

    console.log("Activity notification sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Activity notification sent successfully",
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in send-user-activity-notification function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);