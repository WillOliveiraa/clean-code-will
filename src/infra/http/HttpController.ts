import Checkout from "../../application/usecases/Checkout";
import GetProducts from "../../application/usecases/GetProducts";
import HttpServer from "./HttpServer";

export default class HttpController {
  constructor(
    readonly httpServer: HttpServer,
    readonly checkout: Checkout,
    readonly getProducts: GetProducts
  ) {
    httpServer.on("post", "/checkout", async (params: any, body: any) => {
      const output = await checkout.execute(body);
      return output;
    });

    httpServer.on("get", "/product", async (params: any, body: any) => {
      const output = await getProducts.execute();
      return output;
    });
  }
}
