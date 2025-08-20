import type { DatabaseConversation, CreateConversationData } from '~/types/database';
import type { IConversationRepository } from '../interfaces';

export class SupabaseConversationRepository implements IConversationRepository {
  private conversations: Map<string, DatabaseConversation> = new Map();

  constructor() {
    // Mock data
    const mockConversation: DatabaseConversation = {
      id: 'conv_1',
      user_id: 'mock_user_id',
      project_id: 'project_1',
      title: 'Criando meu primeiro app',
      messages: [
        {
          role: 'user',
          content: 'Crie um app simples com HTML e CSS',
          timestamp: new Date().toISOString(),
        },
        {
          role: 'assistant',
          content: 'Claro! Vou criar um app simples para você...',
          timestamp: new Date().toISOString(),
        }
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    this.conversations.set(mockConversation.id, mockConversation);
  }

  async findById(id: string): Promise<DatabaseConversation | null> {
    return this.conversations.get(id) || null;
  }

  async findByUserId(userId: string): Promise<DatabaseConversation[]> {
    return Array.from(this.conversations.values()).filter(c => c.user_id === userId);
  }

  async findByProjectId(projectId: string): Promise<DatabaseConversation[]> {
    return Array.from(this.conversations.values()).filter(c => c.project_id === projectId);
  }

  async create(conversationData: CreateConversationData): Promise<DatabaseConversation> {
    const id = `conv_${Date.now()}`;
    const now = new Date().toISOString();
    
    const conversation: DatabaseConversation = {
      id,
      user_id: conversationData.user_id,
      project_id: conversationData.project_id,
      title: conversationData.title,
      messages: conversationData.messages || [],
      created_at: now,
      updated_at: now,
    };

    this.conversations.set(id, conversation);
    return conversation;
  }

  async update(id: string, conversationData: Partial<DatabaseConversation>): Promise<DatabaseConversation> {
    const existing = this.conversations.get(id);
    if (!existing) {
      throw new Error(`Conversation with id ${id} not found`);
    }

    const updated: DatabaseConversation = {
      ...existing,
      ...conversationData,
      updated_at: new Date().toISOString(),
    };

    this.conversations.set(id, updated);
    return updated;
  }

  async addMessage(id: string, message: { role: 'user' | 'assistant'; content: string }): Promise<void> {
    const conversation = this.conversations.get(id);
    if (!conversation) {
      throw new Error(`Conversation with id ${id} not found`);
    }

    conversation.messages.push({
      ...message,
      timestamp: new Date().toISOString(),
    });
    conversation.updated_at = new Date().toISOString();
    
    this.conversations.set(id, conversation);
  }

  async delete(id: string): Promise<void> {
    if (!this.conversations.has(id)) {
      throw new Error(`Conversation with id ${id} not found`);
    }
    this.conversations.delete(id);
  }
}