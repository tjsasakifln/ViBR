import type { User } from '~/types/auth';
import { createAuthService } from './AuthService';

// Singleton instance following Open/Closed Principle
let authServiceInstance: ReturnType<typeof createAuthService> | null = null;

function getAuthService() {
  if (!authServiceInstance) {
    authServiceInstance = createAuthService();
  }
  return authServiceInstance;
}

// Legacy wrapper class para manter compatibilidade
export class AuthService {
  static async getUser(request: Request): Promise<User | null> {
    return getAuthService().getUser(request);
  }

  static async requireAuth(request: Request): Promise<User> {
    return getAuthService().requireAuth(request);
  }

  static async signOut(): Promise<Response> {
    // Mock request for compatibility
    const mockRequest = new Request('http://localhost', {
      headers: { 'Cookie': '' }
    });
    return getAuthService().signOut(mockRequest);
  }

  static async signIn(email: string): Promise<Response> {
    return getAuthService().signIn(email);
  }
}

// Utility functions
export async function isAuthenticated(request: Request): Promise<boolean> {
  const user = await getAuthService().getUser(request);
  return user !== null;
}

export async function getUserFromRequest(request: Request): Promise<User | null> {
  return getAuthService().getUser(request);
}