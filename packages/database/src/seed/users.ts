import { AES } from "crypto-js";
import { PrismaClient, Role } from "@prisma/client";

export async function addUsers(prisma: PrismaClient) {
  const encrypted_password = AES.encrypt(
    JSON.stringify("123456"),
    process.env.PASSWORD_SECRET as string,
  ).toString();

  await prisma.user.create({
    data: {
      name: "Owner",
      email: "owner@mail.com",
      password: encrypted_password,
      roles: [Role.USER, Role.ADMIN],
    },
  });
}
