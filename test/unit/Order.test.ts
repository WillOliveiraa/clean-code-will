import { faker } from "@faker-js/faker";
import crypto from "crypto";
import Order from "../../src/domain/entities/Order";
import Product from "../../src/domain/entities/Product";

test("Não deve cadastrar um pedido com CPF inválido", async () => {
  const uuid = crypto.randomUUID();
  const cpf = "406.302.170-27";
  expect(() => new Order(uuid, cpf)).toThrow(new Error("Invalid CPF"));
});

test("Deve criar um pedido vazio com CPF válido", async () => {
  const uuid = crypto.randomUUID();
  const cpf = "407.302.170-27";
  const order = new Order(uuid, cpf);
  expect(order.getTotal()).toBe(0);
});

test("Deve criar um pedido com 3 produtos", async () => {
  const uuid = crypto.randomUUID();
  const cpf = "407.302.170-27";
  const order = new Order(uuid, cpf);
  order.addItem(
    new Product("1", faker.commerce.productName(), 100, 100, 30, 10, 3, "BRL"),
    3
  );
  order.addItem(
    new Product("2", faker.commerce.productName(), 200, 100, 30, 10, 3, "BRL"),
    1
  );
  order.addItem(
    new Product("3", faker.commerce.productName(), 300, 100, 30, 10, 3, "BRL"),
    1
  );
  expect(order.getTotal()).toBe(800);
});

test.each([-2, 0])(
  "Não deve criar um pedido com a quantidade do produto menor ou igual a zero",
  async (value) => {
    const uuid = crypto.randomUUID();
    const cpf = "407.302.170-27";
    const order = new Order(uuid, cpf);
    expect(() =>
      order.addItem(
        new Product(
          uuid,
          faker.commerce.productName(),
          1000,
          100,
          30,
          10,
          3,
          "BRL"
        ),
        value
      )
    ).toThrow(new Error("Invalid quantity"));
  }
);

test("Não deve criar um pedido com o produto duplicado", async () => {
  const uuid = crypto.randomUUID();
  const cpf = "407.302.170-27";
  const order = new Order(uuid, cpf);
  const product = new Product(
    "1",
    faker.commerce.productName(),
    1000,
    100,
    30,
    10,
    3,
    "BRL"
  );
  order.addItem(product, 3);
  expect(() => order.addItem(product, 3)).toThrow(new Error("Duplicated item"));
});

test("Deve criar um pedido e gerar um código", async () => {
  const uuid = crypto.randomUUID();
  const cpf = "407.302.170-27";
  const order = new Order(uuid, cpf, 1, new Date("2023-10-01T10:00:00"));
  expect(order.getCode()).toBe("202300000001");
});
