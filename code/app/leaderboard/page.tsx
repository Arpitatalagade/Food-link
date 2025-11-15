'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import RestaurantsLeaderboard from '@/components/dashboards/restaurants-leaderboard'

export default function LeaderboardPage() {
  const router = useRouter()
  const [userName] = useState('Admin User')

  const handleLogout = () => {
    router.push('/')
  }

  return (
    <div>
      <RestaurantsLeaderboard userName={userName} onLogout={handleLogout} />
      <Button
        onClick={() => router.push('/')}
        className="fixed top-4 left-4 z-50 bg-orange-600 hover:bg-orange-700"
        size="sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
    </div>
  )
}
