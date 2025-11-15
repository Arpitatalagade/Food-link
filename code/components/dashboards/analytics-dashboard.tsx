'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useAppStore } from '@/lib/store'
import { TrendingUp, Users, Package, CheckCircle, Zap } from 'lucide-react'

export default function AnalyticsDashboard() {
  const { getAnalytics } = useAppStore()
  
  const analytics = useMemo(() => getAnalytics(), [getAnalytics])

  const statusData = useMemo(() => [
    { name: 'Available', value: analytics.totalDonations - analytics.totalDonations * (analytics.successRate / 100), fill: '#ea580c' },
    { name: 'Accepted', value: Math.floor(analytics.totalDonations * 0.2), fill: '#f59e0b' },
    { name: 'In Transit', value: Math.floor(analytics.totalDonations * 0.15), fill: '#f97316' },
    { name: 'Delivered', value: Math.floor(analytics.totalDonations * (analytics.successRate / 100)), fill: '#fbbf24' },
  ].filter(d => d.value > 0), [analytics])

  const foodTypeData = useMemo(() => 
    analytics.commonFoodTypes.slice(0, 5).map((item) => ({
      name: item.type,
      count: item.count,
      meals: item.count * 25,
    })), [analytics.commonFoodTypes])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="animate-slide-in border-orange-100 dark:border-gray-700 backdrop-blur-sm overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '0ms' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Package className="w-4 h-4 text-orange-600" />
              Total Meals Donated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">{analytics.totalMealsSaved}</p>
            <p className="text-xs text-muted-foreground mt-2">Lives impacted</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-in border-orange-100 dark:border-gray-700 backdrop-blur-sm overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '100ms' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-600" />
              Active Donors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{analytics.activeDonors}</p>
            <p className="text-xs text-muted-foreground mt-2">Restaurants & Hotels</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-in border-orange-100 dark:border-gray-700 backdrop-blur-sm overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '200ms' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-yellow-600" />
              Active NGOs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">{analytics.activeNGOs}</p>
            <p className="text-xs text-muted-foreground mt-2">Charities & Organizations</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-in border-orange-100 dark:border-gray-700 backdrop-blur-sm overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '300ms' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">{analytics.successRate}%</p>
            <p className="text-xs text-muted-foreground mt-2">Delivery completion</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card className="border-orange-100 dark:border-gray-700 backdrop-blur-sm animate-fade-in overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '100ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-600" />
              Donation Status
            </CardTitle>
            <CardDescription>Real-time distribution by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={800}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} donations`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="border-orange-100 dark:border-gray-700 backdrop-blur-sm animate-fade-in overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Donations and deliveries per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="donations" fill="#ea580c" name="Donations" radius={[8, 8, 0, 0]} animationDuration={800} />
                <Bar dataKey="deliveries" fill="#fbbf24" name="Delivered" radius={[8, 8, 0, 0]} animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Food Type Distribution */}
        <Card className="lg:col-span-2 border-orange-100 dark:border-gray-700 backdrop-blur-sm animate-fade-in overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-orange-600" />
              Popular Food Items
            </CardTitle>
            <CardDescription>Most frequently donated food types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={foodTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="count" fill="#f59e0b" name="# of Donations" radius={[8, 8, 0, 0]} animationDuration={800} />
                <Bar dataKey="meals" fill="#fbbf24" name="Total Servings" radius={[8, 8, 0, 0]} animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-orange-100 dark:border-gray-700 backdrop-blur-sm animate-fade-in overflow-hidden bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-900/10 dark:to-amber-900/10 hover:shadow-md hover:border-orange-200 transition-all duration-300" style={{ animationDelay: '400ms' }}>
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 dark:text-white">Impact Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Total Donations</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">{analytics.totalDonations}</p>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Meals Saved</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">{analytics.totalMealsSaved.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Community Partners</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">{analytics.activeDonors + analytics.activeNGOs}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
