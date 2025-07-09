"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"
import { useAgentStore } from "@/store/useAgentStore"
import { LogicCanvas } from "@/components/LogicCanvas"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

export default function CanvasEditorPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const agentId = params.agentId as string
  const { agents } = useAgentStore()
  const [zoom, setZoom] = useState(1)
  
  const agent = agents.find(a => a.id === agentId)

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5))
  const handleZoomReset = () => setZoom(1)

  const handleSave = () => {
    toast({
      title: "Canvas Saved",
      description: "Agent logic flow has been saved successfully.",
    })
  }

  const handleBack = () => {
    router.push('/agent-studio')
  }

  if (!agent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Agent not found</h2>
          <Button onClick={handleBack}>Back to Agent Studio</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBack}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="h-6 w-px bg-border" />
            <div>
              <h1 className="text-xl font-semibold">{agent.name} - Logic Editor</h1>
              <p className="text-sm text-muted-foreground">Edit and configure agent workflow</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 border rounded-md p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                className="h-8 w-8 p-0"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomReset}
                className="h-8 px-3 text-sm"
              >
                {Math.round(zoom * 100)}%
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                className="h-8 w-8 p-0"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-6 w-px bg-border" />
            
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ 
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease-out'
          }}
        >
          <LogicCanvas 
            agentId={agentId} 
            fullscreen={true}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  )
} 