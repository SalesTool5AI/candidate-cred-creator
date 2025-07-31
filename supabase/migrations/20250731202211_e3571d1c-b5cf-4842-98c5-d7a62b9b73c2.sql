-- Update knowledge base entries to remove BNP Paribas and change $21M to $15M

-- Update VMware results entry
UPDATE sam_knowledge_base 
SET answer = 'During my time as Strategic Account Director at VMware by Broadcom (Oct 2023 - Feb 2025), I closed $15M and achieved 394% of quota. I was selected for the High Achievers programme and managed strategic accounts including AstraZeneca, Fidelity International, and WPP.'
WHERE id = 'd2637c31-19df-4fb0-8810-94f12ddba3eb';

-- Update Tyk opportunities entry (remove BNP Paribas)
UPDATE sam_knowledge_base 
SET answer = 'I have successfully created opportunities with major enterprises including Vinci Holdings, Barclays, Centrica Energy, Sanlam, GSK, Informa PLC, Travis Perkins, Natwest.'
WHERE id = 'c6073ead-261a-4e5d-bf6b-97166d07c74e';

-- Update biggest achievements entry
UPDATE sam_knowledge_base 
SET answer = 'I have closed over $50M in career bookings with an average quota achievement of 125%+. My peak performance was 394% of quota at VMware/Broadcom where I closed $15M. I also built a £2M GP portfolio from scratch at SoftwareONE, consistently ranking in the top 5 sellers globally.'
WHERE id = '088a5313-f42d-432d-b0b8-62f6a5876fc1';

-- Update current role entry (remove BNP Paribas)
UPDATE sam_knowledge_base 
SET answer = 'I am currently an Enterprise Account Executive at Tyk Technologies covering EMEA, working with prospects above 10,000 users. I handle the entire sales cycle from prospecting to close, then hand accounts to Account Managers. I have already created opportunities with major clients like Vinci Holdings, Barclays, Centrica, Sanlam, and GSK.'
WHERE id = 'cf1681ca-e0a9-4b35-b6fe-a560ad89c59b';

-- Update sales track record entry
UPDATE sam_knowledge_base 
SET answer = 'My career highlights include: closing $15M at 394% of quota at VMware/Broadcom, building a £2M GP portfolio from scratch at SoftwareONE, and being one of only 4 salespeople in the UK to surpass £2M gross profit in one year. I have consistently achieved 118% to 394% of quota throughout my career.'
WHERE id = '7ed256a0-30cb-49d0-b534-4094d30529d0';

-- Update VMware experience entry
UPDATE sam_knowledge_base 
SET answer = 'At VMware by Broadcom, I worked as Strategic Account Director for UK & Ireland, managing strategic accounts like AstraZeneca, Fidelity International, and WPP. I closed $15M at 394% of quota and was selected for the High Achievers Programme. Previously as Account Executive, I managed global accounts including FedEx, Mastercard, Santander, and Ford with typical deal sizes of $1.5M-$3M.'
WHERE id = 'f4c7a4b1-00db-4715-b119-520ae53cd18f';

-- Add comprehensive sales playbook entry
INSERT INTO sam_knowledge_base (
  question,
  answer,
  category,
  subcategory,
  keywords,
  priority,
  verified
) VALUES (
  'What is your sales philosophy and methodology?',
  'My philosophy in sales is simple: understand deeply, solve meaningfully, and execute consistently. I use the SCALE Framework: Strategic Targeting (using LinkedIn Sales Navigator, Sumble, AI tools to find high-fit accounts under pressure), Curiosity-Led Discovery (leading with curiosity, using Jamie.AI for notes, understanding root problems), Aligned Co-Creation (using unbranded docs, developing business cases with customer language, creating forwardable assets), Leverage AI for Relevance & Depth (using AI for executive priorities and market context), and Executive Alignment & Close (presenting clean summaries, addressing failure scenarios, aligning to procurement cycles). I focus on helping champions succeed internally and treat my role as the CEO of the account.',
  'philosophy',
  'methodology',
  ARRAY['scale', 'framework', 'discovery', 'philosophy', 'methodology', 'process', 'approach'],
  1,
  true
);

-- Add key deal examples
INSERT INTO sam_knowledge_base (
  question,
  answer,
  category,
  subcategory,
  keywords,
  priority,
  verified
) VALUES (
  'Can you share examples of major deals you have closed?',
  'I have several key deal successes: Enabled internal champions at a Mastercard subsidiary to navigate a security crisis, displacing the incumbent and signing a $1.8M ARR deal in just 4 months—one-third of the typical sales cycle. Turned a cost-cutting mandate at FedEx into a £1.6M ARR win by building a business case that identified over £4M in potential savings, making the finance team our biggest advocate. Transformed an at-risk, churning account at Fidelity International into a $15M partnership by investing $500K in dedicated resources to fix their problems before asking for the renewal, successfully navigating a 150%+ price increase.',
  'achievements',
  'deals',
  ARRAY['mastercard', 'fedex', 'fidelity', 'deals', 'examples', 'wins', 'case studies'],
  1,
  true
);

-- Add core values entry
INSERT INTO sam_knowledge_base (
  question,
  answer,
  category,
  subcategory,
  keywords,
  priority,
  verified
) VALUES (
  'What are your core values and beliefs?',
  'My core values include: Integrity First - I believe in doing the right thing always, with honesty, empathy, and trust as non-negotiables. Strive for Excellence - I hold myself to high standards and constantly learn and refine, rooted in my background as a professional footballer. Freedom Through Impact - success means creating financial and time freedom, being intentional with time and energy. Growth-Minded - naturally curious about people, business, psychology, and performance. Create Real Value - whether mentoring others or solving customer problems, I aim to leave things better than I found them. Relationships Over Transactions - long-term partnerships matter more than short-term wins.',
  'personal',
  'values',
  ARRAY['values', 'beliefs', 'integrity', 'excellence', 'growth', 'relationships', 'impact'],
  1,
  true
);

-- Add tools and technology entry
INSERT INTO sam_knowledge_base (
  question,
  answer,
  category,
  subcategory,
  keywords,
  priority,
  verified
) VALUES (
  'What tools and technology do you use in sales?',
  'I use a comprehensive tech stack: Intelligence & Research (ChatGPT, Claude, LinkedIn Sales Navigator, Sumble for tech stack analysis, Perplexity for financials), Deal Collaboration (Docs, Teams, Slack, WhatsApp as external channels to get closer to customers), Discovery & Notes (Jamie.AI for AI note-taking, executive and business case templates), Outreach & Pipeline (Apollo.io, HubSpot, LinkedIn Sales Navigator). These tools allow me to operate with precision and stay proactive, but I use AI to help with critical thinking rather than automation. Tools only support what matters most: building trust and delivering value.',
  'skills',
  'tools',
  ARRAY['tools', 'technology', 'ai', 'hubspot', 'linkedin', 'apollo', 'jamie', 'sumble'],
  1,
  true
);