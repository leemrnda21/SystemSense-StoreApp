"use client"

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'
import { cn } from '@/lib/utils'

// Minimal chart helpers to avoid strict Recharts typing conflicts.

export function ChartContainer({ id, className, children }: React.ComponentProps<'div'> & { id?: string; className?: string; children?: React.ReactNode }) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  return (
    <div data-slot="chart" data-chart={chartId} className={cn('flex aspect-video justify-center text-xs', className)}>
      <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
    </div>
  )
}

export const ChartTooltip = RechartsPrimitive.Tooltip

export function ChartTooltipContent(_props: any) {
  return null
}

export const ChartLegend = RechartsPrimitive.Legend

export function ChartLegendContent(_props: any) {
  return null
}

export const ChartStyle = ({ id }: { id?: string }) => null
