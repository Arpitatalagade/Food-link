'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Heart, Truck } from 'lucide-react'

interface RoleSelectorProps {
  userName: string
  onRoleSelect: (role: 'hotel' | 'ngo' | 'delivery' | 'admin') => void
}

export default function RoleSelector({ userName, onRoleSelect }: RoleSelectorProps) {
  const roles = [
    {
      id: 'hotel' as const,
      title: 'Restaurant/Hotel',
      description: 'Donate surplus food to reduce waste',
      icon: Building2,
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      accentColor: 'text-orange-600 dark:text-orange-400',
      borderColor: 'border-orange-200 dark:border-orange-800',
    },
    {
      id: 'ngo' as const,
      title: 'NGO/Charity',
      description: 'Request & track food donations',
      icon: Heart,
      color: 'from-amber-400 to-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      accentColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-200 dark:border-amber-800',
    },
    {
      id: 'delivery' as const,
      title: 'Delivery Agent',
      description: 'Manage logistics & deliveries',
      icon: Truck,
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      accentColor: 'text-yellow-600 dark:text-yellow-400',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 pt-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Welcome, {userName}!
          </h1>
          <p className="text-muted-foreground text-lg">Choose your role to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map(({ id, title, description, icon: Icon, color, bgColor, accentColor, borderColor }, index) => (
            <Card 
              key={id} 
              className={`cursor-pointer animate-slide-in transition-all duration-300 hover:shadow-2xl hover:scale-105 ${bgColor} border ${borderColor} backdrop-blur-sm`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onRoleSelect(id)}
            >
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg transform transition-transform hover:scale-110 animate-scale-in`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className={accentColor}>{title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                <Button
                  onClick={() => onRoleSelect(id)}
                  className={`w-full bg-gradient-to-r ${color} hover:shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 text-white font-semibold`}
                >
                  Continue as {title.split('/')[0]}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 pt-8 border-t border-orange-100 dark:border-gray-700 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Administrator Access</p>
          <Button
            variant="outline"
            className="border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/20"
            onClick={() => onRoleSelect('admin')}
          >
            System Admin Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
