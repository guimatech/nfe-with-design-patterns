export default interface ContractRepository {
  list(): Promise<Contract[]>;
}
