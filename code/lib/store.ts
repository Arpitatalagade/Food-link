import { create } from 'zustand'
import { FoodDonation, User, Notification, Analytics, RestaurantRanking } from './types'

interface AppStore {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  donations: FoodDonation[];
  addDonation: (donation: Omit<FoodDonation, 'id' | 'createdAt' | 'updatedAt' | 'statusHistory'>) => void;
  updateDonationStatus: (donationId: string, newStatus: FoodDonation['status'], updatedBy: string, coordinates?: { lat: number; lng: number }) => void;
  
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  removeNotification: (notificationId: string) => void;
  
  cachedAnalytics: Analytics | null;
  cachedRestaurants: RestaurantRanking[] | null;
  getAnalytics: () => Analytics;
  getTopRestaurants: (limit?: number) => RestaurantRanking[];
}

const mockDonations: FoodDonation[] = [
  // Available donations
  {
    id: '1',
    donorId: 'hotel1',
    donorName: 'The Grand Hotel',
    donorOrganization: 'The Grand Hotel',
    foodType: 'Biryani',
    quantity: '50 servings',
    expiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    pickupLocation: '123 Main St, Downtown',
    pickupCoordinates: { lat: 40.7128, lng: -74.0060 },
    status: 'available',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    statusHistory: [{ status: 'available', timestamp: new Date(Date.now() - 30 * 60 * 1000), updatedBy: 'system' }],
  },
  {
    id: '2',
    donorId: 'hotel2',
    donorName: 'City Restaurant',
    donorOrganization: 'City Restaurant',
    foodType: 'Samosas',
    quantity: '100 pieces',
    expiryTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
    pickupLocation: '456 Oak Ave, Central',
    pickupCoordinates: { lat: 40.7589, lng: -73.9851 },
    status: 'available',
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    updatedAt: new Date(Date.now() - 15 * 60 * 1000),
    statusHistory: [{ status: 'available', timestamp: new Date(Date.now() - 15 * 60 * 1000), updatedBy: 'system' }],
  },
  {
    id: '3',
    donorId: 'hotel3',
    donorName: 'Sunset Cafe',
    donorOrganization: 'Sunset Cafe',
    foodType: 'Pizza',
    quantity: '30 slices',
    expiryTime: new Date(Date.now() + 1.5 * 60 * 60 * 1000),
    pickupLocation: '789 Pine St, West End',
    pickupCoordinates: { lat: 40.7614, lng: -74.0055 },
    status: 'available',
    notes: 'Margherita and Pepperoni mix',
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 60 * 1000),
    statusHistory: [{ status: 'available', timestamp: new Date(Date.now() - 10 * 60 * 1000), updatedBy: 'system' }],
  },
  // Accepted donations
  {
    id: '4',
    donorId: 'hotel1',
    donorName: 'The Grand Hotel',
    donorOrganization: 'The Grand Hotel',
    foodType: 'Naan Bread',
    quantity: '200 pieces',
    expiryTime: new Date(Date.now() + 1 * 60 * 60 * 1000),
    pickupLocation: '123 Main St, Downtown',
    pickupCoordinates: { lat: 40.7128, lng: -74.0060 },
    status: 'accepted',
    ngoId: 'ngo1',
    ngoName: 'Community Food Bank',
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000),
    statusHistory: [
      { status: 'available', timestamp: new Date(Date.now() - 45 * 60 * 1000), updatedBy: 'system' },
      { status: 'accepted', timestamp: new Date(Date.now() - 5 * 60 * 1000), updatedBy: 'ngo1' },
    ],
  },
  {
    id: '5',
    donorId: 'hotel4',
    donorName: 'Royal Palace Restaurant',
    donorOrganization: 'Royal Palace',
    foodType: 'Paneer Tikka',
    quantity: '75 servings',
    expiryTime: new Date(Date.now() + 90 * 60 * 1000),
    pickupLocation: '321 Oak Ave, East Side',
    pickupCoordinates: { lat: 40.7282, lng: -73.7949 },
    status: 'picked-up',
    ngoId: 'ngo2',
    ngoName: 'Hope Foundation',
    deliveryAgentId: 'delivery1',
    deliveryAgentName: 'Ahmed Hassan',
    deliveryCoordinates: { lat: 40.7350, lng: -73.9005 },
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 60 * 1000),
    statusHistory: [
      { status: 'available', timestamp: new Date(Date.now() - 60 * 60 * 1000), updatedBy: 'system' },
      { status: 'accepted', timestamp: new Date(Date.now() - 40 * 60 * 1000), updatedBy: 'ngo2' },
      { status: 'picked-up', timestamp: new Date(Date.now() - 10 * 60 * 1000), updatedBy: 'delivery1', coordinates: { lat: 40.7282, lng: -73.7949 } },
    ],
  },
  // Delivered donations
  {
    id: '6',
    donorId: 'hotel2',
    donorName: 'City Restaurant',
    donorOrganization: 'City Restaurant',
    foodType: 'Chicken Curry',
    quantity: '120 servings',
    expiryTime: new Date(Date.now() - 10 * 60 * 1000),
    pickupLocation: '456 Oak Ave, Central',
    pickupCoordinates: { lat: 40.7589, lng: -73.9851 },
    status: 'delivered',
    ngoId: 'ngo1',
    ngoName: 'Community Food Bank',
    deliveryAgentId: 'delivery2',
    deliveryAgentName: 'Maria Singh',
    deliveryCoordinates: { lat: 40.7505, lng: -73.9972 },
    createdAt: new Date(Date.now() - 120 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000),
    statusHistory: [
      { status: 'available', timestamp: new Date(Date.now() - 120 * 60 * 1000), updatedBy: 'system' },
      { status: 'accepted', timestamp: new Date(Date.now() - 100 * 60 * 1000), updatedBy: 'ngo1' },
      { status: 'picked-up', timestamp: new Date(Date.now() - 50 * 60 * 1000), updatedBy: 'delivery2' },
      { status: 'delivered', timestamp: new Date(Date.now() - 5 * 60 * 1000), updatedBy: 'ngo1', coordinates: { lat: 40.7505, lng: -73.9972 } },
    ],
  },
  {
    id: '7',
    donorId: 'hotel5',
    donorName: 'Green Valley Restaurant',
    donorOrganization: 'Green Valley',
    foodType: 'Vegetable Pulao',
    quantity: '160 servings',
    expiryTime: new Date(Date.now() - 30 * 60 * 1000),
    pickupLocation: '555 Elm St, South District',
    pickupCoordinates: { lat: 40.6892, lng: -73.9760 },
    status: 'delivered',
    ngoId: 'ngo3',
    ngoName: 'Bright Future NGO',
    deliveryAgentId: 'delivery3',
    deliveryAgentName: 'Rajesh Kumar',
    deliveryCoordinates: { lat: 40.6943, lng: -73.9249 },
    createdAt: new Date(Date.now() - 180 * 60 * 1000),
    updatedAt: new Date(Date.now() - 20 * 60 * 1000),
    statusHistory: [
      { status: 'available', timestamp: new Date(Date.now() - 180 * 60 * 1000), updatedBy: 'system' },
      { status: 'accepted', timestamp: new Date(Date.now() - 150 * 60 * 1000), updatedBy: 'ngo3' },
      { status: 'picked-up', timestamp: new Date(Date.now() - 100 * 60 * 1000), updatedBy: 'delivery3' },
      { status: 'delivered', timestamp: new Date(Date.now() - 20 * 60 * 1000), updatedBy: 'ngo3' },
    ],
  },
  {
    id: '8',
    donorId: 'hotel1',
    donorName: 'The Grand Hotel',
    donorOrganization: 'The Grand Hotel',
    foodType: 'Tandoori Chicken',
    quantity: '85 servings',
    expiryTime: new Date(Date.now() - 45 * 60 * 1000),
    pickupLocation: '123 Main St, Downtown',
    pickupCoordinates: { lat: 40.7128, lng: -74.0060 },
    status: 'delivered',
    ngoId: 'ngo2',
    ngoName: 'Hope Foundation',
    deliveryAgentId: 'delivery1',
    deliveryAgentName: 'Ahmed Hassan',
    deliveryCoordinates: { lat: 40.7282, lng: -73.7949 },
    createdAt: new Date(Date.now() - 240 * 60 * 1000),
    updatedAt: new Date(Date.now() - 60 * 60 * 1000),
    statusHistory: [
      { status: 'available', timestamp: new Date(Date.now() - 240 * 60 * 1000), updatedBy: 'system' },
      { status: 'accepted', timestamp: new Date(Date.now() - 200 * 60 * 1000), updatedBy: 'ngo2' },
      { status: 'picked-up', timestamp: new Date(Date.now() - 120 * 60 * 1000), updatedBy: 'delivery1' },
      { status: 'delivered', timestamp: new Date(Date.now() - 60 * 60 * 1000), updatedBy: 'ngo2' },
    ],
  },
];

export const useAppStore = create<AppStore>((set, get) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),

  donations: mockDonations,
  
  addDonation: (donation) =>
    set((state) => {
      const newDonation: FoodDonation = {
        ...donation,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        statusHistory: [{ status: 'available', timestamp: new Date(), updatedBy: 'system' }],
      };
      return {
        donations: [newDonation, ...state.donations],
        notifications: [
          ...state.notifications,
          {
            id: Date.now().toString(),
            userId: 'all',
            type: 'donation',
            title: 'New Food Donation!',
            message: `${donation.donorName} donated ${donation.foodType}`,
            read: false,
            createdAt: new Date(),
            relatedId: newDonation.id,
          },
        ],
        cachedAnalytics: null, // Clear cached analytics when adding a new donation
        cachedRestaurants: null, // Clear cached restaurants when adding a new donation
      };
    }),

  updateDonationStatus: (donationId, newStatus, updatedBy, coordinates) =>
    set((state) => {
      const updated = state.donations.map((d) => {
        if (d.id === donationId) {
          return {
            ...d,
            status: newStatus,
            updatedAt: new Date(),
            statusHistory: [
              ...d.statusHistory,
              { status: newStatus, timestamp: new Date(), updatedBy, coordinates },
            ],
          };
        }
        return d;
      });

      const donation = updated.find((d) => d.id === donationId);
      const messages: Record<string, { title: string; type: Notification['type'] }> = {
        accepted: { title: 'Donation Accepted!', type: 'acceptance' },
        'picked-up': { title: 'Food Picked Up', type: 'pickup' },
        delivered: { title: 'Delivery Complete!', type: 'delivery' },
      };

      const message = messages[newStatus];

      return {
        donations: updated,
        notifications: message
          ? [
              ...state.notifications,
              {
                id: Date.now().toString(),
                userId: donation?.donorId || 'system',
                type: message.type,
                title: message.title,
                message: `${donation?.foodType} status updated to ${newStatus}`,
                read: false,
                createdAt: new Date(),
                relatedId: donationId,
              },
            ]
          : state.notifications,
        cachedAnalytics: null, // Clear cached analytics when updating a donation status
        cachedRestaurants: null, // Clear cached restaurants when updating a donation status
      };
    }),

  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Date.now().toString(),
          createdAt: new Date(),
        },
        ...state.notifications,
      ],
    })),

  markNotificationAsRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      ),
    })),

  removeNotification: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== notificationId),
    })),

  cachedAnalytics: null,
  cachedRestaurants: null,

  getAnalytics: () => {
    const state = get();
    
    if (state.cachedAnalytics) {
      return state.cachedAnalytics;
    }

    const donations = state.donations;
    
    const totalDonations = donations.length;
    const totalMealsSaved = donations.reduce((sum, d) => {
      const qty = parseInt(d.quantity) || 0;
      return sum + qty;
    }, 0);
    const delivered = donations.filter((d) => d.status === 'delivered').length;
    const successRate = totalDonations > 0 ? (delivered / totalDonations) * 100 : 0;

    const foodTypeCounts: Record<string, number> = {};
    donations.forEach((d) => {
      foodTypeCounts[d.foodType] = (foodTypeCounts[d.foodType] || 0) + 1;
    });

    const commonFoodTypes = Object.entries(foodTypeCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);

    const topRestaurants = get().getTopRestaurants(5);

    const analytics: Analytics = {
      totalMealsSaved,
      totalDonations,
      activeDonors: new Set(donations.map((d) => d.donorId)).size,
      activeNGOs: new Set(donations.filter((d) => d.ngoId).map((d) => d.ngoId)).size,
      successRate: Math.round(successRate),
      commonFoodTypes,
      topRestaurants,
      weeklyData: [
        { day: 'Mon', donations: 12, deliveries: 8 },
        { day: 'Tue', donations: 15, deliveries: 11 },
        { day: 'Wed', donations: 10, deliveries: 9 },
        { day: 'Thu', donations: 18, deliveries: 14 },
        { day: 'Fri', donations: 22, deliveries: 19 },
        { day: 'Sat', donations: 25, deliveries: 23 },
        { day: 'Sun', donations: 20, deliveries: 18 },
      ],
    };

    set({ cachedAnalytics: analytics });
    return analytics;
  },

  getTopRestaurants: (limit = 10): RestaurantRanking[] => {
    const state = get();
    
    if (state.cachedRestaurants && state.cachedRestaurants.length > 0) {
      return state.cachedRestaurants.slice(0, limit);
    }

    const donations = state.donations;
    
    const restaurantStats: Record<string, { name: string; count: number; totalMeals: number; lastDate: Date; location?: string }> = {};
    
    donations.forEach((d) => {
      if (!restaurantStats[d.donorId]) {
        restaurantStats[d.donorId] = {
          name: d.donorName,
          count: 0,
          totalMeals: 0,
          lastDate: d.createdAt,
          location: d.pickupLocation,
        };
      }
      restaurantStats[d.donorId].count += 1;
      restaurantStats[d.donorId].totalMeals += parseInt(d.quantity) || 0;
      if (d.createdAt > restaurantStats[d.donorId].lastDate) {
        restaurantStats[d.donorId].lastDate = d.createdAt;
      }
    });
    
    const ranked = Object.entries(restaurantStats)
      .map(([id, stats], index) => ({
        restaurantId: id,
        restaurantName: stats.name,
        totalDonations: stats.count,
        totalMealsDonated: stats.totalMeals,
        lastDonationDate: stats.lastDate,
        location: stats.location,
        rank: index + 1,
      }))
      .sort((a, b) => b.totalDonations - a.totalDonations)
      .slice(0, limit)
      .map((r, index) => ({ ...r, rank: index + 1 }));

    set({ cachedRestaurants: ranked });
    return ranked;
  },
}));
