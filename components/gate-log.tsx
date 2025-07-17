"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Plus, 
  Shield, 
  Siren,
  Save,
  X
} from "lucide-react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Mock Red Flag Database (hashes)
const redFlagDatabase = {
  drivers: ["john doe", "mike smith", "suspicious driver"],
  plates: ["ABC123", "XYZ789", "STOLEN1"],
  carriers: ["Blacklisted Carrier Inc", "Fraud Transport LLC"],
  trailers: ["TR12345", "TR99999"]
}

interface LogEntry {
  id: string
  date: string
  timeIn: string
  timeOut: string
  driverName: string
  driverDL: string
  dlState: string
  dlExpiry: string
  tractorPlate: string
  tractorPlateState: string
  tractorVIN: string
  trailerPlate: string
  trailerVIN: string
  carrierReported: string
  carrierOnFile: string
  mcDotNumber: string
  insuranceExpiry: string
  bolNumber: string
  pickupNumber: string
  destinationStated: string
  destinationDoc: string
  freightType: string
  sealNumber: string
  redFlagTypes: string[]
  decision: "Cleared" | "Denied" | "Escalated"
  dwellMinutes?: number
  guardId: string
  supervisorId?: string
  panicAlert: boolean
  escalationChannel?: string
  eventId: string
  repeatOffenderCount: number
  images?: string[]
  comments?: string
  customerContacted?: boolean
  customerResponseMinutes?: number
  followUpCaseId?: string
  isRedFlagged: boolean
}

interface Alert {
  id: string
  timestamp: string
  yard: string
  matchedField: string
  redFlagType: string
  details: string
}

interface GateLogProps {
  yardId?: string
}

export function GateLog({ yardId: propYardId }: GateLogProps) {
  const params = useParams()
  const yardId = propYardId || (params?.yardId as string)
  
  const [showPanicDialog, setShowPanicDialog] = useState(false)
  const [panicMessage, setPanicMessage] = useState("")
  const [geoFencedAlert, setGeoFencedAlert] = useState<any>(null)
  
  const [mockAlerts, setMockAlerts] = useState<Alert[]>([
    {
      id: "1",
      timestamp: new Date().toLocaleString(),
      yard: "Current Yard",
      matchedField: "Multiple Fields",
      redFlagType: "High Risk Entry",
      details: "Driver John Doe with plate ABC123 and Blacklisted Carrier Inc - ENTRY ESCALATED"
    },
    {
      id: "2",
      timestamp: "2024-01-20 14:32",
      yard: "Amazon - ONT2 Facility",
      matchedField: "Insurance",
      redFlagType: "Expired Coverage",
      details: "Carrier insurance expired 30 days ago - Entry denied, carrier notified"
    },
    {
      id: "3",
      timestamp: "2024-01-20 13:45",
      yard: "XPO - Vernon DC",
      matchedField: "Driver CDL",
      redFlagType: "License Mismatch",
      details: "Driver using CDL reported stolen in Arizona - LAPD contacted"
    },
    {
      id: "4",
      timestamp: "2024-01-20 12:15",
      yard: "Walmart DC - Torrance",
      matchedField: "Destination",
      redFlagType: "Route Deviation",
      details: "BOL shows Phoenix destination but driver claims Los Angeles - Load inspection required"
    },
    {
      id: "5",
      timestamp: "2024-01-20 11:00",
      yard: "Target RDC - Carson",
      matchedField: "Seal",
      redFlagType: "Tampered Seal",
      details: "Seal number doesn't match manifest, evidence of tampering - Full inspection initiated"
    }
  ])

  // Show geo-fenced panic alert for Long Beach yard after 5 seconds
  useEffect(() => {
    if (yardId === "nfi-long-beach-01") {
      const timer = setTimeout(() => {
        setGeoFencedAlert({
          id: "geo-panic-1",
          timestamp: new Date().toLocaleString(),
          yard: "Yusen Logistics - Long Beach",
          driverName: "Unknown Driver",
          vehicleDescription: "Black Ford F-150",
          licensePlate: "7Z9X432",
          incidentType: "Forced Entry Attempt",
          guardName: "Officer Martinez",
          details: "Driver became aggressive when denied entry due to expired insurance. Attempted to ram gate. LBPD notified.",
          distance: "0.8 miles away"
        })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [yardId])

  // Initialize with some sample entries to demonstrate functionality
  const [entries, setEntries] = useState<LogEntry[]>([
    {
      id: "1",
      eventId: "evt_" + Date.now() + "_1",
      date: new Date().toLocaleDateString(),
      timeIn: "08:15",
      timeOut: "08:45",
      driverName: "Robert Johnson",
      driverDL: "CA12345678",
      dlState: "CA",
      dlExpiry: "2025-06-15",
      tractorPlate: "CA4567",
      tractorPlateState: "CA",
      tractorVIN: "1HGBH41JXMN109186",
      trailerPlate: "TR5678",
      trailerVIN: "1HTMKADN43H561298",
      carrierReported: "Swift Transportation",
      carrierOnFile: "Swift Transportation",
      mcDotNumber: "MC-123456",
      insuranceExpiry: "2024-12-31",
      bolNumber: "BOL-2024-0789",
      pickupNumber: "PU-456789",
      destinationStated: "Los Angeles, CA",
      destinationDoc: "Los Angeles, CA",
      freightType: "Electronics",
      sealNumber: "SEAL-987654",
      redFlagTypes: [],
      decision: "Cleared",
      dwellMinutes: 30,
      guardId: "G-Smith-042",
      panicAlert: false,
      repeatOffenderCount: 0,
      isRedFlagged: false,
      comments: "Regular driver, no issues"
    },
    {
      id: "2",
      eventId: "evt_" + Date.now() + "_2",
      date: new Date().toLocaleDateString(),
      timeIn: "09:30",
      timeOut: "",
      driverName: "John Doe",
      driverDL: "TX98765432",
      dlState: "TX",
      dlExpiry: "2023-03-15",
      tractorPlate: "ABC123",
      tractorPlateState: "NV",
      tractorVIN: "2HGFG12688H573945",
      trailerPlate: "TR12345",
      trailerVIN: "3HTMKADN43H561777",
      carrierReported: "Blacklisted Carrier Inc",
      carrierOnFile: "Unknown",
      mcDotNumber: "MC-INVALID",
      insuranceExpiry: "2023-01-01",
      bolNumber: "FAKE-BOL-123",
      pickupNumber: "NO-PICKUP",
      destinationStated: "Phoenix, AZ",
      destinationDoc: "Las Vegas, NV",
      freightType: "High Value Electronics",
      sealNumber: "TAMPERED",
      redFlagTypes: ["Expired DL", "Flagged Plate", "Blacklisted Carrier", "Insurance Expired", "Destination Mismatch", "No Valid Pickup"],
      decision: "Escalated",
      guardId: "G-Jones-023",
      supervisorId: "S-Wilson-001",
      panicAlert: true,
      escalationChannel: "SMS + Teams + Email",
      repeatOffenderCount: 3,
      isRedFlagged: true,
            comments: "Multiple red flags! Driver previously denied at Long Beach facility. Law enforcement notified."
    },
    {
      id: "3",
      eventId: "evt_" + Date.now() + "_3",
      date: new Date().toLocaleDateString(),
      timeIn: "10:15",
      timeOut: "10:35",
      driverName: "Maria Rodriguez",
      driverDL: "CA87654321",
      dlState: "CA",
      dlExpiry: "2026-09-20",
      tractorPlate: "CA8899",
      tractorPlateState: "CA",
      tractorVIN: "3HGBH41JXMN109222",
      trailerPlate: "TR9988",
      trailerVIN: "4HTMKADN43H561333",
      carrierReported: "FedEx",
      carrierOnFile: "FedEx",
      mcDotNumber: "MC-789012",
      insuranceExpiry: "2025-03-15",
      bolNumber: "BOL-2024-1122",
      pickupNumber: "PU-778899",
      destinationStated: "San Diego, CA",
      destinationDoc: "San Diego, CA",
      freightType: "Medical Supplies",
      sealNumber: "SEAL-445566",
      redFlagTypes: [],
      decision: "Cleared",
      dwellMinutes: 20,
      guardId: "G-Thompson-015",
      panicAlert: false,
      repeatOffenderCount: 0,
      isRedFlagged: false,
      comments: "Scheduled delivery, all documents verified"
    },
    {
      id: "4",
      eventId: "evt_" + Date.now() + "_4",
      date: new Date().toLocaleDateString(),
      timeIn: "11:45",
      timeOut: "11:48",
      driverName: "Mike Smith",
      driverDL: "NV55443322",
      dlState: "NV",
      dlExpiry: "2024-01-10",
      tractorPlate: "NV2233",
      tractorPlateState: "NV",
      tractorVIN: "5HGBH41JXMN109444",
      trailerPlate: "TR3344",
      trailerVIN: "6HTMKADN43H561555",
      carrierReported: "Quick Transit LLC",
      carrierOnFile: "Unknown",
      mcDotNumber: "MC-PENDING",
      insuranceExpiry: "2024-02-28",
      bolNumber: "QT-2024-3344",
      pickupNumber: "",
      destinationStated: "Las Vegas, NV",
      destinationDoc: "Phoenix, AZ",
      freightType: "Consumer Goods",
      sealNumber: "SEAL-112233",
      redFlagTypes: ["Insurance Expiring", "No Pickup Number", "Destination Mismatch", "Flagged Driver"],
      decision: "Denied",
      dwellMinutes: 3,
      guardId: "G-Smith-042",
      supervisorId: "S-Davis-002",
      panicAlert: false,
      repeatOffenderCount: 2,
      isRedFlagged: true,
      comments: "Driver on watchlist from previous incident. Entry denied, asked to leave premises."
    },
    {
      id: "5",
      eventId: "evt_" + Date.now() + "_5",
      date: new Date().toLocaleDateString(),
      timeIn: "13:20",
      timeOut: "",
      driverName: "James Wilson",
      driverDL: "CA11223344",
      dlState: "CA",
      dlExpiry: "2027-11-30",
      tractorPlate: "CA9911",
      tractorPlateState: "CA",
      tractorVIN: "7HGBH41JXMN109666",
      trailerPlate: "TR6677",
      trailerVIN: "8HTMKADN43H561777",
      carrierReported: "Amazon Logistics",
      carrierOnFile: "Amazon Logistics",
      mcDotNumber: "MC-AMAZON1",
      insuranceExpiry: "2025-12-31",
      bolNumber: "AMZ-2024-9988",
      pickupNumber: "PU-AMZN-7766",
      destinationStated: "Los Angeles, CA",
      destinationDoc: "Los Angeles, CA",
      freightType: "E-commerce Packages",
      sealNumber: "AMZN-SEAL-9988",
      redFlagTypes: [],
      decision: "Cleared",
      guardId: "G-Martinez-033",
      panicAlert: false,
      repeatOffenderCount: 0,
      isRedFlagged: false,
      comments: "Regular Amazon driver, currently at dock"
    }
  ])
  const [isAddingEntry, setIsAddingEntry] = useState(false)
  const [newEntry, setNewEntry] = useState<Partial<LogEntry>>({
    driverName: "",
    driverDL: "",
    dlState: "",
    dlExpiry: "",
    tractorPlate: "",
    tractorPlateState: "",
    tractorVIN: "",
    trailerPlate: "",
    trailerVIN: "",
    carrierReported: "",
    carrierOnFile: "",
    mcDotNumber: "",
    insuranceExpiry: "",
    bolNumber: "",
    pickupNumber: "",
    destinationStated: "",
    destinationDoc: "",
    freightType: "",
    sealNumber: "",
    decision: "Cleared",
    panicAlert: false,
    comments: ""
  })

  // Mock yard names based on ID
  const getYardName = (id: string) => {
    const yards: Record<string, string> = {
      "nfi-long-beach-01": "NFI - Long Beach 01",
      "nfi-camden-17": "NFI - Camden 17"
    }
    return yards[id] || "Unknown Yard"
  }

  // Check for red flags
  const checkRedFlags = (entry: Partial<LogEntry>): { isRedFlagged: boolean; redFlagTypes: string[] } => {
    const redFlagTypes: string[] = []
    
    if (entry.driverName && redFlagDatabase.drivers.includes(entry.driverName.toLowerCase())) {
      redFlagTypes.push("Flagged Driver")
    }
    if (entry.tractorPlate && redFlagDatabase.plates.includes(entry.tractorPlate.toUpperCase())) {
      redFlagTypes.push("Flagged Plate")
    }
    if (entry.trailerPlate && redFlagDatabase.trailers.includes(entry.trailerPlate.toUpperCase())) {
      redFlagTypes.push("Flagged Trailer")
    }
    if (entry.carrierReported && redFlagDatabase.carriers.includes(entry.carrierReported)) {
      redFlagTypes.push("Blacklisted Carrier")
    }

    return {
      isRedFlagged: redFlagTypes.length > 0,
      redFlagTypes
    }
  }

  const handleAddEntry = () => {
    const now = new Date()
    const { isRedFlagged, redFlagTypes } = checkRedFlags(newEntry)
    
    const entry: LogEntry = {
      id: Date.now().toString(),
      eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: now.toLocaleDateString(),
      timeIn: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeOut: "",
      driverName: newEntry.driverName || "",
      driverDL: newEntry.driverDL || "",
      dlState: newEntry.dlState || "",
      dlExpiry: newEntry.dlExpiry || "",
      tractorPlate: newEntry.tractorPlate || "",
      tractorPlateState: newEntry.tractorPlateState || "",
      tractorVIN: newEntry.tractorVIN || "",
      trailerPlate: newEntry.trailerPlate || "",
      trailerVIN: newEntry.trailerVIN || "",
      carrierReported: newEntry.carrierReported || "",
      carrierOnFile: newEntry.carrierOnFile || "",
      mcDotNumber: newEntry.mcDotNumber || "",
      insuranceExpiry: newEntry.insuranceExpiry || "",
      bolNumber: newEntry.bolNumber || "",
      pickupNumber: newEntry.pickupNumber || "",
      destinationStated: newEntry.destinationStated || "",
      destinationDoc: newEntry.destinationDoc || "",
      freightType: newEntry.freightType || "",
      sealNumber: newEntry.sealNumber || "",
      redFlagTypes,
      decision: isRedFlagged && newEntry.decision === "Cleared" ? "Escalated" : newEntry.decision || "Cleared",
      guardId: "G-Current-001",
      supervisorId: isRedFlagged ? "S-Manager-001" : undefined,
      panicAlert: newEntry.panicAlert || false,
      escalationChannel: newEntry.panicAlert ? "SMS + Teams + Email" : undefined,
      repeatOffenderCount: 0,
      isRedFlagged,
      comments: newEntry.comments
    }

    setEntries([entry, ...entries])
    setIsAddingEntry(false)
    setNewEntry({
      driverName: "",
      tractorPlate: "",
      trailerPlate: "",
      carrierReported: "",
      carrierOnFile: "",
      destinationStated: "",
      destinationDoc: "",
      decision: "Cleared",
      panicAlert: false
    })

    if (isRedFlagged) {
      toast({
        title: "⚠️ Red Flag Alert!",
        description: `Entry flagged: ${redFlagTypes.join(", ")}`,
        variant: "destructive",
      })
    }
  }

  const handlePanicAlert = () => {
    setShowPanicDialog(true)
  }

  const sendPanicAlert = () => {
    if (panicMessage.trim()) {
      toast({
        title: "🚨 PANIC ALERT BROADCAST",
        description: `Alert sent to all yards within 50 miles: "${panicMessage}"`,
        variant: "destructive",
      })
      
      // Add the panic alert to the local alerts
      const newAlert: Alert = {
        id: `local-panic-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        yard: "Current Yard - " + getYardName(yardId),
        matchedField: "PANIC BUTTON",
        redFlagType: "🚨 EMERGENCY BROADCAST",
        details: panicMessage
      }
      
      setMockAlerts([newAlert, ...mockAlerts])
      setShowPanicDialog(false)
      setPanicMessage("")
    }
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header with NFI branding */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-20 relative">
                <Image src="/nfi.png" alt="NFI" fill className="object-contain" />
              </div>
              <div className="flex items-center gap-2 border-l pl-4">
                <span className="text-xs text-muted-foreground">Powered by</span>
                <div className="h-6 w-24 relative">
                  <Image src="/prologis-logo.png" alt="Prologis" fill className="object-contain opacity-60" />
                </div>
              </div>
            </div>
            <div className="border-l pl-6">
              <h1 className="text-2xl font-semibold">Gate Log – {getYardName(yardId)}</h1>
              <p className="text-sm text-muted-foreground">Real-time yard security monitoring</p>
            </div>
          </div>
          <Button 
            variant="destructive" 
            size="lg"
            onClick={handlePanicAlert}
            className="gap-2"
          >
            <Siren className="h-5 w-5" />
            PANIC ALERT
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {/* Geo-fenced Panic Alert */}
        {geoFencedAlert && (
          <div className="px-6 pt-4">
            <Alert className="border-2 border-red-600 bg-red-50 dark:bg-red-950/20 animate-pulse">
              <Siren className="h-5 w-5" />
              <AlertDescription>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-lg text-red-900 dark:text-red-100">
                        🚨 PANIC ALERT - {geoFencedAlert.yard}
                      </span>
                      <Badge variant="destructive" className="animate-pulse">
                        {geoFencedAlert.distance}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium">Incident:</span> {geoFencedAlert.incidentType}
                      </div>
                      <div>
                        <span className="font-medium">Time:</span> {geoFencedAlert.timestamp}
                      </div>
                      <div>
                        <span className="font-medium">Vehicle:</span> {geoFencedAlert.vehicleDescription}
                      </div>
                      <div>
                        <span className="font-medium">Plate:</span> {geoFencedAlert.licensePlate}
                      </div>
                      <div>
                        <span className="font-medium">Driver:</span> {geoFencedAlert.driverName}
                      </div>
                      <div>
                        <span className="font-medium">Guard:</span> {geoFencedAlert.guardName}
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-white dark:bg-gray-900 rounded-md">
                      <p className="text-sm font-medium mb-1">Details:</p>
                      <p className="text-sm">{geoFencedAlert.details}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => {
                      toast({
                        title: "Alert Acknowledged",
                        description: "Security teams have been notified",
                      })
                      setGeoFencedAlert(null)
                    }}
                  >
                    Acknowledge
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <Tabs defaultValue="entries" className="h-full flex flex-col">
          <TabsList className="mx-6 mt-6">
            <TabsTrigger value="entries">Log Entries</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="entries" className="flex-1 overflow-auto px-6 pb-6">
            {/* Add Entry Form */}
            <Card className="p-4 mb-4">
              {!isAddingEntry ? (
                <Button onClick={() => setIsAddingEntry(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Entry
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">New Gate Entry</h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsAddingEntry(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Driver Name</Label>
                      <Input 
                        value={newEntry.driverName}
                        onChange={(e) => setNewEntry({...newEntry, driverName: e.target.value})}
                        placeholder="Enter driver name"
                      />
                    </div>
                    <div>
                      <Label>Tractor Plate</Label>
                      <Input 
                        value={newEntry.tractorPlate}
                        onChange={(e) => setNewEntry({...newEntry, tractorPlate: e.target.value})}
                        placeholder="Enter plate number"
                      />
                    </div>
                    <div>
                      <Label>Trailer Plate</Label>
                      <Input 
                        value={newEntry.trailerPlate}
                        onChange={(e) => setNewEntry({...newEntry, trailerPlate: e.target.value})}
                        placeholder="Enter trailer number"
                      />
                    </div>
                    <div>
                      <Label>Carrier (Reported)</Label>
                      <Input 
                        value={newEntry.carrierReported}
                        onChange={(e) => setNewEntry({...newEntry, carrierReported: e.target.value})}
                        placeholder="Reported carrier"
                      />
                    </div>
                    <div>
                      <Label>Carrier (On File)</Label>
                      <Input 
                        value={newEntry.carrierOnFile}
                        onChange={(e) => setNewEntry({...newEntry, carrierOnFile: e.target.value})}
                        placeholder="Carrier on file"
                      />
                    </div>
                    <div>
                      <Label>Decision</Label>
                      <Select 
                        value={newEntry.decision}
                        onValueChange={(value) => setNewEntry({...newEntry, decision: value as any})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cleared">Cleared</SelectItem>
                          <SelectItem value="Denied">Denied</SelectItem>
                          <SelectItem value="Escalated">Escalated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={newEntry.panicAlert}
                        onCheckedChange={(checked) => setNewEntry({...newEntry, panicAlert: checked})}
                      />
                      <Label>Trigger Panic Alert</Label>
                    </div>
                    <Button onClick={handleAddEntry} className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Entry
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Entries Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="sticky left-0 bg-background">Time</TableHead>
                      <TableHead>Driver Info</TableHead>
                      <TableHead>DL Details</TableHead>
                      <TableHead>Equipment</TableHead>
                      <TableHead>Carrier</TableHead>
                      <TableHead>Documentation</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Red Flags</TableHead>
                      <TableHead>Decision</TableHead>
                      <TableHead>Dwell</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entries.map((entry) => (
                      <TableRow 
                        key={entry.id} 
                        className={entry.isRedFlagged ? "bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/40" : ""}
                      >
                        <TableCell className="sticky left-0 bg-inherit">
                          <div className="text-sm space-y-1">
                            <div className="font-medium">In: {entry.timeIn}</div>
                            {entry.timeOut && <div className="text-muted-foreground">Out: {entry.timeOut}</div>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div className="font-medium">{entry.driverName}</div>
                            <div className="text-muted-foreground">Guard: {entry.guardId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div>{entry.driverDL}</div>
                            <div className="text-muted-foreground">{entry.dlState} • Exp: {entry.dlExpiry}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div className="font-medium">{entry.tractorPlate} ({entry.tractorPlateState})</div>
                            <div className="text-muted-foreground">Trailer: {entry.trailerPlate}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div className="font-medium">{entry.carrierReported}</div>
                            {entry.carrierOnFile !== entry.carrierReported && (
                              <div className="text-orange-600 dark:text-orange-400">File: {entry.carrierOnFile}</div>
                            )}
                            <div className="text-muted-foreground">{entry.mcDotNumber}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div>BOL: {entry.bolNumber}</div>
                            <div className="text-muted-foreground">PU: {entry.pickupNumber || "None"}</div>
                            <div className="text-muted-foreground">Seal: {entry.sealNumber}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div>{entry.destinationStated}</div>
                            {entry.destinationDoc !== entry.destinationStated && (
                              <div className="text-orange-600 dark:text-orange-400">Doc: {entry.destinationDoc}</div>
                            )}
                            <div className="text-muted-foreground">{entry.freightType}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {entry.redFlagTypes.length > 0 ? (
                            <div className="space-y-1">
                              {entry.redFlagTypes.slice(0, 2).map((flag, idx) => (
                                <Badge key={idx} variant="destructive" className="text-xs block w-fit">
                                  {flag}
                                </Badge>
                              ))}
                              {entry.redFlagTypes.length > 2 && (
                                <span className="text-xs text-red-600">+{entry.redFlagTypes.length - 2} more</span>
                              )}
                            </div>
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            entry.decision === "Cleared" ? "default" :
                            entry.decision === "Denied" ? "destructive" : "secondary"
                          }>
                            {entry.decision}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {entry.dwellMinutes ? (
                            <span className={cn(
                              "text-sm font-medium",
                              entry.dwellMinutes > 30 ? "text-orange-600" : "text-green-600"
                            )}>
                              {entry.dwellMinutes}m
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {entry.panicAlert && (
                              <Badge variant="destructive" className="gap-1">
                                <Siren className="h-3 w-3" />
                              </Badge>
                            )}
                            {entry.repeatOffenderCount > 0 && (
                              <Badge variant="outline" className="text-xs">
                                Repeat: {entry.repeatOffenderCount}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="flex-1 overflow-auto px-6 pb-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Security Alerts</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Shield className="h-4 w-4" />
                  <span>Geofenced alerts from Prologis network within 50 miles</span>
                </div>
              </div>
              
              <div className="grid gap-4">
                {mockAlerts.map((alert) => (
                  <Alert 
                    key={alert.id} 
                    className={cn(
                      "border-l-4",
                      alert.redFlagType.includes("EMERGENCY") 
                        ? "border-l-red-600 bg-red-50 dark:bg-red-950/20 border-2 border-red-600" 
                        : alert.yard.includes("Current Yard")
                        ? "border-l-red-600 bg-red-50 dark:bg-red-950/20" 
                        : "border-l-orange-500 bg-orange-50 dark:bg-orange-950/20"
                    )}
                  >
                    {alert.redFlagType.includes("EMERGENCY") ? (
                      <Siren className="h-4 w-4 text-red-600 animate-pulse" />
                    ) : (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                    <AlertDescription>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "font-semibold",
                              alert.redFlagType.includes("EMERGENCY") && "text-lg text-red-900 dark:text-red-100"
                            )}>
                              {alert.redFlagType}
                            </span>
                            {alert.yard.includes("Current Yard") && (
                              <Badge variant="destructive" className="text-xs">
                                {alert.redFlagType.includes("EMERGENCY") ? "YOU SENT THIS" : "This Yard"}
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {alert.yard} • {alert.timestamp}
                          </div>
                          <div className={cn(
                            "text-sm mt-2",
                            alert.redFlagType.includes("EMERGENCY") && "font-medium bg-white dark:bg-gray-900 p-2 rounded"
                          )}>
                            {alert.details}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Panic Alert Dialog */}
      <Dialog open={showPanicDialog} onOpenChange={setShowPanicDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Siren className="h-5 w-5 text-red-600" />
              Send Panic Alert
            </DialogTitle>
            <DialogDescription>
              This will immediately notify all yards within 50 miles. Include critical details about the threat.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="panic-message" className="text-base font-medium">
                Emergency Details
              </Label>
              <Textarea
                id="panic-message"
                placeholder="Example: Driver breaking in with gun - watch out black Ford F-150 with license ABC123. Male, 6ft, blue jacket. Called 911."
                value={panicMessage}
                onChange={(e) => setPanicMessage(e.target.value)}
                className="mt-2 min-h-[120px]"
                autoFocus
              />
              <p className="text-sm text-muted-foreground mt-2">
                Be specific: vehicle description, license plate, physical description, weapons, direction of travel
              </p>
            </div>

            <Alert className="border-orange-600">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-medium">This alert will be sent to:</div>
                <ul className="text-sm mt-1 space-y-1">
                  <li>• All yards within 50 miles</li>
                  <li>• Local law enforcement</li>
                  <li>• Prologis security operations center</li>
                  <li>• NFI corporate security</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPanicDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={sendPanicAlert}
              disabled={!panicMessage.trim()}
              className="gap-2"
            >
              <Siren className="h-4 w-4" />
              Send Emergency Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 