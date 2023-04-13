import Cpf from "../../domain/entities/Cpf";
import Order from "../../domain/entities/Order";
import ProductRepository from "../repositories/ProductRepositoy";

export default class Checkout {
  constructor(readonly productRepository: ProductRepository) {}

  async execute(input: Input): Promise<Output> {
    const { cpf, items } = input;
    const cpfInstance = new Cpf(cpf);
    if (!cpfInstance.validate(cpf)) throw new Error("Invalid CPF");
    if (items === undefined || items.length <= 0) {
      throw new Error("Invalid items");
    }
    const order = new Order(input.uuid, input.cpf, 1, new Date());
    for (const item of items) {
      if (item.quantity <= 0) throw new Error("Invalid quantity");
      const product = await this.productRepository.getProduct(item.idProduct);
      if (!product) throw new Error("Product not found");
      order.addItem(product, item.quantity);
    }
    let total = order.getTotal();
    return { total };
  }
}

type Input = {
  uuid?: string;
  cpf: string;
  items: { idProduct: string; quantity: number }[];
};

type Output = {
  total: number;
};
