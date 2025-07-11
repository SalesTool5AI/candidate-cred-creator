import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const caseStudies = {
  mastercard: {
    emoji: "💳",
    company: "Mastercard",
    title: "From Crisis to Champion: Security Nightmare to $1.8M Win",
    metrics: {
      arr: "$1.8M ARR",
      timeline: "4-month cycle",
      achievement: "Beat Cisco"
    },
    summary: "Transformed a security crisis into Mastercard's largest enterprise deal, beating established competitors through strategic problem-solving.",
    content: {
      challenge: "Mastercard faced a critical security breach that exposed vulnerabilities in their payment processing infrastructure. Their existing vendor relationships had failed them during the crisis, and they needed a trusted partner who could deliver enterprise-grade security solutions while maintaining their operational requirements.",
      approach: "Rather than simply pitching our standard solutions, I assembled a cross-functional team of security experts and spent weeks understanding their unique challenges. We developed a customized security framework that not only addressed their immediate concerns but also positioned them for future growth.",
      execution: "The implementation required coordinating with multiple stakeholders across different time zones and regulatory environments. We established clear communication protocols and provided 24/7 support during the critical transition period.",
      results: "Not only did we secure the $1.8M annual contract, but we also helped Mastercard achieve SOC 2 compliance ahead of schedule. The partnership has since expanded to include additional services and regions."
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
    company: "Fidelity",
    title: "At-Risk to $15M Partnership",
    metrics: {
      arr: "$15M contract",
      timeline: "$500K investment",
      achievement: "150%+ price increase"
    },
    summary: "Rescued an at-risk client relationship and transformed it into a $15M strategic partnership through innovative solution design.",
    content: {
      challenge: "Fidelity was on the verge of terminating their contract due to performance issues and was actively evaluating competitors. The relationship had deteriorated to the point where they were demanding significant price reductions and considering legal action.",
      approach: "Rather than competing on price, I focused on rebuilding trust and demonstrating value. I invested $500K in developing custom solutions that addressed their specific pain points and aligned with their strategic objectives.",
      execution: "The turnaround required intense stakeholder management and transparent communication. I established weekly executive reviews and implemented real-time performance monitoring to rebuild confidence in our capabilities.",
      results: "Not only did we retain the client, but we secured a new $15M contract with pricing that was 150% higher than their original contract. The relationship became a showcase for our capabilities in the financial services sector."
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
          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-red-400">The Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">{study.content.challenge}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-yellow-400">The Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">{study.content.approach}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-blue-400">The Execution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">{study.content.execution}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-green-400">The Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">{study.content.results}</p>
            </CardContent>
          </Card>
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