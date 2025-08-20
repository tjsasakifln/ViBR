import type { IDatabase, IUserRepository, IProjectRepository, IConversationRepository } from './interfaces';

export class DatabaseService implements IDatabase {
  constructor(
    public users: IUserRepository,
    public projects: IProjectRepository,
    public conversations: IConversationRepository
  ) {}

  async ping(): Promise<boolean> {
    try {
      // Em uma implementação real, faria uma query simples como SELECT 1
      return true;
    } catch (error) {
      console.error('Database ping failed:', error);
      return false;
    }
  }
}

// Factory function para criar instância configurada
export function createDatabaseService(): DatabaseService {
  const { SupabaseUserRepository } = require('./supabase/SupabaseUserRepository');
  const { SupabaseProjectRepository } = require('./supabase/SupabaseProjectRepository');
  const { SupabaseConversationRepository } = require('./supabase/SupabaseConversationRepository');

  const users = new SupabaseUserRepository();
  const projects = new SupabaseProjectRepository();
  const conversations = new SupabaseConversationRepository();

  return new DatabaseService(users, projects, conversations);
}

// Singleton instance
let databaseInstance: DatabaseService | null = null;

export function getDatabase(): DatabaseService {
  if (!databaseInstance) {
    databaseInstance = createDatabaseService();
  }
  return databaseInstance;
}