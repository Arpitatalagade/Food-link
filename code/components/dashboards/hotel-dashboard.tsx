'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, TrendingUp } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import Header from '@/components/common/header'
import FoodSubmissionForm from '@/components/forms/food-submission-form'
import FoodListingDisplay from '@/components/displays/food-listing-display'
import NotificationCenter from '@/components/notifications/notification-center'

interface HotelDashboardProps {
  userName: string
  onLogout: () => void
  onLogoClick?: () => void
}

export default function HotelDashboard({ userName, onLogout, onLogoClick }: HotelDashboardProps) {
  const [showForm, setShowForm] = useState(false)
  const { donations, notifications } = useAppStore()
  
  const hotelDonations = donations.filter((d) => d.donorName === userName)
  const activeListings = hotelDonations.filter((d) => d.status === 'available').length
  const mealsDonated = hotelDonations.reduce((sum, d) => sum + (parseInt(d.quantity) || 0), 0)
  const successfulDeliveries = hotelDonations.filter((d) => d.status === 'delivered').length
  const unreadNotifications = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header 
        title="Restaurant Dashboard"
        subtitle={`Donating meals to those in need • ${userName}`}
        userName={userName}
        onLogout={onLogout}
        onLogoClick={onLogoClick}
        notificationCount={unreadNotifications}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!showForm ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="animate-slide-in border-orange-100 dark:border-gray-700 backdrop-blur-sm overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '0ms' }}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">Active Listings</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mt-2">{activeListings}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-slide-in border-orange-100 dark:border-gray-700 backdrop-blur-sm overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '100ms' }}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">Meals Donated</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mt-2">{mealsDonated}</p>
                    </div>
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🍛</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-slide-in border-orange-100 dark:border-gray-700 backdrop-blur-sm overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '200ms' }}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">Delivered</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mt-2">{successfulDeliveries}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">✓</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-slide-in border-orange-100 dark:border-gray-700 backdrop-blur-sm overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '300ms' }}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">Total Donations</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mt-2">{hotelDonations.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-8 animate-fade-in">
              <Button 
                onClick={() => setShowForm(true)} 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-amber-600 hover:shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 text-white font-semibold rounded-full"
              >
                <Plus className="w-5 h-5 mr-2" />
                Donate Food Now
              </Button>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="mb-6">
                <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-2">Your Donations</h2>
                <p className="text-muted-foreground">Track and manage your food donations</p>
              </div>

              {hotelDonations.length > 0 ? (
                <FoodListingDisplay donations={hotelDonations} />
              ) : (
                <Card className="border-orange-100 dark:border-gray-700 backdrop-blur-sm">
                  <CardContent className="pt-8 text-center">
                    <p className="text-muted-foreground mb-4">No donations yet. Start making a difference today!</p>
                    <Button 
                      onClick={() => setShowForm(true)}
                      variant="outline"
                      className="border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/20"
                    >
                      Create Your First Donation
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <Button 
              variant="outline" 
              onClick={() => setShowForm(false)}
              className="border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/20"
            >
              Back to Dashboard
            </Button>
            <FoodSubmissionForm userName={userName} onSuccess={() => setShowForm(false)} />
          </div>
        )}
      </main>

      <NotificationCenter />
    </div>
  )
}
