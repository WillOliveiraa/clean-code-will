import ProductRepository from "../../src/application/repositories/ProductRepositoy";
import Checkout from "../../src/application/usecases/Checkout";
import PrismaAdapter from "../../src/infra/database/PrismaAdapter";
import ProductRepositoryDatabase from "../../src/infra/repositories/ProductRepositoryDatabase";

let connection: PrismaAdapter;
let checkout: Checkout;
let productRepository: ProductRepository;

beforeEach(async () => {
  connection = new PrismaAdapter();
  productRepository = new ProductRepositoryDatabase(connection);
  checkout = new Checkout(productRepository);
});

afterEach(async () => await connection.close());

test("Não deve cadastrar um pedido com CPF inválido", async () => {
  const input = {
    cpf: "406.302.170-27",
    items: [],
  };
  await expect(() => checkout.execute(input)).rejects.toThrow(
    new Error("Invalid CPF")
  );
});

test("Não deve criar um pedido sem produtos", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [],
  };
  await expect(() => checkout.execute(input)).rejects.toThrow(
    new Error("Invalid items")
  );
});

test("Não deve criar um pedido com um produto não encontrado", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [{ idProduct: "11", quantity: 1 }],
  };
  await expect(() => checkout.execute(input)).rejects.toThrow(
    new Error("Product not found")
  );
});

test("Deve criar um pedido vazio com CPF válido", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [{ idProduct: "1", quantity: 1 }],
  };
  const output = await checkout.execute(input);
  expect(output.total).toBe(100);
});

test("Não deve criar um pedido com a quantidade do produto menor ou igual a zero", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [{ idProduct: "1", quantity: 0 }],
  };
  await expect(() => checkout.execute(input)).rejects.toThrow(
    new Error("Invalid quantity")
  );
});

test("Não deve criar um pedido com o produto duplicado", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      { idProduct: "1", quantity: 1 },
      { idProduct: "1", quantity: 1 },
    ],
  };
  await expect(() => checkout.execute(input)).rejects.toThrow(
    new Error("Duplicated item")
  );
});

test("Deve criar um pedido com 3 produtos", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      { idProduct: "1", quantity: 3 },
      { idProduct: "2", quantity: 1 },
      { idProduct: "3", quantity: 1 },
    ],
  };
  const output = await checkout.execute(input);
  expect(output.total).toBe(5330);
});
