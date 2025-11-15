'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Building2 } from 'lucide-react'

interface HotelRegistrationFormProps {
  userName: string
  onComplete: () => void
}

export default function HotelRegistrationForm({ userName, onComplete }: HotelRegistrationFormProps) {
  const [formData, setFormData] = useState({
    hotelName: '',
    location: '',
    ownerName: userName,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.hotelName || !formData.location || !formData.ownerName) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onComplete()
    }, 800)
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
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg mx-auto mb-4 animate-scale-in">
            <Building2 className="w-6 h-6 text-orange-600 dark:text-orange-500" />
          </div>
          <CardTitle className="text-2xl text-center">Complete Your Profile</CardTitle>
          <CardDescription className="text-center">Add your hotel details to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 animate-slide-down">
            <div className="space-y-2">
              <label htmlFor="hotelName" className="text-sm font-medium">
                Hotel/Restaurant Name *
              </label>
              <input
                id="hotelName"
                type="text"
                name="hotelName"
                placeholder="Enter your establishment name"
                value={formData.hotelName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location *
              </label>
              <input
                id="location"
                type="text"
                name="location"
                placeholder="City or address"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="ownerName" className="text-sm font-medium">
                Owner Name *
              </label>
              <input
                id="ownerName"
                type="text"
                name="ownerName"
                placeholder="Your name"
                value={formData.ownerName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-500 animate-slide-down">{error}</p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 dark:from-orange-600 dark:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 mt-6"
            >
              {isLoading ? 'Completing...' : 'Complete Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
