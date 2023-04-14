import { faker } from "@faker-js/faker";
import FreightCalculator from "../../src/domain/entities/FreightCalculator";
import Product from "../../src/domain/entities/Product";

test("Deve calcular o frete do produto de um item com quantidade 1", () => {
  const product = new Product(
    "7",
    faker.commerce.productName(),
    1000,
    100,
    30,
    10,
    3,
    "USD"
  );
  const freight = FreightCalculator.calculate(product);
  expect(freight).toBe(30);
});

test("Deve calcular o frete do produto de um item com quantidade 3", () => {
  const product = new Product(
    "7",
    faker.commerce.productName(),
    1000,
    100,
    30,
    10,
    3,
    "USD"
  );
  const freight = FreightCalculator.calculate(product, 3);
  expect(freight).toBe(90);
});

test("Deve calcular o frete do produto com preço mínimo", () => {
  const product = new Product(
    "7",
    faker.commerce.productName(),
    1000,
    10,
    10,
    10,
    0.9,
    "USD"
  );
  const freight = FreightCalculator.calculate(product);
  expect(freight).toBe(10);
});
