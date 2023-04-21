import validator from "validator";

export default class OrderItem {
  constructor(
    readonly productId: string,
    readonly price: number,
    readonly quantity: number,
    readonly currency: string = "BRL"
  ) {
    if (validator.isEmpty(productId)) throw new Error("Invalid product id");
    if (validator.isCurrency(price.toString()) && price <= 0)
      throw new Error("Invalid price");
    if (validator.isCurrency(quantity.toString()) && quantity <= 0)
      throw new Error("Invalid quantity");
    if (validator.isEmpty(currency)) throw new Error("Invalid currency");
  }
}
