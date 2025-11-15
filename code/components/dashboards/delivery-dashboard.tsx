'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Truck, CheckCircle2, Clock, Map } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import Header from '@/components/common/header'
import StatusBadge from '@/components/common/status-badge'
import NotificationCenter from '@/components/notifications/notification-center'
import DeliveryMap from '@/components/tracking/delivery-map'

interface DeliveryDashboardProps {
  userName: string
  onLogout: () => void
  onLogoClick?: () => void
}

export default function DeliveryDashboard({ userName, onLogout, onLogoClick }: DeliveryDashboardProps) {
  const [view, setView] = useState<'assigned' | 'in-transit' | 'completed'>('assigned')
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null)
  const { donations, updateDonationStatus, notifications } = useAppStore()

  const assignedPickups = donations.filter((d) => d.status === 'accepted')
  const inTransit = donations.filter((d) => d.status === 'picked-up')
  const completedDeliveries = donations.filter((d) => d.status === 'delivered')

  const displayedDonations = 
    view === 'assigned' ? assignedPickups 
    : view === 'in-transit' ? inTransit 
    : completedDeliveries

  const unreadNotifications = notifications.filter((n) => !n.read).length
  const totalDeliveries = completedDeliveries.length

  const selectedDonation = donations.find(d => d.id === selectedDelivery)

  const handlePickup = (donationId: string) => {
    updateDonationStatus(donationId, 'picked-up', userName)
  }

  const handleDeliver = (donationId: string) => {
    updateDonationStatus(donationId, 'delivered', userName)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header 
        title="Delivery Dashboard"
        subtitle={`Managing logistics & deliveries • ${userName}`}
        userName={userName}
        onLogout={onLogout}
        onLogoClick={onLogoClick}
        notificationCount={unreadNotifications}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="animate-slide-in border-orange-100 dark:border-gray-700 backdrop-blur-sm hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '0ms' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Ready for Pickup</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mt-2">{assignedPickups.length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center animate-pulse-status">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-in border-orange-100 dark:border-gray-700 backdrop-blur-sm hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '100ms' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">In Transit</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mt-2">{inTransit.length}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center animate-pulse-status">
                  <Truck className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-in border-orange-100 dark:border-gray-700 backdrop-blur-sm hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '200ms' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Completed Today</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mt-2">{totalDeliveries}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-in border-orange-100 dark:border-gray-700 backdrop-blur-sm hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '300ms' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Success Rate</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mt-2">98%</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {selectedDonation && selectedDonation.status === 'picked-up' && (
          <div className="mb-8 animate-fade-in">
            <DeliveryMap 
              pickupLocation={{
                lat: selectedDonation.pickupCoordinates?.lat || 40.7128,
                lng: selectedDonation.pickupCoordinates?.lng || -74.0060,
                label: selectedDonation.pickupLocation
              }}
              currentLocation={{
                lat: selectedDonation.deliveryCoordinates?.lat || 40.7350,
                lng: selectedDonation.deliveryCoordinates?.lng || -73.9005,
              }}
              status="in-transit"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-8 animate-fade-in">
          <Button
            variant={view === 'assigned' ? 'default' : 'outline'}
            onClick={() => setView('assigned')}
            className={view === 'assigned' ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-full' : 'border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/20'}
          >
            <Clock className="w-4 h-4 mr-2" />
            Ready for Pickup ({assignedPickups.length})
          </Button>
          <Button
            variant={view === 'in-transit' ? 'default' : 'outline'}
            onClick={() => setView('in-transit')}
            className={view === 'in-transit' ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-full' : 'border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/20'}
          >
            <Truck className="w-4 h-4 mr-2" />
            In Transit ({inTransit.length})
          </Button>
          <Button
            variant={view === 'completed' ? 'default' : 'outline'}
            onClick={() => setView('completed')}
            className={view === 'completed' ? 'bg-gradient-to-r from-orange-500 to-yellow-600 text-white rounded-full' : 'border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/20'}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Completed ({completedDeliveries.length})
          </Button>
        </div>

        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
          {displayedDonations.length > 0 ? (
            displayedDonations.map((donation, index) => (
              <Card 
                key={donation.id}
                className={`border-orange-100 dark:border-gray-700 backdrop-blur-sm animate-slide-in overflow-hidden transition-all duration-300 cursor-pointer ${
                  selectedDelivery === donation.id 
                    ? 'shadow-lg border-orange-400 dark:border-orange-600 bg-orange-50/50 dark:bg-orange-900/10'
                    : 'hover:shadow-md hover:border-orange-200'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedDelivery(selectedDelivery === donation.id ? null : donation.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {donation.foodType}
                        {donation.status === 'picked-up' && <Map className="w-4 h-4 text-orange-600" />}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">From: {donation.donorOrganization}</p>
                    </div>
                    <StatusBadge status={donation.status} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Quantity</p>
                      <p className="font-semibold">{donation.quantity}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Pickup Location</p>
                      <p className="font-semibold truncate">{donation.pickupLocation}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">NGO</p>
                      <p className="font-semibold">{donation.ngoName || 'Pending'}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {donation.status === 'accepted' && (
                      <Button 
                        onClick={() => handlePickup(donation.id)}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-lg text-white font-semibold transform transition-all duration-300 hover:scale-105 active:scale-95 rounded-full"
                      >
                        <Truck className="w-4 h-4 mr-2" />
                        Mark Picked Up
                      </Button>
                    )}
                    {donation.status === 'picked-up' && (
                      <Button 
                        onClick={() => handleDeliver(donation.id)}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-600 hover:shadow-lg text-white font-semibold transform transition-all duration-300 hover:scale-105 active:scale-95 rounded-full"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Mark Delivered
                      </Button>
                    )}
                    {donation.status === 'delivered' && (
                      <div className="w-full bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg text-sm text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800 text-center font-semibold">
                        Delivery completed successfully
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-orange-100 dark:border-gray-700 backdrop-blur-sm">
              <CardContent className="pt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  {view === 'assigned' 
                    ? 'No pickups waiting. Check back soon!' 
                    : view === 'in-transit'
                    ? 'No deliveries in transit.'
                    : 'No completed deliveries yet.'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <NotificationCenter />
    </div>
  )
}
