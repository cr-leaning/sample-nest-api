import { Order } from '../../domain/order';

export interface OrderService {
  updateStatus(order: Order): Promise<Order>;
}
