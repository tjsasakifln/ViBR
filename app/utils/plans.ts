import type { Plan } from '~/types/auth';

export const PLANS: Record<'FREE' | 'PRO', Plan> = {
  FREE: {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    credits: 50, // 50 interações/mês
    features: [
      'Projetos públicos',
      'Suporte da comunidade',
      '50 gerações de código/mês',
      'Acesso básico ao ViBR'
    ],
  },
  PRO: {
    id: 'pro', 
    name: 'Pro',
    price: 29.90, // R$ 29,90/mês
    credits: 1000,
    features: [
      'Projetos privados',
      'Suporte prioritário',
      '1000 gerações de código/mês',
      'API key própria',
      'Histórico de projetos',
      'Colaboração em equipe'
    ],
  }
};

export function getUserPlan(planId: string): Plan {
  const plan = Object.values(PLANS).find(p => p.id === planId);
  return plan || PLANS.FREE;
}

export function canUpgrade(currentPlan: string): boolean {
  return currentPlan === 'free';
}

export function getUpgradePrice(currentPlan: string): number {
  if (currentPlan === 'free') {
    return PLANS.PRO.price;
  }
  return 0;
}