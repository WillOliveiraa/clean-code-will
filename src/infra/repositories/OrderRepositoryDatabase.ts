import OrderRepository from "../../application/repositories/OrderRepositoy";
import OrderItem from "../../domain/entities/OrdemItem";
import Order from "../../domain/entities/Order";
import Connection from "../database/Connection";
import PrismaAdapter from "../database/PrismaAdapter";

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: Connection) {}

  async getById(id: string): Promise<Order> {
    const connect = (this.connection as PrismaAdapter).prisma;
    const orderData = await connect.order.findFirst({
      where: { id },
      include: { items: true },
    });
    if (orderData === null) throw new Error("Order not found");
    const order = new Order(
      orderData.id,
      orderData.cpf,
      +orderData.code,
      orderData.date
    );
    order.freight = orderData.freight.toNumber();
    for (const itemData of orderData.items) {
      order.items.push(
        new OrderItem(
          itemData.product_id,
          itemData.price.toNumber(),
          itemData.quantity,
          "BRL"
        )
      );
    }
    return order;
  }

  async count(): Promise<number> {
    const connect = (this.connection as PrismaAdapter).prisma;
    const count = await connect.order.count();
    return count;
  }
}
