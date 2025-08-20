import type { User } from '~/types/auth';

// Interface Segregation Principle (ISP) - interfaces específicas para cada responsabilidade
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(userData: Partial<User>): Promise<User>;
  update(id: string, userData: Partial<User>): Promise<User>;
  incrementCredits(id: string, amount: number): Promise<void>;
  resetCredits(id: string): Promise<void>;
}

export interface ISessionManager {
  validateSession(request: Request): Promise<string | null>;
  createSession(userId: string): Promise<string>;
  destroySession(sessionToken: string): Promise<void>;
}

export interface IAuthProvider {
  authenticate(email: string, password?: string): Promise<User | null>;
  signOut(sessionToken: string): Promise<void>;
}

// Dependency Inversion Principle (DIP) - depender de abstrações, não de implementações
export interface IAuthService {
  getUser(request: Request): Promise<User | null>;
  requireAuth(request: Request): Promise<User>;
  signIn(email: string, password?: string): Promise<Response>;
  signOut(request: Request): Promise<Response>;
}

export interface IBillingService {
  checkUsageLimit(user: User): Promise<UsageCheck>;
  consumeCredit(userId: string, amount: number): Promise<void>;
  resetMonthlyCredits(userId: string): Promise<void>;
}

export interface UsageCheck {
  canUse: boolean;
  remainingCredits: number;
  limitReached: boolean;
  upgradeRequired: boolean;
  message?: string;
}