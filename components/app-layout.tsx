"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { TopBar } from "@/components/top-bar"
import { NetworkDashboard } from "@/components/network-dashboard"
import { SiteDashboard } from "@/components/site-dashboard"
import { WaveManagement } from "@/components/wave-management"
import { OutboundSorter } from "@/components/outbound-sorter"
import AgentStudio from "@/components/agent-studio"
import ConnectorsPage from "@/app/connectors/page"
import { YardAlert } from "@/components/yard-alert"
import { GateLog } from "@/components/gate-log"
import { ProductMarketplace } from "@/components/product-marketplace"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { initializeStore } from "@/store/useAgentStore"
import { usePathname } from "next/navigation"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [activeRoute, setActiveRoute] = useState<string>("Network Dashboard")
  const [selectedSite, setSelectedSite] = useState<string | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    // Initialize the store with mock data when app loads
    initializeStore()
  }, [])

  // Check if we're on a special page that doesn't need the sidebar
  const isCanvasEditorPage = pathname.startsWith('/canvas-editor/')
  const isReferenceGuidePage = pathname === '/reference-guide'
  
  if (isCanvasEditorPage || isReferenceGuidePage) {
    return <>{children}</>
  }

  const getContent = () => {
    const isConnectorsPage = pathname === '/connectors'
    
    if (isConnectorsPage) {
      return <ConnectorsPage />
    }

    // Handle different route patterns
    if (activeRoute === "Network Dashboard") {
      return <NetworkDashboard />
    } else if (activeRoute === "Site Dashboard") {
      return <SiteDashboard selectedSite={selectedSite} />
    } else if (activeRoute === "Site Dashboard - Wave Management") {
      return <WaveManagement selectedSite={selectedSite} />
    } else if (activeRoute === "Display Dashboard - Outbound Sorter") {
      return <OutboundSorter selectedSite={selectedSite} />
    } else if (activeRoute === "Agent Studio") {
      return <AgentStudio />
    } else if (activeRoute === "Yard Alert") {
      return <YardAlert setActiveRoute={setActiveRoute} />
    } else if (activeRoute.startsWith("gate-log/")) {
      // Handle dynamic gate log routes
      const yardId = activeRoute.replace("gate-log/", "")
      return <GateLog yardId={yardId} />
    } else if (activeRoute === "Yard Security") {
      return (
        <div className="h-full w-full flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Yard Security</h2>
            <p>Yard security features will appear here</p>
          </div>
        </div>
      )
    } else if (activeRoute === "Warehouse Security") {
      return (
        <div className="h-full w-full flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Warehouse Security</h2>
            <p>Warehouse security features will appear here</p>
          </div>
        </div>
      )
    } else if (activeRoute === "Product Marketplace") {
      return <ProductMarketplace />
    } else if (activeRoute === "Display Dashboards") {
      return (
        <div className="h-full w-full flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Display Dashboards</h2>
            <p>Select a display dashboard from the sidebar</p>
          </div>
        </div>
      )
    } else if (activeRoute === "Reports") {
      return (
        <div className="h-full w-full flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Reports</h2>
            <p>Reports functionality will appear here</p>
          </div>
        </div>
      )
    } else if (activeRoute === "Admin & Config") {
      return (
        <div className="h-full w-full flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Admin & Config</h2>
            <p>Administration and configuration options will appear here</p>
          </div>
        </div>
      )
    } else if (activeRoute === "Connectors") {
      return <ConnectorsPage />
    } else if (activeRoute.includes("Site Dashboard -")) {
      // For site dashboard sections (operational dashboards)
      const section = activeRoute.replace("Site Dashboard - ", "")
      return (
        <div className="h-full w-full flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">{section}</h2>
            <p>Operational dashboard for {section} will appear here</p>
          </div>
        </div>
      )
    } else if (activeRoute.includes("Display Dashboard -")) {
      // For display dashboard sections
      const section = activeRoute.replace("Display Dashboard - ", "")
      return (
        <div className="h-full w-full flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">{section}</h2>
            <p>Display dashboard for {section} will appear here</p>
          </div>
        </div>
      )
    } else {
      return (
        children || (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground">
            <p>Select an option from the sidebar</p>
          </div>
        )
      )
    }
  }

  return (
    <>
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <AppSidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          activeRoute={activeRoute}
          setActiveRoute={setActiveRoute}
          selectedSite={selectedSite}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar selectedSite={selectedSite} setSelectedSite={setSelectedSite} setActiveRoute={setActiveRoute} />
          <main className="flex-1 overflow-auto bg-background p-6">
            <div className="h-full">
              {getContent()}
            </div>
          </main>
        </div>
        <Toaster />
      </div>
    </>
  )
}
