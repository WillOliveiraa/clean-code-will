import CouponRepository from "../repositories/CouponRepositoy";

export default class ValidateCoupon {
  constructor(readonly couponRepository: CouponRepository) {}

  async execute(code: string): Promise<boolean> {
    const coupon = await this.couponRepository.getCoupon(code);
    if (!coupon) throw new Error("Coupon not found");
    return !coupon?.isExpired(new Date());
  }
}
