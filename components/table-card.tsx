'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users } from 'lucide-react'

interface TableCardProps {
  tableNumber: string
  capacity: number
  status: 'empty' | 'occupied' | 'ordering' | 'calling'
  orderNumber?: string
  waitTime?: string
  onClick?: () => void
}

export function TableCard({
  tableNumber,
  capacity,
  status,
  orderNumber,
  waitTime,
  onClick,
}: TableCardProps) {
  const statusColors = {
    empty: 'border-green-300 bg-green-50',
    occupied: 'border-blue-300 bg-blue-50',
    ordering: 'border-yellow-300 bg-yellow-50',
    calling: 'border-red-300 bg-red-50',
  }

  const statusBadgeColor = {
    empty: 'bg-green-100 text-green-800',
    occupied: 'bg-blue-100 text-blue-800',
    ordering: 'bg-yellow-100 text-yellow-800',
    calling: 'bg-red-100 text-red-800',
  }

  const statusLabel = {
    empty: 'Empty',
    occupied: 'Occupied',
    ordering: 'Ordering',
    calling: 'Calling',
  }

  return (
    <Card
      onClick={onClick}
      className={`p-4 cursor-pointer hover:shadow-lg transition-shadow border-2 ${statusColors[status]}`}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold text-gray-900">{tableNumber}</h3>
          <Badge className={statusBadgeColor[status]}>{statusLabel[status]}</Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{capacity} people</span>
        </div>

        {orderNumber && (
          <div className="text-sm font-semibold text-gray-900">Order: {orderNumber}</div>
        )}

        {waitTime && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{waitTime}</span>
          </div>
        )}

        <div className="w-full bg-gray-200 rounded-full h-1">
          <div className="bg-amber-500 h-1 rounded-full" style={{ width: '60%' }}></div>
        </div>
      </div>
    </Card>
  )
}
