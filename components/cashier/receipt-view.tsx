'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, Printer, Mail, X } from 'lucide-react'
import PaymentProcessingModal from './payment-processing-modal'
import { useRef } from 'react'

interface ReceiptItem {
  name: string
  qty: number
  price: number
}

interface Props {
  tableId: string
  amount: number
  paymentMethod: string
  onNewTransaction: () => void
  onPriceUpdate?: (newAmount: number) => void
  receiptItems?: ReceiptItem[]
  cashReceived?: number
}

export default function ReceiptView({
  tableId,
  amount,
  paymentMethod,
  onNewTransaction,
  onPriceUpdate,
  receiptItems: initialItems = [],
  cashReceived = 0,
}: Props) {
  const [showProcessing, setShowProcessing] = useState(true)
  const [isProcessingComplete, setIsProcessingComplete] = useState(false)
  const [receiptItems, setReceiptItems] = useState<ReceiptItem[]>(initialItems)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [tempPrice, setTempPrice] = useState<string>('')
  const [totalAmount, setTotalAmount] = useState(amount)
  const receiptRef = useRef<HTMLDivElement>(null)

  const handleProcessingComplete = () => {
    setShowProcessing(false)
    setIsProcessingComplete(true)
  }

  const handlePriceChange = (index: number) => {
    const newPrice = parseFloat(tempPrice)
    if (!isNaN(newPrice) && newPrice >= 0) {
      const updated = [...receiptItems]
      updated[index].price = newPrice
      setReceiptItems(updated)
      setEditingIndex(null)
      setTempPrice('')
    }
  }

  const handlePrint = () => {
    if (receiptRef.current) {
      const printWindow = window.open('', '', 'height=600,width=800')
      if (printWindow) {
        printWindow.document.write('<html><head><title>Receipt</title>')
        printWindow.document.write('<style>body { font-family: monospace; padding: 20px; }</style>')
        printWindow.document.write('</head><body>')
        printWindow.document.write(receiptRef.current.innerHTML)
        printWindow.document.write('</body></html>')
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  const handleEmailReceipt = () => {
    const receiptText = `Receipt for Table ${tableId}
Items:
${receiptItems.map(item => `${item.name}: ${item.qty}x ${item.price}`).join('\n')}

Total: ${amount.toFixed(2)} THB
Payment Method: ${paymentMethod}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}`

    alert(`Receipt will be emailed to customer.\n\n${receiptText}`)
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
  const total = amount
  const change = cashReceived > 0 ? cashReceived - total : 0

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
      <div ref={receiptRef}>
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

          {/* Items Section */}
          <div className="mb-4 space-y-2 border-b pb-4">
            {receiptItems.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <span>{item.name}</span>
                <span className="font-mono">{item.qty}x {item.price.toFixed(0)}</span>
              </div>
            ))}
          </div>

          {/* Totals Section - Simplified to just show the total */}
          <div className="mb-4 border-b pb-4 text-xs">
            <div className="flex justify-between font-bold text-sm">
              <span>Total:</span>
              <span className="font-mono text-base text-amber-600">{total.toFixed(2)} THB</span>
            </div>
          </div>

          <div className="mb-4 border-b pb-4 text-xs">
            <p>
              Payment Method: <span className="capitalize font-bold">{paymentMethod}</span>
            </p>
            {paymentMethod === 'cash' && (
              <div>
                <p>Amount Received: {cashReceived.toFixed(2)} THB</p>
                <p className={change >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  Change: {change.toFixed(2)} THB
                </p>
              </div>
            )}
          </div>

          <div className="text-center text-xs text-gray-600">
            <p>Thank you for your visit!</p>
          </div>
        </Card>
      </div>

      {/* Price Adjustment Section */}
      <Card className="border-amber-200 bg-amber-50 p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Adjust Item Prices</h3>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {receiptItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2 rounded-lg bg-white p-3 border border-gray-200">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-600">Qty: {item.qty}</p>
              </div>
              {editingIndex === idx ? (
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={tempPrice}
                    onChange={(e) => setTempPrice(e.target.value)}
                    className="w-20 px-2 py-1 border rounded text-sm"
                    placeholder="0.00"
                    autoFocus
                  />
                  <Button
                    size="sm"
                    onClick={() => handlePriceChange(idx)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    ✓
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingIndex(null)}
                  >
                    ✕
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditingIndex(idx)
                    setTempPrice(item.price.toString())
                  }}
                  className="text-right text-sm font-semibold text-amber-600 hover:text-amber-700 cursor-pointer min-w-16"
                >
                  {item.price.toFixed(2)} THB
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Updated Total Display */}
        <div className="mt-4 p-3 bg-white rounded-lg border border-amber-300">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Bill Total:</span>
            <span className="text-xl font-bold text-amber-600">{total.toFixed(2)} THB</span>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" size="lg" className="flex-1 gap-2" onClick={handlePrint}>
          <Printer className="h-4 w-4" />
          Print
        </Button>
        <Button variant="outline" size="lg" className="flex-1 gap-2" onClick={handleEmailReceipt}>
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
