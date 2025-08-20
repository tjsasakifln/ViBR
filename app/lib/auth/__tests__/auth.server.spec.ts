import { describe, expect, it, beforeEach, vi } from 'vitest';
import { AuthService, getUserFromRequest, isAuthenticated } from '../auth.server';
import type { User } from '~/types/auth';

// Mock do Request para testes
function createMockRequest(cookies: string = ''): Request {
  return {
    headers: new Headers({
      'Cookie': cookies,
    }),
  } as Request;
}

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUser', () => {
    it('deve retornar null quando não há cookie de sessão', async () => {
      const request = createMockRequest();
      const user = await AuthService.getUser(request);
      
      expect(user).toBeNull();
    });

    it('deve retornar null quando cookie de sessão é inválido', async () => {
      const request = createMockRequest('user_session=invalid_token');
      const user = await AuthService.getUser(request);
      
      expect(user).toBeNull();
    });

    it('deve retornar user quando cookie de sessão é válido', async () => {
      const request = createMockRequest('user_session=mock_user');
      const user = await AuthService.getUser(request);
      
      expect(user).not.toBeNull();
      expect(user?.id).toBe('mock_user_id');
      expect(user?.email).toBe('usuario@exemplo.com');
      expect(user?.plan).toBe('free');
      expect(user?.creditsUsed).toBe(15);
    });

    it('deve retornar user com propriedades obrigatórias', async () => {
      const request = createMockRequest('user_session=mock_user');
      const user = await AuthService.getUser(request);
      
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('plan');
      expect(user).toHaveProperty('creditsUsed');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });
  });

  describe('requireAuth', () => {
    it('deve lançar redirect quando usuário não está autenticado', async () => {
      const request = createMockRequest();
      
      await expect(AuthService.requireAuth(request)).rejects.toThrow();
    });

    it('deve retornar user quando usuário está autenticado', async () => {
      const request = createMockRequest('user_session=mock_user');
      const user = await AuthService.requireAuth(request);
      
      expect(user).not.toBeNull();
      expect(user.id).toBe('mock_user_id');
    });
  });

  describe('signIn', () => {
    it('deve retornar Response com redirect para home', async () => {
      const response = await AuthService.signIn('test@exemplo.com');
      
      expect(response).toBeInstanceOf(Response);
      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toBe('/');
    });

    it('deve definir cookie de sessão no response', async () => {
      const response = await AuthService.signIn('test@exemplo.com');
      
      const setCookie = response.headers.get('Set-Cookie');
      expect(setCookie).toContain('user_session=mock_user');
      expect(setCookie).toContain('HttpOnly');
      expect(setCookie).toContain('Path=/');
    });
  });

  describe('signOut', () => {
    it('deve retornar Response com redirect para login', async () => {
      const response = await AuthService.signOut();
      
      expect(response).toBeInstanceOf(Response);
      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toBe('/auth/signin');
    });

    it('deve limpar cookie de sessão', async () => {
      const response = await AuthService.signOut();
      
      const setCookie = response.headers.get('Set-Cookie');
      expect(setCookie).toContain('user_session=');
      expect(setCookie).toContain('Max-Age=0');
    });
  });
});

describe('getUserFromRequest', () => {
  it('deve ser um alias para AuthService.getUser', async () => {
    const request = createMockRequest('user_session=mock_user');
    const user = await getUserFromRequest(request);
    
    expect(user?.id).toBe('mock_user_id');
  });
});

describe('isAuthenticated', () => {
  it('deve retornar false quando usuário não está logado', async () => {
    const request = createMockRequest();
    const authenticated = await isAuthenticated(request);
    
    expect(authenticated).toBe(false);
  });

  it('deve retornar true quando usuário está logado', async () => {
    const request = createMockRequest('user_session=mock_user');
    const authenticated = await isAuthenticated(request);
    
    expect(authenticated).toBe(true);
  });
});