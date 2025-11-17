'use client'

import { useState } from 'react'
import { CommonHeader } from '@/components/common-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit2, Trash2 } from 'lucide-react'

const staffMembers = [
  {
    id: 1,
    name: 'Tanaka Taro',
    role: 'Manager',
    email: 'tanaka@example.com',
    status: 'active',
    lastLogin: '2 hours ago',
  },
  {
    id: 2,
    name: 'Sato Hanako',
    role: 'Hall Staff',
    email: 'sato@example.com',
    status: 'active',
    lastLogin: '30 mins ago',
  },
  {
    id: 3,
    name: 'Suzuki Ichiro',
    role: 'Kitchen',
    email: 'suzuki@example.com',
    status: 'active',
    lastLogin: '1 hour ago',
  },
]

export default function StaffManagementPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CommonHeader title="Staff Management" subtitle="Manage Team Members" />

      <div className="p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Staff Directory</CardTitle>
              <Button size="sm" className="bg-emerald-600">
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
