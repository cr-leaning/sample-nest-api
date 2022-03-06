import {
  Controller,
  Get,
  HttpStatus,
  INestApplication,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { LoggerMiddleware } from './logger.middleware';

const TEST_URL = '/test';

@Controller(TEST_URL)
class TestController {
  @Get()
  test(): string {
    return 'test';
  }
}

@Module({ controllers: [TestController], providers: [LoggerMiddleware] })
class TestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware);
  }
}

describe('LoggerMiddleware', () => {
  let loggerMiddleware: LoggerMiddleware;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = moduleRef.createNestApplication();
    loggerMiddleware = await moduleRef.resolve<LoggerMiddleware>(
      LoggerMiddleware,
    );
  });

  it('should be defined', () => {
    expect(loggerMiddleware).toBeDefined();
  });

  it('access log', async () => {
    await app.init();
    const res = await request(app.getHttpServer()).get(TEST_URL);
    expect(res.status).toBe(HttpStatus.OK);
  });

  afterEach(async () => await app.close());
});
