'use client'

import { useState } from 'react'
import { CommonHeader } from '@/components/common-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Download, Edit2, Trash2 } from 'lucide-react'

const menuItems = [
  {
    id: 1,
    name: 'Fried Chicken Set',
    category: 'Set Meal',
    price: 280,
    cost: 120,
    stock: 25,
    status: 'selling',
  },
  {
    id: 2,
    name: 'Pork Grilled Set',
    category: 'Set Meal',
    price: 260,
    cost: 110,
    stock: 18,
    status: 'selling',
  },
  {
    id: 3,
    name: 'Squid Stir-Fry Set',
    category: 'Set Meal',
    price: 240,
    cost: 100,
    stock: 0,
    status: 'sold_out',
  },
]

export default function MenuManagementPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <CommonHeader title="Menu & Inventory Management" subtitle="Manage Products & Stock" />

      <div className="p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Menu Items</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  CSV Export
                </Button>
                <Button size="sm" className="bg-emerald-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="mainCourse">Main Course</TabsTrigger>
                <TabsTrigger value="drink">Drink</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <div className="mb-4">
                  <Input placeholder="Search items..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Product Name</th>
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-right py-3 px-4">Price</th>
                        <th className="text-right py-3 px-4">Cost</th>
                        <th className="text-right py-3 px-4">Stock</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-center py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuItems.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{item.name}</td>
                          <td className="py-3 px-4">
                            <Badge variant="secondary">{item.category}</Badge>
                          </td>
                          <td className="py-3 px-4 text-right">{item.price} THB</td>
                          <td className="py-3 px-4 text-right">{item.cost} THB</td>
                          <td className="py-3 px-4 text-right font-semibold text-emerald-600">{item.stock}</td>
                          <td className="py-3 px-4">
                            <Badge variant={item.status === 'sold_out' ? 'destructive' : 'outline'}>
                              {item.status === 'sold_out' ? 'Sold Out' : 'Selling'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
