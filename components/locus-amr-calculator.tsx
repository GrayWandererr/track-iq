"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Bot, 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users,
  Package,
  Activity,
  ArrowRight,
  Info
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function LocusAMRCalculator() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    dailyOrderVolume: "",
    currentPickRate: "",
    warehouseSize: "",
    currentHeadcount: ""
  })

  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setFormData({
        ...formData,
        [field]: value
      })
      setShowResults(false)
    }
  }

  const calculateROI = () => {
    const orderVolume = parseInt(formData.dailyOrderVolume) || 0
    const pickRate = parseInt(formData.currentPickRate) || 0
    const warehouseSize = parseInt(formData.warehouseSize) || 0
    const headcount = parseInt(formData.currentHeadcount) || 0

    // Calculations based on provided logic
    const robotsNeeded = Math.ceil((orderVolume * 1.3) / 1200)
    const pickRateIncrease = 40 // 40% increase
    const newPickRate = Math.round(pickRate * 1.4)
    const laborSavings = Math.round(headcount * 45000 * 0.3)
    const paybackPeriod = 18 // months (static)
    
    // Additional calculations for demo
    const productivityGain = Math.round((newPickRate - pickRate) / pickRate * 100)
    const reducedLaborNeeds = Math.round(headcount * 0.3)
    const annualSavings = laborSavings
    const totalInvestment = robotsNeeded * 125000 // Estimated cost per robot

    return {
      robotsNeeded,
      pickRateIncrease,
      newPickRate,
      laborSavings,
      paybackPeriod,
      productivityGain,
      reducedLaborNeeds,
      annualSavings,
      totalInvestment
    }
  }

  const handleCalculate = () => {
    if (formData.dailyOrderVolume && formData.currentPickRate && 
        formData.warehouseSize && formData.currentHeadcount) {
      setShowResults(true)
    }
  }

  const results = showResults ? calculateROI() : null

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push("/innovation/product-marketplace")}
                className="gap-2"
              >
                ← Back to Marketplace
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-600 hover:bg-blue-700">🔵 Venture Investment</Badge>
              <div className="h-8 w-32 relative">
                <Image src="/prologis-logo.png" alt="Prologis" fill className="object-contain" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Bot className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Locus AMR Productivity Calculator</h1>
              <p className="text-lg text-muted-foreground mt-1">
                Calculate your ROI with autonomous mobile robots for warehouse picking
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Form */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Warehouse Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dailyOrderVolume">Daily Order Volume</Label>
                  <Input
                    id="dailyOrderVolume"
                    type="text"
                    placeholder="e.g., 10000"
                    value={formData.dailyOrderVolume}
                    onChange={(e) => handleInputChange("dailyOrderVolume", e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Number of orders processed per day</p>
                </div>

                <div>
                  <Label htmlFor="currentPickRate">Current Pick Rate (lines/hour)</Label>
                  <Input
                    id="currentPickRate"
                    type="text"
                    placeholder="e.g., 100"
                    value={formData.currentPickRate}
                    onChange={(e) => handleInputChange("currentPickRate", e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Average lines picked per hour per worker</p>
                </div>

                <div>
                  <Label htmlFor="warehouseSize">Warehouse Size (sq ft)</Label>
                  <Input
                    id="warehouseSize"
                    type="text"
                    placeholder="e.g., 100000"
                    value={formData.warehouseSize}
                    onChange={(e) => handleInputChange("warehouseSize", e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Total square footage of picking area</p>
                </div>

                <div>
                  <Label htmlFor="currentHeadcount">Current Labor Headcount</Label>
                  <Input
                    id="currentHeadcount"
                    type="text"
                    placeholder="e.g., 50"
                    value={formData.currentHeadcount}
                    onChange={(e) => handleInputChange("currentHeadcount", e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Number of picking associates</p>
                </div>

                <Button 
                  className="w-full mt-6"
                  onClick={handleCalculate}
                  disabled={!formData.dailyOrderVolume || !formData.currentPickRate || 
                           !formData.warehouseSize || !formData.currentHeadcount}
                >
                  Calculate ROI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {showResults && results ? (
                <>
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      AMR Solution Summary
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center gap-2">
                          <Bot className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Robots Needed</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-600">{results.robotsNeeded}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          <span className="font-medium">Pick Rate Increase</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">+{results.pickRateIncrease}%</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center gap-2">
                          <Package className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">New Pick Rate</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-600">{results.newPickRate} lines/hr</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-background">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Financial Impact
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-green-600" />
                          <span className="font-medium">Annual Labor Savings</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">
                          ${results.laborSavings.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-orange-600" />
                          <span className="font-medium">Labor Reduction</span>
                        </div>
                        <span className="text-2xl font-bold text-orange-600">-{results.reducedLaborNeeds} FTEs</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Payback Period</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-600">{results.paybackPeriod} months</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg flex items-start gap-2">
                      <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-yellow-900 dark:text-yellow-100">Investment Estimate</p>
                        <p className="text-yellow-800 dark:text-yellow-200">
                          ${results.totalInvestment.toLocaleString()} ({results.robotsNeeded} robots × $125,000)
                        </p>
                      </div>
                    </div>
                  </Card>
                </>
              ) : (
                <Card className="p-6">
                  <div className="text-center py-12">
                    <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Ready to Calculate Your ROI?</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      Enter your warehouse details to see how Locus Robotics AMRs can transform your picking operations.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 