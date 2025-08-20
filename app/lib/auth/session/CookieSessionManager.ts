import type { ISessionManager } from '../interfaces';

// Single Responsibility Principle (SRP) - responsável apenas por gerenciar sessões via cookies
export class CookieSessionManager implements ISessionManager {
  private readonly sessionCookieName = 'user_session';
  private readonly sessionDuration = 24 * 60 * 60 * 1000; // 24 horas

  async validateSession(request: Request): Promise<string | null> {
    const cookie = request.headers.get('Cookie');
    if (!cookie) {
      return null;
    }

    const sessionMatch = cookie.match(new RegExp(`${this.sessionCookieName}=([^;]+)`));
    if (!sessionMatch) {
      return null;
    }

    const sessionToken = sessionMatch[1];
    
    // Em uma implementação real, validaríamos o token com JWT ou banco de dados
    // Por ora, consideramos válido se for 'mock_user'
    if (sessionToken === 'mock_user') {
      return 'mock_user_id';
    }

    return null;
  }

  async createSession(userId: string): Promise<string> {
    // Em uma implementação real, criaríamos um JWT ou token no banco
    // Por ora, retornamos um token mock
    return 'mock_user';
  }

  async destroySession(sessionToken: string): Promise<void> {
    // Em uma implementação real, invalidaríamos o token no banco
    console.log(`Session destroyed: ${sessionToken}`);
  }

  createSessionCookie(sessionToken: string): string {
    return `${this.sessionCookieName}=${sessionToken}; Path=/; HttpOnly; Max-Age=${this.sessionDuration / 1000}`;
  }

  createDestructionCookie(): string {
    return `${this.sessionCookieName}=; Path=/; HttpOnly; Max-Age=0`;
  }
}