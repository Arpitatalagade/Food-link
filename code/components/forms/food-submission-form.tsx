'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppStore } from '@/lib/store'
import { Upload, X, Loader2 } from 'lucide-react'

interface FoodSubmissionFormProps {
  userName: string
  onSuccess: () => void
}

export default function FoodSubmissionForm({ userName, onSuccess }: FoodSubmissionFormProps) {
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    expiryTime: 2,
    pickupLocation: '',
    notes: '',
    photo: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const { addDonation } = useAppStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.foodType.trim()) newErrors.foodType = 'Food type is required'
    if (!formData.quantity || parseInt(formData.quantity) <= 0) newErrors.quantity = 'Valid quantity is required'
    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = 'Pickup location is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      addDonation({
        donorId: 'hotel_' + Date.now(),
        donorName: userName,
        donorOrganization: userName,
        foodType: formData.foodType,
        quantity: formData.quantity,
        expiryTime: new Date(Date.now() + formData.expiryTime * 60 * 60 * 1000),
        pickupLocation: formData.pickupLocation,
        notes: formData.notes,
        status: 'available',
      })

      setFormData({ foodType: '', quantity: '', expiryTime: 2, pickupLocation: '', notes: '', photo: '' })
      setIsLoading(false)
      onSuccess()
    }, 600)
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, photo: event.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="max-w-2xl border-white/20 backdrop-blur-sm animate-fade-in">
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Donate Food</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Food Type *</label>
            <input
              type="text"
              placeholder="e.g., Biryani, Samosas, Pizza, Curry..."
              value={formData.foodType}
              onChange={(e) => {
                setFormData({ ...formData, foodType: e.target.value })
                setErrors({ ...errors, foodType: '' })
              }}
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50"
            />
            {errors.foodType && <p className="text-xs text-destructive animate-slide-in">{errors.foodType}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity *</label>
              <input
                type="number"
                placeholder="50"
                value={formData.quantity}
                onChange={(e) => {
                  setFormData({ ...formData, quantity: e.target.value })
                  setErrors({ ...errors, quantity: '' })
                }}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50"
              />
              {errors.quantity && <p className="text-xs text-destructive animate-slide-in">{errors.quantity}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Expires In (hours)</label>
              <select
                value={formData.expiryTime}
                onChange={(e) => setFormData({ ...formData, expiryTime: parseInt(e.target.value) })}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50"
              >
                <option value={1}>1 hour - Urgent</option>
                <option value={2}>2 hours</option>
                <option value={3}>3 hours</option>
                <option value={6}>6 hours</option>
                <option value={12}>12 hours</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Pickup Location *</label>
            <input
              type="text"
              placeholder="123 Main St, Downtown, City"
              value={formData.pickupLocation}
              onChange={(e) => {
                setFormData({ ...formData, pickupLocation: e.target.value })
                setErrors({ ...errors, pickupLocation: '' })
              }}
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50"
            />
            {errors.pickupLocation && <p className="text-xs text-destructive animate-slide-in">{errors.pickupLocation}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Special Notes (Optional)</label>
            <textarea
              placeholder="Any allergies, dietary info, or special instructions..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Photo (Optional)</label>
            <div className="relative">
              {formData.photo ? (
                <div className="relative animate-scale-in">
                  <img src={formData.photo || "/placeholder.svg"} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-border" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, photo: '' })}
                    className="absolute top-2 right-2 bg-destructive text-white p-2 rounded-lg hover:bg-destructive/90 transition-all duration-200 transform hover:scale-110"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-all duration-200">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Click to upload food photo</span>
                  </div>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-lg text-white font-semibold transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Donation'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
