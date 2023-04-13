import { faker } from "@faker-js/faker";

import crypto from "crypto";

import Product from "../../src/domain/entities/Product";

const idProduct = crypto.randomUUID();

test("Não deve criar um produto sem descrição", async () => {
  expect(() => new Product(idProduct, "", 1000, 100, 30, 10, 3)).toThrow(
    new Error("Description is required")
  );
});

test.each([0, -2])(
  "Não deve criar um produto com preço menor ou igual a zero",
  async (value) => {
    expect(
      () =>
        new Product(
          idProduct,
          faker.commerce.productName(),
          value,
          100,
          30,
          10,
          3,
          "BRL"
        )
    ).toThrow(new Error("Price must be greater than zero"));
  }
);

test("Deve criar um novo produto", () => {
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
  expect(product.id).toBe("1");
});

test("Não deve criar um produto com dimensões inválidas", () => {
  expect(
    () => new Product("1", "ABC", 1000, -10, -10, -10, -10, "BRL")
  ).toThrow(new Error("Invalid dimension"));
});
