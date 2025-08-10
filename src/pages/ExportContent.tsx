import React, { useEffect, useMemo } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const useSeo = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const title = "Export Site Content (Markdown) | Sam Bryant";
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    metaDesc.setAttribute('content', 'Single markdown document with all copy from Sam Bryant\'s site for easy rehearsal and sharing.');
    if (!metaDesc.parentNode) document.head.appendChild(metaDesc);

    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', window.location.origin + '/export-content');
    if (!canonical.parentNode) document.head.appendChild(canonical);

    return () => {
      document.title = previousTitle;
    };
  }, []);
};

const ExportContentPage: React.FC = () => {
  useSeo();

  const markdown = useMemo(() => {
    return `# Sam Bryant\n\n` +
`## Homepage\n\n` +
`- Name: Sam Bryant\n` +
`- Headline: Enterprise Sales Executive | $50m+ Career Bookings\n` +
`- Tagline: Helping Enterprise Software Companies Win, Land and Expand Global Accounts\n` +
`- Prompt: Ask my digital twin\n\n` +
`## How I Sell\n\n` +
`My philosophy in sales is simple: **understand deeply, solve meaningfully, and execute consistently**.\n\n` +
`I don't chase transactions, I build trust. That starts with listening. I invest time upfront to understand a prospect's goals, challenges, internal dynamics, and decision-making process. I believe enterprise sales isn't about pitching features, it's about aligning to strategy, removing friction, and helping customers win inside their own organisation.\n\n` +
`I approach each engagement like a partnership. Whether I'm speaking to a CIO, head of platform engineering, or procurement lead, I focus on what matters to them, be it uptime, agility, ROI, or internal political capital. My goal isn't to impress with jargon. It's to land the right message, at the right time, with the right level of business and technical relevance.\n\n` +
`Execution is key. I am always building pipeline, by networking with partners and customers, using LinkedIn and leveraging AI intelligence tools such as Sumble. I stay agile, test sequences, iterate messaging, and track signals. I don't wait for marketing, I create my own demand.\n\n` +
`But beyond numbers, my philosophy is rooted in honesty, empathy, and long-term thinking. I aim to be the person customers want to hear from, not because I'm persistent, but because I'm useful. And I carry that same intent internally, collaborating with product, marketing, and pre-sales to build cohesive, customer-centric plays. I treat my role as the CEO of the account, creating the vision of where to take the account, supporting and building the best team to help us win the customer, and taking responsibility for everyone who interacts with the customer.\n\n` +
`> Sales is about trust, timing, and clarity. I bring all three.\n\n` +
`## Sales as a Craft, Not a Transaction\n\n` +
`Enterprise sales isn't about persuading someone to buy; it's about understanding their goals and helping them move through complexity with confidence. I treat sales as a profession, a craft that blends insight, preparation, and trust-building. I don't just run a sales process; I support a buying process. My goal is to be useful, not just persistent, and to be the kind of person customers want to hear from because I add value, not pressure.\n\n` +
`### My Core Values\n\n` +
`1. Integrity First — I believe in doing the right thing, always. Honesty, empathy, and trust are non-negotiables.\n` +
`2. Strive for Excellence — I hold myself to high standards and take pride in delivering results, constantly learning and refining my approach.\n` +
`3. Freedom Through Impact — I am intentional with my time and energy to create both financial and time freedom, designing a life for my family filled with opportunity and experience.\n` +
`4. Growth-Minded — I am naturally curious about people, business, psychology, and performance, always seeking insights that help me grow.\n` +
`5. Create Real Value — I always aim to leave things better than I found them, whether mentoring others, solving tough customer problems, or building a territory from scratch.\n` +
`6. Relationships Over Transactions — Long-term partnerships matter more than short-term wins. I invest in understanding people and building trust.\n\n` +
`### My Sales Philosophy Tenets\n\n` +
`- Understand deeply, solve meaningfully, and execute consistently\n` +
`- Lead with empathy, listen first, and focus on helping my champions succeed internally\n` +
`- The best sales process mirrors the buying journey, aligning to customer strategy, not just my sales stages\n` +
`- Enterprise sales is about enabling — removing friction, reducing internal risk, and making success with clear outcomes feel achievable for the customer\n\n` +
`## The SCALE Framework — My Five-Stage Sales Process\n\n` +
`1. Strategic Targeting\n` +
`   - Use LinkedIn Sales Navigator, Sumble, and AI tools to find high-fit accounts and ideal prospects.\n` +
`   - Look for companies under pressure or in transition (e.g., leadership changes, compliance risks, digital transformation).\n` +
`   - Build detailed stakeholder maps to understand power, blockers, and influence, recognizing that influence isn't always at the top.\n` +
`   - Map my approach to their internal process, not my CRM stages, to add value at every point.\n\n` +
`2. Curiosity-Led Discovery\n` +
`   - Lead with curiosity, not a checklist, to understand the root problem.\n` +
`   - Use tools like Jamie.AI (an AI Notetaker) to stay fully present and capture every insight.\n` +
`   - Reframe and reflect the problem back in the customer's own words.\n\n` +
`3. Aligned Co-Creation\n` +
`   - Use unbranded Google Docs and Slides to allow for easy copy-pasting and collaboration in the customer's desired format.\n` +
`   - Develop business cases using the customer's language, metrics, and acronyms.\n` +
`   - Include the 3 executive 'Whys': Why do anything? Why us? Why now?\n` +
`   - Create forwardable assets like email drafts, ROI calculators, and one-pagers for my champion's internal use.\n` +
`   - Co-create the executive summary live on calls, often asking, "What would your CFO want to see here?"\n` +
`   - Paint a clear picture of the 'future state' post-deployment with set milestones, ideally scoped with professional services.\n\n` +
`4. Leverage AI for Relevance & Depth\n` +
`   - Use AI to understand executive priorities, external pressures, and market context.\n` +
`   - Draft ROI narratives and implementation plans that reflect real-world concerns.\n` +
`   - Create relevant, personalized content to drive internal discussions.\n` +
`   - Use inversion theory to ensure there are no blind spots in the sales process management.\n\n` +
`5. Executive Alignment & Close\n` +
`   - Present clean, actionable summaries for executives that can be digested in 30 seconds.\n` +
`   - Address "what if this fails?" scenarios early and transparently with change management plans.\n` +
`   - Align close dates to procurement/budget cadence and architectural board meetings.\n` +
`   - Ensure final negotiation is the end of a thoughtful, transparent process, not a pressure point.\n\n` +
`## What I Bring\n\n` +
`I help enterprise software vendors win and grow their most valuable accounts.\n\n` +
`With a track record of selling complex solutions to global giants like Mastercard, FedEx, Ford, and Santander, I bring deep experience in enterprise SaaS, API platforms, developer tools and Hybrid infrastructure. At VMware, SoftwareONE and now Tyk, I've built new business pipelines from scratch, navigated long sales cycles, and consistently closed seven-figure deals with C-level stakeholders.\n\n` +
`My edge? I lead with curiosity, operate with precision, and sell with purpose. I simplify the technical, align to business outcomes, and thrive in deals where multiple stakeholders, competing priorities, and ambiguity are the norm. I'm hands-on with tools like Apollo, HubSpot, and LinkedIn Sales Navigator, and obsessive about relevance, timing, and tailored outreach.\n\n` +
`I'm not just looking to hit quota. I want to be part of a winning team, one that's scaling fast, solving meaningful problems, and backing their people. I'm at my best in companies that constantly strive for higher standards and push all employees out of their comfort zone. Ideally somewhere where there's still room to shape how enterprise sales is done.\n\n` +
`If you're hiring enterprise AEs who can hunt, close, and land strategic accounts while building pipeline and brand in parallel, let's talk.\n\n` +
`### Sales Performance Dashboard (Key Metrics)\n\n` +
`- Total Career Bookings (ARR): $50M+ — Enterprise deals closed\n` +
`- Average Quota Achievement: 125%+ — Consistent over-performance\n` +
`- Peak Performance: 394% — Best quarterly result\n` +
`- Enterprise Experience: 10+ Years — Complex deal expertise\n\n` +
`Key Achievements:\n\n` +
`- Deal Size Range: $1.5M - $5M ARR\n` +
`- Territory Growth: £0 → £2M GP\n` +
`- Top 5 sales at SoftwareONE: Worldwide Recognition\n` +
`- Salesperson of the Quarter: VMware Q2 2022\n\n` +
`### Experience\n\n` +
`- Perplexity — Selected for AI Business Fellowship (Feb 2025 - Present)\n` +
`  - Selected as part of 2025 cohort of those innovating and using AI in their role\n` +
`  - Networking with founders and creators\n` +
`  - Key notes from CEO's such as Jensen Huang, Ali Ghodsi, Aaron Levie, Amjad Masad\n` +
`  - AI workshops, on marketing, GTM, productivity and coding\n\n` +
`- Tyk Technologies Limited — Enterprise Account Executive (EMEA) (2025 - Present)\n` +
`  - Covering new business and expansion for TYK across EMEA working with prospects above 10,000 users\n` +
`  - Successfully created opportunities in Vinci Holdings, Barclays, Centrica, BNP Paribas, Sanlam, GSK\n` +
`  - Closed two £240k deals in Barclays with another on the way for Vinci\n` +
`  - Submitted proposal for the biggest bid Tyk have ever made (£4m ARR) with Barclays\n\n` +
`- VMware by Broadcom — Strategic Account Director (Oct 2023 - Feb 2025)\n` +
`  - Closed $21M, achieved 394% of quota, selected for High Achievers programme\n` +
`  - Managed strategic accounts: AstraZeneca, Fidelity International and WPP\n` +
`  - Bookings over $7m for the year putting me on 108% of Quota\n` +
`  - Part of global acquisition process with strategic focus on UK & Ireland\n\n` +
`- VMware — Account Executive | Global Accounts (Sept 2021 - October 2023)\n` +
`  - VMware Account Executive of the Quarter (Q2 2022)\n` +
`  - Quota achievement 89-394% with bookings over $14m\n` +
`  - Managed VMware's biggest customers: FedEx, Mastercard, Santander, Ford\n` +
`  - Typical deal size $1.5m - $3m with 9-12 month sales cycles\n\n` +
`- SoftwareONE — Global Account Manager | UK&I (Sept 2014 - September 2021)\n` +
`  - Built £2M GP Portfolio from Scratch, Top 5 Globally in services Growth\n` +
`  - 1 of only 4 salespeople to surpass £2m gross profit in 1 year in the UK\n` +
`  - Chosen by Global CEO for leadership programme in Amsterdam\n` +
`  - Key customer wins: Arm, Johnson Matthey, Associated British Foods, NCC Group, Sage, Zellis\n\n` +
`### Achievements\n\n` +
`- 394% Quota Achievement — Peak quota performance at VMware - High Achievers programme\n` +
`- £21m Revenue Closed — Total sales revenue closed in strategic enterprise deals\n` +
`- £2m GP Portfolio Built — Built £2M gross profit portfolio from scratch at SoftwareONE\n` +
`- Top 5 Global Performer — Top 5 globally in services growth 2016-2021\n\n` +
`### Skills & Expertise\n\n` +
`Technical Skills:\n` +
`- Salesforce CRM (95%)\n` +
`- HubSpot (92%)\n` +
`- LinkedIn Sales Navigator (98%)\n` +
`- Apollo.io (90%)\n` +
`- Claude & AI Tools (95%)\n` +
`- VMware Technologies (88%)\n\n` +
`Core Competencies:\n` +
`- C-level Stakeholder Engagement (98%)\n` +
`- Enterprise SaaS Sales (96%)\n` +
`- Business Case & ROI Selling (95%)\n` +
`- Net New Logo Acquisition (93%)\n` +
`- Complex Deal Navigation (94%)\n` +
`- Technical to Business Translation (92%)\n\n` +
`Industry Experience:\n` +
`- API Management & Gateways\n` +
`- Cloud Infrastructure & Virtualization\n` +
`- Software Asset Management\n` +
`- Enterprise Security Solutions\n` +
`- Financial Services Technology\n` +
`- Pharmaceutical & Healthcare Tech\n\n` +
`## Proven Impact with over $50M+ in Career Bookings\n\n` +
`My approach has been put into practice to deliver tangible results with global enterprises. Here are a few examples:\n\n` +
`- Mastercard — Enabled internal champions at a Mastercard subsidiary to navigate a security crisis, displacing the incumbent and signing a $1.8M ARR deal in just 4 months—one-third of the typical sales cycle.\n` +
`  - Deal Value: $1.8M ARR\n` +
`  - Timeline: 4 months\n` +
`  - Key Impact: 66% faster than typical cycle\n\n` +
`- FedEx — Turned a cost-cutting mandate at FedEx into a £1.6M ARR win by building a business case that identified over £4M in potential savings, making the finance team our biggest advocate.\n` +
`  - Deal Value: £1.6M ARR\n` +
`  - Timeline: Business case driven\n` +
`  - Key Impact: £4M+ savings identified\n\n` +
`- Fidelity International — Transformed an at-risk, churning account at Fidelity International into a $15M partnership by investing $500K in dedicated resources to fix their problems before asking for the renewal, successfully navigating a 150%+ price increase.\n` +
`  - Deal Value: $15M partnership\n` +
`  - Timeline: Account recovery\n` +
`  - Key Impact: 150%+ price increase\n\n` +
`## My Values\n\n` +
`1. Integrity First — I believe in doing the right thing, always. Whether I'm working with a customer, teammate, or partner, honesty, empathy, and trust are non-negotiables.\n` +
`2. Strive for Excellence — I hold myself to high standards and take pride in delivering results. I'm constantly learning, refining, and raising the bar, not just to win, but to lead by example. This is deep rooted from my professional sports background.\n` +
`3. Freedom Through Impact — Success for me means building both financial and time freedom. I'm intentional about how I spend my time and energy, designing a life for my family with opportunities and filled with experiences.\n` +
`4. Growth-Minded — I'm curious by nature, about people, business, psychology, and performance. I seek out tools, insights, and conversations that help me level up and stay ahead of the competition.\n` +
`5. Create Real Value — I'm here to make a difference. Whether I'm mentoring others, solving complex customer problems, or building enterprise account patches, I always leave things better than I found them.\n` +
`6. Relationships Over Transactions — Long-term partnerships matter more to me than short-term wins. I take the time to understand people, build trust, and communicate in ways that feel natural and human.\n\n` +
`## Tools of the Craft (Sales Tech Stack)\n\n` +
`These tools allow me to operate with precision, deepen relationships, and stay proactive in managing my pipeline. But tools only support what matters most: building trust and delivering value. I use AI to help with critical thinking as opposed to automation.\n\n` +
`- Intelligence & Research: ChatGPT, Claude, LinkedIn Sales Navigator, Sumble, Perplexity\n` +
`- Deal Collaboration: Google Docs, Microsoft Teams, Slack, WhatsApp\n` +
`- Discovery & Notes: Jamie.AI, Executive Templates, Business Case Templates\n` +
`- Outreach & Pipeline: Apollo.io, HubSpot, LinkedIn Sales Navigator\n\n` +
`## Testimonials\n\n` +
`- "Wish you all the best for the future. For what is it worth I am extremely proud of your growth in your career and definitely one of the best hires I have ever made. Will see you for a beer sometime soon." — Chris Brown, SoftwareONE Sales Director\n` +
`- "How do we hire 5 more Sam's, I am really impressed with the willingness to jump straight in. I love the way he thinks and communicates." — James Hirst, Co Founder TYK\n` +
`- "Sam is excellent, I really can't speak highly enough of him. Very natural, positive sales person who will grow any patch he is given. He would genuinely be one of my first hires to any sales team." — Dave Knowles, VMware Enterprise Sales Director\n` +
`- "Sam Bryant worked for me throughout his time at SoftwareONE. I couldn't rate him highly enough as a salesperson and only wish I could get him to come and join my team again!" — Tracy Parish, SoftwareONE Enterprise sales manager\n` +
`- "I'm absolutely made up for you Sam, getting that order booked and the few coming too. You are a superb person and your work ethic is exemplary. We need to continue to help you shine." — Peter Clitheroe, VP Sales EMEA at Tyk\n` +
`- "I just wanted to call out your Q3 performance for recognition. 163% of target at £522k is a fantastic achievement, as is the 50% mix of MV and Mgd Svcs in that performance, not to mention the 1.818m you've achieved YTD! Thanks for setting such a great example to our upcoming BDMs, much appreciated." — Richard Best, SoftwareONE Sales Director\n\n` +
`## More Than a Seller — About Me\n\n` +
`I'm driven by more than just hitting targets, I want to build a career that balances success with meaning. Outside of work, I'm a dad and partner first, which keeps me grounded and focused on what truly matters. That sense of responsibility and empathy informs how I lead conversations, build relationships, and support customers and teammates alike.\n\n` +
`I believe in continuous growth, not just professionally but personally. Whether it's staying active, exploring new music, or diving into psychology and nutrition, I bring that same curiosity and energy into every part of my life. This balance helps me stay resilient and adaptable in the fast-paced world of enterprise software sales.\n\n` +
`Ultimately, I'm here to create lasting impact, not only in deals closed but in trust earned and value delivered over time.\n\n` +
`What I Bring — Entrepreneurial mindset combined with enterprise sales expertise. I excel at translating technical solutions into business value and leverage AI tools to scale my effectiveness in high-stakes environments. I am creative and in my spare time recently have been experimenting with the possibilities of AI, understanding how AI agents work, how no code tools like replit and lovable work. Not only has this improved my knowledge of AI but has helped my day to day conversations with technology leaders and helped me to understand more of their world and day to day challenges.\n\n` +
`Beyond Sales — Former academy footballer turned sales leader. I believe in continuous learning, strategic thinking, and the power of technology to transform how we work. Always ready for the next challenge. My interests include, Football (For my sins I support Leeds United), golf, tennis, running, the gym & house music. I also like to invest and take an active interest in the financial markets.\n\n` +
`## The Numbers (SoftwareONE 2015-2020)\n\n` +
`Summary Stats: Total Achievement 865%, Target Growth 283%, GP Growth 346%, Years Tracked 6.\n\n` +
`Annual Performance:\n` +
`- 2020 — Budget: £1,442,523 | Actual: £2,134,000 | Achievement: 133% | Target Increase: 20% | GP Growth: 47%\n` +
`- 2019 — Budget: £1,200,000 | Actual: £1,442,523 | Achievement: 120% | Target Increase: 50% | GP Growth: 71%\n` +
`- 2018 — Budget: £800,000 | Actual: £838,731 | Achievement: 105% | Target Increase: 56% | GP Growth: -17%\n` +
`- 2017 — Budget: £511,919 | Actual: £1,012,741 | Achievement: 198% | Target Increase: 91% | GP Growth: 76%\n` +
`- 2016 — Budget: £300,000 | Actual: £573,932 | Achievement: 191% | Target Increase: 66% | GP Growth: 169%\n` +
`- 2015 — Budget: £180,000 | Actual: £213,000 | Achievement: 118% | Target Increase: N/A | GP Growth: N/A\n\n` +
`## Contact\n\n` +
`Let's Connect — Get in touch to discuss enterprise sales opportunities.\n`;
  }, []);

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sam-bryant-site-content.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Navigation />
      <section className="pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Export Site Content (Markdown)</h1>
            <p className="text-muted-foreground">All copy compiled into a single, Google Docs–ready .md file.</p>
          </div>

          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="flex gap-3 justify-end">
                <Button onClick={downloadMarkdown} className="">Download .md</Button>
              </div>
              <Textarea
                value={markdown}
                readOnly
                className="min-h-[60vh] font-mono text-sm"
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ExportContentPage;
