import ProductRepository from "../../application/repositories/ProductRepositoy";
import Product from "../../domain/entities/Product";
import Connection from "../database/Connection";
import PrismaAdapter from "../database/PrismaAdapter";

export default class ProductRepositoryDatabase implements ProductRepository {
  constructor(readonly connection: Connection) {}

  async getProduct(idProduct: string): Promise<Product | null> {
    const connect = (this.connection as PrismaAdapter).prisma;
    const productData = await connect.product.findFirst({
      where: { id: idProduct },
    });
    if (productData === null) throw new Error("Product not found");
    return new Product(
      productData.id,
      productData.description,
      productData.price.toNumber()
    );
  }

  async getProducts(): Promise<Product[]> {
    const connect = (this.connection as PrismaAdapter).prisma;
    const productsData = await connect.product.findMany();
    const products: Product[] = [];
    productsData.forEach((product) => {
      const { id, description, price } = product;
      products.push(new Product(id, description, price.toNumber()));
    });
    return products;
  }
}
