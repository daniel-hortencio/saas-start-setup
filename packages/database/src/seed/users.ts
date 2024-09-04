import { AES } from "crypto-js";
import { PrismaClient, User } from "@prisma/client";

export async function addUsers(prisma: PrismaClient) {
  const encrypted_password = AES.encrypt(
    JSON.stringify("123456"),
    process.env.PASSWORD_SECRET as string,
  ).toString();

  await prisma.user.create({
    data: {
      name: "Daniel",
      email: "daniel@mail.com",
      password: encrypted_password,
      roles: ["USER", "ADMIN"],
    },
  });
}
