"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  Shield, 
  Siren,
  Activity,
  TrendingUp,
  Clock,
  Users
} from "lucide-react"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"

interface YardData {
  id: string
  name: string
  location: string
  totalEntries: number
  todayEntries: number
  redFlagEvents: number
  status: "active" | "inactive"
}

const mockYards: YardData[] = [
  {
    id: "nfi-long-beach-01",
    name: "NFI - Long Beach 01",
    location: "Long Beach, CA",
    totalEntries: 12479,
    todayEntries: 127,
    redFlagEvents: 14,
    status: "active"
  },
  {
    id: "nfi-camden-17",
    name: "NFI - Camden 17",
    location: "Camden, NJ",
    totalEntries: 8924,
    todayEntries: 89,
    redFlagEvents: 7,
    status: "active"
  }
]

interface YardAlertProps {
  setActiveRoute?: (route: string) => void
}

export function YardAlert({ setActiveRoute }: YardAlertProps) {
  const handleLaunchGateLog = (yardId: string) => {
    if (setActiveRoute) {
      setActiveRoute(`gate-log/${yardId}`)
    }
  }

  // Calculate totals
  const totalYards = mockYards.length
  const totalGoodActors = mockYards.reduce((acc, yard) => acc + yard.totalEntries - yard.redFlagEvents, 0)
  const totalRedFlags = mockYards.reduce((acc, yard) => acc + yard.redFlagEvents, 0)
  const avgDwellTime = 24 // minutes

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-8 w-32 relative">
              <Image src="/prologis-logo.png" alt="Prologis Logo" fill className="object-contain" />
            </div>
            <span className="text-sm text-muted-foreground">Innovations Platform</span>
          </div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Yard Alert Security Overview
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Total Yards</p>
                <p className="text-3xl font-bold mt-1">{totalYards}</p>
                <p className="text-xs text-muted-foreground mt-1">Active monitoring</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-background">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Good Actor Count</p>
                <p className="text-3xl font-bold mt-1 text-green-600 dark:text-green-400">{totalGoodActors.toLocaleString()}</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% this week
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-red-50 to-white dark:from-red-950/20 dark:to-background">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Red Flagged Events</p>
                <p className="text-3xl font-bold mt-1 text-red-600 dark:text-red-400">{totalRedFlags}</p>
                <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-background">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Avg Dwell Time</p>
                <p className="text-3xl font-bold mt-1">{avgDwellTime}</p>
                <p className="text-xs text-muted-foreground mt-1">minutes per truck</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Normal Security Alerts */}
        <div className="mb-6 space-y-3">
          <Alert className="border-l-4 border-l-yellow-600">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-medium">Insurance Expiry Warning</div>
              <div className="text-sm text-muted-foreground mt-1">
                3 carriers have insurance expiring within 7 days across the network
              </div>
            </AlertDescription>
          </Alert>
        </div>

        {/* Recent Security Activity */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Security Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="h-5 w-5 text-orange-600" />
                <h3 className="font-medium">Network-Wide Alerts (24h)</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Stolen Vehicle Reports</span>
                  <Badge variant="destructive">3</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Invalid Insurance</span>
                  <Badge variant="secondary">7</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Blacklisted Carriers</span>
                  <Badge variant="secondary">2</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Destination Mismatches</span>
                  <Badge variant="secondary">5</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium">Top Risk Patterns</h3>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-medium">Out-of-state plates</div>
                  <div className="text-muted-foreground">Nevada plates appearing 3x more than usual</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Weekend irregularities</div>
                  <div className="text-muted-foreground">47% more unscheduled arrivals on weekends</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Repeat offenders</div>
                  <div className="text-muted-foreground">Same driver denied at 3 different yards</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Yards List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Yards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockYards.map((yard) => (
              <Card key={yard.id} className="p-6 hover:shadow-lg transition-shadow border-2">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{yard.name}</h3>
                      <p className="text-sm text-muted-foreground">{yard.location}</p>
                    </div>
                  </div>
                  <Badge variant={yard.status === "active" ? "default" : "secondary"}>
                    {yard.status}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-2xl font-bold">{yard.totalEntries.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Total Entries</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{yard.todayEntries}</p>
                      <p className="text-xs text-muted-foreground">Today</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">{yard.redFlagEvents}</p>
                      <p className="text-xs text-muted-foreground">Red Flags</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Avg Dwell:</span>
                      <span className="font-medium">22 min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Guards:</span>
                      <span className="font-medium">4 active</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => handleLaunchGateLog(yard.id)}
                >
                  Launch Gate Log
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 