import type { User } from '~/types/auth';
import type { IBillingService, UsageCheck, IUserRepository } from '../auth/interfaces';
import { PLANS } from '~/utils/plans';

export class UsageLimitError extends Error {
  constructor(message: string, public upgradeRequired: boolean = false) {
    super(message);
    this.name = 'UsageLimitError';
  }
}

// Single Responsibility Principle (SRP) - responsável apenas por lógica de billing
export class BillingService implements IBillingService {
  constructor(private userRepository: IUserRepository) {}

  async checkUsageLimit(user: User): Promise<UsageCheck> {
    const plan = PLANS[user.plan.toUpperCase() as keyof typeof PLANS];
    const remainingCredits = plan.credits - user.creditsUsed;
    const limitReached = remainingCredits <= 0;

    if (limitReached) {
      return {
        canUse: false,
        remainingCredits: 0,
        limitReached: true,
        upgradeRequired: user.plan === 'free',
        message: user.plan === 'free' 
          ? 'Limite de créditos excedido! Faça upgrade para o plano Pro para continuar.'
          : 'Limite de créditos do seu plano foi excedido. Entre em contato conosco.',
      };
    }

    // Aviso quando próximo do limite (>= 90%)
    const usagePercentage = (user.creditsUsed / plan.credits) * 100;
    let message: string | undefined;

    if (usagePercentage >= 90) {
      message = `Atenção: Você usou ${user.creditsUsed}/${plan.credits} créditos (${usagePercentage.toFixed(0)}%). Considere fazer upgrade.`;
    } else if (usagePercentage >= 80) {
      message = `Você usou ${user.creditsUsed}/${plan.credits} créditos. Restam ${remainingCredits} créditos.`;
    }

    return {
      canUse: true,
      remainingCredits,
      limitReached: false,
      upgradeRequired: false,
      message,
    };
  }

  async consumeCredit(userId: string, amount: number = 1): Promise<void> {
    await this.userRepository.incrementCredits(userId, amount);
  }

  async resetMonthlyCredits(userId: string): Promise<void> {
    await this.userRepository.resetCredits(userId);
  }

  async requireUsageLimit(user: User): Promise<void> {
    const check = await this.checkUsageLimit(user);
    
    if (!check.canUse) {
      throw new UsageLimitError(
        check.message || 'Limite de uso excedido',
        check.upgradeRequired
      );
    }
  }
}

// Factory function para criar instância
export function createBillingService(): BillingService {
  const { getDatabase } = require('../database/DatabaseService');
  const database = getDatabase();
  return new BillingService(database.users);
}