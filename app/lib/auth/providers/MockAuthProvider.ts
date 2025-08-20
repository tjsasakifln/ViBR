import type { User } from '~/types/auth';
import type { IAuthProvider, IUserRepository } from '../interfaces';

// Single Responsibility Principle (SRP) - responsável apenas por autenticação
export class MockAuthProvider implements IAuthProvider {
  constructor(private userRepository: IUserRepository) {}

  async authenticate(email: string, password?: string): Promise<User | null> {
    // Mock authentication - em produção usaríamos Clerk, Auth0, etc.
    if (!email) {
      return null;
    }

    // Verificar se usuário existe
    let user = await this.userRepository.findByEmail(email);
    
    // Se não existe, criar novo usuário (auto-registro)
    if (!user) {
      user = await this.userRepository.create({
        email,
        firstName: email.split('@')[0],
        plan: 'free',
        creditsUsed: 0,
      });
    }

    return user;
  }

  async signOut(sessionToken: string): Promise<void> {
    // Mock sign out
    console.log(`User signed out: ${sessionToken}`);
  }
}