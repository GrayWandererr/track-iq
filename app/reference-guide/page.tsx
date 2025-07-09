"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Copy, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function ReferenceGuidePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const sampleQuestions = [
    "Show me all PPE violations in the last hour",
    "Is the evening shift adequately staffed?",
    "How many trucks are currently waiting?",
    "Generate executive summary for logistics RFP #2024-067",
    "Which locations have pending compliance violations?",
    "What's the overall health of operations right now?"
  ]

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    toast({
      title: "Copied to clipboard",
      description: "You can now paste this question in the Agent Studio chat"
    })
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()}
            className="gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-4xl font-bold">Agent Studio Reference Guide</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive questions, responses, and actions for intelligent warehouse operations
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <p className="text-lg">
                This guide represents our "shoot for the stars" vision for AI-powered warehouse management. 
                Each agent can not only respond with information but take meaningful actions to improve safety, 
                efficiency, and profitability.
              </p>
            </CardContent>
          </Card>

          {/* Quick Start Questions */}
          <Card className="mb-6 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Try These Questions in Agent Studio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground mb-4">
                Copy any of these questions and paste them into the Master Chat to see detailed responses:
              </p>
              <div className="grid gap-2">
                {sampleQuestions.map((question, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-background rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors group relative"
                    onClick={() => handleCopy(question, index)}
                  >
                    <code className="text-sm pr-8">{question}</code>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {copiedIndex === index ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            {/* Safety Agent */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  🛡️ Safety Agent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <QuestionBlock
                  question="Show me all PPE violations in the last hour"
                  response="I've detected 3 PPE violations in the last hour:
                    • Zone B-12: Worker without hard hat near crane operation (10:42 AM)
                    • Dock 4: Missing safety vest during truck unloading (10:55 AM)
                    • Zone A-7: Improper footwear in wet area (11:15 AM)"
                  actions={[
                    "🔴 Send Alert - Immediate notification to zone supervisors",
                    "📋 Generate Report - Detailed incident report with camera footage",
                    "🎯 Auto-Assign - Deploy safety officer to location",
                    "📹 View Live Feed - Open camera view of incident location"
                  ]}
                />
                <QuestionBlock
                  question="Which zones have the highest violation rates this week?"
                  response="Zone Analysis for Week 47:
                    1. Zone B (Loading): 18 violations - 45% increase from last week
                    2. Dock Area 3-5: 12 violations - mainly PPE compliance
                    3. Zone F (Cold Storage): 8 violations - temperature gear issues"
                  actions={[
                    "📊 Deep Dive Analysis - View detailed breakdown by violation type",
                    "🎓 Schedule Training - Auto-schedule safety refresher for high-risk zones",
                    "🚨 Implement Controls - Deploy additional safety measures",
                    "📈 Trend Report - Generate predictive analysis for next week"
                  ]}
                />
              </CardContent>
            </Card>

            {/* Labour Planner */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  👥 Labour Planner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <QuestionBlock
                  question="Is the evening shift adequately staffed for expected volume?"
                  response="Evening Shift Analysis (6PM-2AM):
                    • Current Staff: 47 workers
                    • Predicted Need: 52 workers (based on 3,200 expected packages)
                    • Gap: 5 workers short in Zones B and D
                    • Risk: 35-minute delay in outbound processing without intervention"
                  actions={[
                    "📞 Call Additional Staff - Auto-dial qualified workers from standby pool",
                    "🔄 Redistribute Teams - Optimize current staff allocation",
                    "⏰ Extend Shifts - Offer overtime to current shift (2 hours earlier)",
                    "🤖 Deploy Automation - Activate 3 additional AGVs for gap coverage"
                  ]}
                />
              </CardContent>
            </Card>

            {/* Dock Scheduler */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  🚚 Dock Scheduler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <QuestionBlock
                  question="How many trucks are currently waiting and what's the delay impact?"
                  response="Current Dock Status:
                    • 7 trucks in queue (average wait: 47 minutes)
                    • Dock 2: 2 trucks waiting (mechanical issue - crane down)
                    • Dock 4: 3 trucks waiting (understaffed)
                    • Dock 7: 2 trucks waiting (previous truck overtime)
                    • Estimated Delay Cost: $3,400 in detention charges"
                  actions={[
                    "🔄 Re-route Trucks - Optimize dock assignments",
                    "🔧 Emergency Repair - Dispatch maintenance to Dock 2",
                    "👥 Deploy Team - Move staff from Dock 5 (idle) to Dock 4",
                    "💰 Waive Charges - Auto-approve detention waiver for crane issue"
                  ]}
                />
              </CardContent>
            </Card>

            {/* Link to full guide */}
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground mb-4">
                  This is a preview of the reference guide. For the complete guide including RFP Response, 
                  Retail Compliance, and Advanced Scenarios...
                </p>
                <div className="text-center">
                  <Button 
                    onClick={() => window.open('/docs/agent-studio-reference-guide.md', '_blank')}
                  >
                    View Complete Reference Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

interface QuestionBlockProps {
  question: string
  response: string
  actions: string[]
}

function QuestionBlock({ question, response, actions }: QuestionBlockProps) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h4 className="font-semibold text-lg">{question}</h4>
      <div className="bg-muted/50 rounded p-3">
        <p className="whitespace-pre-line text-sm">{response}</p>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Available Actions:</p>
        <ul className="space-y-1">
          {actions.map((action, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              {action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 