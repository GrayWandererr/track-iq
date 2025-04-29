"use client"

import Image from "next/image"
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
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-X6Y7Q7hPCSwvbvz3Qm0SRbcLvtmMIP.png"
              alt="Waves & Order Flow Dashboard"
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
