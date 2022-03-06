import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../domain/order';

export class PlaceOrderResponse {
  @ApiProperty({
    description: '注文情報',
    example: `{
    "id": "5XGNMiCS56", 
    "serviceId": "0x3SUBYOax",
    "status": "CREATED"
  }`,
  })
  readonly data: Order;

  constructor({ data }: { data: Order }) {
    this.data = data;
  }
  static from(model: Order): PlaceOrderResponse {
    return new PlaceOrderResponse({ data: model });
  }
}
