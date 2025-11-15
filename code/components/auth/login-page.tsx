'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Lock } from 'lucide-react'
import { AppLogo } from '@/components/logo/app-logo'

interface LoginPageProps {
  onLoginSuccess: (name: string) => void
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email')
      return
    }
    
    setIsLoading(true)
    setTimeout(() => {
      onLoginSuccess(email.split('@')[0])
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
          <div className="flex items-center gap-2 justify-center mb-4">
            <div className="animate-scale-in">
              <AppLogo size="lg" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-500 dark:to-amber-500 bg-clip-text text-transparent">FoodFlow</CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-400">Connect & reduce food waste together</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600 dark:text-orange-500 w-4 h-4 transition-all group-focus-within:scale-110" />
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  className="w-full pl-10 pr-4 py-2.5 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600 dark:text-orange-500 w-4 h-4 transition-all group-focus-within:scale-110" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  className="w-full pl-10 pr-4 py-2.5 border border-orange-100 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-card/50 dark:bg-gray-800/50"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-500 animate-slide-down">{error}</p>}

            <Button 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 dark:from-orange-600 dark:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-orange-100 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
            Demo: Use any email & password to continue
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
