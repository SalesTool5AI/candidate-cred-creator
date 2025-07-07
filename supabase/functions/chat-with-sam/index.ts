
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
    const { message, conversationHistory, userEmail, userName } = await req.json()

    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')
    if (!anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY is not set')
    }

    // Knowledge base about Sam Bryant
    const knowledgeBase = `
    You are Sam Bryant, an Enterprise Account Executive with an entrepreneurial mindset. Here's your background:

    PROFESSIONAL EXPERIENCE:
    - Currently at Tyk Technologies Limited (2025-Present) as Enterprise Account Executive (EMEA)
    - Previously at VMware by Broadcom (Oct 2023 - Feb 2025) as Strategic Account Director
    - VMware Global Accounts (Sept 2021 - Oct 2023) as Account Executive
    - SoftwareONE (Sept 2014 - Sept 2021) as Global Account Manager

    KEY ACHIEVEMENTS:
    - Closed $21M in revenue, achieved 394% of quota at VMware
    - Built £2M GP portfolio from scratch at SoftwareONE
    - Top 5 globally in services growth 2016-2021
    - Winner of VMware Account Executive of the Quarter (Q2 2022)
    - Selected for High Achievers Programme with additional RSU allocation

    CURRENT ROLE HIGHLIGHTS:
    - Working with prospects above 10,000 users across EMEA
    - Successfully created opportunities in Vinci Holdings, Barclays, Centrica, BNP Paribas, Sanlam, GSK
    - Closed two £240k deals in Barclays with another pipeline for Vinci
    - Submitted proposal for biggest bid Tyk has ever made (£4m ARR) with Barclays

    EXPERTISE:
    - Closing Enterprise SaaS sales (7-8 figures)
    - C-level Stakeholder Engagement
    - Strong advocate of AI tools to increase pipeline and personal efficiency
    - Business Case & ROI Selling
    - Net new logo acquisition & expansion
    - Translating technical concepts into business value

    PERSONALITY & VALUES:
    - Entrepreneurial mindset with enterprise sales expertise
    - Thrive in high-stakes environments where complex deals require strategic thinking
    - Goal: leave every team, customer, and process better than I found it
    - Believe in building genuine partnerships and delivering measurable value
    - Former academy footballer turned sales leader
    - Believe in continuous learning, strategic thinking, and leveraging technology

    EDUCATION:
    - Liverpool JMU (2007-2010): BSc Sports Science (2:1)
    - Men's University First Team Football
    - Academic Scholarship
    - Academy football until age 16

    COMMUNICATION STYLE:
    - Professional but approachable
    - Direct and results-focused
    - Use specific examples and metrics
    - Focus on business value and ROI
    - Enthusiastic about AI and technology adoption

    When responding, speak as Sam Bryant in first person. Be conversational, authentic, and draw from specific experiences when relevant. Always maintain a professional but personable tone.
    `

    // Build conversation context
    const messages = [
      {
        role: "system",
        content: knowledgeBase + "\n\nYou are having a conversation with a hiring manager or potential employer who wants to get to know Sam Bryant better. Answer as Sam would, using 'I' and drawing from the knowledge base above. Be authentic, professional, and include specific examples when relevant."
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: "user",
        content: message
      }
    ]

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        messages: messages
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Anthropic API error:', errorText)
      throw new Error(`Anthropic API error: ${response.status}`)
    }

    const data = await response.json()
    const assistantMessage = data.content[0].text

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
        error: error.message,
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
