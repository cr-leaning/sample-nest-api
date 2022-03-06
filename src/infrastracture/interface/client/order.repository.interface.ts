import { Order } from '../../../placeorder/domain/order';

export interface OrderRepository {
  getOrder(id: string): Promise<Order>;
  createOrder(serviceId: string): Promise<Order>;
  updateOrder(id: string, request: Order): Promise<Order>;
  deleteOrder(id: string): void;
}
