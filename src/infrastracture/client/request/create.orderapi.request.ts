export class CreateOrderApiRequest {
  readonly serviceId: string;
  constructor(serviceId: string) {
    this.serviceId = serviceId;
  }
}
