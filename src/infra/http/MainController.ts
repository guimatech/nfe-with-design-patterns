import HttpServer from "src/infra/http/HttpServer";
import Usecase from "src/application/usecase/Usecase";

export default class MainController {
  constructor(
    readonly httpServer: HttpServer,
    readonly usecase: Usecase,
  ) {
    httpServer.on(
      "post",
      "/generate_invoices",
      (params: any, body: any, headers: any) => {
        const input = body;
        body.userAgent = headers["user-agent"];
        body.host = headers.host;
        const output = this.usecase.execute(input);
        return output;
      },
    );
  }
}
