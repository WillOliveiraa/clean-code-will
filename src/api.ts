import cors from "cors";
import express, { Request, Response } from "express";
import Checkout from "./application/usecases/Checkout";
import Product from "./domain/entities/Product";
import PrismaAdapter from "./infra/database/PrismaAdapter";
import ProductRepositoryDatabase from "./infra/repositories/ProductRepositoryDatabase";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.json("Hello World");
});

app.post("/product", async (req: Request, res: Response) => {
  try {
    const connection = new PrismaAdapter();
    const prisma = connection.prisma;
    const { id, description, price } = req.body;
    const product = new Product(id, description, price);
    await prisma.product.create({
      data: { description: product.description, price: product.price },
    });
    res.status(201).end();
  } catch (e: any) {
    res.status(422).json({
      message: e.message,
    });
  }
});

app.post("/checkout", async (req: Request, res: Response) => {
  try {
    const connection = new PrismaAdapter();
    const productRepository = new ProductRepositoryDatabase(connection);
    const checkout = new Checkout(productRepository);
    const output = await checkout.execute(req.body);
    return res.status(200).json({ total: output.total });
  } catch (e: any) {
    res.status(422).json({
      message: e.message,
    });
  }
});

app.listen(3003);