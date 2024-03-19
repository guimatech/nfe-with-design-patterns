import Contract from "../src/Contracts";

test("Deve gerar faturas de um contrato", () => {
  const contract = new Contract(
    "",
    "",
    6000,
    12,
    new Date("2024-01-01T10:00:00"),
  );
  const invoices = contract.generateInvoices(1, 2024, "accrual");
  expect(invoices.at(0)?.date).toEqual(new Date("2024-01-01T13:00:00.000Z"));
  expect(invoices.at(0)?.amount).toBe(500);
});
