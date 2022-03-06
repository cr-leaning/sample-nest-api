import { Inject, Injectable } from '@nestjs/common';
import { OrderStatus } from '../../constants/order.status';
import { OrderRepository } from '../../infrastracture/interface/client/order.repository.interface';
import { REPOSITORY_TYPES } from '../../infrastracture/interface/types';
import { Order } from '../domain/order';
import { OrderService } from '../interface/service/order.service.interface';

@Injectable()
export class OrderServiceImpl implements OrderService {
  constructor(
    @Inject(REPOSITORY_TYPES.OrderRepository)
    private readonly repository: OrderRepository,
  ) {}

  updateStatus(order: Order): Promise<Order> {
    return this.repository.updateOrder(
      order.id,
      new Order({ status: OrderStatus.PROCESSED }),
    );
  }
}
