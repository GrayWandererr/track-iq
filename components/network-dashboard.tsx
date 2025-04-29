"use client"

import { Card, CardContent } from "@/components/ui/card"

export function NetworkDashboard() {
  return (
    <div className="h-full w-full flex flex-col">
      <Card className="flex-1">
        <CardContent className="p-0 h-full">
          <div className="relative w-full h-full min-h-[600px]">
            <iframe
              title="Network Level Executive Dashboard"
              src="https://app.powerbi.com/reportEmbed?reportId=1593b2d9-ae37-456e-8a94-d7963445aebc&autoAuth=true&ctid=0861cd9f-3d1e-46c3-b687-68e9b6ca794e"
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
