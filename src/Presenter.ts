import {Output} from "./GenerateInvoices";

export default interface Presenter {
  present(output: Output[]): any;
}