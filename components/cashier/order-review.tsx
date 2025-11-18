"use client"

import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Printer, Edit2, CreditCard } from 'lucide-react'

type Item = {
  name: string
  qty: number
  price: number
  note?: string
}

interface Props {
  tableId: string | null
  items: Item[]
  amount: number
  onProceed: () => void
  onEdit: () => void
  onBack: () => void
}

export default function OrderReview({ tableId, items, amount, onProceed, onEdit, onBack }: Props) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0)
  const service = Math.round(subtotal * 0.1)
  const tax = Math.round(subtotal * 0.07)
  const total = subtotal + service + tax

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold">Order Review</h2>
            <p className="text-sm text-gray-600">Table {tableId ?? '—'}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-2" /> Print
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-start">
              <div>
                <div className="font-medium">{item.name}</div>
                {item.note && <div className="text-xs text-gray-500">{item.note}</div>}
              </div>
              <div className="text-right">
                <div className="font-mono">{item.qty} x {item.price.toFixed(0)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-mono">{subtotal.toFixed(2)} THB</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Service (10%)</span>
            <span className="font-mono">{service.toFixed(2)} THB</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (7%)</span>
            <span className="font-mono">{tax.toFixed(2)} THB</span>
          </div>
          <div className="flex justify-between items-center bg-sky-50 p-3 rounded mt-2">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-bold text-sky-600">{total.toFixed(2)} THB</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
          <Button onClick={onEdit} variant="ghost" className="flex-1"><Edit2 className="w-4 h-4 mr-2"/> Edit Order</Button>
          <Button onClick={onProceed} className="flex-1 bg-emerald-600 text-white"><CreditCard className="w-4 h-4 mr-2"/> Proceed to Payment</Button>
        </div>
      </Card>
    </div>
  )
}
