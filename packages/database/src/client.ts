import { PrismaClient, Prisma } from "@prisma/client";
export * as TypesPrisma from "@prisma/client";

declare const global: Global & { prisma?: PrismaClient };

export let prisma: PrismaClient;

export { Prisma as Prisma };

if (typeof window === "undefined") {
  if (process.env["NODE_ENV"] === "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }
}
