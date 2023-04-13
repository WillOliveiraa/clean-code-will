import ProductRepository from "../../src/application/repositories/ProductRepositoy";
import GetProducts from "../../src/application/usecases/GetProducts";
import Product from "../../src/domain/entities/Product";
import PrismaAdapter from "../../src/infra/database/PrismaAdapter";
import ProductRepositoryDatabase from "../../src/infra/repositories/ProductRepositoryDatabase";

const connection = new PrismaAdapter();
let getProducts: GetProducts;
let productRepository: ProductRepository;

const products: Product[] = [
  {
    id: "1",
    description: "Product 1",
    price: 1000,
    width: 100,
    height: 30,
    length: 10,
    weight: 3,
    currency: "BRL",
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
  },
  {
    id: "4",
    description: "Product 4",
    price: 30,
    width: 10,
    height: 10,
    length: 10,
    weight: 0.9,
    currency: "BRL",
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
  },
];

beforeAll(async () => {
  productRepository = new ProductRepositoryDatabase(connection);
  getProducts = new GetProducts(productRepository);
  for (const product of products)
    await connection.prisma.product.create({ data: product });
});

afterAll(async () => await connection.prisma.product.deleteMany());

test("Deve buscar todos os produtos", async () => {
  const output = await getProducts.execute();
  expect(output.total).toBe(5);
});
