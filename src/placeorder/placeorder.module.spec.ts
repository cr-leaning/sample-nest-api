import { Test } from '@nestjs/testing';
import { EnvModule } from '../config/env.module';
import { PlaceOrderController } from './controller/placeorder.controller';
import { PlaceOrderModule } from './placeorder.module';

describe('PlaceorderModule', () => {
  let placeorderModule: PlaceOrderModule;
  let placeOrderController: PlaceOrderController

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PlaceOrderModule, EnvModule],
    }).compile();

    placeorderModule = moduleRef.get<PlaceOrderModule>(PlaceOrderModule);
    placeOrderController = await moduleRef.resolve<PlaceOrderController>(
      PlaceOrderController,
    );
  });

  it('should be defined', () => {
    expect(placeorderModule).toBeDefined();
    expect(placeOrderController).toBeDefined();
  });
});
