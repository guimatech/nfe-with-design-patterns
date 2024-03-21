import Contract from "src/domain/Contracts";

export default interface ContractRepository {
  list(): Promise<Contract[]>;
}
