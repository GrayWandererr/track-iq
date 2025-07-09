import { mockAgents, Agent } from '@/mock/agents'
import { mockConnectors, Connector } from '@/mock/connectors'

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function mockGet(path: string): Promise<any> {
  await delay(100 + Math.random() * 200) // 100-300ms delay

  if (path.startsWith('/agents')) {
    if (path === '/agents') {
      return { data: mockAgents }
    }
    
    // Check for logs endpoint first
    if (path.includes('/logs')) {
      const agentId = path.split('/')[2]
      return {
        data: generateMockLogs(agentId)
      }
    }
    
    const agentId = path.split('/')[2]
    const agent = mockAgents.find(a => a.id === agentId)
    
    if (agent) {
      return { data: agent }
    }
    
    throw new Error(`Agent ${agentId} not found`)
  }

  if (path.startsWith('/connectors')) {
    if (path === '/connectors') {
      return { data: mockConnectors }
    }
    
    const connectorId = path.split('/')[2]
    const connector = mockConnectors.find(c => c.id === connectorId)
    
    if (connector) {
      return { data: connector }
    }
    
    throw new Error(`Connector ${connectorId} not found`)
  }

  if (path.startsWith('/flows/')) {
    const flowId = path.split('/')[2]
    try {
      const flowModule = await import(`@/mock/flows/${flowId}.json`)
      return { data: flowModule.default }
    } catch (error) {
      throw new Error(`Flow ${flowId} not found`)
    }
  }



  throw new Error(`Unknown path: ${path}`)
}

export async function mockPatch(path: string, body: any): Promise<any> {
  await delay(150 + Math.random() * 250) // 150-400ms delay

  if (path.startsWith('/agents/')) {
    const agentId = path.split('/')[2]
    const agentIndex = mockAgents.findIndex(a => a.id === agentId)
    
    if (agentIndex === -1) {
      throw new Error(`Agent ${agentId} not found`)
    }

    // Update the agent in mock data
    mockAgents[agentIndex] = { ...mockAgents[agentIndex], ...body }
    
    return { 
      data: mockAgents[agentIndex],
      message: 'Agent updated successfully'
    }
  }

  if (path.startsWith('/connectors/')) {
    const connectorId = path.split('/')[2]
    const connectorIndex = mockConnectors.findIndex(c => c.id === connectorId)
    
    if (connectorIndex === -1) {
      throw new Error(`Connector ${connectorId} not found`)
    }

    // Update the connector in mock data
    mockConnectors[connectorIndex] = { ...mockConnectors[connectorIndex], ...body }
    
    return { 
      data: mockConnectors[connectorIndex],
      message: 'Connector updated successfully'
    }
  }

  throw new Error(`Unknown path: ${path}`)
}

export async function mockPost(path: string, body: any): Promise<any> {
  await delay(200 + Math.random() * 300) // 200-500ms delay

  if (path === '/chat') {
    return handleChatMessage(body.message)
  }

  if (path.startsWith('/agents/') && path.includes('/action')) {
    const agentId = path.split('/')[2]
    const action = body.action
    
    return handleAgentAction(agentId, action)
  }

  throw new Error(`Unknown path: ${path}`)
}

function handleChatMessage(message: string): any {
  const lowerMessage = message.toLowerCase()
  
  // Safety Agent responses
  if (lowerMessage.includes('ppe') || lowerMessage.includes('safety') || lowerMessage.includes('violations') || lowerMessage.includes('accident') || lowerMessage.includes('incident') || lowerMessage.includes('hazard')) {
    if (lowerMessage.includes('last hour') || lowerMessage.includes('recent') || lowerMessage.includes('violations in')) {
      return {
        data: {
          response: `I've detected 3 PPE violations in the last hour:

• Zone B-12: Worker without hard hat near crane operation (10:42 AM)
• Dock 4: Missing safety vest during truck unloading (10:55 AM)  
• Zone A-7: Improper footwear in wet area (11:15 AM)`,
          handledBy: "Safety Agent",
          agentId: "safety",
          actions: [
            { type: "alert", label: "Send Alert", description: "Immediate notification to zone supervisors" },
            { type: "report", label: "Generate Report", description: "Detailed incident report with camera footage" },
            { type: "assign", label: "Auto-Assign", description: "Deploy safety officer to location" },
            { type: "view", label: "View Live Feed", description: "Open camera view of incident location" }
          ]
        }
      }
    } else if (lowerMessage.includes('predict') || lowerMessage.includes('tomorrow')) {
      return {
        data: {
          response: `Risk Assessment for Tomorrow (Nov 24):

**High Risk Areas:**
• Dock 2-3 during 6AM shift change (based on fatigue patterns)
• Zone C forklift operations (new operator scheduled)

**Weather Alert:** Rain expected - slip hazards in outdoor loading areas`,
          handledBy: "Safety Agent",
          agentId: "safety",
          actions: [
            { type: "preventive", label: "Preventive Measures", description: "Deploy anti-slip mats and additional signage" },
            { type: "staff", label: "Staff Adjustment", description: "Recommend experienced buddy for new operator" },
            { type: "alerts", label: "Pre-Shift Alerts", description: "Send safety reminders to all workers" },
            { type: "workflow", label: "Adjust Workflow", description: "Modify operations to minimize risk" }
          ]
        }
      }
    }
    
    return {
      data: {
        response: `Zone Analysis for Week 47:

1. **Zone B (Loading):** 18 violations - 45% increase from last week
2. **Dock Area 3-5:** 12 violations - mainly PPE compliance
3. **Zone F (Cold Storage):** 8 violations - temperature gear issues`,
        handledBy: "Safety Agent",
        agentId: "safety",
        actions: [
          { type: "analysis", label: "Deep Dive Analysis", description: "View detailed breakdown by violation type" },
          { type: "training", label: "Schedule Training", description: "Auto-schedule safety refresher for high-risk zones" },
          { type: "controls", label: "Implement Controls", description: "Deploy additional safety measures" },
          { type: "trend", label: "Trend Report", description: "Generate predictive analysis for next week" }
        ]
      }
    }
  }
  
  // Labour Planner responses
  if (lowerMessage.includes('staff') || lowerMessage.includes('labour') || lowerMessage.includes('labor') || lowerMessage.includes('shift') || lowerMessage.includes('worker')) {
    if (lowerMessage.includes('evening') || lowerMessage.includes('adequately') || lowerMessage.includes('tonight')) {
      return {
        data: {
          response: `Evening Shift Analysis (6PM-2AM):

• **Current Staff:** 47 workers
• **Predicted Need:** 52 workers (based on 3,200 expected packages)
• **Gap:** 5 workers short in Zones B and D
• **Risk:** 35-minute delay in outbound processing without intervention`,
          handledBy: "Labour Planner",
          agentId: "labour",
          actions: [
            { type: "call", label: "Call Additional Staff", description: "Auto-dial qualified workers from standby pool" },
            { type: "redistribute", label: "Redistribute Teams", description: "Optimize current staff allocation" },
            { type: "extend", label: "Extend Shifts", description: "Offer overtime to current shift (2 hours earlier)" },
            { type: "automation", label: "Deploy Automation", description: "Activate 3 additional AGVs for gap coverage" }
          ]
        }
      }
    } else if (lowerMessage.includes('overtime')) {
      return {
        data: {
          response: `Overtime Alert - 8 workers approaching weekly limits:

• John Smith: 38.5 hours (1.5 hours remaining)
• Maria Garcia: 39 hours (1 hour remaining)
• Robert Chen: 38 hours (2 hours remaining)
• Sarah Johnson: 37.5 hours (2.5 hours remaining)
• ... (4 more workers listed)`,
          handledBy: "Labour Planner",
          agentId: "labour",
          actions: [
            { type: "schedule", label: "Auto-Schedule", description: "System suggests replacement workers" },
            { type: "cost", label: "Cost Analysis", description: "View overtime cost vs. bringing in new staff" },
            { type: "approve", label: "Approve Overtime", description: "Authorize with business justification" },
            { type: "plan", label: "Plan Next Week", description: "Adjust next week's schedule to balance hours" }
          ]
        }
      }
    }
    
    return {
      data: {
        response: `Team Productivity Analysis:

• **Team A (Picking):** 98% efficiency - Best Practice
• **Team B (Packing):** 76% efficiency - Below target
• **Team C (Loading):** 82% efficiency - Bottleneck identified
• **Root Cause:** Team B lacks experienced packers`,
        handledBy: "Labour Planner",
        agentId: "labour",
        actions: [
          { type: "rotate", label: "Rotate Staff", description: "Move 2 experienced packers to Team B" },
          { type: "training", label: "Training Module", description: "Assign specific skills training" },
          { type: "incentive", label: "Incentive Program", description: "Implement performance bonuses" },
          { type: "dashboard", label: "Real-time Dashboard", description: "Display team metrics on floor" }
        ]
      }
    }
  }
  
  // RFP Response Agent - Check early to catch business-related questions
  if (lowerMessage.includes('rfp') || 
      lowerMessage.includes('proposal') || 
      lowerMessage.includes('executive summary') || 
      lowerMessage.includes('logistics rfp') ||
      lowerMessage.includes('win rate') ||
      lowerMessage.includes('losing') ||
      lowerMessage.includes('lost') ||
      lowerMessage.includes('quarter') && (lowerMessage.includes('win') || lowerMessage.includes('loss')) ||
      lowerMessage.includes('deal') ||
      lowerMessage.includes('bid') ||
      lowerMessage.includes('contract')) {
    
    if (lowerMessage.includes('win rate') || lowerMessage.includes('losing') || lowerMessage.includes('why are we')) {
      return {
        data: {
          response: `Q3 2024 Win/Loss Analysis:

• **Win Rate:** 34% (17 wins out of 50 RFPs)
• **Average Deal Size:** $2.3M (down from $3.1M in Q2)
• **Total Pipeline:** $115M

**Top Reasons for Losses:**
1. **Price:** Lost 8 deals (24%) - Competitors undercut by 15-20%
2. **Technology:** Lost 7 deals (21%) - Lack of real-time tracking API
3. **Geographic Coverage:** Lost 6 deals (18%) - Gaps in Southeast region
4. **Response Time:** Lost 5 deals (15%) - Averaged 12 days vs 7 day standard

**Competitive Analysis:**
• Lost 11 deals to Competitor A (newer tech stack)
• Lost 7 deals to Competitor B (aggressive pricing)
• Lost 5 deals to incumbent providers`,
          handledBy: "RFP Response Agent",
          agentId: "rfp",
          actions: [
            { type: "detailed", label: "Detailed Analysis", description: "View deal-by-deal breakdown with specific feedback" },
            { type: "strategy", label: "Win Strategy", description: "Generate improvement recommendations" },
            { type: "comparison", label: "Competitor Intel", description: "Deep dive on competitor advantages" },
            { type: "forecast", label: "Q4 Forecast", description: "Predict next quarter based on improvements" }
          ]
        }
      }
    }
    
    return {
      data: {
        response: `Executive Summary Generated:

• **Client:** Major Retail Chain (500 stores)
• **Scope:** Last-mile delivery optimization
• **Our Advantages:** 47 facilities within 50 miles of stores
• **Win Probability:** 73% (based on similar wins)
• **Recommended Price:** $4.7M (15% margin)`,
        handledBy: "RFP Response Agent",
        agentId: "rfp",
        actions: [
          { type: "proposal", label: "Full Proposal", description: "Generate complete 40-page response" },
          { type: "pricing", label: "Pricing Models", description: "Run different scenarios" },
          { type: "analysis", label: "Win/Loss Analysis", description: "Compare to past proposals" },
          { type: "team", label: "Assign Team", description: "Auto-populate expertise matrix" }
        ]
      }
    }
  }
  
  // Dock Scheduler responses
  if (lowerMessage.includes('dock') || lowerMessage.includes('truck') || lowerMessage.includes('waiting') || lowerMessage.includes('queue') || lowerMessage.includes('loading') || lowerMessage.includes('unloading')) {
    return {
      data: {
        response: `Current Dock Status:

• **7 trucks in queue** (average wait: 47 minutes)
• **Dock 2:** 2 trucks waiting (mechanical issue - crane down)
• **Dock 4:** 3 trucks waiting (understaffed)
• **Dock 7:** 2 trucks waiting (previous truck overtime)
• **Estimated Delay Cost:** $3,400 in detention charges`,
        handledBy: "Dock Scheduler",
        agentId: "dock",
        actions: [
          { type: "reroute", label: "Re-route Trucks", description: "Optimize dock assignments" },
          { type: "repair", label: "Emergency Repair", description: "Dispatch maintenance to Dock 2" },
          { type: "deploy", label: "Deploy Team", description: "Move staff from Dock 5 (idle) to Dock 4" },
          { type: "waive", label: "Waive Charges", description: "Auto-approve detention waiver for crane issue" }
        ]
      }
    }
  }
  
  // Retail Compliance responses
  if (lowerMessage.includes('compliance') || lowerMessage.includes('violation') || lowerMessage.includes('regulations') ||
      lowerMessage.includes('gs1') || lowerMessage.includes('label') || lowerMessage.includes('audit') ||
      lowerMessage.includes('checklist') || lowerMessage.includes('ab-701')) {
    
    if (lowerMessage.includes('gs1') || lowerMessage.includes('label error')) {
      return {
        data: {
          response: `GS1 Label Errors - Week 47 Summary:

**By Retailer:**
• **Walmart:** 12 errors (67% barcode quality, 33% missing data)
• **Target:** 5 errors (80% incorrect format, 20% placement)
• **Amazon:** 0 errors (100% compliance)
• **Kroger:** 3 errors (all dimension mismatches)
• **Home Depot:** 7 errors (product ID formatting)

**Error Categories:**
1. **Barcode Quality:** 11 instances - print density below 80%
2. **Data Fields:** 8 instances - missing batch/lot numbers
3. **Label Placement:** 4 instances - wrong carton face
4. **Format Issues:** 4 instances - using GS1-128 instead of DataMatrix

**Cost Impact:** $4,200 in chargebacks this week`,
          handledBy: "Retail Compliance Agent",
          agentId: "retail",
          actions: [
            { type: "download", label: "Download Error Images", description: "ZIP file with all non-compliant label photos" },
            { type: "training", label: "Schedule Training", description: "Book GS1 compliance workshop for warehouse staff" },
            { type: "autofix", label: "Auto-Fix Templates", description: "Update label templates to prevent future errors" },
            { type: "report", label: "Retailer Report", description: "Generate detailed report for each retailer" }
          ]
        }
      }
    } else if (lowerMessage.includes('regulatory audit') || lowerMessage.includes('audit probability')) {
      return {
        data: {
          response: `Q1 2025 Regulatory Audit Risk Forecast:

**Distribution Center Risk Scores:**

| DC Location | OSHA Risk | EPA Risk | State Labor | Overall Risk |
|-------------|-----------|----------|-------------|--------------|
| CA-LAX-01   | 🔴 92%    | 🟡 65%   | 🔴 88%      | **HIGH**     |
| TX-DFW-03   | 🟡 71%    | 🟢 32%   | 🟡 68%      | **MEDIUM**   |
| IL-ORD-02   | 🟢 45%    | 🟡 58%   | 🟢 41%      | **LOW**      |
| NJ-EWR-01   | 🔴 85%    | 🟢 38%   | 🔴 91%      | **HIGH**     |
| GA-ATL-04   | 🟡 62%    | 🟢 29%   | 🟡 55%      | **MEDIUM**   |

**Key Risk Drivers:**
• CA/NJ sites: Recent injury rates above industry average
• LAX: 3 missed OSHA inspections in past 18 months
• EWR: Outstanding overtime violations from Q3

**Predicted Audit Timeline:** OSHA likely to visit CA-LAX-01 by February 2025`,
          handledBy: "Retail Compliance Agent",
          agentId: "retail",
          actions: [
            { type: "prep", label: "Generate Audit Prep Kit", description: "Complete checklist and documentation package" },
            { type: "simulate", label: "Run Mock Audit", description: "Schedule internal audit simulation" },
            { type: "remediate", label: "Fix Critical Issues", description: "Prioritized action plan for high-risk items" },
            { type: "insurance", label: "Review Coverage", description: "Audit insurance and liability assessment" }
          ]
        }
      }
    } else if (lowerMessage.includes('checklist') || lowerMessage.includes('ab-701')) {
      return {
        data: {
          response: `CA AB-701 Compliance Checklist - Shift Change Reporting:

**Required Documentation:**
☑️ 1. **Productivity Quotas** - Document all performance standards
   • Pick rates: 180 units/hour (current)
   • Pack rates: 45 packages/hour
   • Load rates: 2 trucks/hour

☑️ 2. **Work Speed Data** - Track and report individual metrics
   • Real-time monitoring dashboards deployed
   • 30-day rolling averages calculated

☑️ 3. **Break Time Compliance** - Ensure mandated breaks
   • 10-min break per 4 hours (automated alerts)
   • 30-min meal break per 5 hours (system enforced)

☑️ 4. **Injury Correlation Reports** - Monthly analysis required
   • Link productivity data to injury reports
   • Submit to Cal/OSHA within 30 days

☑️ 5. **Worker Notifications** - Written notice requirements
   • Quota descriptions in English + Spanish
   • Posted at all workstations

☑️ 6. **Disciplinary Action Records** - Document all actions
   • Cannot discipline for safety-related slowdowns
   • Maintain 3-year record retention

☑️ 7. **Algorithm Disclosure** - Explain automated decisions
   • Document how AI/ML affects worker evaluation
   • Provide upon request within 21 days

☑️ 8. **Third-Party Audit Trail** - Maintain for inspections
   • All reports exportable to CSV/PDF
   • API access for state regulators`,
          handledBy: "Retail Compliance Agent",
          agentId: "retail",
          actions: [
            { type: "autorun", label: "Schedule Auto-Run", description: "Set daily compliance report generation" },
            { type: "template", label: "Download Templates", description: "Get all required forms and notices" },
            { type: "integrate", label: "Link to Labor System", description: "Connect to workforce management for auto-reporting" },
            { type: "train", label: "Manager Training", description: "Book AB-701 compliance workshop" }
          ]
        }
      }
    }
    
    return {
      data: {
        response: `Compliance Alert - 4 locations with violations:

1. **CA-LAX-01:** Fire exit blocked (Critical - 24hr fix required)
2. **TX-DFW-03:** Expired forklift certifications (7 operators)
3. **IL-ORD-02:** Missing hazmat placards (OSHA requirement)
4. **NJ-EWR-01:** Overtime violations (State labor law)

**Total Risk Exposure:** $340,000 in potential fines`,
        handledBy: "Retail Compliance Agent",
        agentId: "retail",
        actions: [
          { type: "fix", label: "Fix Critical", description: "Dispatch immediate corrections" },
          { type: "plan", label: "Generate Plans", description: "Create remediation schedules" },
          { type: "notify", label: "Notify Teams", description: "Alert site managers" },
          { type: "track", label: "Track Progress", description: "Real-time compliance dashboard" }
        ]
      }
    }
  }
  
  // Cross-functional questions - Check before default response
  if (lowerMessage.includes('overall health') || lowerMessage.includes('operations') || lowerMessage.includes('health of operations') || 
      lowerMessage.includes('status') && lowerMessage.includes('operation') ||
      lowerMessage.includes('inbound volume') || lowerMessage.includes('break first') ||
      lowerMessage.includes('exec dashboard') || lowerMessage.includes('executive dashboard') ||
      lowerMessage.includes('investor slide') || lowerMessage.includes('ai savings') ||
      lowerMessage.includes('rule change') || lowerMessage.includes('cost us most')) {
    
    if (lowerMessage.includes('inbound volume') || lowerMessage.includes('25%') || lowerMessage.includes('break first')) {
      return {
        data: {
          response: `Surge Analysis: 25% Inbound Volume Increase Impact

**Critical Bottlenecks (in order):**

1. **Receiving Docks (breaks in 2.5 hours)**
   • Current: 85% utilized
   • Surge: 106% - OVER CAPACITY
   • Impact: 12 trucks backing up

2. **Unloading Labor (breaks in 3 hours)**
   • Current: 47 workers
   • Need: 59 workers (+12)
   • Gap: Cannot fill from current shift

3. **Staging Area (breaks in 4 hours)**
   • Current: 72% floor space
   • Surge: 90% - CRITICAL
   • Risk: Congestion blocking flow

4. **Put-away Equipment (breaks in 5 hours)**
   • Current: 18/22 forklifts active
   • Need: All 22 + 3 rentals
   • Issue: Only 20 certified operators

**Safety Risks:**
• Dock congestion increases injury risk 3.2x
• Rushed unloading = 45% more accidents
• Forklift traffic jams in aisles

**Cascading Delays:**
• Outbound shipments delayed 2-4 hours
• Next shift starts with 30% backlog`,
          handledBy: "Master Agent",
          agentId: "master",
          actions: [
            { type: "surge", label: "Create Surge Plan", description: "Generate immediate action plan with assignments" },
            { type: "simulate", label: "Run Full Simulation", description: "Model exact breaking points with current staff" },
            { type: "callout", label: "Emergency Staffing", description: "Auto-call qualified workers for overtime" },
            { type: "optimize", label: "Optimize Flow", description: "Reroute processes to maximize throughput" }
          ]
        }
      }
    } else if (lowerMessage.includes('exec dashboard') || lowerMessage.includes('executive dashboard')) {
      return {
        data: {
          response: `Executive Dashboard - ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

**Operational Summary**

📊 **Key Metrics:**
• Overall Efficiency: 87.2% ↓ 2.1%
• On-Time Shipments: 94.5% ↑ 0.8%
• Cost per Unit: $3.47 ↓ $0.12

🚚 **Dock Operations:**
• Trucks Processed: 147/160 scheduled
• Avg Wait Time: 42 min (target: 30)
• Detention Charges: $8,400 MTD

👷 **Labor Performance:**
• Utilization: 91% (489/537 workers)
• Overtime: 8.2% of hours
• Productivity: 104% of standard

⚠️ **Safety Status:**
• Days Without Incident: 7
• Near Misses Today: 2
• PPE Compliance: 96.5%

**Critical Issues:**
1. Dock 2 crane down - 6 trucks diverted
2. 12 workers approaching overtime limits
3. Zone B congestion creating safety risk

**AI-Driven Optimizations:**
• Saved $24K today via dynamic scheduling
• Prevented 3 safety incidents via alerts
• Reduced dock wait by 18 min average`,
          handledBy: "Master Agent",
          agentId: "master",
          actions: [
            { type: "export", label: "Export Dashboard", description: "Download as PDF or PowerBI report" },
            { type: "details", label: "Drill Into Metrics", description: "Get detailed breakdowns by area" },
            { type: "share", label: "Share with Team", description: "Email to executive distribution list" },
            { type: "schedule", label: "Schedule Daily", description: "Auto-generate and send at 6 AM" }
          ]
        }
      }
    } else if (lowerMessage.includes('investor slide') || lowerMessage.includes('ai savings')) {
      return {
        data: {
          response: `Q3 2024 AI Impact - Investor Presentation

**Slide: "AI-Driven Operational Excellence"**

💰 **Financial Impact:**
• Total Savings: $3.2M (14% above target)
• ROI on AI Investment: 287%
• Payback Period: 4.2 months

📈 **Efficiency Gains:**
• Labor Optimization: $1.4M
  - 18% reduction in overtime
  - 12% improvement in productivity
• Dock Scheduling: $890K
  - 34% reduction in detention fees
  - 22 min avg wait time improvement
• Safety Prevention: $620K
  - 67% reduction in incidents
  - $450K avoided OSHA fines
• Inventory Accuracy: $290K
  - 99.7% location accuracy
  - 41% reduction in search time

🎯 **Competitive Advantages:**
• 2.3x faster RFP responses
• 47% win rate improvement
• 96% customer satisfaction

🚀 **Q4 Projections:**
• Additional $1.1M savings expected
• Full autonomous dock scheduling
• Predictive maintenance rollout`,
          handledBy: "Master Agent + RFP Response Agent",
          agentId: "master",
          actions: [
            { type: "download", label: "Download PPTX", description: "Formatted slide deck with animations" },
            { type: "customize", label: "Customize Metrics", description: "Select specific KPIs to highlight" },
            { type: "notes", label: "Add Speaker Notes", description: "Include detailed talking points" },
            { type: "appendix", label: "Generate Appendix", description: "Add supporting data slides" }
          ]
        }
      }
    } else if (lowerMessage.includes('rule change') || lowerMessage.includes('cost us most')) {
      return {
        data: {
          response: `2025 Regulatory Impact Analysis

**Highest Cost Rule Changes:**

1. **CA SB-1230: Warehouse Worker Heat Protection**
   • Cost Impact: $2.4M annually
   • Effective: July 1, 2025
   • Requirements: AC in all zones, hourly breaks above 85°F
   • Affected Sites: 3 CA facilities

2. **Federal: OSHA Ergonomics Standard Update**
   • Cost Impact: $1.8M annually
   • Effective: April 1, 2025
   • Requirements: Automated lift assists for >35 lbs
   • Affected Sites: All 12 facilities

3. **EPA: Stricter Forklift Emissions**
   • Cost Impact: $1.2M one-time
   • Effective: January 1, 2025
   • Requirements: Replace 40% of propane fleet
   • Affected Sites: 8 older facilities

4. **DOT: ELD Mandate for Yard Trucks**
   • Cost Impact: $450K + $180K/year
   • Effective: March 1, 2025
   • Requirements: Electronic logging for all yard moves
   • Affected Sites: All facilities

**Total 2025 Impact:** $4.9M recurring + $1.65M one-time
**Labor Agreement Risk:** Additional $2.1M if Teamsters pattern spreads`,
          handledBy: "Retail Compliance Agent + Labour Planner",
          agentId: "master",
          actions: [
            { type: "model", label: "Cost Model", description: "Detailed breakdown by facility and timeline" },
            { type: "mitigate", label: "Mitigation Plan", description: "Strategies to reduce compliance costs" },
            { type: "calendar", label: "Implementation Timeline", description: "Gantt chart of all requirements" },
            { type: "brief", label: "Legal Brief", description: "Full analysis from compliance team" }
          ]
        }
      }
    }
    
    return {
      data: {
        response: `Operations Dashboard - Real-time Status:

• **Overall Efficiency:** 87% (Target: 90%)
• **Safety:** 2 minor incidents today (within threshold)
• **Productivity:** 94% (exceeding target)
• **Dock Utilization:** 78% (3 docks maintenance)
• **Staff Availability:** 96% (8 call-outs)
• **System Health:** All systems operational`,
        handledBy: "Master Agent",
        agentId: "master",
        actions: [
          { type: "detail", label: "Detailed View", description: "Drill into any metric" },
          { type: "optimize", label: "Optimization", description: "AI suggests improvements" },
          { type: "report", label: "Status Report", description: "Generate executive summary" },
          { type: "actions", label: "Action Items", description: "Prioritized improvement list" }
        ]
      }
    }
  }
  
  // Default response
  return {
    data: {
      response: `I'm analyzing your request across all operational systems. Here's what I found:

• **Safety Systems:** All zones monitoring active
• **Labor Management:** Current capacity at 92%
• **Dock Operations:** 12 trucks scheduled today
• **Compliance Status:** 2 minor issues flagged

Would you like me to dive deeper into any specific area? I can coordinate with our specialist agents for detailed analysis.`,
      handledBy: "Master Agent",
      agentId: "master",
      actions: [
        { type: "dive", label: "Deep Dive", description: "Select an area for detailed analysis" },
        { type: "report", label: "Full Report", description: "Generate comprehensive dashboard" },
        { type: "agents", label: "Agent Status", description: "View all agent performance" },
        { type: "settings", label: "Alert Settings", description: "Configure notifications" }
      ]
    }
  }
}

function handleAgentAction(agentId: string, action: string): any {
  switch (action) {
    case 'pause':
      return {
        data: { status: 'stopped' },
        message: `${agentId} agent paused successfully`
      }
    case 'resume':
      return {
        data: { status: 'running' },
        message: `${agentId} agent resumed successfully`
      }
    case 'fix':
      return {
        data: { status: 'running' },
        message: `${agentId} agent issues resolved`
      }
    default:
      throw new Error(`Unknown action: ${action}`)
  }
}

function generateMockLogs(agentId: string): any[] {
  const baseTime = new Date()
  const logs = []
  
  for (let i = 0; i < 15; i++) {
    const time = new Date(baseTime.getTime() - (i * 30 * 60 * 1000)) // 30 min intervals
    logs.push({
      id: `log-${i}`,
      timestamp: time.toISOString(),
      level: ['info', 'warning', 'error'][Math.floor(Math.random() * 3)],
      message: generateLogMessage(agentId, i),
      details: `Processed ${Math.floor(Math.random() * 100)} items`
    })
  }
  
  return logs
}

function generateLogMessage(agentId: string, index: number): string {
  const messages: Record<string, string[]> = {
    safety: [
      'PPE compliance check completed',
      'Zone congestion alert cleared',
      'Safety protocol updated',
      'Camera feed analysis complete'
    ],
    labour: [
      'Shift schedule optimized',
      'Staff utilization calculated',
      'Break schedule updated',
      'Overtime alert generated'
    ],
    dock: [
      'Truck assigned to dock',
      'Dock schedule updated',
      'Priority queue processed',
      'Loading completion confirmed'
    ],
    rfp: [
      'RFP template matched',
      'Pricing calculation completed',
      'Draft proposal generated',
      'Compliance check passed'
    ],
    retail: [
      'Inventory compliance verified',
      'Temperature log reviewed',
      'Expiry date check completed',
      'Labeling audit finished'
    ]
  }
  
  const agentMessages = messages[agentId] || ['System event processed']
  return agentMessages[index % agentMessages.length]
} 