'use client'

import { useState } from 'react'
import { CommonHeader } from '@/components/common-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, AlertCircle } from 'lucide-react'
import { OrderDetailModal } from '@/components/order-detail-modal'
import { KDSSettingsPanel } from '@/components/kds-settings-panel'

type KdsItem = { name: string; qty: number; note?: string }

type KdsOrder = {
  id: string
  table: string
  elapsedTime: string
  status: 'urgent' | 'cooking' | 'ready'
  items: KdsItem[]
  warning?: string
  estimatedTime?: string
  note?: string
}

const initialKdsOrders: KdsOrder[] = [
  {
    id: '#0123',
    table: 'T-05',
    elapsedTime: '45',
    status: 'urgent' as const,
    items: [
      { name: 'Chicken Fried Set with Rice', qty: 1, note: 'Standard rice' },
      { name: 'Beer +1', qty: 1 },
    ],
    warning: 'Rice large, be careful',
  },
  {
    id: '#0121',
    table: 'T-03',
    elapsedTime: '4:20',
    status: 'cooking' as const,
    items: [
      { name: 'Curry Rice Set', qty: 1 },
      { name: 'Thai Papaya Salad', qty: 1 },
    ],
    estimatedTime: '23 min',
  },
  {
    id: '#0120',
    table: 'T-07',
    elapsedTime: '6:15',
    status: 'ready' as const,
    items: [
      { name: 'Tom Yum Soup x2', qty: 2 },
      { name: 'Rice Noodles', qty: 1, note: 'Extra spicy' },
    ],
  },
  {
    id: '#0124',
    table: 'T-02',
    elapsedTime: '1:20',
    status: 'urgent' as const,
    items: [
      { name: 'Garlic Rice x2', qty: 2 },
      { name: 'Fragrant Chicken', qty: 1 },
    ],
  },
  {
    id: '#0119',
    table: 'T-04',
    elapsedTime: '3:30',
    status: 'ready' as const,
    items: [
      { name: 'Pad Thai', qty: 1 },
      { name: 'Green Curry', qty: 1 },
    ],
    note: 'Archive',
  },
  {
    id: '#0122',
    table: 'T-08',
    elapsedTime: '3:45',
    status: 'cooking' as const,
    items: [
      { name: 'Beef Steak Set', qty: 1, note: 'Rare' },
      { name: 'Salmon', qty: 1, note: 'Medium' },
    ],
  },
]

export default function KDSPage() {
  const [orders, setOrders] = useState(initialKdsOrders)
  const [archivedOrders, setArchivedOrders] = useState<string[]>([])
  const [selectedOrder, setSelectedOrder] = useState<(typeof initialKdsOrders)[0] | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'urgent' | 'cooking' | 'ready'>('all')

  const startPrep = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId && order.status === 'urgent'
        ? { ...order, status: 'cooking' as const }
        : order
    ))
    console.log(`[v0] Order ${orderId} moved to cooking`)
  }

  const archiveOrder = (orderId: string) => {
    setArchivedOrders([...archivedOrders, orderId])
    console.log(`[v0] Order ${orderId} archived`)
  }

  const filteredOrders = orders
    .filter((order) => !archivedOrders.includes(order.id))
    .filter((order) => {
      if (filterStatus === 'all') return true
      return order.status === filterStatus
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50">
      <CommonHeader 
        title="Kitchen Display System"
        subtitle="KDS - Real-time order management"
      />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main KDS Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-red-600">{filteredOrders.filter(o => o.status === 'urgent').length}</div>
                  <p className="text-xs text-gray-600 mt-1">New Orders</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-600">{filteredOrders.filter(o => o.status === 'cooking').length}</div>
                  <p className="text-xs text-gray-600 mt-1">Cooking</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-green-600">{filteredOrders.filter(o => o.status === 'ready').length}</div>
                  <p className="text-xs text-gray-600 mt-1">Ready</p>
                </CardContent>
              </Card>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              {['all', 'urgent', 'cooking', 'ready'].map((tab) => (
                <Button
                  key={tab}
                  variant={filterStatus === tab ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus(tab as any)}
                  className={
                    filterStatus === tab
                      ? 'bg-blue-600 text-white'
                      : 'border-gray-300 hover:bg-gray-50'
                  }
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
              ))}
            </div>

            {/* Order Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  className={`border-2 cursor-pointer hover:shadow-lg transition-shadow ${
                    order.status === 'urgent'
                      ? 'border-red-400 bg-red-50'
                      : order.status === 'ready'
                        ? 'border-green-400 bg-green-50'
                        : 'border-yellow-400 bg-yellow-50'
                  }`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-bold">{order.id}</CardTitle>
                        <p className="text-sm font-semibold text-gray-700">{order.table}</p>
                      </div>
                      <div className="text-right">
                        {order.status === 'urgent' && (
                          <Badge className="bg-red-500 text-white mb-1">
                            NEW
                          </Badge>
                        )}
                        {order.status === 'cooking' && (
                          <Badge className="bg-yellow-500 text-white mb-1">
                            COOKING
                          </Badge>
                        )}
                        {order.status === 'ready' && (
                          <Badge className="bg-green-500 text-white mb-1">
                            READY
                          </Badge>
                        )}
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Clock className="w-3 h-3" />
                          {order.elapsedTime}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <p key={idx} className="text-sm font-medium text-gray-700">
                          • {item.name} x{item.qty}
                          {item.note && <span className="text-xs text-gray-500"> - {item.note}</span>}
                        </p>
                      ))}
                    </div>
                    {order.warning && (
                      <div className="flex items-start gap-2 text-xs p-2 bg-amber-100 rounded border border-amber-300">
                        <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                        <span className="text-amber-700">{order.warning}</span>
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          startPrep(order.id)
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs h-8"
                      >
                        Start Prep
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          archiveOrder(order.id)
                        }}
                        variant="outline"
                        className="flex-1 text-xs h-8"
                      >
                        Archive
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Settings Panel */}
          <div>
            <KDSSettingsPanel />
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          orderNumber={selectedOrder.id}
          tableInfo={{
            tableNumber: selectedOrder.table,
            seating: 4,
            orderTime: '14:30',
          }}
          items={selectedOrder.items.map((item) => ({
            name: item.name,
            quantity: item.qty,
            notes: item.note,
          }))}
        />
      )}
    </div>
  )
}
