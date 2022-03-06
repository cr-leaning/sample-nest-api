import { Module } from '@nestjs/common';
import { BillingApiRepositoryImpl } from './client/billingapi.repository';
import { OrderApiRepositoryImpl } from './client/orderapi.repository';
import { REPOSITORY_TYPES } from './interface/types';

@Module({
  imports: [],
  providers: [
    {
      provide: REPOSITORY_TYPES.OrderRepository,
      useClass: OrderApiRepositoryImpl,
    },
    {
      provide: REPOSITORY_TYPES.BillingRepository,
      useClass: BillingApiRepositoryImpl,
    },
  ],
  exports: [
    {
      provide: REPOSITORY_TYPES.OrderRepository,
      useClass: OrderApiRepositoryImpl,
    },
    {
      provide: REPOSITORY_TYPES.BillingRepository,
      useClass: BillingApiRepositoryImpl,
    },
  ],
})
export class RepositoryModule {}
