import type { DatabaseProject, CreateProjectData } from '~/types/database';
import type { IProjectRepository } from '../interfaces';

export class SupabaseProjectRepository implements IProjectRepository {
  private projects: Map<string, DatabaseProject> = new Map();

  constructor() {
    // Mock data
    const mockProject: DatabaseProject = {
      id: 'project_1',
      user_id: 'mock_user_id',
      name: 'Meu Primeiro Projeto',
      description: 'Um projeto de exemplo criado com ViBR',
      files: {
        'index.html': { content: '<h1>Hello ViBR!</h1>' },
        'style.css': { content: 'body { font-family: Arial; }' }
      },
      is_public: false,
      last_modified: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };
    
    this.projects.set(mockProject.id, mockProject);
  }

  async findById(id: string): Promise<DatabaseProject | null> {
    return this.projects.get(id) || null;
  }

  async findByUserId(userId: string): Promise<DatabaseProject[]> {
    return Array.from(this.projects.values()).filter(p => p.user_id === userId);
  }

  async findPublicProjects(limit = 10): Promise<DatabaseProject[]> {
    return Array.from(this.projects.values())
      .filter(p => p.is_public)
      .slice(0, limit);
  }

  async create(projectData: CreateProjectData): Promise<DatabaseProject> {
    const id = `project_${Date.now()}`;
    const now = new Date().toISOString();
    
    const project: DatabaseProject = {
      id,
      user_id: projectData.user_id,
      name: projectData.name,
      description: projectData.description,
      files: projectData.files || {},
      is_public: projectData.is_public || false,
      last_modified: now,
      created_at: now,
    };

    this.projects.set(id, project);
    return project;
  }

  async update(id: string, projectData: Partial<DatabaseProject>): Promise<DatabaseProject> {
    const existing = this.projects.get(id);
    if (!existing) {
      throw new Error(`Project with id ${id} not found`);
    }

    const updated: DatabaseProject = {
      ...existing,
      ...projectData,
      last_modified: new Date().toISOString(),
    };

    this.projects.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    if (!this.projects.has(id)) {
      throw new Error(`Project with id ${id} not found`);
    }
    this.projects.delete(id);
  }
}