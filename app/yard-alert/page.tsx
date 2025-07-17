"use client"

import { YardAlert } from "@/components/yard-alert"
import { useRouter } from "next/navigation"

export default function YardAlertPage() {
  const router = useRouter()
  
  const handleSetActiveRoute = (route: string) => {
    if (route.startsWith("gate-log/")) {
      router.push(`/yard-alert/${route}`)
    }
  }

  return <YardAlert setActiveRoute={handleSetActiveRoute} />
} 