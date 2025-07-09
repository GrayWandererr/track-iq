"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { 
  Camera, 
  Database, 
  Code, 
  FileText, 
  Activity, 
  Settings,
  Search,
  Plus,
  BarChart,
  MessageSquare,
  Users,
  Mail,
  UserPlus,
  Cloud,
  FolderOpen,
  ExternalLink,
  AlertCircle
} from "lucide-react"
import { mockConnectors } from "@/mock/connectors"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

const iconMap: { [key: string]: any } = {
  Camera,
  Database,
  Code,
  FileText,
  BarChart,
  MessageSquare,
  Users,
  Mail,
  UserPlus,
  Cloud,
  FolderOpen,
  Settings
}

export default function ConnectorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [requestOpen, setRequestOpen] = useState(false)
  const [requestDetails, setRequestDetails] = useState("")

  const filteredConnectors = mockConnectors.filter(connector => {
    const matchesSearch = connector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         connector.type.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeTab === "all") return matchesSearch
    if (activeTab === "connected") return matchesSearch && connector.status === "connected"
    if (activeTab === "disconnected") return matchesSearch && connector.status === "disconnected"
    
    return matchesSearch
  })

  const handleConnect = (connectorId: string) => {
    toast.success("Connector connected successfully")
  }

  const handleDisconnect = (connectorId: string) => {
    toast.success("Connector disconnected")
  }

  const handleRequestSubmit = () => {
    if (requestDetails.trim()) {
      toast.success("Request submitted successfully! We'll review your request and get back to you soon.")
      setRequestDetails("")
      setRequestOpen(false)
    } else {
      toast.error("Please provide details about the connector you need.")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500"
      case "disconnected":
        return "bg-gray-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-yellow-500"
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Connectors</h1>
          <p className="text-gray-400 mt-1">Manage your data source integrations</p>
        </div>
        <Dialog open={requestOpen} onOpenChange={setRequestOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Request More
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request a New Connector</DialogTitle>
              <DialogDescription>
                Don't see the connector you need? Let us know what integration you're looking for.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="request-details">Connector Details</Label>
                <Textarea
                  id="request-details"
                  placeholder="Please describe the connector you need (e.g., SAP integration, custom ERP system, IoT sensors, etc.)"
                  className="min-h-[100px]"
                  value={requestDetails}
                  onChange={(e) => setRequestDetails(e.target.value)}
                />
              </div>
              <Button onClick={handleRequestSubmit} className="w-full">
                Submit Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search connectors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All ({mockConnectors.length})</TabsTrigger>
            <TabsTrigger value="connected">
              Connected ({mockConnectors.filter(c => c.status === "connected").length})
            </TabsTrigger>
            <TabsTrigger value="disconnected">
              Disconnected ({mockConnectors.filter(c => c.status === "disconnected").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Connectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConnectors.map((connector) => {
          const Icon = iconMap[connector.icon] || Settings
          return (
            <Card key={connector.id} className="hover:border-gray-600 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <Icon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{connector.name}</CardTitle>
                      <CardDescription className="capitalize">{connector.type}</CardDescription>
                    </div>
                  </div>
                  <div className={`h-3 w-3 rounded-full ${getStatusColor(connector.status)}`} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <Badge 
                      variant={connector.status === "connected" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {connector.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Sync</span>
                    <span>{connector.lastSync}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Endpoints</span>
                    <span>{connector.endpoints}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data Flow</span>
                    <span>{connector.dataFlow}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  {connector.status === "connected" ? (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDisconnect(connector.id)}
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleConnect(connector.id)}
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredConnectors.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No connectors found</h3>
          <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
          <Button variant="outline" onClick={() => {
            setSearchQuery("")
            setActiveTab("all")
          }}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
} 