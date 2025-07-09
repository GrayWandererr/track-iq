export interface Agent {
  id: string
  name: string
  status: 'running' | 'warning' | 'stopped'
  kpi: string
  description: string
  connectorIds: string[]
  config: Record<string, any>
  flow: string
  lastActivity: string
  details: string
  version: string
}

export const mockAgents: Agent[] = [
  {
    id: "safety",
    name: "Safety Agent",
    status: "running",
    kpi: "0 violations in last hour",
    description: "PPE & congestion alerts",
    connectorIds: ["camera_feed", "sharepoint"],
    config: {
      detectionThreshold: 0.8,
      alertChannels: ["slack", "email"],
      checkInterval: 30,
      ppeRequired: ["helmet", "vest", "gloves"],
      congestionLimit: 15
    },
    flow: "safety",
    lastActivity: "10:42 AM",
    details: "Monitoring warehouse safety protocols and PPE compliance across all zones.",
    version: "v2.1"
  },
  {
    id: "labour",
    name: "Labour Planner",
    status: "warning",
    kpi: "Shift understaffed at 6 pm",
    description: "Manhattan Scale + forecast",
    connectorIds: ["manhattan", "wms_api"],
    config: {
      targetUtilization: 85,
      shiftDuration: 8,
      breakTime: 30,
      overtimeThreshold: 40,
      forecastHorizon: 72
    },
    flow: "labour",
    lastActivity: "2:15 PM",
    details: "Analyzing staffing levels and optimizing shift schedules based on demand forecasts.",
    version: "v1.8"
  },
  {
    id: "dock",
    name: "Dock Scheduler",
    status: "stopped",
    kpi: "API credentials expired",
    description: "Automated dock assignment",
    connectorIds: ["wms_api", "manhattan"],
    config: {
      maxWaitTime: 45,
      dockCapacity: 12,
      priorityRules: ["express", "temperature_controlled", "oversized"],
      scheduleBuffer: 15
    },
    flow: "dock",
    lastActivity: "Yesterday",
    details: "Managing dock door assignments and truck scheduling optimization.",
    version: "v3.0"
  },
  {
    id: "rfp",
    name: "RFP Response",
    status: "running",
    kpi: "14 drafts in queue",
    description: "Proposal automation",
    connectorIds: ["sharepoint", "wms_api"],
    config: {
      responseTime: 24,
      templateVersion: "2024_Q1",
      autoApprovalLimit: 50000,
      requiredSections: ["pricing", "capacity", "timeline", "compliance"]
    },
    flow: "rfp",
    lastActivity: "5 minutes ago",
    details: "Generating and managing RFP responses with pricing and capacity analysis.",
    version: "v1.5"
  },
  {
    id: "retail",
    name: "Retail Compliance",
    status: "running",
    kpi: "2 rule violations today",
    description: "Regulatory monitoring",
    connectorIds: ["wms_api", "sharepoint"],
    config: {
      complianceRules: ["temperature", "expiry", "labeling", "storage"],
      alertSeverity: "medium",
      reportFrequency: "daily",
      auditTrail: true
    },
    flow: "retail",
    lastActivity: "1:30 PM",
    details: "Ensuring compliance with retail partner requirements and industry regulations.",
    version: "v2.0"
  }
] 