'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, X } from 'lucide-react'

interface Props {
  paymentMethod: string
  onComplete: () => void
}

export default function PaymentProcessingModal({ paymentMethod, onComplete }: Props) {
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isProcessing) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="mb-2 text-lg font-bold text-gray-900">Payment Successful</h2>
          <p className="mb-6 text-sm text-gray-600">
            {paymentMethod === 'card' ? 'Card reading completed' : 'Payment confirmed'}
          </p>
          <Button onClick={onComplete} className="w-full bg-green-600 text-white">
            Continue
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md p-8">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
          <h2 className="mb-2 text-lg font-bold text-gray-900">Processing Payment</h2>
          <p className="text-sm text-gray-600 mb-4">
            {paymentMethod === 'card'
              ? 'Please wait for card reading to complete'
              : 'Please wait while payment is being processed'}
          </p>
          <div className="rounded-lg bg-yellow-50 p-3 text-xs text-yellow-800 mb-4">
            Card processing status will appear here
          </div>
          <Button variant="outline" className="w-full">
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  )
}
