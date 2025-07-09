import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusChip } from "@/components/StatusChip"
import { Agent } from "@/mock/agents"
import { cn } from "@/lib/utils"
import { 
  Pause, 
  Play,
  AlertTriangle, 
  Wrench,
  ExternalLink
} from "lucide-react"

interface AgentCardProps {
  agent: Agent
  onOpen: (agent: Agent) => void
  onAction: (agentId: string, action: 'pause' | 'resume' | 'fix') => void
  className?: string
}

export function AgentCard({ agent, onOpen, onAction, className }: AgentCardProps) {
  const getActionButton = () => {
    switch (agent.status) {
      case 'running':
        return (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onAction(agent.id, 'pause')}
            className="hover:bg-red-500/10 hover:border-red-500/50"
          >
            <Pause className="h-4 w-4 mr-1" />
            Pause
          </Button>
        )
      case 'stopped':
        return (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onAction(agent.id, 'fix')}
            className="hover:bg-blue-500/10 hover:border-blue-500/50"
          >
            <Wrench className="h-4 w-4 mr-1" />
            Fix
          </Button>
        )
      case 'warning':
        return (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onAction(agent.id, 'fix')}
            className="hover:bg-yellow-500/10 hover:border-yellow-500/50"
          >
            <AlertTriangle className="h-4 w-4 mr-1" />
            Apply Fix
          </Button>
        )
      default:
        return null
    }
  }

  const getBorderGlow = () => {
    switch (agent.status) {
      case 'running':
        return 'hover:shadow-green-500/20 hover:border-green-500/30'
      case 'warning':
        return 'hover:shadow-yellow-400/20 hover:border-yellow-400/30'
      case 'stopped':
        return 'hover:shadow-red-500/20 hover:border-red-500/30'
      default:
        return 'hover:shadow-gray-500/20'
    }
  }

  return (
    <Card 
      className={cn(
        "border-border bg-card hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer",
        getBorderGlow(),
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {agent.name}
            <span className="text-xs text-muted-foreground font-normal">
              {agent.version}
            </span>
          </CardTitle>
          <StatusChip status={agent.status} />
        </div>
        <p className="text-sm text-muted-foreground">{agent.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">{agent.kpi}</p>
          <p className="text-xs text-muted-foreground">
            Last activity: {agent.lastActivity}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="default" 
            size="sm"
            onClick={() => onOpen(agent)}
            className="flex-1"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Open
          </Button>
          
          {getActionButton()}
        </div>
      </CardContent>
    </Card>
  )
} 