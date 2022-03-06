import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GlobalEnvService {
  constructor(private config: ConfigService) {}

  get NodeEnv(): string {
    return this.config.get('NODE_ENV');
  }

  get Port(): string {
    return this.config.get('PORT');
  }
}
