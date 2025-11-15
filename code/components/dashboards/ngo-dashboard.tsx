'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Filter, Heart } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import Header from '@/components/common/header'
import FoodListingDisplay from '@/components/displays/food-listing-display'
import NotificationCenter from '@/components/notifications/notification-center'
import StatusBadge from '@/components/common/status-badge'

interface NgoDashboardProps {
  userName: string
  onLogout: () => void
  onLogoClick?: () => void
}

export default function NgoDashboard({ userName, onLogout, onLogoClick }: NgoDashboardProps) {
  const [filterStatus, setFilterStatus] = useState<'available' | 'accepted' | 'all'>('available')
  const { donations, updateDonationStatus, notifications } = useAppStore()

  const availableDonations = donations.filter((d) => d.status === 'available')
  const acceptedDonations = donations.filter((d) => d.ngoId === 'ngo1' || d.ngoName === userName)
  const displayedDonations = 
    filterStatus === 'available' 
      ? availableDonations 
      : filterStatus === 'accepted' 
      ? acceptedDonations 
      : donations
  
  const unreadNotifications = notifications.filter((n) => !n.read).length
  const mealsReceived = acceptedDonations.filter((d) => d.status === 'delivered').reduce((sum, d) => sum + (parseInt(d.quantity) || 0), 0)

  const handleAcceptDonation = (donationId: string) => {
    updateDonationStatus(donationId, 'accepted', userName)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header 
        title="NGO Dashboard"
        subtitle={`Receiving donations to help communities • ${userName}`}
        userName={userName}
        onLogout={onLogout}
        onLogoClick={onLogoClick}
        notificationCount={unreadNotifications}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="animate-slide-in border-orange-100 dark:border-gray-700 backdrop-blur-sm hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '0ms' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Available</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mt-2">{availableDonations.length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-in border-orange-100 dark:border-gray-700 backdrop-blur-sm hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '100ms' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Accepted</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mt-2">{acceptedDonations.length}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-in border-orange-100 dark:border-gray-700 backdrop-blur-sm hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '200ms' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Meals Received</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mt-2">{mealsReceived}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🍽️</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 animate-fade-in">
          <Button
            variant={filterStatus === 'available' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('available')}
            className={filterStatus === 'available' ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-full' : 'border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/20'}
          >
            <Filter className="w-4 h-4 mr-2" />
            Available ({availableDonations.length})
          </Button>
          <Button
            variant={filterStatus === 'accepted' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('accepted')}
            className={filterStatus === 'accepted' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full' : 'border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/20'}
          >
            My Requests ({acceptedDonations.length})
          </Button>
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
            className={filterStatus === 'all' ? 'bg-gradient-to-r from-orange-500 to-yellow-600 text-white rounded-full' : 'border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/20'}
          >
            All Donations ({donations.length})
          </Button>
        </div>

        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
          {displayedDonations.length > 0 ? (
            displayedDonations.map((donation, index) => (
              <Card 
                key={donation.id}
                className="border-orange-100 dark:border-gray-700 backdrop-blur-sm animate-slide-in overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{donation.foodType}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">From: {donation.donorOrganization}</p>
                    </div>
                    <StatusBadge status={donation.status} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Quantity</p>
                      <p className="font-semibold">{donation.quantity}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expires</p>
                      <p className="font-semibold">{Math.round((donation.expiryTime.getTime() - Date.now()) / (60 * 60 * 1000))}h remaining</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Pickup</p>
                      <p className="font-semibold truncate">{donation.pickupLocation}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-semibold capitalize">{donation.status}</p>
                    </div>
                  </div>

                  {donation.status === 'available' && (
                    <Button 
                      onClick={() => handleAcceptDonation(donation.id)}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:shadow-lg text-white font-semibold transform transition-all duration-300 hover:scale-105 active:scale-95 rounded-full"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Accept Donation
                    </Button>
                  )}
                  {donation.status === 'accepted' && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg text-sm text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      Donation accepted. Awaiting pickup confirmation.
                    </div>
                  )}
                  {donation.status === 'picked-up' && (
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-sm text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                      Food is in transit. Expected delivery soon.
                    </div>
                  )}
                  {donation.status === 'delivered' && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg text-sm text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800">
                      Delivered successfully. Thank you for helping!
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-orange-100 dark:border-gray-700 backdrop-blur-sm">
              <CardContent className="pt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  {filterStatus === 'available' 
                    ? 'No food available right now. Check back soon!' 
                    : 'No donations in this category yet.'}
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
