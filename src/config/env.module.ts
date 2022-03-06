import { GlobalEnvService } from './service/env.global.service';
import { OrderApiEnv } from './service/env.orderapi.service';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env-validate';
import { BillingApiEnv } from './service/env.billingapi.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, envFilePath: ['.env'], validate }),
  ],
  providers: [GlobalEnvService, OrderApiEnv, BillingApiEnv],
  exports: [GlobalEnvService, OrderApiEnv, BillingApiEnv],
})
export class EnvModule {}
