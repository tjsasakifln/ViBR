import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { AuthService } from '~/lib/auth/auth.server';
import { getDatabase } from '~/lib/database/DatabaseService';

export async function loader({ request }: LoaderFunctionArgs) {
  // GET /api/projects - Listar projetos do usuário
  const user = await AuthService.requireAuth(request);
  const db = getDatabase();
  
  try {
    const projects = await db.projects.findByUserId(user.id);
    return json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return json({ error: 'Erro ao carregar projetos' }, { status: 500 });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await AuthService.requireAuth(request);
  const db = getDatabase();
  
  const method = request.method;
  
  try {
    switch (method) {
      case 'POST': {
        // POST /api/projects - Criar novo projeto
        const { name, description, files, isPublic } = await request.json();
        
        if (!name) {
          return json({ error: 'Nome do projeto é obrigatório' }, { status: 400 });
        }
        
        const project = await db.projects.create({
          user_id: user.id,
          name,
          description,
          files: files || {},
          is_public: isPublic || false,
        });
        
        return json({ project });
      }
      
      case 'PUT': {
        // PUT /api/projects - Atualizar projeto
        const { id, name, description, files, isPublic } = await request.json();
        
        if (!id) {
          return json({ error: 'ID do projeto é obrigatório' }, { status: 400 });
        }
        
        // Verificar se o projeto pertence ao usuário
        const existingProject = await db.projects.findById(id);
        if (!existingProject || existingProject.user_id !== user.id) {
          return json({ error: 'Projeto não encontrado' }, { status: 404 });
        }
        
        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (files !== undefined) updateData.files = files;
        if (isPublic !== undefined) updateData.is_public = isPublic;
        
        const project = await db.projects.update(id, updateData);
        return json({ project });
      }
      
      case 'DELETE': {
        // DELETE /api/projects - Deletar projeto
        const { id } = await request.json();
        
        if (!id) {
          return json({ error: 'ID do projeto é obrigatório' }, { status: 400 });
        }
        
        // Verificar se o projeto pertence ao usuário
        const existingProject = await db.projects.findById(id);
        if (!existingProject || existingProject.user_id !== user.id) {
          return json({ error: 'Projeto não encontrado' }, { status: 404 });
        }
        
        await db.projects.delete(id);
        return json({ success: true });
      }
      
      default:
        return json({ error: 'Método não permitido' }, { status: 405 });
    }
  } catch (error) {
    console.error('Error in projects API:', error);
    return json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}