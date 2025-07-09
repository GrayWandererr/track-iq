"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function NetworkDashboard() {
  return (
    <div className="h-full w-full">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Network Level Executive Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <div className="relative w-full h-full bg-card rounded-lg overflow-hidden">
            <iframe
              title="NetworkDashboardWithoutLogo"
              src="https://app.powerbi.com/reportEmbed?reportId=f138cbff-5808-41ab-8b8b-812f9730e503&autoAuth=true&ctid=0861cd9f-3d1e-46c3-b687-68e9b6ca794e"
              className="absolute inset-0 w-full h-full border-0 bg-background"
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
