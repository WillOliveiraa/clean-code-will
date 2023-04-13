import Coupon from "../../src/domain/entities/Coupon";

test("Deve criar um cupom de desconto válido", () => {
  const coupon = new Coupon("VALE20", 20, new Date("2023-10-01T10:00:00"));
  expect(coupon.isExpired(new Date("2023-02-01T10:00:00"))).toBeFalsy();
});

test("Deve criar um cupom de desconto inválido", () => {
  const coupon = new Coupon("VALE20", 20, new Date("2023-10-01T10:00:00"));
  expect(coupon.isExpired(new Date("2023-10-03T10:00:00"))).toBeTruthy();
});

test("Deve calcular o desconto", () => {
  const coupon = new Coupon("VALE20", 20, new Date("2023-10-01T10:00:00"));
  expect(coupon.calculeteDiscount(1000)).toBe(200);
});
