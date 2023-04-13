import crypto from "crypto";
import OrderItem from "../../src/domain/entities/OrdemItem";

const idProduct = crypto.randomUUID();

test("Deve criar um item do pedido", () => {
  const item = new OrderItem(idProduct, 150, 1);
  expect(item.price).toBe(150);
});

test("Não deve criar um item do pedido com id do produto inválido", () => {
  expect(() => new OrderItem("", 150, 1)).toThrow(
    new Error("Invalid product id")
  );
});

test.each([0, -1])(
  "Não deve criar um item do pedido com o preço menor ou igual a zero",
  (value) => {
    expect(() => new OrderItem(idProduct, value, 1)).toThrow(
      new Error("Invalid price")
    );
  }
);

test.each([0, -1])(
  "Não deve criar um item do pedido com a quantidade menor ou igual a zero",
  (value) => {
    expect(() => new OrderItem(idProduct, 150, value)).toThrow(
      new Error("Invalid quantity")
    );
  }
);
