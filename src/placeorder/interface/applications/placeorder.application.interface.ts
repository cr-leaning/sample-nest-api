import { Order } from '../../domain/order';

export interface PlaceOrderApplication {
  placeOrder(serviceId: string, amount: number): Promise<Order>;
}
