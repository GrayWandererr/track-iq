"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2, RefreshCw } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function DigitalTwinStudio() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [key, setKey] = useState(0) // For iframe refresh
  
  const webrtcUrl = "http://172.30.176.1:8111/streaming/webrtc-demo/?server=172.30.176.1"
  
  const handleRefresh = () => {
    setKey(prev => prev + 1)
  }
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="h-full w-full p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Digital Twin Studio</h1>
            <p className="text-muted-foreground mt-2">
              Real-time 3D visualization powered by NVIDIA Omniverse
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Live Stream
            </Badge>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              className="h-9 w-9"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFullscreen}
              className="h-9 w-9"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <Card className="h-[calc(100vh-200px)]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Warehouse Digital Twin</CardTitle>
            <Badge variant="secondary">NVIDIA Omniverse</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 h-[calc(100%-60px)]">
          <iframe
            key={key}
            src={webrtcUrl}
            className="w-full h-full rounded-b-lg"
            style={{ border: 'none' }}
            allow="camera; microphone; display-capture"
            allowFullScreen
          />
        </CardContent>
      </Card>
    </div>
  )
} 