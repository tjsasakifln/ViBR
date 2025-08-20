import { redirect } from '@remix-run/cloudflare';
import type { User } from '~/types/auth';
import type { IAuthService, IUserRepository, ISessionManager, IAuthProvider } from './interfaces';

// Dependency Inversion Principle (DIP) - depende de abstrações, não de implementações concretas
export class AuthService implements IAuthService {
  constructor(
    private userRepository: IUserRepository,
    private sessionManager: ISessionManager,
    private authProvider: IAuthProvider
  ) {}

  async getUser(request: Request): Promise<User | null> {
    const userId = await this.sessionManager.validateSession(request);
    if (!userId) {
      return null;
    }

    return this.userRepository.findById(userId);
  }

  async requireAuth(request: Request): Promise<User> {
    const user = await this.getUser(request);
    if (!user) {
      throw redirect('/auth/signin');
    }
    return user;
  }

  async signIn(email: string, password?: string): Promise<Response> {
    const user = await this.authProvider.authenticate(email, password);
    if (!user) {
      throw new Error('Authentication failed');
    }

    const sessionToken = await this.sessionManager.createSession(user.id);
    
    return redirect('/', {
      headers: {
        'Set-Cookie': this.createSessionCookie(sessionToken),
      },
    });
  }

  async signOut(request: Request): Promise<Response> {
    const userId = await this.sessionManager.validateSession(request);
    if (userId) {
      await this.sessionManager.destroySession(userId);
    }

    return redirect('/auth/signin', {
      headers: {
        'Set-Cookie': this.createDestructionCookie(),
      },
    });
  }

  private createSessionCookie(sessionToken: string): string {
    return `user_session=${sessionToken}; Path=/; HttpOnly; Max-Age=86400`;
  }

  private createDestructionCookie(): string {
    return 'user_session=; Path=/; HttpOnly; Max-Age=0';
  }
}

// Factory Pattern para criar instância configurada
export function createAuthService(): AuthService {
  // Aqui implementamos Dependency Injection usando o Database Service
  const { getDatabase } = require('../database/DatabaseService');
  const { CookieSessionManager } = require('./session/CookieSessionManager');
  const { MockAuthProvider } = require('./providers/MockAuthProvider');
  
  const database = getDatabase();
  const userRepository = database.users;
  const sessionManager = new CookieSessionManager();
  const authProvider = new MockAuthProvider(userRepository);

  return new AuthService(userRepository, sessionManager, authProvider);
}