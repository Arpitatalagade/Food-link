'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import AnalyticsDashboard from '@/components/dashboards/analytics-dashboard'
import { useRouter } from 'next/navigation'

export default function AnalyticsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <header className="bg-gradient-to-r from-orange-50/80 to-amber-50/80 dark:from-gray-800/80 dark:to-gray-900/80 border-b border-orange-100 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">Real-time insights & impact metrics</p>
          </div>
          <Button 
            onClick={() => router.push('/')}
            variant="outline"
            className="hover:bg-orange-100 dark:hover:bg-orange-900/20 border-orange-200 dark:border-gray-700 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to App
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <AnalyticsDashboard />
      </main>
    </div>
  )
}
