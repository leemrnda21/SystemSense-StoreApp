'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useStore } from '@/lib/store'
import { UtensilsCrossed, Eye, EyeOff } from 'lucide-react'

const DEMO_ACCOUNTS = [
  { email: 'manager@example.com', pin: '1234', role: 'manager' as const },
  { email: 'hall@example.com', pin: '1234', role: 'hall' as const },
  { email: 'kitchen@example.com', pin: '1234', role: 'kitchen' as const },
]

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [error, setError] = useState('')
  const [showCredentials, setShowCredentials] = useState(true)
  const router = useRouter()
  const setUser = useStore((state) => state.setUser)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !pin) {
      setError('Please enter both email and PIN')
      return
    }

    // Check against demo accounts
    const account = DEMO_ACCOUNTS.find((acc) => acc.email === email && acc.pin === pin)

    if (account) {
      const userData = {
        id: email,
        email,
        name: email.split('@')[0].toUpperCase(),
        role: account.role,
      }
      setUser(userData)
      router.push('/role-select')
    } else {
      setError('Invalid email or PIN')
    }
  }

  const quickLogin = (email: string, pin: string) => {
    setEmail(email)
    setPin(pin)
    setTimeout(() => {
      const account = DEMO_ACCOUNTS.find((acc) => acc.email === email && acc.pin === pin)
      if (account) {
        const userData = {
          id: email,
          email,
          name: email.split('@')[0].toUpperCase(),
          role: account.role,
        }
        setUser(userData)
        router.push('/role-select')
      }
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Card>
          <CardHeader className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="bg-emerald-100 p-3 rounded-full">
                <UtensilsCrossed className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">Self Order System</CardTitle>
            <CardDescription className="text-center">Restaurant Management System</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address / Staff ID</label>
                <Input
                  type="email"
                  placeholder="staff@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!showCredentials}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">PIN / Password</label>
                <div className="relative">
                  <Input
                    type={showPin ? 'text' : 'password'}
                    placeholder="••••••"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    disabled={!showCredentials}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {error && <div className="text-sm text-red-500 font-semibold">{error}</div>}
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 font-semibold h-10"
              >
                Login
              </Button>
              <p className="text-xs text-gray-500 text-center">
                If you forget your password, please contact the administrator
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials Section */}
        {showCredentials && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-sm text-blue-900">Demo Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {DEMO_ACCOUNTS.map((account) => (
                <Button
                  key={account.email}
                  onClick={() => quickLogin(account.email, account.pin)}
                  variant="outline"
                  className="w-full justify-start text-xs h-9 border-blue-200 hover:bg-blue-100"
                >
                  <span className="text-blue-600 font-semibold">{account.role.toUpperCase()}</span>
                  <span className="text-gray-600 ml-auto">({account.email})</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        )}

        <Button
          variant="ghost"
          onClick={() => setShowCredentials(!showCredentials)}
          className="w-full text-white hover:bg-emerald-700 text-xs"
        >
          {showCredentials ? 'Hide Demo Accounts' : 'Show Demo Accounts'}
        </Button>
      </div>
    </div>
  )
}
