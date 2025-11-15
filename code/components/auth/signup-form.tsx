'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Lock, Building2, Phone, MapPin, Truck } from 'lucide-react'
import { AppLogo } from '@/components/logo/app-logo'
import { UserRole } from '@/lib/types'

interface SignupFormProps {
  role: UserRole;
  onSignupSuccess: (userData: any) => void;
  onBack: () => void;
}

export default function SignupForm({ role, onSignupSuccess, onBack }: SignupFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    organization: '',
    phone: '',
    address: '',
    vehicleType: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const getRoleTitle = () => {
    const titles: Record<string, string> = {
      hotel: 'Restaurant/Hotel',
      ngo: 'NGO/Non-Profit',
      delivery: 'Delivery Partner',
    }
    return titles[role || ''] || 'User'
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.name) {
      setError('Please fill in all required fields')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email')
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setTimeout(() => {
      onSignupSuccess({
        email: formData.email,
        name: formData.name,
        role: role,
        organization: formData.organization,
        phone: formData.phone,
        address: formData.address,
        vehicleType: role === 'delivery' ? formData.vehicleType : undefined,
      })
      setIsLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 animate-fade-in shadow-2xl border border-orange-100 dark:border-gray-800 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 justify-center mb-2">
            <div className="animate-scale-in">
              <AppLogo size="md" />
            </div>
          </div>
          <CardTitle className="text-xl text-center">Create Account</CardTitle>
          <CardDescription className="text-center">{getRoleTitle()} - Sign Up</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                {role === 'delivery' ? 'Full Name' : 'Contact Person Name'}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={role === 'delivery' ? 'Your name' : 'Contact person'}
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50 text-sm"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600 dark:text-orange-500 w-4 h-4" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50 text-sm"
                />
              </div>
            </div>

            {/* Organization */}
            {role !== 'delivery' && (
              <div className="space-y-1.5">
                <label htmlFor="organization" className="text-sm font-medium text-foreground">
                  {role === 'hotel' ? 'Restaurant/Hotel Name' : 'Organization Name'}
                </label>
                <div className="relative group">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600 dark:text-orange-500 w-4 h-4" />
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    placeholder={role === 'hotel' ? 'Your restaurant name' : 'Organization name'}
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Phone */}
            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">
                Phone Number
              </label>
              <div className="relative group">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600 dark:text-orange-500 w-4 h-4" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50 text-sm"
                />
              </div>
            </div>

            {/* Address/Location */}
            <div className="space-y-1.5">
              <label htmlFor="address" className="text-sm font-medium text-foreground">
                Address/Location
              </label>
              <div className="relative group">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600 dark:text-orange-500 w-4 h-4" />
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Full address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50 text-sm"
                />
              </div>
            </div>

            {/* Vehicle Type for Delivery Agents */}
            {role === 'delivery' && (
              <div className="space-y-1.5">
                <label htmlFor="vehicleType" className="text-sm font-medium text-foreground">
                  Vehicle Type
                </label>
                <div className="relative group">
                  <Truck className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600 dark:text-orange-500 w-4 h-4" />
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={(e) => handleChange(e as any)}
                    className="w-full pl-10 pr-3 py-2 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50 text-sm"
                  >
                    <option value="">Select vehicle</option>
                    <option value="bike">Bike</option>
                    <option value="car">Car</option>
                    <option value="van">Van</option>
                    <option value="truck">Truck</option>
                  </select>
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600 dark:text-orange-500 w-4 h-4" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50 text-sm"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600 dark:text-orange-500 w-4 h-4" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50 text-sm"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-500 animate-slide-down">{error}</p>}

            <Button 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 dark:from-orange-600 dark:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 h-9"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <Button 
              type="button"
              onClick={onBack}
              variant="outline"
              className="w-full text-sm h-9"
            >
              Back to Role Selection
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
