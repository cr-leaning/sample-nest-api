import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/exception.filter';
import { MockModule } from './mock/mock.module';
import { EnvModule } from './config/env.module';
import { PlaceOrderModule } from './placeorder/placeorder.module';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { toBoolean } from './utils/utils';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    ...(toBoolean(process.env.MOCK_MODE) ? [MockModule] : []),
    EnvModule,
    PlaceOrderModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    { provide: APP_PIPE, useValue: new ValidationPipe({ transform: true }) },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
