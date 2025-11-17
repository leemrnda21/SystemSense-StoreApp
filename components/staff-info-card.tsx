'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/lib/store'
import { MapPin } from 'lucide-react'

export function StaffInfoCard() {
  const { user } = useStore()

  if (!user) return null

  const roleColors = {
    manager: 'bg-blue-100 text-blue-800',
    hall: 'bg-emerald-100 text-emerald-800',
    kitchen: 'bg-orange-100 text-orange-800',
  }

  return (
    <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-gray-700">Current Staff</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-xs text-gray-600">Name</p>
          <p className="font-semibold text-gray-900">{user.name}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Email</p>
          <p className="font-semibold text-gray-900 text-sm">{user.email}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Role</p>
          <Badge className={roleColors[user.role]}>
            {user.role.toUpperCase()}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600 mt-3 pt-3 border-t">
          <MapPin className="w-3 h-3" />
          <span>Restaurant Bangkok</span>
        </div>
      </CardContent>
    </Card>
  )
}
