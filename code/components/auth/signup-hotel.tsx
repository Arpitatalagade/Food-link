'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2 } from 'lucide-react'
import { AppLogo } from '@/components/logo/app-logo'
import { BasicInfoSection } from './forms/form-section-basic'
import { ContactSection } from './forms/form-section-contact'

interface HotelSignupProps {
  onSignupSuccess: (userData: any) => void
  onBack: () => void
}

export default function HotelSignup({ onSignupSuccess, onBack }: HotelSignupProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    hotelName: '',
    ownerName: '',
    phone: '',
    address: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleClearError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.includes('@')) newErrors.email = 'Valid email required'
    if (formData.password.length < 6) newErrors.password = 'Password must be 6+ characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.hotelName.trim()) newErrors.hotelName = 'Hotel/Restaurant name required'
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number required'
    if (!formData.address.trim()) newErrors.address = 'Address required'

    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      onSignupSuccess({
        email: formData.email,
        name: formData.ownerName,
        role: 'hotel',
        organization: formData.hotelName,
        phone: formData.phone,
        address: formData.address,
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
              <Building2 className="w-8 h-8 text-orange-600 dark:text-orange-500" />
            </div>
          </div>
          <CardTitle className="text-xl text-center">Hotel/Restaurant Registration</CardTitle>
          <CardDescription className="text-center">Sign up your food establishment</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Hotel Name */}
            <div className="space-y-1.5">
              <label htmlFor="hotelName" className="text-sm font-medium">
                Hotel/Restaurant Name *
              </label>
              <input
                id="hotelName"
                type="text"
                placeholder="Your establishment name"
                value={formData.hotelName}
                onChange={(e) => {
                  handleChange('hotelName', e.target.value)
                  handleClearError('hotelName')
                }}
                className="w-full px-3 py-2 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50 text-sm"
              />
              {errors.hotelName && <p className="text-xs text-red-600 dark:text-red-500 animate-slide-in">{errors.hotelName}</p>}
            </div>

            {/* Owner Name */}
            <div className="space-y-1.5">
              <label htmlFor="ownerName" className="text-sm font-medium">
                Owner Name *
              </label>
              <input
                id="ownerName"
                type="text"
                placeholder="Your name"
                value={formData.ownerName}
                onChange={(e) => {
                  handleChange('ownerName', e.target.value)
                  handleClearError('ownerName')
                }}
                className="w-full px-3 py-2 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50 text-sm"
              />
              {errors.ownerName && <p className="text-xs text-red-600 dark:text-red-500 animate-slide-in">{errors.ownerName}</p>}
            </div>

            <BasicInfoSection
              email={formData.email}
              password={formData.password}
              confirmPassword={formData.confirmPassword}
              errors={errors}
              onChange={handleChange}
              onClearError={handleClearError}
            />

            <ContactSection
              phone={formData.phone}
              address={formData.address}
              errors={errors}
              onChange={handleChange}
              onClearError={handleClearError}
            />

            {errors.general && <p className="text-sm text-red-600 dark:text-red-500 animate-slide-down">{errors.general}</p>}

            <Button 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 h-9 mt-4"
            >
              {isLoading ? 'Creating Account...' : 'Register Hotel'}
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
