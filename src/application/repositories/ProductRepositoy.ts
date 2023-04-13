import Product from "../../domain/entities/Product";

export default interface ProductRepository {
  getProduct(idProduct: string): Promise<Product | null>;
  getProducts(): Promise<Product[]>;
}
