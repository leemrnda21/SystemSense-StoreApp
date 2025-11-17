'use client'

import { useState } from 'react'
import { CommonHeader } from '@/components/common-header'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'

export default function SettingsPage() {
  const [deviceName, setDeviceName] = useState('Kitchen-iPad-01')
  const [displayMode, setDisplayMode] = useState('standard')
  const [language, setLanguage] = useState('ja')
  const [timezone, setTimezone] = useState('Asia/Bangkok')
  const [currency, setCurrency] = useState('THB')
  const [notificationVolume, setNotificationVolume] = useState([50])

  return (
    <div className="min-h-screen bg-gray-50">
      <CommonHeader title="Device & Notification Settings" subtitle="System Configuration" />

      <div className="p-6 max-w-2xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>KDS Device Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Device Name</label>
              <Input
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                placeholder="Kitchen-iPad-01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Display Mode</label>
              <Select value={displayMode} onValueChange={setDisplayMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Display</SelectItem>
                  <SelectItem value="compact">Compact Display</SelectItem>
                  <SelectItem value="large">Large Display</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Notification Volume</label>
              <Slider value={notificationVolume} onValueChange={setNotificationVolume} min={0} max={100} />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Language & Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Store Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ja">日本語 (Japanese)</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="th">ไทย (Thai)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Timezone</label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Bangkok">Asia/Bangkok (UTC+7)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="THB">THB (฿)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Offline Mode Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="offline-save" defaultChecked />
              <label htmlFor="offline-save" className="text-sm font-medium cursor-pointer">
                Save orders to queue when offline
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="auto-sync" defaultChecked />
              <label htmlFor="auto-sync" className="text-sm font-medium cursor-pointer">
                Auto-resend when connection restored
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Retry Attempts</label>
              <Input type="number" defaultValue="3" className="w-32" />
            </div>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
