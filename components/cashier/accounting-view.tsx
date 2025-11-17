'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface TableData {
  id: string
  tableNumber: number
  total: number
  timestamp: string
}

const SETTLEMENT_TABLES: TableData[] = [
  { id: 'T-02', tableNumber: 2, total: 880, timestamp: '14:10' },
  { id: 'T-05', tableNumber: 5, total: 1041, timestamp: '14:30' },
  { id: 'T-08', tableNumber: 8, total: 2350, timestamp: '13:45' },
]

interface Props {
  onTableSelect: (tableId: string, amount: number) => void
}

export default function AccountingView({ onTableSelect }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredTables, setFilteredTables] = useState(SETTLEMENT_TABLES)

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredTables(SETTLEMENT_TABLES)
    } else {
      const query = searchQuery.toLowerCase()
      setFilteredTables(
        SETTLEMENT_TABLES.filter(
          (t) =>
            t.tableNumber.toString().includes(query) ||
            t.id.toLowerCase().includes(query)
        )
      )
    }
  }

  const handleClear = () => {
    setSearchQuery('')
    setFilteredTables(SETTLEMENT_TABLES)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Accounting System</h1>
        <Button variant="outline">Settings</Button>
      </div>

      {/* Search Section */}
      <Card className="p-6">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">Table Search</h2>
        <div className="space-y-4">
          <Input
            placeholder="Enter table number (e.g., 5, T-02)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-lg"
          />
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                variant="outline"
                className="h-12 text-lg"
                onClick={() => {
                  setSearchQuery(num.toString())
                }}
              >
                {num}
              </Button>
            ))}
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSearch} className="flex-1 bg-blue-600 text-white">
              Search
            </Button>
            <Button onClick={handleClear} variant="destructive" className="px-6">
              Clear
            </Button>
          </div>
        </div>
      </Card>

      {/* Settlement Tables */}
      <Card className="p-6">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">Settlement Tables</h2>
        <div className="space-y-2">
          {filteredTables.map((table) => (
            <button
              key={table.id}
              onClick={() => onTableSelect(table.id, table.total)}
              className="w-full rounded-lg border border-gray-200 bg-white p-4 text-left transition hover:bg-blue-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    Table {table.tableNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    Time: {table.timestamp}
                  </p>
                </div>
                <p className="text-lg font-bold text-blue-600">{table.total} THB</p>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
