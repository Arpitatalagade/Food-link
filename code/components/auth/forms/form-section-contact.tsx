'use client'

import { Phone, MapPin } from 'lucide-react'

interface ContactSectionProps {
  phone: string
  address: string
  errors: Record<string, string>
  onChange: (field: string, value: string) => void
  onClearError: (field: string) => void
}

export function ContactSection({
  phone,
  address,
  errors,
  onChange,
  onClearError,
}: ContactSectionProps) {
  return (
    <>
      {/* Phone */}
      <div className="space-y-1.5">
        <label htmlFor="phone" className="text-sm font-medium">Phone Number *</label>
        <div className="relative group">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600 dark:text-orange-500 w-4 h-4" />
          <input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChange={(e) => {
              onChange('phone', e.target.value)
              onClearError('phone')
            }}
            className="w-full pl-10 pr-3 py-2 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50 text-sm"
          />
        </div>
        {errors.phone && <p className="text-xs text-red-600 dark:text-red-500 animate-slide-in">{errors.phone}</p>}
      </div>

      {/* Address */}
      <div className="space-y-1.5">
        <label htmlFor="address" className="text-sm font-medium">Address/Location *</label>
        <div className="relative group">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600 dark:text-orange-500 w-4 h-4" />
          <input
            id="address"
            type="text"
            placeholder="Full address"
            value={address}
            onChange={(e) => {
              onChange('address', e.target.value)
              onClearError('address')
            }}
            className="w-full pl-10 pr-3 py-2 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50 text-sm"
          />
        </div>
        {errors.address && <p className="text-xs text-red-600 dark:text-red-500 animate-slide-in">{errors.address}</p>}
      </div>
    </>
  )
}
