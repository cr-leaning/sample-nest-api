import { Inject, Injectable } from '@nestjs/common';
import { BillingRepository } from '../../infrastracture/interface/client/billing.repository.interface';
import { REPOSITORY_TYPES } from '../../infrastracture/interface/types';
import { Billing } from '../domain/billing';
import { Order } from '../domain/order';
import { BillingService } from '../interface/service/billing.service.interface';

@Injectable()
export class BillingServiceImpl implements BillingService {
  constructor(
    @Inject(REPOSITORY_TYPES.BillingRepository)
    private readonly repository: BillingRepository,
  ) {}

  createBilling(order: Order, amount: number): Promise<Billing> {
    return this.repository.createBilling(order.id, amount);
  }
}
