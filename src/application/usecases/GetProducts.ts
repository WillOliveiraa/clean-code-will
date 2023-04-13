import Product from "../../domain/entities/Product";
import ProductRepository from "../repositories/ProductRepositoy";

export default class GetProducts {
  constructor(readonly productRepository: ProductRepository) {}

  async execute(): Promise<Output> {
    const products = await this.productRepository.getProducts();
    const output: Output = { products, total: products.length };
    return output;
  }
}

type Output = {
  products: Product[];
  total: number;
};
