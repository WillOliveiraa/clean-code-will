import { PrismaClient } from "@prisma/client";
import Connection from "./Connection";

export default class PrismaAdapter implements Connection {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
}
