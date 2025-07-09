import { useState, useCallback, useRef, useEffect } from 'react'
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  NodeTypes,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { mockGet } from "@/lib/mockRouter"
import { 
  Play, 
  Pause, 
  Download,
  Upload,
  Zap
} from "lucide-react"

const nodeTypes: NodeTypes = {
  // We'll use default node types for now
}

interface LogicCanvasProps {
  agentId: string
  className?: string
  fullscreen?: boolean
}

interface FlowData {
  nodes: Node[]
  edges: Edge[]
}

const DRAGGABLE_NODE = {
  id: 'email-alert',
  type: 'default',
  data: { label: 'Email Alert' },
  position: { x: 0, y: 0 }
}

export function LogicCanvas({ agentId, className, fullscreen = false }: LogicCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)

  // Load flow data for agent
  useEffect(() => {
    const loadFlow = async () => {
      try {
        setIsLoading(true)
        const response = await mockGet(`/flows/${agentId}`)
        const flowData: FlowData = response.data
        
        setNodes(flowData.nodes || [])
        setEdges(flowData.edges || [])
      } catch (error) {
        console.error('Failed to load flow:', error)
        // Set default empty flow
        setNodes([])
        setEdges([])
      } finally {
        setIsLoading(false)
      }
    }

    loadFlow()
  }, [agentId, setNodes, setEdges])

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      const type = event.dataTransfer.getData('application/reactflow')

      if (typeof type === 'undefined' || !type || !reactFlowInstance) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - (reactFlowBounds?.left || 0),
        y: event.clientY - (reactFlowBounds?.top || 0),
      })

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type: 'default',
        position,
        data: { label: 'Email Alert' },
      }

      setNodes((nds) => nds.concat(newNode))
      console.log('Flow updated: Added new node', newNode)
    },
    [reactFlowInstance, setNodes]
  )

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
    setIsDragging(true)
  }

  const onDragEnd = () => {
    setIsDragging(false)
  }

  const handleNodeChange = useCallback(() => {
    console.log('Flow updated: Node positions changed')
  }, [])

  const exportFlow = () => {
    const flowData = { nodes, edges }
    console.log('Exported flow:', flowData)
  }

  if (isLoading) {
    const loadingContent = (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading flow...</div>
      </div>
    )

    if (fullscreen) {
      return <div className={cn("h-full w-full p-6", className)}>{loadingContent}</div>
    }

    return (
      <Card className={cn("border-border bg-card", className)}>
        <CardContent className="p-6">
          {loadingContent}
        </CardContent>
      </Card>
    )
  }

  const canvasContent = (
    <>
      {!fullscreen && (
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Logic Canvas</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={exportFlow}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-1" />
                Import
              </Button>
            </div>
          </div>
        </CardHeader>
      )}
      
      <CardContent className={fullscreen ? "h-full p-0" : "p-0"}>
        <div className={cn("flex", fullscreen ? "h-full" : "")}>
          {/* Palette */}
          <div className="w-48 p-4 border-r border-border bg-card">
            <h4 className="text-sm font-medium mb-3">Node Palette</h4>
            <div className="space-y-2">
              <div
                className={cn(
                  "p-3 rounded-lg border-2 border-dashed border-border bg-muted/50 cursor-grab transition-colors",
                  isDragging ? "border-primary" : "hover:border-primary/50"
                )}
                draggable
                onDragStart={(event) => onDragStart(event, 'email-alert')}
                onDragEnd={onDragEnd}
              >
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-medium">Email Alert</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Send email notifications
                </p>
              </div>
              
              <div className="text-xs text-muted-foreground pt-2">
                Drag nodes to canvas to build your flow
              </div>
            </div>
          </div>
          
          {/* Canvas */}
          <div className={cn("flex-1", fullscreen ? "h-full" : "h-96")} ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              fitView
              className="bg-background"
            >
              <Controls className="bg-card border-border" />
              <MiniMap 
                className="bg-card border border-border" 
                nodeColor="#00544E"
              />
              <Background 
                variant={BackgroundVariant.Dots} 
                gap={12} 
                size={1}
                className="opacity-50"
              />
            </ReactFlow>
          </div>
        </div>
        
        {/* Status */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                {nodes.length} nodes
              </Badge>
              <Badge variant="secondary">
                {edges.length} connections
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-muted-foreground">
                Flow ready
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  )

  if (fullscreen) {
    return <div className={cn("h-full w-full flex flex-col", className)}>{canvasContent}</div>
  }

  return (
    <Card className={cn("border-border bg-card", className)}>
      {canvasContent}
    </Card>
  )
} 