'use client'

import { Mail, Lock } from 'lucide-react'

interface BasicInfoSectionProps {
  email: string
  password: string
  confirmPassword: string
  errors: Record<string, string>
  onChange: (field: string, value: string) => void
  onClearError: (field: string) => void
}

export function BasicInfoSection({
  email,
  password,
  confirmPassword,
  errors,
  onChange,
  onClearError,
}: BasicInfoSectionProps) {
  return (
    <>
      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">Email *</label>
        <div className="relative group">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600 dark:text-orange-500 w-4 h-4" />
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              onChange('email', e.target.value)
              onClearError('email')
            }}
            className="w-full pl-10 pr-3 py-2 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50 text-sm"
          />
        </div>
        {errors.email && <p className="text-xs text-red-600 dark:text-red-500 animate-slide-in">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium">Password *</label>
        <div className="relative group">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600 dark:text-orange-500 w-4 h-4" />
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              onChange('password', e.target.value)
              onClearError('password')
            }}
            className="w-full pl-10 pr-3 py-2 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50 text-sm"
          />
        </div>
        {errors.password && <p className="text-xs text-red-600 dark:text-red-500 animate-slide-in">{errors.password}</p>}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5">
        <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password *</label>
        <div className="relative group">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600 dark:text-orange-500 w-4 h-4" />
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => {
              onChange('confirmPassword', e.target.value)
              onClearError('confirmPassword')
            }}
            className="w-full pl-10 pr-3 py-2 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50 text-sm"
          />
        </div>
        {errors.confirmPassword && <p className="text-xs text-red-600 dark:text-red-500 animate-slide-in">{errors.confirmPassword}</p>}
      </div>
    </>
  )
}
