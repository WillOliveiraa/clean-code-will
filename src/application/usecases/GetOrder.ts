import OrderRepository from "../repositories/OrderRepositoy";

export default class GetOrder {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(orderId: string): Promise<Output> {
    const order = await this.orderRepository.getById(orderId);
    const output: Output = {
      code: order.getCode(),
      total: order.getTotal(),
      freight: order.freight,
    };
    return output;
  }
}

type Output = {
  code: string;
  total: number;
  freight: number;
};
