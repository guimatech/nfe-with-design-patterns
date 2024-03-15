import pgp from "pg-promise";
import config from "./config";

export default class GenerateInvoices {

  async execute() {
    console.log(config.DATABASE_URL);
    console.log(config.NODE_ENV);
    const connection = pgp()(config.DATABASE_URL);
    const contracts = await connection.query('SELECT * FROM nfe.contract', []);
    console.log(contracts);
    return [];
  }
}