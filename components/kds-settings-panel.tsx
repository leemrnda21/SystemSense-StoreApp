'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export function KDSSettingsPanel() {
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [vibration, setVibration] = useState(false)
  const [cardSize, setCardSize] = useState('large')

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Display Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Display Options */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Display Options</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-refresh" className="text-sm">
              Auto Refresh
            </Label>
            <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="text-sm">
              Notifications
            </Label>
            <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="vibration" className="text-sm">
              Vibration
            </Label>
            <Switch id="vibration" checked={vibration} onCheckedChange={setVibration} />
          </div>
        </div>

        {/* Display Mode */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Display Mode</h3>
          <RadioGroup value={cardSize} onValueChange={setCardSize}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="large" id="large" />
              <Label htmlFor="large" className="text-sm font-normal cursor-pointer">
                Large Card Display
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="compact" />
              <Label htmlFor="compact" className="text-sm font-normal cursor-pointer">
                Compact Display
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Status Legend */}
        <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
          <p className="font-semibold text-xs text-gray-600 mb-2">Status Legend</p>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-400"></div>
              <span className="text-gray-600">NEW - Urgent action required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-yellow-400"></div>
              <span className="text-gray-600">COOKING - In progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-400"></div>
              <span className="text-gray-600">DELIVERED - Ready for pickup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gray-400"></div>
              <span className="text-gray-600">ARCHIVE - Completed</span>
            </div>
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700">Save Settings</Button>
      </CardContent>
    </Card>
  )
}
