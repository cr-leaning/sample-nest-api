import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RestHandler, MockedRequest, DefaultRequestBody, rest } from 'msw';
import { OrderApiEnv } from '../../config/service/env.orderapi.service';
import { OrderStatus } from '../../constants/order.status';
import { Order } from '../../placeorder/domain/order';
import { ApiMockHandler } from './interface/apimock.handler.interface';

export const MOCK_ORDER_ID = '5XGNMiCS56';
export const MOCK_ORDER_SERVICE_ID = '0x3SUBYOax';
export const MOCK_ERROR_ID = '500errorFromOrderApiParamID';
export const MOCK_BADREQUEST_ID = '400errorFromOrderApiParamID';
const errorResponse = (msg?: string) => {
  {
    error: `error. ${msg}`;
  }
};
const orderResponse = ({
  serviceId,
  status,
}: {
  serviceId?: string;
  status?: string;
}) =>
  new Order({
    id: MOCK_ORDER_ID,
    serviceId: serviceId ? serviceId : MOCK_ORDER_SERVICE_ID,
    status: status ? status : OrderStatus.CREATED,
  });

@Injectable()
export class OrderApiMockHandlerMockService implements ApiMockHandler {
  logger = new Logger(OrderApiMockHandlerMockService.name);
  baseUrl: string;
  url: string;
  constructor(private readonly apiEnv: OrderApiEnv) {
    this.baseUrl = `${apiEnv.Url}${apiEnv.Endpoint}`;
    this.url = `${this.baseUrl}/:id`;
  }

  getHandlers(): RestHandler<MockedRequest<DefaultRequestBody>>[] {
    return [
      // order api post
      rest.post<any>(this.baseUrl, (req, res, ctx) => {
        this.logger.log(`called mock api. post ${this.baseUrl}`);
        let status: HttpStatus;
        let response: unknown;

        const serviceId = req.body.serviceId;
        switch (serviceId) {
          case MOCK_ERROR_ID:
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            response = errorResponse('order api mock post 500error');
            break;
          case MOCK_BADREQUEST_ID:
            status = HttpStatus.BAD_REQUEST;
            response = errorResponse('order api mock psot 400error');
            break;
          default:
            status = HttpStatus.CREATED;
            response = orderResponse({ serviceId: serviceId });
        }
        return res(ctx.status(status), ctx.json(response));
      }),
      // order api get
      rest.get<any>(this.url, (req, res, ctx) => {
        this.logger.log(`called mock api. get ${this.url}`);
        let status: HttpStatus;
        let response: unknown;

        const { id } = req.params;
        switch (id) {
          case MOCK_ERROR_ID:
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            response = errorResponse('order api mock get 500error');
            break;
          case MOCK_BADREQUEST_ID:
            status = HttpStatus.BAD_REQUEST;
            response = errorResponse('order api mock get 400error');
            break;
          default:
            status = HttpStatus.OK;
            response = orderResponse({});
        }
        return res(ctx.status(status), ctx.json(response));
      }),
      // order api patch
      rest.patch<any>(this.url, (req, res, ctx) => {
        this.logger.log(`called mock api. patch ${this.url}`);
        let status: HttpStatus;
        let response: unknown;

        const { id } = req.params;
        switch (id) {
          case MOCK_ERROR_ID:
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            response = errorResponse('order api mock patch 500error');
            break;
          case MOCK_BADREQUEST_ID:
            status = HttpStatus.BAD_REQUEST;
            response = errorResponse('order api mock patch 400error');
            break;
          default:
            status = HttpStatus.OK;
            response = orderResponse({
              serviceId:
                req.body && req.body.serviceId ? req.body.serviceId : null,
              status: req.body && req.body.status ? req.body.status : null,
            });
        }
        return res(ctx.status(status), ctx.json(response));
      }),
      // order api delete
      rest.delete<any>(this.url, (req, res, ctx) => {
        this.logger.log(`called mock api. delete ${this.url}`);
        let status: HttpStatus;
        let response: unknown;

        const { id } = req.params;
        switch (id) {
          case MOCK_ERROR_ID:
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            response = errorResponse('order api mock delete 500error');
            break;
          case MOCK_BADREQUEST_ID:
            status = HttpStatus.BAD_REQUEST;
            response = errorResponse('order api mock delete 400error');
            break;
          default:
            status = HttpStatus.NO_CONTENT;
        }
        return res(ctx.status(status), ctx.json(response ? response : null));
      }),
    ];
  }
}
