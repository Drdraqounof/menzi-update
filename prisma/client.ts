import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";
import ws from "ws";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  webSocketConstructor: ws
});

const prisma = new PrismaClient({
  adapter: PrismaNeon(pool),
});

export default prisma;
