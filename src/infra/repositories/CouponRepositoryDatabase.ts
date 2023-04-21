import CouponRepository from "../../application/repositories/CouponRepositoy";
import Coupon from "../../domain/entities/Coupon";
import Connection from "../database/Connection";
import PrismaAdapter from "../database/PrismaAdapter";

export default class CouponRepositoryDatabase implements CouponRepository {
  constructor(readonly connection: Connection) {}

  async getCoupon(code: string): Promise<Coupon | null> {
    const connect = (this.connection as PrismaAdapter).prisma;
    const couponData = await connect.coupon.findFirst({ where: { code } });
    if (couponData === null) return null;
    return new Coupon(
      couponData.id,
      couponData.percentage.toNumber(),
      couponData.expire_date!
    );
  }
}
