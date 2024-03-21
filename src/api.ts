import express from "express";
import GenerateInvoices from "./GenerateInvoices";
import PgPromiseAdapter from "./PgPromiseAdapter";
import ContractDatabaseRepository from "./ContractDatabaseRepository";
import JsonPresenter from "./JsonPresenter";
import LoggerDecorator from "./LoggerDecorator";
const app = express();
app.use(express.json());

const connection = new PgPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection);
const generateInvoices = new LoggerDecorator(new GenerateInvoices(
  contractRepository,
  new JsonPresenter(),
  ));

app.post("/generate_invoices", async (req: any, res: any) => {
  const input = req.body;
  input.userAgent = req.headers["user-agent"];
  input.host = req.headers.host;
  const output = await generateInvoices.execute(input);
  res.json(output);
});

app.listen(3000);
