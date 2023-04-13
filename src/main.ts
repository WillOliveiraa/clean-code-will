import Checkout from "./application/usecases/Checkout";
import GetProducts from "./application/usecases/GetProducts";
import PrismaAdapter from "./infra/database/PrismaAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpController from "./infra/http/HttpController";
import ProductRepositoryDatabase from "./infra/repositories/ProductRepositoryDatabase";

const connection = new PrismaAdapter();
const httpServer = new ExpressAdapter();
const productRepository = new ProductRepositoryDatabase(connection);
const checkout = new Checkout(productRepository);
const getProducts = new GetProducts(productRepository);
const port = 3003;

new HttpController(httpServer, checkout, getProducts);
httpServer.listen(port);
