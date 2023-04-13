import validator from "validator";

export default class Product {
  constructor(
    readonly id: string | undefined,
    readonly description: string,
    readonly price: number
  ) {
    if (validator.isEmpty(description))
      throw new Error("Description is required");
    if (validator.isCurrency(price.toString()) && price <= 0)
      throw new Error("Price must be greater than zero");
  }
}
