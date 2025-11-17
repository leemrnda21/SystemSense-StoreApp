'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import { UserCog, ChefHat, Users, LogOut } from 'lucide-react'

const roles = [
  {
    id: 'manager',
    name: 'Manager',
    description: 'Dashboard, Configuration, Reports',
    icon: UserCog,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'hall',
    name: 'Hall',
    description: 'Order Management, Table Management',
    icon: Users,
    color: 'bg-emerald-100 text-emerald-600',
    highlight: true,
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    description: 'Manage Display, Staff Updates',
    icon: ChefHat,
    color: 'bg-orange-100 text-orange-600',
  },
]

export default function RoleSelectPage() {
  const router = useRouter()
  const { user, setUser } = useStore()

  const handleRoleSelect = (roleId: string) => {
    if (user) {
      setUser({ ...user, role: roleId as any })
      
      if (roleId === 'hall') router.push('/dashboard/hall')
      else if (roleId === 'kitchen') router.push('/dashboard/kds')
      else router.push('/dashboard/manager')
    }
  }

  const handleLogout = () => {
    setUser(null)
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
          <p className="text-emerald-100">Please select your role</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all transform hover:scale-105 ${
                  role.highlight ? 'ring-2 ring-blue-400 md:col-span-1' : ''
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className={`p-3 rounded-full ${role.color}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-lg">{role.name}</h3>
                      <p className="text-xs text-gray-600">{role.description}</p>
                    </div>
                    <Button
                      onClick={() => handleRoleSelect(role.id)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="bg-white hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
