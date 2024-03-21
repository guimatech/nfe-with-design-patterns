import { Output } from "./GenerateInvoices";
import Presenter from "./Presenter";

export default class JsonPresenter implements Presenter {
  present(output: Output[]): any {
    return output;
  }
}
