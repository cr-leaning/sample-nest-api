import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { setupServer, SetupServerApi } from 'msw/node';
import { ApiMockAllHandlerService } from '../handler/apimock.all.handler.service';

@Injectable()
export class ApiMockService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(private readonly apimockHandlers: ApiMockAllHandlerService) {}

  private server: SetupServerApi;

  onApplicationBootstrap() {
    this.server = setupServer(...this.apimockHandlers.getHandlers());
    this.server.listen();
  }
  onApplicationShutdown(signal?: string) {
    this.server.close();
  }
}
