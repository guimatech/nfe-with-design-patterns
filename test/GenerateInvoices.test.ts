import DatabaseConnection from "../src/infra/database/DatabaseConnection";
import ContractRepository from "../src/application/repository/ContractRepository";
import GenerateInvoices from "../src/application/usecase/GenerateInvoices";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";
import ContractDatabaseRepository from "../src/infra/repository/ContractDatabaseRepository";
import CsvPresenter from "../src/infra/presenter/CsvPresenter";
import JsonPresenter from "../src/infra/presenter/JsonPresenter";
import Mediator from "../src/infra/mediator/Mediator";

let connection: DatabaseConnection;
let contractRepository: ContractRepository;
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
  contractRepository = new ContractDatabaseRepository(connection);
  generateInvoices = new GenerateInvoices(contractRepository, new JsonPresenter(), new Mediator());
});

test("Deve gerar as notas fiscais por regime de caixa", async () => {
  const input = {
    month: 1,
    year: 2024,
    type: "cash",
  };
  const output = await generateInvoices.execute(input);
  expect(output.at(0)?.date).toEqual(new Date("2024-01-05T03:00:00.000Z"));
  expect(output.at(0)?.amount).toBe(6000);
});

test("Deve gerar as notas fiscais por regime de competência", async () => {
  const input = {
    month: 1,
    year: 2024,
    type: "accrual",
  };
  const output = await generateInvoices.execute(input);
  expect(output.at(0)?.date).toEqual(new Date("2024-01-01T03:00:00.000Z"));
  expect(output.at(0)?.amount).toBe(500);
});

test("Deve gerar as notas fiscais por regime de competência por csv", async () => {
  const input = {
    month: 2,
    year: 2024,
    type: "accrual",
    format: "csv",
  };
  const presenter = new CsvPresenter();
  const generateInvoices = new GenerateInvoices(contractRepository, presenter, new Mediator());
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
  expect(output.at(0)?.date).toEqual(new Date("2024-02-01T03:00:00.000Z"));
  expect(output.at(0)?.amount).toBe(500);
});

afterEach(async () => connection.close());
