import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiEnv } from './interface/env.api.interface';

@Injectable()
export class OrderApiEnv implements ApiEnv {
  constructor(private config: ConfigService) {}

  get Url(): string {
    return this.config.get('API_BASE_URI');
  }

  get Endpoint(): string {
    return this.config.get('ORDER_API_ENDPOINT');
  }
}
