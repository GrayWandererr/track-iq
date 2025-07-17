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
  Zap,
  Telescope,
  Link,
  Settings,
  ShoppingBag,
  Palette,
  Layout,
  Users,
  ExternalLink,
  AlertTriangle,
  Shield,
  ShieldCheck,
  Store,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"

interface AppSidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  activeRoute: string
  setActiveRoute: (route: string) => void
  selectedSite: string | null
}

// Define icons for operational dashboards (under Site Dashboard)
const operationalIcons: Record<string, React.ReactNode> = {
  Yard: <Warehouse className="w-4 h-4 mr-2" />,
  "Dock / Door": <Truck className="w-4 h-4 mr-2" />,
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

// Define icons for display dashboards
const displayDashboardIcons: Record<string, React.ReactNode> = {
  "Outbound Sorter": <SortAsc className="w-4 h-4 mr-2" />,
  "Unit Sorter": <Scan className="w-4 h-4 mr-2" />,
  "Put-to-Light": <Monitor className="w-4 h-4 mr-2" />,
  "Locus Robots": <Robot className="w-4 h-4 mr-2" />,
}

// Define icons for Agent Studio sub-items
const agentStudioIcons: Record<string, React.ReactNode> = {
  "Design Canvas": <Palette className="w-4 h-4 mr-2" />,
  "Templates Gallery": <Layout className="w-4 h-4 mr-2" />,
  "Active Agents": <Users className="w-4 h-4 mr-2" />,
}

export function AppSidebar({
  isCollapsed,
  onToggleCollapse,
  activeRoute,
  setActiveRoute,
  selectedSite,
}: AppSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  // Auto-open sections based on active route
  useEffect(() => {
    if (activeRoute.includes("Site Dashboard") && activeRoute !== "Site Dashboard") {
      setOpenSections((prev) => ({ ...prev, site: true }))
    } else if (activeRoute.includes("Display Dashboard")) {
      setOpenSections((prev) => ({ ...prev, display: true }))
    } else if (activeRoute.includes("Agent Studio")) {
      setOpenSections((prev) => ({ ...prev, agentStudio: true }))
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

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[72px]" : "w-[240px]",
      )}
    >
      {/* Logo/Brand */}
      <div className={cn("flex items-center p-4 h-16 border-b border-sidebar-border", isCollapsed ? "justify-center" : "px-6")}>
        <div className="flex items-center gap-3">
          {isCollapsed ? (
            <div className="w-8 h-8 relative">
              <Image src="/prologis-logo.png" alt="Prologis Logo" fill className="object-contain" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="h-8 w-32 relative">
                <Image src="/prologis-logo.png" alt="Prologis Logo" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-sidebar-foreground/70 text-xs">Innovations</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {!isCollapsed && <SectionDivider label="Analytics" />}

          {/* Network Dashboard */}
          <NavItem
            icon={<Network className="w-5 h-5" />}
            label="Network Dashboard"
            isCollapsed={isCollapsed}
            isActive={activeRoute === "Network Dashboard"}
            onClick={() => handleNavClick("Network Dashboard")}
          />

          {/* Site Dashboard - Collapsible with operational dashboards */}
          <NavItemWithChildren
            icon={<Building2 className="w-5 h-5" />}
            label="Site Dashboard"
            isCollapsed={isCollapsed}
            isOpen={openSections["site"]}
            onToggle={() => toggleSection("site")}
            isActive={activeRoute.includes("Site Dashboard")}
            onClick={() => handleNavClick("Site Dashboard")}
            children={[
              "Yard",
              "Dock / Door",
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
            ]}
            onChildClick={(child) => handleNavClick(`Site Dashboard - ${child}`)}
            activeChild={activeRoute.replace("Site Dashboard - ", "")}
            childIcons={operationalIcons}
          />

          {/* Display Dashboards - Collapsible with display dashboard modules */}
          <NavItemWithChildren
            icon={<Monitor className="w-5 h-5" />}
            label="Display Dashboards"
            isCollapsed={isCollapsed}
            isOpen={openSections["display"]}
            onToggle={() => toggleSection("display")}
            isActive={activeRoute.includes("Display Dashboard")}
            onClick={() => handleNavClick("Display Dashboards")}
            children={[
              "Outbound Sorter",
              "Unit Sorter", 
              "Put-to-Light",
              "Locus Robots",
            ]}
            onChildClick={(child) => handleNavClick(`Display Dashboard - ${child}`)}
            activeChild={activeRoute.replace("Display Dashboard - ", "")}
            childIcons={displayDashboardIcons}
          />

          {!isCollapsed && <SectionDivider label="AI & Extension Layer" />}

          {/* AI & Extension Layer */}
          <NavItem
            icon={<Zap className="w-5 h-5" />}
            label="Agent Studio"
            isCollapsed={isCollapsed}
            isActive={activeRoute === "Agent Studio"}
            onClick={() => handleNavClick("Agent Studio")}
          />

          <NavItem
            icon={<Telescope className="w-5 h-5" />}
            label="Digital Twin Studio"
            isCollapsed={isCollapsed}
            isActive={activeRoute === "Digital Twin Studio"}
            onClick={() => handleNavClick("Digital Twin Studio")}
          />

          {!isCollapsed && <SectionDivider label="Product Hub" />}

          <NavItem
            icon={<AlertTriangle className="w-5 h-5" />}
            label="Yard Alert"
            isCollapsed={isCollapsed}
            isActive={activeRoute === "Yard Alert"}
            onClick={() => handleNavClick("Yard Alert")}
          />

          <NavItem
            icon={<Shield className="w-5 h-5" />}
            label="Yard Security"
            isCollapsed={isCollapsed}
            isActive={activeRoute === "Yard Security"}
            onClick={() => handleNavClick("Yard Security")}
          />

          <NavItem
            icon={<ShieldCheck className="w-5 h-5" />}
            label="Warehouse Security"
            isCollapsed={isCollapsed}
            isActive={activeRoute === "Warehouse Security"}
            onClick={() => handleNavClick("Warehouse Security")}
          />

          <NavItem
            icon={<Store className="w-5 h-5" />}
            label="Product Marketplace"
            isCollapsed={isCollapsed}
            isActive={activeRoute === "Product Marketplace"}
            onClick={() => handleNavClick("Product Marketplace")}
          />

          {!isCollapsed && <SectionDivider label="Integrations" />}

          {/* Integrations */}
          <NavItemWithExternalLink
            icon={<Link className="w-5 h-5" />}
            label="Integrations Hub"
            isCollapsed={isCollapsed}
            onClick={() => handleExternalLink("#")}
          />

          <NavItem
            icon={<Settings className="w-5 h-5" />}
            label="Connectors"
            isCollapsed={isCollapsed}
            isActive={activeRoute === "Connectors"}
            onClick={() => handleNavClick("Connectors")}
          />

          <NavItemWithExternalLink
            icon={<ShoppingBag className="w-5 h-5" />}
            label="Essentials Marketplace"
            isCollapsed={isCollapsed}
            onClick={() => handleExternalLink("#")}
          />

          {!isCollapsed && <SectionDivider label="Admin & Reports" />}

          {/* Admin & Reports */}
          <NavItem
            icon={<LineChart className="w-5 h-5" />}
            label="Reports"
            isCollapsed={isCollapsed}
            isActive={activeRoute === "Reports"}
            onClick={() => handleNavClick("Reports")}
          />

          <NavItem
            icon={<Cog className="w-5 h-5" />}
            label="Admin & Config"
            isCollapsed={isCollapsed}
            isActive={activeRoute === "Admin & Config"}
            onClick={() => handleNavClick("Admin & Config")}
          />
        </ul>
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className={cn(
            "w-full flex items-center justify-center text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
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

// Section Divider Component
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center py-2 px-2">
      <Separator className="flex-1" />
      <span className="px-2 text-xs text-sidebar-foreground/60 uppercase tracking-wider">
        {label}
      </span>
      <Separator className="flex-1" />
    </div>
  )
}

// Navigation Item Component
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
          isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
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

// Navigation Item with External Link Component
interface NavItemWithExternalLinkProps extends NavItemProps {
  subtitle?: string
}

function NavItemWithExternalLink({ icon, label, isCollapsed, onClick, subtitle }: NavItemWithExternalLinkProps) {
  return (
    <li>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start font-normal h-10 transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isCollapsed ? "px-2" : "",
        )}
        onClick={onClick}
      >
        <span className="flex items-center w-full">
          {icon}
          {!isCollapsed && (
            <div className="flex items-center justify-between w-full ml-3">
              <div className="flex flex-col">
                <span>{label}</span>
                {subtitle && <span className="text-xs text-sidebar-foreground/60">{subtitle}</span>}
              </div>
              <ExternalLink className="h-3 w-3 text-sidebar-foreground/40" />
            </div>
          )}
        </span>
      </Button>
    </li>
  )
}

// Navigation Item with Children Component
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
        onClick={onClick}
      />
    )
  }

  return (
    <li>
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start font-normal h-10 transition-colors",
              isActive
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
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
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
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
