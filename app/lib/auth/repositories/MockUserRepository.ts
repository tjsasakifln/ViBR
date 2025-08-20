import type { User } from '~/types/auth';
import type { IUserRepository } from '../interfaces';

// Single Responsibility Principle (SRP) - responsável apenas por operações de dados de usuário
export class MockUserRepository implements IUserRepository {
  private users: Map<string, User> = new Map();

  constructor() {
    // Dados mock para desenvolvimento
    this.users.set('mock_user_id', {
      id: 'mock_user_id',
      email: 'usuario@exemplo.com',
      firstName: 'Usuario',
      lastName: 'Exemplo',
      imageUrl: null,
      plan: 'free',
      creditsUsed: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async create(userData: Partial<User>): Promise<User> {
    const user: User = {
      id: userData.id || `user_${Date.now()}`,
      email: userData.email || '',
      firstName: userData.firstName,
      lastName: userData.lastName,
      imageUrl: userData.imageUrl || null,
      plan: userData.plan || 'free',
      creditsUsed: userData.creditsUsed || 0,
      createdAt: userData.createdAt || new Date(),
      updatedAt: new Date(),
    };

    this.users.set(user.id, user);
    return user;
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const existingUser = this.users.get(id);
    if (!existingUser) {
      throw new Error(`User with id ${id} not found`);
    }

    const updatedUser: User = {
      ...existingUser,
      ...userData,
      updatedAt: new Date(),
    };

    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async incrementCredits(id: string, amount: number): Promise<void> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    user.creditsUsed += amount;
    user.updatedAt = new Date();
    this.users.set(id, user);
  }

  async resetCredits(id: string): Promise<void> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    user.creditsUsed = 0;
    user.updatedAt = new Date();
    this.users.set(id, user);
  }
}