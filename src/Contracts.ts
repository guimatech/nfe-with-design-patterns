import Payment from "./Payment";
import InvoiceGenerationFactory from "./InvoiceGenerationFactory";

export default class Contract {
  private _payments: Payment[];

  constructor(
    readonly idContract: string,
    readonly description: string,
    readonly amount: number,
    readonly periods: number,
    readonly date: Date
  ) {
    this._payments = [];
  }

  addPayment(payment: Payment) {
    this._payments.push(payment);
  }

  getPayments(): Payment[] {
    return this._payments;
  }

  getBalance() {
    let balance = this.amount;
    for (const payment of this._payments) {
      balance -= payment.amount;
    }
    return balance;
   }

  generateInvoices(month: number, year: number, type: string) {
    const invoiceGenerationStrategy = InvoiceGenerationFactory.create(type);
    return invoiceGenerationStrategy.generate(this, month, year);
  }
}
