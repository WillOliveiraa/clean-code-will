import Product from "../../src/domain/entities/Product";

export const products: Product[] = [
  {
    id: "1",
    description: "Product 1",
    price: 100,
    width: 100,
    height: 30,
    length: 10,
    weight: 3,
    currency: "BRL",
    getVolume() {
      return 1;
    },
  },
  {
    id: "2",
    description: "Product 2",
    price: 5000,
    width: 50,
    height: 50,
    length: 50,
    weight: 22,
    currency: "BRL",
    getVolume() {
      return 1;
    },
  },
  {
    id: "3",
    description: "Product 3",
    price: 30,
    width: 10,
    height: 10,
    length: 10,
    weight: 0.9,
    currency: "BRL",
    getVolume() {
      return 1;
    },
  },
  {
    id: "4",
    description: "Product 4",
    price: 30,
    width: -10,
    height: 10,
    length: 10,
    weight: 0.9,
    currency: "BRL",
    getVolume() {
      return 1;
    },
  },
  {
    id: "5",
    description: "Product 5",
    price: 1000,
    width: 100,
    height: 30,
    length: 10,
    weight: 3,
    currency: "USD",
    getVolume() {
      return 1;
    },
  },
  {
    id: "6",
    description: "Product 6",
    price: 150,
    width: 130,
    height: 50,
    length: 20,
    weight: 4,
    currency: "USD",
    getVolume() {
      return 1;
    },
  },
];
