import axios from "axios";
import PrismaAdapter from "../../src/infra/database/PrismaAdapter";

axios.defaults.validateStatus = function () {
  return true;
};

const url = "http://localhost:3003";
let connection: PrismaAdapter;

beforeEach(async () => {
  connection = new PrismaAdapter();
});

afterEach(async () => await connection.close());

test("Não deve cadastrar um pedido com CPF inválido", async () => {
  const input = {
    cpf: "406.302.170-27",
  };
  const response = await axios.post(`${url}/checkout`, input);
  const output = response.data;
  expect(response.status).toBe(422);
  expect(output.message).toBe("Invalid CPF");
});

test("Deve criar um pedido vazio com CPF válido", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [{ idProduct: "4", quantity: 1 }],
  };
  const response = await axios.post(`${url}/checkout`, input);
  const output = response.data;
  expect(response.status).toBe(200);
  expect(output.total).toBe(30);
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

test("Não deve criar um pedido com a quantidade do produto menor ou igual a zero", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [{ idProduct: "4", quantity: 0 }],
  };
  const response = await axios.post(`${url}/checkout`, input);
  const output = response.data;
  expect(response.status).toBe(422);
  expect(output.message).toBe("Invalid quantity");
});

test("Não deve criar um pedido com o produto duplicado", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      { idProduct: "4", quantity: 1 },
      { idProduct: "4", quantity: 1 },
    ],
  };
  const response = await axios.post(`${url}/checkout`, input);
  const output = response.data;
  expect(response.status).toBe(422);
  expect(output.message).toBe("Duplicated item");
});

test("Deve criar um pedido com 3 produtos", async () => {
  const input = {
    cpf: "407.302.170-27",
    items: [
      { idProduct: "4", quantity: 3 },
      { idProduct: "5", quantity: 1 },
      { idProduct: "6", quantity: 1 },
    ],
  };
  const response = await axios.post(`${url}/checkout`, input);
  const output = response.data;
  expect(response.status).toBe(200);
  expect(output.total).toBe(1240);
});
