import type { User } from '~/types/auth';
import type { 
  DatabaseUser, 
  DatabaseProject, 
  DatabaseConversation,
  CreateUserData,
  CreateProjectData,
  CreateConversationData 
} from '~/types/database';

// Repository interfaces seguindo Repository Pattern
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(userData: CreateUserData): Promise<User>;
  update(id: string, userData: Partial<User>): Promise<User>;
  incrementCredits(id: string, amount: number): Promise<void>;
  resetCredits(id: string): Promise<void>;
}

export interface IProjectRepository {
  findById(id: string): Promise<DatabaseProject | null>;
  findByUserId(userId: string): Promise<DatabaseProject[]>;
  findPublicProjects(limit?: number): Promise<DatabaseProject[]>;
  create(projectData: CreateProjectData): Promise<DatabaseProject>;
  update(id: string, projectData: Partial<DatabaseProject>): Promise<DatabaseProject>;
  delete(id: string): Promise<void>;
}

export interface IConversationRepository {
  findById(id: string): Promise<DatabaseConversation | null>;
  findByUserId(userId: string): Promise<DatabaseConversation[]>;
  findByProjectId(projectId: string): Promise<DatabaseConversation[]>;
  create(conversationData: CreateConversationData): Promise<DatabaseConversation>;
  update(id: string, conversationData: Partial<DatabaseConversation>): Promise<DatabaseConversation>;
  addMessage(id: string, message: { role: 'user' | 'assistant'; content: string }): Promise<void>;
  delete(id: string): Promise<void>;
}

// Database connection interface
export interface IDatabase {
  users: IUserRepository;
  projects: IProjectRepository;
  conversations: IConversationRepository;
  
  // Health check
  ping(): Promise<boolean>;
}