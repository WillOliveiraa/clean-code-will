import CouponRepository from "../../src/application/repositories/CouponRepositoy";
import PrismaAdapter from "../../src/infra/database/PrismaAdapter";
import CouponRepositoryDatabase from "../../src/infra/repositories/CouponRepositoryDatabase";

class ValidateCoupon {
  constructor(readonly couponRepository: CouponRepository) {}

  async execute(code: string): Promise<boolean> {
    const coupon = await this.couponRepository.getCoupon(code);
    if (!coupon) throw new Error("Coupon not found");
    return !coupon?.isExpired(new Date());
  }
}
let validateCoupon: ValidateCoupon;
let connection: PrismaAdapter;
let couponRepository: CouponRepository;

beforeAll(async () => {
  connection = new PrismaAdapter();
  couponRepository = new CouponRepositoryDatabase(connection);
  validateCoupon = new ValidateCoupon(couponRepository);
  const coupon1 = {
    id: "1",
    code: "VALE10",
    percentage: 10,
    expireDate: new Date("2022-10-01T10:00:00"),
  };
  const coupon2 = {
    id: "2",
    code: "VALE20",
    percentage: 20,
    expireDate: new Date("2023-10-01T10:00:00"),
  };
  await connection.prisma.coupon.create({ data: coupon1 });
  await connection.prisma.coupon.create({ data: coupon2 });
});

afterAll(async () => await connection.prisma.coupon.deleteMany());

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
