'use client'

import { useState } from 'react'
import { CommonHeader } from '@/components/common-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Download, Edit2, Trash2 } from 'lucide-react'

const initialMenuItems = [
  {
    id: 1,
    name: 'Fried Chicken Set',
    category: 'Set Meal',
    price: 280,
    cost: 120,
    stock: 25,
    status: 'selling' as const,
  },
  {
    id: 2,
    name: 'Pork Grilled Set',
    category: 'Set Meal',
    price: 260,
    cost: 110,
    stock: 18,
    status: 'selling' as const,
  },
  {
    id: 3,
    name: 'Squid Stir-Fry Set',
    category: 'Set Meal',
    price: 240,
    cost: 100,
    stock: 0,
    status: 'sold_out' as const,
  },
]

export default function MenuManagementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [menuItems, setMenuItems] = useState(initialMenuItems)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingItem, setEditingItem] = useState<typeof initialMenuItems[0] | null>(null)

  const handleCsvExport = () => {
    const csvContent = [
      ['ID', 'Product Name', 'Category', 'Price (THB)', 'Cost (THB)', 'Stock', 'Status'],
      ...menuItems.map(item => [
        item.id,
        item.name,
        item.category,
        item.price,
        item.cost,
        item.stock,
        item.status
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `menu-inventory-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleAddItem = () => {
    setShowAddModal(true)
  }

  const handleCreateItem = () => {
    const newItem = {
      id: Math.max(...menuItems.map(i => i.id), 0) + 1,
      name: 'New Menu Item',
      category: 'Set Meal',
      price: 0,
      cost: 0,
      stock: 0,
      status: 'selling' as const,
    }
    setMenuItems([...menuItems, newItem])
    setShowAddModal(false)
    alert(`Menu item created successfully!`)
  }

  const handleEditItem = (itemId: number) => {
    const item = menuItems.find(i => i.id === itemId)
    if (item) {
      setEditingItem(item)
      setShowEditModal(true)
    }
  }

  const handleSaveEdit = () => {
    if (editingItem) {
      setMenuItems(menuItems.map(item => item.id === editingItem.id ? editingItem : item))
      setShowEditModal(false)
      setEditingItem(null)
      alert(`Menu item updated successfully!`)
    }
  }

  const handleDeleteItem = (itemId: number) => {
    const item = menuItems.find(i => i.id === itemId)
    if (item && window.confirm(`Delete "${item.name}"? This action cannot be undone.`)) {
      setMenuItems(menuItems.filter(i => i.id !== itemId))
      alert(`Menu item deleted successfully!`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CommonHeader title="Menu & Inventory Management" subtitle="Manage Products & Stock" />

      <div className="p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Menu Items</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCsvExport}>
                  <Download className="w-4 h-4 mr-2" />
                  CSV Export
                </Button>
                <Button size="sm" className="bg-emerald-600" onClick={handleAddItem}>
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
                              <Button variant="ghost" size="sm" onClick={() => handleEditItem(item.id)}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(item.id)}>
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

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 p-6">
            <h2 className="text-xl font-bold mb-4">Add New Menu Item</h2>
            <p className="text-sm text-gray-600 mb-6">Enter menu item details including name, price, and category.</p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleCreateItem} className="flex-1 bg-emerald-600">Create Item</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditModal && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 p-6">
            <h2 className="text-xl font-bold mb-4">Edit Menu Item</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Item Name</label>
                <Input 
                  value={editingItem.name} 
                  onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <Input 
                    type="number" 
                    value={editingItem.price} 
                    onChange={(e) => setEditingItem({...editingItem, price: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Stock</label>
                  <Input 
                    type="number" 
                    value={editingItem.stock} 
                    onChange={(e) => setEditingItem({...editingItem, stock: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setShowEditModal(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleSaveEdit} className="flex-1 bg-emerald-600">Save Changes</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
