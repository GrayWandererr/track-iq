"use client"

import { Bell, ChevronRight, Plus, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

interface TopBarProps {
  selectedSite: string | null
  setSelectedSite: (site: string | null) => void
  setActiveRoute: (route: string) => void
}

export function TopBar({ selectedSite, setSelectedSite, setActiveRoute }: TopBarProps) {
  const sites = ["Jupiter DC", "Mars DC", "Venus DC"]

  const handleSiteChange = (site: string) => {
    setSelectedSite(site)
    // Reset to the main site dashboard when changing sites
    setActiveRoute("Site Dashboard")
  }

  return (
    <header className="h-14 border-b border-border bg-card px-4 flex items-center justify-between">
      {/* Left Cluster */}
      <div className="flex items-center">
        {/* Site Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1 rounded-full">
              {selectedSite || "Select Site"}
              <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {sites.map((site) => (
              <DropdownMenuItem key={site} onClick={() => handleSiteChange(site)}>
                {site}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Breadcrumb */}
        <div className="ml-4 flex items-center text-sm text-muted-foreground">
          {selectedSite ? (
            <>
              <span>Site</span>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="font-medium text-foreground">{selectedSite}</span>
            </>
          ) : (
            <>
              <span>Network</span>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="font-medium text-foreground">Prologis Innovation Platform</span>
            </>
          )}
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="text" placeholder="Search..." className="w-full pl-9 h-9" />
        </div>
      </div>

      {/* Right Cluster */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Bell className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Plus className="h-5 w-5" />
        </Button>

        <div className="relative">
          <div className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background" />
          <Avatar className="h-8 w-8">
            <AvatarImage src="/vibrant-street-market.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
