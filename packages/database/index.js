const { PrismaClient } = require("@prisma/client");

const db_client = new PrismaClient();

module.exports = {
  db_client,
};
