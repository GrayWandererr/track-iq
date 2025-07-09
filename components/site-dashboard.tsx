"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface SiteDashboardProps {
  selectedSite: string | null
}

export function SiteDashboard({ selectedSite }: SiteDashboardProps) {
  const siteTitle = selectedSite ? `${selectedSite} - Site Level Dashboard` : "Site Level Dashboard"

  return (
    <div className="h-full w-full">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>{siteTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <div className="relative w-full h-full bg-card rounded-lg overflow-hidden">
            <iframe
              title="SitelLevelDashboardwithoutlogo"
              src="https://app.powerbi.com/reportEmbed?reportId=5a20f1a9-880c-4c1c-ab97-7b9b911ff432&autoAuth=true&ctid=0861cd9f-3d1e-46c3-b687-68e9b6ca794e"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              style={{ 
                filter: 'brightness(0.95)', 
                borderRadius: '0.5rem' 
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
