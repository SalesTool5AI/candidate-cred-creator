-- Create knowledge base table for Sam's information
CREATE TABLE public.sam_knowledge_base (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL, -- e.g., 'experience', 'achievements', 'skills', 'personal'
  subcategory TEXT, -- e.g., 'tyk', 'vmware', 'certifications'
  question TEXT NOT NULL, -- Common questions this answers
  answer TEXT NOT NULL, -- Verified factual answer
  keywords TEXT[], -- Keywords for semantic search
  priority INTEGER DEFAULT 1, -- 1=high, 2=medium, 3=low priority
  verified BOOLEAN DEFAULT true, -- Only verified facts
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sam_knowledge_base ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is public CV info)
CREATE POLICY "Knowledge base is publicly readable" 
ON public.sam_knowledge_base 
FOR SELECT 
USING (verified = true);

-- Create index for fast search
CREATE INDEX idx_sam_knowledge_keywords ON public.sam_knowledge_base USING GIN(keywords);
CREATE INDEX idx_sam_knowledge_category ON public.sam_knowledge_base(category, subcategory);

-- Insert structured knowledge base data
INSERT INTO public.sam_knowledge_base (category, subcategory, question, answer, keywords, priority) VALUES
('experience', 'tyk', 'What is Sam''s current role?', 'I am currently an Enterprise Account Executive (EMEA) at Tyk Technologies Limited, covering new business and expansion across EMEA for prospects above 10,000 users.', '{"current role", "tyk", "enterprise account executive", "emea"}', 1),

('experience', 'tyk', 'What deals has Sam closed at Tyk?', 'I have successfully closed two £240k deals at Barclays and have another deal in progress for Vinci. I also submitted a proposal for the biggest bid Tyk has ever made - a £4M ARR deal with Barclays.', '{"tyk deals", "barclays", "vinci", "240k", "4m arr"}', 1),

('experience', 'tyk', 'What opportunities has Sam created at Tyk?', 'I have successfully created opportunities with major enterprises including Vinci Holdings, Barclays, Centrica, BNP Paribas, Sanlam, and GSK.', '{"tyk opportunities", "vinci", "barclays", "centrica", "bnp paribas", "sanlam", "gsk"}', 1),

('experience', 'vmware_broadcom', 'What were Sam''s results at VMware by Broadcom?', 'During my time as Strategic Account Director at VMware by Broadcom (Oct 2023 - Feb 2025), I closed $21M and achieved 394% of quota. I was selected for the High Achievers programme and managed strategic accounts including AstraZeneca, Fidelity International, and WPP.', '{"vmware broadcom", "21m", "394%", "high achievers", "astrazeneca", "fidelity", "wpp"}', 1),

('experience', 'vmware', 'What was Sam''s role at VMware Global Accounts?', 'I worked as Account Executive for Global Accounts at VMware (Sept 2021 - October 2023), managing some of VMware''s biggest customers including FedEx, Mastercard, Santander, and Ford. I achieved quota performance between 89-394% with bookings over $14M.', '{"vmware global accounts", "fedex", "mastercard", "santander", "ford", "14m bookings"}', 1),

('achievements', 'awards', 'What awards has Sam won?', 'I was winner of VMware Account Executive of the Quarter in Q2 2022 and was selected for the High Achievers Programme, which included additional RSU allocation.', '{"awards", "account executive quarter", "high achievers programme", "rsu"}', 1),

('experience', 'softwareone', 'What did Sam achieve at SoftwareONE?', 'At SoftwareONE (Sept 2014 - September 2021), I built a £2M GP portfolio from scratch and was consistently in the top 5 globally for services growth. I was one of only 4 salespeople to surpass £2m gross profit in one year in the UK and was chosen by the Global CEO for a leadership programme in Amsterdam.', '{"softwareone", "2m portfolio", "top 5 globally", "ceo leadership programme", "amsterdam"}', 1),

('skills', 'expertise', 'What are Sam''s key skills?', 'My expertise includes closing enterprise SaaS sales (7-8 figures), C-level stakeholder engagement, strong advocacy of AI tools to increase pipeline and personal efficiency, business case & ROI selling, net new logo acquisition & expansion, and translating technical concepts into business value.', '{"enterprise sales", "c-level", "ai tools", "roi selling", "technical concepts"}', 1),

('personal', 'background', 'What is Sam''s educational background?', 'I have a BSc in Sports Science (2:1) from Liverpool John Moores University (2007-2010). I played Men''s University First Team Football on an Academic Scholarship and was in academy football until age 16.', '{"education", "sports science", "liverpool jmu", "football", "academy"}', 2),

('personal', 'approach', 'What is Sam''s professional approach?', 'I have an entrepreneurial mindset and am trusted by global brands to navigate complex deals and deliver results. I thrive in high-stakes environments, leverage AI to scale my output, and aim to leave every team, customer, and process better than I found it.', '{"entrepreneurial", "high-stakes", "ai leverage", "improvement mindset"}', 1),

('achievements', 'perplexity', 'What is Sam''s involvement with Perplexity AI?', 'I was selected for the AI Business Fellowship at Perplexity (Feb 2025 - Present) as part of the 2025 cohort of those innovating and using AI in their role. This includes networking with founders and creators, key notes from CEOs such as Jensen Huang, Ali Ghodsi, Aaron Levie, and Amjad Masad, plus AI workshops on marketing, GTM, productivity and coding.', '{"perplexity", "ai fellowship", "jensen huang", "ali ghodsi", "aaron levie", "amjad masad", "ai workshops"}', 1);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_sam_knowledge_updated_at
    BEFORE UPDATE ON public.sam_knowledge_base
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();