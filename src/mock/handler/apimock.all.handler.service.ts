import { Injectable } from '@nestjs/common';
import { RestHandler, MockedRequest, DefaultRequestBody } from 'msw';
import { BillingApiMockHandlerMockService } from './billingapi.handler.service';
import { ApiMockHandler } from './interface/apimock.handler.interface';
import { OrderApiMockHandlerMockService } from './orderapi.handler.service';

@Injectable()
export class ApiMockAllHandlerService implements ApiMockHandler {
  constructor(
    private readonly orderApiMock: OrderApiMockHandlerMockService,
    private readonly billingApiMock: BillingApiMockHandlerMockService,
  ) {}
  getHandlers(): RestHandler<MockedRequest<DefaultRequestBody>>[] {
    return [
      ...this.orderApiMock.getHandlers(),
      ...this.billingApiMock.getHandlers(),
    ];
  }
}
