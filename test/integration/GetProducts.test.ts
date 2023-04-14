import ProductRepository from "../../src/application/repositories/ProductRepositoy";
import GetProducts from "../../src/application/usecases/GetProducts";
import PrismaAdapter from "../../src/infra/database/PrismaAdapter";
import ProductRepositoryDatabase from "../../src/infra/repositories/ProductRepositoryDatabase";

const connection = new PrismaAdapter();
let getProducts: GetProducts;
let productRepository: ProductRepository;

beforeEach(async () => {
  productRepository = new ProductRepositoryDatabase(connection);
  getProducts = new GetProducts(productRepository);
});

afterEach(async () => await connection.close());

test("Deve buscar todos os produtos", async () => {
  const output = await getProducts.execute();
  expect(output.total).toBe(6);
});
