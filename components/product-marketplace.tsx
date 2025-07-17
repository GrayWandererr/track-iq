"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Shield, 
  Camera, 
  BarChart3, 
  Cpu, 
  Package, 
  Building,
  Zap,
  Search,
  ExternalLink,
  Play,
  Calculator,
  Rocket,
  Bot,
  Cloud,
  Workflow,
  Battery,
  Gift
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name: string
  description: string
  category: string
  classification: "prologis" | "venture" | "partner"
  icon: React.ReactNode
  ctaText: string
  ctaAction: string
  hasCalculator?: boolean
}

const products: Product[] = [
  // Prologis Innovation Products
  {
    id: "yard-alert",
    name: "Yard Alert",
    description: "Multi-tenant yard security platform with real-time threat detection",
    category: "Security & Operations",
    classification: "prologis",
    icon: <Shield className="h-8 w-8" />,
    ctaText: "View Product",
    ctaAction: "/yard-alert"
  },
  {
    id: "yard-security",
    name: "Yard Security",
    description: "AI-driven camera surveillance for comprehensive yard monitoring",
    category: "Security & Operations",
    classification: "prologis",
    icon: <Camera className="h-8 w-8" />,
    ctaText: "View Demo",
    ctaAction: "#"
  },
  {
    id: "warehouse-security",
    name: "Warehouse Security",
    description: "AI-based camera alerts for dock doors & trailer monitoring",
    category: "Security & Operations",
    classification: "prologis",
    icon: <Building className="h-8 w-8" />,
    ctaText: "View Demo",
    ctaAction: "#"
  },
  {
    id: "analytics-control-tower",
    name: "Analytics Control Tower",
    description: "Real-time multi-site visibility and performance dashboard",
    category: "Analytics",
    classification: "prologis",
    icon: <BarChart3 className="h-8 w-8" />,
    ctaText: "Launch Dashboard",
    ctaAction: "/network-dashboard"
  },
  {
    id: "digital-twin",
    name: "Digital Twin - Simulation",
    description: "Run what-if scenarios using real warehouse layout and data",
    category: "Simulation",
    classification: "prologis",
    icon: <Cpu className="h-8 w-8" />,
    ctaText: "Run Simulation",
    ctaAction: "#"
  },
  // Venture Investments
  {
    id: "locus-robotics",
    name: "Locus Robotics",
    description: "Autonomous mobile robots (AMRs) for pick optimization",
    category: "Robotics",
    classification: "venture",
    icon: <Bot className="h-8 w-8" />,
    ctaText: "Launch AMR Calculator",
    ctaAction: "/innovation/tools/locus-amr-calculator",
    hasCalculator: true
  },
  {
    id: "logiwa-wms",
    name: "Logiwa WMS",
    description: "Cloud-native WMS designed for DTC and eCommerce fulfillment",
    category: "WMS",
    classification: "venture",
    icon: <Cloud className="h-8 w-8" />,
    ctaText: "Calculate WMS ROI",
    ctaAction: "/innovation/tools/logiwa-roi-calculator",
    hasCalculator: true
  },
  {
    id: "svt-robotics",
    name: "SVT Robotics",
    description: "Rapid warehouse automation deployment platform",
    category: "Robotics",
    classification: "venture",
    icon: <Workflow className="h-8 w-8" />,
    ctaText: "Learn More",
    ctaAction: "#"
  },
  {
    id: "flexe",
    name: "Flexe",
    description: "On-demand warehousing and fulfillment network",
    category: "Supply Chain",
    classification: "venture",
    icon: <Package className="h-8 w-8" />,
    ctaText: "Learn More",
    ctaAction: "#"
  },
  {
    id: "sendoso",
    name: "Sendoso",
    description: "Direct mail and gifting platform for B2B engagement",
    category: "Marketing",
    classification: "venture",
    icon: <Gift className="h-8 w-8" />,
    ctaText: "Learn More",
    ctaAction: "#"
  },
  // Partner Tools
  {
    id: "synop",
    name: "Synop",
    description: "Smart EV charging infrastructure and energy management",
    category: "Energy",
    classification: "partner",
    icon: <Zap className="h-8 w-8" />,
    ctaText: "Learn More",
    ctaAction: "#"
  },
  {
    id: "redaptive",
    name: "Redaptive",
    description: "Energy efficiency retrofits and sustainability solutions",
    category: "Energy",
    classification: "partner",
    icon: <Battery className="h-8 w-8" />,
    ctaText: "Learn More",
    ctaAction: "#"
  }
]

const categories = ["All", "Security & Operations", "Analytics", "Simulation", "Robotics", "WMS", "Supply Chain", "Energy", "Marketing"]

export function ProductMarketplace() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedClassification, setSelectedClassification] = useState("all")

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesClassification = selectedClassification === "all" || product.classification === selectedClassification
    
    return matchesSearch && matchesCategory && matchesClassification
  })

  const handleProductAction = (action: string) => {
    if (action.startsWith("/")) {
      router.push(action)
    } else if (action === "#") {
      // Handle modal or placeholder action
      console.log("Feature coming soon")
    }
  }

  const getClassificationBadge = (classification: string) => {
    switch (classification) {
      case "prologis":
        return <Badge className="bg-green-600 hover:bg-green-700">🟢 Prologis Innovation</Badge>
      case "venture":
        return <Badge className="bg-blue-600 hover:bg-blue-700">🔵 Venture Investment</Badge>
      case "partner":
        return <Badge className="bg-orange-600 hover:bg-orange-700">🟠 Partner Tool</Badge>
      default:
        return null
    }
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-8 w-32 relative">
              <Image src="/prologis-logo.png" alt="Prologis Logo" fill className="object-contain" />
            </div>
            <span className="text-sm text-muted-foreground">Innovations Platform</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Prologis Innovation Marketplace</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Explore industry-defining technology—from in-house innovations to leading venture-backed partners.
          </p>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedClassification} onValueChange={setSelectedClassification}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Classification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="prologis">Prologis Innovation</SelectItem>
                <SelectItem value="venture">Venture Investment</SelectItem>
                <SelectItem value="partner">Partner Tool</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="p-6 hover:shadow-lg transition-shadow flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {product.icon}
                  </div>
                  {product.hasCalculator && (
                    <Badge variant="secondary" className="gap-1">
                      <Calculator className="h-3 w-3" />
                      Calculator
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{product.description}</p>
                
                <div className="space-y-3">
                  {getClassificationBadge(product.classification)}
                  
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                  
                  <Button 
                    className="w-full gap-2"
                    onClick={() => handleProductAction(product.ctaAction)}
                  >
                    {product.ctaText}
                    {product.ctaAction === "#" ? (
                      <ExternalLink className="h-4 w-4" />
                    ) : product.hasCalculator ? (
                      <Calculator className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 