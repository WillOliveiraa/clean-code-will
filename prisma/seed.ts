import { PrismaClient } from "@prisma/client";
import { products } from "./utils/ProductsData";

const prisma = new PrismaClient();

async function main() {
  for (const product of products) {
    await prisma.product.create({ data: product });
  }
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
  await prisma.coupon.create({ data: coupon1 });
  await prisma.coupon.create({ data: coupon2 });
  const order1 = {
    id: "1",
    cpf: "407.302.170-27",
    code: "1",
    total: 150,
    freight: 10,
  };
  await prisma.orders.create({ data: order1 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
