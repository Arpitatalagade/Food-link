'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Navigation } from 'lucide-react'

interface Location {
  lat: number
  lng: number
  label?: string
}

interface DeliveryMapProps {
  pickupLocation: Location
  deliveryLocation?: Location
  currentLocation?: Location
  status: 'picked-up' | 'in-transit' | 'delivered'
}

export default function DeliveryMap({ pickupLocation, deliveryLocation, currentLocation, status }: DeliveryMapProps) {
  const minLat = Math.min(pickupLocation.lat, deliveryLocation?.lat || 0, currentLocation?.lat || 0)
  const maxLat = Math.max(pickupLocation.lat, deliveryLocation?.lat || 0, currentLocation?.lat || 0)
  const minLng = Math.min(pickupLocation.lng, deliveryLocation?.lng || 0, currentLocation?.lng || 0)
  const maxLng = Math.max(pickupLocation.lng, deliveryLocation?.lng || 0, currentLocation?.lng || 0)

  const padding = 0.02
  const bounds = {
    minLat: minLat - padding,
    maxLat: maxLat + padding,
    minLng: minLng - padding,
    maxLng: maxLng + padding,
  }

  const latRange = bounds.maxLat - bounds.minLat || 0.1
  const lngRange = bounds.maxLng - bounds.minLng || 0.1

  const getX = (lng: number) => ((lng - bounds.minLng) / lngRange) * 100
  const getY = (lat: number) => ((bounds.maxLat - lat) / latRange) * 100

  return (
    <Card className="border-orange-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-orange-600" />
          Live Delivery Tracking
        </CardTitle>
        <CardDescription>Real-time location updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-square bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-800 rounded-lg border border-orange-100 dark:border-gray-600 overflow-hidden">
          {/* Map background grid */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>

          {/* Route line */}
          {currentLocation && deliveryLocation && (
            <svg className="absolute inset-0 w-full h-full">
              <line
                x1={`${getX(pickupLocation.lng)}%`}
                y1={`${getY(pickupLocation.lat)}%`}
                x2={`${getX(deliveryLocation.lng)}%`}
                y2={`${getY(deliveryLocation.lat)}%`}
                stroke="#fb923c"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.5"
              />
            </svg>
          )}

          {/* Pickup location */}
          <div
            className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 animate-scale-in"
            style={{
              left: `${getX(pickupLocation.lng)}%`,
              top: `${getY(pickupLocation.lat)}%`,
            }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-75"></div>
              <div className="absolute inset-1 bg-green-600 rounded-full"></div>
              <MapPin className="absolute inset-1.5 w-5 h-5 text-white" />
            </div>
          </div>

          {/* Delivery location */}
          {deliveryLocation && (
            <div
              className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 animate-scale-in"
              style={{
                left: `${getX(deliveryLocation.lng)}%`,
                top: `${getY(deliveryLocation.lat)}%`,
                animationDelay: '0.1s',
              }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse opacity-75"></div>
                <div className="absolute inset-1 bg-blue-600 rounded-full"></div>
                <MapPin className="absolute inset-1.5 w-5 h-5 text-white" />
              </div>
            </div>
          )}

          {/* Current location */}
          {currentLocation && (
            <div
              className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{
                left: `${getX(currentLocation.lng)}%`,
                top: `${getY(currentLocation.lat)}%`,
              }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-orange-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-1.5 bg-orange-600 rounded-full"></div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-3 left-3 space-y-1 text-xs bg-white/90 dark:bg-gray-900/90 p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-700 dark:text-gray-300">Pickup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
              <span className="text-gray-700 dark:text-gray-300">Current</span>
            </div>
            {deliveryLocation && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-700 dark:text-gray-300">Delivery</span>
              </div>
            )}
          </div>

          {/* Status badge */}
          <div className="absolute top-3 right-3">
            <Badge className={`${
              status === 'picked-up' ? 'bg-yellow-500' :
              status === 'in-transit' ? 'bg-orange-500' :
              'bg-green-500'
            }`}>
              {status === 'picked-up' ? 'Picked Up' :
               status === 'in-transit' ? 'In Transit' :
               'Delivered'}
            </Badge>
          </div>
        </div>

        {/* Location info */}
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
          <div className="p-2 rounded bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <p className="text-gray-600 dark:text-gray-400">Pickup</p>
            <p className="font-semibold text-gray-900 dark:text-white">{pickupLocation.label || `${pickupLocation.lat.toFixed(4)}, ${pickupLocation.lng.toFixed(4)}`}</p>
          </div>
          {deliveryLocation && (
            <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-gray-600 dark:text-gray-400">Delivery</p>
              <p className="font-semibold text-gray-900 dark:text-white">{deliveryLocation.label || `${deliveryLocation.lat.toFixed(4)}, ${deliveryLocation.lng.toFixed(4)}`}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
