import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useAgentStore } from "@/store/useAgentStore"
import { 
  Send, 
  Settings, 
  Bot,
  User,
  Command,
  History,
  MessageSquare,
  Clock,
  Brain,
  Sparkles,
  Search,
  CheckCircle2
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"

interface ChatMessage {
  id: number
  type: 'user' | 'agent' | 'loading'
  content: string
  timestamp: string
  handledBy?: string
  agentId?: string
  actions?: Array<{
    type: string;
    label: string;
    description: string;
  }>;
  loadingSteps?: LoadingStep[];
}

interface LoadingStep {
  id: string;
  text: string;
  completed: boolean;
  icon: 'search' | 'brain' | 'sparkles' | 'check';
}

interface ChatSession {
  id: string
  title: string
  date: string
  preview: string
  messageCount: number
}

interface MasterChatProps {
  className?: string
}

interface MessageContentProps {
  content: string;
  actions?: Array<{
    type: string;
    label: string;
    description: string;
  }>;
}

const MessageContent: React.FC<MessageContentProps> = ({ content, actions }) => {
  // Split content by newlines and process each line
  const lines = content.split('\n');
  
  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        if (line.startsWith('•')) {
          return (
            <p key={index} className="ml-4 text-gray-300">
              {line}
            </p>
          );
        } else if (line.includes('**') && line.includes('**')) {
          // Handle bold text
          const parts = line.split('**');
          return (
            <p key={index} className="text-gray-100">
              {parts.map((part, i) => 
                i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part
              )}
            </p>
          );
        } else if (line.trim()) {
          return (
            <p key={index} className="text-gray-300">
              {line}
            </p>
          );
        }
        return null;
      })}
      
      {actions && actions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-sm font-medium text-gray-400 mb-3">Available Actions:</p>
          <div className="flex flex-wrap gap-2">
            {actions.map((action, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:bg-gray-800 hover:border-gray-600"
                      onClick={() => {
                        // Handle action click
                        console.log('Action clicked:', action);
                        // You can add toast notification here
                        toast.success(`${action.label} initiated`, {
                          description: action.description
                        });
                      }}
                    >
                      {action.label}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">{action.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CHAT_HISTORY: ChatSession[] = [
  {
    id: "1",
    title: "Dock Operations Review",
    date: "2 hours ago",
    preview: "Analyzed truck queue times...",
    messageCount: 12
  },
  {
    id: "2", 
    title: "Safety Compliance Check",
    date: "Yesterday",
    preview: "PPE violations in Zone A...",
    messageCount: 8
  },
  {
    id: "3",
    title: "Staffing Analysis",
    date: "Yesterday",
    preview: "Evening shift coverage...",
    messageCount: 15
  },
  {
    id: "4",
    title: "RFP Draft Review",
    date: "2 days ago",
    preview: "Logistics services proposal...",
    messageCount: 6
  },
  {
    id: "5",
    title: "Retail Compliance Audit",
    date: "3 days ago",
    preview: "Q4 regulatory updates...",
    messageCount: 10
  },
  {
    id: "6",
    title: "Cross-Dock Efficiency",
    date: "3 days ago",
    preview: "Zone B throughput analysis...",
    messageCount: 18
  },
  {
    id: "7",
    title: "Weekend Staffing Plan",
    date: "4 days ago",
    preview: "Holiday schedule optimization...",
    messageCount: 9
  },
  {
    id: "8",
    title: "Safety Incident Report",
    date: "5 days ago",
    preview: "Near-miss at loading dock...",
    messageCount: 14
  }
]

export function MasterChat({ className }: MasterChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentLoadingStep, setCurrentLoadingStep] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { sendChatMessage } = useAgentStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getLoadingSteps = (message: string): LoadingStep[] => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('win rate') || lowerMessage.includes('losing')) {
      return [
        { id: '1', text: 'Analyzing RFP database...', completed: false, icon: 'search' },
        { id: '2', text: 'Processing Q3 2024 win/loss data...', completed: false, icon: 'brain' },
        { id: '3', text: 'Identifying competitive patterns...', completed: false, icon: 'sparkles' },
        { id: '4', text: 'Generating insights and recommendations...', completed: false, icon: 'check' }
      ]
    } else if (lowerMessage.includes('safety') || lowerMessage.includes('violations')) {
      return [
        { id: '1', text: 'Scanning camera feeds...', completed: false, icon: 'search' },
        { id: '2', text: 'Analyzing safety compliance data...', completed: false, icon: 'brain' },
        { id: '3', text: 'Identifying violation patterns...', completed: false, icon: 'sparkles' },
        { id: '4', text: 'Preparing safety report...', completed: false, icon: 'check' }
      ]
    } else if (lowerMessage.includes('staff') || lowerMessage.includes('shift')) {
      return [
        { id: '1', text: 'Accessing workforce management system...', completed: false, icon: 'search' },
        { id: '2', text: 'Analyzing current staffing levels...', completed: false, icon: 'brain' },
        { id: '3', text: 'Calculating optimal distribution...', completed: false, icon: 'sparkles' },
        { id: '4', text: 'Generating staffing recommendations...', completed: false, icon: 'check' }
      ]
    } else if (lowerMessage.includes('dock') || lowerMessage.includes('truck')) {
      return [
        { id: '1', text: 'Checking dock management system...', completed: false, icon: 'search' },
        { id: '2', text: 'Analyzing queue and wait times...', completed: false, icon: 'brain' },
        { id: '3', text: 'Optimizing dock assignments...', completed: false, icon: 'sparkles' },
        { id: '4', text: 'Preparing dock status report...', completed: false, icon: 'check' }
      ]
    } else if (lowerMessage.includes('compliance')) {
      return [
        { id: '1', text: 'Scanning regulatory databases...', completed: false, icon: 'search' },
        { id: '2', text: 'Cross-referencing compliance requirements...', completed: false, icon: 'brain' },
        { id: '3', text: 'Identifying violations and risks...', completed: false, icon: 'sparkles' },
        { id: '4', text: 'Compiling compliance report...', completed: false, icon: 'check' }
      ]
    } else if (lowerMessage.includes('overall') || lowerMessage.includes('operations')) {
      return [
        { id: '1', text: 'Connecting to all operational systems...', completed: false, icon: 'search' },
        { id: '2', text: 'Aggregating real-time metrics...', completed: false, icon: 'brain' },
        { id: '3', text: 'Analyzing cross-functional data...', completed: false, icon: 'sparkles' },
        { id: '4', text: 'Building comprehensive dashboard...', completed: false, icon: 'check' }
      ]
    } else {
      return [
        { id: '1', text: 'Routing to appropriate agent...', completed: false, icon: 'search' },
        { id: '2', text: 'Analyzing your request...', completed: false, icon: 'brain' },
        { id: '3', text: 'Processing operational data...', completed: false, icon: 'sparkles' },
        { id: '4', text: 'Preparing response...', completed: false, icon: 'check' }
      ]
    }
  }

  const LoadingMessage: React.FC<{ steps: LoadingStep[], currentStep: number }> = ({ steps, currentStep }) => {
    const getIcon = (icon: string, completed: boolean) => {
      const className = `h-4 w-4 ${completed ? 'text-green-400' : 'text-gray-400 animate-pulse'}`
      switch (icon) {
        case 'search': return <Search className={className} />
        case 'brain': return <Brain className={className} />
        case 'sparkles': return <Sparkles className={className} />
        case 'check': return <CheckCircle2 className={className} />
        default: return <Bot className={className} />
      }
    }

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Bot className="h-4 w-4 animate-pulse" />
          <span>AI Agent is processing your request...</span>
        </div>
        <div className="space-y-2 ml-6">
          {steps.map((step, index) => (
            <div key={step.id} className={`flex items-center gap-2 text-sm transition-all duration-300 ${
              index <= currentStep ? 'opacity-100' : 'opacity-40'
            }`}>
              {getIcon(step.icon, index < currentStep)}
              <span className={index < currentStep ? 'text-gray-300' : 'text-gray-500'}>
                {step.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    // Add user message
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const loadingSteps = getLoadingSteps(inputValue)
    
    // Add loading message
    const loadingMessage: ChatMessage = {
      id: messages.length + 2,
      type: "loading",
      content: "",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      loadingSteps
    }

    setMessages(prev => [...prev, userMessage, loadingMessage])
    setInputValue("")
    setIsLoading(true)
    setCurrentLoadingStep(0)

    // Simulate step progression with variable timing
    const stepDelays = [600, 900, 1100, 700] // Different delays for each step
    let stepIndex = 0
    
    const progressStep = () => {
      if (stepIndex < loadingSteps.length - 1) {
        setCurrentLoadingStep(stepIndex)
        stepIndex++
        setTimeout(progressStep, stepDelays[stepIndex] || 800)
      } else {
        setCurrentLoadingStep(loadingSteps.length - 1)
      }
    }
    
    setTimeout(progressStep, stepDelays[0])

    try {
      // Add realistic delay (minimum 3.5 seconds, max 4.5 seconds)
      const minDelay = 3500
      const maxDelay = 4500
      const targetDelay = minDelay + Math.random() * (maxDelay - minDelay)
      
      const startTime = Date.now()
      const response = await sendChatMessage(inputValue)
      const elapsed = Date.now() - startTime
      const remainingDelay = Math.max(0, targetDelay - elapsed)
      
      if (remainingDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingDelay))
      }
      
      // Remove loading message and add agent response
      setMessages(prev => {
        const filtered = prev.filter(m => m.type !== 'loading')
        const agentMessage: ChatMessage = {
          id: messages.length + 3,
          type: "agent",
          content: response.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          handledBy: response.handledBy,
          agentId: response.agentId,
          actions: response.actions
        }
        return [...filtered, agentMessage]
      })
    } catch (error) {
      // clearInterval(stepInterval) // This line is removed as per the new_code
      
      setMessages(prev => {
        const filtered = prev.filter(m => m.type !== 'loading')
        const errorMessage: ChatMessage = {
          id: messages.length + 3,
          type: "agent",
          content: "Sorry, I encountered an error processing your request.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          handledBy: "System"
        }
        return [...filtered, errorMessage]
      })
    } finally {
      setIsLoading(false)
      setCurrentLoadingStep(0)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSessionClick = (session: ChatSession) => {
    // In a real app, this would load the session's messages
    console.log(`Loading session: ${session.title}`)
  }

  return (
    <div className={cn("flex gap-4", className)}>
      {/* Main Chat - 70% width */}
      <Card className="flex-[1.75] border-border bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <CardTitle className="text-xl">Master Agent</CardTitle>
              <Badge variant="secondary" className="text-xs">v1.0</Badge>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Command className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Messages */}
          <ScrollArea className="h-96 pr-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p className="text-base">Start a conversation with the Master Agent</p>
                  <p className="text-sm mt-2">Ask about operations, safety, staffing, or compliance</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                  >
                    {message.type === 'loading' ? (
                      <div className="max-w-[80%] rounded-lg px-4 py-3 bg-gray-800 text-gray-100 border border-gray-700">
                        <LoadingMessage 
                          steps={message.loadingSteps || []} 
                          currentStep={currentLoadingStep}
                        />
                      </div>
                    ) : (
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-100 border border-gray-700'
                        }`}
                      >
                        {message.type === 'agent' && message.handledBy && (
                          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-700">
                            <Badge variant="secondary" className="text-xs">
                              {message.handledBy}
                            </Badge>
                          </div>
                        )}
                        {message.type === 'user' ? (
                          <p>{message.content}</p>
                        ) : (
                          <MessageContent content={message.content} actions={message.actions} />
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              placeholder="Ask about operations, safety, staffing, compliance..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              size="icon"
              disabled={isLoading || !inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Suggestion chips - only show when no messages */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setInputValue("Show me all PPE violations in the last hour")}
              >
                Recent safety violations
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setInputValue("Is the evening shift adequately staffed?")}
              >
                Evening shift status
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setInputValue("How many trucks are currently waiting?")}
              >
                Truck queue status
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setInputValue("What's the overall health of operations right now?")}
              >
                Operations overview
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setInputValue("What's our win rate this quarter and why are we losing?")}
              >
                Win/Loss analysis
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setInputValue("Which GS1 label errors occurred this week?")}
              >
                Label compliance
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setInputValue("If tomorrow's inbound volume jumps 25%, where will we break first?")}
              >
                Surge planning
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setInputValue("Draft an executive dashboard for today")}
              >
                Executive summary
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chat History Sidebar - 30% width */}
      <Card className="flex-1 border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="h-5 w-5" />
            Previous Chats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[450px]">
            <div className="space-y-2">
              {CHAT_HISTORY.map((session) => (
                <div
                  key={session.id}
                  className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 cursor-pointer transition-all duration-200"
                  onClick={() => handleSessionClick(session)}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h5 className="font-medium text-sm line-clamp-1">{session.title}</h5>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{session.preview}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {session.messageCount} messages
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
} 