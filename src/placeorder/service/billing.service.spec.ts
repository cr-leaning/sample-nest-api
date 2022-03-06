import { Test } from '@nestjs/testing';
import { REPOSITORY_TYPES } from '../../infrastracture/interface/types';
import { BillingService } from '../interface/service/billing.service.interface';
import { PLACE_ORDER_TYPES } from '../interface/types';
import { BillingServiceImpl } from './billing.service';
import { BillingRepository } from '../../infrastracture/interface/client/billing.repository.interface';
import { Billing } from '../domain/billing';
import { Order } from '../domain/order';

class BillingApiRepositoryMock implements BillingRepository {
  createBilling(orderId: string, amount: number): Promise<Billing> {
    throw new Error('Method not implemented.');
  }
}

describe('BillingService', () => {
  let billingService: BillingService;
  let billingRepository: BillingRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: PLACE_ORDER_TYPES.service.BillingService,
          useClass: BillingServiceImpl,
        },
        {
          provide: REPOSITORY_TYPES.BillingRepository,
          useClass: BillingApiRepositoryMock,
        },
      ],
    }).compile();

    billingService = moduleRef.get<BillingService>(
      PLACE_ORDER_TYPES.service.BillingService,
    );
    billingRepository = moduleRef.get<BillingRepository>(
      REPOSITORY_TYPES.BillingRepository,
    );
  });

  it('should be defined', () => {
    expect(billingService).toBeDefined();
  });

  it('normal case', async () => {
    // given
    const amount = 123456;
    const order = new Order({ id: 'test' });
    const expected = new Billing({
      id: 'testid',
      orderId: order.id,
      amount: amount,
    });
    jest
      .spyOn(billingRepository, 'createBilling')
      .mockImplementation(async () => expected);

    // when
    const actual = await billingService.createBilling(order, amount);

    // then
    expect(actual).toEqual(expected);
    expect(billingRepository.createBilling).toBeCalledTimes(1);
    expect(billingRepository.createBilling).toBeCalledWith(order.id, amount);
  });
});
