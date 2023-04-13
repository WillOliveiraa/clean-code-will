import Coupon from "../../domain/entities/Coupon";

export default interface CouponRepository {
  getCoupon(code: string): Promise<Coupon | null>;
}
