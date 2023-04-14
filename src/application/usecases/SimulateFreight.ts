import validator from "validator";
import FreightCalculator from "../../domain/entities/FreightCalculator";
import ProductRepository from "../repositories/ProductRepositoy";

export default class SimulateFreight {
  constructor(readonly productRepository: ProductRepository) {}

  async execute(input: Input): Promise<Output> {
    const output: Output = {
      freight: 0,
    };
    if (input.items.length === 0) throw new Error("Invalid items");
    for (const item of input.items) {
      const product = await this.productRepository.getProduct(item.idProduct);
      if (!product) throw new Error("Product not found");
      if (validator.isCurrency(item.quantity.toString()) && item.quantity <= 0)
        throw new Error("Invalid quantity");
      const itemFreight = FreightCalculator.calculate(product, item.quantity);
      output.freight += itemFreight;
    }

    return output;
  }
}

type Input = {
  items: { idProduct: string; quantity: number }[];
};

type Output = {
  freight: number;
};
