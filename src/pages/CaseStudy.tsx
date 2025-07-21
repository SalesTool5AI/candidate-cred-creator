import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import company logos
import mastercardLogo from "@/assets/logos/mastercard.png";
import johnsonMattheyLogo from "@/assets/logos/johnson-matthey.png";
import fedexLogo from "@/assets/logos/fedex-simple.png";
import fidelityLogo from "@/assets/logos/fidelity.png";
import armLogo from "@/assets/logos/arm.png";

type CaseStudyContent = {
  crisis?: string;
  challenge: string;
  strategy?: string;
  approach?: string;
  execution: string;
  results: string;
  leadership?: string;
};

type CaseStudy = {
  emoji: string;
  company: string;
  title: string;
  logo: string;
  metrics: {
    arr: string;
    timeline: string;
    achievement: string;
  };
  summary: string;
  content: CaseStudyContent;
  nextCase: string;
};

const caseStudies: Record<string, CaseStudy> = {
  mastercard: {
    emoji: "💳",
    company: "Mastercard",
    logo: mastercardLogo,
    title: "From Crisis to Champion: How We Turned a Security Nightmare into a $1.8M Win",
    metrics: {
      arr: "$1.8M ARR",
      timeline: "4-month cycle",
      achievement: "Beat Cisco"
    },
    summary: "Transformed a security crisis into Mastercard's largest enterprise deal, beating established competitors through strategic problem-solving.",
    content: {
      crisis: "When one of Mastercard's subsidiaries biggest customers discovered 250+ vulnerabilities in their IT environment, heads rolled—literally. The CEO and COO were out, and the new leadership faced a stark reality: their payment processing infrastructure was a security disaster waiting to happen. That's where our team came in. As the Account Executive, I knew we needed a different approach than the typical enterprise sales playbook. Working closely with our technical specialists, we managed to turn what's usually a 12-month sales cycle into a 4-month success story.",
      challenge: "The new executives weren't just looking for a security solution, they needed to rebuild trust, demonstrate competence, and do it fast. But, they had no budget allocated and were competing against Cisco, the incumbent provider who had visibility into our pricing and was aggressively undercutting us. I knew we needed to play a different game entirely.",
      strategy: "Instead of trying to reach executives directly, I identified two internal champions who had the ear of the C-suite: the Director of Architecture and Principal Architect. My approach was simple but methodical:\n\nPhase 1: Deep Diagnosis - I orchestrated customer-centric workshops with our technical specialists, treating this like a medical consultation rather than a sales pitch. We needed to understand not just what was broken, but why it mattered to their business.\n\nPhase 2: Champion Development - Over several weeks, I worked closely with our champions to develop 7 high-level security themes that would resonate with executives while tying back to our NSX solution. We created unbranded documentation they could present as their own, knowing we'd never be allowed in the room for the final decision.\n\nPhase 3: Momentum Building - I established a Microsoft Teams group with all key stakeholders from both sides. This transparent collaboration accelerated trust-building and kept everyone aligned on messaging and timelines.",
      execution: "The magic happened in the details. Every piece of documentation used their internal language. Every presentation was designed for easy integration into their executive briefings. I even included a convenience clause in the contract, if we couldn't deliver, they could terminate and get a full refund. When budget became the objection ('We have no money until next year'), our business case was so compelling that the conversation shifted to 'Which budget do we use?' They found the money in a secret squirrel budget the CSO held for emergencies.",
      results: "$1.8M ARR signed with expansion potential to $6M over two years. Sales cycle compressed from 12 months to 4 months. Displaced Cisco despite their aggressive pricing and incumbent advantage. Positioned VMware as the strategic partner for their future UK payment infrastructure overhaul.\n\nBut the real victory? Our champions became genuine advocates who drove the deal internally while we provided the ammunition.",
      leadership: "This wasn't about having the best product or the lowest price. It was about orchestrating a complex B2B sale by understanding that in enterprise deals, you're not just selling to a company, you're selling through people who have their own careers and reputations on the line. By making our champions look brilliant to their executives, we created a win-win that turned a crisis into our biggest new logo win of the year for the network security division. This case study demonstrates my approach to complex enterprise sales: diagnose first, sell through champions, and always make the customer the hero of their own story."
    },
    nextCase: "johnson-matthey"
  },
  "johnson-matthey": {
    emoji: "⚗️",
    company: "Johnson Matthey",
    logo: johnsonMattheyLogo,
    title: "Turning Service Failure into £1M Partnership",
    metrics: {
      arr: "£1M GP",
      timeline: "1,000+ requests processed",
      achievement: "10-person dedicated team"
    },
    summary: "Converted a major service failure with a strategic client into the foundation of a million-pound partnership through exceptional recovery and personal commitment.",
    content: {
      challenge: "At a packed CIO event in London, I made initial contact with Johnson Matthey's CIO and infrastructure team. After several meetings understanding their software management challenges, we secured our first opportunity: managing their end-to-end software request process with an initial £100k in services. Then disaster struck. Our services team couldn't deliver the promised resources, leaving us facing potential client loss and reputational damage with a high-profile account.",
      approach: "Instead of making excuses or passing responsibility, I made a critical decision: I would personally ensure delivery. I gained direct access to Johnson Matthey's helpdesk system and committed to working nights and breaks for three months to personally process over 1,000 software requests alongside my inside sales team, while maintaining constant communication with the client throughout the crisis.",
      execution: "What started as a crisis response evolved into a comprehensive managed service. I built a dedicated 10-person team managing the Johnson Matthey account and expanded scope to include software compliance, software requests, and complete software spend optimization. We integrated their ITSM tool (Ivanti) with our platforms (Pyracloud, SNOW License Manager) and captured all background software spend through seamless tool integration.",
      results: "Short-term, we averted the crisis and preserved the client relationship. Long-term, the transformation was remarkable. We generated £1M gross profit within two years, making Johnson Matthey our highest-grossing services client. The initial hands-on approach provided the foundation to build a scalable solution that grew from crisis response to a comprehensive managed service with a dedicated team.",
      leadership: "When you personally step in during difficulties, clients see genuine commitment beyond typical vendor promises. This builds trust that no sales pitch can achieve. The service failure became our greatest relationship-building moment because clients judge vendors not by perfect execution, but by how they respond when things go wrong. Those three months weren't just about solving immediate problems, they provided invaluable insight into client workflows and pain points that informed our entire service approach. In services sales, your greatest competitive advantage isn't your product or pricing, it's your willingness to do whatever it takes to ensure client success. Leading with services also helps to be viewed strategically and pick up more transactional opportunities in the background. When faced with obstacles, double down on commitment. Long-term partnerships are built on trust earned through actions, not words."
    },
    nextCase: "fedex"
  },
  fedex: {
    emoji: "📦",
    company: "FedEx",
    logo: fedexLogo,
    title: "From Crisis to £1.6M Win: How I Turned Cost Cuts Into Our Biggest Opportunity",
    metrics: {
      arr: "£1.6M ARR",
      timeline: "3-month sales cycle",
      achievement: "£4M+ savings delivered"
    },
    summary: "Transformed FedEx's cost-cutting crisis into a strategic partnership, delivering massive operational savings while securing our largest contract through innovative problem-solving.",
    content: {
      crisis: "When I inherited FedEx as an account, we were barely on their radar. One contact, limited engagement, and DXC owned the infrastructure conversation. We'd just closed a £2.7M ARR datacenter deal in Belgium after eight months of grinding, but FedEx still saw us as a vendor, not a strategic partner. Their IT was largely outsourced to DXC, meaning most FedEx team members had lost touch with their own systems. Classic enterprise challenge: the people making decisions weren't the ones living with the technology day-to-day. Then COVID's e-commerce boom turned into a cost-cutting nightmare. FedEx had scaled up aggressively and now needed to slash expenses fast. Our entire pipeline froze overnight.",
      challenge: "The real challenge wasn't just frozen budgets - it was the perverse incentive structure. DXC was getting paid every time they provisioned a new server. They had zero incentive to help FedEx optimise or consolidate anything. In fact, inefficiency was their business model. Meanwhile, FedEx's finance team was demanding immediate cost reductions, but the IT team had limited visibility into their own infrastructure usage patterns.",
      strategy: "Instead of waiting for budgets to unfreeze, I saw an opportunity. What if we could help FedEx save money instead of asking them to spend money? I quarterbacked our technical team to analyse FedEx's infrastructure using our existing SKYLINE platform. We discovered massive inefficiencies - overloaded servers running alongside completely underutilized ones. Classic enterprise waste that nobody was tracking. The key insight: our Aria operations platform could give FedEx visibility into their own infrastructure usage patterns.",
      execution: "Here's where the real work began. I had to orchestrate multiple moving parts:\n\n• Build the business case: Quantify exactly how much FedEx could save through server consolidation and optimization\n• Align DXC: Convince them that helping FedEx reduce costs would strengthen their long-term partnership\n• Navigate FedEx politics: Expand beyond our single contact to build support across multiple senior stakeholders\n• Coordinate VMware resources: Pull in the right technical expertise at the right moments\n\nThe DXC conversation was crucial. I positioned it as: 'Help FedEx become more efficient now, and you'll be their trusted partner for the next growth phase.' They bought in. We ran a pilot that demonstrated potential savings of over £4 million in hardware, software, licenses, and labor. Not projections - actual identified waste they could eliminate immediately.",
      results: "Three months from crisis to signature - unheard of for FedEx. £1.6M ARR in Aria licenses to extend these efficiencies across their international systems. More importantly, we'd transformed the relationship. FedEx now viewed us as strategic partners who understood their business challenges, not just technology vendors pushing products. FedEx's finance team suddenly became our biggest advocates. The conversation shifted from 'Can we afford this?' to 'Can we afford not to do this?'",
      leadership: "The best sales cycles aren't about convincing customers to buy what you're selling. They're about aligning your solutions with their most urgent business problems. By focusing on FedEx's cost-cutting imperative rather than our product features, we found our way into a more strategic partnership. The numbers: £1.6M ARR in four months, 3-month sales cycle at a company known for 12-month decision processes, and a relationship transformation that opened doors across their entire international organization. This case study demonstrates the AE skills critical for sales management: strategic thinking, stakeholder orchestration, competitive positioning, and the ability to turn market challenges into growth opportunities."
    },
    nextCase: "fidelity"
  },
  fidelity: {
    emoji: "💰",
    company: "Fidelity International",
    logo: fidelityLogo,
    title: "From At-Risk to $15M Partnership",
    metrics: {
      arr: "$15M contract",
      timeline: "$500K investment in professional services",
      achievement: "150%+ price increase"
    },
    summary: "Rescued an at-risk client relationship and transformed it into a $15M strategic partnership through innovative solution design.",
    content: {
      challenge: "Fidelity International was an early VCF adopter experiencing significant platform issues that had severely damaged their relationship with VMware. With Broadcom's pending 150%+ price increases, the account was at critical risk of churning despite being a strategic enterprise client.",
      approach: "Phase 1: Diagnostic Deep Dive\n• Deployed proven workshop framework to identify root causes beyond surface-level complaints\n• Invested time in comprehensive discovery rather than rushing to solutions\n• Built detailed executive report with specific recommendations\n\nPhase 2: Commitment Through Investment\n• Allocated $500K in professional services to demonstrate genuine partnership\n• Embedded dedicated resources: 2 customer architects, customer success managers, and technical account manager\n• Created success milestones with dedicated VMware resources attached\n\nPhase 3: Executive Alignment\n• Aligned UK MD, Sales Director, and CTO with client leadership team\n• Established direct executive communication channels\n• Positioned price increases within context of enhanced value and partnership",
      execution: "The transformation required sustained commitment over 12+ months, from initial workshops through contract signature. We maintained consistent executive communication while our embedded team delivered measurable improvements. The key was demonstrating value before discussing price increases, ensuring Fidelity saw the enhanced partnership benefits that justified the significant investment.",
      results: "• Timeline: 12+ months from workshops to signature\n• Outcome: $15M, 3-year contract ($5M ARR)\n• Strategic Value: Secured renewal and upgrade despite 150%+ price increases\n• Relationship: Transformed from vendor to trusted partner with embedded visibility",
      leadership: "Key Success Factors:\n• Diagnostic before prescription - Understanding root causes through structured workshops\n• Investment demonstrates commitment - Significant professional services investment rebuilt trust\n• Executive alignment creates confidence - Leadership-to-leadership relationships enabled difficult conversations\n• Partnership model drives retention - Embedded resources provide ongoing value and intelligence\n\nThis framework has proven transferable to other at-risk enterprise accounts facing similar technical and relationship challenges."
    },
    nextCase: "arm"
  },
  arm: {
    emoji: "🤖",
    company: "ARM",
    logo: armLogo,
    title: "From Cold Call to Strategic Partner: The ARM Limited Success Story",
    metrics: {
      arr: "£1M+ annual GP",
      timeline: "Office access 2 days/week",
      achievement: "SW1 strategic account"
    },
    summary: "Transformed a cold call into ARM's largest technology partnership, securing preferred vendor status and exclusive access through strategic value creation and genuine problem-solving.",
    content: {
      challenge: "ARM Limited, the Cambridge-based chip design giant, was drowning in success. Revenue was soaring, but their procurement strategy hadn't evolved with their growth. Despite being a tech innovator, they were still relying on a local reseller for software procurement—paying an eye-watering 18% markup in the process. The team knew they had a problem but needed a partner who could deliver a real solution, not just point out the obvious.",
      approach: "After landing a meeting through a cold call, I didn't just present another vendor pitch. Instead, I offered to benchmark their recent quotes against market rates. The numbers were stark: they were hemorrhaging money on every software purchase. When we met face-to-face, I came armed with data, not just promises. This wasn't about features—it was about demonstrating real impact through concrete evidence.",
      execution: "I proposed a two-pronged strategy that addressed both immediate savings and long-term optimization. In Phase 1, we focused on visibility and control by implementing Pyracloud, our software management tool, to centralize license keys, invoices, and pricing catalogs. This gave ARM complete visibility into their software spend for the first time while streamlining contract management through SoftwareONE. Phase 2 centered on optimization and intelligence, where we deployed a software asset managed service for usage tracking and asset management. This allowed us to identify waste and underutilized licenses while creating data-driven insights for future procurement decisions.",
      results: "Year 1 delivered immediate impact by eliminating the 18% markup and delivering six-figure savings. By Year 3, we had grown the account value to over £1 million GP annually. Most significantly, we earned contractor status with office access 2 days per week, working directly within their procurement and IT teams as trusted partners rather than external vendors.",
      leadership: "The breakthrough came from leading with value rather than features, demonstrating real impact through benchmarking instead of presenting product specifications. By thinking partnership rather than transaction and focusing on long-term strategy rather than one-off sales, I transformed a procurement relationship into a strategic partnership. Working on-site built relationships that no amount of external meetings could match. When you're integrated into their daily operations, you become part of the solution. Most importantly, concrete savings evidence was more persuasive than any sales presentation because numbers don't lie. This case study demonstrates how strategic selling and genuine value creation can transform a cold prospect into a million-pound account and trusted partnership."
    },
    nextCase: "astrazeneca"
  },
  astrazeneca: {
    emoji: "🛡️",
    company: "AstraZeneca",
    logo: "/lovable-uploads/ee8dd31c-9421-4b9f-a8c9-2d6a35c5f4f4.png",
    title: "AstraZeneca Account Recovery: From Crisis to £2M Partnership",
    metrics: {
      arr: "£2M ARR",
      timeline: "4-month recovery",
      achievement: "£2M loss prevention"
    },
    summary: "Successfully recovered a deteriorating £1.5m ARR AstraZeneca account from a 6-month communication blackout, ultimately securing a £2m ARR deal while protecting the company from potential £2m contractual losses.",
    content: {
      crisis: "When I inherited the AstraZeneca account, the relationship was in complete crisis. The previous account team had attempted to charge AZ £17m to upgrade to a license they didn't require, while AZ was simultaneously disputing Broadcom license changes. This had resulted in a 6-month communication blackout with AZ procurement instructing the entire technology team not to engage with us. Our £1.5m ARR contract was at risk of non-renewal, AstraZeneca was actively threatening to migrate entirely to AWS, and Broadcom was blacklisted at AstraZeneca, creating additional complexity.",
      challenge: "Upon reviewing the contractual position with our legal team, I discovered AZ's existing contract was 'watertight' from their perspective regarding forced product upgrades. Under current terms, AZ could legally claim up to 80,000 cores of licensing. If they exercised full contractual rights, it would result in a £2m loss for our company. The customer felt 'backed into a corner' by previous aggressive tactics, creating both legal and commercial complexity that required careful navigation.",
      strategy: "Rather than pursuing an aggressive commercial strategy, I chose a trust-rebuilding approach. I utilized Computacenter's existing relationship and substantial managed service contracts with AZ to mediate communication and understand underlying motivations. I positioned myself as wanting to understand AZ's perspective, goals, and concerns rather than immediately pushing commercial objectives. We conducted educational workshops with my solution engineer to demonstrate value rather than forcing compliance, looking at gaps in their environment and providing insights into their infrastructure.",
      approach: "My stakeholder management approach was comprehensive: External stakeholders included Naresh Babu (Infrastructure Director, US), Rob Weiner (Head of Cloud Infrastructure), David Griffiths (Procurement), Jens Walton (Licensing), and Jeff Haskill (VP of Infrastructure). Internally, I managed up through Managing Director and legal counsel, clearly articulating the downside risk of aggressive tactics and potential for AZ to claim significantly more licensing than requested. I worked closely with legal counsel to understand contractual obligations and protect company interests while rebuilding customer trust.",
      execution: "Through the workshops, we helped AZ understand their environment, versions, locations, and strategic plans around their cloud and datacentres. They gained insight into their environment and were able to show something tangible to their stakeholders from VMware. We understood what we were dealing with - their licenses, versions, locations, strategic plans. I presented business case to leadership for playing the 'long game' - accepting lower initial terms to rebuild trust for future growth opportunities rather than risk total account loss or contractual exposure. The 4-month recovery process transformed a relationship crisis into a strategic partnership through careful stakeholder management, legal acumen, and partner-leveraged trust rebuilding.",
      results: "Contract Secured: £2m ARR deal (33% increase from original £1.5m at risk). License Optimization: Renewed for 40,000 cores instead of potential 80,000 core claim. Loss Prevention: Protected company from £2m contractual loss exposure. Relationship Transformation: From communication blackout to signed partnership. Strategic Value: Overcame Broadcom blacklisting through demonstrated customer advocacy, strengthened Computacenter alliance through successful collaboration, and established foundation for future growth opportunities.",
      leadership: "This case demonstrated that in complex B2B relationships, understanding contractual positions, leading with empathy, and utilizing partner ecosystems can transform seemingly impossible situations into significant wins. The approach has since been replicated across other challenging accounts, establishing a framework for relationship recovery in high-stakes enterprise environments. Key competencies demonstrated include strategic account management through transforming adversarial relationships into partnerships, legal & commercial acumen in navigating complex contractual positions, stakeholder influence across multi-level, multi-geography ecosystems, risk management balancing customer advocacy with commercial protection, partner ecosystem management leveraging third-party relationships, and executive communication effectively influencing internal leadership despite short-term commercial pressure."
    },
    nextCase: "mastercard"
  }
};

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!slug || !caseStudies[slug as keyof typeof caseStudies]) {
    return <Navigate to="/" replace />;
  }

  const study = caseStudies[slug as keyof typeof caseStudies];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back Navigation */}
        <Link to="/">
          <Button 
            variant="outline" 
            className="mb-6 bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <img 
              src={study.logo} 
              alt={`${study.company} logo`} 
              className="h-12 w-auto max-w-[200px] object-contain"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {study.company}
          </h1>
          <p className="text-xl sm:text-2xl text-cyan-400 font-semibold mb-6">
            {study.title}
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {study.summary}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{study.metrics.arr}</div>
              <p className="text-gray-300">Contract Value</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{study.metrics.timeline}</div>
              <p className="text-gray-300">Timeline/Scale</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyan-400">{study.metrics.achievement}</div>
              <p className="text-gray-300">Key Achievement</p>
            </CardContent>
          </Card>
        </div>

        {/* Case Study Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {study.content.crisis && (
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-orange-400">The Crisis That Changed Everything</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{study.content.crisis}</p>
              </CardContent>
            </Card>
          )}

          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-red-400">
                {study.content.crisis ? 'The Challenge: More Than Just Technology' : 'The Challenge'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">{study.content.challenge}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-yellow-400">
                {study.content.strategy ? 'The Strategy: Sell Through Champions, Not Around Them' : 'The Approach'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {study.content.strategy || study.content.approach}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-blue-400">
                {study.content.strategy ? 'The Execution: Details That Win Deals' : 'The Execution'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">{study.content.execution}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-green-400">
                {study.content.strategy ? 'The Results: Beyond the Numbers' : 'The Results'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">{study.content.results}</div>
            </CardContent>
          </Card>

          {study.content.leadership && (
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">The Leadership Lesson</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{study.content.leadership}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Next Case Study */}
        <div className="mt-12 text-center">
          <Link to={`/case-study/${study.nextCase}`}>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            >
              Next Case Study
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;