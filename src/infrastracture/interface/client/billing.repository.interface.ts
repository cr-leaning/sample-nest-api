import { Billing } from '../../../placeorder/domain/billing';

export interface BillingRepository {
  createBilling(orderId: string, amount: number): Promise<Billing>;
}
