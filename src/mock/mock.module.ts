import { OrderApiMockHandlerMockService } from './handler/orderapi.handler.service';
import { ApiMockService } from './service/apimock.service';
import { Module } from '@nestjs/common';
import { ApiMockAllHandlerService } from './handler/apimock.all.handler.service';
import { BillingApiMockHandlerMockService } from './handler/billingapi.handler.service';

@Module({
  providers: [
    BillingApiMockHandlerMockService,
    OrderApiMockHandlerMockService,
    ApiMockService,
    ApiMockAllHandlerService,
  ],
  exports: [ApiMockService],
})
export class MockModule {}
