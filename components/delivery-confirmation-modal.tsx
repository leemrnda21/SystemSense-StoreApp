'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

interface DeliveryItem {
  name: string
  quantity: number
  status: 'delivered' | 'pending'
}

interface DeliveryConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  tableNumber: string
  items: DeliveryItem[]
}

export function DeliveryConfirmationModal({
  isOpen,
  onClose,
  tableNumber,
  items,
}: DeliveryConfirmationModalProps) {
  const [confirmedItems, setConfirmedItems] = useState<string[]>([])

  const handleToggleItem = (itemName: string) => {
    if (confirmedItems.includes(itemName)) {
      setConfirmedItems(confirmedItems.filter((i) => i !== itemName))
    } else {
      setConfirmedItems([...confirmedItems, itemName])
    }
  }

  const allConfirmed = confirmedItems.length === items.filter((i) => i.status === 'pending').length

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white border-4 border-green-400 rounded-3xl">
        <DialogHeader className="flex flex-col items-center text-center pb-2">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <DialogTitle className="text-xl font-bold">
            <p className="text-gray-700">Delivery to {tableNumber}</p>
            <p className="text-green-600 text-sm">Confirm Delivery Items</p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {items.map((item) => (
            <label
              key={item.name}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={confirmedItems.includes(item.name)}
                onChange={() => handleToggleItem(item.name)}
                className="w-5 h-5 rounded text-green-600"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-600">Kitchen provided ✓</p>
              </div>
              <span className="text-sm font-semibold text-gray-600">x{item.quantity}</span>
            </label>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 text-xs text-yellow-800 mb-4">
          <p className="font-semibold mb-1">Delivery Note</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Large rice: Only 1 person</li>
            <li>Hot items: Please handle with care</li>
          </ul>
        </div>

        <DialogFooter className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-lg font-semibold h-11"
          >
            Cancel
          </Button>
          <Button
            onClick={onClose}
            disabled={!allConfirmed}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold h-11"
          >
            Delivery Complete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
