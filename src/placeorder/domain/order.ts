import { ApiProperty } from '@nestjs/swagger';

export class Order {
  @ApiProperty()
  readonly id?: string;
  @ApiProperty()
  readonly serviceId?: string;
  @ApiProperty()
  readonly status?: string;

  constructor({
    id,
    serviceId,
    status,
  }: {
    id?: string;
    serviceId?: string;
    status?: string;
  }) {
    this.id = id;
    this.serviceId = serviceId;
    this.status = status;
  }
}
