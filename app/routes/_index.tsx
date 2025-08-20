import { json, type MetaFunction, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import { Chat } from '~/components/chat/Chat.client';
import { Header } from '~/components/header/Header';
import { getUserFromRequest } from '~/lib/auth/auth.server';
import { checkUsageLimit } from '~/lib/billing/limits';
import { useEffect } from 'react';
import { authActions } from '~/lib/auth/auth.client';

export const meta: MetaFunction = () => {
  return [{ title: 'ViBR - AI do Vibe Coder Brasileiro' }, { name: 'description', content: 'Desenvolva aplicações completas com IA, direto no navegador - 100% em português' }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserFromRequest(request);
  
  let usageInfo = null;
  if (user) {
    usageInfo = await checkUsageLimit(user);
  }

  return json({
    user,
    usageInfo,
  });
}

export default function Index() {
  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
    </div>
  );
}
