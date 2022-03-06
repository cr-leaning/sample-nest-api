import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RestHandler, MockedRequest, DefaultRequestBody, rest } from 'msw';
import { BillingApiEnv } from '../../config/service/env.billingapi.service';
import { Billing } from '../../placeorder/domain/billing';
import { ApiMockHandler } from './interface/apimock.handler.interface';
import { MOCK_ORDER_ID } from './orderapi.handler.service';

const MOCK_BILLING_ID = 'auB7hhfm6U';
const MOCK_ORDER_AMOUNT = 100000;
const ERROR_ID = '500errorFromBillingApiParamID';
const BADREQUEST_ID = '400errorFromBillingApiParamID';
const errorResponse = (msg?: string) => {
  {
    error: `error. ${msg}`;
  }
};
const billingResponse = ({
  orderId,
  amount,
}: {
  orderId?: string;
  amount?: number;
}) =>
  new Billing({
    id: MOCK_BILLING_ID,
    orderId: orderId ? orderId : MOCK_ORDER_ID,
    amount: amount ? amount : MOCK_ORDER_AMOUNT,
  });

@Injectable()
export class BillingApiMockHandlerMockService implements ApiMockHandler {
  logger = new Logger(BillingApiMockHandlerMockService.name);
  baseUrl: string;
  url: string;
  constructor(private readonly apiEnv: BillingApiEnv) {
    this.baseUrl = `${apiEnv.Url}${apiEnv.Endpoint}`;
    this.url = `${this.baseUrl}/:id`;
  }

  getHandlers(): RestHandler<MockedRequest<DefaultRequestBody>>[] {
    return [
      // billing api post
      rest.post<any>(this.baseUrl, (req, res, ctx) => {
        this.logger.log(`called mock api. post ${this.baseUrl}`);
        let status: HttpStatus;
        let response: unknown;

        const orderId = req.body.orderId;
        switch (orderId) {
          case ERROR_ID:
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            response = errorResponse('billing api mock post 500error');
            break;
          case BADREQUEST_ID:
            status = HttpStatus.BAD_REQUEST;
            response = errorResponse('billing api mock psot 400error');
            break;
          default:
            status = HttpStatus.CREATED;
            response = billingResponse({
              orderId: orderId,
              amount: req.body.amount,
            });
        }
        return res(ctx.status(status), ctx.json(response));
      }),
      // billing api get
      rest.get<any>(this.url, (req, res, ctx) => {
        this.logger.log(`called mock api. get ${this.url}`);
        let status: HttpStatus;
        let response: unknown;

        const { id } = req.params;
        switch (id) {
          case ERROR_ID:
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            response = errorResponse('billing api mock get 500error');
            break;
          case BADREQUEST_ID:
            status = HttpStatus.BAD_REQUEST;
            response = errorResponse('billing api mock get 400error');
            break;
          default:
            status = HttpStatus.OK;
            response = billingResponse({});
        }
        return res(ctx.status(status), ctx.json(response));
      }),
      // billing api patch
      rest.patch<any>(this.url, (req, res, ctx) => {
        this.logger.log(`called mock api. patch ${this.url}`);
        let status: HttpStatus;
        let response: unknown;

        const { id } = req.params;
        switch (id) {
          case ERROR_ID:
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            response = errorResponse('billing api mock patch 500error');
            break;
          case BADREQUEST_ID:
            status = HttpStatus.BAD_REQUEST;
            response = errorResponse('billing api mock patch 400error');
            break;
          default:
            status = HttpStatus.OK;
            response = billingResponse({
              orderId: req.body && req.body.orderId ? req.body.orderId : null,
              amount: req.body && req.body.amount ? req.body.amount : null,
            });
        }
        return res(ctx.status(status), ctx.json(response));
      }),
      // billing api delete
      rest.delete<any>(this.url, (req, res, ctx) => {
        this.logger.log(`called mock api. delete ${this.url}`);
        let status: HttpStatus;
        let response: unknown;

        const { id } = req.params;
        switch (id) {
          case ERROR_ID:
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            response = errorResponse('billing api mock delete 500error');
            break;
          case BADREQUEST_ID:
            status = HttpStatus.BAD_REQUEST;
            response = errorResponse('billing api mock delete 400error');
            break;
          default:
            status = HttpStatus.NO_CONTENT;
        }
        return res(ctx.status(status), ctx.json(response ? response : null));
      }),
    ];
  }
}
