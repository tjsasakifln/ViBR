import { type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { AuthService } from '~/lib/auth/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  return AuthService.signOut();
}

// Este componente nunca renderiza pois sempre redireciona
export default function SignOut() {
  return null;
}