import DatabaseConnection from "./DatabaseConnection";
import config from "./config";
import pgp from "pg-promise";

export default class PgPromiseAdapter implements DatabaseConnection {
  connection: any;
  
  constructor() {
    this.connection = pgp()(config.DATABASE_URL);
  }

  query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }
  
  close(): Promise<void> {
    return this.connection.$pool.end();
  }
}
