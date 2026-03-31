import "dotenv/config";
import { pool } from "./src/config/db.js";
import bcrypt from "bcryptjs";

console.log("DB URL:", process.env.DATABASE_URL);

const seed = async () => {
  await pool.query(`DELETE FROM users`);

  const password = await bcrypt.hash("123456", 10);

  // Admin
  await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4)`,
    ["Admin", "admin@test.com", password, "admin"]
  );

  // Mentors
  for (let i = 1; i <= 5; i++) {
    await pool.query(
      `INSERT INTO users (name, email, password, role, tags, description)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        `Mentor ${i}`,
        `mentor${i}@test.com`,
        password,
        "mentor",
        ["tech", "communication"],
        "Experienced developer from big tech",
      ]
    );
  }

  // Users
  for (let i = 1; i <= 10; i++) {
    await pool.query(
      `INSERT INTO users (name, email, password, role, tags, description)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        `User ${i}`,
        `user${i}@test.com`,
        password,
        "user",
        ["tech"],
        "Looking for guidance",
      ]
    );
  }

  console.log("Seeded successfully");
  process.exit();
};

seed();