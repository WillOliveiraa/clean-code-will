import CouponRepository from "../../src/application/repositories/CouponRepositoy";
import ValidateCoupon from "../../src/application/usecases/ValidateCoupon";
import PrismaAdapter from "../../src/infra/database/PrismaAdapter";
import CouponRepositoryDatabase from "../../src/infra/repositories/CouponRepositoryDatabase";

let validateCoupon: ValidateCoupon;
let connection: PrismaAdapter;
let couponRepository: CouponRepository;

beforeEach(async () => {
  connection = new PrismaAdapter();
  couponRepository = new CouponRepositoryDatabase(connection);
  validateCoupon = new ValidateCoupon(couponRepository);
});

afterEach(async () => await connection.close());

test("Deve validar um cupom de desconto válido", async () => {
  const input = "VALE20";
  const output = await validateCoupon.execute(input);
  expect(output).toBeTruthy();
});

test("Deve validar um cupom de desconto expirado", async () => {
  const input = "VALE10";
  const output = await validateCoupon.execute(input);
  expect(output).toBeFalsy();
});

test("Não deve validar um cupom de desconto não encontrado", async () => {
  const input = "VALE50";
  expect(async () => await validateCoupon.execute(input)).rejects.toThrow(
    new Error("Coupon not found")
  );
});
