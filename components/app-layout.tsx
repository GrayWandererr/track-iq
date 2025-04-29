"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AppSidebar } from "./app-sidebar"
import { TopBar } from "./top-bar"
import { NetworkDashboard } from "./network-dashboard"
import { SiteDashboard } from "./site-dashboard"
import { WaveManagement } from "./wave-management"
import { OutboundSorter } from "./outbound-sorter"

export function AppLayout({ children }: { children: React.ReactNode }) {
  // State for sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(false)

  // State for active route
  const [activeRoute, setActiveRoute] = useState("Network Dashboard")

  // State for selected site
  const [selectedSite, setSelectedSite] = useState<string | null>(null)

  // Toggle sidebar collapse
  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev)
  }

  // Handle keyboard shortcut (Shift + L) to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "L") {
        toggleCollapse()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Render content based on active route
  const renderContent = () => {
    if (activeRoute === "Network Dashboard") {
      return <NetworkDashboard />
    } else if (activeRoute === "Site Dashboard" && selectedSite) {
      return <SiteDashboard selectedSite={selectedSite} />
    } else if (activeRoute === "Site Dashboard - Wave Management" && selectedSite) {
      return <WaveManagement selectedSite={selectedSite} />
    } else if (activeRoute === "Display Dashboards - Outbound Sorter" && selectedSite) {
      return <OutboundSorter selectedSite={selectedSite} />
    } else if (activeRoute.includes("Site Dashboard -") && selectedSite) {
      // For specific site dashboard sections
      const section = activeRoute.replace("Site Dashboard - ", "")
      return (
        <div className="h-full w-full flex items-center justify-center text-gray-400">
          {section} content for {selectedSite} will appear here
        </div>
      )
    } else if (activeRoute.includes("Display Dashboards") && selectedSite) {
      // For display dashboards
      const section = activeRoute.replace("Display Dashboards - ", "")
      return (
        <div className="h-full w-full flex items-center justify-center text-gray-400">
          {section || "Display Dashboards"} content for {selectedSite} will appear here
        </div>
      )
    } else {
      return (
        children || (
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            {activeRoute} content will appear here
          </div>
        )
      )
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <AppSidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
        selectedSite={selectedSite}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar selectedSite={selectedSite} setSelectedSite={setSelectedSite} setActiveRoute={setActiveRoute} />
        <main className="flex-1 overflow-auto bg-white p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
