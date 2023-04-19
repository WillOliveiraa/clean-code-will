import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderItem from "./OrdemItem";
import Product from "./Product";

export default class Order {
  readonly cpf: Cpf;
  readonly items: OrderItem[];
  readonly code: string;
  coupon?: Coupon;
  freight = 0;

  constructor(
    readonly id: string | undefined,
    cpf: string,
    readonly sequence: number = 1,
    readonly date: Date = new Date()
  ) {
    this.cpf = new Cpf(cpf);
    this.items = [];
    this.code = `${date.getFullYear()}${String(sequence).padStart(8, "0")}`;
  }

  addItem(product: Product, quantity: number) {
    if (quantity <= 0) throw new Error("Invalid quantity");
    if (this.items.some((item: OrderItem) => item.productId === product.id))
      throw new Error("Duplicated item");
    this.items.push(new OrderItem(product.id!, product.price, quantity));
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired(this.date)) this.coupon = coupon;
  }

  getTotal() {
    let total = 0;
    this.items.forEach((item) => {
      total += item.price * item.quantity;
    });
    if (this.coupon) {
      total -= this.coupon.calculeteDiscount(total);
    }
    total += this.freight;
    return total;
  }

  getCode() {
    return this.code;
  }
}
