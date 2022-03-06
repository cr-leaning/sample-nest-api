import { Billing } from '../../../placeorder/domain/billing';
import { Order } from '../../domain/order';

export interface BillingService {
  createBilling(order: Order, amount: number): Promise<Billing>;
}
