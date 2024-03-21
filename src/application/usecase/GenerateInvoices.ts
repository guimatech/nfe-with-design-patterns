import Usecase from "./Usecase";
import ContractRepository from "../repository/ContractRepository";
import Presenter from "../presenter/Presenter";
import JsonPresenter from "../../infra/presenter/JsonPresenter";

export default class GenerateInvoices implements Usecase {
  constructor(
    readonly contractRepository: ContractRepository,
    readonly presenter: Presenter = new JsonPresenter(),
  ) {}
  async execute(input: Input): Promise<any> {
    const output: Output[] = [];
    const contracts = await this.contractRepository.list();
    for (const contract of contracts) {
      const invoices = contract.generateInvoices(
        input.month,
        input.year,
        input.type,
      );
      for (const invoice of invoices) {
        output.push({
          date: invoice.date,
          amount: invoice.amount,
        });
      }
    }
    return this.presenter.present(output);
  }
}

type Input = {
  month: number;
  year: number;
  type: string;
  format?: string;
};

export type Output = {
  date: Date;
  amount: number;
};
