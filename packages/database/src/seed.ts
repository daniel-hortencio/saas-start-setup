import { PrismaClient } from "@prisma/client";

import { addUsers } from "./seed/users";

const prisma = new PrismaClient();
async function main() {
  await addUsers(prisma);
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
