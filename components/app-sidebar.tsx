"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  BarChart3,
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Cog,
  Forklift,
  HelpCircle,
  LineChart,
  Monitor,
  Network,
  Package,
  PackageCheck,
  PackageOpen,
  BotIcon as Robot,
  Scan,
  ShoppingCart,
  SortAsc,
  Truck,
  Warehouse,
  Workflow,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface AppSidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  activeRoute: string
  setActiveRoute: (route: string) => void
  selectedSite: string | null
}

// Define icons for nested menu items
const siteIcons: Record<string, React.ReactNode> = {
  Yard: <Warehouse className="w-4 h-4 mr-2" />,
  "Dock/Door": <Truck className="w-4 h-4 mr-2" />,
  Receiving: <PackageOpen className="w-4 h-4 mr-2" />,
  Putaway: <Forklift className="w-4 h-4 mr-2" />,
  "Order Management": <ClipboardList className="w-4 h-4 mr-2" />,
  "Wave Management": <BarChart3 className="w-4 h-4 mr-2" />,
  Picking: <ShoppingCart className="w-4 h-4 mr-2" />,
  Packing: <Package className="w-4 h-4 mr-2" />,
  Consolidation: <PackageCheck className="w-4 h-4 mr-2" />,
  Staging: <Forklift className="w-4 h-4 mr-2" />,
  Shipping: <Truck className="w-4 h-4 mr-2" />,
  Parcel: <Package className="w-4 h-4 mr-2" />,
  B2B: <Network className="w-4 h-4 mr-2" />,
}

const displayIcons: Record<string, React.ReactNode> = {
  "Outbound Sorter": <SortAsc className="w-4 h-4 mr-2" />,
  "Unit Sorter": <Scan className="w-4 h-4 mr-2" />,
  "Put-to-Light": <Monitor className="w-4 h-4 mr-2" />,
  "Locus Robots": <Robot className="w-4 h-4 mr-2" />,
  "Digital Twin": <Workflow className="w-4 h-4 mr-2" />,
}

export function AppSidebar({
  isCollapsed,
  onToggleCollapse,
  activeRoute,
  setActiveRoute,
  selectedSite,
}: AppSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  // Auto-open the section that contains the active route
  useEffect(() => {
    if (activeRoute.includes("Site Dashboard") && activeRoute !== "Network Dashboard") {
      setOpenSections((prev) => ({ ...prev, site: true }))
    } else if (activeRoute.includes("Display Dashboards")) {
      setOpenSections((prev) => ({ ...prev, display: true }))
    }
  }, [activeRoute])

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleNavClick = (route: string) => {
    setActiveRoute(route)
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white border-r border-gray-800 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[72px]" : "w-[240px]",
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center p-4 h-16", isCollapsed ? "justify-center" : "px-6")}>
        <div className="flex items-center gap-3">
          {isCollapsed ? (
            <div className="w-8 h-8 relative">
              <Image src="/track-iq-logo.svg" alt="TrackIQ Logo" fill className="object-contain" />
            </div>
          ) : (
            <div className="h-8 w-32 relative">
              <Image src="/track-iq-logo.svg" alt="TrackIQ Logo" fill className="object-contain" />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {/* Network Dashboard */}
          <NavItem
            icon={<Network className="w-5 h-5" />}
            label="Network Dashboard"
            isCollapsed={isCollapsed}
            isActive={activeRoute === "Network Dashboard"}
            onClick={() => handleNavClick("Network Dashboard")}
          />

          {/* Site Dashboard - Only show nested items if a site is selected */}
          <NavItemWithChildren
            icon={<Building2 className="w-5 h-5" />}
            label="Site Dashboard"
            isCollapsed={isCollapsed}
            isOpen={openSections["site"]}
            onToggle={() => toggleSection("site")}
            isActive={activeRoute.includes("Site Dashboard")}
            onClick={() => handleNavClick("Site Dashboard")}
            disabled={!selectedSite}
            children={
              selectedSite
                ? [
                    "Yard",
                    "Dock/Door",
                    "Receiving",
                    "Putaway",
                    "Order Management",
                    "Wave Management",
                    "Picking",
                    "Packing",
                    "Consolidation",
                    "Staging",
                    "Shipping",
                    "Parcel",
                    "B2B",
                  ]
                : []
            }
            onChildClick={(child) => handleNavClick(`Site Dashboard - ${child}`)}
            activeChild={activeRoute.replace("Site Dashboard - ", "")}
            childIcons={siteIcons}
          />

          {/* Display Dashboards - Only show nested items if a site is selected */}
          <NavItemWithChildren
            icon={<Monitor className="w-5 h-5" />}
            label="Display Dashboards"
            isCollapsed={isCollapsed}
            isOpen={openSections["display"]}
            onToggle={() => toggleSection("display")}
            isActive={activeRoute.includes("Display Dashboards")}
            onClick={() => handleNavClick("Display Dashboards")}
            disabled={!selectedSite}
            children={
              selectedSite ? ["Outbound Sorter", "Unit Sorter", "Put-to-Light", "Locus Robots", "Digital Twin"] : []
            }
            onChildClick={(child) => handleNavClick(`Display Dashboards - ${child}`)}
            activeChild={activeRoute.replace("Display Dashboards - ", "")}
            childIcons={displayIcons}
          />

          {/* Reports */}
          <NavItem
            icon={<LineChart className="w-5 h-5" />}
            label="Reports"
            isCollapsed={isCollapsed}
            isActive={activeRoute === "Reports"}
            onClick={() => handleNavClick("Reports")}
          />

          {/* Admin & Config */}
          <NavItem
            icon={<Cog className="w-5 h-5" />}
            label="Admin & Config"
            isCollapsed={isCollapsed}
            isActive={activeRoute === "Admin & Config"}
            onClick={() => handleNavClick("Admin & Config")}
          />

          {/* Help */}
          <NavItem
            icon={<HelpCircle className="w-5 h-5" />}
            label="Help"
            isCollapsed={isCollapsed}
            isActive={activeRoute === "Help"}
            onClick={() => handleNavClick("Help")}
          />
        </ul>
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className={cn(
            "w-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-800",
            isCollapsed ? "px-2" : "",
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  isCollapsed: boolean
  isActive?: boolean
  disabled?: boolean
  onClick?: () => void
}

function NavItem({ icon, label, isCollapsed, isActive, disabled, onClick }: NavItemProps) {
  return (
    <li>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start font-normal h-10 transition-colors",
          isCollapsed ? "px-2" : "",
          isActive ? "bg-[#7773b6] text-white hover:bg-[#6a67a3]" : "text-gray-300 hover:bg-gray-800 hover:text-white",
          disabled && "opacity-50 cursor-not-allowed",
        )}
        onClick={onClick}
        disabled={disabled}
      >
        <span className="flex items-center">
          {icon}
          {!isCollapsed && <span className="ml-3">{label}</span>}
        </span>
      </Button>
    </li>
  )
}

interface NavItemWithChildrenProps extends NavItemProps {
  isOpen: boolean
  onToggle: () => void
  children: string[]
  onChildClick?: (child: string) => void
  activeChild?: string
  childIcons?: Record<string, React.ReactNode>
}

function NavItemWithChildren({
  icon,
  label,
  isCollapsed,
  isActive,
  isOpen,
  onToggle,
  children,
  disabled,
  onClick,
  onChildClick,
  activeChild,
  childIcons,
}: NavItemWithChildrenProps) {
  if (isCollapsed) {
    return (
      <NavItem
        icon={icon}
        label={label}
        isCollapsed={isCollapsed}
        isActive={isActive}
        disabled={disabled}
        onClick={onClick}
      />
    )
  }

  return (
    <li>
      <Collapsible open={isOpen && !disabled} onOpenChange={disabled ? undefined : onToggle}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start font-normal h-10 transition-colors",
              isActive
                ? "bg-[#7773b6] text-white hover:bg-[#6a67a3]"
                : "text-gray-300 hover:bg-gray-800 hover:text-white",
              disabled && "opacity-50 cursor-not-allowed",
            )}
            disabled={disabled}
            onClick={onClick}
          >
            <span className="flex items-center w-full">
              {icon}
              <span className="ml-3">{label}</span>
              <ChevronRight className={cn("ml-auto h-4 w-4 transition-transform", isOpen && "transform rotate-90")} />
            </span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="pl-9 mt-1 space-y-1">
            {children.map((item) => (
              <li key={item}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full justify-start font-normal h-8 transition-colors",
                    activeChild === item
                      ? "bg-[#7773b6] text-white hover:bg-[#6a67a3]"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white",
                  )}
                  onClick={() => onChildClick?.(item)}
                >
                  {childIcons?.[item]}
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  )
}
