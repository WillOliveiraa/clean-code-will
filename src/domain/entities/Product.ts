import validator from "validator";

export default class Product {
  constructor(
    readonly id: string | undefined,
    readonly description: string,
    readonly price: number,
    readonly width: number,
    readonly height: number,
    readonly length: number,
    readonly weight: number,
    readonly currency: string = "BRL"
  ) {
    if (validator.isEmpty(description))
      throw new Error("Description is required");
    if (validator.isCurrency(price.toString()) && price <= 0)
      throw new Error("Price must be greater than zero");
    if (
      this.width <= 0 ||
      this.height <= 0 ||
      this.length <= 0 ||
      this.weight <= 0
    )
      throw new Error("Invalid dimension");
  }

  getVolume() {
    return (this.width / 100) * (this.height / 100) * (this.length / 100);
  }
}
