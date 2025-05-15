"use client"

import { Card, CardContent } from "@/components/ui/card"

interface WaveManagementProps {
  selectedSite: string | null
}

export function WaveManagement({ selectedSite }: WaveManagementProps) {
  return (
    <div className="h-full w-full flex flex-col">
      <Card className="flex-1">
        <CardContent className="p-0 h-full">
          <div className="relative w-full h-full min-h-[600px]">
            <iframe 
              title="OperationalWaveDashboardwithoutLogo" 
              width="100%" 
              height="100%" 
              src="https://app.powerbi.com/reportEmbed?reportId=15dbcfe8-2cd9-462f-aed9-46f5a2f8bd68&autoAuth=true&ctid=0861cd9f-3d1e-46c3-b687-68e9b6ca794e" 
              frameBorder="0" 
              allowFullScreen={true}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
