import { Injectable, Logger } from '@nestjs/common';
import { BillingApiEnv } from '../../config/service/env.billingapi.service';
import { Billing } from '../../placeorder/domain/billing';
import { BillingRepository } from '../interface/client/billing.repository.interface';
import { BaseApiRepository } from './baseapi.repository';
import { CreateBillingApiRequest } from './request/create.billingapi.request';

@Injectable()
export class BillingApiRepositoryImpl
  extends BaseApiRepository
  implements BillingRepository
{
  constructor(private readonly billingApiEnv: BillingApiEnv) {
    super(billingApiEnv, new Logger(BillingApiRepositoryImpl.name));
  }

  createBilling(orderId: string, amount: number): Promise<Billing> {
    this.logger.log('called create billng');
    return this.post<Billing, CreateBillingApiRequest>(
      this.billingApiEnv.Endpoint,
      new CreateBillingApiRequest(orderId, amount),
    );
  }
}
