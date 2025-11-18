'use client'

import { CommonHeader } from '@/components/common-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Link from 'next/link'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2 } from 'lucide-react'

const salesData = [
  { time: 'Lunch', sales: 18500, orders: 45 },
  { time: 'Idle', sales: 5280, orders: 12 },
  { time: 'Dinner', sales: 21500, orders: 68 },
]

const paymentData = [
  { method: 'Cash', amount: 22500, count: 15 },
  { method: 'Credit Card', amount: 15200, count: 8 },
  { method: 'QR Payment', amount: 7580, count: 5 },
]

const topProducts = [
  { rank: 1, name: 'Fried Chicken Set', sales: 12600, count: 45 },
  { rank: 2, name: 'Pork Grilled Set', sales: 9880, count: 38 },
  { rank: 3, name: 'Beer (Medium)', sales: 4160, count: 52 },
]

export default function ManagerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CommonHeader title="Accounting & Daily Summary" subtitle="Financial Dashboard" />

      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600">45,280</div>
              <p className="text-sm text-gray-600">Today Sales (THB)</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-emerald-600">28</div>
              <p className="text-sm text-gray-600">Total Orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600">1,617</div>
              <p className="text-sm text-gray-600">Average Price (THB)</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-600">2.3</div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="sales" className="w-full">
          <TabsList>
            <TabsTrigger value="sales">Sales by Time Period</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="products">Top Products</TabsTrigger>
          </TabsList>

          <TabsContent value="sales">
            <Card>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <div className="grid grid-cols-3 gap-4">
              {paymentData.map((payment) => (
                <Card key={payment.method}>
                  <CardContent className="pt-6">
                    <p className="font-semibold">{payment.method}</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-2">{payment.amount.toLocaleString()} THB</p>
                    <p className="text-sm text-gray-600">{payment.count} transactions</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardContent className="pt-6">
                {topProducts.map((product) => (
                  <div key={product.rank} className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {product.rank}
                      </div>
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.count} sold</p>
                      </div>
                    </div>
                    <p className="font-bold text-emerald-600">{product.sales.toLocaleString()}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Menu Management Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Menu Management</CardTitle>
              <div className="flex items-center gap-2">
                <Input placeholder="Search menu..." className="w-64" />
                <Link href="/dashboard/menu">
                  <Button size="sm" className="bg-emerald-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: 1, name: 'Fried Chicken Set', category: 'Set Meal', price: 280, status: 'selling' },
                    { id: 2, name: 'Pork Grilled Set', category: 'Set Meal', price: 260, status: 'selling' },
                    { id: 3, name: 'Squid Stir-Fry Set', category: 'Set Meal', price: 240, status: 'sold_out' },
                  ].map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">{item.price} THB</TableCell>
                      <TableCell className="text-right">{item.status === 'sold_out' ? 'Sold Out' : 'Selling'}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="ghost" size="sm"><Edit2 className="w-4 h-4"/></Button>
                          <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4 text-red-500"/></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
