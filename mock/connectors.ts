export interface Connector {
  id: string
  name: string
  type: string
  status: 'healthy' | 'warning' | 'error'
  description: string
  endpoint?: string
  lastSync: string
  config: Record<string, any>
}

export const mockConnectors = [
  {
    id: "camera_feed",
    name: "Security Camera Feed",
    type: "video",
    status: "connected",
    lastSync: "Live streaming",
    icon: "Camera",
    endpoints: 128,
    dataFlow: "1.2TB/day"
  },
  {
    id: "manhattan",
    name: "Manhattan WMS",
    type: "database",
    status: "connected",
    lastSync: "5 seconds ago",
    icon: "Database",
    endpoints: 45,
    dataFlow: "850GB/day"
  },
  {
    id: "wms_api",
    name: "WMS API Gateway",
    type: "api",
    status: "connected",
    lastSync: "2 minutes ago",
    icon: "Code",
    endpoints: 72,
    dataFlow: "320GB/day"
  },
  {
    id: "sharepoint",
    name: "SharePoint",
    type: "document",
    status: "connected",
    lastSync: "1 hour ago",
    icon: "FileText",
    endpoints: 15,
    dataFlow: "45GB/day"
  },
  {
    id: "powerbi",
    name: "PowerBI",
    type: "analytics",
    status: "connected",
    lastSync: "Real-time",
    icon: "BarChart",
    endpoints: 25,
    dataFlow: "120GB/day"
  },
  {
    id: "snowflake",
    name: "Snowflake",
    type: "database",
    status: "connected",
    lastSync: "30 seconds ago",
    icon: "Database",
    endpoints: 50,
    dataFlow: "2.5TB/day"
  },
  {
    id: "slack",
    name: "Slack",
    type: "communication",
    status: "connected",
    lastSync: "Live",
    icon: "MessageSquare",
    endpoints: 8,
    dataFlow: "5GB/day"
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    type: "communication",
    status: "connected",
    lastSync: "Live",
    icon: "Users",
    endpoints: 12,
    dataFlow: "8GB/day"
  },
  {
    id: "outlook",
    name: "Outlook",
    type: "email",
    status: "connected",
    lastSync: "10 minutes ago",
    icon: "Mail",
    endpoints: 5,
    dataFlow: "2GB/day"
  },
  {
    id: "hubspot",
    name: "HubSpot",
    type: "crm",
    status: "connected",
    lastSync: "15 minutes ago",
    icon: "UserPlus",
    endpoints: 20,
    dataFlow: "10GB/day"
  },
  {
    id: "salesforce",
    name: "Salesforce",
    type: "crm",
    status: "connected",
    lastSync: "5 minutes ago",
    icon: "Cloud",
    endpoints: 35,
    dataFlow: "25GB/day"
  },
  {
    id: "ftp",
    name: "FTP Directory",
    type: "file",
    status: "connected",
    lastSync: "1 hour ago",
    icon: "FolderOpen",
    endpoints: 3,
    dataFlow: "100GB/day"
  },
  {
    id: "custom_api",
    name: "Custom API",
    type: "api",
    status: "disconnected",
    lastSync: "Not configured",
    icon: "Settings",
    endpoints: 0,
    dataFlow: "0GB/day"
  }
] 