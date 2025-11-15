'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Bell, X, Heart, Package, Truck, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NotificationCenter() {
  const { notifications, markNotificationAsRead, removeNotification } = useAppStore()
  const [showPanel, setShowPanel] = useState(false)
  
  const unreadCount = notifications.filter(n => !n.read).length
  const recentNotifications = notifications.slice(0, 5)

  const getIcon = (type: string) => {
    switch (type) {
      case 'donation':
        return <Heart className="w-5 h-5 text-red-600" />
      case 'acceptance':
        return <CheckCircle2 className="w-5 h-5 text-yellow-600" />
      case 'pickup':
        return <Package className="w-5 h-5 text-blue-600" />
      case 'delivery':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      default:
        return <Heart className="w-5 h-5 text-emerald-600" />
    }
  }

  const getColorClass = (type: string) => {
    switch (type) {
      case 'donation':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      case 'acceptance':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      case 'pickup':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
      case 'delivery':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      default:
        return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
    }
  }

  return (
    <>
      {/* Floating notification bell with animations */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          <button
            onClick={() => setShowPanel(!showPanel)}
            className="relative p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-6 h-6 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-destructive rounded-full animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification panel with glass effect */}
          {showPanel && (
            <Card className="absolute bottom-full right-0 mb-3 w-96 max-h-96 shadow-2xl animate-slide-up border-white/20 backdrop-blur-sm">
              <CardHeader className="border-b border-border sticky top-0 z-10 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <button 
                    onClick={() => setShowPanel(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </CardHeader>

              <CardContent className="p-0 overflow-y-auto max-h-80">
                {recentNotifications.length > 0 ? (
                  <div className="divide-y divide-border">
                    {recentNotifications.map((notif, index) => (
                      <div 
                        key={notif.id}
                        className={`p-4 hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in border-l-4 ${getColorClass(notif.type)}`}
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={() => markNotificationAsRead(notif.id)}
                      >
                        <div className="flex items-start gap-3 justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="flex-shrink-0 mt-0.5">
                              {getIcon(notif.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground">{notif.title}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {new Date(notif.createdAt).toLocaleTimeString()}
                              </p>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0 animate-pulse" />
                            )}
                          </div>
                          {/* Close button to remove notifications from panel */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notif.id)
                            }}
                            className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 ml-2"
                            title="Remove notification"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground text-sm">
                    No notifications yet. Stay tuned!
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Toast notifications for latest updates */}
      <div className="fixed top-6 right-6 z-40 space-y-2 pointer-events-none">
        {recentNotifications.slice(0, 2).map((notif, index) => (
          <div
            key={notif.id}
            className={`p-4 rounded-lg shadow-lg text-foreground flex items-start gap-3 max-w-sm animate-slide-in pointer-events-auto border-l-4 ${getColorClass(notif.type)} backdrop-blur-sm group`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-shrink-0">
              {getIcon(notif.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{notif.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
            </div>
            {/* Close button to toast notifications */}
            <button
              onClick={() => removeNotification(notif.id)}
              className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
