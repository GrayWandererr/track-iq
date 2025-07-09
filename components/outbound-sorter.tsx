"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface OutboundSorterProps {
  selectedSite: string | null
}

export function OutboundSorter({ selectedSite }: OutboundSorterProps) {
  const title = selectedSite ? `${selectedSite} - Outbound Sorter` : "Outbound Sorter"

  return (
    <div className="h-full w-full">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <div className="relative w-full h-full bg-card rounded-lg overflow-hidden p-4">
            <div className="relative w-full h-full">
              <Image
                src="/outbound-sorter.png"
                alt="Outbound Sorter Display"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
