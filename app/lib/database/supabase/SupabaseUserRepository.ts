import type { User } from '~/types/auth';
import type { DatabaseUser, CreateUserData } from '~/types/database';
import type { IUserRepository } from '../interfaces';

// Mock implementation - em produção usaria Supabase client
export class SupabaseUserRepository implements IUserRepository {
  private users: Map<string, DatabaseUser> = new Map();

  constructor() {
    // Mock data
    this.users.set('mock_user_id', {
      id: 'mock_user_id',
      email: 'usuario@exemplo.com',
      first_name: 'Usuario',
      last_name: 'Exemplo',
      image_url: null,
      plan: 'free',
      credits_used: 15,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  async findById(id: string): Promise<User | null> {
    const dbUser = this.users.get(id);
    return dbUser ? this.mapToUser(dbUser) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const dbUser of this.users.values()) {
      if (dbUser.email === email) {
        return this.mapToUser(dbUser);
      }
    }
    return null;
  }

  async create(userData: CreateUserData): Promise<User> {
    const id = `user_${Date.now()}`;
    const now = new Date().toISOString();
    
    const dbUser: DatabaseUser = {
      id,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      image_url: userData.image_url,
      plan: userData.plan || 'free',
      credits_used: 0,
      created_at: now,
      updated_at: now,
    };

    this.users.set(id, dbUser);
    return this.mapToUser(dbUser);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const existing = this.users.get(id);
    if (!existing) {
      throw new Error(`User with id ${id} not found`);
    }

    const updated: DatabaseUser = {
      ...existing,
      first_name: userData.firstName ?? existing.first_name,
      last_name: userData.lastName ?? existing.last_name,
      image_url: userData.imageUrl ?? existing.image_url,
      plan: userData.plan ?? existing.plan,
      credits_used: userData.creditsUsed ?? existing.credits_used,
      updated_at: new Date().toISOString(),
    };

    this.users.set(id, updated);
    return this.mapToUser(updated);
  }

  async incrementCredits(id: string, amount: number): Promise<void> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    user.credits_used += amount;
    user.updated_at = new Date().toISOString();
    this.users.set(id, user);
  }

  async resetCredits(id: string): Promise<void> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    user.credits_used = 0;
    user.updated_at = new Date().toISOString();
    this.users.set(id, user);
  }

  private mapToUser(dbUser: DatabaseUser): User {
    return {
      id: dbUser.id,
      email: dbUser.email,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      imageUrl: dbUser.image_url,
      plan: dbUser.plan,
      creditsUsed: dbUser.credits_used,
      createdAt: new Date(dbUser.created_at),
      updatedAt: new Date(dbUser.updated_at),
    };
  }
}