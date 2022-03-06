import { OrderApplicationImpl } from './application/order.application';
import { PlaceOrderController } from './controller/placeorder.controller';
import { Module } from '@nestjs/common';
import { PLACE_ORDER_TYPES } from './interface/types';
import { RepositoryModule } from '../infrastracture/repository.module';
import { OrderServiceImpl } from './service/order.service';
import { BillingServiceImpl } from './service/billing.service';

@Module({
  imports: [RepositoryModule],
  controllers: [PlaceOrderController],
  providers: [
    {
      provide: PLACE_ORDER_TYPES.applications.PlaceOrderApplication,
      useClass: OrderApplicationImpl,
    },
    {
      provide: PLACE_ORDER_TYPES.service.OrderService,
      useClass: OrderServiceImpl,
    },
    {
      provide: PLACE_ORDER_TYPES.service.BillingService,
      useClass: BillingServiceImpl,
    },
  ],
})
export class PlaceOrderModule {}
