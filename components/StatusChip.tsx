import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusChipProps {
  status: 'running' | 'warning' | 'stopped' | 'healthy' | 'error'
  className?: string
  showIcon?: boolean
}

export function StatusChip({ status, className, showIcon = true }: StatusChipProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'running':
      case 'healthy':
        return {
          color: 'bg-green-500/20 text-green-400 border-green-500/30',
          icon: '🟢'
        }
      case 'warning':
        return {
          color: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
          icon: '🟡'
        }
      case 'stopped':
      case 'error':
        return {
          color: 'bg-red-500/20 text-red-400 border-red-500/30',
          icon: '🔴'
        }
      default:
        return {
          color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
          icon: '⚪'
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Badge 
      className={cn(
        "text-xs font-medium border",
        config.color,
        className
      )}
    >
      {showIcon && <span className="mr-1">{config.icon}</span>}
      {status.toUpperCase()}
    </Badge>
  )
} 