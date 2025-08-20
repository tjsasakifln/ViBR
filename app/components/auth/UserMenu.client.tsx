import { useStore } from '@nanostores/react';
import { authStore, authActions } from '~/lib/auth/auth.client';
import { PLANS } from '~/utils/plans';
import { useState } from 'react';

export function UserMenu() {
  const auth = useStore(authStore);
  const [isOpen, setIsOpen] = useState(false);

  if (auth.loading) {
    return (
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vibr-blue-500" />
    );
  }

  if (!auth.isSignedIn || !auth.user) {
    return (
      <a
        href="/auth/signin"
        className="bg-vibr-blue-500 hover:bg-vibr-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Entrar
      </a>
    );
  }

  const { user } = auth;
  const currentPlan = PLANS[user.plan.toUpperCase() as keyof typeof PLANS];
  const usagePercentage = (user.creditsUsed / currentPlan.credits) * 100;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-vibr-blue-50 hover:bg-vibr-blue-100 px-3 py-2 rounded-md transition-colors"
      >
        <div className="w-8 h-8 bg-vibr-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user.firstName?.charAt(0) || user.email.charAt(0).toUpperCase()}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-900">
            {user.firstName || user.email.split('@')[0]}
          </div>
          <div className="text-xs text-gray-500">
            {currentPlan.name} • {user.creditsUsed}/{currentPlan.credits}
          </div>
        </div>
        <div className="i-ph:caret-down-duotone text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          <div className="p-4 border-b border-gray-100">
            <div className="text-sm font-medium text-gray-900">{user.email}</div>
            <div className="text-xs text-gray-500 mt-1">
              Plano {currentPlan.name} • R$ {currentPlan.price}/mês
            </div>
            
            {/* Barra de uso de créditos */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Créditos usados</span>
                <span>{user.creditsUsed}/{currentPlan.credits}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-vibr-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                />
              </div>
              {usagePercentage > 80 && (
                <div className="text-xs text-orange-600 mt-1">
                  ⚠️ Próximo do limite mensal
                </div>
              )}
            </div>
          </div>

          <div className="py-1">
            <a
              href="/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              📊 Dashboard
            </a>
            <a
              href="/projetos"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              🗂️ Meus Projetos
            </a>
            {user.plan === 'free' && (
              <a
                href="/upgrade"
                className="block px-4 py-2 text-sm text-vibr-green-600 hover:bg-vibr-green-50 font-medium"
                onClick={() => setIsOpen(false)}
              >
                ⚡ Upgrade para Pro
              </a>
            )}
            <a
              href="/configuracoes"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              ⚙️ Configurações
            </a>
          </div>

          <div className="border-t border-gray-100 py-1">
            <button
              onClick={() => {
                authActions.signOut();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              🚪 Sair
            </button>
          </div>
        </div>
      )}

      {/* Overlay para fechar o menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}