import {
  ClassSerializerInterceptor,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { ApiEnv } from '../../config/service/interface/env.api.interface';
import * as superagent from 'superagent';

@UseInterceptors(ClassSerializerInterceptor)
export class BaseApiRepository {
  protected constructor(
    protected readonly apiEnv: ApiEnv,
    protected readonly logger: Logger,
  ) {}

  protected async get<T>(endpoint: string, id: string): Promise<Awaited<T>> {
    const uri = `${this.apiEnv.Url}${endpoint}/${id}`;
    this.logger.log(`get ${uri}`);
    return await superagent
      .get(uri)
      .trustLocalhost()
      .type('json')
      .then((res) => this.parse<T>(res));
  }

  protected async patch<T, V extends object>(
    endpoint: string,
    id: string,
    data: V,
  ): Promise<Awaited<T>> {
    const uri = `${this.apiEnv.Url}${endpoint}/${id}`;
    this.logger.log(`patch ${uri}`);
    return await superagent
      .patch(uri)
      .trustLocalhost()
      .type('json')
      .send(data)
      .then((res) => this.parse<T>(res));
  }

  protected async post<T, V extends object>(
    endpoint: string,
    data: V,
  ): Promise<Awaited<T>> {
    const uri = `${this.apiEnv.Url}${endpoint}`;
    this.logger.log(`post ${uri}`);
    const request = superagent
      .post(uri)
      .trustLocalhost()
      .type('json')
      .send(data);
    return await request.then((res) => this.parse<T>(res));
  }

  protected async delete(endpoint: string, id: string): Promise<void> {
    const uri = `${this.apiEnv.Url}${endpoint}/${id}`;
    this.logger.log(`delete ${uri}`);
    await superagent.delete(uri).trustLocalhost().type('json').then();
  }

  private parse<T>(response: any): T {
    return JSON.parse(JSON.stringify(response.body)) as T;
  }
}
