"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MasterChat } from "@/components/MasterChat"
import { AgentCard } from "@/components/AgentCard"
import { JsonForm } from "@/components/JsonForm"
import { LogicCanvas } from "@/components/LogicCanvas"
import { StatusChip } from "@/components/StatusChip"
import { useAgentStore } from "@/store/useAgentStore"
import { useToast } from "@/components/ui/use-toast"
import { Agent } from "@/mock/agents"
import { mockGet } from "@/lib/mockRouter"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { 
  Activity,
  Settings,
  GitBranch,
  FileText,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  Expand,
  HelpCircle,
  Presentation
} from "lucide-react"
import Link from "next/link"

interface AgentStudioProps {
  className?: string
}

interface LogEntry {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error'
  message: string
  details: string
}

export default function AgentStudio({ className }: AgentStudioProps) {
  const router = useRouter()
  const { agents, loadAgents, updateAgent, toggleAgentStatus } = useAgentStore()
  const { toast } = useToast()
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [kpiValues, setKpiValues] = useState<Record<string, string>>({})

  useEffect(() => {
    loadAgents()
  }, [loadAgents])

  // Animate KPI values every 15 seconds
  useEffect(() => {
    const animateKPIs = () => {
      const newValues: Record<string, string> = {}
      agents.forEach(agent => {
        switch (agent.id) {
          case 'safety':
            newValues[agent.id] = `${Math.floor(Math.random() * 3)} violations in last hour`
            break
          case 'labour':
            newValues[agent.id] = Math.random() > 0.7 ? 'Shift understaffed at 6 pm' : 'Optimal staffing levels'
            break
          case 'dock':
            newValues[agent.id] = agent.status === 'stopped' ? 'API credentials expired' : `${Math.floor(Math.random() * 5)} trucks in queue`
            break
          case 'rfp':
            newValues[agent.id] = `${Math.floor(Math.random() * 20) + 5} drafts in queue`
            break
          case 'retail':
            newValues[agent.id] = `${Math.floor(Math.random() * 5)} rule violations today`
            break
        }
      })
      setKpiValues(newValues)
    }

    animateKPIs()
    const interval = setInterval(animateKPIs, 15000)
    return () => clearInterval(interval)
  }, [agents])

  const handleOpenAgent = (agent: Agent) => {
    setSelectedAgent(agent)
    setIsDrawerOpen(true)
    loadAgentLogs(agent.id)
  }

  const handleAgentAction = async (agentId: string, action: 'pause' | 'resume' | 'fix') => {
    try {
      await toggleAgentStatus(agentId)
      
      const actionMap = {
        pause: 'paused',
        resume: 'resumed',
        fix: 'fixed'
      }
      
      toast({
        title: `Agent ${actionMap[action]}`,
        description: `${agentId} agent has been ${actionMap[action]} successfully.`,
      })
    } catch (error) {
      toast({
        title: "Action Failed",
        description: "Could not perform the action. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleConfigSave = async (config: Record<string, any>) => {
    if (!selectedAgent) return
    
    try {
      await updateAgent(selectedAgent.id, { config })
      setSelectedAgent(prev => prev ? { ...prev, config } : null)
      toast({
        title: "Configuration Saved",
        description: "Agent configuration has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Could not save configuration. Please try again.",
        variant: "destructive"
      })
    }
  }

  const loadAgentLogs = async (agentId: string) => {
    try {
      const response = await mockGet(`/agents/${agentId}/logs`)
      setLogs(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.error('Failed to load logs:', error)
      setLogs([])
    }
  }

  const generateMockKPIs = (agent: Agent) => {
    const baseMetrics = [
      { label: "Uptime", value: "99.2%", trend: "up" },
      { label: "Avg Response", value: "1.2s", trend: "stable" },
      { label: "Events/Hour", value: Math.floor(Math.random() * 100 + 50).toString(), trend: "up" }
    ]
    
    switch (agent.id) {
      case 'safety':
        return [
          ...baseMetrics,
          { label: "PPE Compliance", value: "98%", trend: "up" },
          { label: "Zone Alerts", value: "2", trend: "down" }
        ]
      case 'labour':
        return [
          ...baseMetrics,
          { label: "Staff Utilization", value: "85%", trend: "stable" },
          { label: "Overtime Hours", value: "12", trend: "down" }
        ]
      default:
        return baseMetrics
    }
  }

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-400" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
      default:
        return <Info className="h-4 w-4 text-blue-400" />
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Master Chat */}
      <MasterChat />
      
      <Separator />
      
      {/* Agent Gallery */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Agent Gallery</h2>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/reference-guide">
                <FileText className="h-4 w-4 mr-2" />
                Reference Guide
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/demo-script">
                <Presentation className="h-4 w-4 mr-2" />
                Demo Script
              </Link>
            </Button>
            <Badge variant="secondary" className="px-3 py-1">
              <Activity className="h-3 w-3 mr-1" />
              Live Operations
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={{
                ...agent,
                kpi: kpiValues[agent.id] || agent.kpi
              }}
              onOpen={handleOpenAgent}
              onAction={handleAgentAction}
            />
          ))}
        </div>
      </div>

      {/* Agent Detail Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          {selectedAgent && (
            <>
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <SheetTitle className="flex items-center gap-2">
                    {selectedAgent.name}
                    <StatusChip status={selectedAgent.status} />
                  </SheetTitle>
                  <Badge variant="outline">{selectedAgent.version}</Badge>
                </div>
                <p className="text-sm text-muted-foreground text-left">
                  {selectedAgent.details}
                </p>
              </SheetHeader>

              <Tabs defaultValue="overview" className="mt-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="config">Config</TabsTrigger>
                  <TabsTrigger value="logic">Logic</TabsTrigger>
                  <TabsTrigger value="logs">Logs</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Key Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {generateMockKPIs(selectedAgent).map((metric, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{metric.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{metric.value}</span>
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              metric.trend === 'up' ? 'bg-green-400' :
                              metric.trend === 'down' ? 'bg-red-400' : 'bg-yellow-400'
                            )} />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Recent Events
                      </CardTitle>
                    </CardHeader>
                                         <CardContent>
                       <div className="space-y-2">
                         {(Array.isArray(logs) ? logs : []).slice(0, 5).map((log) => (
                           <div key={log.id} className="flex items-start gap-2 text-sm">
                             {getLogIcon(log.level)}
                             <div className="flex-1">
                               <p>{log.message}</p>
                               <p className="text-xs text-muted-foreground">
                                 {new Date(log.timestamp).toLocaleTimeString()}
                               </p>
                             </div>
                           </div>
                         ))}
                       </div>
                     </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="config">
                  <JsonForm
                    data={selectedAgent.config}
                    onSubmit={handleConfigSave}
                    title="Agent Configuration"
                  />
                </TabsContent>

                <TabsContent value="logic">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Logic Flow Editor</h3>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => router.push(`/canvas-editor/${selectedAgent.id}`)}
                        className="gap-2"
                      >
                        <Expand className="h-4 w-4" />
                        Open Full Editor
                      </Button>
                    </div>
                    <LogicCanvas agentId={selectedAgent.id} />
                  </div>
                </TabsContent>

                <TabsContent value="logs">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Activity Logs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                                             <ScrollArea className="h-96">
                         <div className="space-y-2">
                           {(Array.isArray(logs) ? logs : []).map((log) => (
                             <div key={log.id} className="p-3 rounded-lg border bg-muted/50">
                               <div className="flex items-start gap-2">
                                 {getLogIcon(log.level)}
                                 <div className="flex-1">
                                   <div className="flex items-center justify-between">
                                     <span className="text-sm font-medium">{log.message}</span>
                                     <Badge variant="outline" className="text-xs">
                                       {log.level}
                                     </Badge>
                                   </div>
                                   <p className="text-xs text-muted-foreground mt-1">
                                     {log.details} • {new Date(log.timestamp).toLocaleString()}
                                   </p>
                                 </div>
                               </div>
                             </div>
                           ))}
                         </div>
                       </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
} 