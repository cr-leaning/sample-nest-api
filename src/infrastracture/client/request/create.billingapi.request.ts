export class CreateBillingApiRequest {
  readonly orderId: string;
  readonly amount: number;
  constructor(orderId: string, amount: number) {
    this.orderId = orderId;
    this.amount = amount;
  }
}
