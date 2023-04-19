import Cpf from "../../domain/entities/Cpf";
import FreightCalculator from "../../domain/entities/FreightCalculator";
import Order from "../../domain/entities/Order";
import CouponRepository from "../repositories/CouponRepositoy";
import ProductRepository from "../repositories/ProductRepositoy";

export default class Checkout {
  constructor(
    readonly productRepository: ProductRepository,
    readonly couponRepository: CouponRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const { cpf, items } = input;
    const cpfInstance = new Cpf(cpf);
    if (!cpfInstance.validate(cpf)) throw new Error("Invalid CPF");
    if (items === undefined || items.length <= 0) {
      throw new Error("Invalid items");
    }
    const order = new Order(input.uuid, input.cpf, 1, new Date());
    let freight = 0;
    for (const item of items) {
      if (item.quantity <= 0) throw new Error("Invalid quantity");
      const product = await this.productRepository.getProduct(item.idProduct);
      if (!product) throw new Error("Product not found");
      order.addItem(product, item.quantity);
      const itemFreight = FreightCalculator.calculate(product, item.quantity);
      freight += itemFreight;
    }
    if (input.from && input.to) {
      order.freight = freight;
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.getCoupon(input.coupon);
      if (!coupon) throw new Error("Coupon not found");
      order.addCoupon(coupon);
    }
    let total = order.getTotal();
    return { total, freight };
  }
}

type Input = {
  uuid?: string;
  cpf: string;
  items: { idProduct: string; quantity: number }[];
  coupon?: string;
  from?: string;
  to?: string;
};

type Output = {
  total: number;
  freight: number;
};
