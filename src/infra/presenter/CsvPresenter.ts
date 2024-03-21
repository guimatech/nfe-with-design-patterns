import moment from "moment";
import Presenter from "src/application/presenter/Presenter";
import { Output } from "src/application/usecase/GenerateInvoices";

export default class CsvPresenter implements Presenter {
  present(output: Output[]): any {
    const lines: any[] = [];
    for (const invoice of output) {
      const line: string[] = [];
      line.push(moment(invoice.date).format("YYYY-MM-DD"));
      line.push(`${invoice.amount}`);
      lines.push(line.join(";"));
    }
    return lines.join("\n");
  }
}
