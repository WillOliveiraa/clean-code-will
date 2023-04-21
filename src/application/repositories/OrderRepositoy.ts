import Order from "../../domain/entities/Order";

export default interface OrderRepository {
  // save (order)
  count(): Promise<number>;
  getById(id: string): Promise<Order>;
}
