import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { getUserFromRequest } from '~/lib/auth/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserFromRequest(request);
  
  if (!user) {
    return json(null, { status: 401 });
  }

  return json(user);
}