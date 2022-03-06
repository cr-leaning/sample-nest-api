import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PlaceOrderApplication } from '../interface/applications/placeorder.application.interface';
import { PLACE_ORDER_TYPES } from '../interface/types';
import { CreatePlaceOrderRequest } from './request/create.placeorder.request';
import { PlaceOrderResponse } from './response/placeorder.response';

@ApiTags('order')
@ApiInternalServerErrorResponse({ description: 'サーバ内部エラー' })
@ApiBadRequestResponse({ description: 'リクエスト不正' })
@Controller('placeOrder')
export class PlaceOrderController {
  constructor(
    @Inject(PLACE_ORDER_TYPES.applications.PlaceOrderApplication)
    private readonly application: PlaceOrderApplication,
  ) {}

  @ApiCreatedResponse({
    description: 'サービスIDと金額を受け取り、注文と請求を作成する',
    type: PlaceOrderResponse,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async placeOrder(@Body() request: CreatePlaceOrderRequest) {
    return PlaceOrderResponse.from(
      await this.application.placeOrder(request.serviceId, request.amount),
    );
  }
}
