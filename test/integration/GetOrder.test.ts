import OrderRepository from "../../src/application/repositories/OrderRepositoy";
import GetOrder from "../../src/application/usecases/GetOrder";
import PrismaAdapter from "../../src/infra/database/PrismaAdapter";
import OrderRepositoryDatabase from "../../src/infra/repositories/OrderRepositoryDatabase";

const connection = new PrismaAdapter();
let getOrder: GetOrder;
let orderRepository: OrderRepository;

beforeEach(async () => {
  orderRepository = new OrderRepositoryDatabase(connection);
  getOrder = new GetOrder(orderRepository);
});

afterAll(async () => await connection.close());

test("Deve buscar uma sequencia", async () => {
  const output = await orderRepository.count();
  expect(output).toBe(1);
});

test("Deve buscar uma order pelo id", async () => {
  const orderId = "1";
  const output = await getOrder.execute(orderId);
  expect(output.code).toBe("202300000001");
  expect(output.total).toBe(340);
  expect(output.freight).toBe(10);
});

test("Deve retorna um erro caso a ordem não seja encontrada", async () => {
  const orderId = "11";
  expect(async () => await getOrder.execute(orderId)).rejects.toThrow(
    new Error("Order not found")
  );
});
