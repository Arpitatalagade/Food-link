'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, MapPin, Users } from 'lucide-react'
import { FoodDonation } from '@/lib/types'
import StatusBadge from '@/components/common/status-badge'

interface FoodListingDisplayProps {
  donations: FoodDonation[]
}

export default function FoodListingDisplay({ donations }: FoodListingDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {donations.map((donation, index) => {
        const hoursRemaining = Math.round((donation.expiryTime.getTime() - Date.now()) / (60 * 60 * 1000))
        const isUrgent = hoursRemaining <= 1

        return (
          <Card 
            key={donation.id}
            className={`border-white/20 backdrop-blur-sm animate-slide-in overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 ${
              isUrgent ? 'ring-2 ring-destructive' : ''
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {donation.photo && (
              <img src={donation.photo || "/placeholder.svg"} alt={donation.foodType} className="w-full h-40 object-cover" />
            )}
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-lg">{donation.foodType}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">{donation.donorOrganization}</p>
                </div>
                <StatusBadge status={donation.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span>{donation.quantity}</span>
                </div>
                <div className={`flex items-center gap-2 transition-colors ${isUrgent ? 'text-destructive font-semibold' : 'text-muted-foreground'}`}>
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>{hoursRemaining}h {isUrgent && '⚠️ URGENT'}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{donation.pickupLocation}</span>
                </div>
              </div>
              {donation.notes && (
                <div className="text-xs text-muted-foreground italic border-t border-border pt-2">
                  {donation.notes}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
