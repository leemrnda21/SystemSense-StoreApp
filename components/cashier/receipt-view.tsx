'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, Printer, Mail, X } from 'lucide-react'
import PaymentProcessingModal from './payment-processing-modal'

interface Props {
  tableId: string
  amount: number
  paymentMethod: string
  onNewTransaction: () => void
}

export default function ReceiptView({
  tableId,
  amount,
  paymentMethod,
  onNewTransaction,
}: Props) {
  const [showProcessing, setShowProcessing] = useState(true)
  const [isProcessingComplete, setIsProcessingComplete] = useState(false)

  const handleProcessingComplete = () => {
    setShowProcessing(false)
    setIsProcessingComplete(true)
  }

  if (showProcessing) {
    return (
      <PaymentProcessingModal
        paymentMethod={paymentMethod}
        onComplete={handleProcessingComplete}
      />
    )
  }

  const now = new Date()
  const receiptItems = [
    { name: 'Grilled Chicken Set', qty: 1, price: 290 },
    { name: 'Pork Grilled Dish Set', qty: 2, price: 520 },
    { name: 'Beer (Medium)', qty: 1, price: 80 },
    { name: 'Soft Drink', qty: 2, price: 100 },
  ]

  const subtotal = 990
  const tax = 71
  const serviceCharge = 128
  const total = 1188.77
  const change = amount - total

  return (
    <div className="space-y-6">
      {isProcessingComplete && (
        <div className="flex justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">Payment Completed</p>
          </div>
        </div>
      )}

      {/* Receipt Card */}
      <Card className="max-w-md p-8 font-mono text-sm">
        <div className="mb-4 border-b pb-4 text-center">
          <p className="font-bold">Thai Restaurant</p>
          <p className="text-xs text-gray-600">123 Main Street, Bangkok</p>
          <p className="text-xs text-gray-600">TEL: 02-123-4567</p>
        </div>

        <div className="mb-4 border-b pb-4">
          <p className="text-xs text-gray-600">
            Date: {now.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
          </p>
          <p className="text-xs text-gray-600">
            Time: {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="font-bold">Table {tableId}</p>
          <p className="text-xs text-gray-600">Order #0123</p>
        </div>

        <div className="mb-4 space-y-2 border-b pb-4">
          {receiptItems.map((item, idx) => (
            <div key={idx} className="flex justify-between text-xs">
              <span>{item.name}</span>
              <span>{item.qty}x {item.price}</span>
            </div>
          ))}
        </div>

        <div className="mb-4 space-y-1 border-b pb-4 text-xs">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Service Charge (10%):</span>
            <span>{serviceCharge}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (7%):</span>
            <span>{tax}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{total.toFixed(2)} THB</span>
          </div>
        </div>

        <div className="mb-4 border-b pb-4 text-xs">
          <p>
            Payment Method: <span className="capitalize font-bold">{paymentMethod}</span>
          </p>
          {paymentMethod === 'cash' && (
            <div>
              <p>Change: {change.toFixed(2)} THB</p>
            </div>
          )}
        </div>

        <div className="text-center text-xs text-gray-600">
          <p>Thank you for your visit!</p>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" size="lg" className="flex-1 gap-2">
          <Printer className="h-4 w-4" />
          Print
        </Button>
        <Button variant="outline" size="lg" className="flex-1 gap-2">
          <Mail className="h-4 w-4" />
          Email Receipt
        </Button>
        <Button
          onClick={onNewTransaction}
          size="lg"
          className="flex-1 gap-2 bg-green-600 text-white hover:bg-green-700"
        >
          <Check className="h-4 w-4" />
          Done
        </Button>
      </div>
    </div>
  )
}
