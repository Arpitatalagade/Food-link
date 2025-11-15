'use client'

import { Button } from '@/components/ui/button'
import { LogOut, Bell, Menu } from 'lucide-react'
import { useState } from 'react'
import { AppLogo } from '@/components/logo/app-logo'

interface HeaderProps {
  title: string
  subtitle?: string
  userName: string
  onLogout: () => void
  notificationCount?: number
  onNotificationClick?: () => void
  onLogoClick?: () => void
}

export default function Header({ 
  title, 
  subtitle, 
  userName, 
  onLogout, 
  notificationCount = 0,
  onNotificationClick,
  onLogoClick 
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 border-b border-orange-100 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-md bg-opacity-80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={onLogoClick}>
          <div className="hidden sm:block hover:opacity-80 transition-opacity">
            <AppLogo size="sm" />
          </div>
          <div>
            <h1 className="text-2xl font-light text-gray-900 dark:text-white"><span className="font-medium bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">{title}</span></h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {notificationCount > 0 && onNotificationClick && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onNotificationClick}
              className="relative animate-pulse-soft hover:bg-orange-100 dark:hover:bg-orange-900/20"
            >
              <Bell className="w-5 h-5 text-orange-600 dark:text-orange-500" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-orange-600 text-white text-xs flex items-center justify-center rounded-full font-bold animate-scale-in">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </Button>
          )}

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-orange-100 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-900 dark:text-white">{userName}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLogout}
              className="hover:bg-orange-100 dark:hover:bg-orange-900/20 text-orange-600 dark:text-orange-500 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>

          <button
            className="sm:hidden text-gray-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-orange-100 dark:border-gray-700 bg-orange-50 dark:bg-gray-800 p-4 animate-slide-down">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-900 dark:text-white">{userName}</span>
            <Button 
              onClick={onLogout}
              className="w-full justify-center gap-2 border-orange-200 dark:border-orange-900 hover:bg-orange-100 dark:hover:bg-orange-900/20"
              variant="outline"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
