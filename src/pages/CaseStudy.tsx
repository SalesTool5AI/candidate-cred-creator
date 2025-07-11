import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      strategy: "Instead of trying to reach executives directly, I identified two internal champions who had the ear of the C-suite: the Director of Architecture and Principal Architect. My approach was simple but methodical:\n\n**Phase 1: Deep Diagnosis** - I orchestrated customer-centric workshops with our technical specialists, treating this like a medical consultation rather than a sales pitch. We needed to understand not just what was broken, but why it mattered to their business.\n\n**Phase 2: Champion Development** - Over several weeks, I worked closely with our champions to develop 7 high-level security themes that would resonate with executives while tying back to our NSX solution. We created unbranded documentation they could present as their own, knowing we'd never be allowed in the room for the final decision.\n\n**Phase 3: Momentum Building** - I established a Microsoft Teams group with all key stakeholders from both sides. This transparent collaboration accelerated trust-building and kept everyone aligned on messaging and timelines.",
      execution: "The magic happened in the details. Every piece of documentation used their internal language. Every presentation was designed for easy integration into their executive briefings. I even included a convenience clause in the contract, if we couldn't deliver, they could terminate and get a full refund. When budget became the objection ('We have no money until next year'), our business case was so compelling that the conversation shifted to 'Which budget do we use?' They found the money in a secret squirrel budget the CSO held for emergencies.",
      results: "• $1.8M ARR signed with expansion potential to $6M over two years\n• Sales cycle compressed from 12 months to 4 months\n• Displaced Cisco despite their aggressive pricing and incumbent advantage\n• Positioned VMware as the strategic partner for their future UK payment infrastructure overhaul\n\nBut the real victory? Our champions became genuine advocates who drove the deal internally while we provided the ammunition.",
      leadership: "This wasn't about having the best product or the lowest price. It was about orchestrating a complex B2B sale by understanding that in enterprise deals, you're not just selling to a company, you're selling through people who have their own careers and reputations on the line. By making our champions look brilliant to their executives, we created a win-win that turned a crisis into our biggest new logo win of the year for the network security division. This case study demonstrates my approach to complex enterprise sales: diagnose first, sell through champions, and always make the customer the hero of their own story."
    },
    nextCase: "johnson-matthey"
  },
  "johnson-matthey": {
    emoji: "⚗️",
    company: "Johnson Matthey",
    title: "Turning Service Failure into £1M Partnership",
    metrics: {
      arr: "£1M GP",
      timeline: "1,000+ requests processed",
      achievement: "10-person team managed"
    },
    summary: "Converted a major service failure with a strategic client into the foundation of a million-pound partnership through exceptional recovery.",
    content: {
      challenge: "Johnson Matthey, a leading specialty chemicals company, experienced a significant service disruption that threatened their production schedules. The failure of their previous provider had caused delays in critical chemical processes, potentially costing millions in lost production time.",
      approach: "Instead of walking away from a damaged relationship, I saw an opportunity to demonstrate our commitment and capabilities. I personally took ownership of the situation and assembled a dedicated response team to address their immediate needs while building a long-term partnership strategy.",
      execution: "We established a dedicated 10-person team to handle Johnson Matthey's account exclusively. This team processed over 1,000 service requests in the first year, ensuring zero downtime and exceeding their performance expectations.",
      results: "What started as a service recovery became our largest client relationship in the chemicals sector. The partnership has generated over £1M in gross profit annually and established us as their preferred technology partner for global operations."
    },
    nextCase: "fedex"
  },
  fedex: {
    emoji: "📦",
    company: "FedEx",
    title: "Crisis to £900K Win: Cost Cuts Into Opportunity",
    metrics: {
      arr: "£900K ARR",
      timeline: "£4M+ savings delivered",
      achievement: "3-month turnaround"
    },
    summary: "Turned FedEx's cost-cutting mandate into a strategic technology upgrade, delivering massive savings while securing a major contract.",
    content: {
      challenge: "FedEx was under pressure to reduce operational costs across their global network. Their existing technology infrastructure was outdated and expensive to maintain, but they were hesitant to invest in new solutions during a cost-cutting phase.",
      approach: "I reframed the conversation from cost-cutting to value creation. By conducting a detailed analysis of their current spending and operational inefficiencies, I demonstrated how our solutions could deliver immediate savings while improving performance.",
      execution: "Working within their aggressive 3-month timeline, we implemented a phased approach that delivered quick wins while building towards larger transformations. This required careful project management and stakeholder alignment across multiple FedEx business units.",
      results: "The implementation delivered over £4M in cost savings within the first year, far exceeding their initial targets. The success led to a £900K annual contract and positioned us as a strategic partner for future initiatives."
    },
    nextCase: "fidelity"
  },
  fidelity: {
    emoji: "💰",
    company: "Fidelity International",
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
    title: "Cold Call to Strategic Partner",
    metrics: {
      arr: "£1M+ annual GP",
      timeline: "18% markup eliminated",
      achievement: "On-site access granted"
    },
    summary: "Built ARM's largest technology partnership from a cold call, securing preferred vendor status and exclusive access to their development teams.",
    content: {
      challenge: "ARM, the semiconductor giant, had an established vendor ecosystem and wasn't actively seeking new partners. Breaking into their supplier network required demonstrating exceptional value and building relationships from scratch.",
      approach: "My cold call strategy focused on understanding their unique challenges in supporting global development teams. I spent months researching their technology stack and identifying opportunities where we could add value beyond cost savings.",
      execution: "The breakthrough came when I proposed a unified toolchain solution that could eliminate the 18% markup they were paying through their existing vendor. This required deep technical knowledge and the ability to coordinate complex implementations across multiple ARM locations.",
      results: "The partnership now generates over £1M in annual gross profit and has granted us unprecedented access to ARM's development teams. We've become their go-to partner for scaling development operations globally."
    },
    nextCase: "mastercard"
  }
};

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  
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
          <div className="text-6xl sm:text-8xl mb-4">{study.emoji}</div>
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