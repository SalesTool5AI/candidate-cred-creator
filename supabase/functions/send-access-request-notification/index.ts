import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AccessRequestData {
  email: string;
  domain: string;
  company_name: string;
  request_message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, domain, company_name, request_message }: AccessRequestData = await req.json();

    console.log(`Processing access request for: ${email} from ${company_name}`);

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Insert the pending request into the database
    const { data: requestData, error: dbError } = await supabase
      .from('pending_access_requests')
      .insert({
        email,
        domain,
        company_name,
        request_message,
        status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log('Request saved to database:', requestData.id);

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Access Requests <sam@sbryant.io>",
      to: ["sam@sbryant.io"],
      subject: `New Access Request from ${company_name}`,
      html: `
        <h2>New Access Request</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company_name}</p>
        <p><strong>Domain:</strong> ${domain}</p>
        <p><strong>Message:</strong></p>
        <p>${request_message}</p>
        <hr>
        <p>Please review this request in your admin panel.</p>
      `,
    });

    console.log("Admin notification sent:", adminEmailResponse);

    // Send confirmation email to the requester
    const userEmailResponse = await resend.emails.send({
      from: "Sam Bryant <sam@sbryant.io>",
      to: [email],
      subject: "Access Request Received",
      html: `
        <h2>Thank you for your interest!</h2>
        <p>Dear ${email},</p>
        <p>I've received your request for access to my professional portfolio from ${company_name}.</p>
        <p>Your request is currently under review. I'll get back to you within 24 hours.</p>
        <p>Best regards,<br>Sam Bryant</p>
      `,
    });

    console.log("User confirmation sent:", userEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Access request submitted successfully",
        request_id: requestData.id 
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
    console.error("Error in send-access-request-notification function:", error);
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