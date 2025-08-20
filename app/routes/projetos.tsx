import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData, Link } from '@remix-run/react';
import { AuthService } from '~/lib/auth/auth.server';
import { getDatabase } from '~/lib/database/DatabaseService';
import { Header } from '~/components/header/Header';

export const meta: MetaFunction = () => {
  return [
    { title: 'Meus Projetos - ViBR' },
    { name: 'description', content: 'Gerencie seus projetos criados com ViBR' }
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await AuthService.requireAuth(request);
  const db = getDatabase();
  
  const projects = await db.projects.findByUserId(user.id);
  
  return json({
    user,
    projects,
  });
}

export default function Projetos() {
  const { user, projects } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      
      <div className="flex-1 p-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meus Projetos</h1>
              <p className="text-gray-600 mt-2">
                Gerencie seus projetos criados com ViBR
              </p>
            </div>
            
            <Link
              to="/"
              className="bg-vibr-blue-500 hover:bg-vibr-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              + Novo Projeto
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="i-ph:folder-open-duotone text-6xl text-gray-300 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum projeto ainda
              </h3>
              <p className="text-gray-600 mb-6">
                Comece criando seu primeiro projeto com a ajuda da IA
              </p>
              <Link
                to="/"
                className="bg-vibr-blue-500 hover:bg-vibr-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
              >
                Criar Primeiro Projeto
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {project.is_public && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Público
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {project.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                  
                  <div className="text-xs text-gray-500 mb-4">
                    Modificado em {new Date(project.last_modified).toLocaleDateString('pt-BR')}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/chat/${project.id}`}
                      className="flex-1 bg-vibr-blue-50 hover:bg-vibr-blue-100 text-vibr-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors text-center"
                    >
                      Abrir
                    </Link>
                    <button className="text-gray-400 hover:text-gray-600 p-2">
                      <div className="i-ph:dots-three-vertical-duotone" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}