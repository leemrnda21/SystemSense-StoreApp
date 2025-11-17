'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { X, Plus, Minus } from 'lucide-react'

interface Props {
  amount: number
  onClose: () => void
}

export default function SplitPaymentModal({ amount, onClose }: Props) {
  const [numPeople, setNumPeople] = useState(1)
  const [splitType, setSplitType] = useState<'equal' | 'custom'>('equal')

  const amountPerPerson = (amount / numPeople).toFixed(2)

  const handleIncrement = () => setNumPeople(Math.min(numPeople + 1, 20))
  const handleDecrement = () => setNumPeople(Math.max(numPeople - 1, 1))

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Split Payment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-3xl font-bold text-blue-600">{amount.toFixed(2)} THB</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Select Split Method</h3>
            <button
              onClick={() => setSplitType('equal')}
              className={`w-full rounded-lg border-2 p-4 text-left transition ${
                splitType === 'equal'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Equal Split</p>
                  <p className="text-sm text-gray-600">Divide equally by number of people</p>
                </div>
                <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
              </div>
            </button>

            <button
              onClick={() => setSplitType('custom')}
              className={`w-full rounded-lg border-2 p-4 text-left transition ${
                splitType === 'custom'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Custom Split</p>
                  <p className="text-sm text-gray-600">Set custom amount per person</p>
                </div>
                <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
              </div>
            </button>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Number of People
            </label>
            <div className="flex items-center gap-4 rounded-lg bg-blue-50 p-4">
              <Button
                size="sm"
                variant="destructive"
                onClick={handleDecrement}
                className="h-10 w-10 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={numPeople}
                onChange={(e) => setNumPeople(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 border-0 bg-white text-center text-lg font-bold"
              />
              <Button
                size="sm"
                className="h-10 w-10 bg-green-600 p-0 text-white hover:bg-green-700"
                onClick={handleIncrement}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-lg border-2 border-green-500 bg-green-50 p-4">
            <p className="text-sm text-gray-600">Amount per Person</p>
            <p className="text-2xl font-bold text-green-600">{amountPerPerson} THB</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={onClose} className="flex-1 bg-green-600 text-white">
              Start Split Payment
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
