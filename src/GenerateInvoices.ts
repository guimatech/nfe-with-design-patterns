import pgp from "pg-promise";
import config from "./config";
import moment from "moment";

export default class GenerateInvoices {
  async execute(input: Input): Promise<Output[]> {
    const connection = pgp()(config.DATABASE_URL);
    const contracts = await connection.query("SELECT * FROM nfe.contract", []);
    const output: Output[] = [];
    for (const contract of contracts) {
      if (input.type === "cash") {
        const payments = await connection.query(
          "SELECT * FROM nfe.payment WHERE id_contract = $1",
          [contract.id_contract],
        );
        for (const payment of payments) {
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
      console.log(contract)
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
    await connection.$pool.end();
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
