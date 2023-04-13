import { faker } from "@faker-js/faker";
import axios from "axios";
import crypto from "crypto";
import Product from "../../src/domain/entities/Product";

axios.defaults.validateStatus = function () {
  return true;
};

const url = "http://localhost:3003";
const idProduct = crypto.randomUUID();

test.skip("Deve fazer um get na api", async () => {
  const response = await axios.get(url);
  expect(response.data).toBe("Hello World");
});

test("Não deve cadastrar um pedido com CPF inválido", async () => {
  const input = {
    cpf: "406.302.170-27",
  };
  const response = await axios.post(`${url}/checkout`, input);
  const output = response.data;
  expect(response.status).toBe(422);
  expect(output.message).toBe("Invalid CPF");
});

test.skip("Deve criar um pedido vazio com CPF válido", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {
        product: new Product("1", "teste", 1),
        quantity: 1,
      },
    ],
  };
  const response = await axios.post(`${url}/checkout`, input);
  const output = response.data;
  expect(response.status).toBe(200);
  expect(output.total).toBe(1);
});

test("Não deve criar um pedido sem produtos", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [],
  };
  const response = await axios.post(`${url}/checkout`, input);
  const output = response.data;
  expect(response.status).toBe(422);
  expect(output.message).toBe("Invalid items");
});

test.skip("Não deve criar um pedido com a quantidade do produto menor ou igual a zero", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {
        product: new Product("1", "teste", 1),
        quantity: 0,
      },
    ],
  };
  const response = await axios.post(`${url}/checkout`, input);
  const output = response.data;
  expect(response.status).toBe(422);
  expect(output.message).toBe("Invalid quantity");
});

test.skip("Não deve criar um pedido com o produto duplicado", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {
        product: new Product("1", "teste", 1),
        quantity: 1,
      },
      {
        product: new Product("1", "teste2", 1),
        quantity: 1,
      },
    ],
  };
  const response = await axios.post(`${url}/checkout`, input);
  const output = response.data;
  expect(response.status).toBe(422);
  expect(output.message).toBe("Duplicated item");
});

test.skip("Deve criar um pedido com 3 produtos", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      {
        product: new Product(idProduct, faker.commerce.productName(), 100.0),
        quantity: 3,
      },
      {
        product: new Product(idProduct, faker.commerce.productName(), 200.0),
        quantity: 1,
      },
      {
        product: new Product(idProduct, faker.commerce.productName(), 300.0),
        quantity: 1,
      },
    ],
  };
  const response = await axios.post(`${url}/checkout`, input);
  const output = response.data;
  expect(response.status).toBe(200);
  expect(output.total).toBe(800);
});
