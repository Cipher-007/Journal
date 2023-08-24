import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prima: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prima ?? new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prima = prisma;
}
