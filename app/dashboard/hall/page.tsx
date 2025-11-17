'use client'

import { useState } from 'react'
import { CommonHeader } from '@/components/common-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Bell, Eye } from 'lucide-react'
import { TableCard } from '@/components/table-card'
import { CustomerCallModal } from '@/components/customer-call-modal'
import { TableDetailModal } from '@/components/table-detail-modal'

const tables = [
  { number: 'T-01', capacity: 4, status: 'empty' as const },
  { number: 'T-02', capacity: 2, status: 'calling' as const, orderNumber: '#0123', waitTime: '25 mins' },
  { number: 'T-03', capacity: 4, status: 'occupied' as const, orderNumber: '#0121', waitTime: '2 mins' },
  { number: 'T-04', capacity: 6, status: 'empty' as const },
  { number: 'T-05', capacity: 4, status: 'empty' as const },
  { number: 'T-06', capacity: 2, status: 'occupied' as const, orderNumber: '#0125', waitTime: '12 mins' },
  { number: 'T-07', capacity: 4, status: 'empty' as const },
  { number: 'T-08', capacity: 8, status: 'occupied' as const, orderNumber: '#0126', waitTime: '8 mins' },
  { number: 'T-09', capacity: 2, status: 'empty' as const },
  { number: 'T-10', capacity: 6, status: 'occupied' as const, orderNumber: '#0127', waitTime: '18 mins' },
  { number: 'T-11', capacity: 4, status: 'empty' as const },
  { number: 'T-12', capacity: 4, status: 'occupied' as const, orderNumber: '#0128', waitTime: '4 mins' },
  { number: 'T-13', capacity: 2, status: 'empty' as const },
  { number: 'Private-A', capacity: 10, status: 'occupied' as const, orderNumber: '#0129', waitTime: '20 mins' },
]

export default function HallPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedTable, setSelectedTable] = useState<typeof tables[0] | null>(null)
  const [showCallModal, setShowCallModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const emptyCount = tables.filter((t) => t.status === 'empty').length
  const occupiedCount = tables.filter((t) => t.status === 'occupied').length
  const callingCount = tables.filter((t) => t.status === 'calling').length
  const cleaningCount = 0

  const handleTableClick = (table: typeof tables[0]) => {
    setSelectedTable(table)
    if (table.status === 'calling') {
      setShowCallModal(true)
    } else {
      setShowDetailModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <CommonHeader
        title="Table Management"
        subtitle="Hall Staff Management"
      />

      <div className="p-6">
        {/* Table Status Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="bg-green-100 border-0">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">{emptyCount}</div>
              <p className="text-sm text-green-700 font-semibold">Empty</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-100 border-0">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">{occupiedCount}</div>
              <p className="text-sm text-blue-700 font-semibold">In use</p>
            </CardContent>
          </Card>
          <Card className="bg-red-100 border-0">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-red-600 mb-2">{callingCount}</div>
              <p className="text-sm text-red-700 font-semibold">Calling</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-100 border-0">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-gray-600 mb-2">{cleaningCount}</div>
              <p className="text-sm text-gray-700 font-semibold">Cleaning</p>
            </CardContent>
          </Card>
        </div>

        {/* Table Layout */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Table Layout</CardTitle>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Table
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-3">
              {tables.map((table) => (
                <div key={table.number} onClick={() => handleTableClick(table)}>
                  <TableCard
                    tableNumber={table.number}
                    capacity={table.capacity}
                    status={table.status}
                    orderNumber={table.orderNumber}
                    waitTime={table.waitTime}
                  />
                </div>
              ))}
            </div>
            <div className="text-right mt-4 text-sm text-gray-600">
              Last updated: 14:35:22 | Total: 20 tables
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Orders</CardTitle>
              <Button size="sm" className="bg-emerald-600">
                <Plus className="w-4 h-4 mr-2" />
                New Order
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All (28)</TabsTrigger>
                <TabsTrigger value="pending">Preparing (5)</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                {tables.filter((table) => table.status !== 'empty').map((table) => (
                  <div key={table.number} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold">{table.orderNumber}</span>
                          <span className="text-sm font-semibold text-gray-600">{table.number}</span>
                          <Badge variant={table.status === 'calling' ? 'destructive' : 'secondary'}>
                            {table.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{table.waitTime}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Customer Call Modal */}
      {showCallModal && selectedTable && (
        <CustomerCallModal
          isOpen={showCallModal}
          onClose={() => setShowCallModal(false)}
          tableNumber={selectedTable.number}
          callTime="14:35:10"
          elapsedTime="0:15"
        />
      )}

      {/* Table Detail Modal */}
      {showDetailModal && selectedTable && (
        <TableDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          tableNumber={selectedTable.number}
          seating={selectedTable.capacity}
          orderNumber={selectedTable.orderNumber || '#0000'}
          items={[
            { name: 'Chicken Fried Set with Rice', quantity: 1, price: 290, status: 'delivered' },
            { name: 'Pork Grilled Set', quantity: 2, price: 520, status: 'cooking' },
            { name: 'Beer (Medium)', quantity: 1, price: 80, status: 'delivered' },
          ]}
          orderTime="14:10"
          estimatedTime="14:12 - Cooking 14:13"
          total={890}
        />
      )}
    </div>
  )
}
