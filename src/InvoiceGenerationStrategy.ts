import Contract from "./Contracts";
import Invoice from "./Invoice";

export default interface InvoiceGenerationStrategy {
  generate(contract: Contract, month: number, year: number): Invoice[];
}