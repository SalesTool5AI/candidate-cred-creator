import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-user-email',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
}

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Enhanced function to search knowledge base with multiple strategies
async function searchKnowledgeBase(query: string) {
  console.log('Searching knowledge base for:', query)
  
  const keywords = extractKeywords(query)
  const searchResults = new Map()
  
  // Strategy 1: Direct keyword match in keywords array
  if (keywords.length > 0) {
    const { data: keywordResults } = await supabase
      .from('sam_knowledge_base')
      .select('*')
      .eq('verified', true)
      .overlaps('keywords', keywords)
      .order('priority', { ascending: true })
    
    keywordResults?.forEach(result => {
      searchResults.set(result.id, { ...result, relevanceScore: 3 })
    })
  }
  
  // Strategy 2: Text search in questions and answers
  const { data: textResults } = await supabase
    .from('sam_knowledge_base')
    .select('*')
    .eq('verified', true)
    .or(`question.ilike.%${query}%,answer.ilike.%${query}%`)
    .order('priority', { ascending: true })
  
  textResults?.forEach(result => {
    if (searchResults.has(result.id)) {
      searchResults.get(result.id).relevanceScore += 2
    } else {
      searchResults.set(result.id, { ...result, relevanceScore: 2 })
    }
  })
  
  // Strategy 3: Category-based search for broader context
  const categories = ['experience', 'achievements', 'skills', 'personal']
  const categoryMatch = categories.find(cat => 
    query.toLowerCase().includes(cat) || 
    keywords.some(keyword => cat.includes(keyword))
  )
  
  if (categoryMatch) {
    const { data: categoryResults } = await supabase
      .from('sam_knowledge_base')
      .select('*')
      .eq('verified', true)
      .eq('category', categoryMatch)
      .order('priority', { ascending: true })
    
    categoryResults?.forEach(result => {
      if (searchResults.has(result.id)) {
        searchResults.get(result.id).relevanceScore += 1
      } else {
        searchResults.set(result.id, { ...result, relevanceScore: 1 })
      }
    })
  }
  
  // Convert to array and sort by relevance score
  const finalResults = Array.from(searchResults.values())
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 8) // Limit to most relevant results
  
  console.log('Found', finalResults.length, 'knowledge base entries with relevance scoring')
  return finalResults
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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    })
  }

  // Add test endpoint for debugging
  if (req.url.endsWith('/test')) {
    return new Response(
      JSON.stringify({ 
        status: 'ok',
        timestamp: new Date().toISOString(),
        env: {
          hasAnthropicKey: !!Deno.env.get('ANTHROPIC_API_KEY'),
          hasSupabaseUrl: !!Deno.env.get('SUPABASE_URL'),
          hasSupabaseKey: !!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }

  try {
    console.log('=== Edge function called - processing request ===')
    
    // Check environment variables first
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables')
      return new Response(
        JSON.stringify({ 
          error: 'Missing Supabase configuration. Please check environment variables.',
          success: false,
          details: {
            hasSupabaseUrl: !!supabaseUrl,
            hasSupabaseKey: !!supabaseServiceKey
          }
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    if (!anthropicApiKey) {
      console.error('ANTHROPIC_API_KEY is not set')
      return new Response(
        JSON.stringify({ 
          error: 'ANTHROPIC_API_KEY is not configured. Please add it to your Supabase Edge Function secrets.',
          success: false 
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse request body with error handling
    let requestData
    try {
      requestData = await req.json()
      console.log('Request data parsed successfully')
    } catch (e) {
      console.error('Failed to parse request body:', e)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request body - must be valid JSON',
          success: false 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    const { message, conversationHistory, userEmail, userName } = requestData
    console.log('Received:', { message: message?.substring(0, 50), userEmail, userName })

    // Test database connection
    try {
      const { data: testData, error: testError } = await supabase
        .from('sam_knowledge_base')
        .select('id')
        .limit(1)
      
      if (testError) {
        console.error('Database connection test failed:', testError)
        return new Response(
          JSON.stringify({ 
            error: 'Database error - sam_knowledge_base table not accessible',
            success: false,
            details: testError
          }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
      console.log('Database connection successful')
    } catch (dbError) {
      console.error('Database error:', dbError)
      return new Response(
        JSON.stringify({ 
          error: 'Database connection failed',
          success: false,
          details: String(dbError)
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
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

    // Create comprehensive system prompt for authentic responses
    const systemPrompt = `You are Sam Bryant, Enterprise Account Executive with an entrepreneurial mindset. You are trusted by global brands to navigate complex deals and deliver results. You thrive in high-stakes environments and leverage AI to scale your output.

CORE PERSONALITY & BACKGROUND:
- Enterprise sales leader with 10+ years experience
- Closed $50M+ in career bookings (ARR)
- Track record at Tyk Technologies, VMware/Broadcom, and SoftwareONE
- Built £2M GP portfolio from scratch at SoftwareONE
- Average quota achievement 125%+, peak performance 394%
- Educated at Liverpool JMU (Sports Science, 2:1)
- Based in Leeds, UK
- Strong advocate of AI tools for efficiency

RESPONSE GUIDELINES:
1. ALWAYS respond as Sam Bryant in first person using "I" statements
2. Be authentic, professional, and conversational - like you're speaking to a potential client or colleague
3. Draw from the VERIFIED KNOWLEDGE BASE below when available
4. Include specific examples, numbers, and context when discussing achievements
5. If knowledge base lacks details, ask clarifying questions to provide better responses
6. When unsure, say: "I'd be happy to share more details about that. Could you be more specific about what aspect of [topic] you're interested in?"
7. Maintain consistency with previous conversation context
8. Show enthusiasm for sales, technology, and helping others succeed

VERIFIED KNOWLEDGE BASE:
${relevantContext || 'No specific knowledge base entries found for this query.'}

KEY CAREER HIGHLIGHTS (use when relevant):
- Current: Enterprise Account Executive at Tyk Technologies (EMEA, 10K+ users)
- Recent: Closed two £240k deals at Barclays, submitted £4M ARR proposal
- VMware/Broadcom: Closed $21M, 394% of quota, High Achievers programme
- Top accounts: AstraZeneca, Fidelity International, WPP, FedEx, Mastercard, Santander
- SoftwareONE: Built £2M GP from £0, Top 5 sales worldwide

CONTACT INFORMATION (when asked):
- Email: sam@sbryant.io
- Phone: 07444473958
- LinkedIn: linkedin.com/in/sambryant
- Address: 24 Tesla Lane, Guiseley, Leeds, LS20 9DS

Remember: Be helpful, specific, and authentic. If you need more context to give a great answer, ask for it!`

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
        max_tokens: 1500,
        temperature: 0.2,
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
    console.error('=== Edge function error ===')
    console.error('Error type:', typeof error)
    console.error('Error name:', error?.name)
    console.error('Error message:', error?.message)
    console.error('Error stack:', error?.stack)
    console.error('Full error object:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error?.message || 'Unknown error occurred',
        errorType: error?.name || 'UnknownError',
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