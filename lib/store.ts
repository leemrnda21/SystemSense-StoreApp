import { create } from 'zustand'

interface User {
  id: string
  email: string
  name: string
  role: 'manager' | 'hall' | 'kitchen'
}

interface CashierState {
  currentTransaction: {
    tableId: string | null
    amount: number
    discount: number
    paymentMethod: string | null
  } | null
  setTransaction: (transaction: CashierState['currentTransaction']) => void
}

interface StoreState {
  user: User | null
  setUser: (user: User | null) => void
}

export const useStore = create<StoreState & CashierState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  currentTransaction: null,
  setTransaction: (transaction) => set({ currentTransaction: transaction }),
}))
