import ContractRepository from "./ContractRepository";
import moment from "moment";

export default class GenerateInvoices {
  constructor(readonly contractRepository: ContractRepository) {}
  async execute(input: Input): Promise<any> {
    const output: any = [];
    const contracts = await this.contractRepository.list();
    for (const contract of contracts) {
      const invoices = contract.generateInvoices(
        input.month,
        input.year,
        input.type,
      );
      for (const invoice of invoices) {
        output.push({
          date: moment(invoice.date).format("YYYY-MM-DD"),
          amount: invoice.amount,
        });
      }
    }
    if (!input.format || input.format === "json") {
      return output;
    }
    if (input.format === "csv") {
      const lines: any[] = [];
      for (const invoice of output) {
        const line: string[] = [];
        line.push(invoice.date);
        line.push(`${invoice.amount}`);
        lines.push(line.join(";"));
      }
      return lines.join("\n");
    }
  }
}

type Input = {
  month: number;
  year: number;
  type: string;
  format?: string
};

type Output = {
  date: string;
  amount: number;
};
