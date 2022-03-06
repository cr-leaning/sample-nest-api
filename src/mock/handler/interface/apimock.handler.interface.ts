import { DefaultRequestBody, MockedRequest, RestHandler } from 'msw';

export interface ApiMockHandler {
  getHandlers(): RestHandler<MockedRequest<DefaultRequestBody>>[];
}
