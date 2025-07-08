
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Edge function called - processing request...')
    
    const { message, conversationHistory, userEmail, userName } = await req.json()

    console.log('Received request:', { message, userEmail, userName, historyLength: conversationHistory?.length })

    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')
    if (!anthropicApiKey) {
      console.error('ANTHROPIC_API_KEY is not set')
      return new Response(
        JSON.stringify({ 
          error: 'ANTHROPIC_API_KEY is not configured',
          success: false 
        }),
        { 
          status: 500,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json' 
          } 
        }
      )
    }

    // Build conversation context - start directly with user message to avoid system message issues
    const messages = []

    // Add conversation history
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach((msg: any) => {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({
            role: msg.role,
            content: msg.content
          })
        }
      })
    }

    // Add current message with enhanced context
    const enhancedPrompt = `You are Sam Bryant, an Enterprise Account Executive speaking directly to a potential employer or hiring manager. Answer this question as Sam would, using "I" and drawing from your specific experience and achievements:

YOUR BACKGROUND:
- Currently at Tyk Technologies (2025-Present): Enterprise Account Executive (EMEA) working with prospects above 10,000 users
- Previously at VMware by Broadcom (2023-2025): Closed $21M, achieved 394% of quota
- VMware Global Accounts (2021-2023): Worked with FedEx, Mastercard, Santander, Ford
- SoftwareONE (2014-2021): Built £2M GP portfolio from scratch, top 5 globally in services growth

KEY ACHIEVEMENTS:
- Winner VMware Account Executive of the Quarter (Q2 2022)
- Selected for High Achievers Programme with additional RSU allocation
- Successfully created opportunities in Vinci Holdings, Barclays, Centrica, BNP Paribas, Sanlam, GSK
- Closed two £240k deals in Barclays, submitted £4M ARR proposal (biggest bid Tyk has ever made)
- Built book of business from £0 to £2M gross profit per year at SoftwareONE

EXPERTISE: Enterprise SaaS sales (7-8 figures), C-level engagement, AI tools advocate, business case & ROI selling, translating technical concepts to business value

PERSONALITY: Entrepreneurial mindset, thrive in high-stakes environments, former academy footballer, goal to leave every team/customer/process better than I found it

Question: ${message}

Respond as Sam Bryant would, authentically and professionally, using specific examples from your experience when relevant.`

    messages.push({
      role: "user",
      content: enhancedPrompt
    })

    console.log('Calling Anthropic API with', messages.length, 'messages')

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1500,
        messages: messages
      })
    })

    console.log('Anthropic API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Anthropic API error:', errorText)
      return new Response(
        JSON.stringify({ 
          error: `Anthropic API error: ${response.status} - ${errorText}`,
          success: false 
        }),
        { 
          status: 500,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json' 
          } 
        }
      )
    }

    const data = await response.json()
    console.log('Anthropic API success - response received')

    const assistantMessage = data.content?.[0]?.text

    if (!assistantMessage) {
      console.error('No message content in response:', data)
      return new Response(
        JSON.stringify({ 
          error: 'No response content from AI',
          success: false 
        }),
        { 
          status: 500,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json' 
          } 
        }
      )
    }

    console.log('Returning successful response')
    return new Response(
      JSON.stringify({ 
        message: assistantMessage,
        success: true 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in chat-with-sam function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Unknown error occurred',
        success: false 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
