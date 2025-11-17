'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface OrderItem {
  name: string
  quantity: number
  notes?: string
  warning?: boolean
}

interface OrderDetailModalProps {
  isOpen: boolean
  onClose: () => void
  orderNumber: string
  tableInfo: {
    tableNumber: string
    seating: number
    orderTime: string
  }
  items: OrderItem[]
}

export function OrderDetailModal({
  isOpen,
  onClose,
  orderNumber,
  tableInfo,
  items,
}: OrderDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Order Detail {orderNumber}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Table Information */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold text-gray-900">Table Information</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Table Number</p>
                <p className="font-semibold">{tableInfo.tableNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">Seating</p>
                <p className="font-semibold">{tableInfo.seating} people</p>
              </div>
              <div>
                <p className="text-gray-500">Order Time</p>
                <p className="font-semibold">{tableInfo.orderTime}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Ordered Items</h3>
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border ${
                  item.warning ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  {item.warning && <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {item.name} x{item.quantity}
                    </p>
                    {item.notes && <p className="text-xs text-gray-600 mt-1">{item.notes}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 rounded-lg font-semibold h-11"
          >
            Cancel Order
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold h-11">
            Start Preparation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
