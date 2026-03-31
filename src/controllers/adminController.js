import { pool } from "../config/db.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, tags, description
       FROM users WHERE role = 'user'`
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all mentors
export const getMentors = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, tags, description
       FROM users WHERE role = 'mentor'`
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};