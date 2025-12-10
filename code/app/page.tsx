'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import LandingPage from '@/components/landing/landing-page'
import LoginPage from '@/components/auth/login-page'
import RoleSelector from '@/components/auth/role-selector'
import BotVerification from '@/components/auth/bot-verification'
import NgOSignup from '@/components/auth/signup-ngo'
import HotelSignup from '@/components/auth/signup-hotel'
import DeliverySignup from '@/components/auth/signup-delivery'
import HotelDashboard from '@/components/dashboards/hotel-dashboard'
import NgoDashboard from '@/components/dashboards/ngo-dashboard'
import DeliveryDashboard from '@/components/dashboards/delivery-dashboard'
import AdminDashboard from '@/components/dashboards/admin-dashboard'
import RestaurantsLeaderboard from '@/components/dashboards/restaurants-leaderboard'
import Link from 'next/link'

export default function Home() {
  const [appState, setAppState] = useState<'landing' | 'login' | 'auth-flow' | 'logged-in'>('landing')
  const [authState, setAuthState] = useState<'login' | 'signup' | 'role-select' | 'bot-verify' | 'ngo-signup' | 'hotel-signup' | 'delivery-signup' | 'logged-in'>('login')
  const [userRole, setUserRole] = useState<'hotel' | 'ngo' | 'delivery' | 'admin' | null>(null)
  const [userName, setUserName] = useState('')
  const [adminMode, setAdminMode] = useState(false)
  const [ngoVerified, setNgoVerified] = useState(false)

  const handleLoginSuccess = (name: string) => {
    setUserName(name)
    setAuthState('bot-verify')
  }

  const handleBotVerificationComplete = () => {
    setAuthState('role-select')
  }

  const handleSignupSuccess = (userData: any) => {
    setUserName(userData.name)
    setUserRole(userData.role)
    setAuthState('bot-verify')
  }

  const handleBotVerifyAfterSignup = () => {
    setAuthState('logged-in')
    setAppState('logged-in')
  }

  const handleRoleSelect = (role: 'hotel' | 'ngo' | 'delivery' | 'admin') => {
    setUserRole(role)
    if (role === 'admin') {
      setAdminMode(true)
      setAuthState('logged-in')
      setAppState('logged-in')
    } else if (role === 'hotel') {
      setAuthState('hotel-signup')
    } else if (role === 'ngo') {
      setAuthState('ngo-signup')
    } else if (role === 'delivery') {
      setAuthState('delivery-signup')
    }
  }

  const handleLogout = () => {
    setAppState('landing')
    setAuthState('login')
    setUserRole(null)
    setUserName('')
    setAdminMode(false)
    setNgoVerified(false)
  }

  const handleGetStarted = () => {
    setAppState('auth-flow')
    setAuthState('login')
  }

  const handleToSignup = () => {
    setAuthState('role-select')
  }

  const handleBackToRoleSelect = () => {
    setAuthState('role-select')
  }

  if (appState === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />
  }

  if (appState === 'auth-flow') {
    if (authState === 'login') {
      return (
        <div>
          <LoginPage onLoginSuccess={handleLoginSuccess} />
          <div className="fixed bottom-4 left-4 text-sm text-gray-600 dark:text-gray-400">
            <Button 
              onClick={handleToSignup}
              variant="outline"
              size="sm"
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              New User? Sign Up
            </Button>
          </div>
        </div>
      )
    }

    if (authState === 'bot-verify') {
      return <BotVerification onVerified={userRole ? handleBotVerifyAfterSignup : handleBotVerificationComplete} />
    }

    if (authState === 'role-select') {
      return <RoleSelector userName={userName} onRoleSelect={handleRoleSelect} />
    }

    if (authState === 'ngo-signup') {
      return <NgOSignup onSignupSuccess={handleSignupSuccess} onBack={handleBackToRoleSelect} />
    }

    if (authState === 'hotel-signup') {
      return <HotelSignup onSignupSuccess={handleSignupSuccess} onBack={handleBackToRoleSelect} />
    }

    if (authState === 'delivery-signup') {
      return <DeliverySignup onSignupSuccess={handleSignupSuccess} onBack={handleBackToRoleSelect} />
    }
  }

  if (userRole === 'ngo' && !ngoVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 to-yellow-50 dark:from-gray-950 dark:to-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Only verified NGOs can access this dashboard.</p>
          <Button onClick={handleLogout}>Return to Home</Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {adminMode && userRole === 'admin' && <AdminDashboard userName={userName} onLogout={handleLogout} onLogoClick={handleLogout} />}
      {userRole === 'hotel' && <HotelDashboard userName={userName} onLogout={handleLogout} onLogoClick={handleLogout} />}
      {userRole === 'ngo' && <NgoDashboard userName={userName} onLogout={handleLogout} onLogoClick={handleLogout} />}
      {userRole === 'delivery' && <DeliveryDashboard userName={userName} onLogout={handleLogout} onLogoClick={handleLogout} />}

      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        {userRole !== 'admin' && (
          <Link href="/leaderboard">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-linear-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Top Donors
            </Button>
          </Link>
        )}
        
        <Link href="/analytics">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Analytics
          </Button>
        </Link>
      </div>
    </>
  )
}
