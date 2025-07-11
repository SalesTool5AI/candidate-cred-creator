import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Function to search knowledge base
async function searchKnowledgeBase(query: string) {
  console.log('Searching knowledge base for:', query)
  
  // Search by keywords and text content
  const { data: results, error } = await supabase
    .from('sam_knowledge_base')
    .select('*')
    .eq('verified', true)
    .or(`question.ilike.%${query}%,answer.ilike.%${query}%,keywords.cs.{${query.toLowerCase()}}`)
    .order('priority', { ascending: true })
    .limit(10)

  if (error) {
    console.error('Knowledge base search error:', error)
    return []
  }

  console.log('Found', results?.length || 0, 'knowledge base entries')
  return results || []
}

// Function to extract keywords from user query
function extractKeywords(query: string): string[] {
  const stopWords = ['what', 'when', 'where', 'how', 'why', 'who', 'is', 'are', 'was', 'were', 'do', 'does', 'did', 'can', 'could', 'would', 'should', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'about', 'tell', 'me']
  
  return query
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(word => word.length > 2 && !stopWords.includes(word))
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

    // Extract keywords and search knowledge base
    const keywords = extractKeywords(message)
    const knowledgeResults = await searchKnowledgeBase(message)
    
    // Build relevant context from knowledge base
    let relevantContext = ''
    if (knowledgeResults.length > 0) {
      relevantContext = knowledgeResults
        .map(item => `${item.question}: ${item.answer}`)
        .join('\n\n')
    }

    // Build conversation context
    const messages = []

    // Add conversation history (limit to last 6 messages to stay within context)
    if (conversationHistory && conversationHistory.length > 0) {
      const recentHistory = conversationHistory.slice(-6)
      recentHistory.forEach((msg: any) => {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({
            role: msg.role,
            content: msg.content
          })
        }
      })
    }

    // Create strict system prompt to prevent hallucination
    const systemPrompt = `You are Sam Bryant, Enterprise Account Executive. You MUST follow these critical rules:

STRICT RESPONSE RULES:
1. ONLY answer using information provided in the VERIFIED KNOWLEDGE BASE below
2. If the question cannot be answered from the knowledge base, you MUST respond: "I don't have verified information about that specific topic. Could you ask me about my professional experience, achievements, or background?"
3. NEVER make up facts, dates, numbers, or details not in the knowledge base
4. Always speak in first person as Sam Bryant using "I" statements
5. Be professional and authentic but stick strictly to verified facts

VERIFIED KNOWLEDGE BASE:
${relevantContext || 'No specific knowledge base entries found for this query.'}

CONTACT INFORMATION (if asked):
- Email: sam@sbryant.io
- Phone: 07444473958
- LinkedIn: linkedin.com/in/sambryant
- Address: 24 Tesla Lane, Guiseley, Leeds, LS20 9DS

Remember: If you cannot answer from the verified knowledge base above, say so directly. Do not improvise or add unverified details.`

    // Add the system prompt and user message
    messages.push({
      role: "user",
      content: `${systemPrompt}\n\nUser Question: ${message}\n\nPlease respond as Sam Bryant using only the verified information provided above.`
    })

    console.log('Calling Anthropic API with', messages.length, 'messages')
    console.log('Knowledge base entries found:', knowledgeResults.length)

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
        temperature: 0.1, // Lower temperature for more factual responses
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
        knowledgeEntriesUsed: knowledgeResults.length,
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