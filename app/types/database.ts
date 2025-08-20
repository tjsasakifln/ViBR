export interface DatabaseUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
  plan: 'free' | 'pro';
  credits_used: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseProject {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  files: Record<string, any>; // JSONB
  is_public: boolean;
  last_modified: string;
  created_at: string;
}

export interface DatabaseConversation {
  id: string;
  user_id: string;
  project_id?: string;
  title?: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>; // JSONB
  created_at: string;
  updated_at: string;
}

// Interfaces para operações do banco
export interface CreateUserData {
  email: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
  plan?: 'free' | 'pro';
}

export interface CreateProjectData {
  user_id: string;
  name: string;
  description?: string;
  files?: Record<string, any>;
  is_public?: boolean;
}

export interface CreateConversationData {
  user_id: string;
  project_id?: string;
  title?: string;
  messages?: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
}