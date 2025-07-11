import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function TestKnowledgeBase() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const testSearch = async () => {
    setLoading(true);
    try {
      // Test direct database query
      const { data, error } = await supabase
        .from('sam_knowledge_base')
        .select('*')
        .or(`question.ilike.%${query}%,answer.ilike.%${query}%`)
        .limit(5);

      if (error) {
        console.error('Search error:', error);
      } else {
        setResults(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const testEdgeFunction = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('chat-with-sam', {
        body: {
          message: query,
          conversationHistory: [],
          userEmail: 'test@test.com',
          userName: 'Test'
        }
      });

      console.log('Edge function response:', data);
      if (error) console.error('Edge function error:', error);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Knowledge Base Test</h1>
      
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query..."
          className="flex-1"
        />
        <Button onClick={testSearch} disabled={loading}>
          Test DB Search
        </Button>
        <Button onClick={testEdgeFunction} disabled={loading}>
          Test Edge Function
        </Button>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Results: {results.length}</h2>
        {results.map((result, index) => (
          <Card key={index} className="p-4">
            <h3 className="font-semibold">{result.question}</h3>
            <p className="text-sm text-gray-600 mt-1">{result.answer.substring(0, 100)}...</p>
            <p className="text-xs text-gray-500 mt-2">
              Keywords: {result.keywords?.join(', ')}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}