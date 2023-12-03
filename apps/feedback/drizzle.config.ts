import { type Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.POSTGRES_URL);

export default {
  driver: "pg",
  schema: ["./src/database/**/schema.ts"],
  out: "./migrations",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
} satisfies Config;
