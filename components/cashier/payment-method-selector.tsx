'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CreditCard, Banknote, Smartphone, Wallet, ChevronLeft } from 'lucide-react'
import DiscountModal from './discount-modal'
import SplitPaymentModal from './split-payment-modal'

interface Props {
  tableId: string
  amount: number
  onPaymentComplete: (method: string, cashReceived?: number) => void
  onBack: () => void
}

type PaymentMethod = 'cash' | 'card' | 'qr' | 'ewallet' | null

export default function PaymentMethodSelector({
  tableId,
  amount,
  onPaymentComplete,
  onBack,
}: Props) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null)
  const [cashReceived, setCashReceived] = useState('')
  const [showDiscount, setShowDiscount] = useState(false)
  const [showSplit, setShowSplit] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [finalAmount, setFinalAmount] = useState(amount)

  const handleDiscountApply = (discountAmount: number) => {
    setDiscount(discountAmount)
    setFinalAmount(amount - discountAmount)
  }

  const handlePayment = () => {
    if (selectedMethod === 'cash' && !cashReceived) {
      alert('Please enter cash received amount')
      return
    }
    const receivedAmount = selectedMethod === 'cash' ? parseFloat(cashReceived) : finalAmount
    onPaymentComplete(selectedMethod || 'cash', receivedAmount)
  }

  const change = cashReceived ? parseFloat(cashReceived) - finalAmount : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Processing</h1>
          <p className="text-sm text-gray-600">Table {tableId}</p>
        </div>
      </div>

      {/* Amount Display */}
      <Card className="bg-blue-50 p-6">
        <p className="text-sm text-gray-600">Bill Amount</p>
        <p className="text-3xl font-bold text-blue-600">
          {finalAmount.toFixed(2)} THB
        </p>
      </Card>

      {/* Discount Section */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => setShowDiscount(true)}
          className="flex-1"
        >
          Apply Discount
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowSplit(true)}
          className="flex-1"
        >
          Split Payment
        </Button>
      </div>

      {/* Payment Method Selection */}
      <Card className="p-6">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">
          Select Payment Method
        </h2>
        <div className="space-y-3">
          <button
            onClick={() => setSelectedMethod('cash')}
            className={`w-full rounded-lg border-2 p-4 text-left transition ${
              selectedMethod === 'cash'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Banknote className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-semibold text-gray-900">Cash</p>
                <p className="text-sm text-gray-600">Pay with register cash</p>
              </div>
              <div className="ml-auto h-4 w-4 rounded-full border-2 border-gray-300" />
            </div>
          </button>

          <button
            onClick={() => setSelectedMethod('card')}
            className={`w-full rounded-lg border-2 p-4 text-left transition ${
              selectedMethod === 'card'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-amber-600" />
              <div>
                <p className="font-semibold text-gray-900">Credit Card</p>
                <p className="text-sm text-gray-600">
                  Visa / Mastercard / JCB
                </p>
              </div>
              <div className="ml-auto h-4 w-4 rounded-full border-2 border-gray-300" />
            </div>
          </button>

          <button
            onClick={() => setSelectedMethod('qr')}
            className={`w-full rounded-lg border-2 p-4 text-left transition ${
              selectedMethod === 'qr'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-900">QR Code Payment</p>
                <p className="text-sm text-gray-600">
                  PromptPay / LINE Pay / WeChat
                </p>
              </div>
              <div className="ml-auto h-4 w-4 rounded-full border-2 border-gray-300" />
            </div>
          </button>

          <button
            onClick={() => setSelectedMethod('ewallet')}
            className={`w-full rounded-lg border-2 p-4 text-left transition ${
              selectedMethod === 'ewallet'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-pink-600" />
              <div>
                <p className="font-semibold text-gray-900">E-Wallet</p>
                <p className="text-sm text-gray-600">
                  Rabbit / True Money
                </p>
              </div>
              <div className="ml-auto h-4 w-4 rounded-full border-2 border-gray-300" />
            </div>
          </button>
        </div>
      </Card>

      {/* Cash Section */}
      {selectedMethod === 'cash' && (
        <Card className="border-2 border-green-500 bg-green-50 p-6">
          <label className="block text-sm font-semibold text-gray-700">
            Cash Received
          </label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={cashReceived}
            onChange={(e) => setCashReceived(e.target.value)}
            className="mt-2 text-lg"
          />
          <div className="mt-4 rounded-lg bg-white p-4">
            <p className="text-sm text-gray-600">Change</p>
            <p className="text-2xl font-bold text-green-600">
              {change > 0 ? change.toFixed(2) : '0.00'} THB
            </p>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handlePayment}
          disabled={!selectedMethod}
          className="flex-1 bg-green-600 text-white"
        >
          Complete Payment
        </Button>
      </div>

      {showDiscount && (
        <DiscountModal
          amount={amount}
          onApply={handleDiscountApply}
          onClose={() => setShowDiscount(false)}
        />
      )}

      {showSplit && (
        <SplitPaymentModal
          amount={finalAmount}
          onClose={() => setShowSplit(false)}
        />
      )}
    </div>
  )
}
