'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CommonHeader } from '@/components/common-header'
import AccountingView from '@/components/cashier/accounting-view'
import PaymentMethodSelector from '@/components/cashier/payment-method-selector'
import ReceiptView from '@/components/cashier/receipt-view'
import OrderReview from '@/components/cashier/order-review'

type CashierStep = 'accounting' | 'review' | 'payment' | 'receipt'

export default function CashierPage() {
  const [step, setStep] = useState<CashierStep>('accounting')
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [cashReceived, setCashReceived] = useState<number>(0)
  const [tableItems, setTableItems] = useState<Array<{ name: string; qty: number; price: number }>>([])

  const handleTableSelect = (tableId: string, amount: number, items?: Array<{ name: string; qty: number; price: number }>) => {
    setSelectedTable(tableId)
    setTotalAmount(amount)
    if (items) {
      setTableItems(items)
    }
    // Show order review before payment so cashier can confirm
    setStep('review')
  }

  const handlePaymentComplete = (method: string, receivedAmount?: number) => {
    setPaymentMethod(method)
    if (receivedAmount !== undefined) {
      setCashReceived(receivedAmount)
    }
    setStep('receipt')
  }

  const handlePriceUpdate = (newAmount: number) => {
    setTotalAmount(newAmount)
  }

  const handleNewTransaction = () => {
    setSelectedTable(null)
    setTotalAmount(0)
    setPaymentMethod(null)
    setCashReceived(0)
    setTableItems([])
    setStep('accounting')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <CommonHeader title="Cashier System" role="cashier" />
      
      <div className="p-6">
        {step === 'accounting' && (
          <AccountingView onTableSelect={handleTableSelect} />
        )}

        {step === 'review' && selectedTable && (
          <OrderReview
            tableId={selectedTable}
            items={tableItems}
            amount={totalAmount}
            onBack={() => setStep('accounting')}
            onEdit={() => setStep('accounting')}
            onProceed={() => setStep('payment')}
          />
        )}

        {step === 'payment' && selectedTable && (
          <PaymentMethodSelector
            tableId={selectedTable}
            amount={totalAmount}
            onPaymentComplete={handlePaymentComplete}
            onBack={() => setStep('review')}
          />
        )}

        {step === 'receipt' && (
          <ReceiptView
            tableId={selectedTable!}
            amount={totalAmount}
            paymentMethod={paymentMethod || 'cash'}
            onNewTransaction={handleNewTransaction}
            onPriceUpdate={handlePriceUpdate}
            receiptItems={tableItems}
            cashReceived={cashReceived}
          />
        )}
      </div>
    </main>
  )
}
