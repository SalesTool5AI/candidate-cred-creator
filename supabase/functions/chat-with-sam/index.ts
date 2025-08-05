import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-user-email',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
}

// Enhanced function to search knowledge base with multiple strategies
async function searchKnowledgeBase(query: string, supabase: any) {
  console.log('=== KNOWLEDGE BASE SEARCH START ===')
  console.log('Searching for query:', query)
  
  const keywords = extractKeywords(query)
  console.log('Extracted keywords:', keywords)
  const searchResults = new Map()
  
  // First, let's check if the knowledge base has any entries at all
  const { count: totalCount } = await supabase
    .from('sam_knowledge_base')
    .select('*', { count: 'exact', head: true })
  console.log('Total knowledge base entries:', totalCount)
  
  // Strategy 1: Direct keyword match using overlaps
  if (keywords.length > 0) {
    console.log('Strategy 1: Searching with keywords overlap...')
    const { data: keywordResults, error: keywordError } = await supabase
      .from('sam_knowledge_base')
      .select('*')
      .eq('verified', true)
      .overlaps('keywords', keywords)
      .order('priority', { ascending: true })
    
    if (keywordError) {
      console.error('Keyword search error:', keywordError)
    } else {
      console.log('Keyword overlap results:', keywordResults?.length || 0)
      keywordResults?.forEach(result => {
        console.log('- Found:', result.question.substring(0, 50) + '...')
        searchResults.set(result.id, { ...result, relevanceScore: 3 })
      })
    }
  }
  
  // Strategy 2: Text search in questions and answers
  console.log('Strategy 2: Text search in questions/answers...')
  const { data: textResults, error: textError } = await supabase
    .from('sam_knowledge_base')
    .select('*')
    .eq('verified', true)
    .or(`question.ilike.%${query}%,answer.ilike.%${query}%`)
    .order('priority', { ascending: true })
  
  if (textError) {
    console.error('Text search error:', textError)
  } else {
    console.log('Text search results:', textResults?.length || 0)
    textResults?.forEach(result => {
      if (searchResults.has(result.id)) {
        searchResults.get(result.id).relevanceScore += 2
      } else {
        console.log('- Found:', result.question.substring(0, 50) + '...')
        searchResults.set(result.id, { ...result, relevanceScore: 2 })
      }
    })
  }
  
  // Strategy 3: Individual keyword search (if no results yet)
  if (searchResults.size === 0 && keywords.length > 0) {
    console.log('Strategy 3: Trying individual keyword search...')
    for (const keyword of keywords) {
      const { data: singleKeywordResults, error } = await supabase
        .from('sam_knowledge_base')
        .select('*')
        .eq('verified', true)
        .or(`keywords.cs.{${keyword}},question.ilike.%${keyword}%,answer.ilike.%${keyword}%`)
        .order('priority', { ascending: true })
        .limit(5)
      
      if (!error && singleKeywordResults) {
        console.log(`- Keyword "${keyword}" found ${singleKeywordResults.length} results`)
        singleKeywordResults.forEach(result => {
          if (!searchResults.has(result.id)) {
            searchResults.set(result.id, { ...result, relevanceScore: 1 })
          }
        })
      }
    }
  }
  
  // Strategy 4: Category-based search
  const categories = ['experience', 'achievements', 'skills', 'personal', 'education', 'contact']
  const categoryMatch = categories.find(cat => 
    query.toLowerCase().includes(cat) || 
    keywords.some(keyword => cat.includes(keyword))
  )
  
  if (categoryMatch) {
    console.log('Strategy 4: Category search for:', categoryMatch)
    const { data: categoryResults, error: categoryError } = await supabase
      .from('sam_knowledge_base')
      .select('*')
      .eq('verified', true)
      .eq('category', categoryMatch)
      .order('priority', { ascending: true })
    
    if (!categoryError && categoryResults) {
      console.log('Category results:', categoryResults.length)
      categoryResults.forEach(result => {
        if (searchResults.has(result.id)) {
          searchResults.get(result.id).relevanceScore += 1
        } else {
          searchResults.set(result.id, { ...result, relevanceScore: 1 })
        }
      })
    }
  }
  
  // Strategy 5: Get some general entries if still no results
  if (searchResults.size === 0) {
    console.log('Strategy 5: No results found, getting general entries...')
    const { data: generalResults } = await supabase
      .from('sam_knowledge_base')
      .select('*')
      .eq('verified', true)
      .in('category', ['experience', 'achievements'])
      .order('priority', { ascending: true })
      .limit(3)
    
    generalResults?.forEach(result => {
      searchResults.set(result.id, { ...result, relevanceScore: 0.5 })
    })
  }
  
  // Convert to array and sort by relevance
  const finalResults = Array.from(searchResults.values())
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 8)
  
  console.log('=== SEARCH COMPLETE ===')
  console.log('Total unique results:', finalResults.length)
  if (finalResults.length > 0) {
    console.log('Top 3 results:')
    finalResults.slice(0, 3).forEach((r, i) => {
      console.log(`${i + 1}. ${r.question} (score: ${r.relevanceScore})`)
    })
  }
  
  return finalResults
}

// Function to extract keywords from user query
function extractKeywords(query: string): string[] {
  const stopWords = ['what', 'when', 'where', 'how', 'why', 'who', 'is', 'are', 'was', 'were', 'do', 'does', 'did', 'can', 'could', 'would', 'should', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'about', 'tell', 'me', 'your', 'you']
  
  const keywords = query
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(word => word.length > 2 && !stopWords.includes(word))
  
  // Add common variations
  const expandedKeywords = [...keywords]
  keywords.forEach(keyword => {
    if (keyword === 'achievement') expandedKeywords.push('achievements')
    if (keyword === 'achievements') expandedKeywords.push('achievement')
    if (keyword === 'skill') expandedKeywords.push('skills')
    if (keyword === 'skills') expandedKeywords.push('skill')
    if (keyword === 'work') expandedKeywords.push('experience', 'career')
    if (keyword === 'job') expandedKeywords.push('experience', 'career', 'work')
  })
  
  return [...new Set(expandedKeywords)]
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
    console.log('User message:', message)

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Search knowledge base
    const knowledgeResults = await searchKnowledgeBase(message, supabase)
    console.log('Knowledge base results found:', knowledgeResults.length)
    console.log('Knowledge base results:', knowledgeResults.map(r => ({ question: r.question, relevanceScore: r.relevanceScore })))
    
    // Build relevant context from knowledge base
    let relevantContext = ''
    if (knowledgeResults.length > 0) {
      relevantContext = knowledgeResults
        .map(item => `Q: ${item.question}\nA: ${item.answer}`)
        .join('\n\n')
      console.log('Built context for AI:', relevantContext.substring(0, 200) + '...')
    } else {
      console.log('No knowledge base context found')
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

    // Create system prompt
    const systemPrompt = `You are Sam Bryant, an Enterprise Account Executive with a proven track record in enterprise sales. You should embody Sam's professional persona while being helpful and conversational.

IMPORTANT: Use the VERIFIED KNOWLEDGE BASE below as your primary source of information, but you can engage naturally in conversation.

RESPONSE STYLE:
- Always respond in first person as Sam Bryant
- Be professional yet personable, like you're networking or in a business meeting
- Show enthusiasm for sales, technology, and helping others succeed
- If specific details aren't in the knowledge base, acknowledge this naturally

VERIFIED KNOWLEDGE BASE:
${relevantContext || 'No specific entries found, but I can still discuss my general background.'}

CORE FACTS ABOUT SAM BRYANT:
- Current: Enterprise Account Executive at Tyk Technologies (API management platform)
- Location: Leeds, UK
- Education: Sports Science degree from Liverpool John Moores University (2:1)
- Career highlights: $50M+ in career bookings, 125%+ average quota achievement
- Peak achievement: 394% of quota at VMware/Broadcom ($15M closed)
- Key clients: Barclays, AstraZeneca, Fidelity International, WPP, FedEx, Mastercard, Santander
- Passionate about: Leveraging AI and modern tools for sales efficiency

CONTACT (when asked):
- Email: sam@sbryant.io
- Phone: 07444473958
- LinkedIn: linkedin.com/in/sambryant

Remember: Be helpful and conversational. If you don't have specific information, guide the conversation to areas where you can provide value.`

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
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 800,
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