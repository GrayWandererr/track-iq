"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface WaveManagementProps {
  selectedSite: string | null
}

export function WaveManagement({ selectedSite }: WaveManagementProps) {
  const title = selectedSite ? `${selectedSite} - Wave Management` : "Wave Management"

  return (
    <div className="h-full w-full">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <div className="relative w-full h-full bg-card rounded-lg overflow-hidden">
            <iframe
              title="OperationalWaveDashboardwithoutLogo"
              src="https://app.powerbi.com/reportEmbed?reportId=15dbcfe8-2cd9-462f-aed9-46f5a2f8bd68&autoAuth=true&ctid=0861cd9f-3d1e-46c3-b687-68e9b6ca794e"
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
