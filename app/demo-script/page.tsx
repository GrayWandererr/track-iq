"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Clock, 
  ChevronRight, 
  Presentation,
  Copy,
  Check,
  FileText
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface ScriptSection {
  title: string
  duration: string
  content: string[]
  actions?: string[]
  notes?: string[]
}

const scriptSections: ScriptSection[] = [
  {
    title: "Introduction",
    duration: "1 minute",
    content: [
      "Good [morning/afternoon], and thank you for joining us today.",
      "For years, Fulfillment IQ has been the trusted partner for warehouse operators, delivering powerful dashboards, comprehensive reports, AI-driven insights, and seamless integrations.",
      "Today, we're excited to show you what we've built in partnership with Prologis - a revolutionary AI infrastructure that's setting a new standard for intelligent warehouse operations.",
      "What makes this platform truly groundbreaking is our semantic layer - think of it as the universal translator for your warehouse."
    ],
    notes: [
      "Establish credibility",
      "Build excitement",
      "Introduce key differentiator"
    ]
  },
  {
    title: "Dashboard Overview",
    duration: "30 seconds",
    content: [
      "Let's start with our real-time operational dashboards.",
      "Here you see our PowerBI-integrated dashboards showing real-time metrics, heat maps, and predictive analytics.",
      "But dashboards are just the beginning. The real magic happens when we bring in AI agents..."
    ],
    actions: ["Navigate to Site Dashboard"],
    notes: ["Keep this brief - dashboards are familiar"]
  },
  {
    title: "Agent Studio Introduction",
    duration: "30 seconds",
    content: [
      "Welcome to the Agent Studio - your AI-powered command center.",
      "Think of this as having a team of expert consultants available 24/7.",
      "Each agent has deep domain expertise and can work independently or collaborate on complex problems."
    ],
    actions: ["Click on Agent Studio in sidebar"]
  },
  {
    title: "Demo Scenario 1: Safety Compliance",
    duration: "2 minutes",
    content: [
      "Let's start with a real scenario that happened last week at one of our facilities.",
      "Watch how the AI processes this request...",
      "In under 4 seconds, we've analyzed feeds from 128 cameras.",
      "Now watch this - I can take immediate action."
    ],
    actions: [
      "Type: \"Show me all PPE violations in the last hour\"",
      "Show loading animation",
      "Click \"Send Alert\" button"
    ],
    notes: [
      "Emphasize speed",
      "Show real-time processing",
      "Demonstrate actionability"
    ]
  },
  {
    title: "Demo Scenario 2: Labor Optimization",
    duration: "2 minutes",
    content: [
      "Now let's tackle a more complex challenge - staffing optimization.",
      "The system is analyzing current staffing levels and calculating optimal distribution.",
      "We're 5 workers short for projected volume.",
      "The system just auto-dialed qualified workers from our standby pool."
    ],
    actions: [
      "Type: \"Is the evening shift adequately staffed?\"",
      "Click \"Call Additional Staff\" button"
    ]
  },
  {
    title: "Demo Scenario 3: Cross-Functional Intelligence",
    duration: "2 minutes",
    content: [
      "Now let me show you something that typically takes analysts hours to produce.",
      "This question requires coordination across multiple systems.",
      "In seconds, we've modeled the entire operation and identified breaking points.",
      "What used to take a planning meeting and hours of analysis now happens in seconds."
    ],
    actions: [
      "Type: \"If tomorrow's inbound volume jumps 25%, where will we break first?\"",
      "Click \"Create Surge Plan\" button"
    ]
  },
  {
    title: "Demo Scenario 4: Executive Intelligence",
    duration: "1.5 minutes",
    content: [
      "Let's switch gears to executive reporting.",
      "Perfect for board meetings or investor calls.",
      "$3.2M in savings - 14% above target with 287% ROI.",
      "One click gives you a professionally formatted slide deck."
    ],
    actions: [
      "Type: \"Prepare an investor slide showing AI savings from last quarter\"",
      "Click \"Download PPTX\" button"
    ]
  },
  {
    title: "Integration Showcase",
    duration: "1 minute",
    content: [
      "None of this would be possible without our comprehensive integration platform.",
      "We connect to everything in your ecosystem.",
      "And if you need something we don't have, we can typically add new connectors within 2-3 weeks."
    ],
    actions: [
      "Navigate to Connectors page",
      "Click \"Request More\" button"
    ]
  },
  {
    title: "Security & Compliance",
    duration: "30 seconds",
    content: [
      "I know security is paramount for Prologis facilities.",
      "Every piece of data stays within your private cloud instance.",
      "We're SOC 2 Type II certified and comply with all major warehouse regulations."
    ]
  },
  {
    title: "ROI Summary",
    duration: "30 seconds",
    content: [
      "Let me leave you with the bottom line impact.",
      "15-20% reduction in labor costs",
      "30% improvement in dock efficiency",
      "67% reduction in safety incidents",
      "6-month average payback period",
      "But the real value? Your team spends time solving problems, not finding them."
    ]
  },
  {
    title: "Closing & Next Steps",
    duration: "30 seconds",
    content: [
      "This is just a glimpse of what's possible with the Prologis Innovation Platform.",
      "In our pilot phase, we're selecting 10 facilities for full implementation.",
      "Who's ready to transform their operations?"
    ],
    notes: ["Strong call to action", "Create urgency with limited pilot slots"]
  }
]

export default function DemoScriptPage() {
  const [copiedSection, setCopiedSection] = useState<number | null>(null)
  const [expandedSection, setExpandedSection] = useState<number>(0)

  const copyToClipboard = (section: ScriptSection, index: number) => {
    const text = `${section.title}\n${section.duration}\n\n${section.content.join('\n\n')}`
    navigator.clipboard.writeText(text)
    setCopiedSection(index)
    toast.success("Section copied to clipboard")
    setTimeout(() => setCopiedSection(null), 2000)
  }

  const getTotalDuration = () => {
    let totalSeconds = 0
    scriptSections.forEach(section => {
      const match = section.duration.match(/(\d+(?:\.\d+)?)\s*(minute|second)s?/)
      if (match) {
        const value = parseFloat(match[1])
        const unit = match[2]
        totalSeconds += unit === 'minute' ? value * 60 : value
      }
    })
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes} minutes`
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Presentation className="h-8 w-8 text-primary" />
            Demo Script
          </h1>
          <p className="text-gray-400 mt-1">
            Prologis Innovation Platform demonstration guide
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Total: {getTotalDuration()}
          </Badge>
          <Button variant="outline" asChild>
            <Link href="/docs/prologis-demo-script.md" target="_blank">
              <FileText className="h-4 w-4 mr-2" />
              View Markdown
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {scriptSections.map((section, index) => (
              <Button
                key={index}
                variant={expandedSection === index ? "default" : "outline"}
                size="sm"
                onClick={() => setExpandedSection(index)}
              >
                {section.title}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Script Sections */}
      <div className="grid gap-4">
        {scriptSections.map((section, index) => (
          <Card 
            key={index}
            className={`transition-all ${
              expandedSection === index ? 'ring-2 ring-primary' : ''
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-mono">
                    {index + 1}
                  </Badge>
                  <div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {section.duration}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(section, index)}
                >
                  {copiedSection === index ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main Content */}
              <div className="space-y-2">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-gray-300">
                    {paragraph.startsWith('"') ? (
                      <span className="italic">{paragraph}</span>
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}
              </div>

              {/* Actions */}
              {section.actions && (
                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-400 mb-2">Actions:</p>
                  <div className="space-y-1">
                    {section.actions.map((action, aIndex) => (
                      <div key={aIndex} className="flex items-center gap-2 text-sm">
                        <ChevronRight className="h-3 w-3 text-primary" />
                        <code className="bg-gray-800 px-2 py-1 rounded text-gray-300">
                          {action}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {section.notes && (
                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-400 mb-2">Notes:</p>
                  <ul className="space-y-1">
                    {section.notes.map((note, nIndex) => (
                      <li key={nIndex} className="text-sm text-gray-500 flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Common Questions & Answers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium">How long does implementation take?</p>
            <p className="text-gray-400 text-sm mt-1">
              Typical deployment is 6-8 weeks. Week 1-2 for integration, 3-4 for AI training, 5-6 for user training, then go-live with support.
            </p>
          </div>
          <div>
            <p className="font-medium">What if our data is messy?</p>
            <p className="text-gray-400 text-sm mt-1">
              Our semantic layer handles that. We've built adapters for every major WMS and can work with inconsistent data formats.
            </p>
          </div>
          <div>
            <p className="font-medium">Can we customize the agents?</p>
            <p className="text-gray-400 text-sm mt-1">
              Absolutely. Each agent learns from your specific operations and can be configured with your business rules and priorities.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-blue-950/20 border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-400">Demo Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-400">
          <p>• Let the AI's thinking process be visible - don't skip the loading animation</p>
          <p>• Click buttons to show actionability - demonstrate that insights lead to action</p>
          <p>• Reference real scenarios - "This actually happened last week..."</p>
          <p>• Keep energy high during transitions between sections</p>
          <p>• Have backup screenshots ready in case of connectivity issues</p>
        </CardContent>
      </Card>
    </div>
  )
} 