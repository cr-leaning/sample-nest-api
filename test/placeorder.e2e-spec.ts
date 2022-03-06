import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  MOCK_BADREQUEST_ID,
  MOCK_ERROR_ID,
  MOCK_ORDER_ID,
  MOCK_ORDER_SERVICE_ID,
} from '../src/mock/handler/orderapi.handler.service';
import { OrderStatus } from '../src/constants/order.status';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => await app.close());

  const ENDPOINT = `/placeOrder`;
  it(`${ENDPOINT} (POST) normal case`, () => {
    const data = {
      serviceId: MOCK_ORDER_SERVICE_ID,
      amount: 20000,
    };
    const expected = {
      data: {
        id: MOCK_ORDER_ID,
        serviceId: data.serviceId,
        status: OrderStatus.PROCESSED,
      },
    };
    return request(app.getHttpServer())
      .post(ENDPOINT)
      .send(data)
      .expect(HttpStatus.CREATED)
      .expect(expected);
  });

  it(`${ENDPOINT} (POST) 500 error case`, () => {
    const data = {
      serviceId: MOCK_ERROR_ID,
      amount: 20000,
    };
    return request(app.getHttpServer())
      .post(ENDPOINT)
      .send(data)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it(`${ENDPOINT} (POST) 400 error case`, () => {
    const data = {
      serviceId: MOCK_BADREQUEST_ID,
      amount: 20000,
    };
    return request(app.getHttpServer())
      .post(ENDPOINT)
      .send(data)
      .expect(HttpStatus.BAD_REQUEST);
  });
});
