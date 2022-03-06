import { Inject, Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from '../../infrastracture/interface/client/order.repository.interface';
import { REPOSITORY_TYPES } from '../../infrastracture/interface/types';
import { Order } from '../domain/order';
import { PlaceOrderApplication } from '../interface/applications/placeorder.application.interface';
import { BillingService } from '../interface/service/billing.service.interface';
import { OrderService } from '../interface/service/order.service.interface';
import { PLACE_ORDER_TYPES } from '../interface/types';

@Injectable()
export class OrderApplicationImpl implements PlaceOrderApplication {
  logger = new Logger(OrderApplicationImpl.name);

  constructor(
    @Inject(REPOSITORY_TYPES.OrderRepository)
    private readonly repository: OrderRepository,
    @Inject(PLACE_ORDER_TYPES.service.OrderService)
    private readonly orderService: OrderService,
    @Inject(PLACE_ORDER_TYPES.service.BillingService)
    private readonly billingService: BillingService,
  ) {}

  async placeOrder(serviceId: string, amount: number): Promise<Order> {
    const order = await this.repository.createOrder(serviceId);
    this.logger.debug(`order: ${JSON.stringify(order)}`);
    const billing = await this.billingService.createBilling(order, amount);
    this.logger.debug(`billing: ${JSON.stringify(billing)}`);
    return await this.orderService.updateStatus(order);
  }
}
