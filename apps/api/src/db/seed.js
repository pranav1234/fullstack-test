import Database from "better-sqlite3";
import bcrypt from "bcryptjs";

// Initialize SQLite database
const sqlite = new Database("data.db");

const createAdminUser = async () => {
  try {
    // Create users table if it doesn't exist
    sqlite
      .prepare(
        `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        created_at INTEGER NOT NULL DEFAULT (unixepoch()),
        updated_at INTEGER NOT NULL DEFAULT (unixepoch())
      )
    `
      )
      .run();

    // Check if admin already exists
    const existingAdmin = sqlite
      .prepare("SELECT * FROM users WHERE email = ?")
      .get("admin@example.com");

    if (existingAdmin) {
      console.log("Admin user already exists");
      sqlite.close();
      return;
    }

    // Hash the admin password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Insert admin user
    sqlite
      .prepare(
        `
      INSERT INTO users (email, password, name, role)
      VALUES (?, ?, ?, ?)
    `
      )
      .run("admin@example.com", hashedPassword, "Admin User", "admin");

    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    sqlite.close();
  }
};

// Run the seed
createAdminUser();
