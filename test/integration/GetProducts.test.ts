import { faker } from "@faker-js/faker";
import sinon from "sinon";

import crypto from "crypto";
import GetProducts from "../../src/application/usecases/GetProducts";

import Product from "../../src/domain/entities/Product";
import PrismaAdapter from "../../src/infra/database/PrismaAdapter";
import AxiosAdapter from "../../src/infra/http/AxiosAdapter";
import ProductRepositoryDatabase from "../../src/infra/repositories/ProductRepositoryDatabase";

const httpClient = new AxiosAdapter();
const connection = new PrismaAdapter();
const productRepository = new ProductRepositoryDatabase(connection);
const getProducts = new GetProducts(productRepository);
const url = "http://localhost:3003";

beforeAll(async () => await connection.prisma.product.deleteMany());

test("Deve cadastrar 1 novo produto", async () => {
  const idProduct = crypto.randomUUID();
  const product = new Product(
    idProduct,
    faker.commerce.productName(),
    parseFloat(faker.commerce.price())
  );
  const response = await httpClient.post(`${url}/products`, product);
  expect(response.status).toBe(201);
});

test("Deve buscar todos os produtos", async () => {
  const stubProducRepository = sinon
    .stub(ProductRepositoryDatabase.prototype, "getProducts")
    .resolves([
      new Product("1", faker.commerce.productName(), 2.0),
      new Product("2", faker.commerce.productName(), 5.0),
    ]);
  const output = await getProducts.execute();
  expect(output.total).toHaveLength(2);
  stubProducRepository.restore();
});
