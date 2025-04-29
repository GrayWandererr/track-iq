"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface OutboundSorterProps {
  selectedSite: string | null
}

export function OutboundSorter({ selectedSite }: OutboundSorterProps) {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Outbound Sorter</h1>
        <div className="text-sm text-gray-500">{selectedSite} • Live View</div>
      </div>
      <Card className="flex-1">
        <CardContent className="p-0 h-full">
          <div className="relative w-full h-full min-h-[600px]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rpDEvCWSAX3HZ90Tfp59O7CQlv7iGz.png"
              alt="Outbound Sorter Visualization"
              fill
              className="object-contain"
              priority
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
