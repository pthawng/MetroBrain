export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  totalTrips: number;
  totalDistance: number; // km
  walletBalance: number; // VND
  joinedDate: string;
}

class UserService {
  private mockUser: UserProfile = {
    id: 'usr_metro_001',
    fullName: 'Senior Architect',
    email: 'architect@metrohcm.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
    totalTrips: 142,
    totalDistance: 2450.5,
    walletBalance: 450000,
    joinedDate: '2025-11-20T00:00:00Z'
  };

  async getProfile(): Promise<UserProfile> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return this.mockUser;
  }

  async updateBalance(amount: number): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.mockUser.walletBalance += amount;
    return this.mockUser.walletBalance;
  }
}

export const userService = new UserService();
