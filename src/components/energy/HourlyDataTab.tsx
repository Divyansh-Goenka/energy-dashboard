'use client'

import { EnergyDataTab } from './EnergyDataTab'

interface HourlyDataTabProps {
  frequency: 'hourly'
}

export function HourlyDataTab({ frequency }: HourlyDataTabProps) {
  // Reuse the same component with different frequency
  return <EnergyDataTab frequency={frequency} />
}