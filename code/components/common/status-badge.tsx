'use client'

import { MapPin, Clock, CheckCircle2, Truck } from 'lucide-react'

interface StatusBadgeProps {
  status: 'available' | 'accepted' | 'picked-up' | 'delivered'
  className?: string
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const statusConfig = {
    available: {
      label: 'Available',
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      icon: MapPin,
      pulse: true,
    },
    accepted: {
      label: 'Accepted',
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      icon: CheckCircle2,
      pulse: true,
    },
    'picked-up': {
      label: 'In Transit',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      icon: Truck,
      pulse: true,
    },
    delivered: {
      label: 'Delivered',
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      icon: CheckCircle2,
      pulse: false,
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.color} ${config.pulse ? 'animate-pulse-status' : ''} ${className}`}>
      <Icon className="w-4 h-4" />
      <span>{config.label}</span>
    </div>
  )
}
