import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreatePlaceOrderRequest {
  @ApiProperty({ description: '注文するサービスのID', default: '0x3SUBYOax' })
  @IsNotEmpty()
  readonly serviceId: string;

  @ApiProperty({ description: '注文金額', default: 10000 })
  @IsNotEmpty()
  @IsPositive()
  readonly amount: number;
}
