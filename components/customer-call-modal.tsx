'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Bell, Clock } from 'lucide-react'

interface CustomerCallModalProps {
  isOpen: boolean
  onClose: () => void
  tableNumber: string
  callTime: string
  elapsedTime: string
  onResponse?: () => void
}

export function CustomerCallModal({
  isOpen,
  onClose,
  tableNumber,
  callTime,
  elapsedTime,
  onResponse,
}: CustomerCallModalProps) {
  const [responded, setResponded] = useState(false)

  const handleResponded = () => {
    setResponded(true)
    onResponse?.()
    setTimeout(onClose, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white border-4 border-red-400 rounded-3xl">
        <DialogHeader className="flex flex-col items-center text-center pb-4">
          <div className="bg-rose-100 p-4 rounded-full mb-4">
            <Bell className="w-12 h-12 text-red-500 animate-bounce" />
          </div>
          <DialogTitle className="text-xl font-bold">
            <p className="text-gray-700">{tableNumber}</p>
            <p className="text-red-500">Customer Call</p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-center py-4">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Called at: {callTime}</span>
          </div>
          <div className="text-sm text-red-600 font-semibold">Elapsed time: {elapsedTime}</div>
        </div>

        <DialogFooter className="flex gap-3 pt-4">
          <Button
            onClick={handleResponded}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold h-12"
          >
            {responded ? '✓ Responded' : 'Responded'}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white border-0 rounded-lg font-semibold h-12"
          >
            Assign to Other Staff
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
