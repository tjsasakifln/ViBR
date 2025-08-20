import type { User } from '~/types/auth';
import { createBillingService, UsageLimitError } from './BillingService';
import type { UsageCheck } from '../auth/interfaces';

// Singleton instance
let billingServiceInstance: ReturnType<typeof createBillingService> | null = null;

function getBillingService() {
  if (!billingServiceInstance) {
    billingServiceInstance = createBillingService();
  }
  return billingServiceInstance;
}

// Export original error class for compatibility
export { UsageLimitError };

// Export interface for compatibility
export type { UsageCheck };

// Legacy wrapper functions for compatibility
export async function checkUsageLimit(user: User): Promise<UsageCheck> {
  return getBillingService().checkUsageLimit(user);
}

export async function consumeCredit(user: User, amount: number = 1): Promise<void> {
  return getBillingService().consumeCredit(user.id, amount);
}

export async function requireUsageLimit(user: User): Promise<void> {
  return getBillingService().requireUsageLimit(user);
}

export async function resetMonthlyCredits(userId: string): Promise<void> {
  return getBillingService().resetMonthlyCredits(userId);
}