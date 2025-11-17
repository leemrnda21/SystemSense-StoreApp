'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { QrCode, Clock } from 'lucide-react'

interface OrderItem {
  name: string
  quantity: number
  price: number
  status: 'delivered' | 'cooking' | 'pending'
}

interface TableDetailModalProps {
  isOpen: boolean
  onClose: () => void
  tableNumber: string
  seating: number
  orderNumber: string
  items: OrderItem[]
  orderTime: string
  estimatedTime: string
  total: number
  onDeliveryConfirmed?: () => void
}

export function TableDetailModal({
  isOpen,
  onClose,
  tableNumber,
  seating,
  orderNumber,
  items,
  orderTime,
  estimatedTime,
  total,
  onDeliveryConfirmed,
}: TableDetailModalProps) {
  const handleDeliveryConfirmed = () => {
    onDeliveryConfirmed?.()
  }

  const handleAddAdditionalOrder = () => {
    console.log('[v0] Add additional order for table:', tableNumber)
    alert(`Open new order form for ${tableNumber}`)
  }

  const handleCallOutResponse = () => {
    console.log('[v0] Call out response for table:', tableNumber)
    alert(`Mark call responded for ${tableNumber}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{tableNumber} Details</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              ← Back
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 space-y-2">
                <p className="text-xs text-gray-500">Basic Information</p>
                <div>
                  <p className="text-xs text-gray-600">Seating</p>
                  <p className="font-semibold text-gray-900">{seating} people</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Status</p>
                  <p className="font-semibold text-gray-900">In use</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Order Time</p>
                  <p className="font-semibold text-gray-900">{orderTime}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-2">
                <p className="text-xs text-gray-500">Current Order</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">Order Number</p>
                    <p className="font-semibold text-blue-600">{orderNumber}</p>
                  </div>
                  <QrCode className="w-16 h-16 text-gray-300 border border-gray-200 p-2 rounded" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Items</p>
                  <p className="font-semibold text-gray-900">{items.length} items</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Amount</p>
                  <p className="font-semibold text-gray-900">{total} THB</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Items List */}
          <div className="space-y-2">
            <p className="font-semibold text-gray-900">Order Items List</p>
            {items.map((item, idx) => (
              <Card
                key={idx}
                className={`border-l-4 ${
                  item.status === 'delivered'
                    ? 'border-l-green-500 bg-green-50'
                    : item.status === 'cooking'
                      ? 'border-l-yellow-500 bg-yellow-50'
                      : 'border-l-gray-300 bg-gray-50'
                }`}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-600">
                      {item.status === 'delivered'
                        ? 'Delivered'
                        : item.status === 'cooking'
                          ? 'Cooking'
                          : 'Pending'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">x{item.quantity}</p>
                    <p className="text-sm font-semibold text-blue-600">{item.price} THB</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <DialogFooter className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1 rounded-lg font-semibold h-11"
            onClick={handleDeliveryConfirmed}
          >
            Delivery Confirmed
          </Button>
          <Button
            onClick={handleAddAdditionalOrder}
            className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold h-11"
          >
            Add Additional Order
          </Button>
          <Button
            variant="destructive"
            className="flex-1 rounded-lg font-semibold h-11"
            onClick={handleCallOutResponse}
          >
            Call Out Response
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
