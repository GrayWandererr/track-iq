import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Save } from "lucide-react"

interface JsonFormProps {
  data: Record<string, any>
  onSubmit: (data: Record<string, any>) => Promise<void>
  title?: string
  className?: string
}

export function JsonForm({ data, onSubmit, title = "Configuration", className }: JsonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState(data)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const renderField = (key: string, value: any) => {
    const fieldType = typeof value
    
    switch (fieldType) {
      case 'boolean':
        return (
          <div key={key} className="flex items-center justify-between py-2">
            <Label htmlFor={key} className="text-sm font-medium">
              {formatLabel(key)}
            </Label>
            <Switch
              id={key}
              checked={formData[key]}
              onCheckedChange={(checked) => updateField(key, checked)}
            />
          </div>
        )
        
      case 'number':
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key} className="text-sm font-medium">
              {formatLabel(key)}
            </Label>
            <Input
              id={key}
              type="number"
              value={formData[key]}
              onChange={(e) => updateField(key, parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        )
        
      case 'string':
        if (key.toLowerCase().includes('password') || key.toLowerCase().includes('secret')) {
          return (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="text-sm font-medium">
                {formatLabel(key)}
              </Label>
              <Input
                id={key}
                type="password"
                value={formData[key]}
                onChange={(e) => updateField(key, e.target.value)}
                className="w-full"
              />
            </div>
          )
        }
        
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key} className="text-sm font-medium">
              {formatLabel(key)}
            </Label>
            <Input
              id={key}
              type="text"
              value={formData[key]}
              onChange={(e) => updateField(key, e.target.value)}
              className="w-full"
            />
          </div>
        )
        
      case 'object':
        if (Array.isArray(value)) {
          return (
            <div key={key} className="space-y-2">
              <Label className="text-sm font-medium">
                {formatLabel(key)}
              </Label>
              <div className="flex flex-wrap gap-1">
                {value.map((item, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {item.toString()}
                  </Badge>
                ))}
              </div>
              <Input
                placeholder={`Add to ${formatLabel(key).toLowerCase()}...`}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const input = e.target as HTMLInputElement
                    if (input.value.trim()) {
                      updateField(key, [...formData[key], input.value.trim()])
                      input.value = ''
                    }
                  }
                }}
                className="w-full text-xs"
              />
            </div>
          )
        }
        
        return (
          <div key={key} className="space-y-2">
            <Label className="text-sm font-medium">
              {formatLabel(key)}
            </Label>
            <Card className="border-dashed">
              <CardContent className="p-3">
                <pre className="text-xs text-muted-foreground">
                  {JSON.stringify(value, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </div>
        )
        
      default:
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key} className="text-sm font-medium">
              {formatLabel(key)}
            </Label>
            <Input
              id={key}
              value={formData[key]?.toString() || ''}
              onChange={(e) => updateField(key, e.target.value)}
              className="w-full"
            />
          </div>
        )
    }
  }

  const formatLabel = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/_/g, ' ')
  }

  return (
    <Card className={cn("border-border bg-card", className)}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(data).map(([key, value]) => renderField(key, value))}
          
          <div className="flex justify-end pt-4 border-t">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Configuration'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 