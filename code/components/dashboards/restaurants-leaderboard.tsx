'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/lib/store'
import Header from '@/components/common/header'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Trophy, Flame, TrendingUp } from 'lucide-react'

export default function RestaurantsLeaderboard({ userName, onLogout }: { userName: string; onLogout: () => void }) {
  const { donations, notifications } = useAppStore()
  const topRestaurants = useAppStore((state) => state.getTopRestaurants(10))
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'weekly' | 'monthly'>('all')

  const notificationCount = notifications.filter((n) => !n.read).length

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Chart data
  const chartData = topRestaurants.slice(0, 5).map((r) => ({
    name: r.restaurantName.split(' ').slice(0, 2).join(' '),
    donations: r.totalDonations,
    meals: r.totalMealsDonated,
  }))

  const colors = ['#fb923c', '#f97316', '#fbbf24', '#f59e0b', '#fed7aa']

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header 
        title="Top Donors Leaderboard"
        subtitle="Celebrating our most generous restaurant partners"
        userName={userName} 
        onLogout={onLogout}
        notificationCount={notificationCount}
      />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-orange-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0s' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Restaurants</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-500 mt-2">{new Set(donations.map(d => d.donorId)).size}</p>
                </div>
                <Trophy className="w-12 h-12 text-orange-600/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Donations</p>
                  <p className="text-3xl font-bold text-amber-600 dark:text-amber-500 mt-2">{donations.length}</p>
                </div>
                <Flame className="w-12 h-12 text-amber-600/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Meals Saved</p>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-500 mt-2">
                    {donations.reduce((sum, d) => sum + (parseInt(d.quantity) || 0), 0)}
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-yellow-600/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-orange-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-orange-600" />
                  Top Donor Restaurants
                </CardTitle>
                <CardDescription>Ranked by total donations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topRestaurants.map((restaurant, index) => (
                    <div
                      key={restaurant.restaurantId}
                      className="p-4 rounded-lg border border-orange-100 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800/50 dark:to-gray-700/50 hover:shadow-md hover:border-orange-200 dark:hover:border-gray-600 transition-all duration-300 animate-slide-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-600 to-amber-600 text-white font-bold text-sm">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{restaurant.restaurantName}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{restaurant.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-orange-600 hover:bg-orange-700 mb-2">{restaurant.totalDonations} donations</Badge>
                          <p className="text-sm font-semibold text-amber-600 dark:text-amber-500">{restaurant.totalMealsDonated} meals</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Last: {formatDate(restaurant.lastDonationDate)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="space-y-4">
            <Card className="border-orange-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Top 5 Donors</CardTitle>
                <CardDescription>By donation count</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(251, 146, 60, 0.2)" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #fb923c' }} />
                    <Bar dataKey="donations" fill="#fb923c" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
