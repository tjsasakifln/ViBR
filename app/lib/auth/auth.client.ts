import { atom } from 'nanostores';
import type { AuthState, User } from '~/types/auth';

// Store global do estado de autenticação
export const authStore = atom<AuthState>({
  isSignedIn: false,
  user: null,
  loading: true,
});

// Actions para manipular o estado de auth
export const authActions = {
  setUser: (user: User | null) => {
    authStore.set({
      isSignedIn: user !== null,
      user,
      loading: false,
    });
  },

  setLoading: (loading: boolean) => {
    const current = authStore.get();
    authStore.set({
      ...current,
      loading,
    });
  },

  signOut: () => {
    authStore.set({
      isSignedIn: false,
      user: null,
      loading: false,
    });
    // Redirect para página de login
    window.location.href = '/auth/signin';
  },

  checkAuth: async () => {
    authActions.setLoading(true);
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const user = await response.json();
        authActions.setUser(user);
      } else {
        authActions.setUser(null);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      authActions.setUser(null);
    }
  },
};

// Inicializar verificação de auth quando o cliente carrega
if (typeof window !== 'undefined') {
  authActions.checkAuth();
}