"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Cloud, 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users,
  Percent,
  Activity,
  ArrowRight,
  Info,
  CheckCircle,
  AlertTriangle
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function LogiwaROICalculator() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    dailyOrderVolume: "",
    currentErrorRate: "",
    numberOfUsers: "",
    avgLaborCost: ""
  })

  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    // Allow numbers and decimal for error rate and labor cost
    if (field === "currentErrorRate" || field === "avgLaborCost") {
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setFormData({
          ...formData,
          [field]: value
        })
        setShowResults(false)
      }
    } else {
      // Only integers for other fields
      if (value === "" || /^\d+$/.test(value)) {
        setFormData({
          ...formData,
          [field]: value
        })
        setShowResults(false)
      }
    }
  }

  const calculateROI = () => {
    const orderVolume = parseInt(formData.dailyOrderVolume) || 0
    const currentErrorRate = parseFloat(formData.currentErrorRate) || 0
    const numberOfUsers = parseInt(formData.numberOfUsers) || 0
    const avgLaborCost = parseFloat(formData.avgLaborCost) || 0

    // Calculations based on provided logic
    const productivityIncrease = 15 // 15% increase
    const errorReduction = currentErrorRate * 0.6
    const newErrorRate = currentErrorRate - errorReduction
    const laborSavings = Math.round(numberOfUsers * avgLaborCost * 0.15)
    const licenseCostPerUser = 1800
    const totalLicenseCost = numberOfUsers * licenseCostPerUser
    const roi = Math.round((laborSavings / totalLicenseCost) * 100)
    const paybackMonths = 12 // static
    
    // Additional calculations for demo
    const annualOrderVolume = orderVolume * 365
    const errorReductionCount = Math.round(annualOrderVolume * (errorReduction / 100))
    const timeSavingsHours = Math.round(numberOfUsers * 40 * 0.15) // Weekly hours saved
    const totalAnnualSavings = laborSavings + (errorReductionCount * 25) // $25 per error avoided

    return {
      productivityIncrease,
      errorReduction,
      newErrorRate,
      laborSavings,
      roi,
      paybackMonths,
      totalLicenseCost,
      errorReductionCount,
      timeSavingsHours,
      totalAnnualSavings
    }
  }

  const handleCalculate = () => {
    if (formData.dailyOrderVolume && formData.currentErrorRate && 
        formData.numberOfUsers && formData.avgLaborCost) {
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
              <Cloud className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Logiwa WMS ROI Estimator</h1>
              <p className="text-lg text-muted-foreground mt-1">
                Calculate your return on investment with cloud-native WMS for eCommerce
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
                Operation Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dailyOrderVolume">Daily Order Volume</Label>
                  <Input
                    id="dailyOrderVolume"
                    type="text"
                    placeholder="e.g., 5000"
                    value={formData.dailyOrderVolume}
                    onChange={(e) => handleInputChange("dailyOrderVolume", e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Average orders processed per day</p>
                </div>

                <div>
                  <Label htmlFor="currentErrorRate">Current Error Rate (%)</Label>
                  <Input
                    id="currentErrorRate"
                    type="text"
                    placeholder="e.g., 2.5"
                    value={formData.currentErrorRate}
                    onChange={(e) => handleInputChange("currentErrorRate", e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Percentage of orders with errors</p>
                </div>

                <div>
                  <Label htmlFor="numberOfUsers">Number of Users</Label>
                  <Input
                    id="numberOfUsers"
                    type="text"
                    placeholder="e.g., 25"
                    value={formData.numberOfUsers}
                    onChange={(e) => handleInputChange("numberOfUsers", e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Total warehouse system users</p>
                </div>

                <div>
                  <Label htmlFor="avgLaborCost">Average Labor Cost/User ($)</Label>
                  <Input
                    id="avgLaborCost"
                    type="text"
                    placeholder="e.g., 45000"
                    value={formData.avgLaborCost}
                    onChange={(e) => handleInputChange("avgLaborCost", e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Annual salary per warehouse worker</p>
                </div>

                <Button 
                  className="w-full mt-6"
                  onClick={handleCalculate}
                  disabled={!formData.dailyOrderVolume || !formData.currentErrorRate || 
                           !formData.numberOfUsers || !formData.avgLaborCost}
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
                      Performance Improvements
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          <span className="font-medium">Productivity Increase</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">+{results.productivityIncrease}%</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-orange-600" />
                          <span className="font-medium">Error Reduction</span>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-orange-600">
                            -{results.errorReduction.toFixed(1)}%
                          </span>
                          <p className="text-xs text-muted-foreground">
                            New rate: {results.newErrorRate.toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">Time Saved Weekly</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-600">{results.timeSavingsHours} hrs</span>
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
                          <span className="font-medium">Labor Savings</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">
                          ${results.laborSavings.toLocaleString()}/yr
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Errors Avoided</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-600">
                          {results.errorReductionCount.toLocaleString()}/yr
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center gap-2">
                          <Percent className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">ROI</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-600">{results.roi}%</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-orange-600" />
                          <span className="font-medium">Payback Period</span>
                        </div>
                        <span className="text-2xl font-bold text-orange-600">{results.paybackMonths} months</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-green-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-green-900 dark:text-green-100">Total Annual Savings</p>
                          <p className="text-green-800 dark:text-green-200">
                            ${results.totalAnnualSavings.toLocaleString()} 
                            <span className="text-xs ml-1">(including error reduction benefits)</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-yellow-900 dark:text-yellow-100">License Investment</p>
                          <p className="text-yellow-800 dark:text-yellow-200">
                            ${results.totalLicenseCost.toLocaleString()}/year ({formData.numberOfUsers} users × $1,800)
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              ) : (
                <Card className="p-6">
                  <div className="text-center py-12">
                    <Cloud className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Ready to Estimate Your ROI?</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      Enter your operational details to see how Logiwa's cloud-native WMS can transform your fulfillment operations.
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