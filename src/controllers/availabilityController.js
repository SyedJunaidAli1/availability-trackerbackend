import { pool } from "../config/db.js";

// Add availability
export const addAvailability = async (req, res) => {
  const { date, start_time, end_time } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `INSERT INTO availability (user_id, date, start_time, end_time)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, date, start_time, end_time]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get my availability
export const getMyAvailability = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT * FROM availability WHERE user_id = $1 ORDER BY date`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};