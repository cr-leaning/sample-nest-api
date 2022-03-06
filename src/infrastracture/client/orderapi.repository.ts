import { Injectable, Logger } from '@nestjs/common';
import { OrderApiEnv } from '../../config/service/env.orderapi.service';
import { Order } from '../../placeorder/domain/order';
import { OrderRepository } from '../interface/client/order.repository.interface';
import { BaseApiRepository } from './baseapi.repository';
import { CreateOrderApiRequest } from './request/create.orderapi.request';

@Injectable()
export class OrderApiRepositoryImpl
  extends BaseApiRepository
  implements OrderRepository
{
  constructor(private readonly orderApiEnv: OrderApiEnv) {
    super(orderApiEnv, new Logger(OrderApiRepositoryImpl.name));
  }

  getOrder(id: string): Promise<Order> {
    this.logger.log('called get order');
    return this.get<Order>(this.orderApiEnv.Endpoint, id);
  }

  createOrder(serviceId: string): Promise<Order> {
    this.logger.log('called create order');
    return this.post<Order, CreateOrderApiRequest>(
      this.orderApiEnv.Endpoint,
      new CreateOrderApiRequest(serviceId),
    );
  }

  updateOrder(id: string, request: Order): Promise<Order> {
    this.logger.log('called update order');
    return this.patch<Order, Order>(this.orderApiEnv.Endpoint, id, request);
  }

  deleteOrder(id: string): void {
    this.logger.log('called delete order');
    this.delete(this.orderApiEnv.Endpoint, id);
  }
}
