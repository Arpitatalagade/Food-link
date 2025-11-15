'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/lib/store'
import Header from '@/components/common/header'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { Users, FileText, AlertCircle, TrendingUp, Activity, Settings } from 'lucide-react'

interface AdminDashboardProps {
  userName: string
  onLogout: () => void
  onLogoClick?: () => void
}

export default function AdminDashboard({ userName, onLogout, onLogoClick }: AdminDashboardProps) {
  const { donations, notifications } = useAppStore()
  const analytics = useAppStore((state) => state.getAnalytics())
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'available' | 'accepted' | 'delivered'>('all')

  const notificationCount = notifications.filter((n) => !n.read).length

  const filteredDonations = selectedFilter === 'all' 
    ? donations 
    : donations.filter((d) => d.status === selectedFilter)

  const getDonorCount = () => new Set(donations.map(d => d.donorId)).size
  const getNgoCount = () => new Set(donations.filter(d => d.ngoId).map(d => d.ngoId)).size
  const getDeliveryAgentCount = () => new Set(donations.filter(d => d.deliveryAgentId).map(d => d.deliveryAgentId)).size

  const statusData = [
    { name: 'Available', value: donations.filter(d => d.status === 'available').length, color: '#ef4444' },
    { name: 'Accepted', value: donations.filter(d => d.status === 'accepted').length, color: '#eab308' },
    { name: 'Picked Up', value: donations.filter(d => d.status === 'picked-up').length, color: '#3b82f6' },
    { name: 'Delivered', value: donations.filter(d => d.status === 'delivered').length, color: '#22c55e' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header 
        title="Admin Dashboard"
        subtitle="System monitoring and management"
        userName={userName} 
        onLogout={onLogout}
        onLogoClick={onLogoClick}
        notificationCount={notificationCount}
      />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="border-orange-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm animate-scale-in">
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Donors</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-500">{getDonorCount()}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="pt-6">
              <div className="text-center">
                <Activity className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">NGOs</p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-500">{getNgoCount()}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="pt-6">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Delivery Agents</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">{getDeliveryAgentCount()}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="pt-6">
              <div className="text-center">
                <FileText className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Donations</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-500">{donations.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-500">{analytics.successRate}%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Distribution */}
          <Card className="border-orange-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Status Distribution</CardTitle>
              <CardDescription>Current donation statuses</CardDescription>
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
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card className="border-orange-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm lg:col-span-2">
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Donations and deliveries over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(251, 146, 60, 0.2)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #fb923c' }} />
                  <Legend />
                  <Line type="monotone" dataKey="donations" stroke="#fb923c" strokeWidth={2} name="Donations" />
                  <Line type="monotone" dataKey="deliveries" stroke="#22c55e" strokeWidth={2} name="Deliveries" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Activity Log */}
        <Card className="border-orange-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Donations</CardTitle>
                <CardDescription>Latest donation activity</CardDescription>
              </div>
              <div className="flex gap-2">
                {(['all', 'available', 'accepted', 'delivered'] as const).map((filter) => (
                  <Button
                    key={filter}
                    size="sm"
                    variant={selectedFilter === filter ? 'default' : 'outline'}
                    onClick={() => setSelectedFilter(filter)}
                    className={selectedFilter === filter ? 'bg-orange-600 hover:bg-orange-700' : ''}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-orange-100 dark:border-gray-700">
                  <tr>
                    <th className="text-left py-2 px-2 font-semibold text-gray-900 dark:text-white">Donor</th>
                    <th className="text-left py-2 px-2 font-semibold text-gray-900 dark:text-white">Food Type</th>
                    <th className="text-left py-2 px-2 font-semibold text-gray-900 dark:text-white">Quantity</th>
                    <th className="text-left py-2 px-2 font-semibold text-gray-900 dark:text-white">NGO</th>
                    <th className="text-left py-2 px-2 font-semibold text-gray-900 dark:text-white">Status</th>
                    <th className="text-left py-2 px-2 font-semibold text-gray-900 dark:text-white">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-100 dark:divide-gray-700">
                  {filteredDonations.map((d) => (
                    <tr key={d.id} className="hover:bg-orange-50/50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-3 px-2 text-gray-900 dark:text-gray-100">{d.donorName}</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{d.foodType}</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{d.quantity}</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{d.ngoName || '-'}</td>
                      <td className="py-3 px-2">
                        <Badge className={`${
                          d.status === 'available' ? 'bg-red-600' :
                          d.status === 'accepted' ? 'bg-yellow-600' :
                          d.status === 'picked-up' ? 'bg-blue-600' :
                          'bg-green-600'
                        }`}>
                          {d.status === 'picked-up' ? 'Picked Up' : d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-gray-500 dark:text-gray-400 text-xs">{new Date(d.createdAt).toLocaleTimeString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
