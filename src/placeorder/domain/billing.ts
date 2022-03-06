export class Billing {
  readonly id?: string;
  readonly orderId?: string;
  readonly amount?: number;

  constructor({
    id,
    orderId,
    amount,
  }: {
    id?: string;
    orderId?: string;
    amount?: number;
  }) {
    this.id = id;
    this.orderId = orderId;
    this.amount = amount;
  }
}
