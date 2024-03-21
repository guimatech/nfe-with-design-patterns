import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ContractDatabaseRepository from "./infra/repository/ContractDatabaseRepository";
import LoggerDecorator from "./application/decorator/LoggerDecorator";
import GenerateInvoices from "./application/usecase/GenerateInvoices";
import JsonPresenter from "./infra/presenter/JsonPresenter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/http/MainController";
import Mediator from "./infra/mediator/Mediator";
import SendEmail from "./application/usecase/SendEmail";

const connection = new PgPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection);
const sendEmail = new SendEmail();
const mediator = new Mediator();
mediator.on("InvoicesGenerated", async (data: any) => {
  await sendEmail.execute(data);
});
const generateInvoices = new LoggerDecorator(
  new GenerateInvoices(contractRepository, new JsonPresenter(), mediator),
);
const httpServer = new ExpressAdapter();
new MainController(httpServer, generateInvoices);
httpServer.listen(3000);
