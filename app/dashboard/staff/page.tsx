'use client'

import { useState } from 'react'
import { CommonHeader } from '@/components/common-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Plus, Edit2, Trash2 } from 'lucide-react'

const initialStaffMembers = [
  {
    id: 1,
    name: 'Tanaka Taro',
    role: 'Manager' as const,
    email: 'tanaka@example.com',
    status: 'active' as const,
    lastLogin: '2 hours ago',
  },
  {
    id: 2,
    name: 'Sato Hanako',
    role: 'Hall Staff' as const,
    email: 'sato@example.com',
    status: 'active' as const,
    lastLogin: '30 mins ago',
  },
  {
    id: 3,
    name: 'Suzuki Ichiro',
    role: 'Kitchen' as const,
    email: 'suzuki@example.com',
    status: 'active' as const,
    lastLogin: '1 hour ago',
  },
]

export default function StaffManagementPage() {
  const [staffMembers, setStaffMembers] = useState(initialStaffMembers)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingMember, setEditingMember] = useState<typeof initialStaffMembers[0] | null>(null)

  const handleAddStaff = () => {
    setShowAddModal(true)
  }

  const handleCreateStaff = () => {
    const newMember = {
      id: Math.max(...staffMembers.map(m => m.id), 0) + 1,
      name: 'New Staff Member',
      role: 'Hall Staff' as const,
      email: 'staff@example.com',
      status: 'active' as const,
      lastLogin: 'Just now',
    }
    setStaffMembers([...staffMembers, newMember])
    setShowAddModal(false)
    alert(`Staff member added successfully!`)
  }

  const handleEditStaff = (memberId: number) => {
    const member = staffMembers.find(m => m.id === memberId)
    if (member) {
      setEditingMember(member)
      setShowEditModal(true)
    }
  }

  const handleSaveEdit = () => {
    if (editingMember) {
      setStaffMembers(staffMembers.map(m => m.id === editingMember.id ? editingMember : m))
      setShowEditModal(false)
      setEditingMember(null)
      alert(`Staff member updated successfully!`)
    }
  }

  const handleDeleteStaff = (memberId: number) => {
    const member = staffMembers.find(m => m.id === memberId)
    if (member && window.confirm(`Remove "${member.name}"? This action cannot be undone.`)) {
      setStaffMembers(staffMembers.filter(m => m.id !== memberId))
      alert(`Staff member removed successfully!`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CommonHeader title="Staff Management" subtitle="Manage Team Members" />

      <div className="p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Staff Directory</CardTitle>
              <Button size="sm" className="bg-emerald-600" onClick={handleAddStaff}>
                <Plus className="w-4 h-4 mr-2" />
                Add Staff
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Role</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Last Login</th>
                    <th className="text-center py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staffMembers.map((member) => (
                    <tr key={member.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="bg-emerald-200 text-emerald-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                            {member.name[0]}
                          </div>
                          {member.name}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{member.role}</Badge>
                      </td>
                      <td className="py-3 px-4">{member.email}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-green-100 text-green-700">
                          {member.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{member.lastLogin}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditStaff(member.id)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteStaff(member.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 p-6">
            <h2 className="text-xl font-bold mb-4">Add New Staff Member</h2>
            <p className="text-sm text-gray-600 mb-6">Enter staff details including name, role, email, and PIN.</p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleCreateStaff} className="flex-1 bg-emerald-600">Add Staff</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Staff Modal */}
      {showEditModal && editingMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 p-6">
            <h2 className="text-xl font-bold mb-4">Edit Staff Member</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input 
                  value={editingMember.name} 
                  onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input 
                  value={editingMember.email} 
                  onChange={(e) => setEditingMember({...editingMember, email: e.target.value})}
                />
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
