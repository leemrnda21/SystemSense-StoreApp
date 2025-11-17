'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'

interface Props {
  amount: number
  onApply: (discount: number) => void
  onClose: () => void
}

export default function DiscountModal({ amount, onApply, onClose }: Props) {
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('percent')
  const [discountValue, setDiscountValue] = useState('')

  const calculateDiscount = () => {
    const value = parseFloat(discountValue) || 0
    if (discountType === 'percent') {
      return (amount * value) / 100
    }
    return value
  }

  const handleApply = () => {
    const discount = calculateDiscount()
    if (discount > 0) {
      onApply(discount)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Apply Discount</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">Current Amount: {amount} THB</p>

          <div className="flex gap-2">
            <Button
              variant={discountType === 'percent' ? 'default' : 'outline'}
              onClick={() => setDiscountType('percent')}
              className="flex-1"
            >
              Percentage (%)
            </Button>
            <Button
              variant={discountType === 'fixed' ? 'default' : 'outline'}
              onClick={() => setDiscountType('fixed')}
              className="flex-1"
            >
              Fixed Amount
            </Button>
          </div>

          <Input
            type="number"
            placeholder={
              discountType === 'percent'
                ? 'Enter percentage'
                : 'Enter discount amount'
            }
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
          />

          <div className="space-y-2">
            <Button onClick={() => setDiscountValue('5')} variant="outline" className="w-full">
              5% OFF
            </Button>
            <Button onClick={() => setDiscountValue('10')} variant="outline" className="w-full">
              10% OFF
            </Button>
            <Button onClick={() => setDiscountValue('20')} variant="outline" className="w-full">
              Member Discount
            </Button>
            <Button onClick={() => setDiscountValue('10')} variant="outline" className="w-full">
              Senior Discount
            </Button>
          </div>

          <div className="rounded-lg bg-blue-50 p-3">
            <p className="text-sm text-gray-600">Discount Amount:</p>
            <p className="text-2xl font-bold text-blue-600">
              {calculateDiscount().toFixed(2)} THB
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleApply} className="flex-1 bg-blue-600 text-white">
              Apply
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
