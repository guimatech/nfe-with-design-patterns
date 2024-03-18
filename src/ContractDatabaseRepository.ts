import pgp from "pg-promise";
import config from "./config";
import ContractRepository from "./ContractRepository";

export default class ContractDatabaseRepository implements ContractRepository {
  
  async list(): Promise<any> {
    const connection = pgp()(config.DATABASE_URL);
    const contracts = await connection.query("SELECT * FROM nfe.contract", []);
    for (const contract of contracts) {
      contract.payments = await connection.query(
        "SELECT * FROM nfe.payment WHERE id_contract = $1",
        [contract.id_contract],
        );
    }
    await connection.$pool.end();
    return contracts;
  }
}
