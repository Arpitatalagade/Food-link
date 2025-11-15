export type UserRole = 'hotel' | 'ngo' | 'delivery' | 'admin' | null;

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization?: string;
  phone?: string;
  address?: string;
  coordinates?: { lat: number; lng: number };
  createdAt: Date;
}

export interface FoodDonation {
  id: string;
  donorId: string;
  donorName: string;
  donorOrganization: string;
  foodType: string;
  quantity: string;
  expiryTime: Date;
  pickupLocation: string;
  pickupCoordinates?: { lat: number; lng: number };
  photo?: string;
  notes?: string;
  status: 'available' | 'accepted' | 'picked-up' | 'delivered';
  ngoId?: string;
  ngoName?: string;
  deliveryAgentId?: string;
  deliveryAgentName?: string;
  deliveryCoordinates?: { lat: number; lng: number };
  createdAt: Date;
  updatedAt: Date;
  statusHistory: StatusUpdate[];
}

export interface StatusUpdate {
  status: FoodDonation['status'];
  timestamp: Date;
  updatedBy: string;
  notes?: string;
  coordinates?: { lat: number; lng: number };
}

export interface Notification {
  id: string;
  userId: string;
  type: 'donation' | 'acceptance' | 'pickup' | 'delivery' | 'warning' | 'info';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  relatedId?: string;
}

export interface Analytics {
  totalMealsSaved: number;
  totalDonations: number;
  activeDonors: number;
  activeNGOs: number;
  successRate: number;
  commonFoodTypes: { type: string; count: number }[];
  weeklyData: { day: string; donations: number; deliveries: number }[];
  topRestaurants: RestaurantRanking[];
}

export interface RestaurantRanking {
  restaurantId: string;
  restaurantName: string;
  totalDonations: number;
  totalMealsDonated: number;
  lastDonationDate: Date;
  location?: string;
  rank: number;
}
