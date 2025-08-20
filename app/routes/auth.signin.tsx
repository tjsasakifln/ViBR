import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { AuthService } from '~/lib/auth/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  // Se já estiver logado, redireciona para home
  const user = await AuthService.getUser(request);
  if (user) {
    return redirect('/');
  }
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  
  if (!email) {
    return json({ error: 'Email é obrigatório' }, { status: 400 });
  }

  try {
    return await AuthService.signIn(email);
  } catch (error) {
    return json({ error: 'Erro ao fazer login' }, { status: 500 });
  }
}

export default function SignIn() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="min-h-screen flex items-center justify-center bg-vibr-blue-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-vibr-blue-700">
            Bem-vindo ao ViBR
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Entre com sua conta para continuar
          </p>
        </div>
        
        <Form method="post" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-vibr-blue-500 focus:border-vibr-blue-500"
              placeholder="seu@email.com"
            />
          </div>

          {actionData?.error && (
            <div className="text-red-600 text-sm">{actionData.error}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-vibr-blue-500 hover:bg-vibr-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vibr-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Ao entrar, você concorda com nossos termos de uso
            </p>
          </div>
        </Form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Demo Mode</span>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-400 text-center">
            Esta é uma versão de demonstração. Use qualquer email para testar.
          </div>
        </div>
      </div>
    </div>
  );
}