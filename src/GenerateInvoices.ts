import moment from "moment";
import ContractRepository from "./ContractRepository";

export default class GenerateInvoices {

  constructor(readonly contractRepository: ContractRepository) {
  }
  async execute(input: Input): Promise<Output[]> {
    const output: Output[] = [];
    const contracts = await this.contractRepository.list();
    for (const contract of contracts) {
      if (input.type === "cash") {
        for (const payment of contract.payments) {
          if (
            payment.date.getMonth() + 1 !== input.month ||
            payment.date.getFullYear() !== input.year
            )
            continue;
          output.push({
            date: moment(payment.date).format("YYYY-MM-DD"),
            amount: parseFloat(payment.amount),
          });
        }
      }
      if (input.type === "accrual") {
        let period = 0;
        while (period <= contract.periods) {
          const date = moment(contract.date).add(period++, "months").toDate();
          if (
            date.getMonth() + 1 !== input.month ||
            date.getFullYear() !== input.year
            )
            continue;
          const amount =  parseFloat(contract.amount)/contract.periods;
          output.push({
            date: moment(date).format("YYYY-MM-DD"),
            amount: amount
          });
        }
      }
    }
    return output;
  }
}

type Input = {
  month: number;
  year: number;
  type: string;
};

type Output = {
  date: string;
  amount: number;
};
