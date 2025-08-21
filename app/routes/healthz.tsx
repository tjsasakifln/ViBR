import type { LoaderFunctionArgs } from '@remix-run/cloudflare';

export async function loader({ request }: LoaderFunctionArgs) {
  // Health check simples - apenas verifica se o servidor está respondendo
  // Não faz consultas pesadas no banco ou operações custosas
  
  const url = new URL(request.url);
  const userAgent = request.headers.get('User-Agent') || '';
  
  // Detecta se é um health check do Railway
  const isRailwayHealthCheck = userAgent.includes('railway') || 
                               userAgent.includes('health') ||
                               url.searchParams.has('health');
  
  return new Response(
    JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'ViBR',
      environment: process.env.NODE_ENV || 'development',
      ...(isRailwayHealthCheck && { source: 'railway-health-check' })
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    }
  );
}