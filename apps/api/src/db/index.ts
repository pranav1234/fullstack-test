import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema.js";
import "dotenv/config";
let db: BetterSQLite3Database<typeof schema>;
// Resolve path to data.db in root folder

try {
  // Initialize the SQLite database with resolved path
  const sqlite = new Database("data.db") as any;

  console.log("✅ Database connected successfully at:");

  // Create the database connection
  db = drizzle(sqlite, { schema });
} catch (error) {
  console.error("❌ Failed to connect to database at", "\nError:", error);
  process.exit(1);
}

export { db };
