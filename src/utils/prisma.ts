import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"

const connectionString = process.env.neon_DATABASE_URL


if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in the environment variables")
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

// Use a global object to prevent creating multiple PrismaClient instances during hot reloads in development
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter ,
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
