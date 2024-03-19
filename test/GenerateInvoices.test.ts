import GenerateInvoices from "../src/GenerateInvoices";
import ContractRepository from "../src/ContractRepository";
import ContractDatabaseRepository from "../src/ContractDatabaseRepository";
import PgPromiseAdapter from "../src/PgPromiseAdapter";
import DatabaseConnection from "../src/DatabaseConnection";

let connection: DatabaseConnection;
let generateInvoices: GenerateInvoices;

beforeEach(() => {
  //  const contractRepository: ContractRepository = {
  //    async list(): Promise<any> {
  //      return [
  //        {
  //          idContract: "",
  //          description: "",
  //          periods: 12,
  //          amount: "6000",
  //          date: new Date("2024-01-01T10:00:00"),
  //          payments: [{
  //            idPayment: "",
  //            idContract: "",
  //            amount: 6000,
  //            date: new Date("2024-01-05T10:00:00")
  //          }]
  //        }
  //      ]
  //    }
  //  }
  connection = new PgPromiseAdapter();
  const contractRepository = new ContractDatabaseRepository(connection);
  generateInvoices = new GenerateInvoices(contractRepository);
});

test("Deve gerar as notas fiscais por regime de caixa", async () => {
  const input = {
    month: 1,
    year: 2024,
    type: "cash",
  };
  const output = await generateInvoices.execute(input);
  expect(output.at(0)?.date).toBe("2024-01-05");
  expect(output.at(0)?.amount).toBe(6000);
});

test("Deve gerar as notas fiscais por regime de competência", async () => {
  const input = {
    month: 1,
    year: 2024,
    type: "accrual",
  };
  const output = await generateInvoices.execute(input);
  expect(output.at(0)?.date).toBe("2024-01-01");
  expect(output.at(0)?.amount).toBe(500);
});

test("Deve gerar as notas fiscais por regime de competência por csv", async () => {
  const input = {
    month: 2,
    year: 2024,
    type: "accrual",
    format: "csv"
  };
  const output = await generateInvoices.execute(input);
  expect(output).toBe("2024-02-01;500");
});

test("Deve gerar as notas fiscais por regime de competência", async () => {
  const input = {
    month: 2,
    year: 2024,
    type: "accrual",
  };
  const output = await generateInvoices.execute(input);
  expect(output.at(0)?.date).toBe("2024-02-01");
  expect(output.at(0)?.amount).toBe(500);
});

afterEach(async () => connection.close());
