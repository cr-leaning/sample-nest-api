import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiEnv } from './interface/env.api.interface';

@Injectable()
export class BillingApiEnv implements ApiEnv {
  constructor(private config: ConfigService) {}

  get Url(): string {
    return this.config.get('API_BASE_URI');
  }
  get Endpoint(): string {
    return this.config.get('BILLING_API_ENDPOINT');
  }
}
