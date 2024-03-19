import ContractRepository from "./ContractRepository";
import DatabaseConnection from "./DatabaseConnection";
import Contract from "./Contracts";
import Payment from "./Payment";

export default class ContractDatabaseRepository implements ContractRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async list(): Promise<Contract[]> {
    const contracts: Contract[] = [];
    const contractsData = await this.connection.query(
      "SELECT * FROM nfe.contract",
      [],
    );
    for (const contractData of contractsData) {
      const contract = new Contract(
        contractData.id_contract,
        contractData.description,
        parseFloat(contractData.amount),
        contractData.periods,
        contractData.date,
      );

      const paymentsData = await this.connection.query(
        "SELECT * FROM nfe.payment WHERE id_contract = $1",
        [contract.idContract],
      );
      for (const paymentData of paymentsData) {
        contract.addPayment(
          new Payment(
            paymentData.id_payment,
            paymentData.date,
            parseFloat(paymentData.amount),
          ),
        );
      }
      contracts.push(contract);
    }
    return contracts;
  }
}
