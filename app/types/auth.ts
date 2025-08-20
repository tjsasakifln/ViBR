export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  plan: 'free' | 'pro';
  creditsUsed: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  isSignedIn: boolean;
  user: User | null;
  loading: boolean;
}

export interface Plan {
  id: 'free' | 'pro';
  name: string;
  price: number;
  credits: number;
  features: string[];
}