import Payment from "./Payment";
import Invoice from "./Invoice";
import moment from "moment";

export default class Contract {
  private _payments: Payment[];

  constructor(
    readonly idContract: string,
    readonly description: string,
    readonly amount: number,
    readonly periods: number,
    readonly date: Date,
  ) {
    this._payments = [];
  }

  addPayment(payment: Payment) {
    this._payments.push(payment);
  }

  getPayments(): Payment[] {
    return this._payments;
  }

  generateInvoices(month: number, year: number, type: string) {
    const invoices: Invoice[] = [];
    if (type === "cash") {
      for (const payment of this.getPayments()) {
        if (
          payment.date.getMonth() + 1 !== month ||
          payment.date.getFullYear() !== year
        )
          continue;
        invoices.push(new Invoice(payment.date, payment.amount));
      }
    }
    if (type === "accrual") {
      let period = 0;
      while (period <= this.periods) {
        const date = moment(this.date).add(period++, "months").toDate();
        if (date.getMonth() + 1 !== month || date.getFullYear() !== year)
          continue;
        const amount = this.amount / this.periods;
        invoices.push(new Invoice(date, amount));
      }
    }
    return invoices;
  }
}
