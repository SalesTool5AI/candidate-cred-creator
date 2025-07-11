import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Trash2, Edit, Plus, Search, Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KnowledgeEntry {
  id: string;
  category: string;
  subcategory: string | null;
  question: string;
  answer: string;
  keywords: string[];
  priority: number;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export default function Admin() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<KnowledgeEntry | null>(null);
  const [bulkText, setBulkText] = useState("");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    question: "",
    answer: "",
    keywords: "",
    priority: 1,
    verified: true
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('sam_knowledge_base')
        .select('*')
        .order('priority', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch knowledge entries: " + error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const keywordArray = formData.keywords
        .split(',')
        .map(k => k.trim().toLowerCase())
        .filter(k => k.length > 0);

      const entryData = {
        category: formData.category,
        subcategory: formData.subcategory || null,
        question: formData.question,
        answer: formData.answer,
        keywords: keywordArray,
        priority: formData.priority,
        verified: formData.verified
      };

      if (editingEntry) {
        const { error } = await supabase
          .from('sam_knowledge_base')
          .update(entryData)
          .eq('id', editingEntry.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Entry updated successfully!" });
      } else {
        const { error } = await supabase
          .from('sam_knowledge_base')
          .insert([entryData]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Entry added successfully!" });
      }

      resetForm();
      setIsDialogOpen(false);
      fetchEntries();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to save entry: " + error.message,
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    
    try {
      const { error } = await supabase
        .from('sam_knowledge_base')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Success", description: "Entry deleted successfully!" });
      fetchEntries();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete entry: " + error.message,
        variant: "destructive"
      });
    }
  };

  const handleEdit = (entry: KnowledgeEntry) => {
    setEditingEntry(entry);
    setFormData({
      category: entry.category,
      subcategory: entry.subcategory || "",
      question: entry.question,
      answer: entry.answer,
      keywords: entry.keywords.join(', '),
      priority: entry.priority,
      verified: entry.verified
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      category: "",
      subcategory: "",
      question: "",
      answer: "",
      keywords: "",
      priority: 1,
      verified: true
    });
    setEditingEntry(null);
  };

  const handleBulkImport = async () => {
    if (!bulkText.trim()) return;

    try {
      const lines = bulkText.split('\n').filter(line => line.trim());
      const entries = [];

      for (const line of lines) {
        const parts = line.split('|').map(p => p.trim());
        if (parts.length >= 4) {
          entries.push({
            category: parts[0],
            subcategory: parts[1] || null,
            question: parts[2],
            answer: parts[3],
            keywords: parts[4] ? parts[4].split(',').map(k => k.trim().toLowerCase()) : [],
            priority: parseInt(parts[5]) || 1,
            verified: true
          });
        }
      }

      if (entries.length > 0) {
        const { error } = await supabase
          .from('sam_knowledge_base')
          .insert(entries);
        
        if (error) throw error;
        toast({ 
          title: "Success", 
          description: `Successfully imported ${entries.length} entries!` 
        });
        setBulkText("");
        fetchEntries();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to import entries: " + error.message,
        variant: "destructive"
      });
    }
  };

  const exportToCSV = () => {
    const csv = entries.map(entry => 
      `${entry.category}|${entry.subcategory || ''}|${entry.question}|${entry.answer}|${entry.keywords.join(', ')}|${entry.priority}`
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sam-knowledge-base.txt';
    a.click();
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = searchTerm === "" || 
      entry.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || entry.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(entries.map(e => e.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Knowledge Base Admin</h1>
          <p className="text-gray-300">Manage verified information about Sam Bryant</p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-gray-800 border-gray-600 text-white"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button onClick={exportToCSV} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Import
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-600">
                <DialogHeader>
                  <DialogTitle className="text-white">Bulk Import</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-gray-300">
                    Format: category|subcategory|question|answer|keywords|priority (one per line)
                  </p>
                  <Textarea
                    placeholder="experience|tyk|What is Sam's current role?|I am currently...|current role,tyk|1"
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    className="min-h-32 bg-gray-700 border-gray-600 text-white"
                  />
                  <Button onClick={handleBulkImport} className="w-full">
                    Import Entries
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-600 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingEntry ? "Edit Entry" : "Add New Entry"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category" className="text-white">Category</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="subcategory" className="text-white">Subcategory</Label>
                      <Input
                        id="subcategory"
                        value={formData.subcategory}
                        onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="question" className="text-white">Question</Label>
                    <Input
                      id="question"
                      value={formData.question}
                      onChange={(e) => setFormData({...formData, question: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="answer" className="text-white">Answer</Label>
                    <Textarea
                      id="answer"
                      value={formData.answer}
                      onChange={(e) => setFormData({...formData, answer: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white min-h-24"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="keywords" className="text-white">Keywords (comma separated)</Label>
                    <Input
                      id="keywords"
                      value={formData.keywords}
                      onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="priority" className="text-white">Priority (1=high, 2=medium, 3=low)</Label>
                    <Input
                      id="priority"
                      type="number"
                      min="1"
                      max="3"
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: parseInt(e.target.value)})}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    {editingEntry ? "Update Entry" : "Add Entry"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Entries Grid */}
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : (
          <div className="grid gap-4">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-lg">{entry.question}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                          {entry.category}
                        </Badge>
                        {entry.subcategory && (
                          <Badge variant="outline" className="text-blue-400 border-blue-400">
                            {entry.subcategory}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          Priority {entry.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(entry)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(entry.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-3">{entry.answer}</p>
                  <div className="flex flex-wrap gap-1">
                    {entry.keywords.map((keyword, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredEntries.length === 0 && !loading && (
          <div className="text-center text-gray-400 py-12">
            No entries found. {searchTerm || selectedCategory !== "all" ? "Try adjusting your filters." : "Add your first entry!"}
          </div>
        )}
      </div>
    </div>
  );
}