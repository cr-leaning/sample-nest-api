import { Test } from '@nestjs/testing';
import { OrderStatus } from '../../constants/order.status';
import { OrderRepository } from '../../infrastracture/interface/client/order.repository.interface';
import { REPOSITORY_TYPES } from '../../infrastracture/interface/types';
import { Order } from '../domain/order';
import { OrderService } from '../interface/service/order.service.interface';
import { PLACE_ORDER_TYPES } from '../interface/types';
import { OrderServiceImpl } from './order.service';

class OrderApiRepositoryMock implements OrderRepository {
  getOrder(id: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  createOrder(serviceId: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  updateOrder(id: string, request: Order): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  deleteOrder(id: string): void {
    throw new Error('Method not implemented.');
  }
}

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepository: OrderRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: PLACE_ORDER_TYPES.service.OrderService,
          useClass: OrderServiceImpl,
        },
        {
          provide: REPOSITORY_TYPES.OrderRepository,
          useClass: OrderApiRepositoryMock,
        },
      ],
    }).compile();

    orderService = moduleRef.get<OrderService>(
      PLACE_ORDER_TYPES.service.OrderService,
    );
    orderRepository = moduleRef.get<OrderRepository>(
      REPOSITORY_TYPES.OrderRepository,
    );
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  it('updateOrder', async () => {
    // given
    const orderId = 'test';
    const param = new Order({ id: orderId });
    const expected = new Order({
      id: param.id,
      serviceId: param.serviceId,
      status: OrderStatus.PROCESSED,
    });
    jest
      .spyOn(orderRepository, 'updateOrder')
      .mockImplementation(async () => expected);

    // when
    const actual = await orderService.updateStatus(param);

    // then
    expect(actual).toEqual(expected);
    expect(orderRepository.updateOrder).toBeCalledTimes(1);
    const expectedParam = new Order({
      status: OrderStatus.PROCESSED,
    });
    expect(orderRepository.updateOrder).toBeCalledWith(param.id, expectedParam);
  });
});
