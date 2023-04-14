import ProductRepository from "../../src/application/repositories/ProductRepositoy";
import SimulateFreight from "../../src/application/usecases/SimulateFreight";
import PrismaAdapter from "../../src/infra/database/PrismaAdapter";
import ProductRepositoryDatabase from "../../src/infra/repositories/ProductRepositoryDatabase";

let simulateFreight: SimulateFreight;
let connection: PrismaAdapter;
let productRepository: ProductRepository;

beforeEach(() => {
  connection = new PrismaAdapter();
  productRepository = new ProductRepositoryDatabase(connection);
  simulateFreight = new SimulateFreight(productRepository);
});

afterEach(async () => await connection.close());

test("Deve calcular o frete para um pedido com 3 itens", async () => {
  const input = {
    items: [
      { idProduct: "1", quantity: 1 },
      { idProduct: "2", quantity: 1 },
      { idProduct: "3", quantity: 3 },
    ],
  };
  const output = await simulateFreight.execute(input);
  expect(output.freight).toBe(280);
});

test("Não deve calcular o frete para um pedido sem itens", async () => {
  const input = { items: [] };
  expect(async () => await simulateFreight.execute(input)).rejects.toThrow(
    new Error("Invalid items")
  );
});

test("Não deve calcular o frete para um pedido com um produto não encontrado", async () => {
  const input = { items: [{ idProduct: "11", quantity: 1 }] };
  expect(async () => await simulateFreight.execute(input)).rejects.toThrow(
    new Error("Product not found")
  );
});

test.each([-1, 0])(
  "Não deve calcular o frete para um pedido com a quantidade do produto menor ou igual a zero",
  async (quantity) => {
    const input = { items: [{ idProduct: "1", quantity }] };
    expect(async () => await simulateFreight.execute(input)).rejects.toThrow(
      new Error("Invalid quantity")
    );
  }
);
